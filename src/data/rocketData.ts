export interface CadPart {
  id: string;
  partNumber: string;
  codeName: string;
  fileName: string;
  name: string;
  subsystem: 'Aerodinámica & Carga Útil' | 'Estructura Principal' | 'Propulsión & Estabilidad' | 'Guiado de Lanzamiento';
  material: string;
  massInfo: string;
  printOrientation: string;
  thermalConstraint: string;
  description: string;
  engineeringSpecs: string[];
  explodeOffsetY: number;
}

export interface ParachutePreset {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  isBuiltPrototype?: boolean;
  cd: number;
  cdEffective?: number;
  diameterCm: number;
  areaCm2: number | null;
  massG: number;
  spillHoleRatio: number;
  geometryType: 'octagonal-solid' | 'octagonal-spill' | 'cruciform' | 'hemispherical';
  material: string;
  vtNominal: number;
  vtWithOscillation?: number;
  tdSeconds: number;
  ekJoules: number;
  equivalentFreeFallCm: number;
  openingForceN: number | null;
  forcePerLineN?: number;
  notes: string;
}

export interface TeamMember {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
  role: string;
  specialty: string;
  badgeCode: string;
  image: string;
  contributions: string[];
}

export const MISSION_CONSTANTS = {
  projectTitle: 'WAFLE Rocket Tec',
  institution: 'Tecnológico de Monterrey',
  campus: 'Campus Culiacán',
  coordinates: '24.8049° N, 107.3940° W',
  altitudeMsnm: '54–55 m s. n. m.',
  ambientTempC: 30,
  airDensityRho: 1.16, // kg/m^3
  gravityG: 9.81, // m/s^2
  targetApogeeM: 75, // m (rango óptimo 60-90 m)
  apogeeRangeM: '60–90 m',
  remnantDeploymentVelocityV0: 10, // m/s
  openingShockFactorCx: 1.5,
  plaDensityGcm3: 1.24,
  plaSofteningTempC: '55–60 °C',
};

export const MASS_BREAKDOWN = {
  dryStructuralMassG: 55.0, // cuerpo + ojiva + altímetro
  motorWithPropellantMassRangeG: '12–15 g',
  motorMassNominalG: 15.0,
  totalLiftoffMassG: 70.0, // m_0 = 0.070 kg
  totalLiftoffMassKg: 0.070,
  suspendedDescentMassG: 34.0, // m_t = 0.034 kg
  suspendedDescentMassKg: 0.034,
  independentFuselageMassG: 27.5, // cuerpo + alerones + portamotor tras separación
  suspendedComponents: [
    {
      name: 'Ojiva Aerodinámica (PLA V10)',
      massG: 15.5,
      percentage: 45.6,
      detail: 'Pieza 01 + Pieza 02 en ácido poliláctico (ρ ≈ 1.24 g/cm³) con cavidad cerrada y puertos barométricos.',
      color: '#D8903D',
    },
    {
      name: 'Altímetro Electrónico Barométrico',
      massG: 12.0,
      percentage: 35.3,
      detail: 'Instrumentación de registro de apogeo protegida por cuna amortiguadora de Goma EVA (5 mm).',
      color: '#E7B56A',
    },
    {
      name: 'Sistema de Recuperación Construido',
      massG: 6.5,
      percentage: 19.1,
      detail: 'Campana octogonal en Tafeta Stretch (27.5 cm), 8 líneas Nylon Omega No. 2 (30 cm) y Shock Cord (52 cm).',
      color: '#F8D6A1',
    },
  ],
};

export const ENGINE_SPECS = {
  model: 'Estes A10-3T',
  type: 'Motor comercial de propelente sólido (encendido vertical, tobera inferior)',
  totalImpulseNs: 2.5,
  averageThrustN: 5.7,
  burnTimeS: 0.5,
  ejectionDelayS: 3.0,
  apogeeTimeS: 3.5, // 0.5s burn + 3.0s coast/delay
  estimatedApogeeM: 75,
  optimalApogeeRangeM: '60–90 m',
  thermalProtection: '3 a 4 hojas arrugadas de papel ignífugo / celulosa (Wadding) sobre el motor',
};

export const FULL_ROCKET_PREDICTIONS = {
  ascent: {
    liftoffMassKg: 0.070,
    burnoutMassKg: 0.0575,
    initialWeightN: 0.687, // 0.070 * 9.81
    thrustToWeightRatio: 8.30, // 5.7 / 0.687
    netAccelerationMs2: 71.6, // mean net acceleration during 0.5s burn
    netAccelerationG: 7.3,
    maxBurnoutVelocityMs: 35.8, // velocity at t = 0.5s
    maxBurnoutVelocityKmh: 128.9,
    burnoutAltitudeM: 9.0, // altitude at t = 0.5s
    apogeeConfirmedM: 75.0, // with aerodynamic drag in Culiacán (ρ = 1.16 kg/m³)
    apogeeRangeM: '60–90 m',
    apogeeTimeS: 3.5,
  },
  recovery: {
    suspendedMassKg: 0.034,
    terminalVelocityNominalMs: 3.79, // Cd = 0.75
    terminalVelocityOscMs: 3.89, // Cd = 0.71 effective with oscillation
    descentTimeS: 19.8, // from 75 m apogee at 3.79 m/s
    totalMissionTimeS: 23.3, // 3.5s ascent + 19.8s descent
    impactKineticEnergyJ: 0.244,
    equivalentFreeFallCm: 73.2,
    openingShockForceN: 3.49, // at v0 = 10 m/s, Cx = 1.5
    openingForcePerLineN: 0.44, // distributed across 8 suspension lines
  },
};

export const CAD_PARTS_V10: CadPart[] = [
  {
    id: 'pieza-01',
    partNumber: 'COMPONENTE 01',
    codeName: 'Ojiva A',
    fileName: 'Pieza 01-V10 Ojiva A.SLDPRT',
    name: 'Ojiva Aerodinámica Principal',
    subsystem: 'Aerodinámica & Carga Útil',
    material: 'PLA (Ácido Poliláctico, ρ ≈ 1.24 g/cm³)',
    massInfo: '15.5 g (conjunto Ojiva A + Tapa B)',
    printOrientation: 'Impresión 3D FDM en orientación vertical concéntrica',
    thermalConstraint: 'Aislada térmicamente de los gases de eyección (T_ablandamiento PLA: 55–60 °C)',
    description:
      'Cono aerodinámico de baja resistencia en PLA. Aloja en su cavidad interna cerrada el altímetro barométrico de 12.0 g junto con la cuna amortiguadora de Goma EVA de 5 mm de espesor.',
    engineeringSpecs: [
      'Perfil ojival optimizado para minimizar el arrastre en el ascenso propulsado (0.0 s → 0.5 s).',
      'Cavidad interna dimensionada para alojar el altímetro electrónico (12.0 g) y cuna de Foami/EVA de 5 mm.',
      'Desciende suspendida bajo el paracaídas octogonal para garantizar la integridad de la telemetría.',
    ],
    explodeOffsetY: -65,
  },
  {
    id: 'pieza-02',
    partNumber: 'COMPONENTE 02',
    codeName: 'Tapa Ojiva B',
    fileName: 'Pieza 02-V10 Tapa Ojiva B - PLA.SLDPRT',
    name: 'Tapa de Ojiva y Mamparo Barométrico',
    subsystem: 'Aerodinámica & Carga Útil',
    material: 'PLA (Ácido Poliláctico, ρ ≈ 1.24 g/cm³)',
    massInfo: 'Integrada en los 15.5 g del subensamble de ojiva',
    printOrientation: 'Impresión 3D FDM vertical con refuerzo perimetral en punto de anclaje',
    thermalConstraint: 'Sellado inferior contra sobrepresión térmica de eyección',
    description:
      'Cierre estructural de la bahía de carga útil. Incorpora los orificios estáticos de ventilación barométrica para lectura de presión atmosférica y el cáncamo del cordón de choque elástico (52 cm).',
    engineeringSpecs: [
      'Orificios estáticos calibrados en la base inferior para equilibrar presión sin exponer el sensor a gases calientes.',
      'Punto de anclaje estructural (cáncamo) diseñado para resistir la fuerza de choque en la apertura (F_apertura = 3.49 N).',
      'Acople deslizante de precisión con el cuerpo para una separación limpia a t = 3.5 s.',
    ],
    explodeOffsetY: -35,
  },
  {
    id: 'pieza-03',
    partNumber: 'COMPONENTE 03',
    codeName: 'Fuselaje Principal',
    fileName: 'Pieza 03-V10 Cuerpo.SLDPRT',
    name: 'Fuselaje Tubular Principal',
    subsystem: 'Estructura Principal',
    material: 'PLA (Ácido Poliláctico, ρ ≈ 1.24 g/cm³)',
    massInfo: 'Parte de los 55.0 g de masa seca estructural total',
    printOrientation: 'Manufactura aditiva vertical continua (alineación de capas con eje axial)',
    thermalConstraint: 'Protegido internamente por 3–4 hojas de Wadding ignífugo (límite PLA: 55–60 °C)',
    description:
      'Cilindro estructural primario que integra la cámara de empaque del paracaídas octogonal (27.5 cm), el cordón de choque y la barrera térmica. Tras la eyección, se separa y desciende de forma independiente.',
    engineeringSpecs: [
      'Arquitectura de separación: reduce la masa suspendida por el paracaídas de 70.0 g a solo 34.0 g.',
      'Volumen interno para empaque sin fricción de la campana de Tafeta Stretch (534.7 cm²) y 8 líneas de 30 cm.',
      'Protección térmica crítica mediante wadding de celulosa para evitar superar los 55–60 °C del PLA.',
    ],
    explodeOffsetY: 0,
  },
  {
    id: 'pieza-06',
    partNumber: 'COMPONENTE 06',
    codeName: 'Portaguía',
    fileName: 'Pieza 06-V10 Portaguia.SLDPRT',
    name: 'Guía de Riel de Lanzamiento',
    subsystem: 'Guiado de Lanzamiento',
    material: 'PLA (Ácido Poliláctico, ρ ≈ 1.24 g/cm³)',
    massInfo: 'Ultraligera integrada al fuselaje exterior',
    printOrientation: 'Impresión vertical coaxial para baja fricción interna',
    thermalConstraint: 'Temperatura ambiente de operación (30 °C en Culiacán)',
    description:
      'Elemento de guiado aerodinámico lateral que mantiene la trayectoria estrictamente vertical del cohete en la rampa durante los primeros milisegundos del encendido del motor Estes A10-3T.',
    engineeringSpecs: [
      'Alineación colineal con el eje de empuje para evitar momentos de cabeceo al abandonar la varilla.',
      'Geometría exterior perfilada para reducir el arrastre parásito durante el ascenso por inercia (0.5 s → 3.5 s).',
      'Tolerancia holgada para deslizamiento libre sin atascamiento mecánico.',
    ],
    explodeOffsetY: 15,
  },
  {
    id: 'pieza-05',
    partNumber: 'COMPONENTE 05',
    codeName: 'Alerones Cuadrados',
    fileName: 'Pieza 05-V10 Alerones Cuadrados.SLDPRT',
    name: 'Estabilizadores Aerodinámicos (Alerones)',
    subsystem: 'Propulsión & Estabilidad',
    material: 'PLA (Ácido Poliláctico, ρ ≈ 1.24 g/cm³)',
    massInfo: 'Balanceados en sección posterior para margen estático positivo',
    printOrientation: 'Impresión 3D con bordes de ataque y salida definidos',
    thermalConstraint: 'Ubicados fuera del cono de expansión de la tobera del motor',
    description:
      'Conjunto de aletas estabilizadoras traseras de geometría cuadrada que desplazan el Centro de Presión (CP) por detrás del Centro de Gravedad (CG), asegurando estabilidad vertical.',
    engineeringSpecs: [
      'Geometría cuadrada de alta restaurabilidad aerodinámica en las condiciones de Culiacán (ρ = 1.16 kg/m³).',
      'Asegura margen de estabilidad positivo tanto con motor lleno (m₀ = 70.0 g) como tras el agotamiento (t = 0.5 s).',
      'Rigidez torsional durante el pico de aceleración producido por el empuje medio de 5.7 N.',
    ],
    explodeOffsetY: 45,
  },
  {
    id: 'pieza-04',
    partNumber: 'COMPONENTE 04',
    codeName: 'PortaMotor A',
    fileName: 'Pieza 04-V10 PortaMotor A - PLA.SLDPRT',
    name: 'Montura de Propulsión (PortaMotor)',
    subsystem: 'Propulsión & Estabilidad',
    material: 'PLA (Ácido Poliláctico, ρ ≈ 1.24 g/cm³)',
    massInfo: 'Aloja motor Estes A10-3T (12–15 g con propelente)',
    printOrientation: 'Impresión vertical con anillo retenedor de empuje axial',
    thermalConstraint: 'Contacto con carcasa aislante de cartón del motor Estes A10-3T (T_límite PLA: 55–60 °C)',
    description:
      'Subestructura interna de retención y centrado para el motor comercial de combustible sólido Estes A10-3T. Transmite los 5.7 N de empuje medio (2.5 Ns de impulso total) hacia el fuselaje.',
    engineeringSpecs: [
      'Transmisión axial directa del empuje durante los 0.5 s de combustión sin deformación plástica.',
      'Canaliza hacia arriba el pulso de la carga de eyección tras el retardo pirotécnico de 3.0 s.',
      'Aislamiento térmico asistido por el cuerpo del motor Estes para proteger la matriz de PLA.',
    ],
    explodeOffsetY: 75,
  },
];

export const PARACHUTE_PRESETS: ParachutePreset[] = [
  {
    id: 'prototipo-culiacan',
    name: 'Prototipo Real Culiacán',
    subtitle: 'Octogonal sólido en Tafeta Stretch (m_t = 34.0 g)',
    badge: 'PROTOTIPO CONSTRUIDO • OFICIAL',
    isBuiltPrototype: true,
    cd: 0.75,
    cdEffective: 0.71,
    diameterCm: 27.5,
    areaCm2: 534.7,
    massG: 34.0,
    spillHoleRatio: 0,
    geometryType: 'octagonal-solid',
    material: 'Tela Tafeta Stretch (100% poliéster, ≈ 65 g/m²) con bordes termosellados',
    vtNominal: 3.79,
    vtWithOscillation: 3.89,
    tdSeconds: 19.8,
    ekJoules: 0.244,
    equivalentFreeFallCm: 73,
    openingForceN: 3.49,
    forcePerLineN: 0.44,
    notes:
      'Configuración física manufacturada por el equipo en Campus Culiacán. Sin spill hole (S_0 = 534.7 cm²). Con C_d nominal de 0.75 alcanza v_t = 3.79 m/s (3.89 m/s considerando C_d efectivo de 0.71 por pendulación), equivalente a una caída libre de solo 73 cm.',
  },
  {
    id: 'teorico-spill-10',
    name: 'Diseño Teórico con Spill Hole 10%',
    subtitle: 'Octogonal en Nylon Ripstop (m_t = 32.0 g)',
    badge: 'ALTERNATIVA TEÓRICA A',
    cd: 0.78,
    diameterCm: 27.0,
    areaCm2: 566.4,
    massG: 32.0,
    spillHoleRatio: 0.1,
    geometryType: 'octagonal-spill',
    material: 'Nylon Ripstop ultraligero con orificio central d_s = 0.1D (A_ef = 0.99 · S_0)',
    vtNominal: 3.50,
    tdSeconds: 21.4,
    ekJoules: 0.196,
    equivalentFreeFallCm: 62,
    openingForceN: 3.84,
    forcePerLineN: 0.48,
    notes:
      'Incorpora un orificio de ventilación central del 10% del diámetro para reducir la pendulación y estabilizar la estela de vórtices, logrando una velocidad objetivo exacta de 3.50 m/s.',
  },
  {
    id: 'cruciforme-3-1',
    name: 'Configuración Cruciforme (Relación 3:1)',
    subtitle: 'Geometría en cruz sin spill hole (m_t = 32.0 g)',
    badge: 'ALTERNATIVA TEÓRICA B',
    cd: 0.68,
    diameterCm: 28.9,
    areaCm2: null,
    massG: 32.0,
    spillHoleRatio: 0,
    geometryType: 'cruciform',
    material: 'Dos paneles rectangulares ortogonales (relación largo/ancho 3:1)',
    vtNominal: 3.50,
    tdSeconds: 21.4,
    ekJoules: 0.196,
    equivalentFreeFallCm: 62,
    openingForceN: null,
    notes:
      'Diseño de alta estabilidad rotacional y manufactura de cortes rectos. Debido a su menor coeficiente de arrastre (C_d = 0.68), requiere un diámetro equivalente mayor (28.9 cm) para igualar los 3.50 m/s.',
  },
  {
    id: 'semiesferica-3d',
    name: 'Configuración Semiesférica 3D',
    subtitle: '6 a 8 gajos con spill hole 10% (m_t = 32.0 g)',
    badge: 'ALTERNATIVA TEÓRICA C',
    cd: 1.40,
    diameterCm: 20.2,
    areaCm2: null,
    massG: 32.0,
    spillHoleRatio: 0.1,
    geometryType: 'hemispherical',
    material: 'Campana tridimensional formada por 6 a 8 gajos curvos cosidos',
    vtNominal: 3.50,
    tdSeconds: 21.4,
    ekJoules: 0.196,
    equivalentFreeFallCm: 62,
    openingForceN: null,
    notes:
      'Maximiza el coeficiente de arrastre (C_d = 1.40), permitiendo reducir el diámetro a solo 20.2 cm para mantener v_t = 3.50 m/s, a cambio de mayor complejidad de patronaje y costura.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'maria-paula',
    name: 'MARÍA PAULA',
    lastName: 'LÓPEZ MORENO',
    fullName: 'María Paula López Moreno',
    role: 'Ingeniería Estructural & Manufactura Aditiva',
    specialty: 'Diseño CAD V10 & Polímeros PLA',
    badgeCode: 'WRT-01',
    image: '/images/team/maria-paula-lopez.jpg',
    contributions: [
      'Arquitectura estructural del fuselaje y separación de etapas en PLA (ρ ≈ 1.24 g/cm³).',
      'Control dimensional de las 6 piezas SolidWorks V10 y orientación vertical de impresión.',
    ],
  },
  {
    id: 'ruth-rosales',
    name: 'RUTH',
    lastName: 'ROSALES RAMÍREZ',
    fullName: 'Ruth Rosales Ramírez',
    role: 'Sistemas de Recuperación & Aerodinámica',
    specialty: 'Paracaídas Octogonal & Dinámica de Descenso',
    badgeCode: 'WRT-02',
    image: '/images/team/ruth-rosales.jpg',
    contributions: [
      'Diseño y manufactura del prototipo octogonal en Tafeta Stretch (D = 27.5 cm, S_0 = 534.7 cm²).',
      'Análisis de líneas de suspensión en Nylon Omega No. 2 y amortiguación por Shock Cord.',
    ],
  },
  {
    id: 'pablo-dominguez',
    name: 'PABLO MEDARDO',
    lastName: 'DOMÍNGUEZ OBESO',
    fullName: 'Pablo Medardo Domínguez Obeso',
    role: 'Propulsión Sólida & Balística Exterior',
    specialty: 'Motor Estes A10-3T & Estabilidad de Vuelo',
    badgeCode: 'WRT-03',
    image: '/images/team/pablo-dominguez.jpg',
    contributions: [
      'Integración del motor Estes A10-3T (2.5 Ns, empuje medio 5.7 N) y protección térmica Wadding.',
      'Cálculo de trayectoria de ascenso propulsado, inercia y apogeo estimado de 75 m en Culiacán.',
    ],
  },
  {
    id: 'karen-alba',
    name: 'KAREN',
    lastName: 'ALBA RIVER',
    fullName: 'Karen Alba River',
    role: 'Instrumentación Electrónica & Carga Útil',
    specialty: 'Aviónica Barométrica & Protección al Impacto',
    badgeCode: 'WRT-04',
    image: '/images/team/karen-alba.jpg',
    contributions: [
      'Integración del altímetro barométrico (12.0 g) y calibración de puertos estáticos de presión.',
      'Diseño de cuna amortiguadora en Goma EVA (5 mm) para disipación de energía cinética (0.244 J).',
    ],
  },
  {
    id: 'jovany-quintero',
    name: 'JOVANY',
    lastName: 'QUINTERO GÁMEZ',
    fullName: 'Jovany Quintero Gámez',
    role: 'Modelado Físico-Matemático & Simulación',
    specialty: 'Telemetría Interactiva & Arquitectura Digital',
    badgeCode: 'WRT-05',
    image: '/images/team/jovany-quintero.jpg',
    contributions: [
      'Modelado matemático de equilibrio dinámico, velocidad terminal (v_t) y tensión de apertura.',
      'Desarrollo del simulador paramétrico de vuelo y plataforma de evaluación de ingeniería.',
    ],
  },
];
