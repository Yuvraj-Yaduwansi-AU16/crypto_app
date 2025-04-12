import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CryptoCurrency } from "./CustomChart/types";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import Image from "next/image";

interface TableProps {
  data: CryptoCurrency[];
}

const formatNumber = (num: number) => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

const formatPercentage = (num: number) => {
  return `${num > 0 ? "+" : ""}${num.toFixed(2)}%`;
};

const SimpleTableComponent: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
            <TableHead className="text-right">Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell className="font-medium">
                {crypto.market_cap_rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {crypto.symbol.toUpperCase()}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.current_price)}
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
                {formatNumber(crypto.market_cap)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.total_volume)}
              </TableCell>
              <TableCell className="text-right">
                {formatNumber(crypto.circulating_supply)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimpleTableComponent;
