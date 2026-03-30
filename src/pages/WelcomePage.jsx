import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

const LOCALES = [
  { value: 'ca', label: 'Català' },
  { value: 'es', label: 'Castellano' },
  { value: 'en', label: 'English' },
]

export default function WelcomePage() {
  const { startSession, sessionId } = useSession()
  const navigate  = useNavigate()
  const [locale,   setLocale]   = useState('ca')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  const handleStart = async () => {
    setLoading(true)
    setError(null)
    try {
      await startSession(locale)
      navigate('/flow')
    } catch (e) {
      setError('Hi ha hagut un problema. Torna-ho a provar.')
      setLoading(false)
    }
  }

  const handleResume = () => {
    navigate('/flow')
  }

  return (
    <main className="min-h-screen flex items-center
      justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md flex flex-col gap-6">

        {/* Capçalera */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium text-gray-900">
            ConflictFlow
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            T'ajuda a posar ordre en una situació de conflicte
            i a veure amb més claredat com afrontar-la.
          </p>
        </div>

        {/* Marc d'ús */}
        <div className="bg-white rounded-2xl border
          border-gray-200 p-6 flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">
            Abans de començar
          </p>
          <ul className="flex flex-col gap-2">
            {[
              'No substitueix teràpia ni assessorament legal.',
              'T\'acompanya pas a pas per entendre el que passa.',
              'Si detectem risc, et mostrarem opcions de suport.',
              'Pots sortir en qualsevol moment.',
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-2
                text-sm text-gray-500">
                <span className="mt-1 w-1.5 h-1.5 rounded-full
                  bg-gray-300 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Selecció d'idioma */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-400
            uppercase tracking-wide">
            Idioma
          </p>
          <div className="grid grid-cols-3 gap-2">
            {LOCALES.map(loc => (
              <button key={loc.value}
                onClick={() => setLocale(loc.value)}
                className={`py-2.5 rounded-xl border text-sm
                  font-medium transition-all duration-150
                  ${locale === loc.value
                    ? 'border-gray-800 bg-gray-50 text-gray-900'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                  }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sessió existent */}
        {sessionId && (
          <div className="bg-white rounded-2xl border
            border-gray-200 p-4 flex items-center
            justify-between gap-4">
            <p className="text-sm text-gray-500">
              Tens una sessió en curs
            </p>
            <button
              onClick={handleResume}
              className="text-sm font-medium text-gray-900
                border border-gray-300 px-4 py-2 rounded-xl
                hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              Reprendre
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Botó principal */}
        <button
          onClick={handleStart}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-sm
            font-medium transition-all duration-150
            ${loading
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
        >
          {loading ? 'Iniciant...' : 'Començar'}
        </button>

      </div>
    </main>
  )
}