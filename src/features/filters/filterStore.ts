import { create } from 'zustand'

interface FilterState {
  search: string
  category: string
  setSearch: (search: string) => void
  setCategory: (category: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  category: 'All',
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
}))
