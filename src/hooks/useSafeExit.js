import { useSession } from '../context/SessionContext'

export function useSafeExit() {
  const { clearSession } = useSession()

  const safeExit = () => {
    clearSession()
    localStorage.clear()
    window.location.replace('https://www.google.com')
  }

  return safeExit
}
