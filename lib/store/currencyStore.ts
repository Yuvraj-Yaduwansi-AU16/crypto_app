import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoinDetail } from "../currencyTypes";

type CurrencyStore = {
  currencyData: Record<string, { data: CoinDetail | null; timestamp: number }>;
  isLoading: boolean;
  mostViewedData: CoinDetail[];
  lastFetchTime: number;
  getCurrencyData: (id: string) => Promise<void>;
  error: Error | null;
  setError: (error: Error | null) => void;
};

const CACHE_DURATION = 5 * 60 * 1000;

const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currencyData: {},
      isLoading: false,
      mostViewedData: [],
      lastFetchTime: 0,
      error: null,
      setError: (error: Error | null) => set({ error }),
      getCurrencyData: async (id: string) => {
        try {
          const now = Date.now();
          const cachedData = get().currencyData[id];
          
          
          if (!cachedData) {
            set((state) => ({
              currencyData: {
                ...state.currencyData,
                [id]: { data: null, timestamp: 0 }
              }
            }));
          }
          
          
          if (
            cachedData?.data && 
            now - cachedData.timestamp <= CACHE_DURATION &&
            !('success' in cachedData.data && cachedData.data.success === false)
          ) {
            set((state) => {
              const filteredData = state.mostViewedData.filter(
                (item) => item.id !== cachedData.data?.id
              );
              return {
                mostViewedData: cachedData.data 
                  ? [cachedData.data, ...filteredData].slice(0, 10)
                  : state.mostViewedData,
              };
            });
            return; 
          }
          
          set({ isLoading: true });
          const response = await fetch(`/api/proxy/getCurrencyData?id=${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch currency data");
          }
          const data = await response.json();
          
        
          if ('success' in data && data.success === false) {
            throw new Error(data.message || "Failed to fetch currency data");
          }
          
          set((state) => {
            const filteredData = state.mostViewedData.filter(
              (item) => item.id !== data.id
            );
            return {
              currencyData: {
                ...state.currencyData,
                [id]: { data, timestamp: now }
              },
              mostViewedData: [data, ...filteredData].slice(0, 10),
              isLoading: false
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
        currencyData: state.currencyData,
      }),
    }
  )
);

export default useCurrencyStore;
