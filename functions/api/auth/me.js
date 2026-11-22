import { currentUser } from "../../_shared/auth.js";
import { json, requireDb } from "../../_shared/http.js";
export async function onRequestGet({ request, env }) {
  try {
    requireDb(env);
    const user = await currentUser(request, env);
    return json({ user });
  } catch {
    return json({ error: "auth_unavailable" }, 503);
  }
}
