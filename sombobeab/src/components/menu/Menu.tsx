import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { getFoods } from "@/lib/api";
import type { Food } from "@/lib/types";
import FoodCard from "./FoodCard";

export default async function Menu() {
  let popular: Food[] = [];
  let error: string | null = null;

  try {
    const all = await getFoods({ limit: 100 });
    popular = [...all]
      .sort(
        (a, b) =>
          Number(b.is_trending) - Number(a.is_trending) ||
          b.popularity_score - a.popularity_score
      )
      .slice(0, 6);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load menu";
  }

  return (
    <section id="menu" className="py-20">
      <div className="container-x">
        <SectionHeading
          script=""
          title={
            <>
              <span className="text-primary">មុខម្ហូបល្បីៗ </span> 
            </>
          }
        />

        {error ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-3xl bg-white p-10 text-center shadow-sm">
            <AlertCircle size={32} className="text-red-500" />
            <p className="font-medium">មិនអាចផ្ទុកមឺនុយបានទេ</p>
            <p className="text-sm text-neutral-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {popular.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/foods" className="btn-primary">
                មើលម្ហូបទាំងអស់ <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}