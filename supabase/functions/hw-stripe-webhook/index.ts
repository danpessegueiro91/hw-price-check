import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "npm:stripe@^22";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
  const signingSecret = Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!stripeSecret || !signingSecret || !supabaseUrl || !serviceRoleKey) {
    return new Response("Billing webhook is not configured", { status: 503 });
  }

  const signature = req.headers.get("Stripe-Signature");
  if (!signature) return new Response("Missing Stripe signature", { status: 400 });

  const stripe = new Stripe(stripeSecret);
  const cryptoProvider = Stripe.createSubtleCryptoProvider();
  const rawBody = await req.text();

  let event: any;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      signingSecret,
      undefined,
      cryptoProvider
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", String(error));
    return new Response("Invalid Stripe signature", { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  if (!["customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted"].includes(event.type)) {
    return Response.json({ received: true, ignored: true });
  }

  const subscription: any = event.data.object;
  const subscriptionId = String(subscription.id || "");
  const customerId = typeof subscription.customer === "string"
    ? subscription.customer
    : String(subscription.customer?.id || "");

  let userId = String(subscription.metadata?.supabase_user_id || "");
  if (!userId && subscriptionId) {
    const { data: existing } = await admin
      .from("hw_billing_subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscriptionId)
      .maybeSingle();
    userId = String(existing?.user_id || "");
  }
  if (!userId && customerId) {
    const { data: existing } = await admin
      .from("hw_billing_subscriptions")
      .select("user_id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();
    userId = String(existing?.user_id || "");
  }

  if (!userId) {
    console.error("Stripe subscription event has no matching HWPC user:", subscriptionId);
    return new Response("Subscription user not found", { status: 202 });
  }

  const { data: current } = await admin
    .from("hw_billing_subscriptions")
    .select("last_event_created")
    .eq("user_id", userId)
    .maybeSingle();

  if (current && Number(current.last_event_created || 0) > Number(event.created || 0)) {
    return Response.json({ received: true, stale: true });
  }

  const firstItem = subscription.items?.data?.[0];
  const itemPeriodEnd = firstItem?.current_period_end ?? subscription.current_period_end;
  const itemPeriodStart = firstItem?.current_period_start ?? subscription.current_period_start ?? subscription.start_date;
  const periodEnd = typeof itemPeriodEnd === "number"
    ? new Date(itemPeriodEnd * 1000).toISOString()
    : null;
  const periodStart = typeof itemPeriodStart === "number"
    ? new Date(itemPeriodStart * 1000).toISOString()
    : new Date().toISOString();
  const status = String(subscription.status || "unknown");
  const cancelAtPeriodEnd = subscription.cancel_at_period_end === true;

  const { data: existingEntitlement } = await admin
    .from("hw_user_entitlements")
    .select("tier,expires_at")
    .eq("user_id", userId)
    .maybeSingle();

  const isPermanentPremium = existingEntitlement?.tier === "premium" && existingEntitlement.expires_at === null;

  const { error: billingError } = await admin
    .from("hw_billing_subscriptions")
    .upsert({
      user_id: userId,
      stripe_customer_id: customerId || null,
      stripe_subscription_id: subscriptionId || null,
      status,
      current_period_end: periodEnd,
      cancel_at_period_end: cancelAtPeriodEnd,
      last_event_created: Number(event.created || 0),
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

  if (billingError) {
    console.error("Could not save Stripe subscription:", billingError.message);
    return new Response("Could not save subscription", { status: 500 });
  }

  if (!isPermanentPremium) {
    if (status === "active" || status === "trialing") {
      if (!periodEnd) return new Response("Subscription period end missing", { status: 500 });

      const { error: entitlementError } = await admin
        .from("hw_user_entitlements")
        .upsert({
          user_id: userId,
          tier: "premium",
          daily_limit: null,
          starts_at: periodStart,
          expires_at: periodEnd,
          granted_at: new Date().toISOString(),
          granted_by: null,
          grant_note: "Subscrição mensal Stripe HW Price Check Premium"
        }, { onConflict: "user_id" });

      if (entitlementError) {
        console.error("Could not grant monthly Premium:", entitlementError.message);
        return new Response("Could not update entitlement", { status: 500 });
      }
    } else if (status === "canceled" || status === "unpaid" || status === "incomplete_expired" || status === "paused") {
      const now = new Date().toISOString();
      const { error: entitlementError } = await admin
        .from("hw_user_entitlements")
        .upsert({
          user_id: userId,
          tier: "free_account",
          daily_limit: 10,
          starts_at: now,
          expires_at: now,
          granted_at: now,
          granted_by: null,
          grant_note: "Subscrição mensal Stripe terminada"
        }, { onConflict: "user_id" });

      if (entitlementError) {
        console.error("Could not revert expired Premium:", entitlementError.message);
        return new Response("Could not update entitlement", { status: 500 });
      }
    }
    // past_due keeps the already-paid period until its stored expiry.
  }

  return Response.json({ received: true, status, cancel_at_period_end: cancelAtPeriodEnd });
});
