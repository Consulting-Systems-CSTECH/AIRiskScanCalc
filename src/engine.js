// ─────────────────────────────────────────────────────────────────────────────
// DATA — Domains & Questions
// ─────────────────────────────────────────────────────────────────────────────

export const SECTORS = [
  'Finanzas y Banca', 'Seguros', 'Telecomunicaciones', 'Salud', 'Educación',
  'Manufactura e Industria', 'Comercio y Retail', 'Gobierno / Sector Público',
  'Energía y Utilities', 'Tecnología', 'Otro',
]

export const SIZES = [
  '50–200 empleados',
  '201–500 empleados',
  '501–2,000 empleados',
  'Más de 2,000 empleados',
]

export const DOMAINS = [
  {
    id: 1, icon: '📡', weight: 0.20,
    title: 'Inventario de IA en Uso',
    subtitle: 'Visibilidad y control sobre las herramientas de IA activas en su organización',
    questions: [
      { id: 'd1q1', text: '¿Tiene su empresa un inventario formal de las herramientas de IA que utilizan sus empleados?',
        options: [{ l: 'Sí, completo y actualizado', r: 0 }, { l: 'En desarrollo / incompleto', r: 1 }, { l: 'No existe', r: 2 }] },
      { id: 'd1q2', text: '¿Los empleados utilizan herramientas de IA no autorizadas ("Shadow AI") para realizar su trabajo?',
        options: [{ l: 'No — tenemos controles activos que lo impiden', r: 0 }, { l: 'Ocasionalmente, de forma aislada', r: 1 }, { l: 'Frecuentemente, o simplemente no lo sabemos', r: 2 }] },
      { id: 'd1q3', text: '¿Existe un proceso formal de aprobación para incorporar nuevas herramientas de IA?',
        options: [{ l: 'Sí, con evaluación de seguridad incluida', r: 0 }, { l: 'Proceso informal o en planificación', r: 1 }, { l: 'No existe ningún proceso', r: 2 }] },
      { id: 'd1q4', text: '¿Cuántas herramientas de IA están actualmente en uso en su organización?',
        options: [{ l: 'Entre 1 y 5, todas debidamente identificadas', r: 0 }, { l: 'Entre 6 y 15', r: 1 }, { l: 'Más de 15, o no lo sabemos con certeza', r: 2 }] },
    ],
  },
  {
    id: 2, icon: '🗄️', weight: 0.25,
    title: 'Exposición de Datos',
    subtitle: 'Qué datos corporativos y de clientes se están compartiendo con sistemas de IA',
    questions: [
      { id: 'd2q1', text: '¿Los empleados ingresan datos de clientes o información confidencial en herramientas de IA (ChatGPT, Copilot, Gemini, etc.)?',
        options: [{ l: 'Nunca — existe política y controles activos', r: 0 }, { l: 'Raramente, sin política formal', r: 1 }, { l: 'Frecuentemente, o no lo sabemos', r: 2 }] },
      { id: 'd2q2', text: '¿Se ha clasificado qué tipos de datos se están compartiendo con herramientas de IA?',
        options: [{ l: 'Sí — mapa de datos completo y restricciones claras', r: 0 }, { l: 'Parcialmente — clasificación incompleta', r: 1 }, { l: 'No existe clasificación de datos', r: 2 }] },
      { id: 'd2q3', text: '¿Existen controles técnicos que impidan compartir datos sensibles con herramientas de IA externas?',
        options: [{ l: 'Sí, controles activos y monitoreados', r: 0 }, { l: 'Controles básicos o manuales', r: 1 }, { l: 'No existen controles técnicos', r: 2 }] },
      { id: 'd2q4', text: '¿Se ha firmado un Acuerdo de Tratamiento de Datos (DPA) con los proveedores de IA que utilizan?',
        options: [{ l: 'Sí, con todos los proveedores principales', r: 0 }, { l: 'Con algunos proveedores, no con todos', r: 1 }, { l: 'No — o simplemente no lo sabemos', r: 2 }] },
    ],
  },
  {
    id: 3, icon: '📋', weight: 0.25,
    title: 'Gobernanza y Políticas',
    subtitle: 'Madurez de las políticas, controles y responsabilidades sobre el uso de IA',
    questions: [
      { id: 'd3q1', text: '¿Existe una política formal de uso aceptable de IA en su organización?',
        options: [{ l: 'Sí, publicada, vigente y comunicada a todos', r: 0 }, { l: 'En desarrollo', r: 1 }, { l: 'No existe', r: 2 }] },
      { id: 'd3q2', text: '¿Los empleados han recibido capacitación sobre riesgos y uso seguro de IA?',
        options: [{ l: 'Sí, capacitación reciente (últimos 6 meses)', r: 0 }, { l: 'Hace más de 1 año o de forma muy parcial', r: 1 }, { l: 'No han recibido capacitación', r: 2 }] },
      { id: 'd3q3', text: '¿Hay un responsable designado (CISO, DPO u otro) para gestionar los riesgos relacionados con IA?',
        options: [{ l: 'Sí, con responsabilidades formales definidas', r: 0 }, { l: 'En planificación / responsabilidad compartida', r: 1 }, { l: 'No hay un responsable designado', r: 2 }] },
      { id: 'd3q4', text: '¿La alta dirección o directorio ha revisado formalmente los riesgos relacionados con el uso de IA?',
        options: [{ l: 'Sí, en el último año con documentación formal', r: 0 }, { l: 'Se ha discutido informalmente', r: 1 }, { l: 'No se ha tratado a nivel directivo', r: 2 }] },
    ],
  },
  {
    id: 4, icon: '⚡', weight: 0.20,
    title: 'Vectores de Ataque por IA',
    subtitle: 'Exposición ante ataques avanzados potenciados por inteligencia artificial',
    questions: [
      { id: 'd4q1', text: '¿La empresa ha capacitado a sus empleados sobre ataques potenciados por IA (deepfakes, phishing con IA, vishing automatizado)?',
        options: [{ l: 'Sí, con capacitación reciente y específica', r: 0 }, { l: 'En planificación / solo capacitación genérica', r: 1 }, { l: 'No — el equipo desconoce estas amenazas', r: 2 }] },
      { id: 'd4q2', text: '¿Existen controles para verificar identidades en comunicaciones financieras o ejecutivas críticas?',
        options: [{ l: 'Sí, doble verificación y canales alternativos establecidos', r: 0 }, { l: 'Controles básicos sin proceso de verificación formal', r: 1 }, { l: 'No existen controles específicos', r: 2 }] },
      { id: 'd4q3', text: '¿Se han realizado simulaciones de ataques de ingeniería social potenciados por IA en el último año?',
        options: [{ l: 'Sí, con escenarios que incluyen IA', r: 0 }, { l: 'Solo simulaciones convencionales, sin IA', r: 1 }, { l: 'Nunca se han realizado simulaciones', r: 2 }] },
      { id: 'd4q4', text: '¿Se evalúan los riesgos de seguridad en IA de sus proveedores y socios estratégicos?',
        options: [{ l: 'Sí, como parte formal del proceso de due diligence', r: 0 }, { l: 'Evaluación básica o informal', r: 1 }, { l: 'No se evalúa a proveedores en este aspecto', r: 2 }] },
    ],
  },
  {
    id: 5, icon: '⚖️', weight: 0.10,
    title: 'Postura Regulatoria',
    subtitle: 'Conocimiento y cumplimiento del marco legal de IA aplicable a su organización',
    questions: [
      { id: 'd5q1', text: '¿La empresa conoce la regulación de IA aplicable a su sector y región (LOPD Ecuador, EU AI Act, NIST AI RMF, etc.)?',
        options: [{ l: 'Sí, con asesoría legal especializada', r: 0 }, { l: 'Conocimiento parcial, sin asesoría formal', r: 1 }, { l: 'No conocemos el marco regulatorio aplicable', r: 2 }] },
      { id: 'd5q2', text: '¿Se ha evaluado el impacto de la LOPD ecuatoriana en el uso de herramientas de IA que procesan datos personales?',
        options: [{ l: 'Sí, con plan de cumplimiento documentado', r: 0 }, { l: 'En proceso de evaluación', r: 1 }, { l: 'No se ha evaluado', r: 2 }] },
      { id: 'd5q3', text: '¿Los contratos con proveedores de IA incluyen cláusulas de protección de datos y responsabilidades claras?',
        options: [{ l: 'Sí, en todos los contratos principales', r: 0 }, { l: 'En algunos contratos, no en todos', r: 1 }, { l: 'No existen tales cláusulas', r: 2 }] },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────────────────────────────────────

export function domainScore(domain, answers) {
  const max = domain.questions.length * 2
  const sum = domain.questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0)
  return max === 0 ? 0 : Math.round((sum / max) * 100)
}

export function overallScore(answers) {
  return Math.round(DOMAINS.reduce((acc, d) => acc + domainScore(d, answers) * d.weight, 0))
}

export function riskMeta(score) {
  if (score < 34) return { label: 'CONTROLADO', color: '#3A9B5C', bg: '#071A0E' }
  if (score < 67) return { label: 'MODERADO',   color: '#F59E0B', bg: '#1A1100' }
  return             { label: 'CRÍTICO',    color: '#EF4444', bg: '#1A0505' }
}

export function isDomainComplete(domain, answers) {
  return domain.questions.every((q) => answers[q.id] !== undefined)
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXT ENGINE  (100% static — no API calls)
// ─────────────────────────────────────────────────────────────────────────────

const SECTOR_PHRASE = {
  'Finanzas y Banca':
    'En el sector financiero, esto implica riesgo regulatorio directo ante la Superintendencia de Bancos y potenciales sanciones bajo la LOPD.',
  'Seguros':
    'En el sector asegurador, la exposición no controlada de datos de pólizas y clientes puede derivar en sanciones regulatorias y pérdida de contratos estratégicos.',
  'Telecomunicaciones':
    'En telecomunicaciones, las brechas en el uso de IA pueden exponer datos de millones de abonados y comprometer la continuidad de servicios críticos de la organización.',
  'Salud':
    'En el sector salud, el procesamiento de datos clínicos en herramientas de IA externas sin autorización constituye una violación grave a la privacidad del paciente y a la normativa sanitaria vigente.',
  'Educación':
    'En el sector educativo, la exposición de datos de estudiantes en plataformas de IA externas puede generar responsabilidades legales, daño reputacional y sanciones regulatorias.',
  'Manufactura e Industria':
    'En manufactura, la filtración de propiedad intelectual o procesos productivos a través de herramientas de IA representa un riesgo competitivo y de continuidad operacional significativo.',
  'Comercio y Retail':
    'En el sector comercial, la exposición de datos transaccionales y de clientes puede derivar en fraude, pérdida de confianza del consumidor y sanciones bajo la LOPD.',
  'Gobierno / Sector Público':
    'En el sector público, el uso no controlado de IA con datos ciudadanos puede generar violaciones constitucionales a la privacidad y daño institucional de difícil reversión.',
  'Energía y Utilities':
    'En el sector energético, las brechas de seguridad en IA pueden comprometer sistemas de control críticos y la continuidad del suministro a la ciudadanía.',
  'Tecnología':
    'En empresas tecnológicas, el riesgo de exponer código propietario, arquitecturas de sistemas y datos de clientes en modelos de IA externos es especialmente crítico y de impacto inmediato.',
  'Otro':
    'Las brechas identificadas representan riesgos operacionales, regulatorios y reputacionales que requieren una estrategia de control estructurada.',
}

const SUMMARY_TPL = {
  CRÍTICO: (co, sc, d1, d2, sect) =>
    `${co} presenta un Índice de Exposición AI™ de ${sc}/100 — nivel CRÍTICO. ${SECTOR_PHRASE[sect] ?? SECTOR_PHRASE['Otro']} Las brechas más severas se concentran en ${d1} y ${d2}, donde la exposición actual puede materializarse en un incidente de seguridad o en una observación regulatoria en el corto plazo.`,
  MODERADO: (co, sc, d1, d2, sect) =>
    `${co} obtiene un Índice de Exposición AI™ de ${sc}/100 — nivel MODERADO. La organización ha avanzado en la adopción de IA, pero existen brechas de control significativas en ${d1} y ${d2} que, sin atención oportuna, pueden escalar a incidentes de mayor impacto. ${SECTOR_PHRASE[sect] ?? SECTOR_PHRASE['Otro']}`,
  CONTROLADO: (co, sc, d1, _d2, _sect) =>
    `${co} presenta un Índice de Exposición AI™ de ${sc}/100 — nivel CONTROLADO. La organización muestra una postura relativamente madura frente al riesgo de IA. Se identifican oportunidades de mejora en ${d1} que, de atenderse, elevarían significativamente la resiliencia ante amenazas emergentes potenciadas por inteligencia artificial.`,
}

// Findings per domain × severity level
const FINDINGS = {
  1: {
    high:   { titulo: 'Shadow AI sin control ni visibilidad',       desc: 'La organización carece de un inventario formal de herramientas de IA en uso. La presencia de "Shadow AI" crea vectores de ataque no monitoreados y hace imposible una respuesta efectiva ante incidentes de seguridad relacionados con inteligencia artificial.', urgencia: 'INMEDIATA'    },
    medium: { titulo: 'Inventario de IA incompleto o informal',      desc: 'El inventario de herramientas de IA en uso es parcial o no sistemático. Esto genera puntos ciegos en la gestión de riesgos y dificulta decidir qué herramientas son seguras para uso corporativo.',                                                       urgencia: 'CORTO PLAZO'  },
    low:    { titulo: 'Proceso de aprobación de IA a formalizar',   desc: 'Existe visibilidad básica sobre las herramientas en uso, pero el proceso de aprobación e incorporación de nuevas herramientas de IA puede fortalecerse para prevenir riesgos en el futuro.',                                                                   urgencia: 'MEDIANO PLAZO' },
  },
  2: {
    high:   { titulo: 'Datos confidenciales expuestos en IA externa', desc: 'Información sensible de la organización y sus clientes está siendo procesada por plataformas de IA externas sin controles técnicos ni acuerdos contractuales adecuados. Esto genera riesgo directo de fuga de datos y potenciales violaciones a la LOPD.',          urgencia: 'INMEDIATA'    },
    medium: { titulo: 'Controles de datos en IA incompletos',         desc: 'Existen controles parciales sobre qué datos se comparten con herramientas de IA, pero sin cobertura total. Las brechas identificadas pueden derivar en la exposición no intencional de información confidencial de clientes o de la propia organización.',          urgencia: 'CORTO PLAZO'  },
    low:    { titulo: 'Acuerdos DPA con proveedores de IA pendientes',desc: 'La clasificación de datos y los controles técnicos son adecuados, pero los acuerdos de tratamiento de datos (DPA) con algunos proveedores de IA no están completos, dejando vacíos contractuales y responsabilidades legales no cubiertas.',                  urgencia: 'MEDIANO PLAZO' },
  },
  3: {
    high:   { titulo: 'Ausencia de gobernanza formal de IA',           desc: 'La organización no cuenta con políticas, responsables designados ni revisión directiva sobre el riesgo de IA. En caso de incidente, la trazabilidad de responsabilidades y la capacidad de respuesta organizacional serán prácticamente nulas.',              urgencia: 'INMEDIATA'    },
    medium: { titulo: 'Gobernanza de IA en etapa inicial',             desc: 'Las políticas y responsabilidades sobre IA están siendo definidas, pero aún no se han formalizado ni comunicado a toda la organización. La ventana de riesgo durante este período de transición debe gestionarse activamente.',                                 urgencia: 'CORTO PLAZO'  },
    low:    { titulo: 'Capacitación en riesgos de IA por actualizar', desc: 'La gobernanza base existe, pero la capacitación de empleados sobre riesgos de IA no está al día. Las amenazas evolucionan rápidamente y los equipos requieren actualización periódica para mantener una postura defensiva efectiva.',                           urgencia: 'MEDIANO PLAZO' },
  },
  4: {
    high:   { titulo: 'Empleados vulnerables ante ataques con IA',      desc: 'La organización no ha preparado a su equipo para enfrentar ataques potenciados por IA — deepfakes de voz y video, phishing hiperpersonalizado y vishing automatizado. Estos representan el vector de mayor crecimiento en la región durante 2025–2026.',          urgencia: 'INMEDIATA'    },
    medium: { titulo: 'Simulaciones de ataque con IA pendientes',        desc: 'Las simulaciones realizadas no incorporan escenarios con IA. Los atacantes actuales utilizan modelos de lenguaje para personalizar campañas a escala, superando las defensas entrenadas únicamente con escenarios convencionales.',                           urgencia: 'CORTO PLAZO'  },
    low:    { titulo: 'Due diligence de IA en proveedores por reforzar', desc: 'Los controles internos son adecuados, pero la evaluación de riesgos de IA en la cadena de proveedores y socios estratégicos es limitada. Un proveedor comprometido puede convertirse en el vector de entrada a la organización.',                              urgencia: 'MEDIANO PLAZO' },
  },
  5: {
    high:   { titulo: 'Exposición regulatoria ante marcos de IA aplicables', desc: 'La organización opera al margen del marco regulatorio de IA vigente en Ecuador y la región. Esto puede derivar en sanciones, incumplimiento contractual con clientes o exclusión de procesos de licitación que exijan cumplimiento normativo en materia de IA.', urgencia: 'CORTO PLAZO'  },
    medium: { titulo: 'Cumplimiento LOPD en uso de IA por validar',          desc: 'El impacto de la LOPD en las herramientas de IA que procesan datos personales no ha sido evaluado formalmente. Sin contratos DPA adecuados, la organización asume responsabilidades legales no cuantificadas.',                                              urgencia: 'CORTO PLAZO'  },
    low:    { titulo: 'Contratos con proveedores de IA a completar',         desc: 'La postura regulatoria es razonablemente sólida, pero algunos contratos con proveedores de IA aún carecen de cláusulas de protección de datos. Este vacío legal debe cerrarse antes de ampliar el uso de estas herramientas.',                                 urgencia: 'MEDIANO PLAZO' },
  },
}

const NEXT_STEP = {
  1: 'Recomendamos iniciar la Auditoría Completa de Seguridad en IA de CSTECH, que incluye el levantamiento de inventario, la evaluación de riesgos por herramienta y un plan de remediación priorizado.',
  2: 'Recomendamos una Auditoría de Exposición de Datos en IA para identificar y remediar los flujos de información no controlados hacia plataformas externas, en combinación con un Diagnóstico de Cumplimiento LOPD.',
  3: 'Recomendamos el servicio de Desarrollo de Políticas de Seguridad y Capacitación Ejecutiva en IA de CSTECH para establecer un marco de gobernanza formal en el menor tiempo posible.',
  4: 'Recomendamos contratar una simulación de Red Team con escenarios de ingeniería social potenciados por IA para medir la resistencia real de su equipo humano ante estas amenazas emergentes.',
  5: 'Recomendamos el servicio de Diagnóstico de Cumplimiento LOPD de CSTECH, que evaluará el impacto regulatorio del uso de IA en su organización y generará un plan de acción legal y técnico.',
}

export function generateReport(answers, info) {
  const score = overallScore(answers)
  const { label } = riskMeta(score)

  const ranked = DOMAINS
    .map((d) => ({ ...d, score: domainScore(d, answers) }))
    .sort((a, b) => b.score - a.score)

  const [worst, second] = ranked
  const company = info.name?.trim() || 'Su organización'

  const resumen_ejecutivo = SUMMARY_TPL[label](
    company, score, worst.title, second.title, info.sector
  )

  const hallazgos = ranked.slice(0, 3).map((d) => {
    const lv = d.score >= 67 ? 'high' : d.score >= 34 ? 'medium' : 'low'
    const f  = FINDINGS[d.id]?.[lv] ?? FINDINGS[d.id]?.medium
    return { titulo: f.titulo, descripcion: f.desc, urgencia: f.urgencia }
  })

  const siguiente_paso = NEXT_STEP[worst.id] ??
    'Recomendamos contratar la Auditoría Completa de Seguridad en IA de CSTECH para obtener un plan de remediación detallado, priorizado y alineado a su sector y contexto regulatorio.'

  return { resumen_ejecutivo, hallazgos, siguiente_paso }
}
