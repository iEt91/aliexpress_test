# AliExpress OAuth – Vercel MVP


## 1) Configura el proyecto
- Duplica `.env.local.example` a `.env.local` y completa tus valores.
- Asegúrate de que `AE_REDIRECT_URI` apunte a `/api/ae/callback` de tu dominio Vercel.


## 2) Despliega en Vercel
- `vercel` o desde el dashboard, importando el repo.
- En **Vercel → Project → Settings → Environment Variables** sube AE_*.
- Redeploy.


## 3) Registra la Callback en AliExpress
- Pega `https://TU-PROYECTO.vercel.app/api/ae/callback` en el formulario de la App.
- Guarda.


## 4) Prueba end-to-end
- Abre `https://TU-PROYECTO.vercel.app`, pulsa **Conectar**.
- Loguéate/autoriza en AliExpress.
- Debe redirigirte a `/success` mostrando `access_token`/`refresh_token`.


## 5) Notas
- Si el canje falla, prueba cambiar `AE_AUTH_URL` a `https://oauth.aliexpress.com/authorize`.
- Endpoints de token:
- Primario: `AE_TOKEN_URL_PRIMARY=https://api-sg.aliexpress.com/auth/token/create`
- Fallback: `AE_TOKEN_URL_FALLBACK=https://oauth.aliexpress.com/token`
- **Producción**: no muestres tokens. Guarda en DB cifrada, encripta en repositorio de secretos y usa refresh antes de `expires_in`.