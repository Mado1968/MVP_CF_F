import { useNavigate } from 'react-router-dom'
import { useSafeExit } from '../hooks/useSafeExit'

export default function RouteAPage() {
  const navigate = useNavigate()
  const safeExit = useSafeExit()

  return (
    <div className="bg-background font-body text-on-background min-h-screen selection:bg-secondary-container/30">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm shadow-blue-900/5 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-blue-700 dark:text-blue-400">spa</span>
          <h1 className="font-manrope font-black text-xl text-blue-700 dark:text-teal-400 tracking-tight">Proposta Orientativa</h1>
        </div>
        <button
          onClick={safeExit}
          className="text-slate-500 font-manrope font-bold text-lg tracking-tight hover:opacity-80 transition-opacity active:scale-95 duration-200"
        >
          SORTIR
        </button>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl p-8 md:p-12 bg-gradient-to-br from-[#1F4AA8] to-[#2EC4B6] text-white shadow-xl shadow-primary/10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-6">Fase de Resolució</span>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl leading-tight mb-4">Ruta A: Autogestió Guiada</h2>
            <p className="text-white/90 text-lg leading-relaxed font-body">Has seleccionat un camí de col·laboració directa. Aquest espai està dissenyat per facilitar la pau a través de l'equilibri i la paraula.</p>
          </div>
          {/* Decorative image element */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <img
              alt="abstract"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTmCKydt2-zzIXLSsDMz7a3iZywDBB21XccdwQ5dczKyVLhWSy3Ryur8GGaEvShnEANOjXNxzIlR8FX9uPnedQLXdj7Q6jP0oIHb63t79vxHk_jFIwTgsQMbdQkX5K5ppJXo913zabccxdfAaqSE5Y6vG-ra454YlyyTPRClNbo_K9UhrM9w64wnU7Xf3m_nvWsql2X9DsPEps66R_9Z1zk9ihfuLSnL4SOimT0n2ZmSKWVU1rST1rhbAX62iYTmcXTCwa5TVCuw9l"
            />
          </div>
        </section>

        {/* Guidance Steps: Bento-style cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Step 1 */}
          <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-lg shadow-[0_40px_40px_rgba(0,0,0,0.06)] flex flex-col gap-6 transition-all hover:scale-[1.01]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">hearing</span>
              </div>
              <span className="font-headline font-bold text-xl text-on-surface">1. Escolta activa sense interrupció</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">Permet que l'altra part s'expressi plenament. El silenci no és buit, és respecte. Evita preparar la teva resposta mentre l'altre parla; simplement, estigues present.</p>
            <div className="mt-auto pt-4 flex gap-2">
              <span className="px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-md">Escolta</span>
              <span className="px-3 py-1 bg-surface-variant text-on-surface-variant text-xs font-medium rounded-md">Respecte</span>
            </div>
          </div>

          {/* Decorative Visual for Path */}
          <div className="hidden md:flex md:col-span-4 bg-secondary-container/20 rounded-lg overflow-hidden items-center justify-center">
            <img
              alt="visual"
              className="w-full h-full object-cover opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_W1r7ZIn5yW2I3KL_pghg_-jj4ny9y3AtsEnWnwNOQ07Dp28qmEgGTSVa6VE1LcMZKA3WgygfpZ8w1d8a2U2ooSLFKbS5dDlhON5wa4Xk96n4AjO43cqveUiDbojWd-P0HMWmLBPUSKQzo-oDx2QYDTuHwm50O6GXlliYi4-k80mISCkkFU-w_z9Sw3_f8djltPOVXFQWEQqx6oS3Jeyg1zYqWczUo00IOyFJewadhrXdn2W735GCkIoBq5EWMCCTks-1u4Xis74f"
            />
          </div>

          {/* Step 2 */}
          <div className="md:col-span-12 bg-surface-container-lowest p-8 rounded-lg shadow-[0_40px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-8 transition-all hover:scale-[1.01]">
            <div className="md:w-1/3 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed-dim flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-on-surface">2. Identificació de l'emoció central</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-on-surface-variant leading-relaxed">Rere cada conflicte hi ha una necessitat no coberta. Identifica si el que sents és frustració, por o incertesa. Posar nom a l'emoció redueix la seva intensitat fins a un 50%.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="md:col-span-12 bg-surface-container-lowest p-8 rounded-lg shadow-[0_40px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row-reverse gap-8 transition-all hover:scale-[1.01]">
            <div className="md:w-1/3 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed-dim flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-on-surface">3. Proposta de micro-hàbit</h3>
            </div>
            <div className="md:w-2/3">
              <p className="text-on-surface-variant leading-relaxed">No cerquis solucions gegants. Acorda un petit canvi que es pugui implementar avui mateix. Un micro-hàbit és la llavor d'una resolució sostenible i duradora.</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <section className="bg-surface-container-low rounded-xl p-8 text-center space-y-6">
          <h3 className="font-headline font-bold text-2xl text-on-surface">Vols aprofundir en aquesta metodologia?</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto">La nostra guia completa conté plantilles de diàleg i exercicis de regulació emocional per a situacions d'alta tensió.</p>
          <button className="bg-gradient-to-r from-primary to-secondary text-on-primary px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto">
            <span className="material-symbols-outlined">download</span>
            Descarregar guia completa
          </button>
        </section>

        {/* Footer / Safety Action */}
        <footer className="pt-8 pb-12 flex flex-col items-center gap-6">
          <button
            onClick={() => navigate('/')}
            className="text-slate-500 font-label font-semibold flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Torna al inici
          </button>
          <div className="text-xs text-outline font-label">ConflictFlow © 2024 · Protocol de Seguretat Actiu</div>
        </footer>
      </main>

      {/* BottomNavBar (Semantic Shell) */}
      <nav className="fixed bottom-0 left-0 w-full px-8 pb-10 pt-4 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.06)] z-50 rounded-t-[3rem]">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 px-6 py-3 flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-98 duration-150"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-jakarta text-sm font-semibold tracking-wide">Previous</span>
        </button>
        <button
          onClick={() => navigate('/done')}
          className="bg-gradient-to-r from-blue-700 to-teal-500 text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-98 duration-150"
        >
          <span className="font-jakarta text-sm font-semibold tracking-wide">Next</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </nav>

      {/* Floating Persistent Safety Action */}
      <button
        onClick={safeExit}
        className="fixed bottom-32 right-6 w-14 h-14 bg-primary-fixed/30 glass-effect rounded-full shadow-2xl flex items-center justify-center text-primary-container z-40 hover:scale-110 transition-transform active:scale-95"
      >
        <span className="material-symbols-outlined text-3xl">emergency</span>
      </button>
    </div>
  )
}
