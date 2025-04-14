"use client";
import React, { useMemo } from "react";
import MarketCapChart from "@/components/CustomChart/MarketCapChart";
import VolumeChart from "@/components/CustomChart/VolumeChart";
import PriceChangeChart from "@/components/CustomChart/PriceChangeChart";
import useCryptoStore from "@/lib/store/cryptoStore";
import CurrentPriceChart from "@/components/CustomChart/CurrentPriceChart";
import { Skeleton } from "@/components/ui/skeleton";

const ChartsPage = () => {
  const cryptoData = useCryptoStore(
    (state) => state.cryptoData[state.currency] || []
  );
  const isLoading = useCryptoStore((state) => state.isLoading);

  const charts = useMemo(
    () => [
      { component: MarketCapChart, key: "market-cap" },
      { component: VolumeChart, key: "volume" },
      { component: PriceChangeChart, key: "price-change" },
      { component: CurrentPriceChart, key: "current-price" },
    ],
    []
  );

  if (isLoading || !cryptoData.length) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <Skeleton className="h-[300px] w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
        {charts.map(({ component: Chart, key }) => (
          <Chart key={key} data={cryptoData} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ChartsPage);
