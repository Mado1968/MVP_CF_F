import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSafeExit } from '../hooks/useSafeExit'
import { apiCall } from '../lib/apiClient'

export default function SafetyPage() {
  const navigate = useNavigate()
  const safeExit = useSafeExit()
  const locale = localStorage.getItem('cf_locale') || 'ca'
  const [resources, setResources] = useState([])

  useEffect(() => {
    apiCall(`/safety/resources/${locale}`)
      .then(d => setResources(d.resources))
      .catch(() => {
        // Fallback or hardcoded resources could go here if needed
      })
  }, [locale])

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-[0_40px_40px_rgba(0,0,0,0.06)] flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-[#1F4AA8] font-bold">
            arrow_back
          </button>
          <h1 className="font-headline font-bold text-lg tracking-tight text-[#1F4AA8]">Safety Hub</h1>
        </div>
        <button
          onClick={safeExit}
          className="bg-[#E50522] text-white px-5 py-2 rounded-full font-headline font-black text-sm tracking-wide shadow-lg active:scale-95 transition-all"
        >
          Safe Exit
        </button>
      </header>

      <main className="pt-28 px-6 max-w-2xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl p-8 text-center bg-gradient-to-br from-[#1F4AA8] to-[#2EC4B6] text-white shadow-[0_40px_40px_rgba(0,0,0,0.06)]">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-4 bg-white/20 p-4 rounded-full backdrop-blur-md">
              <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
            </div>
            <h2 className="font-headline font-extrabold text-2xl mb-3 leading-tight">Atenció: Protocol de Seguretat Activat</h2>
            <p className="text-white/90 text-sm leading-relaxed max-w-md mx-auto">
              La teva seguretat és la nostra prioritat. Si estàs en perill immediat, contacta amb els serveis d'emergència.
            </p>
          </div>
        </section>

        {/* Primary Emergency Action */}
        <section className="space-y-4">
          <a
            href="tel:112"
            className="w-full bg-[#E50522] hover:bg-red-700 text-white rounded-full py-6 px-8 flex items-center justify-between group transition-all shadow-[0_20px_30px_rgba(229,5,34,0.2)] active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              <div className="text-left">
                <p className="font-headline font-black text-xl tracking-tight">Trucar al 112</p>
                <p className="text-xs opacity-90 font-medium">Emergències Directes</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">chevron_right</span>
          </a>
        </section>

        {/* Resources Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Victim Support */}
          <div className="bg-surface-container-lowest rounded-lg p-6 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-outline-variant/15 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary">contact_support</span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Línia d'atenció a la víctima</h3>
              <p className="text-on-surface-variant text-xs mb-4">900 900 120</p>
            </div>
            <a
              href="tel:900900120"
              className="bg-primary text-white py-3 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">phone</span>
              Trucar ara
            </a>
          </div>

          {/* Discrete Chat */}
          <div className="bg-surface-container-lowest rounded-lg p-6 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-outline-variant/15 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="w-10 h-10 bg-secondary/10 rounded-md flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary">chat_bubble_outline</span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">Xat de suport discret</h3>
              <p className="text-on-surface-variant text-xs mb-4">Missatgeria segura i silenciada</p>
            </div>
            <button className="bg-secondary text-white py-3 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-lg">forum</span>
              Obrir xat
            </button>
          </div>

          {/* Dynamic Resources from API */}
          {resources && resources.map(r => (
             <div key={r.name} className="bg-surface-container-lowest rounded-lg p-6 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-outline-variant/15 flex flex-col justify-between min-h-[160px]">
                <div>
                  <h3 className="font-headline font-bold text-on-surface mb-1">{r.name}</h3>
                  <p className="text-on-surface-variant text-xs mb-4">{r.desc}</p>
                </div>
                <a
                  href={r.url || `tel:${r.tel}`}
                  className="bg-surface-container-highest text-primary py-3 px-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {r.tel ? <span className="material-symbols-outlined text-lg">phone</span> : null}
                  Accedir
                </a>
             </div>
          ))}

          {/* Shelter Search */}
          <div className="md:col-span-2 bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-outline-variant/15">
            <div className="relative h-40 w-full bg-surface-container">
              <img
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApI9uEwsbEyUZUanmIU3tGbLquB76r8fAkdI00AJQGDTx9i-AOzlQ34yBZJDOdG3kOou7t1EnqJX9Ng9IxmjKcOrepfdMjmbC9PS6MdH2AcD-qrkZoOJsfn3tTa9p1KE0gYJlR-Y5QPlHP-bs5lnK_wqkaAEMCXJDPt3PCFTET66nveB_wIQ4KC0nCHJD5QTbU1bgPiBR6bdPcClgsLJS8an32TAkQcenJHsX1MEyGe1sSgeLjG_auJhMWzcBul6O4B4nHf9RD7WJn"
                alt="Map"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                  <span className="material-symbols-outlined">near_me</span>
                </div>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-gray-100">La teva ubicació</span>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-headline font-bold text-on-surface">Cerca de refugis propers</h3>
                <p className="text-on-surface-variant text-xs">Punts d'ajuda i allotjament segur</p>
              </div>
              <button className="bg-surface-container-highest text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-all active:scale-90">
                <span className="material-symbols-outlined">map</span>
              </button>
            </div>
          </div>
        </section>

        {/* Quick Exit Secondary */}
        <section className="pt-4 flex flex-col items-center">
          <button
            onClick={safeExit}
            className="bg-white border border-outline-variant/30 text-on-surface-variant px-8 py-4 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-surface-container transition-colors shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sortida Ràpida de l'App
          </button>
          <p className="mt-4 text-[10px] text-outline text-center uppercase tracking-widest font-bold">Aquesta acció tancarà la sessió immediatament</p>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:text-[#2EC4B6] transition-colors scale-95 duration-200">
          <span className="material-symbols-outlined">home</span>
          <span className="font-body text-xs font-semibold">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:text-[#2EC4B6] transition-colors scale-95 duration-200">
          <span className="material-symbols-outlined">library_books</span>
          <span className="font-body text-xs font-semibold">Resources</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/30 text-[#1F4AA8] dark:text-blue-200 rounded-full px-5 py-2 scale-95 duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
          <span className="font-body text-xs font-semibold">Emergency</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:text-[#2EC4B6] transition-colors scale-95 duration-200">
          <span className="material-symbols-outlined">person</span>
          <span className="font-body text-xs font-semibold">Profile</span>
        </button>
      </nav>

      {/* Persistent Safety FAB */}
      <div className="fixed bottom-28 right-6 z-40">
        <button
          onClick={safeExit}
          className="bg-[#E50522] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>sos</span>
        </button>
      </div>
    </div>
  )
}
