"use client";

import { useMemo, useState } from "react";
import { Search, UtensilsCrossed } from "lucide-react";
import FoodCard from "./FoodCard";
import type { Food } from "@/lib/types";

type Category = "all" | "food" | "drink";
type SortKey = "popular" | "rating" | "price-asc" | "price-desc";

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "ទាំងអស់" },
  { value: "food", label: "ម្ហូប" },
  { value: "drink", label: "ភេសជ្ជៈ" },
];

export default function MenuGrid({ foods }: { foods: Food[] }) {
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const visible = useMemo(() => {
    let list = [...foods];

    if (category !== "all") list = list.filter((f) => f.category === category);

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => (b.average_rating ?? 0) - (a.average_rating ?? 0)); break;
      default:           list.sort((a, b) => b.popularity_score - a.popularity_score);
    }

    return list;
  }, [foods, category, search, sort]);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ស្វែងរកម្ហូប ឬគ្រឿងផ្សំ..."
            className="h-11 w-full rounded-full border border-neutral-200 bg-white pl-10 pr-4 text-sm placeholder:text-neutral-400 focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full bg-white p-1 shadow-sm">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition ${
                  category === c.value
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:text-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-11 rounded-full border border-neutral-200 bg-white px-5 text-xs font-medium focus:border-primary focus:outline-none"
          >
            <option value="popular">ពេញនិយមបំផុត</option>
            <option value="rating">វាយតម្លៃខ្ពស់បំផុត</option>
            <option value="price-asc">តម្លៃ៖ ទាប → ខ្ពស់</option>
            <option value="price-desc">តម្លៃ៖ ខ្ពស់ → ទាប</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
          <UtensilsCrossed className="mx-auto mb-3 text-neutral-300" size={36} />
          <p className="font-medium">រកមិនឃើញម្ហូបទេ</p>
          <p className="mt-1 text-sm text-neutral-500">
            សូមសាកល្បងពាក្យផ្សេង ឬការត្រងផ្សេងទៀត។
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-xs text-neutral-400">{visible.length} មុខ</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}