import { useState } from "react";

function MetricCard({ label, value, sub, color = "#a855f7", small }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: small ? "8px 12px" : "12px 16px", flex: "1 1 110px", minWidth: 110,
    }}>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: small ? 16 : 22, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "#475569", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function AlertBox({ type, title, children }) {
  const c = {
    success: { bg: "rgba(34,197,94,0.08)", border: "#22c55e", icon: "✅" },
    warning: { bg: "rgba(245,158,11,0.08)", border: "#f59e0b", icon: "⚠️" },
    danger: { bg: "rgba(239,68,68,0.08)", border: "#ef4444", icon: "🚨" },
    info: { bg: "rgba(6,182,212,0.08)", border: "#06b6d4", icon: "💡" },
  }[type];
  return (
    <div style={{ background: c.bg, borderLeft: `3px solid ${c.border}`, borderRadius: "0 10px 10px 0", padding: "12px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: c.border, marginBottom: 4 }}>{c.icon} {title}</div>
      <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function GateCheck({ label, met, detail }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
        background: met ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)",
        border: met ? "1px solid #22c55e" : "1px solid rgba(255,255,255,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: met ? "#22c55e" : "#475569",
      }}>{met ? "✓" : "○"}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: met ? "#22c55e" : "#94a3b8" }}>{label}</div>
        {detail && <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{detail}</div>}
      </div>
    </div>
  );
}

function RevenueBar({ label, value, max, color, prefix = "R$ " }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#94a3b8" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{prefix}{value.toLocaleString("pt-BR")}/mes</span>
      </div>
      <div style={{ height: 10, borderRadius: 5, background: "rgba(255,255,255,0.06)" }}>
        <div style={{
          height: "100%", borderRadius: 5,
          width: `${Math.max((value / max) * 100, 3)}%`,
          background: `linear-gradient(90deg, ${color}, ${color}66)`,
        }} />
      </div>
    </div>
  );
}

const PHASES = [
  {
    id: 1,
    tag: "FASE 1",
    title: "Agregador + Afiliado",
    subtitle: "Mes 1-6",
    color: "#a855f7",
    icon: "🚀",
    status: "Entrada no mercado",
    goal: "Provar que existe demanda e coletar dados de conversao",
    revenue: {
      model: "Comissao de afiliado (1-3%)",
      pessimist: 50,
      realist: 336,
      optimist: 1350,
      note: "Receita baixa e esperada. O objetivo nao e lucrar, e validar.",
    },
    metrics: [
      { label: "MAU alvo", value: "1.000 - 3.000" },
      { label: "Eventos cadastrados", value: "30-50 (curadoria manual)" },
      { label: "CTR afiliado alvo", value: "> 10%" },
      { label: "Custo de operacao", value: "~R$ 0 (servidor free tier)" },
    ],
    tasks: [
      "Seed de eventos manual (melhores festas do Rio)",
      "Mapa com pins neon + detalhes do evento",
      "Botao de afiliado com tracking de cliques",
      "Vibometro com check-in manual",
      "Link de WhatsApp por evento",
      "Dashboard interno de analytics (cliques, CTR, conversao)",
    ],
    gates: [
      { label: "2.000+ MAU consistentes por 2 meses", detail: "Prova que tem audiencia recorrente, nao so curiosos" },
      { label: "CTR do afiliado > 8%", detail: "Prova que os usuarios confiam no redirect" },
      { label: "Pelo menos 3 produtores pediram pra listar evento", detail: "Demanda organica = sinal forte" },
      { label: "Dados de conversao documentados", detail: "Ex: 'X% dos cliques viraram compra no Sympla'" },
    ],
    risks: [
      "Poucos eventos = app vazio = usuario desinstala",
      "Solucao: foco em 1 regiao (Zona Sul + Lapa) com curadoria impecavel",
    ],
  },
  {
    id: 2,
    tag: "FASE 2",
    title: "Venda Direta + Parcerias",
    subtitle: "Mes 6-12",
    color: "#ec4899",
    icon: "🎫",
    status: "Monetizacao real",
    goal: "Vender ingressos dentro da plataforma com margem de 5-10%",
    revenue: {
      model: "Taxa de conveniencia (5-10%) + Destaque patrocinado",
      pessimist: 1500,
      realist: 5000,
      optimist: 15000,
      note: "Receita 10-15x maior que Fase 1 com a mesma base de usuarios.",
    },
    metrics: [
      { label: "MAU alvo", value: "5.000 - 10.000" },
      { label: "Parceiros (casas/produtores)", value: "5-15 ativos" },
      { label: "Taxa por ingresso", value: "5-10%" },
      { label: "Destaque patrocinado", value: "R$ 200-500/evento" },
    ],
    tasks: [
      "Checkout simples in-app (Pix + cartao via Stripe/Mercado Pago)",
      "Painel do produtor: cadastrar evento, ver vendas, receber repasse",
      "QR Code de ingresso + scanner basico (PWA)",
      "Sistema de destaque patrocinado no mapa",
      "Contrato padrao com produtores (repasse em D+2 apos evento)",
      "Suporte minimo via WhatsApp Business",
    ],
    gates: [
      { label: "10.000+ MAU", detail: "Volume suficiente pra justificar infraestrutura de pagamento" },
      { label: "15+ produtores parceiros ativos", detail: "Pipeline de eventos estavel sem depender de curadoria manual" },
      { label: "Receita mensal > R$ 5.000 consistente", detail: "Prova que o modelo sustenta operacao" },
      { label: "Chargeback < 2%", detail: "Operacao de pagamento saudavel e controlada" },
    ],
    risks: [
      "Chargeback e fraude em pagamentos",
      "Produtor nao recebe a tempo e perde confianca",
      "QR Code falha na porta do evento",
      "Solucao: comece com 2-3 parceiros de confianca, teste o fluxo antes de escalar",
    ],
  },
  {
    id: 3,
    tag: "FASE 3",
    title: "SaaS: Assinatura pra Promoters",
    subtitle: "Mes 12-18",
    color: "#06b6d4",
    icon: "💎",
    status: "Receita recorrente",
    goal: "Transformar promoters em assinantes com ferramentas de gestao",
    revenue: {
      model: "Assinatura mensal (R$ 49-149/mes) + comissao sobre vendas do promoter",
      pessimist: 3000,
      realist: 12000,
      optimist: 40000,
      note: "Receita recorrente e previsivel. Cada promoter novo e MRR garantido.",
    },
    metrics: [
      { label: "MAU alvo", value: "10.000 - 30.000" },
      { label: "Promoters assinantes", value: "30-100" },
      { label: "Planos", value: "Basic R$49 / Pro R$99 / Premium R$149" },
      { label: "Churn alvo", value: "< 8% mensal" },
    ],
    tasks: [
      "Painel do Promoter: link proprio, analytics de cliques, comissao, ranking",
      "Sistema de assinatura recorrente (Stripe/Asaas)",
      "3 tiers de plano com features progressivas",
      "Ferramenta de lista VIP: promoter gera link exclusivo, controla entrada",
      "Relatorio mensal automatico pro promoter (vendas, comissao, alcance)",
      "Programa de indicacao: promoter indica promoter, ganha 1 mes gratis",
    ],
    gates: [
      { label: "30.000+ MAU", detail: "Audiencia grande o suficiente pra promoter ver valor em pagar" },
      { label: "100+ promoters assinantes", detail: "SaaS viavel com base solida de MRR" },
      { label: "MRR > R$ 10.000", detail: "Receita recorrente cobre custos e permite contratar" },
      { label: "NPS dos promoters > 40", detail: "Promoters satisfeitos = retencao + indicacao organica" },
    ],
    risks: [
      "Promoter cancela se nao vender o suficiente pelo app",
      "Competicao com ferramentas proprias do Sympla/Ingresse",
      "Solucao: trial gratis de 30 dias, so cobra quando o promoter VER resultado",
    ],
  },
];

const PLANS = [
  {
    name: "Basic",
    price: 49,
    color: "#a855f7",
    features: [
      "Link de afiliado personalizado",
      "Dashboard de cliques e vendas",
      "Ate 5 eventos simultaneos",
      "Relatorio mensal basico",
    ],
    audience: "Promoter iniciante, faz 2-3 festas/mes",
  },
  {
    name: "Pro",
    price: 99,
    color: "#ec4899",
    features: [
      "Tudo do Basic +",
      "Eventos ilimitados",
      "Lista VIP digital",
      "Destaque no mapa (1 evento/mes)",
      "Analytics avancado (conversao por horario)",
    ],
    audience: "Promoter ativo, 5-10 festas/mes",
  },
  {
    name: "Premium",
    price: 149,
    color: "#06b6d4",
    features: [
      "Tudo do Pro +",
      "Destaque ilimitado no mapa",
      "Badge verificado no perfil",
      "Suporte prioritario",
      "API de integracao (futuro)",
      "Co-branding no evento",
    ],
    audience: "Agencia/promoter profissional, 10+ festas/mes",
  },
];

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(1);
  const [showPlans, setShowPlans] = useState(false);

  const phase = PHASES.find(p => p.id === activePhase);
  const maxRevenue = PHASES[2].revenue.optimist;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a0f 0%, #12091f 50%, #0a0f1a 100%)",
      color: "#e2e8f0",
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
      padding: "24px 16px",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#ec4899", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Roadmap de Monetizacao
          </div>
          <h1 style={{
            margin: "0 0 4px", fontSize: 22, fontWeight: 800,
            background: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>SpotVibe — Da Validacao ao SaaS</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>3 fases com gatilhos de transicao baseados em dados reais</p>
        </div>

        {/* Timeline visual */}
        <div style={{
          display: "flex", alignItems: "center", gap: 0, marginBottom: 24,
          background: "rgba(255,255,255,0.02)", borderRadius: 14, padding: "16px 12px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {PHASES.map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <button
                onClick={() => setActivePhase(p.id)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 6, cursor: "pointer", border: "none", background: "none",
                  flex: 1, padding: 0,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: activePhase === p.id ? `linear-gradient(135deg, ${p.color}, ${p.color}88)` : "rgba(255,255,255,0.06)",
                  border: activePhase === p.id ? `2px solid ${p.color}` : "2px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, transition: "all 0.2s",
                  boxShadow: activePhase === p.id ? `0 0 20px ${p.color}40` : "none",
                }}>{p.icon}</div>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: activePhase === p.id ? p.color : "#475569",
                  textAlign: "center", lineHeight: 1.3,
                }}>
                  {p.tag}
                  <div style={{ fontSize: 9, fontWeight: 400, color: "#475569" }}>{p.subtitle}</div>
                </div>
              </button>
              {i < PHASES.length - 1 && (
                <div style={{
                  height: 2, flex: "0 0 20px",
                  background: i < activePhase - 1
                    ? `linear-gradient(90deg, ${PHASES[i].color}, ${PHASES[i + 1].color})`
                    : "rgba(255,255,255,0.08)",
                  borderRadius: 1,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Phase header */}
        <div style={{
          background: `linear-gradient(135deg, ${phase.color}12, ${phase.color}05)`,
          border: `1px solid ${phase.color}30`,
          borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 6,
              background: `${phase.color}25`, color: phase.color, letterSpacing: "0.05em",
            }}>{phase.tag}</span>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
              background: "rgba(255,255,255,0.06)", color: "#94a3b8",
            }}>{phase.subtitle}</span>
          </div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "#e2e8f0" }}>
            {phase.icon} {phase.title}
          </h2>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: "#94a3b8" }}>{phase.goal}</p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {phase.metrics.map(m => (
              <MetricCard key={m.label} label={m.label} value={m.value} color={phase.color} small />
            ))}
          </div>
        </div>

        {/* Revenue projection */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>Projecao de Receita</h3>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: "#475569" }}>{phase.revenue.model}</p>

          <RevenueBar label="Pessimista" value={phase.revenue.pessimist} max={maxRevenue} color="#ef4444" />
          <RevenueBar label="Realista" value={phase.revenue.realist} max={maxRevenue} color="#f59e0b" />
          <RevenueBar label="Otimista" value={phase.revenue.optimist} max={maxRevenue} color="#22c55e" />

          <div style={{ fontSize: 12, color: "#64748b", marginTop: 8, fontStyle: "italic" }}>
            {phase.revenue.note}
          </div>
        </div>

        {/* Revenue stacking across phases */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>
            Evolucao de Receita (cenario realista)
          </h3>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 180, marginBottom: 12 }}>
            {PHASES.map(p => {
              const h = (p.revenue.realist / PHASES[2].revenue.realist) * 160;
              const isActive = p.id === activePhase;
              return (
                <div key={p.id} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p.color }}>
                    R$ {p.revenue.realist.toLocaleString("pt-BR")}
                  </div>
                  <div style={{
                    width: "100%", height: Math.max(h, 20), borderRadius: "8px 8px 0 0",
                    background: isActive
                      ? `linear-gradient(180deg, ${p.color}, ${p.color}44)`
                      : `linear-gradient(180deg, ${p.color}40, ${p.color}15)`,
                    border: isActive ? `2px solid ${p.color}` : "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s",
                    boxShadow: isActive ? `0 0 20px ${p.color}30` : "none",
                  }} />
                  <div style={{ fontSize: 10, color: isActive ? p.color : "#475569", fontWeight: 600, textAlign: "center" }}>
                    {p.tag}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", fontSize: 11, color: "#475569",
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8,
          }}>
            <span>Crescimento Fase 1→2: ~15x</span>
            <span>Crescimento Fase 2→3: ~2.4x</span>
          </div>
        </div>

        {/* What to build */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>
            O que construir nessa fase
          </h3>
          {phase.tasks.map((task, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 0", borderBottom: i < phase.tasks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: phase.color, flexShrink: 0,
              }} />
              <span style={{ fontSize: 13, color: "#cbd5e1" }}>{task}</span>
            </div>
          ))}
        </div>

        {/* Transition gates */}
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>
            {activePhase < 3 ? "Gatilhos pra migrar pra proxima fase" : "Gatilhos de escala"}
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: "#475569" }}>
            {activePhase < 3
              ? "NAO avance pra proxima fase ate bater TODOS esses criterios"
              : "Criterios pra saber que o SaaS esta saudavel"
            }
          </p>
          {phase.gates.map((gate, i) => (
            <GateCheck key={i} label={gate.label} detail={gate.detail} met={false} />
          ))}
        </div>

        {/* Risks */}
        <AlertBox type="danger" title={`Riscos da ${phase.tag}`}>
          {phase.risks.map((risk, i) => (
            <div key={i} style={{ marginBottom: i < phase.risks.length - 1 ? 4 : 0 }}>
              {risk}
            </div>
          ))}
        </AlertBox>

        {/* Plans section for Phase 3 */}
        {activePhase === 3 && (
          <>
            <button
              onClick={() => setShowPlans(!showPlans)}
              style={{
                width: "100%", padding: "14px 20px", borderRadius: 14,
                background: showPlans ? "linear-gradient(135deg, #06b6d420, #06b6d410)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${showPlans ? "#06b6d440" : "rgba(255,255,255,0.06)"}`,
                color: "#e2e8f0", fontSize: 14, fontWeight: 700,
                cursor: "pointer", marginBottom: 16,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <span>💎 Ver detalhamento dos planos de assinatura</span>
              <span style={{ color: "#64748b", transform: showPlans ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</span>
            </button>

            {showPlans && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                {PLANS.map(plan => (
                  <div key={plan.name} style={{
                    flex: "1 1 200px", minWidth: 200,
                    background: `${plan.color}08`, border: `1px solid ${plan.color}25`,
                    borderRadius: 14, padding: 18,
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 800, color: plan.color,
                      letterSpacing: "0.05em", marginBottom: 4,
                    }}>{plan.name.toUpperCase()}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
                      <span style={{ fontSize: 28, fontWeight: 800, color: "#e2e8f0" }}>R$ {plan.price}</span>
                      <span style={{ fontSize: 12, color: "#64748b" }}>/mes</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 12, fontStyle: "italic" }}>{plan.audience}</div>
                    {plan.features.map((f, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "4px 0", fontSize: 12, color: "#94a3b8",
                      }}>
                        <span style={{ color: plan.color, fontSize: 10 }}>●</span>
                        {f}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {showPlans && (
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14, padding: 20, marginBottom: 16,
              }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>
                  Simulacao de MRR por plano
                </h3>
                {[
                  { plan: "Basic (R$49)", subs: 50, rev: 50 * 49, color: "#a855f7" },
                  { plan: "Pro (R$99)", subs: 30, rev: 30 * 99, color: "#ec4899" },
                  { plan: "Premium (R$149)", subs: 10, rev: 10 * 149, color: "#06b6d4" },
                ].map(p => (
                  <div key={p.plan} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: "#94a3b8" }}>{p.plan} — {p.subs} assinantes</span>
                      <span style={{ color: p.color, fontWeight: 700 }}>R$ {p.rev.toLocaleString("pt-BR")}/mes</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                      <div style={{
                        height: "100%", borderRadius: 4,
                        width: `${(p.rev / 5000) * 100}%`,
                        background: `linear-gradient(90deg, ${p.color}, ${p.color}66)`,
                      }} />
                    </div>
                  </div>
                ))}
                <div style={{
                  display: "flex", justifyContent: "space-between", fontSize: 14,
                  fontWeight: 700, color: "#22c55e", marginTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12,
                }}>
                  <span>MRR total (90 assinantes)</span>
                  <span>R$ {(50 * 49 + 30 * 99 + 10 * 149).toLocaleString("pt-BR")}/mes</span>
                </div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
                  + receita de afiliado + venda direta da Fase 2 = receita empilhada
                </div>
              </div>
            )}
          </>
        )}

        {/* Bottom: full journey */}
        <div style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.06), rgba(6,182,212,0.04))",
          border: "1px solid rgba(168,85,247,0.2)",
          borderRadius: 14, padding: 20, marginTop: 8,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>
            A logica da escada
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
            Cada fase gera o combustivel pra proxima. A Fase 1 gera dados de conversao (prova pro produtor que o SpotVibe vende). 
            A Fase 2 gera audiencia e volume (prova pro promoter que vale pagar). 
            A Fase 3 gera receita recorrente (prova pro investidor que o modelo escala). 
            Nunca pule uma fase — a anterior e pre-requisito da proxima.
          </div>
        </div>
      </div>
    </div>
  );
}
