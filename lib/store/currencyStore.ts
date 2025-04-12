import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoinDetail } from "../currencyTypes";

type CurrencyStore = {
  currencyData: CoinDetail | null;
  isLoading: boolean;
  mostViewedData: CoinDetail[];
  getCurrencyData: (id: string) => Promise<void>;
  error: Error | null;
  setError: (error: Error | null) => void;
};

const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currencyData: null,
      isLoading: false,
      mostViewedData: [],
      error: null,
      setError: (error: Error | null) => set({ error }),
      getCurrencyData: async (id: string) => {
        try {
          set({ isLoading: true });
          const response = await fetch(`/api/proxy/getCurrencyData?id=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch currency data");
          }
          const data = await response.json();
          set({ currencyData: data, isLoading: false });

          const currentViewingData = data;
          set((state) => {
            const filteredData = state.mostViewedData.filter(
              (item) => item.id !== currentViewingData.id
            );
            return {
              mostViewedData: [currentViewingData, ...filteredData].slice(0, 10), 
            };
          });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },
    }),
    {
      name: "currency-store", 
      partialize: (state) => ({
        mostViewedData: state.mostViewedData,
      }), 
    }
  )
);

export default useCurrencyStore;
