"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun, Home, BarChart2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            onClick={() => router.push("/")}
            className={cn(
              "flex items-center gap-2",
              isActive("/") && "bg-primary text-primary-foreground"
            )}
          >
            <Home className="h-4 w-4" />
            <span>Top 50</span>
          </Button>
          <Button
            variant={isActive("/charts") ? "default" : "ghost"}
            onClick={() => router.push("/charts")}
            className={cn(
              "flex items-center gap-2",
              isActive("/charts") && "bg-primary text-primary-foreground"
            )}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Charts</span>
          </Button>
          <Button
            variant={isActive("/most-viewed") ? "default" : "ghost"}
            onClick={() => router.push("/most-viewed")}
            className={cn(
              "flex items-center gap-2",
              isActive("/most-viewed") && "bg-primary text-primary-foreground"
            )}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Most Viewed</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
