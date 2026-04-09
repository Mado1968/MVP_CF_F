import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSafeExit } from '../hooks/useSafeExit'

export default function RouteBPage() {
  const navigate = useNavigate()
  const safeExit = useSafeExit()
  const [timer, setTimer] = useState(30)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const handleSafeExit = () => {
    localStorage.clear()
    window.location.replace('https://www.google.com')
  }

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm dark:shadow-none">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-700 dark:text-blue-400">security</span>
            <span className="font-['Manrope'] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1F4AA8] to-[#2EC4B6]">Containment</span>
          </div>
          <button
            onClick={safeExit}
            className="bg-primary text-white rounded-full px-5 py-2 font-bold text-sm hover:opacity-80 transition-opacity active:scale-95 duration-200"
          >
            Safe Exit
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1F4AA8] to-[#2EC4B6] p-8 md:p-12 mb-8 text-white">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight mb-4">Ruta B: Contenció</h1>
            <p className="font-body text-lg opacity-90 leading-relaxed">
              Aquest camí està dissenyat per a la desescalada i la contenció emocional immediata. Prioritzem la teva seguretat i equilibri.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img
              alt=""
              className="object-cover w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo8xDGLYYLX9Whxch99f51SfHsz-i_iGI2S5BH-esAwp2cL7-ytu4Tc-qE99GlHnIO1Wey9UbeO62SwhPSH7YQlxuuamIpRGJ2OZWMSXRocPDcAMjDUrg9jcKxAspcrQ0aFLLokAlysZs1gv9yERIgYVbaqz2yve2bAgV6caJm0k4gyFZ4epBTqQRHCTqPmEjWLSXX-0fGpsl3uHdon422S_0CZmvGqkPRTDaoVXS3rfF1YTVXHhdPhJpLUsBcU_rs75IKLXVT49m0"
            />
          </div>
        </section>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Micro-Pause Card */}
          <div className="md:col-span-7 bg-surface-container-lowest rounded-lg p-8 shadow-[0_40px_40px_rgba(25,28,30,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl">self_improvement</span>
                <h2 className="font-headline font-bold text-2xl text-primary">Micro-Pause</h2>
              </div>
              <p className="text-on-surface-variant mb-8 text-lg">Pren-te un moment per tu. Segueix el ritme de respiració durant 30 segons.</p>
            </div>
            <div className="flex flex-col items-center py-6">
              <div className={`w-32 h-32 rounded-full border-4 border-secondary-container flex items-center justify-center ${isTimerRunning ? 'animate-pulse' : ''}`}>
                <span className="text-secondary font-bold text-xl">{timer}s</span>
              </div>
              <button
                onClick={() => {
                  if (timer === 0) setTimer(30);
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="mt-8 bg-surface-container-highest px-8 py-3 rounded-full font-semibold text-primary hover:bg-surface-container-high transition-colors"
              >
                {isTimerRunning ? 'Pausar' : (timer === 0 ? 'Reiniciar' : 'Començar Exercici')}
              </button>
            </div>
          </div>

          {/* Quick Tip Card */}
          <div className="md:col-span-5 bg-secondary-container/30 rounded-lg p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary">lightbulb</span>
              <h2 className="font-headline font-bold text-xl text-on-secondary-container">Quick Tip</h2>
            </div>
            <h3 className="font-bold text-lg mb-4 text-on-surface">Tècnica de Grounding (5-4-3-2-1)</h3>
            <ul className="space-y-3 text-on-surface-variant">
              <li className="flex items-center gap-3"><span className="font-bold text-secondary">5</span> coses que pots veure</li>
              <li className="flex items-center gap-3"><span className="font-bold text-secondary">4</span> coses que pots tocar</li>
              <li className="flex items-center gap-3"><span className="font-bold text-secondary">3</span> coses que pots sentir</li>
              <li className="flex items-center gap-3"><span className="font-bold text-secondary">2</span> coses que pots olorar</li>
              <li className="flex items-center gap-3"><span className="font-bold text-secondary">1</span> cosa que pots tastar</li>
            </ul>
          </div>

          {/* Containment Strategies Section */}
          <div className="md:col-span-12 mt-4">
            <h2 className="font-headline font-bold text-2xl mb-8 px-2">Containment Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <h4 className="font-bold text-lg mb-2">1. Acknowledge high tension</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Identifica el nivell de conflicte. Validar l'emoció és el primer pas per controlar-la.</p>
              </div>
              {/* Step 2 */}
              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">distance</span>
                </div>
                <h4 className="font-bold text-lg mb-2">2. Physical distance</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Crea espai físic. Allunyar-te del focus de tensió permet recuperar la perspectiva.</p>
              </div>
              {/* Step 3 */}
              <div className="bg-surface-container-low p-6 rounded-lg group hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <h4 className="font-bold text-lg mb-2">3. Neutral communication</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Utilitza frases curtes i neutrals. Evita judicis i manté un to de veu constant.</p>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="md:col-span-12 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-primary/5 rounded-xl border border-primary/10">
            <div>
              <h3 className="font-headline font-bold text-xl text-primary mb-2">Necessites guia offline?</h3>
              <p className="text-on-surface-variant">Descarrega la guia completa de contenció emocional en format PDF.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-primary border border-primary/20 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined">download</span>
                Containment PDF
              </button>
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                Access further help
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-8 pt-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-40px_40px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => navigate(-1)}
          className="flex flex-col items-center justify-center text-slate-500 px-6 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90 duration-300 ease-out"
        >
          <span className="material-symbols-outlined mb-1">arrow_back</span>
          <span className="font-jakarta font-medium text-[12px]">Back</span>
        </button>
        <button
          onClick={() => navigate('/done')}
          className="flex flex-col items-center justify-center bg-gradient-to-r from-[#1F4AA8] to-[#2EC4B6] text-white rounded-full px-6 py-2 active:scale-90 duration-300 ease-out"
        >
          <span className="material-symbols-outlined mb-1">check_circle</span>
          <span className="font-jakarta font-medium text-[12px]">Finish</span>
        </button>
      </nav>
    </div>
  )
}
