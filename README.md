# WAFLE Rocket TEC — Landing page

Landing page institucional para presentar la identidad de WAFLE Rocket TEC y a las personas que forman parte del proyecto. El diseño utiliza una dirección visual tecnológica y cálida inspirada en la identidad de marca: negro, crema vainilla, caramelo, dorado y chocolate.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- CSS propio, sin frameworks visuales externos

## Requisitos

- Node.js 20.9 o superior (se recomienda Node.js 22 LTS).
- npm.

## Instalación local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Antes de publicar: personaliza el equipo

Los perfiles interactivos utilizan contenido de ejemplo. Para añadir la información real de las personas:

1. Abre `data/team.ts`.
2. Cambia `name`, `role`, `specialty`, `shortBio`, `biography`, `strengths` e `initials`.
3. Añade o elimina objetos según el número real de integrantes. Cada objeto debe conservar la estructura `TeamMember`.
4. Guarda y revisa la página en escritorio y móvil.

Las tarjetas se pueden seleccionar para abrir una ficha modal. La ficha se cierra con el botón superior, al hacer clic fuera de ella o al presionar `Escape`.

## Identidad visual y recursos

Los recursos originales compartidos para el proyecto están en `public/brand/`:

- `wafle-horizontal.png`: logotipo horizontal usado en navegación y pie de página.
- `wafle-emblem.png`: emblema cuadrado usado en el hero y como icono del sitio.
- `guia-identidad-visual.png`: guía gráfica original, incluida como referencia de marca.

Paleta implementada:

| Color | Hex | Uso |
|---|---|---|
| Negro especial | `#0B0B0B` | Fondos oscuros |
| Crema vainilla | `#FFF3E0` | Fondos claros y texto |
| Vainilla dorada | `#F8D6A1` | Botones y contraste |
| Caramelo | `#D8903D` | Acentos e interacción |
| Chocolate | `#6B3A1E` | Detalles y tipografía |
| Waffle | `#E7B56A` | Acentos cálidos |

## Estructura principal

```text
wafle-rocket-tec/
├── app/
│   ├── globals.css          # Sistema visual responsive
│   ├── layout.tsx           # Metadatos y layout raíz
│   └── page.tsx             # Inicio / hero / footer
├── components/
│   ├── site-header.tsx      # Navegación y menú móvil
│   └── team-section.tsx     # Tarjetas y perfiles interactivos
├── data/
│   └── team.ts              # Datos editables del equipo
├── public/
│   └── brand/               # Logotipos y guía de marca
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Comprobaciones

```bash
npm run typecheck
npm run build
```

## Publicación en GitHub

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Initial WAFLE Rocket TEC landing page"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Sustituye `USUARIO/REPOSITORIO` por la dirección de tu repositorio. Para desplegar el sitio, conecta ese repositorio a Vercel y conserva los valores predeterminados de Next.js.

## Nota de contenido

El sitio evita presentar cifras, logros, especificaciones técnicas o datos de integrantes que no han sido proporcionados. Completa los perfiles antes de usar la página como presentación oficial.
