import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CryptoCurrency } from "./CustomChart/types";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  ChevronUp,
  ChevronDown,
  Coins,
} from "lucide-react";
import Image from "next/image";
import useCryptoStore from "@/lib/store";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TableProps {
  data: CryptoCurrency[];
}

type SortColumn =
  | "market_cap_rank"
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap"
  | "total_volume"
  | "circulating_supply";
type SortDirection = "asc" | "desc";

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("market_cap_rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const currency = useCryptoStore((state) => state.currency);
  const router = useRouter();
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return (
        <div className="flex flex-col">
          <ChevronUp className="h-3 w-3 text-muted-foreground" />
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>
      );
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-primary" />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary" />
    );
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-[#B39DDB]">
          <TableRow className="hover:bg-muted/50">
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort("market_cap_rank")}
              data-testid="market-cap-rank-header"
            >
              <div className="flex items-center gap-1">
                #
                <SortIcon column="market_cap_rank" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
              data-testid="name-header"
            >
              <div className="flex items-center gap-1">
                Name
                <SortIcon column="name" />
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("current_price")}
              data-testid="current-price-header"
            >
              <div className="flex items-center justify-end gap-1">
                Price
                <SortIcon column="current_price" />
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("price_change_percentage_24h")}
              data-testid="price-change-percentage-24h-header"
            >
              <div className="flex items-center justify-end gap-1">
                24h %
                <SortIcon column="price_change_percentage_24h" />
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("market_cap")}
              data-testid="market-cap-header"
            >
              <div className="flex items-center justify-end gap-1">
                Market Cap
                <SortIcon column="market_cap" />
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("total_volume")}
              data-testid="total-volume-header"
            >
              <div className="flex items-center justify-end gap-1">
                Volume (24h)
                <SortIcon column="total_volume" />
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("circulating_supply")}
              data-testid="circulating-supply-header"
            >
              <div className="flex items-center justify-end gap-1">
                Circulating Supply
                <SortIcon column="circulating_supply" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((crypto, index) => (
            <TableRow
              key={crypto.id}
              onClick={() => router.push(`/currency/${crypto.id}`)}
              className={cn(
                "cursor-pointer transition-colors hover:bg-muted/50",
                index % 2 === 0 ? "bg-background" : "bg-muted/70"
              )}
              data-testid={`crypto-row-${crypto.id}`}
            >
              <TableCell className="font-medium">
                {crypto.market_cap_rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {imageErrors.has(crypto.id) ? (
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-muted"
                      data-testid="fallback-icon"
                    >
                      <Coins className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                      onError={() => handleImageError(crypto.id)}
                      data-testid={`crypto-image-${crypto.id}`}
                    />
                  )}
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {crypto.symbol.toUpperCase()}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.current_price, currency)}
              </TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex items-center justify-end gap-1 ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {crypto.price_change_percentage_24h > 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : crypto.price_change_percentage_24h < 0 ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.market_cap, currency)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.total_volume, currency)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.circulating_supply, currency)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
