"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { CryptoCurrency } from "./types";
import useCryptoStore from "@/lib/store";
import { getCurrencySymbol } from "@/lib/utils";
import { useTheme } from "next-themes";
interface CustomChartProps {
  data: CryptoCurrency[];
}

interface ChartData {
  name: string;
  volume: number;
  price: number;
}

const VolumeChart: React.FC<CustomChartProps> = ({ data }) => {
  const currency = useCryptoStore((state) => state.currency);
  const { theme } = useTheme();
  // Take top 10 cryptocurrencies by 24h volume
  const top10Data = data
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, 10);

  const chartData: ChartData[] = top10Data.map((crypto) => ({
    name: crypto.symbol.toUpperCase(),
    volume: crypto.total_volume / 1e9, // Convert to billions
    price: crypto.current_price,
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartData;
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                24h Volume
              </span>
              <span className="font-bold text-muted-foreground">
                {getCurrencySymbol(currency)}
                {payload[0].value?.toFixed(2)}B
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Price
              </span>
              <span className="font-bold">
                {getCurrencySymbol(currency)}
                {data.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full bg-[#187783]">
      <CardHeader>
        <CardTitle>Top 10 Cryptocurrencies by 24h Volume</CardTitle>
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
                  `${getCurrencySymbol(currency)} ${value}B`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="volume"
                name={`24h Volume (Billion ${currency})`}
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

export default VolumeChart;
