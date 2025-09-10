// src/pages/success.tsx
import { useRouter } from "next/router";


export default function Success() {
const router = useRouter();
const { access_token, refresh_token, expires_in } = router.query;


return (
<main style={{fontFamily:"Inter, system-ui", maxWidth:760, margin:"40px auto"}}>
<h1>¡Autorización completada!</h1>
<p>⚠️ Esta página es solo para DEMO. En producción, guarda tokens en tu backend seguro.</p>
<pre style={{whiteSpace:"pre-wrap", background:"#f6f8fa", padding:16, borderRadius:8}}>
{JSON.stringify({ access_token, refresh_token, expires_in }, null, 2)}
</pre>
<a href="/" style={{textDecoration:"none"}}>Volver</a>
</main>
);
}