// src/pages/api/ae/callback.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { exchangeCodeForTokens } from "@/lib/ae";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { code, state, error, error_description } = req.query as Record<string, string>;


if (error) {
return res.status(400).send(`AliExpress OAuth error: ${error} ${error_description || ""}`);
}
if (!code) {
return res.status(400).send("Falta query param `code`.");
}


try {
const tokens = await exchangeCodeForTokens(code);


// 🔐 PRODUCCIÓN: guarda tokens en DB/KV cifrada.
// Para el MVP los pasamos a una página de éxito (NO dejar así en producción).
const params = new URLSearchParams({
access_token: tokens.access_token ?? "",
refresh_token: tokens.refresh_token ?? "",
expires_in: String(tokens.expires_in ?? 0)
});
res.redirect(`/success?${params.toString()}`);
} catch (e: any) {
res.status(500).send(`Fallo al canjear tokens: ${e.message}`);
}
}