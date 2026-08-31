import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const collage = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNR1KNqUa5KRzMy9sGXd7jEktWkvmXsnvwUfnLXTc1w&s=10",
    alt: "Rice bowl with vegetables",
    className: "col-span-2 h-48 w-full rounded-3xl object-cover sm:h-60",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYw987PbBOM1NNebPEfadM4lbZZGP8tYohJieOo-mU1Q&s=10",
    alt: "Fresh pasta",
    className: "row-span-2 h-full w-full rounded-3xl object-cover",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73dv57mstQj8APUEO4jP7pkwvcaKcPVL9gSHJYeIloQ&s=10",
    alt: "Healthy salad",
    className: "h-36 w-full rounded-3xl object-cover sm:h-44",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkmq3JU3Cpp06qufB4-WLF9wWRgG83n5j-xHLRdRbQkQ&s=10",
    alt: "Gourmet burgers",
    className: "h-36 w-full rounded-3xl object-cover sm:h-44",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Collage */}
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            {collage.map((img) => (
              <Image
                key={img.alt}
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className={img.className}
              />
            ))}
          </div>
          <span
            aria-hidden
            className="absolute -top-6 right-6 rotate-12 text-4xl"
          >
            🌿
          </span>
        </div>

        {/* Copy */}
        <div>
          <p className="font-script text-3xl text-primary">អំពីយើង</p>
          <h2 className="mt-2 font-medium text-4xl font-bold​ text-primary">
            យើងគឺ សម្បូរបែប
          </h2>
          <p className="mt-1 font-serif text-lg italic text-neutral-500">
            រឿងរ៉ាវនៃរសជាតិឆ្ងាញ់
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-neutral-600">
            យើងជឿថា ម្ហូបមានសុខភាពល្អ មិនចាំបាច់អស់រសជាតិនោះទេ។ ចុងភៅរបស់យើង
            រៀបចំម្ហូបមុខៗដោយចិត្តស្រឡាញ់ ប្រើគ្រឿងផ្សំគុណភាពបំផុត
            ដើម្បីឱ្យបានតុល្យភាពរវាងរសជាតិ និងអាហារូបត្ថម្ភ។
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            
            <Link href="/foods" className="btn-primary">
              អានបន្ថែម <ArrowRight size={16} />
            </Link>

        
            <Link href="/about" className="btn-outline">
              រឿងរ៉ាវរបស់យើង
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
