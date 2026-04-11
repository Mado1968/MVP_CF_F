const BLOCKS = [
  'Entrada',
  'Seguretat',
  'Activació',
  'Triatge',
  'Validació',
  'Proposta',
  'Seguiment',
  'Tancament',
]

export default function ProgressBar({ step = 1, block = '', total = 8 }) {
  return (
    <div className="w-full flex flex-col gap-2">

      {/* Etiqueta del bloc actual */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-secondary
          uppercase tracking-widest">
          {block}
        </span>
        <span className="text-xs text-slate-400">
          {step} / {total}
        </span>
      </div>

      {/* Barra de blocs */}
      <div className="flex gap-1 w-full">
        {BLOCKS.map((b, i) => {
          const blockStep = i + 1
          const isDone    = blockStep < step
          const isCurrent = blockStep === step
          return (
            <div key={b}
              className="flex-1 flex flex-col gap-1 items-center"
            >
              <div className={`h-1.5 w-full rounded-full transition-all
                duration-500
                ${isDone    ? 'bg-secondary'       : ''}
                ${isCurrent ? 'bg-primary'          : ''}
                ${!isDone && !isCurrent
                             ? 'bg-surface-container-high' : ''}
              `}/>
            </div>
          )
        })}
      </div>

    </div>
  )
}