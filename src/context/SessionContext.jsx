import { createContext, useContext, useState, useEffect } from 'react'
import { apiCall } from '../lib/apiClient'

const SessionCtx = createContext(null)

export function SessionProvider({ children }) {
  const [sessionId, setSessionId] = useState(
    () => localStorage.getItem('cf_session_id')
  )

  const startSession = async (locale) => {
    const data = await apiCall('/sessions', {
      method: 'POST',
      body: JSON.stringify({ locale })
    })
    localStorage.setItem('cf_session_id', data.session_id)
    setSessionId(data.session_id)
    return data.session_id
  }

  const clearSession = () => {
    localStorage.removeItem('cf_session_id')
    setSessionId(null)
  }

  return (
    <SessionCtx.Provider value={{ sessionId, startSession, clearSession }}>
      {children}
    </SessionCtx.Provider>
  )
}

export const useSession = () => useContext(SessionCtx)