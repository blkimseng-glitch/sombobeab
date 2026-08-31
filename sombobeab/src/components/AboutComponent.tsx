import { Moul, Kantumruy_Pro } from "next/font/google";

// Display font for headings — has real weight and character for Khmer,
// unlike the default browser Khmer fallback.
const moul = Moul({
  subsets: ["khmer"],
  weight: "400",
  variable: "--font-display",
});

// Body font — clean, modern, and much more legible at small sizes
// than Noto Sans Khmer for paragraph text and UI labels.
const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default function About() {
  return (
    <div
      className={`${moul.variable} ${kantumruy.variable} min-h-screen bg-[#f6f4ea] text-[#232a1d] font-[family-name:var(--font-body)]`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl mb-6 leading-tight text-[#33472a] font-[family-name:var(--font-display)]">
              ព្រឹកព្រលឹមប្រកបដោយភាពស្ងប់ស្ងាត់ ជាមួយគ្រឿងផ្សំពិតៗពីធម្មជាតិ
            </h1>
            <p className="text-lg text-[#4b5240] mb-8 max-w-md">
              Jelu គឺជាអាហារដ្ឋានព្រឹកប្រចាំតំបន់ ដែលបង្កើតឡើងក្រោមគំនិតមួយ៖ «អាហារគួរតែមានរសជាតិដើម ស្រស់ៗចេញពីប្រភពដើម»។ គ្រប់មុខម្ហូបនៅលើចាន ត្រូវបានរៀបចំធ្វើឡើងយ៉ាងស្រស់ៗនៅព្រឹកនោះតែម្តង ចាប់តាំងពីនំប៉័ង sourdough រហូតដល់គ្រឿងផ្សំផ្សេងៗទៀត។
            </p>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-[#4d6a3a] hover:bg-[#33472a] text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              មើលម៉ឺនុយពេញលេញ
            </a>
          </div>
          <div>
            <img
              src="https://i.pinimg.com/736x/e5/34/41/e53441cce3e8875eeea59e03a35a5b06.jpg"
              alt="Avocado toast topped with tomatoes and microgreens"
              className="rounded-[50%_50%_45%_45%/55%_55%_45%_45%] w-full aspect-[10/9] object-cover"
            />
          </div>
        </div>

        {/* Feature strip */}
        <div className="mt-14 bg-[#e6ecd8] rounded-3xl px-8 py-6 flex flex-wrap justify-between gap-6">
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <div className="w-11 h-11 rounded-full bg-[#4d6a3a] text-white flex items-center justify-center text-lg flex-shrink-0">
              🌱
            </div>
            <div>
              <div className="text-xs text-[#5c6350]">ទិញស្រស់ៗជារៀងរាល់ថ្ងៃ</div>
              <div className="text-sm font-semibold">នាំចូលផ្ទាល់ពីកសិដ្ឋានក្នុងស្រុក</div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <div className="w-11 h-11 rounded-full bg-white text-[#4d6a3a] flex items-center justify-center text-lg flex-shrink-0">
              📍
            </div>
            <div>
              <div className="text-xs text-[#5c6350]">ទីតាំងរបស់យើង</div>
              <div className="text-sm font-semibold">បើកលក់ពីម៉ោង ៧:០០ ព្រឹក – ៣:០០ ល្ងាច</div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <div className="w-11 h-11 rounded-full bg-[#4d6a3a] text-white flex items-center justify-center text-lg flex-shrink-0">
              🍳
            </div>
            <div>
              <div className="text-xs text-[#5c6350]">ធ្វើស្រស់ៗភ្លាមៗតាមការកុម្ម៉ង់</div>
              <div className="text-sm font-semibold">មិនមានធ្វើទុកមុនឡើយ</div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl mb-14 text-[#33472a] font-[family-name:var(--font-display)]">
            តើអ្វីដែលធ្វើឲ្យអាហារមួយចានមានរសជាតិឆ្ងាញ់ឥតខ្ចោះ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center text-left mb-12">
            <div>
              <h3 className="text-2xl mb-4 font-[family-name:var(--font-display)]">
                អាហារសាមញ្ញ តែចម្អិនយ៉ាងផ្ចិតផ្ចង់
              </h3>
              <p className="text-[#4b5240] mb-6 max-w-md">
                យើងរក្សាម៉ឺនុយឲ្យមានទំហំល្មម ដើម្បីឲ្យអាហារគ្រប់មុខទទួលបានការយកចិត្តទុកដាក់ស្មើៗគ្នា៖ នំប៉័ងមានគុណភាព ពងទាស្រស់ៗ និងបន្លែផ្លែឈើដែលបេះថ្មីៗក្នុងរយៈពេលត្រឹមមួយថ្ងៃ មុនពេលដាក់ជូននៅលើចានរបស់អ្នក។ គ្មានការកាត់បន្ថយដំណាក់កាល គ្មានការប្រើប្រាស់គ្រឿងបន្ថែម។
              </p>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 border-2 border-[#33472a] text-[#33472a] hover:bg-[#33472a] hover:text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                មើលម៉ឺនុយពេញលេញ
              </a>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/1200x/db/c3/33/dbc333c97d488a06b68967257575ec0f.jpg"
                alt="Open-faced sandwich with egg and herbs on a wooden board"
                className="rounded-3xl w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-[#e6ecd8] rounded-3xl">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-lg mb-5">
                🥗
              </div>
              <h3 className="text-lg font-semibold mb-2">ដាំដុះនៅជិតៗនេះ</h3>
              <p className="text-sm text-[#4b5240] mb-5">
                បន្លែផ្លែឈើត្រូវដឹកបញ្ជូនផ្ទាល់ពីកសិដ្ឋានក្នុងកាំ ៦០ គីឡូម៉ែត្រ ហើយភាគច្រើនត្រូវបានបេះថ្មីៗក្នុងសប្តាហ៍នោះ មុនពេលយកមកចម្អិនជូនអ្នក។
              </p>
              <div className="pt-3 border-t border-[#c9d3b8] text-sm font-semibold text-[#33472a]">
                ស្គាល់ពីកសិដ្ឋានរបស់យើង
              </div>
            </div>
            <div className="p-6 bg-[#e6ecd8] rounded-3xl">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-lg mb-5">
                🔥
              </div>
              <h3 className="text-lg font-semibold mb-2">ចម្អិនស្រស់ៗ ឆាប់រហ័ស</h3>
              <p className="text-sm text-[#4b5240] mb-5">
                គ្រប់មុខម្ហូបត្រូវបានចាប់ផ្តើមចម្អិន បន្ទាប់ពីអ្នកអង្គុយនៅតុ — នោះជាមូលហេតុដែលអាហារពេលព្រឹកពេលខ្លះត្រូវចំណាយពេលបន្តិច។
              </p>
              <div className="pt-3 border-t border-[#c9d3b8] text-sm font-semibold text-[#33472a]">
                មើលទិដ្ឋភាពក្នុងផ្ទះបាយ
              </div>
            </div>
            <div className="p-6 bg-[#e6ecd8] rounded-3xl">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-lg mb-5">
                🍞
              </div>
              <h3 className="text-lg font-semibold mb-2">ដុតថ្មីៗរៀងរាល់ព្រឹក</h3>
              <p className="text-sm text-[#4b5240] mb-5">
                នំប៉័ង Sourdough របស់យើង ត្រូវបានចាប់ផ្តើមធ្វើចាប់ពីម៉ោង ៤ ព្រឹក និងផ្អាប់ទុកក្នុងហាងផ្ទាល់ជារៀងរាល់ថ្ងៃ។
              </p>
              <div className="pt-3 border-t border-[#c9d3b8] text-sm font-semibold text-[#33472a]">
                អានបន្ថែមអំពីនំប៉័ងរបស់យើង
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-[#33472a] text-white rounded-[50px] px-8 py-16 text-center">
          <h2 className="text-3xl mb-4 font-[family-name:var(--font-display)]">
            អញ្ជើញមកទទួលទានជាមួយយើងខ្ញុំ
          </h2>
          <p className="text-white/80 max-w-md mx-auto mb-10">
            ជារៀងរាល់ព្រឹក សម្រាប់តុអង្គុយគឺផ្តល់ជូនអ្នកដែលមកដល់មុន — ប៉ុន្តែសម្រាប់ថ្ងៃចុងសប្តាហ៍ តុតែងតែពេញលឿន ដូច្នេះការកក់ទុកមុនគឺជាជម្រើសដ៏ល្អបំផុត។
          </p>

          <div className="flex items-center justify-center gap-10 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                🍽️
              </div>
              <div className="text-left">
                <div className="text-xl font-bold">11–4</div>
                <div className="text-xs text-white/70">ម៉ោងបើកលក់ថ្ងៃធម្មតា</div>
              </div>
            </div>
            <a
              href="#book"
              className="inline-flex items-center gap-2 bg-[#c98a4b] hover:bg-[#b0733a] text-white font-medium px-6 py-3 rounded-full transition-colors"
            >
              កក់តុទុកមុន
            </a>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                ☕
              </div>
              <div className="text-left">
                <div className="text-xl font-bold">10–6</div>
                <div className="text-xs text-white/70">ម៉ោងបើកលក់ចុងសប្តាហ៍</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}