import { useState } from 'react'
import {
  DOMAINS, SECTORS, SIZES,
  domainScore, overallScore, riskMeta, isDomainComplete, generateReport,
} from './engine.js'

// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const LOGO_URL  = 'https://consulting-systems.tech/wp-content/uploads/2018/09/cropped-CS_LogoNEW-1-600x178.png'
const BOOK_URL  = 'https://consulting-systems.tech/asesoria-gratuita'
const C = {
  bg:      '#0A1628', navy:  '#1B2E4B', blue:  '#1E3A5F',
  green:   '#3A9B5C', gl:    '#4DB872', white: '#FFFFFF',
  muted:   '#94A3B8', dim:   '#64748B', border:'#243756',
  danger:  '#EF4444', warn:  '#F59E0B',
}
const FONT = "'Montserrat', sans-serif"
const BODY = "'Open Sans', sans-serif"

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function Shell({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: FONT, padding: '0 16px 64px' }}>
      {children}
    </div>
  )
}

function TopBar({ step, total }) {
  const pct = total > 0 ? (step / total) * 100 : 0
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingTop: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: C.green, fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>AI RISKSCAN™</span>
        {total > 0 && <span style={{ color: C.dim, fontSize: 11 }}>Paso {step} de {total}</span>}
      </div>
      <div style={{ height: 3, background: C.navy, borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: C.green, borderRadius: 2, transition: 'width .4s ease' }} />
      </div>
    </div>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, ...style }}>
      {children}
    </div>
  )
}

function Btn({ children, onClick, disabled = false, ghost = false, style = {} }) {
  const base = {
    border: 'none', borderRadius: 10, padding: '13px 24px', fontSize: 14, fontWeight: 700,
    cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: FONT, transition: 'background .15s', ...style,
  }
  if (ghost) return (
    <button onClick={onClick} style={{ ...base, background: 'transparent', color: C.muted, border: `1px solid ${C.border}` }}>
      {children}
    </button>
  )
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, background: disabled ? C.blue : C.green, color: disabled ? C.dim : C.white }}>
      {children}
    </button>
  )
}

function Logo({ height = 40 }) {
  const [err, setErr] = useState(false)
  if (err) return <span style={{ color: C.white, fontWeight: 900, fontSize: 18, letterSpacing: 2 }}>CSTECH</span>
  return <img src={LOGO_URL} alt="CSTECH" height={height} style={{ objectFit: 'contain' }} onError={() => setErr(true)} />
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 0 — INTRO
// ─────────────────────────────────────────────────────────────────────────────
function Intro({ onStart }) {
  return (
    <Shell>
      <TopBar step={0} total={0} />
      <div className="fade-up" style={{ maxWidth: 580, margin: '56px auto 0', textAlign: 'center' }}>

        <div style={{ display: 'inline-block', marginBottom: 36 }}>
          <Logo height={44} />
        </div>

        <h1 style={{ color: C.white, fontSize: 46, fontWeight: 900, margin: '0 0 6px', lineHeight: 1.05 }}>
          AI RiskScan<span style={{ color: C.green }}>™</span>
        </h1>
        <p style={{ color: C.muted, fontSize: 17, fontFamily: BODY, marginBottom: 44, lineHeight: 1.75 }}>
          Descubra en <strong style={{ color: C.white }}>10 minutos</strong> qué tan expuesta está<br />
          su organización por el uso de inteligencia artificial.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
          {[['5', 'dominios de riesgo'], ['19', 'preguntas clave'], ['1', 'informe ejecutivo']].map(([n, l]) => (
            <div key={n} style={{ background: C.navy, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 26px', minWidth: 110 }}>
              <div style={{ color: C.green, fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{n}</div>
              <div style={{ color: C.dim, fontSize: 11, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <Btn onClick={onStart} style={{ fontSize: 16, padding: '16px 56px' }}>
          Iniciar diagnóstico →
        </Btn>
        <p style={{ color: C.dim, fontSize: 12, marginTop: 14, fontFamily: BODY }}>
          Sin compromisos · Información tratada con estricta confidencialidad
        </p>
      </div>
    </Shell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 1 — COMPANY INFO
// ─────────────────────────────────────────────────────────────────────────────
function CompanyInfo({ info, onChange, onNext, onBack }) {
  const valid = info.name.trim() && info.sector && info.size
  const inputStyle = {
    width: '100%', background: C.navy, border: `1px solid ${C.border}`,
    borderRadius: 8, padding: '12px 16px', color: C.white, fontSize: 14,
    outline: 'none', fontFamily: BODY,
  }
  return (
    <Shell>
      <TopBar step={1} total={7} />
      <div className="fade-up" style={{ maxWidth: 520, margin: '40px auto 0' }}>
        <h2 style={{ color: C.white, fontWeight: 700, fontSize: 24, marginBottom: 6 }}>
          Información de su organización
        </h2>
        <p style={{ color: C.muted, fontFamily: BODY, marginBottom: 32, fontSize: 14 }}>
          Permite personalizar el análisis de riesgo a su contexto específico.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

          <div>
            <label style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'block', marginBottom: 8 }}>
              NOMBRE DE LA EMPRESA
            </label>
            <input
              type="text" value={info.name} placeholder="Ej. Banco del Pacífico"
              onChange={(e) => onChange({ ...info, name: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'block', marginBottom: 8 }}>
              SECTOR
            </label>
            <select
              value={info.sector} onChange={(e) => onChange({ ...info, sector: e.target.value })}
              style={{ ...inputStyle, color: info.sector ? C.white : C.dim }}
            >
              <option value="">Seleccione su sector...</option>
              {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: 2, display: 'block', marginBottom: 8 }}>
              TAMAÑO DE LA ORGANIZACIÓN
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SIZES.map((sz) => (
                <button key={sz} onClick={() => onChange({ ...info, size: sz })} style={{
                  background: info.size === sz ? C.blue : 'transparent',
                  border: `1px solid ${info.size === sz ? C.green : C.border}`,
                  borderRadius: 8, padding: '11px 16px',
                  color: info.size === sz ? C.white : C.muted,
                  fontSize: 13, cursor: 'pointer', textAlign: 'left',
                  fontFamily: BODY, transition: 'all .15s',
                }}>
                  {sz}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <Btn ghost onClick={onBack}>← Atrás</Btn>
          <Btn onClick={onNext} disabled={!valid} style={{ flex: 1 }}>Comenzar evaluación →</Btn>
        </div>
      </div>
    </Shell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 2–6 — DOMAIN QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────
function DomainStep({ domain, domainIndex, answers, onChange, onNext, onBack, isLast }) {
  const done = isDomainComplete(domain, answers)
  const answered = domain.questions.filter((q) => answers[q.id] !== undefined).length

  return (
    <Shell>
      <TopBar step={domainIndex + 2} total={7} />
      <div className="fade-up" style={{ maxWidth: 600, margin: '36px auto 0' }}>

        {/* Domain header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12,
            background: `${C.green}18`, border: `1px solid ${C.green}33`,
            borderRadius: 6, padding: '4px 12px',
          }}>
            <span style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 2 }}>
              DOMINIO {domainIndex + 1} / 5
            </span>
          </div>
          <h2 style={{ color: C.white, fontWeight: 700, fontSize: 22, margin: '0 0 6px' }}>
            {domain.icon} {domain.title}
          </h2>
          <p style={{ color: C.muted, fontFamily: BODY, fontSize: 13, margin: 0 }}>{domain.subtitle}</p>
        </div>

        {/* Progress pips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          {domain.questions.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: answers[domain.questions[i].id] !== undefined ? C.green : C.border,
              transition: 'background .3s',
            }} />
          ))}
          <span style={{ color: C.dim, fontSize: 11, whiteSpace: 'nowrap' }}>{answered}/{domain.questions.length}</span>
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {domain.questions.map((q, qi) => (
            <Card key={q.id}>
              <p style={{
                color: answers[q.id] !== undefined ? C.white : C.muted,
                fontWeight: 600, fontSize: 14, fontFamily: BODY, margin: '0 0 14px', lineHeight: 1.6,
              }}>
                <span style={{ color: C.green, marginRight: 6 }}>{qi + 1}.</span>{q.text}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {q.options.map((opt) => {
                  const sel = answers[q.id] === opt.r
                  return (
                    <button key={opt.l} onClick={() => onChange({ ...answers, [q.id]: opt.r })} style={{
                      background: sel ? C.blue : 'transparent',
                      border: `1px solid ${sel ? C.green : '#2A3F5C'}`,
                      borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                      color: sel ? C.white : C.muted,
                      fontSize: 13, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                      fontFamily: BODY, transition: 'all .15s',
                    }}>
                      <span style={{
                        width: 17, height: 17, borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${sel ? C.green : '#2A3F5C'}`,
                        background: sel ? C.green : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {sel && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
                      </span>
                      {opt.l}
                    </button>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Btn ghost onClick={onBack}>← Atrás</Btn>
          <Btn onClick={onNext} disabled={!done} style={{ flex: 1 }}>
            {isLast ? 'Ver mi informe de riesgo →' : 'Siguiente dominio →'}
          </Btn>
        </div>
      </div>
    </Shell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG GAUGE
// ─────────────────────────────────────────────────────────────────────────────
function Gauge({ score, color }) {
  // Gauge arc: starts at lower-left (140°), sweeps 260° clockwise to lower-right (40°)
  const cx = 90, cy = 82, r = 64
  const toRad = (d) => (d * Math.PI) / 180
  const pt = (deg) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  })
  const arcD = (startDeg, sweep) => {
    if (sweep <= 0) return ''
    const s = pt(startDeg)
    const capSweep = Math.min(sweep, 259.9)
    const e = pt(startDeg + capSweep)
    const large = capSweep > 180 ? 1 : 0
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
  }

  const START = 140
  const SWEEP = 260
  const fillSweep = SWEEP * (score / 100)

  return (
    <svg width={180} height={130} viewBox="0 0 180 130">
      {/* Track */}
      <path d={arcD(START, SWEEP)} fill="none" stroke={C.blue} strokeWidth={11} strokeLinecap="round" />
      {/* Fill */}
      {score > 0 && (
        <path d={arcD(START, fillSweep)} fill="none" stroke={color} strokeWidth={11} strokeLinecap="round" />
      )}
      {/* Score text */}
      <text x={cx} y={cy + 8} textAnchor="middle" fill={color} fontSize={32} fontWeight={900} fontFamily={FONT}>
        {score}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" fill={C.dim} fontSize={11} fontFamily={BODY}>
        de 100
      </text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 7 — RESULTS
// ─────────────────────────────────────────────────────────────────────────────
const URGENCY_COLOR = { INMEDIATA: C.danger, 'CORTO PLAZO': C.warn, 'MEDIANO PLAZO': C.green }

function Results({ answers, info, report }) {
  const score = overallScore(answers)
  const risk  = riskMeta(score)
  const today = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })

  const domainData = DOMAINS.map((d) => {
    const s = domainScore(d, answers)
    return { ...d, score: s, risk: riskMeta(s) }
  })

  return (
    <Shell>
      <div className="scale-in" style={{ maxWidth: 720, margin: '0 auto', paddingTop: 32 }}>

        {/* ── Report header ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: 32, flexWrap: 'wrap', gap: 12,
        }}>
          <Logo height={38} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: C.green, fontSize: 11, fontWeight: 700, letterSpacing: 3 }}>AI RISKSCAN™</div>
            <div style={{ color: C.muted, fontSize: 12, fontFamily: BODY }}>{info.name} · {info.sector}</div>
            <div style={{ color: C.dim, fontSize: 11, fontFamily: BODY }}>{today}</div>
          </div>
        </div>

        {/* ── Score hero ── */}
        <div style={{
          background: risk.bg, border: `1px solid ${risk.color}33`, borderRadius: 16,
          padding: '28px 28px', marginBottom: 18,
          display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap',
        }}>
          <div style={{ flexShrink: 0 }}>
            <Gauge score={score} color={risk.color} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 3, margin: '0 0 8px' }}>
              ÍNDICE DE EXPOSICIÓN AI™
            </p>
            <div style={{
              display: 'inline-block', background: `${risk.color}22`,
              border: `1px solid ${risk.color}44`, borderRadius: 6,
              padding: '4px 14px', marginBottom: 14,
            }}>
              <span style={{ color: risk.color, fontWeight: 700, letterSpacing: 3, fontSize: 13 }}>{risk.label}</span>
            </div>
            <p style={{ color: C.muted, fontFamily: BODY, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              {report.resumen_ejecutivo}
            </p>
          </div>
        </div>

        {/* ── Two-column: domain breakdown + findings ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 16, marginBottom: 16 }}>

          {/* Domain bars */}
          <Card>
            <p style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 3, margin: '0 0 20px' }}>
              ANÁLISIS POR DOMINIO
            </p>
            {domainData.map((d) => (
              <div key={d.id} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ color: C.white, fontSize: 12, fontFamily: BODY }}>
                    {d.icon} {d.title}
                  </span>
                  <span style={{ color: d.risk.color, fontSize: 12, fontWeight: 700 }}>{d.score}</span>
                </div>
                <div style={{ background: C.bg, borderRadius: 3, height: 5 }}>
                  <div style={{
                    background: d.risk.color, height: '100%', borderRadius: 3,
                    width: `${d.score}%`, transition: 'width 1.2s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <span style={{ color: C.dim, fontSize: 10, fontFamily: BODY }}>{d.risk.label}</span>
                  <span style={{ color: C.dim, fontSize: 10 }}>· peso {Math.round(d.weight * 100)}%</span>
                </div>
              </div>
            ))}
          </Card>

          {/* Findings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 3, margin: '0 0 4px' }}>
              HALLAZGOS PRIORITARIOS
            </p>
            {report.hallazgos.map((h, i) => (
              <Card key={i} style={{
                padding: '16px', flex: 1,
                borderLeft: `3px solid ${URGENCY_COLOR[h.urgencia] ?? C.green}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
                  <span style={{ color: C.white, fontWeight: 700, fontSize: 13, lineHeight: 1.3, flex: 1 }}>
                    {h.titulo}
                  </span>
                  <span style={{
                    background: `${URGENCY_COLOR[h.urgencia]}22`,
                    color: URGENCY_COLOR[h.urgencia], fontSize: 9, fontWeight: 700,
                    padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', marginLeft: 8,
                  }}>
                    {h.urgencia}
                  </span>
                </div>
                <p style={{ color: C.muted, fontFamily: BODY, fontSize: 12, margin: 0, lineHeight: 1.55 }}>
                  {h.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* ── Remediation horizons ── */}
        <Card style={{ marginBottom: 16 }}>
          <p style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 3, margin: '0 0 16px' }}>
            HORIZONTES DE REMEDIACIÓN RECOMENDADOS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { label: 'Corto plazo', range: '0–30 días', color: C.danger, items: ['Política básica de uso de IA', 'Inventario de herramientas en uso', 'Comunicado interno a empleados'] },
              { label: 'Mediano plazo', range: '1–3 meses', color: C.warn, items: ['Capacitación anti-phishing con IA', 'Controles técnicos de datos', 'Designar responsable de riesgos IA'] },
              { label: 'Largo plazo', range: '3–12 meses', color: C.green, items: ['Auditoría completa de seguridad IA', 'Gobernanza formal y DPAs firmados', 'Simulaciones Red Team con IA'] },
            ].map((h) => (
              <div key={h.label} style={{ background: C.bg, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>{h.label}</div>
                    <div style={{ color: C.dim, fontSize: 10, fontFamily: BODY }}>{h.range}</div>
                  </div>
                </div>
                {h.items.map((it) => (
                  <div key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 7 }}>
                    <span style={{ color: h.color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span style={{ color: C.muted, fontSize: 11, fontFamily: BODY, lineHeight: 1.45 }}>{it}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* ── CTA ── */}
        <div style={{
          background: C.blue, border: `1px solid ${C.green}33`, borderRadius: 16,
          padding: '28px 28px', textAlign: 'center',
        }}>
          <p style={{ color: C.white, fontWeight: 700, fontSize: 17, marginBottom: 8 }}>¿Qué sigue?</p>
          <p style={{ color: C.muted, fontFamily: BODY, fontSize: 13, marginBottom: 24, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 24px' }}>
            {report.siguiente_paso}
          </p>
          <div className="no-print" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{
              background: C.green, color: C.white, textDecoration: 'none',
              borderRadius: 10, padding: '14px 32px', fontSize: 14, fontWeight: 700,
              display: 'inline-block',
            }}>
              Agendar asesoría gratuita →
            </a>
            <button onClick={() => window.print()} style={{
              background: 'transparent', color: C.muted, border: `1px solid ${C.border}`,
              borderRadius: 10, padding: '14px 24px', fontSize: 13, cursor: 'pointer', fontFamily: FONT,
            }}>
              Imprimir / Guardar PDF
            </button>
          </div>
        </div>

        <p style={{ color: '#1E3A5F', fontSize: 11, textAlign: 'center', marginTop: 20, fontFamily: BODY }}>
          AI RiskScan™ es un diagnóstico ejecutivo de alto nivel. No reemplaza una auditoría completa de seguridad.
          &nbsp;©&nbsp;CSTECH — Consulting Systems · consulting-systems.tech
        </p>
      </div>
    </Shell>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP — State machine & routing
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // step: 0=intro, 1=info, 2-6=domains, 7=results
  const [step,    setStep]    = useState(0)
  const [info,    setInfo]    = useState({ name: '', sector: '', size: '' })
  const [answers, setAnswers] = useState({})
  const [report,  setReport]  = useState(null)

  // Always scroll to top before changing screen
  function nav(n) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setStep(n)
  }

  function goToResults() {
    setReport(generateReport(answers, info))
    nav(7)
  }

  if (step === 0) return <Intro onStart={() => nav(1)} />

  if (step === 1) return (
    <CompanyInfo
      info={info} onChange={setInfo}
      onNext={() => nav(2)} onBack={() => nav(0)}
    />
  )

  if (step >= 2 && step <= 6) {
    const di = step - 2
    return (
      <DomainStep
        domain={DOMAINS[di]}
        domainIndex={di}
        answers={answers}
        onChange={setAnswers}
        onNext={() => step === 6 ? goToResults() : nav(step + 1)}
        onBack={() => nav(step - 1)}
        isLast={step === 6}
      />
    )
  }

  if (step === 7 && report) return <Results answers={answers} info={info} report={report} />

  return null
}
