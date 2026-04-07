import { useState } from "react";

function Slider({ label, value, onChange, min, max, step = 1, prefix = "", suffix = "", color = "#a855f7" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
        <span style={{ color: "#94a3b8" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{prefix}{typeof value === "number" ? value.toLocaleString("pt-BR") : value}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%", height: 6, borderRadius: 3,
          appearance: "none", background: "rgba(255,255,255,0.08)",
          cursor: "pointer", accentColor: color,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#475569", marginTop: 2 }}>
        <span>{prefix}{min.toLocaleString("pt-BR")}{suffix}</span>
        <span>{prefix}{max.toLocaleString("pt-BR")}{suffix}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, color = "#a855f7", small = false }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: small ? "10px 14px" : "14px 18px",
      flex: "1 1 120px", minWidth: 120,
    }}>
      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: small ? 18 : 24, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Bar({ label, value, max, color, suffix = "%", showValue = true }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
        <span style={{ color: "#cbd5e1" }}>{label}</span>
        {showValue && <span style={{ color, fontWeight: 700 }}>{value}{suffix}</span>}
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
        <div style={{
          height: "100%", borderRadius: 4,
          width: `${Math.min((value / max) * 100, 100)}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        }} />
      </div>
    </div>
  );
}

function AlertBox({ type, title, children }) {
  const colors = {
    success: { bg: "rgba(34,197,94,0.08)", border: "#22c55e", icon: "✅" },
    warning: { bg: "rgba(245,158,11,0.08)", border: "#f59e0b", icon: "⚠️" },
    danger: { bg: "rgba(239,68,68,0.08)", border: "#ef4444", icon: "🚨" },
    info: { bg: "rgba(6,182,212,0.08)", border: "#06b6d4", icon: "💡" },
  };
  const c = colors[type];
  return (
    <div style={{
      background: c.bg, borderLeft: `3px solid ${c.border}`,
      borderRadius: "0 10px 10px 0", padding: "12px 16px", marginBottom: 12,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: c.border, marginBottom: 4 }}>{c.icon} {title}</div>
      <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, padding: 20, marginBottom: 16,
    }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{title}</h3>
      {children}
    </div>
  );
}

export default function FinancialDashboard() {
  const [tab, setTab] = useState("mercado");
  const [users, setUsers] = useState(1000);
  const [viewRate, setViewRate] = useState(40);
  const [clickRate, setClickRate] = useState(12);
  const [conversionRate, setConversionRate] = useState(25);
  const [avgTicket, setAvgTicket] = useState(70);
  const [commission, setCommission] = useState(2);

  const monthlyActiveUsers = users;
  const eventViewers = Math.round(monthlyActiveUsers * (viewRate / 100));
  const affiliateClicks = Math.round(eventViewers * (clickRate / 100));
  const purchases = Math.round(affiliateClicks * (conversionRate / 100));
  const revenuePerPurchase = avgTicket * (commission / 100);
  const monthlyRevenue = purchases * revenuePerPurchase;
  const yearlyRevenue = monthlyRevenue * 12;
  const revenuePerUser = monthlyActiveUsers > 0 ? monthlyRevenue / monthlyActiveUsers : 0;

  const scenarios = [
    {
      name: "Pessimista",
      color: "#ef4444",
      users: 500,
      viewRate: 30,
      clickRate: 8,
      convRate: 15,
      ticket: 50,
      comm: 1,
    },
    {
      name: "Realista",
      color: "#f59e0b",
      users: 2000,
      viewRate: 40,
      clickRate: 12,
      convRate: 25,
      ticket: 70,
      comm: 2,
    },
    {
      name: "Otimista",
      color: "#22c55e",
      users: 5000,
      viewRate: 50,
      clickRate: 15,
      convRate: 30,
      ticket: 80,
      comm: 3,
    },
  ];

  const calcScenario = (s) => {
    const v = Math.round(s.users * (s.viewRate / 100));
    const c = Math.round(v * (s.clickRate / 100));
    const p = Math.round(c * (s.convRate / 100));
    const rev = p * s.ticket * (s.comm / 100);
    return { viewers: v, clicks: c, purchases: p, monthly: rev, yearly: rev * 12, perUser: s.users > 0 ? rev / s.users : 0 };
  };

  const TABS = ["mercado", "simulador", "cenarios", "estrategia"];
  const TAB_LABELS = { mercado: "Dados de Mercado", simulador: "Simulador", cenarios: "Cenarios", estrategia: "Estrategia" };

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
          <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Modelo Financeiro
          </div>
          <h1 style={{
            margin: "0 0 4px", fontSize: 22, fontWeight: 800,
            background: "linear-gradient(90deg, #22c55e, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>SpotVibe — Unit Economics</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>Dados da pesquisa + comportamento de compra</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4, flexWrap: "wrap" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 4px", borderRadius: 10, border: "none",
              fontSize: 12, fontWeight: 700, cursor: "pointer", minWidth: 80,
              background: tab === t ? "linear-gradient(135deg, #22c55e, #06b6d4)" : "transparent",
              color: tab === t ? "#fff" : "#64748b",
            }}>{TAB_LABELS[t]}</button>
          ))}
        </div>

        {/* MERCADO TAB */}
        {tab === "mercado" && <>
          <Section title="💰 Perfil Financeiro do Publico">
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>Renda mensal declarada</div>
              <Bar label="Ate R$ 2.000" value={85} max={100} color="#ef4444" />
              <Bar label="R$ 2.001 a R$ 4.000" value={14} max={100} color="#f59e0b" />
              <Bar label="Acima de R$ 4.000" value={1} max={100} color="#22c55e" />
            </div>
            <AlertBox type="warning" title="Publico sensivel a preco">
              85% ganha ate R$ 2.000 e gasta ~R$ 150 por saida (8% da renda). Isso significa que cada real importa. O SpotVibe precisa mostrar preco no card do evento SEMPRE — surpresa no checkout = desistencia.
            </AlertBox>
          </Section>

          <Section title="🎫 Onde Compram Ingressos">
            <Bar label="Sympla / Ticketmaster / Ingresse" value={95} max={100} color="#a855f7" />
            <Bar label="Apenas Instagram / WhatsApp" value={5} max={100} color="#ec4899" />
            <div style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)", marginTop: 12, marginBottom: 12,
            }}>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, fontWeight: 700 }}>Jornada real do usuario</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {[
                  { icon: "📱", label: "Descobre", sub: "Instagram (55%)", color: "#ec4899" },
                  { icon: "→", label: "", sub: "", color: "#475569" },
                  { icon: "🔍", label: "Pesquisa", sub: "Amigos (59%)", color: "#06b6d4" },
                  { icon: "→", label: "", sub: "", color: "#475569" },
                  { icon: "🎫", label: "Compra", sub: "Sympla (95%)", color: "#a855f7" },
                ].map((step, i) => (
                  step.icon === "→" ?
                    <div key={i} style={{ color: "#475569", fontSize: 16 }}>→</div> :
                    <div key={i} style={{
                      background: `${step.color}10`, border: `1px solid ${step.color}30`,
                      borderRadius: 10, padding: "10px 14px", flex: "1 1 80px", textAlign: "center",
                    }}>
                      <div style={{ fontSize: 20 }}>{step.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: step.color }}>{step.label}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>{step.sub}</div>
                    </div>
                ))}
              </div>
            </div>
            <AlertBox type="success" title="O SpotVibe entra aqui">
              O usuario descobre no Instagram, confirma com amigos, e compra no Sympla. O SpotVibe pode substituir as duas primeiras etapas (descoberta + validacao social via Vibometro) e redirecionar direto pro checkout. O link de afiliado nao muda o habito de compra — so encurta o caminho.
            </AlertBox>
          </Section>

          <Section title="🧮 Custo Medio por Saida">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <MetricCard label="Gasto total medio" value="R$ 150" color="#f59e0b" />
              <MetricCard label="Ingressos baratos" value="R$ 40-50" sub="Festas de bar, entrada" color="#22c55e" />
              <MetricCard label="Ingressos caros" value="R$ 300-500" sub="Festivais, boates premium" color="#ef4444" />
            </div>
            <div style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12,
            }}>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, fontWeight: 700 }}>Decomposicao estimada dos R$ 150</div>
              <div style={{ display: "flex", height: 32, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ width: "47%", background: "#a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>Ingresso ~R$70</div>
                <div style={{ width: "27%", background: "#ec4899", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>Transporte ~R$40</div>
                <div style={{ width: "26%", background: "#06b6d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>Consumo ~R$40</div>
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>O SpotVibe so monetiza sobre o ingresso (~R$70). Transporte e consumo nao geram receita.</div>
            </div>
            <AlertBox type="info" title="Implicacao pro modelo">
              Com ingresso medio de R$ 70 e comissao de 2%, cada venda via afiliado gera R$ 1,40. Parece pouco, mas e receita de margem pura — zero custo operacional apos o setup.
            </AlertBox>
          </Section>
        </>}

        {/* SIMULADOR TAB */}
        {tab === "simulador" && <>
          <Section title="🎛️ Ajuste as Variaveis">
            <Slider label="Usuarios ativos/mes" value={users} onChange={setUsers} min={100} max={20000} step={100} suffix="" color="#a855f7" />
            <Slider label="% que visualiza eventos" value={viewRate} onChange={setViewRate} min={10} max={80} suffix="%" color="#ec4899" />
            <Slider label="% que clica no afiliado" value={clickRate} onChange={setClickRate} min={2} max={30} suffix="%" color="#06b6d4" />
            <Slider label="% que efetua compra" value={conversionRate} onChange={setConversionRate} min={5} max={50} suffix="%" color="#22c55e" />
            <Slider label="Ticket medio do ingresso" value={avgTicket} onChange={setAvgTicket} min={30} max={200} step={5} prefix="R$ " color="#f59e0b" />
            <Slider label="Comissao de afiliado" value={commission} onChange={setCommission} min={0.5} max={5} step={0.5} suffix="%" color="#ef4444" />
          </Section>

          <Section title="📊 Resultado do Funil">
            <div style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16,
            }}>
              {[
                { label: "Usuarios ativos", value: monthlyActiveUsers, color: "#a855f7", width: 100 },
                { label: "Visualizam eventos", value: eventViewers, color: "#ec4899", width: (eventViewers / monthlyActiveUsers) * 100 },
                { label: "Clicam no afiliado", value: affiliateClicks, color: "#06b6d4", width: (affiliateClicks / monthlyActiveUsers) * 100 },
                { label: "Efetuam compra", value: purchases, color: "#22c55e", width: (purchases / monthlyActiveUsers) * 100 },
              ].map((step, i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: "#94a3b8" }}>{step.label}</span>
                    <span style={{ color: step.color, fontWeight: 700 }}>{step.value.toLocaleString("pt-BR")}</span>
                  </div>
                  <div style={{ height: 24, borderRadius: 6, background: "rgba(255,255,255,0.04)" }}>
                    <div style={{
                      height: "100%", borderRadius: 6,
                      width: `${Math.max(step.width, 2)}%`,
                      background: `linear-gradient(90deg, ${step.color}, ${step.color}66)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, color: "#fff",
                      minWidth: 40,
                    }}>
                      {step.width < 5 ? "" : `${step.width.toFixed(0)}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <MetricCard label="Receita/mes" value={`R$ ${monthlyRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} color="#22c55e" />
              <MetricCard label="Receita/ano" value={`R$ ${yearlyRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} color="#06b6d4" />
              <MetricCard label="Receita/usuario" value={`R$ ${revenuePerUser.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} sub="por mes" color="#f59e0b" />
              <MetricCard label="Receita/venda" value={`R$ ${revenuePerPurchase.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} sub="comissao unitaria" color="#a855f7" />
            </div>
          </Section>
        </>}

        {/* CENARIOS TAB */}
        {tab === "cenarios" && <>
          <Section title="📈 3 Cenarios de Receita">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#64748b", fontSize: 11 }}>Metrica</th>
                    {scenarios.map(s => (
                      <th key={s.name} style={{ textAlign: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: s.color, fontSize: 11 }}>{s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "MAU", key: "users", fmt: v => v.toLocaleString("pt-BR") },
                    { label: "Visualizam", key: "viewRate", fmt: v => v + "%" },
                    { label: "CTR afiliado", key: "clickRate", fmt: v => v + "%" },
                    { label: "Conversao", key: "convRate", fmt: v => v + "%" },
                    { label: "Ticket medio", key: "ticket", fmt: v => "R$ " + v },
                    { label: "Comissao", key: "comm", fmt: v => v + "%" },
                  ].map(row => (
                    <tr key={row.label}>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#94a3b8" }}>{row.label}</td>
                      {scenarios.map(s => (
                        <td key={s.name} style={{ textAlign: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#cbd5e1" }}>
                          {row.fmt(s[row.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid rgba(255,255,255,0.1)" }}>
                    <td style={{ padding: "12px", fontWeight: 700, color: "#e2e8f0" }}>Receita/mes</td>
                    {scenarios.map(s => {
                      const r = calcScenario(s);
                      return (
                        <td key={s.name} style={{ textAlign: "center", padding: "12px", fontWeight: 800, fontSize: 16, color: s.color }}>
                          R$ {r.monthly.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", color: "#94a3b8" }}>Receita/ano</td>
                    {scenarios.map(s => {
                      const r = calcScenario(s);
                      return (
                        <td key={s.name} style={{ textAlign: "center", padding: "8px 12px", fontWeight: 700, color: s.color }}>
                          R$ {r.yearly.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", color: "#94a3b8" }}>Compras/mes</td>
                    {scenarios.map(s => {
                      const r = calcScenario(s);
                      return (
                        <td key={s.name} style={{ textAlign: "center", padding: "8px 12px", color: "#cbd5e1" }}>
                          {r.purchases}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px", color: "#94a3b8" }}>R$/usuario/mes</td>
                    {scenarios.map(s => {
                      const r = calcScenario(s);
                      return (
                        <td key={s.name} style={{ textAlign: "center", padding: "8px 12px", color: "#cbd5e1" }}>
                          R$ {r.perUser.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="📊 Comparacao Visual">
            {scenarios.map(s => {
              const r = calcScenario(s);
              return (
                <div key={s.name} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>({s.users.toLocaleString("pt-BR")} MAU)</span>
                  </div>
                  <div style={{ height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
                    <div style={{
                      height: "100%", borderRadius: 8,
                      width: `${Math.min((r.monthly / calcScenario(scenarios[2]).monthly) * 100, 100)}%`,
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}66)`,
                      display: "flex", alignItems: "center", paddingLeft: 12,
                      fontSize: 13, fontWeight: 700, color: "#fff",
                      minWidth: 100,
                    }}>
                      R$ {r.monthly.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}/mes
                    </div>
                  </div>
                </div>
              );
            })}
            <AlertBox type="warning" title="Realidade do afiliado puro">
              No cenario realista (2.000 MAU), a receita de afiliado fica em torno de R$ 336/mes. Isso nao paga nem o servidor. O afiliado funciona como validacao e coleta de dados, nao como modelo de receita principal. A transicao pra Fase 2 (white label com 5-7% de taxa) e o que muda o jogo.
            </AlertBox>
          </Section>

          <Section title="🔄 Comparacao: Afiliado vs White Label">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#64748b", fontSize: 11 }}>Com 2.000 MAU</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a855f7", fontSize: 11 }}>Afiliado (2%)</th>
                    <th style={{ textAlign: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#22c55e", fontSize: 11 }}>White Label (7%)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Receita/venda", aff: "R$ 1,40", wl: "R$ 4,90" },
                    { label: "Receita/mes (120 vendas)", aff: "R$ 168", wl: "R$ 588" },
                    { label: "Risco operacional", aff: "Zero", wl: "Medio" },
                    { label: "Esforco tecnico", aff: "Baixo", wl: "Alto" },
                    { label: "Controle do checkout", aff: "Nenhum", wl: "Total" },
                  ].map(row => (
                    <tr key={row.label}>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#94a3b8" }}>{row.label}</td>
                      <td style={{ textAlign: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#cbd5e1" }}>{row.aff}</td>
                      <td style={{ textAlign: "center", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#cbd5e1" }}>{row.wl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AlertBox type="info" title="Quando migrar?">
              Quando o SpotVibe tiver 5.000+ MAU e pelo menos 3 produtores de festas pequenas pedindo pra vender direto. Ate la, o afiliado valida o canal enquanto voce constroi audiencia.
            </AlertBox>
          </Section>
        </>}

        {/* ESTRATEGIA TAB */}
        {tab === "estrategia" && <>
          <Section title="🔍 Instagram: Descoberta vs Compra">
            <div style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>Canal de DESCOBERTA (como ficam sabendo)</div>
              <Bar label="Instagram + Redes Sociais" value={55} max={60} color="#ec4899" />
              <Bar label="Amigos / Boca a boca" value={59} max={60} color="#06b6d4" />
              <div style={{ fontSize: 11, color: "#475569", fontStyle: "italic", marginTop: 4 }}>Soma mais que 100% porque se sobrepoem (55% dos que usam Sympla tambem descobrem no Instagram)</div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>Canal de COMPRA (onde pagam)</div>
              <Bar label="Sympla / Ticketmaster / Ingresse" value={95} max={100} color="#a855f7" />
              <Bar label="Instagram / WhatsApp direto" value={5} max={100} color="#64748b" />
            </div>
            <AlertBox type="success" title="O gap do SpotVibe">
              Existe uma desconexao clara: as pessoas descobrem no Instagram (passivamente, scroll infinito) e compram no Sympla (ativamente, busca). Ninguem conecta os dois. O SpotVibe e o elo que falta — descoberta ativa + geolocalizacao + redirect direto pro checkout.
            </AlertBox>
          </Section>

          <Section title="🎯 3 Alavancas de Receita (em ordem)">
            {[
              {
                num: "1",
                title: "Volume de redirect (agora)",
                color: "#a855f7",
                desc: "Quanto mais gente clicar no link de afiliado, mais voce ganha. O foco e: mostrar o preco no card, fazer o botao impossivel de ignorar, e ter eventos bons cadastrados.",
                metric: "KPI: CTR do botao de afiliado > 10%",
              },
              {
                num: "2",
                title: "Ticket medio (medio prazo)",
                color: "#ec4899",
                desc: "Promover eventos com ingresso mais caro (R$ 100-200) gera 2-3x mais comissao por clique. Curadoria de festivais e festas premium no topo do feed.",
                metric: "KPI: Ticket medio dos eventos promovidos > R$ 80",
              },
              {
                num: "3",
                title: "Negociacao de comissao (com tracao)",
                color: "#22c55e",
                desc: "Com 5.000+ MAU, voce renegocia a comissao de 2% pra 4-5% mostrando dados de conversao. Ou oferece 'destaque patrocinado' no mapa por valor fixo (R$ 200-500/evento).",
                metric: "KPI: Receita por usuario > R$ 1,00/mes",
              },
            ].map(item => (
              <div key={item.num} style={{
                background: `${item.color}08`, border: `1px solid ${item.color}20`,
                borderRadius: 12, padding: 16, marginBottom: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: `${item.color}25`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, color: item.color,
                  }}>{item.num}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{item.title}</div>
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 8 }}>{item.desc}</div>
                <div style={{ fontSize: 11, color: item.color, fontWeight: 600 }}>{item.metric}</div>
              </div>
            ))}
          </Section>

          <Section title="💡 Receitas Alternativas (alem do afiliado)">
            <AlertBox type="info" title="Destaque Patrocinado no Mapa">
              Cobra R$ 200-500 por evento pra ter um pin maior/brilhante no mapa. Receita fixa, nao depende de conversao. Com 10 eventos destacados/mes a R$ 300 = R$ 3.000/mes. Isso SOZINHO e 10x maior que o afiliado no cenario realista.
            </AlertBox>
            <AlertBox type="info" title="Lista VIP / Desconto Exclusivo">
              Negocia com o produtor: em troca de destaque, o SpotVibe oferece lista VIP ou desconto de 10% exclusivo. O usuario so consegue o desconto pelo app. Isso gera download, retencao E diferencial competitivo.
            </AlertBox>
            <AlertBox type="warning" title="Prioridade">
              Nao tente implementar tudo de uma vez. Fase 1 e afiliado puro. Quando tiver dados de CTR e conversao reais (nao estimados), voce monta o pitch pra destaque patrocinado com numeros na mao.
            </AlertBox>
          </Section>
        </>}
      </div>
    </div>
  );
}
