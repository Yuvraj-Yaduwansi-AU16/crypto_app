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
import { useTheme } from "next-themes";
interface CustomChartProps {
  data: CryptoCurrency[];
}

interface ChartData {
  name: string;
  priceChange: number;
  price: number;
  color: string;
}

const PriceChangeChart: React.FC<CustomChartProps> = ({ data }) => {
  const { theme } = useTheme();
  // Take top 10 cryptocurrencies by 24h price change
  const top10Data = data
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 10);

  const chartData: ChartData[] = top10Data.map((crypto) => ({
    name: crypto.symbol.toUpperCase(),
    priceChange: crypto.price_change_percentage_24h,
    price: crypto.current_price,
    color:
      crypto.price_change_percentage_24h >= 0
        ? "hsl(var(--primary))"
        : "hsl(var(--destructive))",
  }));

  return (
    <Card className="w-full bg-[#187783]">
      <CardHeader>
        <CardTitle className="text-[#FFFFFF]">
          Top 10 Cryptocurrencies by 24h Price Change
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
                tickFormatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Bar
                dataKey="priceChange"
                name="24h Price Change (%)"
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

export default PriceChangeChart;
