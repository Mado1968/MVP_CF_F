import { useNavigate } from 'react-router-dom'
import { useSafeExit } from '../hooks/useSafeExit'

export default function RouteCPage() {
  const navigate = useNavigate()
  const safeExit = useSafeExit()

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen pb-32">
      {/* TopAppBar Shared Component */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm shadow-blue-900/5">
        <nav className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="material-symbols-outlined text-blue-700 dark:text-blue-400 active:scale-95 duration-200"
            >
              arrow_back
            </button>
            <h1 className="font-headline font-bold text-lg tracking-tight text-blue-700 dark:text-blue-400">Human Help</h1>
          </div>
          <button
            onClick={safeExit}
            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 font-bold transition-colors active:scale-95 duration-200"
          >
            SORTIDA
          </button>
        </nav>
      </header>

      <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero Header */}
        <section className="relative overflow-hidden rounded-xl brand-gradient p-8 md:p-16 mb-12 flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ruta C: Ajuda Humana Externa</h2>
            <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed font-light">
              A vegades, la millor solució és comptar amb el suport d'un professional neutral.
            </p>
          </div>
        </section>

        {/* Professional Directory - Bento Grid Style */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="group bg-surface-container-lowest p-8 rounded-lg shadow-sm hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between border-b-4 border-transparent hover:border-secondary">
            <div>
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">Mediació Professional</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Facilitadors per a la resolució de conflictes laborals o familiars.</p>
            </div>
            <button className="w-full py-4 px-6 rounded-full bg-surface-container-highest font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95">
              Contactar ara
            </button>
          </div>
          {/* Card 2 */}
          <div className="group bg-surface-container-lowest p-8 rounded-lg shadow-sm hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between border-b-4 border-transparent hover:border-secondary">
            <div>
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">Suport Psicològic</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Professionals per a la gestió emocional individual.</p>
            </div>
            <button className="w-full py-4 px-6 rounded-full bg-surface-container-highest font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95">
              Veure directori
            </button>
          </div>
          {/* Card 3 */}
          <div className="group bg-surface-container-lowest p-8 rounded-lg shadow-sm hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between border-b-4 border-transparent hover:border-secondary">
            <div>
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">gavel</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-3 text-on-surface">Assessorament Jurídic</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">Orientació legal sobre drets i deures.</p>
            </div>
            <button className="w-full py-4 px-6 rounded-full bg-surface-container-highest font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95">
              Contactar ara
            </button>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="flex flex-wrap justify-center gap-6 mb-20">
          <div className="flex items-center gap-3 px-6 py-3 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span className="font-label text-sm font-semibold text-on-surface-variant">Confidencialitat garantida</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <span className="font-label text-sm font-semibold text-on-surface-variant">Professionals col·legiats</span>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-surface-container rounded-xl overflow-hidden shadow-2xl shadow-on-surface/5">
          <div className="relative h-full min-h-[400px]">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnLMrgQbShSALESvZMnpivECCSpY44G7nqvqQyHNKXwnhpBqmryyLt7-QCl2JueG7oleRjsm-wRyYe_DnCvcHY6jfa8QQz7XSe0CL8wFwlUPkiD6zuyTPgaNEtUkBxLrRHLQ03WsgVwp23zBDrXBfTzSsztVOvvAXdWVOMglNsfJ0vFsz86VneRZWH3b1fnOjnWit6Q2C9cTeGn0Q-7s_biZgCE_BZCvggH2CGEAQoeTnOT-PQ0Lxwmrb-qcC3JUq4Mqz6tYqrh9Ub"
              alt="Professional office"
            />
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-12">
              <div className="text-white text-center">
                <h3 className="font-headline text-3xl font-bold mb-4">Atenció Personalitzada</h3>
                <p className="text-lg opacity-90">T'ajudem a trobar l'especialista que millor s'adapta al teu cas.</p>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-12 bg-surface-container-lowest">
            <h3 className="font-headline text-2xl font-bold mb-8 text-primary">Vols que t'ajudem a triar?</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-label text-sm font-bold mb-2 text-on-surface-variant">Tipus de conflicte</label>
                <select className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface">
                  <option>Laboral / Professional</option>
                  <option>Familiar / Personal</option>
                  <option>Comunitari / Veïnal</option>
                  <option>Altres</option>
                </select>
              </div>
              <div>
                <label className="block font-label text-sm font-bold mb-2 text-on-surface-variant">Breu descripció (opcional)</label>
                <textarea className="w-full p-4 rounded-lg bg-surface border-none focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface" placeholder="Explica'ns breument la situació..." rows="4"></textarea>
              </div>
              <button className="w-full brand-gradient text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all duration-300" type="submit">
                Sol·licitar derivació
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* BottomNavBar Shared Component */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_-4px_40px_rgba(0,0,0,0.06)] rounded-t-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-6 py-2 transition-transform duration-300 active:scale-90 hover:text-teal-600 dark:hover:text-teal-300"
        >
          <span className="material-symbols-outlined mb-1">restart_alt</span>
          <span className="font-headline font-medium text-[10px] uppercase tracking-widest">Start Over</span>
        </button>
        <button
          onClick={() => navigate('/done')}
          className="flex flex-col items-center justify-center bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full px-6 py-2 transition-transform duration-300 active:scale-90 hover:text-teal-600 dark:hover:text-teal-300"
        >
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <span className="font-headline font-medium text-[10px] uppercase tracking-widest">Finalize</span>
        </button>
      </nav>

      {/* Persistent Safety Action */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={safeExit}
          className="w-14 h-14 rounded-full brand-gradient text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <span className="material-symbols-outlined">sos</span>
        </button>
      </div>
    </div>
  )
}
