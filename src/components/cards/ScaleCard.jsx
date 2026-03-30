export default function ScaleCard({ question, onAnswer }) {
  const steps = Array.from(
    { length: question.max - question.min + 1 },
    (_, i) => question.min + i
  )
  return (
    <div className="flex gap-2 justify-between">
      {steps.map(n => (
        <button key={n}
          onClick={() => onAnswer({ score: n })}
          className="flex-1 py-4 rounded-xl border
            border-gray-200 text-sm font-medium text-gray-500
            hover:bg-brand-50 hover:border-brand-400
            hover:text-brand-800 active:scale-95
            transition-all duration-150"
        >{n}</button>
      ))}
    </div>
  )
}