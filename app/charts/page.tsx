"use client";
import React from "react";
import MarketCapChart from "@/components/CustomChart/MarketCapChart";
import VolumeChart from "@/components/CustomChart/VolumeChart";
import PriceChangeChart from "@/components/CustomChart/PriceChangeChart";
import useCryptoStore from "@/lib/store";
import CurrentPriceChart from "@/components/CustomChart/CurrentPriceChart";

const ChartsPage = () => {
  const cryptoData = useCryptoStore((state) => state.cryptoData);
  console.log(cryptoData, "cryptoData");
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
        <MarketCapChart data={cryptoData} />
        <VolumeChart data={cryptoData} />
        <PriceChangeChart data={cryptoData} />
        <CurrentPriceChart data={cryptoData} />
      </div>
    </div>
  );
};

export default ChartsPage;
