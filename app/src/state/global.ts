import create from 'zustand';
import { combine } from 'zustand/middleware';

const useStore = create(
  combine({ sidebarOpen: false }, (set) => ({
    setSidebarOpen: (open: boolean) => set((state) => ({ sidebarOpen: open })),
  })),
);

export function useSidebar() {
  return useStore((state) => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
  }));
}
