# AI RiskScan™ — CSTECH

Diagnóstico ejecutivo gratuito de riesgo en el uso de inteligencia artificial.
Desarrollado por **Consulting Systems (CSTECH)** · consulting-systems.tech

---

## Descripción

Aplicación web estática (React + Vite) que guía al usuario a través de 19 preguntas
en 5 dominios de riesgo y genera un informe ejecutivo personalizado en el momento,
sin llamadas a APIs externas ni costos de operación.

**Dominios evaluados:**
1. Inventario de IA en Uso (peso 20%)
2. Exposición de Datos (peso 25%)
3. Gobernanza y Políticas (peso 25%)
4. Vectores de Ataque por IA (peso 20%)
5. Postura Regulatoria (peso 10%)

**Resultado:** Índice de Exposición AI™ (0–100) + 3 hallazgos priorizados + plan de remediación a corto, mediano y largo plazo + CTA hacia agenda de asesoría.

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/ai-riskscan.git
cd ai-riskscan

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm run dev
# → Abre http://localhost:5173
```

---

## Build para producción

```bash
npm run build
# Genera la carpeta /dist con los archivos estáticos listos para deploy
```

---

## Deployment en Vercel (recomendado)

### Opción A — Desde la UI de Vercel (más fácil)

1. Sube el proyecto a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release AI RiskScan™"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/ai-riskscan.git
   git push -u origin main
   ```

2. Ve a [vercel.com](https://vercel.com) → **Add New Project** → selecciona el repo.

3. Vercel detecta Vite automáticamente. Configuración por defecto:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

4. Clic en **Deploy**. En ~60 segundos tienes la URL en producción.

### Opción B — Desde la CLI de Vercel

```bash
npm i -g vercel
vercel
# Sigue el wizard interactivo
```

> **No se requieren variables de entorno.** La aplicación es 100% estática.

---

## Deployment en GitHub Pages (alternativa gratuita)

1. Agrega `base` en `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/ai-riskscan/',  // nombre exacto de tu repo
   })
   ```

2. Instala el plugin de deploy:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Agrega en `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. Ejecuta:
   ```bash
   npm run deploy
   ```

---

## Estructura del proyecto

```
ai-riskscan/
├── index.html          ← Entry point HTML (fuentes, meta tags, print CSS)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx        ← Monta React en #root
    ├── engine.js       ← Datos, scoring y motor de texto (toda la lógica)
    └── App.jsx         ← Pantallas y componentes UI
```

---

## Personalización

### Cambiar colores de marca
En `src/App.jsx`, modificar el objeto `C` al inicio del archivo:
```js
const C = {
  green: '#3A9B5C',   // color de acento principal
  navy:  '#1B2E4B',   // fondo de tarjetas
  ...
}
```

### Agregar o modificar preguntas
En `src/engine.js`, dentro del array `DOMAINS`, cada pregunta tiene:
```js
{
  id: 'd1q1',                    // ID único (no repetir)
  text: 'Texto de la pregunta',
  options: [
    { l: 'Opción de bajo riesgo',  r: 0 },
    { l: 'Opción de riesgo medio', r: 1 },
    { l: 'Opción de alto riesgo',  r: 2 },
  ]
}
```

### Modificar los textos del informe
Los textos se generan en `src/engine.js`:
- `SECTOR_PHRASE` — frases contextuales por sector para el resumen ejecutivo
- `SUMMARY_TPL`   — plantillas del resumen por nivel de riesgo (CRÍTICO/MODERADO/CONTROLADO)
- `FINDINGS`      — hallazgos por dominio y nivel de severidad
- `NEXT_STEP`     — texto del siguiente paso recomendado por dominio más crítico

### Cambiar el enlace de agendamiento
En `src/App.jsx`:
```js
const BOOK_URL = 'https://consulting-systems.tech/asesoria-gratuita'
```

---

## Sin costos de operación

Esta aplicación no utiliza APIs externas, bases de datos ni servicios de backend.
- **Hosting Vercel Free Tier:** 100 GB de ancho de banda / mes, sin costo.
- **Hosting GitHub Pages:** ilimitado para repositorios públicos, sin costo.
- **Costo por diagnóstico generado:** $0.00

---

## Licencia AGPL 3.0

Propiedad de Consulting Systems (CSTECH). Todos los derechos reservados.
Para licenciamiento, contactar: info@consulting-systems.tech
