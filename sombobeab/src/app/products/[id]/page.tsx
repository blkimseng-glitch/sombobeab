import { ProductDetail } from "@/components/DetailProductComponent";
import type { FoodItem } from "@/components/DetailProductComponent";

// Direct API Base URL
const API_BASE_URL = "https://sombobaeb.cheat.casa";

async function getProduct(id: string): Promise<FoodItem> {
  const response = await fetch(
    `${API_BASE_URL}/food-items/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export default async function ProductPage({
  params,
}: {
  // [id] is a single dynamic segment — always a plain string from the URL,
  // never a number or an array.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return null;
  }

  const product = await getProduct(id);

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}