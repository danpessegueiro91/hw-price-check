import { signup } from "../../_shared/auth.js";
export async function onRequestPost({ request, env }) { return signup(request, env); }
