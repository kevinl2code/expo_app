import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { TempUser, createTempUserSlice } from './createTempUserSlice'

interface IStore extends TempUser {}

/**
 * Make sure to enforce type for each slice
 */

export const useStore = create<IStore>()(
  persist(
    (set, get, api) => ({
      ...createTempUserSlice(set, get, api),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // getStorage: () => AsyncStorage,
    }
  )
)
