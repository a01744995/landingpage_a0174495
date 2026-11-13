# WAFLE Rocket Tec — Ingeniería Aeroespacial Experimental

![WAFLE Rocket Tec](./public/images/brand/logo-horizontal.png)

> **Tecnológico de Monterrey — Campus Culiacán**  
> Plataforma interactiva de evaluación técnica, manufactura aditiva en PLA (Revisión CAD V10), propulsión sólida Estes A10-3T y simulación física del sistema de recuperación octogonal.

---

## 1. Descripción y Objetivo del Proyecto

**WAFLE Rocket Tec** es un proyecto de ingeniería aeroespacial experimental desarrollado en el **Tecnológico de Monterrey, Campus Culiacán**. Su propósito es diseñar, manufacturar e instrumentar un cohete sonda experimental ultraligero ($m_0 \approx 70.0\text{ g}$) fabricado mediante manufactura aditiva (impresión 3D vertical en ácido poliláctico, PLA), impulsado por un motor comercial de propelente sólido **Estes A10-3T**, y dotado de un sistema de recuperación octogonal capaz de garantizar el descenso seguro de la carga útil electrónica (altímetro barométrico de $12.0\text{ g}$).

Esta aplicación web funciona como **Centro de Control de Misión y Plataforma de Evaluación Técnica** ante el jurado académico, permitiendo inspeccionar el despiece CAD V10, el balance gravimétrico, el modelo físico-matemático y ejecutar simulaciones paramétricas de vuelo en tiempo real.

---

## 2. Especificaciones Técnicas de Ingeniería

### Estructura y Manufactura Aditiva (CAD V10)
- **Material estructural**: Ácido poliláctico (PLA, densidad $\rho \approx 1.24\text{ g/cm}^3$) impreso en orientación vertical.
- **Restricción térmica**: Temperatura de ablandamiento entre $55\text{--}60\text{ }^\circ\text{C}$, protegida mediante barrera ignífuga (*Wadding* de 3 a 4 hojas de celulosa).
- **Arquitectura de separación**: El fuselaje principal (`Pieza 03 Cuerpo`, `Pieza 04 PortaMotor A`, `Pieza 05 Alerones Cuadrados` y `Pieza 06 Portaguía`) se separa tras la eyección y desciende de forma independiente, mientras el sistema de recuperación sostiene únicamente la ojiva (`Pieza 01 Ojiva A` + `Pieza 02 Tapa Ojiva B`) con el altímetro.

### Balance de Masas
- **Masa seca estructural** (cuerpo + ojiva + altímetro): $\approx 55.0\text{ g}$
- **Masa del motor** (Estes A10-3T con propelente): $\approx 12\text{--}15\text{ g}$
- **Masa total al despegue ($m_0$)**: $\approx 70.0\text{ g}$ ($0.070\text{ kg}$)
- **Masa total suspendida en descenso ($m_t$)**: $34.0\text{ g}$ ($0.034\text{ kg}$), compuesta por:
  - Ojiva de PLA: $15.5\text{ g}$
  - Altímetro electrónico barométrico: $12.0\text{ g}$
  - Sistema de recuperación construido (paracaídas, líneas y elástico): $\approx 6.5\text{ g}$

### Propulsión y Trayectoria (`Estes A10-3T`)
- **Impulso total**: $\approx 2.5\text{ Ns}$
- **Empuje medio**: $\approx 5.7\text{ N}$ durante $0.5\text{ s}$
- **Retardo de eyección**: $3.0\text{ s}$ tras el apagado del motor ($t_{\text{eyección}} \approx 3.5\text{ s}$)
- **Apogeo teórico estimado ($h$)**: $\approx 75\text{ m}$ (rango óptimo de $60\text{--}90\text{ m}$ en Culiacán, $\rho \approx 1.16\text{ kg/m}^3$, $30\text{ }^\circ\text{C}$, $54\text{--}55\text{ m s. n. m.}$)

### Sistema de Recuperación Construido
- **Geometría**: Octogonal plana sin orificio central (*spill hole*), diámetro circunscrito $D = 27.5\text{ cm}$ ($S_0 = 534.7\text{ cm}^2$).
- **Material**: Tela Tafeta Stretch ($100\%$ poliéster, $\approx 65\text{ g/m}^2$) con bordes termosellados.
- **Suspensión y amortiguación**: 8 líneas de Hilo Nylon Omega No. 2 ($30.0\text{ cm}$ c/u) + cordón de choque elástico (*Shock Cord*) de $\approx 52.0\text{ cm}$.
- **Desempeño nominal**: Velocidad terminal $v_t = 3.79\text{ m/s}$ ($3.89\text{ m/s}$ con balanceo), tiempo de descenso $t_d = 19.8\text{ s}$, energía de impacto $E_k = 0.244\text{ J}$ (caída libre equivalente de $73\text{ cm}$) y fuerza de apertura $F_{\text{apertura}} = 3.49\text{ N}$ ($0.44\text{ N/línea}$).

---

## 3. Tecnologías Utilizadas

- **React 18** + **TypeScript 5** — Arquitectura modular de componentes tipados.
- **Vite 6** — Entorno de desarrollo ultrarrápido y empaquetado optimizado de producción.
- **Tailwind CSS 3** — Sistema de diseño personalizado con la paleta cromática oficial de **WAFLE Rocket Project** (`#0B0B0B`, `#FFF3E0`, `#F8D6A1`, `#D8903D`, `#6B3A1E`, `#E7B56A`).
- **Lucide React** — Iconografía técnica e industrial.
- **SVG Dinámico Vectorial** — Plano interactivo explosionado de las 6 piezas CAD V10 y graficador físico en tiempo real $h(t)$.

---

## 4. Instalación y Ejecución Local

### Requisitos previos
- Node.js `v18+` y `npm` instalados en el sistema.

### Pasos
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar versión de producción
npm run build

# 4. Previsualizar build de producción
npm run preview
```

---

## 5. Estructura del Proyecto

```text
Pagina WAFLE/
├── public/
│   ├── cad/                      # Espacio para archivos CAD V10 (.SLDPRT)
│   └── images/
│       ├── brand/                # Logotipos y Guía Oficial de Identidad Visual
│       └── team/                 # Credenciales oficiales de los 5 integrantes
├── src/
│   ├── components/
│   │   ├── BrandIdentityModal.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── data/
│   │   └── rocketData.ts         # Parámetros físicos, masas, CAD V10 y presets
│   ├── sections/
│   │   ├── ArchitectureSection.tsx
│   │   ├── FlightSimulatorSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MassAvionicsSection.tsx
│   │   ├── PropulsionSection.tsx
│   │   ├── RecoveryPhysicsSection.tsx
│   │   └── TeamSection.tsx
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 6. Equipo Rocket Tec (Campus Culiacán)

- **María Paula López Moreno** — Ingeniería Estructural & Manufactura Aditiva (`WRT-01`)
- **Ruth Rosales Ramírez** — Sistemas de Recuperación & Aerodinámica (`WRT-02`)
- **Pablo Medardo Domínguez Obeso** — Propulsión Sólida & Balística Exterior (`WRT-03`)
- **Karen Alba River** — Instrumentación Electrónica & Carga Útil (`WRT-04`)
- **Jovany Quintero Gámez** — Modelado Físico-Matemático & Simulación (`WRT-05`)
