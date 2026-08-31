import Image from "next/image";
import { Bike, Leaf, ShieldCheck, Star, Timer } from "lucide-react";

const features = [
  { icon: Bike, title: "ដឹកជញ្ជូនរហ័ស", text: "ដឹកជញ្ជូនទាន់ពេល ដល់មុខផ្ទះអ្នក" },
  { icon: Leaf, title: "ស្រស់ ១០០%", text: "គ្រឿងផ្សំស្រស់ និងមានសុខភាពល្អ" },
  { icon: ShieldCheck, title: "ស្អាត និងមានសុវត្ថិភាព", text: "ចម្អិនតាមអនាម័យ វេចខ្ចប់ដោយសុវត្ថិភាព" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-x relative grid items-center gap-16 pb-20 pt-10 lg:grid-cols-2 lg:pb-28">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-primary-dark">
            <Leaf size={14} /> សុខភាពល្អ • ស្រស់ • ឆ្ងាញ់
          </span>

          <h1 className="mt-5 font-serif text-5xl font-bold leading-[1.25] sm:text-6xl">
            ម្ហូបឆ្ងាញ់
            <span className="block text-primary">សម្រាប់សុខភាពល្អ</span>
          </h1>

          <p className="mt-6 max-w-md leading-relaxed text-neutral-600">
            ញ៉ាំម្ហូបមានសុខភាពល្អ រស់នៅឱ្យបានសុខ។ យើងនាំមកជូននូវម្ហូបឆ្ងាញ់ៗ
            ធ្វើពីគ្រឿងផ្សំស្រស់ៗ ដើម្បីឱ្យអ្នកមានសុខភាពល្អ រួសរាយរាល់ថ្ងៃ។
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#menu" className="btn-primary">បញ្ជាទិញឥឡូវនេះ</a>
            <a href="/foods" className="btn-outline">មើលម្ហូប</a>
          </div>

          <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div
            aria-hidden
            style={{ borderRadius: "58% 42% 45% 55% / 52% 56% 44% 48%" }}
            className="absolute -right-10 -top-8 h-[112%] w-[112%] bg-primary sm:-right-16 lg:-right-24"
          />
          <div aria-hidden className="absolute -left-4 bottom-8 grid grid-cols-5 gap-2.5 sm:-left-8">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary/40" />
            ))}
          </div>
          <div aria-hidden className="absolute inset-[12%] rounded-full border-2 border-dashed border-white/40" />

          <div className="relative z-10 mx-auto aspect-square w-[84%]">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvebIA2vOzCY98ig0bitKsp-nHTHM8flBwQyiV2ZtaDQ&s=10"
              alt="Amok"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
              className="rounded-full object-cover shadow-2xl shadow-primary-dark/40 ring-8 ring-white/20"
            />
          </div>

          {/* <div className="absolute -left-2 bottom-12 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:left-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Star size={20} className="text-amber-500" fill="currentColor" strokeWidth={0} />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">ការវាយតម្លៃ 4.9</p>
              <p className="mt-1 text-[11px] text-neutral-500">មតិពេញចិត្តជាង 2,500</p>
            </div>
          </div> */}

          {/* <div className="absolute -right-2 top-10 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:right-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">៣០ នាទី</p>
              <p className="mt-1 text-[11px] text-neutral-500">ដឹកជញ្ជូនរហ័ស</p>
            </div>
          </div> */}

          <span aria-hidden className="absolute -left-1 top-6 z-20 -rotate-12 text-4xl drop-shadow-lg">🍅</span>
          <span aria-hidden className="absolute bottom-24 right-0 z-20 rotate-12 text-4xl drop-shadow-lg">🌶️</span>
        </div>
      </div>
    </section>
  );
}