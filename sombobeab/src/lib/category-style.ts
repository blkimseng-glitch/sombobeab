const CATEGORY_STYLES = [
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-sky-50 text-sky-700 border-sky-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-pink-50 text-pink-700 border-pink-200",
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-teal-50 text-teal-700 border-teal-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-cyan-50 text-cyan-700 border-cyan-200",
];

export function getCategoryStyle(name: string | undefined | null) {
  if (!name) {
    return "bg-slate-100 text-slate-600 border-slate-200";
  }

  const strName = String(name);
  let hash = 0;

  for (let i = 0; i < strName.length; i++) {
    hash = (hash * 31 + strName.charCodeAt(i)) >>> 0;
  }

  return CATEGORY_STYLES[hash % CATEGORY_STYLES.length];
}