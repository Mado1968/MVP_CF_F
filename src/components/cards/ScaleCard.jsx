import { useState } from 'react'

export default function ScaleCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const steps = Array.from(
    { length: (question.max || 5) - (question.min || 1) + 1 },
    (_, i) => (question.min || 1) + i
  )

  const labels = {
    1: 'Molt Baixa',
    2: 'Baixa',
    3: 'Moderada',
    4: 'Alta',
    5: 'Crítica'
  }

  const handleSelect = (n) => {
    setSelected(n)
    setTimeout(() => onAnswer({ score: n }), 200)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-4">
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
        {steps.map(n => (
          <button
            key={n}
            onClick={() => handleSelect(n)}
            className={`flex-1 group flex flex-col items-center p-6 rounded-2xl border transition-all duration-150 active:scale-95 ${
              selected === n
                ? 'bg-brand-50 border-brand-400 text-brand-800'
                : 'bg-surface-container-low border-transparent hover:border-brand-200'
            }`}
          >
            <span className={`text-2xl font-manrope font-black mb-2 ${selected === n ? 'text-brand-800' : 'text-primary'}`}>{n}</span>
            <span className={`text-sm font-medium transition-colors ${selected === n ? 'text-brand-700' : 'text-on-surface-variant group-hover:text-primary'}`}>
              {labels[n] || ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
