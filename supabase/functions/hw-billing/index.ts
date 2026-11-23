import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "npm:stripe@^22";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

function getClaims(req: Request) {
  const authorization = req.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("authentication_required");
  const encoded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const claims = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, "=")));
  const userId = String(claims.sub || "");
  if (!userId || claims.is_anonymous === true || claims.is_anonymous === "true") {
    throw new Error("registered_account_required");
  }
  return userId;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const userId = getClaims(req);
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");

    if (!supabaseUrl || !serviceRoleKey) throw new Error("supabase_server_env_missing");
    if (!stripeSecret) {
      return json({
        error: "billing_not_configured",
        message: "A gestão de subscrições anteriores está temporariamente indisponível."
      }, 503);
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    const { data: authResult, error: authError } = await admin.auth.admin.getUserById(userId);
    if (authError || !authResult?.user || !authResult.user.email) {
      return json({ error: "account_not_found", message: "Não foi possível validar a conta." }, 401);
    }

    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "checkout");
    if (action === "checkout") {
      return json({
        error: "sales_disabled",
        message: "As novas compras e subscrições Premium estão desativadas. O Premium é atribuído separadamente e os apoios são voluntários."
      }, 410);
    }
    const stripe = new Stripe(stripeSecret);

    const { data: billing } = await admin
      .from("hw_billing_subscriptions")
      .select("stripe_customer_id,stripe_subscription_id,status,current_period_end,cancel_at_period_end")
      .eq("user_id", userId)
      .maybeSingle();

    if (action === "portal") {
      if (!billing?.stripe_customer_id || !billing?.stripe_subscription_id) {
        return json({ error: "subscription_not_found", message: "Não foi encontrada uma subscrição mensal para esta conta." }, 404);
      }
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: billing.stripe_customer_id,
        return_url: "https://hwpricecheck.pages.dev/?billing=return"
      });
      return json({ url: portalSession.url });
    }

    if (action === "cancel" || action === "resume") {
      if (!billing?.stripe_subscription_id) {
        return json({ error: "subscription_not_found", message: "Não foi encontrada uma subscrição para esta conta." }, 404);
      }

      const subscription = await stripe.subscriptions.update(
        billing.stripe_subscription_id,
        { cancel_at_period_end: action === "cancel" }
      );

      const itemPeriodEnd = subscription.items?.data?.[0]?.current_period_end ?? subscription.current_period_end;
      const periodEnd = typeof itemPeriodEnd === "number"
        ? new Date(itemPeriodEnd * 1000).toISOString()
        : billing.current_period_end;

      const { error: updateError } = await admin
        .from("hw_billing_subscriptions")
        .update({
          status: subscription.status,
          current_period_end: periodEnd,
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", userId);

      if (updateError) throw updateError;

      return json({
        ok: true,
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_end: periodEnd
      });
    }

    return json({ error: "invalid_action" }, 400);
  } catch (error) {
    const message = String(error);
    if (message.includes("registered_account_required") || message.includes("authentication_required")) {
      return json({ error: "registered_account_required", message: "Inicia sessão com uma conta registada para gerir a subscrição anterior." }, 401);
    }
    console.error("hw-billing error:", message);
    return json({ error: "billing_request_failed", message: "Não foi possível processar o pedido de faturação." }, 500);
  }
});
