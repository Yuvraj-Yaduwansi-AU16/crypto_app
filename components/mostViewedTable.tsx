import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Coins } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCurrencyStore from "@/lib/currencyStore";

const MostViewedTableComponent: React.FC = () => {
  const mostViewedData = useCurrencyStore((state) => state.mostViewedData);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const router = useRouter();

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Market Cap Rank</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mostViewedData.map((crypto) => (
            <TableRow
              key={crypto.id}
              onClick={() => router.push(`/currency/${crypto.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">
                {crypto.market_cap_rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {imageErrors.has(crypto.id) ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                      <Coins className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <Image
                      src={crypto.image.large}
                      alt={crypto.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                      onError={() => handleImageError(crypto.id)}
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
              <TableCell>{crypto.categories[0] || "Uncategorized"}</TableCell>
              <TableCell>#{crypto.market_cap_rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MostViewedTableComponent;
