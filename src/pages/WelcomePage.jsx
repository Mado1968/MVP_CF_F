import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

const LOCALES = [
  { value: 'ca', label: 'Català' },
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
]

export default function WelcomePage() {
  const { startSession, sessionId } = useSession()
  const navigate = useNavigate()
  const [locale, setLocale] = useState('ca')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

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
    <main className="relative min-h-screen w-full flex flex-col items-center px-6 py-12 gradient-bg">
      {/* Top Section: Logo and Name side by side */}
      <header className="w-full max-w-md flex items-center justify-center gap-4 mb-10">
        <img
          alt="ConflictFlow Logo"
          className="h-20 w-20 object-contain rounded-xl shadow-lg"
          src="https://lh3.googleusercontent.com/aida/ADBb0ugukEkfn9BONO0L_0Wvg-73DZ62ZdA0yK7K0yvu6hx0uyTW-0k0yin75Y5HvRt9OTCzpbgbs_KDVqKd8E4DXmdIjRiX8pMpJyyZpMoyEFwZyMYjWKyH3orswnJnt2hoB9NkYFd_4WCGOp8VRORiU9yDMB5PuWN9orVrD_PxmhIxekIwf0o-FnkVqZ4UNE-Ni2X-1Ov7lg4djiES7edyc9AaZJQjEYjVLS-7vHi1ksamE7RnxOyyfvYuTctUqxJyfM8sJGgFd7le6lU"
        />
        <h1 className="font-headline font-extrabold text-3xl tracking-tight text-white">
          ConflictFlow
        </h1>
      </header>

      {/* Main Intro Text */}
      <section className="w-full max-w-md text-center mb-10">
        <p className="text-white text-xl font-medium leading-relaxed drop-shadow-sm px-2">
          T'ajuda a posar ordre en una situació de conflicte i a veure amb més claredat com afrontar-la.
        </p>
      </section>

      {/* "Abans de començar" Section */}
      <section className="w-full max-w-md glass-panel rounded-2xl p-6 mb-12">
        <h2 className="font-headline font-bold text-white text-lg mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-white">info</span>
          Abans de començar
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-white/80 text-lg mt-0.5">verified_user</span>
            <p className="text-white/90 text-sm leading-snug">No substitueix teràpia ni assessorament legal.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-white/80 text-lg mt-0.5">map</span>
            <p className="text-white/90 text-sm leading-snug">T'acompanya pas a pas per entendre el que passa.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-white/80 text-lg mt-0.5">support_agent</span>
            <p className="text-white/90 text-sm leading-snug">Si detectem risc, et mostrarem opcions de suport.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="material-symbols-outlined text-white/80 text-lg mt-0.5">logout</span>
            <p className="text-white/90 text-sm leading-snug">Pots sortir en qualsevol moment.</p>
          </li>
        </ul>
      </section>

      {/* Primary Action */}
      <div className="mt-auto w-full max-w-md flex flex-col items-center gap-8">
        {sessionId && (
          <button
            onClick={handleResume}
            className="w-full flex items-center justify-center gap-3 bg-white/20 text-white font-headline font-bold text-lg px-12 py-4 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 hover:bg-white/30 active:scale-95 mb-[-20px]"
          >
            <span>Reprendre sessió</span>
          </button>
        )}

        <button
          onClick={handleStart}
          disabled={loading}
          className="group relative w-full flex items-center justify-center gap-3 bg-white text-primary font-headline font-bold text-lg px-12 py-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <span>{loading ? 'Iniciant...' : 'Començar'}</span>
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>

        {/* Language selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            className="flex items-center gap-2 text-white/80 font-medium hover:text-white transition-colors py-2"
          >
            <span className="material-symbols-outlined text-xl">language</span>
            <span className="text-sm">Idioma ({LOCALES.find(l => l.value === locale)?.label})</span>
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>

          {showLanguageSelector && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl p-2 min-w-[120px] z-50">
              {LOCALES.map(loc => (
                <button
                  key={loc.value}
                  onClick={() => {
                    setLocale(loc.value);
                    setShowLanguageSelector(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    locale === loc.value ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-background'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-white text-sm mt-4 bg-error/20 px-4 py-2 rounded-full backdrop-blur-md">
          {error}
        </p>
      )}
    </main>
  )
}
