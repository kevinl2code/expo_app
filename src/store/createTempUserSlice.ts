import { StateCreator } from 'zustand'

export interface TempUser {
  tempUser: string | null
  setTempUser: (tempUser: string | null) => void
}

export const createTempUserSlice: StateCreator<TempUser> = (set) => ({
  tempUser: null,
  setTempUser: (tempUser): void => {
    set((state) => ({ ...state, tempUser }))
  },
})
