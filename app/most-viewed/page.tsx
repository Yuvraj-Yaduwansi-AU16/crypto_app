"use client";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import React from "react";
import MostViewedTableComponent from "@/components/mostViewedTable";
import useCurrencyStore from "@/lib/store/currencyStore";
import Image from "next/image";
const MostViewedPage = () => {
  const mostViewedData = useCurrencyStore((state) => state.mostViewedData);
  return (
    <>
      <div className="container mx-auto py-8 space-y-8 ">
        {mostViewedData.length > 0 ? (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Most Recently Viewed Cryptocurrencies</CardTitle>
            </CardHeader>
            <CardContent>
              <MostViewedTableComponent />
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
            <Image src="/sad.svg" alt="No data" width={200} height={200} />
            <p className="text-lg font-bold">
              No recently viewed cryptocurrencies
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MostViewedPage;
