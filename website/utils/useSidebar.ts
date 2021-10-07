import create from 'zustand'

type SideBarStateProps = {
  sidebarOpen: boolean
  toggleSideBar: () => void
  setSideBar: (open: boolean) => void
}

export const useSidebar = create<SideBarStateProps>((set) => ({
  sidebarOpen: false,
  toggleSideBar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSideBar: (sidebarOpen: boolean) => set({ sidebarOpen })
}))
