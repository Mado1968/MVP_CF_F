import { useState } from 'react'

const ROUTE_INFO = {
  A: {
    label:       'Autogestió guiada',
    description: 'Et preparem per abordar la situació amb eines concretes i passos clars.',
  },
  B: {
    label:       'Contenció',
    description: 'Primer regulem. Quan hi hagi més marge, podem plantejar passos.',
  },
  C: {
    label:       'Ajuda externa',
    description: 'Aquesta situació pot beneficiar-se d\'acompanyament professional o mediació.',
  },
}

export default function ProposalCard({ proposal, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (route) => {
    setSelected(route)
    setTimeout(() => onAnswer({ choice: route }), 250)
  }

  const main = ROUTE_INFO[proposal?.proposed_route]
  const alt  = ROUTE_INFO[proposal?.alt_route]

  if (!main || !alt) {
    return (
      <div className="text-sm text-gray-400 text-center py-8">
        Carregant proposta...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Via principal */}
      <div className="flex flex-col gap-1 mb-1">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Via principal
        </span>
        <button
          onClick={() => handleSelect(proposal.proposed_route)}
          className={`w-full text-left px-5 py-4 rounded-xl border-2
            transition-all duration-150
            ${selected === proposal.proposed_route
              ? 'border-gray-800 bg-gray-50'
              : 'border-gray-800 bg-white hover:bg-gray-50'
            }`}
        >
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {main.label}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {main.description}
          </p>
        </button>
      </div>

      {/* Separador */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-300">o</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Via alternativa */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Alternativa
        </span>
        <button
          onClick={() => handleSelect(proposal.alt_route)}
          className={`w-full text-left px-5 py-4 rounded-xl border
            transition-all duration-150
            ${selected === proposal.alt_route
              ? 'border-gray-300 bg-gray-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        >
          <p className="text-sm font-medium text-gray-700 mb-1">
            {alt.label}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            {alt.description}
          </p>
        </button>
      </div>

    </div>
  )
}