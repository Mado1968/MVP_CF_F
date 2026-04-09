export default function ScaleCard({ question, onAnswer }) {
  const steps = Array.from(
    { length: question.max - question.min + 1 },
    (_, i) => question.min + i
  )

  const labels = {
    1: 'Molt Baixa',
    2: 'Baixa',
    3: 'Moderada',
    4: 'Alta',
    5: 'Crítica'
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-4">
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
        {steps.map(n => (
          <button
            key={n}
            onClick={() => onAnswer({ score: n })}
            className={`flex-1 group flex flex-col items-center p-6 rounded-lg transition-all duration-300 active:scale-98 ${
              // Visual feedback if we had a selected state, but since it's an immediate answer:
              'bg-surface-container-low hover:bg-primary-fixed-dim'
            }`}
          >
            <span className="text-2xl font-manrope font-black text-primary mb-2">{n}</span>
            <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary">
              {labels[n] || ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
