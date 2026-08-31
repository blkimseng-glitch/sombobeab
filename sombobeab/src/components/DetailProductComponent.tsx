"use client";

import { CircleCheck, CircleX } from "lucide-react";

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

// ---- Matches the FoodItem shape returned by your API ----------------------
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

  // Build the details list from real fields instead of hardcoded placeholders.
  // Only fields that exist on this item are shown.
  const details: Array<{ label: string; value: string }> = [];
  if (product.cuisine) details.push({ label: "Cuisine", value: product.cuisine });
  if (product.category) details.push({ label: "Category", value: product.category });
  if (product.preparation_time_minutes != null)
    details.push({ label: "Prep time", value: `${product.preparation_time_minutes} min` });
  if (product.calories != null) details.push({ label: "Calories", value: `${product.calories} kcal` });
  if (product.protein != null) details.push({ label: "Protein", value: `${product.protein} g` });
  if (product.carbs != null) details.push({ label: "Carbs", value: `${product.carbs} g` });
  if (product.fat != null) details.push({ label: "Fat", value: `${product.fat} g` });

  return (
    <section className={cn("py-32")}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductImages image={product.image_url} />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {product.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {isAvailable ? (
                      <Badge variant="secondary">
                        <CircleCheck className="text-green-600" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <CircleX className="text-destructive" />
                        Sold out
                      </Badge>
                    )}
                    {product.is_trending && <Badge>Trending</Badge>}
                  </div>
                </div>
                <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              </div>

              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Button size="lg" className="w-full" disabled={!isAvailable}>
              {isAvailable ? "Order now" : "Sold out"}
            </Button>

            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Ingredients</h2>
                <p className="text-sm text-muted-foreground">
                  {product.ingredients.join(", ")}
                </p>
              </div>
            )}

            {details.length > 0 && <ProductInfo info={details} />}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductInfo = ({ info }: ProductInfoProps) => {
  if (!info) return null;
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Details</h2>
      <dl>
        {info.map((item, index) => (
          <div
            key={`product-detail-info-${index}`}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
            <dd className="text-sm font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const ProductImages = ({ image }: ProductImagesProps) => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <img
            src={image}
            alt="Product image"
            width={700}
            height={700}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </CarouselItem>
      </CarouselContent>
      <div className="md:hidden">
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </div>
    </Carousel>
  );
};

export { ProductDetail };