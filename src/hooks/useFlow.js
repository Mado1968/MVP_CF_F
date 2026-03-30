
import { useState, useEffect, useCallback } from 'react'
import { apiCall } from '../lib/apiClient'
import { useSession } from '../context/SessionContext'

export function useFlow() {
  const { sessionId } = useSession()
  const [card, setCard]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  

  const fetchNext = useCallback(async () => {
    if (!sessionId) return
    setLoading(true)
    try {
      const data = await apiCall(`/flow/${sessionId}/next`)
      setCard(data)
    } catch(e) { setError(e.message) }
    finally { setLoading(false) }
  }, [sessionId])

  const answer = async (questionId, response) => {
    const result = await apiCall(`/flow/${sessionId}/answer`, {
      method: 'POST',
      body: JSON.stringify({ question_id: questionId, ...response })
    })
    if (result.nodeComplete) await fetchNext()
    return result
  }

  const fetchProposal = async () => {
    const data = await apiCall(`/flow/${sessionId}/proposal`, {
      method: 'POST',
      body: JSON.stringify({})
    })
    return data
  }
  const sendCheckin = async (checkinData) => {
  const data = await apiCall(`/flow/${sessionId}/checkin`, {
    method: 'POST',
    body: JSON.stringify(checkinData)
  })
  // el backend retorna nextNode — actualitza la card
  await fetchNext()
  return data
}

  useEffect(() => { fetchNext() }, [fetchNext])
  return { card, loading, error, answer, fetchProposal,sendCheckin }
}