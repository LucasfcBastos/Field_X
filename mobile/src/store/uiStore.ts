import { create } from 'zustand'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface UIState {
  toasts: Toast[]
  isLoading: boolean
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>((set, get) => ({
  toasts: [],
  isLoading: false,
  addToast: (toast) => {
    const id = Date.now().toString()
    set({ toasts: [...get().toasts, { ...toast, id }] })
    setTimeout(() => get().removeToast(id), 4000)
  },
  removeToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
  setLoading: (isLoading) => set({ isLoading }),
}))
