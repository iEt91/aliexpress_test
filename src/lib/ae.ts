// src/lib/ae.ts
if (r.ok) {
const data = await r.json();
// Validaciones básicas
if (data && (data.access_token || data.result?.access_token)) {
return normalizeTokenResponse(data);
}
}
} catch (e) {
// continúa al fallback
}


// 2) Intento clásico (oauth.aliexpress.com/token) — urlencoded con grant_type
const form = new URLSearchParams({
grant_type: "authorization_code",
client_id: clientId,
client_secret: clientSecret,
code,
redirect_uri: redirect,
});
const r2 = await fetch(fallback, {
method: "POST",
headers: { "Content-Type": "application/x-www-form-urlencoded" },
body: form.toString(),
});
if (!r2.ok) {
const text = await r2.text();
throw new Error(`Token exchange failed: ${r2.status} ${text}`);
}
const data2 = await r2.json().catch(async () => ({ raw: await r2.text() }));
return normalizeTokenResponse(data2);
}


function normalizeTokenResponse(src: any) {
// Uniformar estructura, independientemente del endpoint.
const out = {
access_token: src.access_token || src.result?.access_token,
refresh_token: src.refresh_token || src.result?.refresh_token,
expires_in: Number(src.expires_in || src.result?.expires_in || 0),
refresh_expires_in: Number(src.refresh_expires_in || src.result?.refresh_expires_in || 0),
user_id: src.user_id || src.result?.user_id,
seller_id: src.seller_id || src.result?.seller_id,
account: src.account || src.result?.account,
raw: src,
};
if (!out.access_token) {
throw new Error("No se recibió access_token. Revisa endpoints/credenciales/redirect_uri.");
}
return out;
}


function randomState() {
return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}


function required(v: string | undefined, name: string) {
if (!v) throw new Error(`Falta la variable de entorno ${name}`);
return v;
}