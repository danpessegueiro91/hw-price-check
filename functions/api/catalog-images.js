import { json, methodNotAllowed, requireDb } from "../_shared/http.js";

export async function onRequest({ request, env }) {
  if (request.method !== "GET") return methodNotAllowed(["GET"]);
  try {
    const db = requireDb(env);
    const result = await db.prepare(`
      SELECT model_year, model_kind, model_name, storage_path, alt_text
      FROM catalog_images
      ORDER BY model_year DESC, model_kind, model_name
    `).all();
    return json({ data: result.results || [] }, 200);
  } catch {
    return json({ error: "catalog_images_unavailable" }, 503);
  }
}
