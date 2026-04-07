import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import BusinessModelCanvas from '../spotvibe-canvas.jsx'
import FinancialDashboard from '../spotvibe-financial-model.jsx'
import Roadmap from '../spotvibe-roadmap-financeiro.jsx'
import SurveyAnalysis from '../spotvibe-survey-analysis.jsx'

const PAGES = [
  { id: 'canvas', label: 'Business Model Canvas', component: BusinessModelCanvas },
  { id: 'financial', label: 'Modelo Financeiro', component: FinancialDashboard },
  { id: 'roadmap', label: 'Roadmap Financeiro', component: Roadmap },
  { id: 'survey', label: 'Analise de Pesquisa', component: SurveyAnalysis },
]

function App() {
  const [page, setPage] = useState('canvas')
  const current = PAGES.find(p => p.id === page)
  const Component = current.component

  return (
    <div>
      {/* Navigation bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '8px 16px',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {PAGES.map(p => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              background: page === p.id
                ? 'linear-gradient(135deg, #a855f7, #06b6d4)'
                : 'rgba(255,255,255,0.06)',
              color: page === p.id ? '#fff' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            {p.label}
          </button>
        ))}
      </nav>

      {/* Page content */}
      <Component />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
