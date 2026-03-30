export default function SummaryCard({ sessionId, onConfirm }) {
  const [summary, setSummary] = useState(null)
  useEffect(() => {
    apiCall(`/flow/${sessionId}/summary`).then(setSummary)
  }, [])

  if (!summary) return <Spinner />
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Això és el que hem entès fins ara
      </p>
      <div className="bg-brand-50 rounded-xl p-4 space-y-2
        text-sm text-brand-800">
        <p>Factor principal: <strong>
          {summary.triage.primary_factor}
        </strong></p>
        <p>Fase: {summary.triage.dynamic_phase}</p>
        <p>Freqüència: {summary.triage.frequency}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button onClick={() => onConfirm(false)}
          className="...">Revisar</button>
        <button onClick={() => onConfirm(true)}
          className="...">S'hi acosta</button>
      </div>
    </div>
  )
}