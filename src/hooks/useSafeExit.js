import { useSession } from '../context/SessionContext'

export function useSafeExit() {
  const { clearSession } = useSession()

  const safeExit = () => {
    clearSession()
    localStorage.clear()
    window.location.replace('https://mvp-cf-f.vercel.app/')
  }

  return safeExit
}
