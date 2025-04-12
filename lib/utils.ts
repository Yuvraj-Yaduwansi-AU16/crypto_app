import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatNumber = (num: number, currency: string) => {
  if (num === null) {
    return "N/A";
  }
  if (num >= 1e9) {
    return `${getCurrencySymbol(currency)}${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `${getCurrencySymbol(currency)}${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `${getCurrencySymbol(currency)}${(num / 1e3).toFixed(2)}K`;
  }
  return `${getCurrencySymbol(currency)}${num.toFixed(2)}`;
};

export const formatPercentage = (num: number) => {
  if (num === null) {
    return "N/A";
  }
  return `${num > 0 ? "+" : ""}${num.toFixed(2)}%`;
};

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "INR":
      return "₹";
    case "CHF":
      return "¥";
    default:
      return "USD";
  }
};