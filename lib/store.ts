import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CryptoCurrency } from "@/components/CustomChart/types";

type CryptoStore = {
  cryptoData: CryptoCurrency[];
  currency: string;
  setCurrency: (currency: string) => void;
  setCryptoData: (cryptoData: CryptoCurrency[]) => void;
  getCryptoData: () => Promise<void>;
  error: Error | null;
  setError: (error: Error | null) => void;
};

const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      cryptoData: [],
      currency: "USD",
      setCurrency: (currency: string) => {
        set({ currency });
        useCryptoStore.getState().getCryptoData();
      },
      setCryptoData: (cryptoData: CryptoCurrency[]) => set({ cryptoData }),
      getCryptoData: async () => {
        try {
          const response = await fetch(
            `/api/proxy/getData?vs_currency=${useCryptoStore.getState().currency}`
          );
          const data = await response.json();
          console.log("data from store", data);
          set({ cryptoData: data });
        } catch (error) {
          set({ error: error as Error });
        }
      },
      error: null,
      setError: (error: Error | null) => set({ error }),
    }),
    {
      name: "crypto-store", 
      partialize: (state) => ({
        currency: state.currency,
        cryptoData: state.cryptoData,
      }), 
    }
  )
);

export default useCryptoStore;
