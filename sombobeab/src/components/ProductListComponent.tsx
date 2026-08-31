"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Price, PriceValue } from "@/components/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_trending?: boolean;
  available?: boolean;
}


interface Product {
  id: string;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  description: string;
  price: {
    regular: number;
    sale?: number;
    currency: string;
  };
  badge?: {
    text: string;
    color?: string;
  };
}

function mapFoodToProduct(food: FoodItem): Product {
  return {
    id: food.id,
    name: food.name,
    image: {
      src: food.image_url,
      alt: food.name,
    },
    link: `/products/${food.id}`,
    description: food.description,
    price: {
      regular: food.price,
      currency: "USD",
    },
    badge: food.is_trending
      ? {
          text: "Trending",
        }
      : undefined,
  };
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductList1Props {
  className?: string;
  apiUrl?: string;
}

const ProductListComponent = ({
  className,
  apiUrl = `${API_BASE_URL}/food-items?skip=0&limit=100`,
}: ProductList1Props) => {
  const [data, setData] = useState<FoodItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!API_BASE_URL && !apiUrl.startsWith("http")) {
      console.warn(
        "NEXT_PUBLIC_API_URL is not set. Add it to .env.local and restart your dev server."
      );
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(
            `Failed to fetch products (${res.status})`
          );
        }

        const json: FoodItem[] = await res.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err
              : new Error("Unknown error")
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  // Only show available products
  const products =
    data?.filter((item) => item.available !== false) ?? [];

  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-28",
        className
      )}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">

        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground shadow-sm">
              Our Menu
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
             ស្វែងរក <br />
              <span className="block text-primary">
                អ្វីដែលឆ្ងាញ់
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
             ស្វែងយល់ពីជម្រើសអាហារឆ្ងាញ់ៗរបស់យើង ដែលផលិតពីគ្រឿងផ្សំស្រស់ៗ និងត្រៀមរួចជាស្រេចសម្រាប់អ្នកដើម្បីរីករាយជាមួយ។
            </p>
          </div>

          {!isLoading && !error && products.length > 0 && (
            <div className="hidden shrink-0 rounded-full border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm sm:block">
              {products.length}{" "}
              {products.length === 1 ? "item" : "items"}
            </div>
          )}
        </div>
        {error && (
          <div className="mb-8 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-center">
            <p className="font-medium text-destructive">
              Couldn't load products.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Please try again later.
            </p>
          </div>
        )}


        <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}
          {!isLoading &&
            products.map((item, i) => (
              <ProductCard
                key={item.id}
                index={i}
                {...mapFoodToProduct(item)}
              />
            ))}
        </div>
        {!isLoading && !error && products.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/20 px-6 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted text-2xl">
              🍽️
            </div>

            <h3 className="text-xl font-semibold">
              No products found
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              There are no available products right now.
              Please check back later for something delicious.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({
  name,
  description,
  link,
  image,
  badge,
  price,
  index = 0,
}: Product & { index?: number }) => {
  const { regular, sale, currency } = price;

  return (
    <Link
      href={link}
      className="group block h-full w-full animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
      style={{
        animationDelay: `${Math.min(index, 8) * 70}ms`,
      }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden rounded-2xl border bg-card p-0",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:shadow-2xl"
        )}
      >

        <CardHeader className="relative block overflow-hidden p-0">
          <AspectRatio ratio={4 / 3}>
            <img
              src={image.src}
              alt={image.alt}
              loading={index < 3 ? "eager" : "lazy"}
              className={cn(
                "block size-full object-cover object-center",
                "transition-transform duration-700 ease-out",
                "group-hover:scale-110"
              )}
            />
          </AspectRatio>

          {/* Image gradient */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              "bg-gradient-to-t from-black/60 via-black/5 to-transparent",
              "opacity-0 transition-opacity duration-300",
              "group-hover:opacity-100"
            )}
          />
          {badge && (
            <Badge
              style={
                badge.color
                  ? {
                      backgroundColor: badge.color,
                    }
                  : undefined
              }
              className={cn(
                "absolute left-4 top-4 rounded-full",
                "border border-white/20 px-3 py-1.5",
                "text-xs font-semibold shadow-lg",
                "backdrop-blur-md",
                !badge.color &&
                  "bg-primary text-primary-foreground"
              )}
            >
              <span className="mr-1">🔥</span>
              {badge.text}
            </Badge>
          )}
          <div
            className={cn(
              "absolute bottom-4 right-4",
              "translate-y-3 opacity-0",
              "transition-all duration-300",
              "group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            <div className="rounded-full bg-background/95 px-4 py-2.5 text-sm font-semibold text-foreground shadow-xl backdrop-blur-md">
              View item
              <span className="ml-1.5">→</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex min-h-[205px] flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="line-clamp-1 text-lg font-bold tracking-tight sm:text-xl">
              {name}
            </CardTitle>

            {badge && (
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Popular
              </span>
            )}
          </div>


          <CardDescription className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {description}
          </CardDescription>


          <div className="mt-auto flex items-center justify-between gap-4 pt-6">

            <Price
              onSale={sale != null}
              className="text-lg font-bold sm:text-xl"
            >
              {sale != null && (
                <PriceValue
                  price={sale}
                  currency={currency}
                  variant="sale"
                />
              )}

              <PriceValue
                price={regular}
                currency={currency}
                variant="regular"
              />
            </Price>
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center",
                "rounded-full border bg-muted",
                "text-base font-medium",
                "transition-all duration-300",
                "group-hover:border-primary",
                "group-hover:bg-primary",
                "group-hover:text-primary-foreground",
                "group-hover:rotate-[-12deg]"
              )}
            >
              →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};


const ProductCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden rounded-2xl border p-0">
    
      <AspectRatio ratio={4 / 3}>
        <Skeleton className="size-full" />
      </AspectRatio>


      <CardContent className="min-h-[205px] space-y-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="size-7 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="flex items-center justify-between pt-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="size-10 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductListComponent };