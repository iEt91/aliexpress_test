// src/pages/api/ae/auth.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { buildAuthUrl } from "@/lib/ae";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
const url = buildAuthUrl();
// Podrías guardar `state` en cookie/kv para validarlo en callback (omito por brevedad)
res.redirect(url);
} catch (e: any) {
res.status(500).json({ error: e.message });
}
}