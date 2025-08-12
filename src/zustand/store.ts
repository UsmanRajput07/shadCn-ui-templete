import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthToken {
  token: string;
  setToken: (by: string) => void;
}

const useAuthTokenStore = create<AuthToken>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (by: string) => set({ token: by }),
      }),
      {
        name: "authToken",
      }
    )
  )
);

export default useAuthTokenStore;
