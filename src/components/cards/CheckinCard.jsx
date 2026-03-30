import { useState } from 'react'

const HELPED_OPTIONS = [
  { value: true,  label: 'Sí, ha ajudat' },
  { value: false, label: 'No ha ajudat' },
]

export default function CheckinCard({ onAnswer }) {
  const [helped,     setHelped]     = useState(null)
  const [tension,    setTension]    = useState(null)
  const [activation, setActivation] = useState(null)
  const [sending,    setSending]    = useState(false)

  const canSubmit = helped !== null &&
                    tension !== null &&
                    activation !== null

  const handleSubmit = async () => {
    if (!canSubmit || sending) return
    setSending(true)
    await onAnswer({
      has_helped:        helped,
      tension_increased: tension,
      activation_level:  activation,
    })
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Ha ajudat? */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          Ha ajudat el que has provat?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {HELPED_OPTIONS.map(opt => (
            <button key={String(opt.value)}
              onClick={() => setHelped(opt.value)}
              className={`py-3 rounded-xl border text-sm
                font-medium transition-all duration-150
                ${helped === opt.value
                  ? 'border-gray-800 bg-gray-50 text-gray-900'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ha augmentat la tensió? */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          La tensió ha augmentat?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTension(false)}
            className={`py-3 rounded-xl border text-sm
              font-medium transition-all duration-150
              ${tension === false
                ? 'border-gray-800 bg-gray-50 text-gray-900'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
          >
            No
          </button>
          <button
            onClick={() => setTension(true)}
            className={`py-3 rounded-xl border text-sm
              font-medium transition-all duration-150
              ${tension === true
                ? 'border-gray-800 bg-gray-50 text-gray-900'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
          >
            Sí
          </button>
        </div>
      </div>

      {/* Activació actual 0–10 */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          Com et sents ara? (0 = tranquil, 10 = molt activat)
        </p>
        <div className="flex gap-1 justify-between">
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <button key={n}
              onClick={() => setActivation(n)}
              className={`flex-1 py-2.5 rounded-lg border text-xs
                font-medium transition-all duration-150
                ${activation === n
                  ? 'border-gray-800 bg-gray-50 text-gray-900'
                  : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Botó enviar */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || sending}
        className={`w-full py-4 rounded-xl text-sm font-medium
          transition-all duration-150
          ${canSubmit && !sending
            ? 'bg-gray-900 text-white hover:bg-gray-700'
            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
      >
        {sending ? 'Enviant...' : 'Continuar'}
      </button>

    </div>
  )
}