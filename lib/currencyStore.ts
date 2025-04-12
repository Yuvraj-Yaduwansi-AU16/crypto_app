import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoinDetail } from "./currencyTypes";

type CurrencyStore = {
  currencyData: CoinDetail | null;
  mostViewedData: CoinDetail[];
  getCurrencyData: (id: string) => Promise<void>;
  error: Error | null;
  setError: (error: Error | null) => void;
};

const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currencyData: null,
      mostViewedData: [],
      error: null,
      setError: (error: Error | null) => set({ error }),
      getCurrencyData: async (id: string) => {
        try {
          const response = await fetch(`/api/proxy/getCurrencyData?id=${id}`);
          if (!response.ok) {
            console.log("error response", response);
            throw new Error("Failed to fetch currency data");
          }
          const data = await response.json();
          set({ currencyData: data });

          // Update most viewed data
          const currentViewingData = data;
          set((state) => {
            // Remove the item if it exists
            const filteredData = state.mostViewedData.filter(
              (item) => item.id !== currentViewingData.id
            );
            // Add the current item at the beginning
            return {
              mostViewedData: [currentViewingData, ...filteredData].slice(0, 10), 
            };
          });
        } catch (error) {
          set({ error: error as Error });
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
