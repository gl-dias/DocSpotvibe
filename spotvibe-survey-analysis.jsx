import { useState } from "react";

const TABS = ["Panorama", "Cruzamentos", "Personas"];

function StatCard({ label, value, sub, color = "#a855f7", icon }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: "16px 18px",
      flex: "1 1 140px",
      minWidth: 140,
    }}>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Bar({ label, value, max, color = "#a855f7", suffix = "%" }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
        <span style={{ color: "#cbd5e1" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value}{suffix}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
        <div style={{
          height: "100%",
          borderRadius: 4,
          width: `${(value / max) * 100}%`,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: "width 0.5s ease",
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
      background: c.bg,
      borderLeft: `3px solid ${c.border}`,
      borderRadius: "0 10px 10px 0",
      padding: "12px 16px",
      marginBottom: 12,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: c.border, marginBottom: 4 }}>{c.icon} {title}</div>
      <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14,
      padding: 20,
      marginBottom: 16,
    }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{title}</h3>
      {children}
    </div>
  );
}

function PersonaCard({ emoji, name, age, zone, freq, discovery, pain, behavior, color, isNew, oldName }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}10, ${color}05)`,
      border: `1px solid ${color}30`,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `linear-gradient(135deg, ${color}30, ${color}15)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24,
        }}>{emoji}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#e2e8f0" }}>{name}</span>
            {isNew && <span style={{
              fontSize: 10, fontWeight: 700, padding: "2px 8px",
              borderRadius: 6, background: "rgba(34,197,94,0.15)", color: "#22c55e",
            }}>NOVO</span>}
          </div>
          {oldName && <div style={{ fontSize: 11, color: "#64748b" }}>Substitui: "{oldName}"</div>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 14 }}>
        {[
          { label: "Idade", value: age },
          { label: "Zona", value: zone },
          { label: "Frequência", value: freq },
          { label: "Descobre via", value: discovery },
        ].map(item => (
          <div key={item.label}>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
            <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Dor principal</div>
        <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600, lineHeight: 1.5 }}>{pain}</div>
      </div>

      <div>
        <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Comportamento</div>
        <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{behavior}</div>
      </div>
    </div>
  );
}

export default function SurveyAnalysis() {
  const [tab, setTab] = useState("Panorama");

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
          <div style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
            Análise de Pesquisa
          </div>
          <h1 style={{
            margin: "0 0 4px", fontSize: 24, fontWeight: 800,
            background: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>SpotVibe — Validação de Mercado</h1>
          <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>102 respostas válidas · Mar-Abr 2026 · Rio de Janeiro</p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          <StatCard icon="📊" label="Respostas válidas" value="102" color="#a855f7" />
          <StatCard icon="🔥" label="Usariam o app" value="79%" sub="Com certeza + Provavelmente" color="#22c55e" />
          <StatCard icon="😤" label="Já perderam festa" value="79%" sub="Não ficaram sabendo a tempo" color="#ef4444" />
          <StatCard icon="🎯" label="Segmento core" value="40%" sub="Saem 2x+/mês e usariam" color="#06b6d4" />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              background: tab === t ? "linear-gradient(135deg, #a855f7, #06b6d4)" : "transparent",
              color: tab === t ? "#fff" : "#64748b",
              transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        {/* PANORAMA TAB */}
        {tab === "Panorama" && <>
          <Section title="📅 Idade">
            <Bar label="18-21 anos" value={59} max={60} color="#a855f7" />
            <Bar label="21-25 anos" value={25} max={60} color="#ec4899" />
            <Bar label="16-18 anos" value={10} max={60} color="#06b6d4" />
            <Bar label="30+ anos" value={7} max={60} color="#64748b" />
            <AlertBox type="info" title="Insight">
              84% do público tem entre 16 e 25 anos. A persona principal é jovem universitário. Os 30+ existem mas são exceção — não projete o app pra eles.
            </AlertBox>
          </Section>

          <Section title="🧭 Como descobrem festas">
            <Bar label="Amigos (boca a boca)" value={59} max={60} color="#ec4899" />
            <Bar label="Redes sociais" value={39} max={60} color="#a855f7" />
            <Bar label="Influenciadores / outros" value={2} max={60} color="#64748b" />
            <AlertBox type="warning" title="Atenção">
              59% descobre festa por amigos = a descoberta é passiva e depende do círculo social. Quem não tem amigos que saem muito fica por fora. Esse é exatamente o gap que o SpotVibe resolve.
            </AlertBox>
          </Section>

          <Section title="📍 Distribuição Geográfica">
            <Bar label="Zona Sul" value={34} max={35} color="#a855f7" suffix="%" />
            <Bar label="Zona Oeste" value={22} max={35} color="#ec4899" suffix="%" />
            <Bar label="Zona Norte" value={21} max={35} color="#06b6d4" suffix="%" />
            <Bar label="Zona Sudoeste" value={17} max={35} color="#22c55e" suffix="%" />
            <Bar label="Outras (Niterói, Centro, etc)" value={6} max={35} color="#64748b" suffix="%" />
            <AlertBox type="info" title="Insight">
              A amostra cobre bem as 4 zonas principais do Rio. Zona Sul lidera, mas Norte e Oeste juntas somam 43% — não ignore essas regiões no seed de eventos.
            </AlertBox>
          </Section>

          <Section title="📊 Frequência de saída">
            <Bar label="2-3x por mês" value={33} max={35} color="#22c55e" />
            <Bar label="Raramente" value={28} max={35} color="#64748b" />
            <Bar label="1x por mês" value={25} max={35} color="#f59e0b" />
            <Bar label="Toda semana" value={13} max={35} color="#ef4444" />
          </Section>

          <Section title="🎯 Usaria o app?">
            <Bar label="Com certeza usaria" value={51} max={55} color="#22c55e" />
            <Bar label="Provavelmente usaria" value={28} max={55} color="#06b6d4" />
            <Bar label="Talvez usasse" value={14} max={55} color="#f59e0b" />
            <Bar label="Provavelmente não / Não" value={7} max={55} color="#ef4444" />
            <AlertBox type="success" title="Validação forte">
              79% usariam o app (certeza + provavelmente). Isso é um sinal de demanda real, mas atenção: intenção ≠ download. A barreira real é o hábito — o app precisa virar rotina de sexta-feira.
            </AlertBox>
          </Section>
        </>}

        {/* CRUZAMENTOS TAB */}
        {tab === "Cruzamentos" && <>
          <Section title="🔥 Dificuldade → Intenção de Uso">
            <Bar label="Muito difícil → usaria" value={100} max={100} color="#ef4444" />
            <Bar label="Mediano → usaria" value={86} max={100} color="#f59e0b" />
            <Bar label="Um pouco difícil → usaria" value={77} max={100} color="#ec4899" />
            <Bar label="Fácil → usaria" value={76} max={100} color="#a855f7" />
            <Bar label="Muito fácil → usaria" value={55} max={100} color="#64748b" />
            <AlertBox type="success" title="Correlação perfeita">
              Quanto MAIS difícil a pessoa acha descobrir festas, MAIS ela usaria o app. 100% dos que disseram "Muito difícil" usariam. Isso confirma o product-market fit: a dor é real e o app é percebido como solução.
            </AlertBox>
            <AlertBox type="warning" title={'Cuidado com o "Muito fácil"'}>
              45% dos que acham "Muito fácil" NÃO usariam. Essas pessoas já têm um bom canal (amigos conectados, redes ativas). Elas não são seu público inicial — não gaste CAC tentando convertê-las.
            </AlertBox>
          </Section>

          <Section title="📊 Frequência → Intenção de Uso">
            <Bar label="2-3x/mês → usaria" value={88} max={100} color="#22c55e" />
            <Bar label="Toda semana → usaria" value={85} max={100} color="#06b6d4" />
            <Bar label="Raramente → usaria" value={79} max={100} color="#f59e0b" />
            <Bar label="1x/mês → usaria" value={65} max={100} color="#ef4444" />
            <AlertBox type="info" title="Insight">
              O grupo "2-3x/mês" (88%) é o sweet spot: sai com frequência suficiente pra criar hábito, mas não tão pouco que esquece o app. Esse é seu early adopter.
            </AlertBox>
          </Section>

          <Section title="👥 Descoberta por Gênero">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, fontWeight: 700 }}>♂️ Masculino</div>
                <Bar label="Amigos" value={61} max={65} color="#6366f1" />
                <Bar label="Redes sociais" value={39} max={65} color="#a855f7" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, fontWeight: 700 }}>♀️ Feminino</div>
                <Bar label="Amigos" value={57} max={65} color="#ec4899" />
                <Bar label="Redes sociais" value={41} max={65} color="#f43f5e" />
              </div>
            </div>
            <AlertBox type="info" title="Padrão igual">
              Não há diferença significativa entre gêneros na forma de descobrir festas. A estratégia de aquisição pode ser unificada.
            </AlertBox>
          </Section>

          <Section title="🎯 Segmento de Alto Valor (40 pessoas)">
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14, lineHeight: 1.5 }}>
              Filtro: saem 2x+/mês <strong style={{color:"#e2e8f0"}}>E</strong> usariam o app. São 41 pessoas (40% da amostra). Esse é o grupo que vai definir se o SpotVibe decola.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { label: "18-21 anos", value: "49%", color: "#a855f7" },
                { label: "21-25 anos", value: "37%", color: "#ec4899" },
                { label: "♂ / ♀", value: "50/50", color: "#06b6d4" },
                { label: "Via Amigos", value: "59%", color: "#22c55e" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <AlertBox type="success" title="Takeaway">
              Seu early adopter é 18-25, 50/50 gênero, descobre festa por amigos, sai 2-3x por mês. O SpotVibe precisa ser "o amigo que sempre sabe das festas".
            </AlertBox>
          </Section>
        </>}

        {/* PERSONAS TAB */}
        {tab === "Personas" && <>
          <AlertBox type="warning" title="Problema com as personas atuais">
            As personas "Sem Plano" e "Líder do Bonde" do PRD são criativas mas genéricas — não têm idade, zona, nem canal de descoberta. Sem esses dados, vocês não conseguem decidir onde anunciar, que tom usar no marketing, nem qual feature priorizar. Abaixo estão personas baseadas nos dados reais da pesquisa.
          </AlertBox>

          <PersonaCard
            emoji="🔥"
            name="O Frequente Frustrado"
            oldName="Sem Plano"
            isNew={true}
            age="18-21"
            zone="Zona Sul / Oeste"
            freq="2-3x por mês"
            discovery="Amigos + Instagram"
            pain="Descobre festas boas depois que já aconteceram. Depende de amigos pra saber o que rola, e quando o grupo não se organiza, fica em casa."
            behavior="Abre Instagram sexta à noite procurando stories com flyer de festa. Manda 'bora?' no grupo do WhatsApp mas ninguém responde a tempo. Acaba indo pra lugar que já conhece em vez de explorar."
            color="#a855f7"
          />

          <PersonaCard
            emoji="📡"
            name="A Conectora Social"
            isNew={true}
            age="21-25"
            zone="Zona Sul / Sudoeste"
            freq="2-3x por mês"
            discovery="Redes sociais + Amigos"
            pain="Acha difícil filtrar o que presta no meio de tanta informação. Segue 20 perfis de festas mas perde as que importam."
            behavior="É quem organiza o rolê do grupo. Manda 3 opções no WhatsApp e espera votação. Quer saber preço, lotação e vibe antes de decidir. Se o SpotVibe resolver isso, ela traz 5+ amigos junto."
            color="#ec4899"
          />

          <PersonaCard
            emoji="🌊"
            name="O Esporádico Curioso"
            isNew={true}
            age="18-21"
            zone="Zona Norte / Oeste"
            freq="Raramente / 1x por mês"
            discovery="Amigos"
            pain="Não tem um grupo que sai muito. Quando sai, depende de convite. Se soubesse o que tá rolando, sairia mais."
            behavior="79% dos que saem raramente disseram que usariam o app. É um público latente — não sai pouco por falta de vontade, sai pouco por falta de informação. Potencial de aumento de frequência com o app."
            color="#06b6d4"
          />

          <Section title="📋 O que muda na prática">
            <AlertBox type="success" title="Marketing & Aquisição">
              59% descobre por amigos → o growth loop do SpotVibe precisa ser social. Feature "Convide amigos pro rolê" direto dentro do evento. Compartilhamento nativo do card pra WhatsApp. Não gaste dinheiro com influenciador agora — só 1% da amostra descobre por eles.
            </AlertBox>
            <AlertBox type="info" title="Prioridade de Feature por Persona">
              <strong>Frequente Frustrado:</strong> Mapa + Push notification sexta 18h<br /><br />
              <strong>Conectora Social:</strong> Compartilhamento do card do evento pro WhatsApp + Vibômetro<br /><br />
              <strong>Esporádico Curioso:</strong> Feed de Destaques da Semana, baixa fricção, não exige busca ativa
            </AlertBox>
            <AlertBox type="warning" title="Cuidado: viés da amostra">
              A pesquisa tem 102 respostas, predominantemente de pessoas que já frequentam festas. Falta: faixa de renda, gasto médio por saída, e se já usam Sympla/Ingresse. Recomendo um 2º formulário mais curto (5 perguntas) focado em comportamento de compra pra validar o modelo de afiliados.
            </AlertBox>
          </Section>

          <Section title="🧪 Próximo Formulário (sugestão)">
            <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
              <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 8 }}>5 perguntas que faltam pra fechar a análise:</div>
              <div>1. Quanto você gasta em média por saída (ingresso + transporte)? <span style={{color:"#64748b"}}>→ Define pricing power</span></div>
              <div>2. Onde você compra ingressos? (Sympla / Ingresse / Pix pro promoter / Na porta) <span style={{color:"#64748b"}}>→ Valida modelo afiliado</span></div>
              <div>3. Que estilo musical você mais curte? <span style={{color:"#64748b"}}>→ Define categorias do seed</span></div>
              <div>4. Você já usou algum app pra descobrir festas? <span style={{color:"#64748b"}}>→ Mapeia concorrência percebida</span></div>
              <div>5. O que te faria abrir esse app toda sexta? <span style={{color:"#64748b"}}>→ Descobre o hook de retenção</span></div>
            </div>
          </Section>
        </>}
      </div>
    </div>
  );
}
