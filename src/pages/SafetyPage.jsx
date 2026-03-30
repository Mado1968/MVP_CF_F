export default function SafetyPage() {
  const { clearSession } = useSession()
  const locale = localStorage.getItem('cf_locale') || 'ca'
  const [resources, setResources] = useState([])

  useEffect(() => {
    apiCall(`/safety/resources/${locale}`)
      .then(d => setResources(d.resources))
      .catch(() => {})   // si falla, mostra els recursos hardcoded
  }, [])

  const handleExit = () => {
    clearSession()
    window.location.replace('https://www.google.com')
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12
      max-w-md mx-auto">
      <h1 className="text-xl font-medium text-gray-900 mb-6">
        Si necessites ajuda ara
      </h1>
      <div className="space-y-3">
        {resources.map(r => (
          <a key={r.name} href={r.url ?? `tel:${r.tel}`}
            className="block p-4 rounded-xl border
              border-gray-200 text-sm text-gray-700
              hover:border-gray-300 transition-colors"
          >
            <span className="font-medium">{r.name}</span>
            <span className="text-gray-500 ml-2">{r.desc}</span>
          </a>
        ))}
      </div>
      <button onClick={handleExit}
        className="mt-10 w-full py-3 rounded-xl text-sm
          text-red-700 border border-red-200 bg-red-50
          hover:bg-red-100 transition-colors">
        Esborrar tot i sortir
      </button>
    </main>
  )
}