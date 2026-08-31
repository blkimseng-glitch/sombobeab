export default function MenuSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="h-48 animate-pulse bg-neutral-200" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-100" />
            <div className="h-16 w-full animate-pulse rounded-2xl bg-neutral-100" />
          </div>
        </div>
      ))}
    </div>
  );
}