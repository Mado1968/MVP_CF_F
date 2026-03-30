import { useState } from 'react'

const CONFIDENCE_OPTIONS = [
  { value: 'alta',    label: 'Alta',    desc: 'Descriu bastant bé el que està passant' },
  { value: 'mitjana', label: 'Mitjana', desc: 'S\'hi acosta però no del tot' },
  { value: 'baixa',   label: 'Baixa',   desc: 'No encaixa gaire amb el que sento' },
]

const WHAT_FAILS_OPTIONS = [
  { value: 'tema',        label: 'El tipus de malestar no encaixa' },
  { value: 'fase',        label: 'El punt en què estem no és correcte' },
  { value: 'patro',       label: 'La manera com passa no és aquesta' },
  { value: 'frequencia',  label: 'La freqüència no és la que descriu' },
]

export default function ConfidenceCard({ onAnswer }) {
  const [confidence,  setConfidence]  = useState(null)
  const [whatFails,   setWhatFails]   = useState(null)
  const [sending,     setSending]     = useState(false)

  const showWhatFails = confidence === 'baixa'
  const canSubmit     = confidence !== null &&
                        (confidence !== 'baixa' || whatFails !== null)

  const handleConfidence = (value) => {
    setConfidence(value)
    setWhatFails(null)
    // Si no és baixa, envia directament sense esperar la segona pregunta
    if (value !== 'baixa') {
      setSending(true)
      onAnswer({ question_id: 'q5_confidence', choice: value })
    }
  }

  const handleWhatFails = async (value) => {
    setWhatFails(value)
    setSending(true)
    // Envia primer q5_confidence i després q5_what_fails
    await onAnswer({ question_id: 'q5_confidence', choice: confidence })
    await onAnswer({ question_id: 'q5_what_fails',  choice: value })
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Pregunta 1 — nivell de confiança */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500">
          Quina confiança tens que això descriu bé el que passa?
        </p>
        <div className="flex flex-col gap-2">
          {CONFIDENCE_OPTIONS.map(opt => (
            <button key={opt.value}
              onClick={() => !sending && handleConfidence(opt.value)}
              disabled={sending}
              className={`w-full text-left px-4 py-3 rounded-xl
                border text-sm transition-all duration-150
                ${confidence === opt.value
                  ? 'border-gray-800 bg-gray-50 text-gray-900 font-medium'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }
                ${sending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="font-medium">{opt.label}</span>
              <span className="text-gray-400 ml-2 text-xs">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pregunta 2 — condicional, només si confiança és baixa */}
      {showWhatFails && (
        <div className="flex flex-col gap-2 pt-2
          border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Què és el que menys encaixa?
          </p>
          <div className="flex flex-col gap-2">
            {WHAT_FAILS_OPTIONS.map(opt => (
              <button key={opt.value}
                onClick={() => !sending && handleWhatFails(opt.value)}
                disabled={sending}
                className={`w-full text-left px-4 py-3 rounded-xl
                  border text-sm transition-all duration-150
                  ${whatFails === opt.value
                    ? 'border-gray-800 bg-gray-50 text-gray-900 font-medium'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }
                  ${sending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {sending && (
        <p className="text-xs text-gray-400 text-center">
          Processant...
        </p>
      )}

    </div>
  )
}