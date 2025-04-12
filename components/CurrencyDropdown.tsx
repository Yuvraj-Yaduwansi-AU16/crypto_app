import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCryptoStore from "@/lib/store";
import { ChevronDown } from "lucide-react";
const CurrencyDropdown = () => {
  const { currency, setCurrency } = useCryptoStore();

  const currencies = ["USD", "CHF", "EUR", "GBP", "INR"];

  const displayCurrencies = currencies.map((displayingCurrency) =>
    displayingCurrency !== currency ? (
      <DropdownMenuItem
        onClick={() => setCurrency(displayingCurrency)}
        key={displayingCurrency}
        className="cursor-pointer"
      >
        {displayingCurrency}
      </DropdownMenuItem>
    ) : null
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md p-2">
        <span className="text-sm font-medium px-2">{currency}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground d-inline" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Available Currencies</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {displayCurrencies}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyDropdown;
