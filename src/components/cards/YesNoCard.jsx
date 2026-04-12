import { useState } from 'react'

export default function YesNoCard({ onAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (choice) => {
    setSelected(choice)
    setTimeout(() => onAnswer({ choice }), 200)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => handleSelect('no')}
        className={`py-4 rounded-xl border text-sm font-medium transition-all duration-150
          ${selected === 'no'
            ? 'border-primary-container bg-primary-fixed/30 text-primary-container'
            : 'border-gray-200 text-gray-600 hover:border-brand-200'
          }`}
      >
        No
      </button>
      <button
        onClick={() => handleSelect('yes')}
        className={`py-4 rounded-xl border text-sm font-medium transition-all duration-150
          ${selected === 'yes'
            ? 'border-primary-container bg-primary-fixed/30 text-primary-container'
            : 'border-gray-200 text-gray-600 hover:border-brand-200'
          }`}
      >
        Sí
      </button>
    </div>
  )
}