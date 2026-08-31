import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import type { Food } from "@/lib/types";

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function FoodCard({ food }: { food: Food }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={food.image_url}
          alt={food.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition duration-500 group-hover:scale-105 ${
            !food.available ? "grayscale" : ""
          }`}
        />

        {food.is_trending && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow">
            <Flame size={12} /> ពេញនិយម
          </span>
        )}

        {food.average_rating !== null && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow">
            <Star size={12} className="text-amber-400" fill="currentColor" strokeWidth={0} />
            {food.average_rating.toFixed(1)}
          </span>
        )}

        {!food.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-800">
              អស់ស្តុកហើយ
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold leading-snug">{food.name}</h3>
          <span className="shrink-0 font-serif text-lg font-bold text-primary">
            {formatPrice(food.price)}
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {food.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {food.cuisine && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-primary-dark">
              {food.cuisine}
            </span>
          )}
          {food.meal_types.map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-primary-dark"
            >
              {t}
            </span>
          ))}
        </div>

        {/* អាហារូបត្ថម្ភ */}
        <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-cream p-3 text-center">
          <div>
            <p className="text-sm font-bold">{food.calories}</p>
            <p className="text-[10px] text-neutral-500">កាឡូរី</p>
          </div>
          <div>
            <p className="text-sm font-bold">{food.protein}g</p>
            <p className="text-[10px] text-neutral-500">ប្រូតេអ៊ីន</p>
          </div>
          <div>
            <p className="text-sm font-bold">{food.carbs}g</p>
            <p className="text-[10px] text-neutral-500">កាបូអ៊ីដ្រាត</p>
          </div>
          <div>
            <p className="text-sm font-bold">{food.fat}g</p>
            <p className="text-[10px] text-neutral-500">ជាតិខ្លាញ់</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
            <Clock size={14} /> {food.preparation_time_minutes} នាទី
          </span>
          <button
            disabled={!food.available}
            className="rounded-full bg-primary px-5 py-2 text-xs font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
          >
            បញ្ជាទិញ
          </button>
        </div>
      </div>
    </article>
  );
}