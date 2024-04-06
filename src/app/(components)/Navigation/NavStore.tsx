import { create } from "zustand";

type NavStore = {
  sideNavOpen: boolean;
  toggleSideNav: () => void;
};

export const useNavStore = create<NavStore>((set) => ({
  sideNavOpen: true,
  toggleSideNav: () =>
    set((state) => ({
      ...state,
      sideNavOpen: !state.sideNavOpen,
    })),
}));
