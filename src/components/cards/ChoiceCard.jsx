
import { useState } from 'react'

export default function ChoiceCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="flex flex-col gap-3">
      {question.options.map(opt => (
        <button key={opt}
          onClick={() => {
            setSelected(opt)
            setTimeout(() => onAnswer({ choice: opt }), 200)
          }}
          className={`w-full text-left px-5 py-4 rounded-xl
            border text-sm transition-all duration-150
            ${selected === opt
              ? 'border-primary-container bg-primary-fixed/30 text-primary-container'
              : 'border-gray-200 text-gray-600 hover:border-brand-200'
            }`}
        >{question.labels?.[opt] ?? opt}</button>
      ))}
    </div>
  )
}
/*
{question.options.map(opt => (
  <button key={opt}
    onClick={() => { ... }}
    className="..."
  >
    {question.labels?.[opt] ?? opt}
  </button>
))}
*/