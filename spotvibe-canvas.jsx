export default function BusinessModelCanvas() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a0f 0%, #12091f 50%, #0a0f1a 100%)",
      color: "#e2e8f0",
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
      padding: "32px 24px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <h1 style={{
          fontSize: 28,
          fontWeight: 800,
          margin: "0 0 4px 0",
          background: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          SpotVibe — Business Model Canvas
        </h1>

        <div style={{
          display: "flex",
          gap: 24,
          fontSize: 11,
          color: "#64748b",
          marginBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: 8,
        }}>
          <span><strong style={{ color: "#94a3b8" }}>Projeto:</strong> SpotVibe</span>
          <span><strong style={{ color: "#94a3b8" }}>Equipe:</strong> SpotVibe</span>
          <span><strong style={{ color: "#94a3b8" }}>Data:</strong> 2026</span>
          <span><strong style={{ color: "#94a3b8" }}>Versão:</strong> MVP Rio de Janeiro</span>
        </div>

        {/* Main Canvas Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.2fr 1fr 1fr",
          gridTemplateRows: "auto auto auto",
          gridTemplateAreas: `
            "partnerships activities value relationships segments"
            "partnerships resources value channels segments"
            "costs costs costs revenue revenue"
          `,
          border: "1.5px solid rgba(168,85,247,0.4)",
          borderRadius: 14,
          overflow: "hidden",
        }}>
          {/* Key Partnerships */}
          <CanvasCell
            gridArea="partnerships"
            icon="🤝"
            title="Parcerias Principais"
            color="#a855f7"
            borderRight
            borderBottom
          >
            <BulletList color="#a855f7" items={[
              "Sympla - @sympla",
              "Atlética Ibmec - @atleticaibmecrio",
              "Manoela Sauro - @manoelasauro",
              "Bernardo Costa - @obercostaa",
              "Aura lounge bar - @auralongeoficial",
              "Festas zs - @festaszs",
              "Festival omni - @festivalomni",
              "Sabrina - @sabrina.herdy",
            ]} />
          </CanvasCell>

          {/* Key Activities */}
          <CanvasCell
            gridArea="activities"
            icon="⚡"
            title="Atividades Principais"
            color="#ec4899"
            borderRight
            borderBottom
          >
            <BulletList color="#ec4899" items={[
              "Gerir equipe.",
              "Desenvolver e dar manutenção ao app.",
              "Divulgar através de influenciadores.",
              "Fechar parcerias com festas.",
              "Monitorar métricas.",
            ]} />
          </CanvasCell>

          {/* Key Resources */}
          <CanvasCell
            gridArea="resources"
            icon="🔧"
            title="Recursos Principais"
            color="#ec4899"
            borderRight
            borderBottom
          >
            <BulletList color="#ec4899" items={[
              "Base de dados de eventos atualizada.",
              "Algoritmos de recomendação de festas.",
              "Equipe de desenvolvimento e design.",
              "Time de parcerias/comercial",
            ]} />
          </CanvasCell>

          {/* Value Propositions */}
          <CanvasCell
            gridArea="value"
            icon="💎"
            title="Proposta de Valor"
            color="#06b6d4"
            borderRight
            borderBottom
          >
            <BulletList color="#06b6d4" items={[
              "App e site com programa de gamificação para encontrar e divulgar festas.",
              "Ajudar pessoas a encontrar rapidamente festas, eventos e rolês alinhados ao seu perfil.",
              "Facilitar que usuários encontrem companhia para ir a festas.",
              "Oferecer às produtoras e casas de festa um canal para divulgação.",
            ]} />
          </CanvasCell>

          {/* Customer Relationships */}
          <CanvasCell
            gridArea="relationships"
            icon="💜"
            title="Relacionamento com Clientes"
            color="#22c55e"
            borderRight
            borderBottom
          >
            <PhaseList color="#22c55e" items={[
              { phase: "Descoberta", details: "Mapa geolocalizado com pins neon · Push notification toda sexta 18h · Conteúdo no Instagram e TikTok" },
              { phase: "Decisão", details: "Vibômetro em tempo real (vibe da festa) · Card do evento com preço visível · Compartilhamento direto pro WhatsApp do grupo" },
              { phase: "Compra", details: "Redirect para Sympla/Ingresse (Fase 1) · Checkout in-app com Pix e cartão (Fase 2)" },
              { phase: "Experiência", details: "Check-in no evento · Votação no Vibômetro · Grupo de WhatsApp da festa" },
              { phase: "Pós-evento", details: "Avaliação do evento · Sugestões baseadas no histórico · Reengajamento semanal com 'Destaques da Semana'" },
            ]} />
          </CanvasCell>

          {/* Channels */}
          <CanvasCell
            gridArea="channels"
            icon="📡"
            title="Canais"
            color="#f59e0b"
            borderRight
            borderBottom
          >
            <BulletList color="#f59e0b" items={[
              "Aplicativo mobile",
              "Site",
              "Redes sociais",
            ]} />
          </CanvasCell>

          {/* Customer Segments */}
          <CanvasCell
            gridArea="segments"
            icon="👥"
            title="Segmentos de Clientes"
            color="#f59e0b"
            borderBottom
          >
            <BulletList color="#f59e0b" items={[
              "Jovens adultos do Rio de Janeiro (18–30 anos)",
              "Produtoras de eventos, casas de show, bares e clubes que desejam divulgar eventos.",
              "Pessoas que querem ir a festas mas não têm companhia.",
            ]} />
          </CanvasCell>

          {/* Cost Structure */}
          <CanvasCell
            gridArea="costs"
            icon="💸"
            title="Estrutura de Custos"
            color="#ef4444"
            borderRight
          >
            <BulletList color="#ef4444" items={[
              "Desenvolvimento e manutenção do app e do site",
              "Custos de infraestrutura.",
              "Marketing e gestão de usuários",
            ]} />
          </CanvasCell>

          {/* Revenue Streams */}
          <CanvasCell
            gridArea="revenue"
            icon="💰"
            title="Fontes de Receita"
            color="#22c55e"
          >
            <BulletList color="#22c55e" items={[
              "Comissão via links de afiliado para vendas de ingressos em plataformas.",
              "Planos de destaque pagos para festas e casas de evento",
            ]} />
          </CanvasCell>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
          fontSize: 10,
          color: "#475569",
        }}>
          <div>
            Baseado no Business Model Canvas de Strategyzer AG
          </div>
          <div style={{
            fontWeight: 700,
            fontSize: 14,
            background: "linear-gradient(90deg, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            SpotVibe
          </div>
        </div>
      </div>
    </div>
  );
}

function CanvasCell({ gridArea, icon, title, color, highlight, borderRight, borderBottom, children }) {
  return (
    <div style={{
      gridArea,
      borderRight: borderRight ? "1.5px solid rgba(255,255,255,0.08)" : "none",
      borderBottom: borderBottom ? "1.5px solid rgba(255,255,255,0.08)" : "none",
      padding: "14px 16px",
      background: highlight
        ? "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))"
        : "rgba(255,255,255,0.015)",
      minHeight: gridArea === "costs" || gridArea === "revenue" ? 100 : undefined,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 10,
        borderBottom: `1px solid ${color}30`,
        paddingBottom: 6,
      }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{
          fontSize: 11,
          fontWeight: 800,
          color,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, color }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 7,
          marginBottom: 5,
        }}>
          <div style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
            marginTop: 5,
            opacity: 0.7,
          }} />
          <span style={{
            fontSize: 11,
            color: "#cbd5e1",
            lineHeight: 1.5,
          }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function PhaseList({ items, color }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: i < items.length - 1 ? 8 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: color,
              boxShadow: `0 0 6px ${color}60`,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{item.phase}</span>
          </div>
          <div style={{
            fontSize: 11, color: "#94a3b8", lineHeight: 1.5,
            paddingLeft: 12,
          }}>{item.details}</div>
        </div>
      ))}
    </div>
  );
}
