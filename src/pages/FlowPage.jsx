import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { useFlow } from '../hooks/useFlow'
import { useSafeExit } from '../hooks/useSafeExit'
import ScaleCard      from '../components/cards/ScaleCard'
import ChoiceCard     from '../components/cards/ChoiceCard'
import YesNoCard      from '../components/cards/YesNoCard'
import SummaryCard    from '../components/cards/SummaryCard'
import ConfidenceCard from '../components/cards/ConfidenceCard'
import ProposalCard   from '../components/cards/ProposalCard'
import CheckinCard    from '../components/cards/CheckinCard'
import ClosingCard    from '../components/cards/ClosingCard'
import ProgressBar from '../components/cards/layout/ProgressBar'

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
  const { sessionId } = useSession()
  const { card, loading, error, answer, fetchProposal, sendCheckin } = useFlow()
  const navigate = useNavigate()
  const safeExit = useSafeExit()
  const [proposal, setProposal] = useState(null)

  // Redirection logic for routes
  useEffect(() => {
    if (card?.node === 'route_a') { navigate('/route-a'); }
    else if (card?.node === 'route_b') { navigate('/route-b'); }
    else if (card?.node === 'route_c') { navigate('/route-c'); }
    else if (card?.node === 'route_d') { navigate('/safety'); }
    else if (card?.done) { navigate('/done'); }
    else if (card?.node === 'node_8') { navigate('/done'); }
  }, [card?.node, card?.done, navigate])

  // Carrega la proposta quan arribes al node_6
  useEffect(() => {
    if (card?.node === 'node_6' && !proposal) {
      fetchProposal().then(setProposal).catch(console.error)
    }
  }, [card?.node, fetchProposal, proposal])

  // If nodeComplete was false, card might still be from previous fetchNext but with updated data.
  // We need to ensure that if card.question is present, we render the general flow.

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-outline animate-pulse">Carregant...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-error">{error}</p>
      </main>
    )
  }

  if (!card) return null;

  // Si el node actual és un node de redirecció o el flux ha acabat, mostrem loading mentre el useEffect redirigeix
  const redirectNodes = ['route_a', 'route_b', 'route_c', 'route_d', 'node_8']
  if (card.done || redirectNodes.includes(card.node)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-outline animate-pulse">Redirigint...</p>
      </main>
    )
  }

  // Triage / General Flow
  if (card.question) {
    const currentQ = card.question
    const CardComponent = CARD_MAP[currentQ.type]

    if (!CardComponent) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-sm text-error">Tipus de card desconegut: {currentQ.type}</p>
        </main>
      )
    }

    return (
      <main className="bg-background min-h-screen text-on-surface flex flex-col">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm shadow-blue-900/5 flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-700 dark:text-blue-400"></span>
            <h1 className="font-manrope font-bold text-lg tracking-tight text-blue-700 dark:text-blue-400">ConflictFlow</h1>
          </div>
          <button
            onClick={safeExit}
            className="bg-error/10 hover:bg-error/20 text-error px-4 py-2 rounded-full font-manrope font-bold text-sm tracking-tight transition-all active:scale-95"
          >
            SORTIR
          </button>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-32">
          <div className="w-full max-w-2xl">
            {/* Question Content */}
            <div className="text-center mb-12">
              <span className="text-secondary font-semibold tracking-widest text-xs uppercase mb-4 block">Fase d'avaluació</span>
              <h2 className="font-manrope font-extrabold text-3xl md:text-4xl text-on-surface leading-tight">
                {currentQ.text}
              </h2>
            </div>

            {/* Central Floating Card (Gradient Style) */}
            <div className="bg-brand-gradient rounded-xl p-1 shadow-2xl shadow-primary/10">
              <div className="bg-surface-container-lowest rounded-[2.8rem] p-8 md:p-12">
                <CardComponent
                  question={currentQ}
                  sessionId={sessionId}
                  onAnswer={(resp) => answer(currentQ.id, resp)}
                />

                {/* Guidance Text */}
                <div className="mt-12 flex items-start gap-4 p-6 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary">lightbulb</span>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Respon segons la teva percepció emocional immediata. No hi ha respostes incorrectes, només estats que necessiten ser escoltats.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Information */}
            
<div className="mt-12 w-full max-w-xs mx-auto">
  <ProgressBar
    step={card.step}
    block={card.block}
    total={card.total}
  />
</div>
</div>
            
           {/* <div className="mt-12 flex flex-col items-center gap-4">
              <div className="w-full max-w-xs bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full transition-all duration-1000"
                  style={{ width: `${(card.progress || 0) * 100}%` }}
                ></div>
              </div>
              <span className="font-body text-sm font-semibold text-slate-500 tracking-wide">
                {card.currentQuestionIndex || 0} de {card.totalQuestions || 16} preguntes completades
              </span>
            </div>
          </div>*/}
        </main>

        {/* BottomNavBar */}
        <nav className="fixed bottom-0 left-0 w-full px-8 pb-10 pt-4 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.06)] z-50">
          <button className="text-slate-400 px-6 py-3 flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-98 duration-150">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-jakarta text-sm font-semibold tracking-wide">Anterior</span>
          </button>
          <button className="bg-gradient-to-r from-blue-700 to-teal-500 text-white rounded-full px-12 py-3 flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-98 duration-150 shadow-lg shadow-primary/20">
            <span className="font-jakarta text-sm font-semibold tracking-wide">Següent</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </nav>

        {/* Decorative Background Elements */}
        <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-secondary-fixed/10 blur-[120px] -z-10"></div>
        <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-primary-fixed/20 blur-[100px] -z-10"></div>
      </main>
    )
  }

  // Render components based on node if no specific question
  if (card.node === 'node_5') {
    return (
      <LayoutWrapper title="Avaluació de confiança" card={card}>
        <p className="text-lg font-medium text-on-surface mb-8">
          Fins a quin punt et descriu bé el que hem vist?
        </p>
        <ConfidenceCard onAnswer={(resp) => answer(resp.question_id, resp)} />
      </LayoutWrapper>
    )
  }

  if (card.node === 'node_6') {
    return (
      <LayoutWrapper title="Proposta" card={card}>
        <p className="text-lg font-medium text-on-surface mb-8">
          Què et seria més útil ara mateix?
        </p>
        <ProposalCard proposal={proposal} onAnswer={(resp) => answer('q6_need', resp)} />
      </LayoutWrapper>
    )
  }

  if (card.node === 'node_7') {
    return (
      <LayoutWrapper title="Check-in" card={card}>
        <p className="text-lg font-medium text-on-surface mb-8">Com ha anat?</p>
        <CheckinCard onAnswer={sendCheckin} />
      </LayoutWrapper>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-sm text-error mb-4">Node no gestionat: {card.node}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary underline text-sm"
        >
          Reintentar
        </button>
      </div>
    </main>
  )
}

function LayoutWrapper({ title, card, children }) {
  const safeExit = useSafeExit()

  return (
    <main className="bg-background min-h-screen text-on-surface flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm shadow-blue-900/5 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="font-manrope font-bold text-lg tracking-tight text-blue-700 dark:text-blue-400">ConflictFlow</h1>
        </div>
        <button
          onClick={safeExit}
          className="bg-error/10 hover:bg-error/20 text-error px-4 py-2 rounded-full font-manrope font-bold text-sm tracking-tight transition-all active:scale-95"
        >
          SORTIR
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-32">
        <div className="w-full max-w-2xl text-center mb-8">
           <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">{title}</h2>
        </div>

        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-xl shadow-primary/5">
          {children}

          {card && (
            <div className="mt-12 w-full max-w-xs mx-auto">
              <ProgressBar step={card.step} block={card.block} total={card.total} />
            </div>
          )}
        </div>
      </main>
    </main>
  )
}
