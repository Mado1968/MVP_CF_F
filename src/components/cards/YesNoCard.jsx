export default function YesNoCard({ onAnswer }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button onClick={() => onAnswer({ choice: 'no' })}
        className="py-4 rounded-xl border border-gray-200
          text-gray-600 text-sm font-medium
          hover:border-gray-300 hover:bg-gray-50 transition-all"
      >No</button>
      <button onClick={() => onAnswer({ choice: 'yes' })}
        className="py-4 rounded-xl border border-brand-400
          bg-brand-50 text-brand-800 text-sm font-medium
          hover:bg-brand-100 transition-all"
      >Sí</button>
    </div>
  )
}