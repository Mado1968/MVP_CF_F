import { useState } from 'react'

const WHAT_HELPED_OPTIONS = [
  { value: 'parar_i_respirar',   label: 'Parar i respirar abans de respondre' },
  { value: 'posar_limit',        label: 'Posar un límit clar' },
  { value: 'expressar_impacte',  label: 'Expressar com m\'ha afectat' },
  { value: 'demanar_temps',      label: 'Demanar temps per pensar' },
  { value: 'escoltar_mes',       label: 'Escoltar sense interrompre' },
]

const EARLY_SIGNAL_OPTIONS = [
  { value: 'tensio_corporal',    label: 'Tensió al cos' },
  { value: 'irritabilitat',      label: 'Irritabilitat sense causa clara' },
  { value: 'evitacio',           label: 'Evitar el tema o la persona' },
  { value: 'pensaments_repetits',label: 'Pensaments repetitius sobre el conflicte' },
  { value: 'canvi_humor',        label: 'Canvi brusc d\'humor' },
]

const MICRO_HABIT_OPTIONS = [
  { value: 'pausa_10s',          label: 'Fer una pausa de 10 segons abans de respondre' },
  { value: 'revisar_setmanal',   label: 'Revisar com estic un cop per setmana' },
  { value: 'nombrar_emocio',     label: 'Nombrar l\'emoció abans d\'actuar' },
  { value: 'nota_breu',          label: 'Escriure una nota breu quan aparegui tensió' },
  { value: 'conversa_curta',     label: 'Tenir una conversa curta abans que s\'acumuli' },
]

function SelectGroup({ label, options, selected, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <button key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`w-full text-left px-4 py-3 rounded-xl
              border text-sm transition-all duration-150
              ${selected === opt.value
                ? 'border-gray-800 bg-gray-50 text-gray-900 font-medium'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ClosingCard({ onAnswer }) {
  const [whatHelped,   setWhatHelped]   = useState(null)
  const [earlySignal,  setEarlySignal]  = useState(null)
  const [microHabit,   setMicroHabit]   = useState(null)
  const [sending,      setSending]      = useState(false)

  const canSubmit = whatHelped && earlySignal && microHabit

  const handleSubmit = async () => {
    if (!canSubmit || sending) return
    setSending(true)
    await onAnswer({
      what_helped:   whatHelped,
      early_signal:  earlySignal,
      micro_habit:   microHabit,
    })
  }

  return (
    <div className="flex flex-col gap-6">

      <SelectGroup
        label="Què ha ajudat més?"
        options={WHAT_HELPED_OPTIONS}
        selected={whatHelped}
        onSelect={setWhatHelped}
      />

      <div className="h-px bg-gray-100" />

      <SelectGroup
        label="Quin senyal d'alerta primerenca has identificat?"
        options={EARLY_SIGNAL_OPTIONS}
        selected={earlySignal}
        onSelect={setEarlySignal}
      />

      <div className="h-px bg-gray-100" />

      <SelectGroup
        label="Quin microhàbit preventiu vols provar?"
        options={MICRO_HABIT_OPTIONS}
        selected={microHabit}
        onSelect={setMicroHabit}
      />

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
        {sending ? 'Guardant...' : 'Finalitzar'}
      </button>

    </div>
  )
}