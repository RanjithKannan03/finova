import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      loginUser: (user) => set({ user: user }),
      logoutUser: () => set({ user: null }),
      updateProfilePic: (profilePic) =>
        set((state) => ({
          user: {
            ...state.user,
            profilePic,
          },
        })),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export const useFlatStore = create((set, get) => ({
  flat: null,
  setFlat: (flat) => set({ flat: flat }),
  clearFlat: () => set({ flat: null }),
}));
