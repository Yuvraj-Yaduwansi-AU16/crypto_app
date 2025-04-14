import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CryptoCurrency } from "@/components/CustomChart/types";

type CryptoStore = {
  cryptoData: Record<string, CryptoCurrency[]>;
  currency: string;
  isLoading: boolean;
  lastFetchTime: Record<string, number>;
  setCurrency: (currency: string) => void;
  setCryptoData: (currency: string, cryptoData: CryptoCurrency[]) => void;
  getCryptoData: () => Promise<void>;
  error: Error | null;
  setError: (error: Error | null) => void;
};

const CACHE_DURATION = 5 * 60 * 1000; 

const useCryptoStore = create<CryptoStore>()(
  persist(
    (set, get) => ({
      cryptoData: {},
      currency: "USD",
      isLoading: false,
      lastFetchTime: {},
      setCurrency: (currency: string) => {
        set({ currency });
        const now = Date.now();
        const lastFetch = get().lastFetchTime[currency] || 0;
        
        if (!get().cryptoData[currency] || now - lastFetch > CACHE_DURATION) {
          get().getCryptoData();
        }
      },
      setCryptoData: (currency: string, cryptoData: CryptoCurrency[]) => {
        set((state) => ({
          cryptoData: {
            ...state.cryptoData,
            [currency]: cryptoData
          }
        }));
      },
      getCryptoData: async () => {
        try {
          const currency = get().currency;
          const now = Date.now();
          const lastFetch = get().lastFetchTime[currency] || 0;
          const cachedData = get().cryptoData[currency];
          
          // Check if we have cached data that's still valid AND not a failed response
          if (
            cachedData && 
            now - lastFetch <= CACHE_DURATION &&
            !('success' in cachedData && cachedData.success === false)
          ) {
            return; 
          }
          
          set({ isLoading: true });
          const response = await fetch(
            `/api/proxy/getData?vs_currency=${currency}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch crypto data");
          }
          const data = await response.json();
          
          
          if ('success' in data && data.success === false) {
            throw new Error(data.message || "Failed to fetch crypto data");
          }
          
          set((state) => ({
            cryptoData: {
              ...state.cryptoData,
              [currency]: data
            },
            lastFetchTime: {
              ...state.lastFetchTime,
              [currency]: now
            },
            isLoading: false
          }));
        } catch (error) {
          set({ error: error as Error, isLoading: false });
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
        lastFetchTime: state.lastFetchTime,
      }),
    }
  )
);

export default useCryptoStore;
