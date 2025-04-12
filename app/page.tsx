"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import TableComponent from "@/components/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCryptoStore from "@/lib/store/cryptoStore";
import CurrencyDropdown from "@/components/CurrencyDropdown";
import { Input } from "@/components/ui/input";
import Error from "@/app/error";
import Loading from "./loading";
export default function Home() {
  const cryptoData = useCryptoStore((state) => state.cryptoData);
  const isLoading = useCryptoStore((state) => state.isLoading);
  const getCryptoData = useCryptoStore((state) => state.getCryptoData);
  const error = useCryptoStore((state) => state.error);
  const [searchText, setSearchText] = useState("");

  const searchData = useMemo(() => {
    if (searchText.trim() === "") {
      return cryptoData;
    }
    return cryptoData.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, cryptoData]);

  const pageTitle = useMemo(() => {
    return searchText.trim() === ""
      ? "Top 50 Cryptocurrency By Market Data"
      : `Search Results for "${searchText}"`;
  }, [searchText]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  useEffect(() => {
    getCryptoData();
  }, [getCryptoData]);
  if (error) {
    return <Error error={error} reset={() => getCryptoData()} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mx-auto py-8 space-y-8 px-8 bg-[#C8B7E6] dark:bg-background">
      <Input
        type="text"
        placeholder="Search cryptocurrencies by name..."
        value={searchText}
        onChange={handleSearch}
        className="w-75 mx-auto border-2 border-gray-600 rounded-md bg-white dark:bg-background"
      />
      <Card className="w-full">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>{pageTitle}</CardTitle>
          <CurrencyDropdown />
        </CardHeader>
        <CardContent>
          {searchData.length > 0 ? (
            <TableComponent data={searchData} />
          ) : (
            <div className="text-center text-gray-500">
              No results found for &quot;{searchText}&quot;
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
