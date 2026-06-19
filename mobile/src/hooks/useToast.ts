import { useUIStore } from '../store'

export function useToast() {
  const addToast = useUIStore((s) => s.addToast)

  return {
    success: (message: string) => addToast({ message, type: 'success' }),
    error: (message: string) => addToast({ message, type: 'error' }),
    warning: (message: string) => addToast({ message, type: 'warning' }),
    info: (message: string) => addToast({ message, type: 'info' }),
  }
}
