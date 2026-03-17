import { create } from 'zustand'
import type { NutrientType } from '../utils/colors'

export type AppMode = 'narrative' | 'interactive'

interface AppState {
  mode: AppMode
  setMode: (mode: AppMode) => void

  scrollProgress: number
  setScrollProgress: (progress: number) => void

  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void

  nutrientFilters: Record<NutrientType, boolean>
  toggleNutrient: (type: NutrientType) => void

  particleSpeed: number
  setParticleSpeed: (speed: number) => void

  isMobile: boolean
  setIsMobile: (mobile: boolean) => void

  // Camera state for mode transitions
  lastNarrativeCameraPos: [number, number, number]
  setLastNarrativeCameraPos: (pos: [number, number, number]) => void
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'narrative',
  setMode: (mode) => set({ mode }),

  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  selectedNodeId: null,
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),

  nutrientFilters: {
    carbon: true,
    water: true,
    phosphorus: true,
    nitrogen: true,
  },
  toggleNutrient: (type) =>
    set((state) => ({
      nutrientFilters: {
        ...state.nutrientFilters,
        [type]: !state.nutrientFilters[type],
      },
    })),

  particleSpeed: 1.0,
  setParticleSpeed: (particleSpeed) => set({ particleSpeed }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),

  lastNarrativeCameraPos: [0, 15, 30],
  setLastNarrativeCameraPos: (lastNarrativeCameraPos) =>
    set({ lastNarrativeCameraPos }),
}))
