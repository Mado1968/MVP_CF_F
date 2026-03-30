import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFlow } from '../hooks/useFlow'
import ScaleCard      from '../components/cards/ScaleCard'
import ChoiceCard     from '../components/cards/ChoiceCard'
import YesNoCard      from '../components/cards/YesNoCard'
import SummaryCard    from '../components/cards/SummaryCard'
import ConfidenceCard from '../components/cards/ConfidenceCard'
import ProposalCard   from '../components/cards/ProposalCard'
import CheckinCard    from '../components/cards/CheckinCard'
import ClosingCard    from '../components/cards/ClosingCard'

const CARD_MAP = {
  scale:      ScaleCard,
  choice:     ChoiceCard,
  yesno:      YesNoCard,
  summary:    SummaryCard,
  confidence: ConfidenceCard,
  checkin:    CheckinCard,
  closing:    ClosingCard,
}

export default function FlowPage() {
  const { card, loading, error, answer, fetchProposal,sendCheckin } = useFlow()
  const navigate = useNavigate()
  const [proposal, setProposal] = useState(null)
  

  // Carrega la proposta quan arribes al node_6
  useEffect(() => {
    if (card?.node === 'node_6' && !proposal) {
      fetchProposal().then(setProposal).catch(console.error)
    }
  }, [card?.node])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center
        justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Carregant...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center
        justify-center bg-gray-50">
        <p className="text-sm text-red-400">{error}</p>
      </main>
    )
  }

  if (card?.done) { navigate('/done'); return null }
  if (card?.node === 'route_d') { navigate('/safety'); return null }
  if (card?.node === 'route_b') { navigate('/safety'); return null }
  if (card?.node === 'node_8')  { navigate('/done');    return null }
  if (card?.node === 'node_5') {
  return (
    <main className="min-h-screen flex items-center
      justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border
          border-gray-200 p-8 mt-6">
          <p className="text-lg font-medium text-gray-900 mb-8">
            Fins a quin punt et descriu bé el que hem vist?
          </p>
          <ConfidenceCard
            onAnswer={(resp) => answer(resp.question_id, resp)}
          />
        </div>
      </div>
    </main>
  )
}

  // Node 6 — cas especial: renderitza ProposalCard amb dades del backend
  if (card?.node === 'node_6') {
    return (
      <main className="min-h-screen flex items-center
        justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border
            border-gray-200 p-8 mt-6">
            <p className="text-lg font-medium text-gray-900 mb-8">
              Què et seria més útil ara mateix?
            </p>
            <ProposalCard
              proposal={proposal}
              onAnswer={(resp) => answer('q6_need', resp)}
            />
          </div>
        </div>
      </main>
    )
  }
  if (card?.node === 'node_7') {
  return (
    <main className="min-h-screen flex items-center
      justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border
          border-gray-200 p-8 mt-6">
          <p className="text-lg font-medium text-gray-900 mb-8">
            Com ha anat?
          </p>
          <CheckinCard onAnswer={sendCheckin} />
        </div>
      </div>
    </main>
  )
}

  // Resta de nodes — flux general
  const [currentQ] = card.questions
  const CardComponent = CARD_MAP[currentQ.type]

  if (!CardComponent) {
    return (
      <main className="min-h-screen flex items-center
        justify-center bg-gray-50">
        <p className="text-sm text-red-400">
          Tipus de card desconegut: {currentQ.type}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center
      justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border
          border-gray-200 p-8 mt-6">
          <p className="text-lg font-medium text-gray-900 mb-8">
            {currentQ.text}
          </p>
          <CardComponent
            question={currentQ}
            onAnswer={(resp) => answer(currentQ.id, resp)}
          />
        </div>
      </div>
    </main>
  )
}