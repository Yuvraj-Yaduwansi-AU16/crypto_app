"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoCurrency } from "./types";
import useCryptoStore from "@/lib/store/cryptoStore";
import { getCurrencySymbol } from "@/lib/utils";
import { useTheme } from "next-themes";

interface CustomChartProps {
  data: CryptoCurrency[];
}

interface ChartData {
  name: string;
  price: number;
  priceChange: number;
}

const CurrentPriceChart: React.FC<CustomChartProps> = ({ data }) => {
  const currency = useCryptoStore((state) => state.currency);
  const { theme } = useTheme();
  // Take top 10 cryptocurrencies by current price
  const top10Data = data
    .sort((a, b) => b.current_price - a.current_price)
    .slice(0, 10);

  const chartData: ChartData[] = top10Data.map((crypto) => ({
    name: crypto.symbol.toUpperCase(),
    price: crypto.current_price,
    priceChange: crypto.price_change_percentage_24h,
  }));

  return (
    <Card className="w-full bg-[#18836a]">
      <CardHeader>
        <CardTitle className="text-[#FFFFFF]">
          Top 10 Cryptocurrencies by Current Price
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#FFFFFF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#FFFFFF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) =>
                  `${getCurrencySymbol(currency)}${value.toLocaleString()}`
                }
              />
              <Legend />
              <Bar
                dataKey="price"
                name={`Current Price (${currency})`}
                fill={theme === "dark" ? "#FFDC5E" : "#FF9E80"}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPriceChart;
