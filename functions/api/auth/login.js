import { login } from "../../_shared/auth.js";
export async function onRequestPost({ request, env }) { return login(request, env); }
