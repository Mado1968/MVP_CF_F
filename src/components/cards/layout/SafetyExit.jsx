export default function SafetyExit() {
  const handleExit = () => {
    localStorage.clear()
    window.location.replace('https://www.google.com')
  }
  return (
    <button
      onClick={handleExit}
      className="fixed top-4 right-4 z-50
        text-xs font-medium
        bg-red-50 text-red-700
        border border-red-200
        px-3 py-1.5 rounded-full
        hover:bg-red-100 transition-colors"
    >
      Sortir ara
    </button>
  )
}