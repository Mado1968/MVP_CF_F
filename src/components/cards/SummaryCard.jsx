import { useState, useEffect } from 'react'
import { apiCall } from '../../lib/apiClient'

export default function SummaryCard({ sessionId, onAnswer }) {
  const [summary, setSummary] = useState(null)
  useEffect(() => {
    apiCall(`/flow/${sessionId}/summary`).then(setSummary)
  }, [sessionId])

  if (!summary) return <p className="text-sm text-outline animate-pulse text-center py-8">Carregant resum...</p>
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Això és el que hem entès fins ara
      </p>
      <div className="bg-brand-50 rounded-xl p-4 space-y-4 text-sm text-brand-800 border border-brand-100">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-brand-400 font-bold mb-0.5">Factor principal</span>
          <p className="font-semibold text-base">{summary.triage?.primary_factor || 'No identificat'}</p>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-brand-400 font-bold mb-0.5">Fase dinàmica</span>
          <p className="font-medium">{summary.triage?.dynamic_phase || 'Pendent'}</p>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-brand-400 font-bold mb-0.5">Freqüència</span>
          <p className="font-medium">{summary.triage?.frequency || 'No especificada'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-8">
        <button
          onClick={() => onAnswer({ confirmed: false })}
          className="py-4 rounded-xl border border-gray-200 text-gray-600 hover:border-brand-200 transition-all font-bold text-xs uppercase tracking-widest"
        >
          Revisar
        </button>
        <button
          onClick={() => onAnswer({ confirmed: true })}
          className="py-4 rounded-xl bg-gradient-to-r from-blue-700 to-teal-500 text-white font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all text-xs uppercase tracking-widest"
        >
          S'hi acosta
        </button>
      </div>
    </div>
  )
}