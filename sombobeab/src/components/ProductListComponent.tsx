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

// ---- Shape returned by your API (one item from your JSON) ----------------
interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_trending?: boolean;
  available?: boolean;
}

// ---- Shape the card actually renders --------------------------------------
interface Product {
  id: string;
  name: string;
  image: { src: string; alt: string };
  link: string;
  description: string;
  price: { regular: number; sale?: number; currency: string };
  badge?: { text: string; color?: string };
}

// ---- Adapts your API's food shape into what the card expects --------------
function mapFoodToProduct(food: FoodItem): Product {
  return {
    id: food.id,
    name: food.name,
    image: { src: food.image_url, alt: food.name },
    link: `/products/${food.id}`,
    description: food.description,
    price: { regular: food.price, currency: "USD" },
    badge: food.is_trending ? { text: "Trending" } : undefined,
  };
}

// Base URL comes from .env.local — NEXT_PUBLIC_ prefix is required for
// any env variable read inside a "use client" component.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductList1Props {
  className?: string;
  /** Your API endpoint that returns the food/product JSON array. Defaults to NEXT_PUBLIC_API_URL from .env.local. */
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

    // Guards against setting state after the component has unmounted,
    // or after a newer request (e.g. apiUrl changed) has already resolved.
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch products");
        const json: FoodItem[] = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  return (
    <section className={cn("py-16 sm:py-24 lg:py-32", className)}>
      {/* mx-auto centers the whole block; text-center centers status messages */}
      <div className="container mx-auto flex flex-col items-center">
        {error && (
          <p className="mb-8 text-center text-destructive animate-in fade-in duration-300">
            Couldn't load products. Please try again.
          </p>
        )}

        <div className="grid w-full place-items-center gap-5 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`skeleton-${i}`} />
            ))}

          {data
            ?.filter((item) => item.available !== false)
            .map((item, i) => (
              <ProductCard key={item.id} index={i} {...mapFoodToProduct(item)} />
            ))}
        </div>

        {!isLoading && !error && data?.length === 0 && (
          <p className="text-center text-muted-foreground animate-in fade-in duration-300">
            No products found.
          </p>
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
      className="group block h-full w-full max-w-md animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Card className="h-full overflow-hidden p-0 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg">
        <CardHeader className="relative block overflow-hidden p-0">
          <AspectRatio ratio={1} className="overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              className="block size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </AspectRatio>
          {badge && (
            <Badge
              style={{ backgroundColor: badge.color }}
              className="absolute start-4 top-4 transition-transform duration-300 group-hover:scale-105"
            >
              {badge.text}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-3 p-4 pb-6 sm:gap-4 sm:p-6 sm:pb-6">
          <CardTitle className="text-lg font-semibold sm:text-xl">{name}</CardTitle>
          <CardDescription className="line-clamp-2 font-medium text-muted-foreground">
            {description}
          </CardDescription>
          <div className="mt-auto">
            <Price
              onSale={sale != null}
              className="text-base font-semibold sm:text-lg"
            >
              {sale != null && (
                <PriceValue price={sale} currency={currency} variant="sale" />
              )}
              <PriceValue price={regular} currency={currency} variant="regular" />
            </Price>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const ProductCardSkeleton = () => (
  <Card className="h-full w-full max-w-md overflow-hidden p-0 animate-in fade-in duration-300">
    <AspectRatio ratio={1}>
      <Skeleton className="size-full" />
    </AspectRatio>
    <CardContent className="flex flex-col gap-3 p-4 pb-6 sm:gap-4 sm:p-6 sm:pb-6">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/3" />
    </CardContent>
  </Card>
);

export { ProductListComponent };