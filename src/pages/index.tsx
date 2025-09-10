// src/pages/index.tsx
import Link from "next/link";


export default function Home() {
return (
<main style={{fontFamily:"Inter, system-ui", maxWidth:720, margin:"40px auto"}}>
<h1>AliExpress OAuth – MVP</h1>
<p>Usa el botón para iniciar la autorización y probar la <code>Callback URL</code>.</p>
<p>
<a href="/api/ae/auth" style={{
display:"inline-block", padding:"10px 16px", background:"#e1251b",
color:"#fff", borderRadius:8, textDecoration:"none"
}}>Conectar con AliExpress</a>
</p>
<p style={{opacity:.7, marginTop:24}}>
Recuerda configurar <code>AE_AUTH_URL</code> y los endpoints de token si tu tenant usa otra base.
</p>
<p>
¿Llegaste aquí desde <code>/success</code>? Repite el flujo para renovar tokens si hace falta.
</p>
<p><Link href="/success">Ver página de éxito (demo)</Link></p>
</main>
);
}