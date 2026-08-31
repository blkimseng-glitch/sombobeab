import type { Food } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://sombobaeb.cheat.casa";

interface GetFoodsOptions {
  category?: "food" | "drink";
  restaurantId?: string;
  search?: string;
  skip?: number;
  limit?: number;
}

export async function getFoods(
  options: GetFoodsOptions = {}
): Promise<Food[]> {
  // ✅ skip & limit តែងតែត្រូវផ្ញើ — API ត្រូវការវា
  const params = new URLSearchParams({
    skip: String(options.skip ?? 0),
    limit: String(options.limit ?? 100),
  });

  if (options.category) params.set("category", options.category);
  if (options.restaurantId) params.set("restaurant_id", options.restaurantId);
  if (options.search) params.set("search", options.search);

  // ✅ endpoint ពិតគឺ /food-items (មិនមែន /foods ទេ)
  const res = await fetch(`${API_URL}/food-items?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // អាន error detail ពី FastAPI ដើម្បីដឹងច្បាស់ថាខុសអ្វី
    const detail = await res.text().catch(() => "");
    console.error("API error:", res.status, detail.slice(0, 300));
    throw new Error(`API error ${res.status}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : (data.data ?? data.items ?? []);
}

export async function getFoodById(id: string): Promise<Food> {
  const res = await fetch(`${API_URL}/food-items/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}