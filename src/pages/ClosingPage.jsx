import { useNavigate } from 'react-router-dom'
import { useSession }  from '../context/SessionContext'
import { apiCall }     from '../lib/apiClient'
import ClosingCard     from '../components/cards/ClosingCard'

export default function ClosingPage() {
  const { sessionId, clearSession } = useSession()
  const navigate = useNavigate()

  const handleClose = async (data) => {
    try {
      await apiCall(`/flow/${sessionId}/close`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      clearSession()
      navigate('/done')
    } catch (e) {
      console.error('Error tancant la sessió:', e)
    }
  }

  return (
    <main className="min-h-screen flex items-center
      justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border
          border-gray-200 p-8">
          <p className="text-lg font-medium text-gray-900 mb-2">
            Abans de tancar
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Tres preguntes per consolidar el que has après.
          </p>
          <ClosingCard onAnswer={handleClose} />
        </div>
      </div>
    </main>
  )
}