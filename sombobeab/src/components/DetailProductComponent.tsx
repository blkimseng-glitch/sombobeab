"use client";

import {
  CircleCheck,
  CircleX,
  Clock3,
  Flame,
  ShoppingBag,
} from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  cuisine?: string;
  category?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  ingredients?: string[];
  preparation_time_minutes?: number;
  is_trending?: boolean;
  available?: boolean;
}

interface ProductImagesProps {
  image: string;
  name: string;
}

interface ProductInfoProps {
  info?: Array<{
    label: string;
    value: string;
  }>;
}

interface ProductDetailProps {
  product: FoodItem;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const isAvailable = product.available !== false;

  const details: Array<{ label: string; value: string }> = [];

  if (product.cuisine) {
    details.push({
      label: "Cuisine",
      value: product.cuisine,
    });
  }

  if (product.category) {
    details.push({
      label: "Category",
      value: product.category,
    });
  }

  if (product.preparation_time_minutes != null) {
    details.push({
      label: "Preparation time",
      value: `${product.preparation_time_minutes} min`,
    });
  }

  if (product.calories != null) {
    details.push({
      label: "Calories",
      value: `${product.calories} kcal`,
    });
  }

  if (product.protein != null) {
    details.push({
      label: "Protein",
      value: `${product.protein} g`,
    });
  }

  if (product.carbs != null) {
    details.push({
      label: "Carbohydrates",
      value: `${product.carbs} g`,
    });
  }

  if (product.fat != null) {
    details.push({
      label: "Fat",
      value: `${product.fat} g`,
    });
  }

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 text-sm text-muted-foreground">
          Menu
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          <div className="space-y-8">
            <ProductImages
              image={product.image_url}
              name={product.name}
            />

            {(product.protein != null ||
              product.carbs != null ||
              product.fat != null) && (
              <div className="border-t pt-7">
                <div className="mb-4">
                  <h2 className="text-xl font-bold">
                    Nutrition
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Nutritional information per serving
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {product.protein != null && (
                    <NutritionItem
                      label="Protein"
                      value={`${product.protein}g`}
                    />
                  )}

                  {product.carbs != null && (
                    <NutritionItem
                      label="Carbs"
                      value={`${product.carbs}g`}
                    />
                  )}

                  {product.fat != null && (
                    <NutritionItem
                      label="Fat"
                      value={`${product.fat}g`}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8 lg:sticky lg:top-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                {isAvailable ? (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1.5"
                  >
                    <CircleCheck className="mr-1.5 size-4 text-green-600" />
                    Available
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1.5"
                  >
                    <CircleX className="mr-1.5 size-4 text-destructive" />
                    Sold out
                  </Badge>
                )}

                {product.is_trending && (
                  <Badge className="rounded-full px-3 py-1.5">
                    <Flame className="mr-1.5 size-4" />
                    Trending
                  </Badge>
                )}

                {product.category && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1.5"
                  >
                    {product.category}
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                {product.cuisine && (
                  <p className="mt-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {product.cuisine}
                  </p>
                )}
              </div>

              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                  ${product.price.toFixed(2)}
                </span>

                <span className="pb-1 text-sm text-muted-foreground">
                  per serving
                </span>
              </div>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {product.description}
              </p>
            </div>

            {(product.preparation_time_minutes != null ||
              product.calories != null) && (
              <div className="grid grid-cols-2 gap-3">
                {product.preparation_time_minutes != null && (
                  <div className="rounded-2xl border bg-card p-4">
                    <Clock3 className="mb-3 size-5 text-primary" />

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Preparation
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {product.preparation_time_minutes} min
                    </p>
                  </div>
                )}

                {product.calories != null && (
                  <div className="rounded-2xl border bg-card p-4">
                    <Flame className="mb-3 size-5 text-primary" />

                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Calories
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {product.calories} kcal
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
              <Button
                size="lg"
                className="h-12 w-full rounded-xl text-base font-semibold shadow-sm transition-all hover:scale-[1.01] hover:shadow-lg"
                disabled={!isAvailable}
              >
                <ShoppingBag className="mr-2 size-5" />

                {isAvailable
                  ? `Order now · $${product.price.toFixed(2)}`
                  : "Currently unavailable"}
              </Button>

              {isAvailable && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Freshly prepared and ready to order
                </p>
              )}
            </div>

            {product.ingredients &&
              product.ingredients.length > 0 && (
                <div className="border-t pt-7">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold">
                      Ingredients
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      What's inside this dish
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span
                        key={`${ingredient}-${index}`}
                        className="rounded-full border bg-muted/40 px-3 py-2 text-sm font-medium"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {details.length > 0 && (
              <div className="border-t pt-7">
                <ProductInfo info={details} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const NutritionItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl border bg-card p-4 text-center">
      <p className="text-lg font-bold">{value}</p>

      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

const ProductInfo = ({ info }: ProductInfoProps) => {
  if (!info || info.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          Details
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          More information about this item
        </p>
      </div>

      <dl className="overflow-hidden rounded-2xl border bg-card">
        {info.map((item, index) => (
          <div
            key={`product-detail-info-${index}`}
            className={cn(
              "flex items-center justify-between gap-6 px-4 py-4 sm:px-5",
              index !== info.length - 1 && "border-b"
            )}
          >
            <dt className="text-sm font-medium text-muted-foreground">
              {item.label}
            </dt>

            <dd className="text-right text-sm font-semibold">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const ProductImages = ({
  image,
  name,
}: ProductImagesProps) => {
  return (
    <div className="group relative">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="relative overflow-hidden rounded-3xl border bg-muted shadow-xl">
              <AspectRatio ratio={1}>
                <img
                  src={image}
                  alt={name}
                  width={900}
                  height={900}
                  className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </AspectRatio>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </CarouselItem>
        </CarouselContent>

        <div className="absolute inset-x-0 bottom-5 flex justify-between px-5">
          <CarouselPrevious
            className={cn(
              "static translate-y-0",
              "border-white/30 bg-black/40 text-white",
              "backdrop-blur-md hover:bg-black/60"
            )}
          />

          <CarouselNext
            className={cn(
              "static translate-y-0",
              "border-white/30 bg-black/40 text-white",
              "backdrop-blur-md hover:bg-black/60"
            )}
          />
        </div>
      </Carousel>

      <div className="pointer-events-none absolute -bottom-3 left-8 right-8 -z-10 h-10 rounded-full bg-black/10 blur-2xl" />
    </div>
  );
};

export { ProductDetail };