"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import useCurrencyStore from "@/lib/store/currencyStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import useCryptoStore from "@/lib/store/cryptoStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loading from "@/app/loading";
import Error from "@/app/error";
import Link from "next/link";
const CurrencyPage = () => {
  const params = useParams();
  const id = params.id as string;
  const currencyData = useCurrencyStore((state) => state.currencyData);
  const isLoading = useCurrencyStore((state) => state.isLoading);
  const getCurrencyData = useCurrencyStore((state) => state.getCurrencyData);
  const error = useCurrencyStore((state) => state.error);
  const currency = useCryptoStore((state) => state.currency);
  useEffect(() => {
    getCurrencyData(id);
  }, [id, getCurrencyData]);

  if (error) {
    return <Error error={error} reset={() => getCurrencyData(id)} />;
  }

  if (isLoading || !currencyData) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-8 space-y-8 bg-[#C8B7E6] dark:bg-background px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src={currencyData.image.large}
              alt={currencyData.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <CardTitle className="text-2xl">{currencyData.name}</CardTitle>
              <p className="text-muted-foreground">
                {currencyData.symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 mb-8">
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm text-muted-foreground">
              {currencyData.description.en}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-2xl font-bold">
                {formatNumber(
                  currencyData.market_data.current_price[
                    currency.toLowerCase()
                  ],
                  currency
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-2xl font-bold">
                {formatNumber(
                  currencyData.market_data.market_cap[currency.toLowerCase()],
                  currency
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-2xl font-bold">
                {formatNumber(
                  currencyData.market_data.total_volume[currency.toLowerCase()],
                  currency
                )}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p
                className={`text-2xl font-bold ${
                  currencyData.market_data.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {currencyData.market_data.price_change_percentage_24h.toFixed(
                  2
                )}
                %
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Market Cap Rank</p>
              <p className="text-2xl font-bold">
                #{currencyData.market_cap_rank}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Genesis Date</p>
              <p className="text-2xl font-bold">{currencyData.genesis_date}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Socials */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image
              src="/link.svg"
              alt="link"
              width={48}
              height={48}
              className="rounded-full dark:invert"
            />
            <div>
              <CardTitle className="text-2xl">Social Links</CardTitle>
              <p className="text-muted-foreground">
                {currencyData.symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Homepage</p>

              <p className="inline-flex items-center gap-2 text-2xl font-bold cursor-pointer  hover:underline">
                <Image
                  src={currencyData.image.thumb}
                  alt={currencyData.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />{" "}
                <Link href={currencyData.links.homepage[0]} target="_blank">
                  {currencyData.links.homepage[0]}
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Github Urls</p>
              <Popover>
                <PopoverTrigger className="inline-flex items-center gap-2 text-2xl font-bold cursor-pointer  hover:underline">
                  <Image
                    src="/github.svg"
                    alt="Github"
                    width={20}
                    height={20}
                    className="rounded-full dark:invert"
                  />{" "}
                  Reveal Github Urls
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  {currencyData.links.repos_url.github.map((url) => (
                    <p
                      key={url}
                      className="text-sm text-muted-foreground my-2 underline"
                    >
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </Link>
                    </p>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Twitter Handle</p>
              <p className="inline-flex items-center gap-2 text-2xl font-bold cursor-pointer  hover:underline">
                <Image
                  src="/twitter.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                  className="rounded-full "
                />{" "}
                {currencyData.links.twitter_screen_name.length > 0
                  ? currencyData.links.twitter_screen_name
                  : "N/A"}
              </p>
            </div>
            <div className="space-y-2 overflow-clip">
              <p className="text-sm text-muted-foreground">Subreddit</p>
              <p className="inline-flex items-center gap-2 text-2xl font-bold cursor-pointer  hover:underline">
                <Image
                  src="/reddit.svg"
                  alt="Reddit"
                  width={20}
                  height={20}
                  className="rounded-full "
                />{" "}
                <Link href={currencyData.links.subreddit_url} target="_blank">
                  {currencyData.links.subreddit_url}
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Blockchain Sites</p>
              <Popover>
                <PopoverTrigger className="inline-flex items-center gap-2 text-2xl font-bold cursor-pointer  hover:underline">
                  <Image
                    src="/blockchain.svg"
                    alt="blockchain"
                    width={20}
                    height={20}
                    className="rounded-full dark:invert"
                  />{" "}
                  Reveal Blockchain Sites
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  {currencyData.links.blockchain_site.map((url) => (
                    <p
                      key={url}
                      className="text-sm text-muted-foreground my-2 underline"
                    >
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </Link>
                    </p>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Facebook Username</p>
              <p className="inline-flex items-center gap-2 text-2xl font-bold cursor-pointer  hover:underline">
                <Image
                  src="/facebook.svg"
                  alt="fb"
                  width={20}
                  height={20}
                  className="rounded-full "
                />{" "}
                {currencyData.links.facebook_username.length > 0
                  ? currencyData.links.facebook_username
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyPage;
