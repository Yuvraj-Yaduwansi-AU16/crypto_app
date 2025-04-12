import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableComponent from "./Table";
import { CryptoCurrency } from "./CustomChart/types";

// Mock the store
jest.mock("@/lib/store", () => ({
  __esModule: true,
  default: () => ({
    currency: "USD",
  }),
}));

describe("TableComponent", () => {
  // Create a minimal type for the table component's needs
  type MinimalCryptoCurrency = Pick<
    CryptoCurrency,
    | "id"
    | "name"
    | "symbol"
    | "image"
    | "current_price"
    | "market_cap"
    | "market_cap_rank"
    | "price_change_percentage_24h"
    | "total_volume"
    | "circulating_supply"
  >;

  const mockData: MinimalCryptoCurrency[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      image: "https://example.com/bitcoin.png",
      current_price: 50000,
      market_cap: 1000000000,
      market_cap_rank: 1,
      price_change_percentage_24h: 5.5,
      total_volume: 500000000,
      circulating_supply: 19000000,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "eth",
      image: "https://example.com/ethereum.png",
      current_price: 3000,
      market_cap: 500000000,
      market_cap_rank: 2,
      price_change_percentage_24h: -2.5,
      total_volume: 300000000,
      circulating_supply: 120000000,
    },
  ];

  it("renders table with correct data", () => {
    render(<TableComponent data={mockData as CryptoCurrency[]} />);

    // Check if table headers are present
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("24h %")).toBeInTheDocument();

    // Check if data is rendered
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("sorts data when clicking on column headers", () => {
    render(<TableComponent data={mockData as CryptoCurrency[]} />);

    // Click on market cap rank header
    fireEvent.click(screen.getByText("#"));

    // Click on name header
    fireEvent.click(screen.getByText("Name"));

    // Click on price header
    fireEvent.click(screen.getByText("Price"));
  });

  it("handles image errors correctly", () => {
    render(<TableComponent data={mockData as CryptoCurrency[]} />);

    // Simulate image error
    const images = screen.getAllByRole("img");
    fireEvent.error(images[0]);

    // Check if fallback icon is shown
    expect(screen.getByTestId("fallback-icon")).toBeInTheDocument();
  });
});
