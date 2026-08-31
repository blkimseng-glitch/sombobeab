"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
        
        {/* Big 404 */}
        <h1 className="text-7xl font-extrabold text-slate-100 mb-2">
          404
        </h1>

        {/* Text */}
        <h2 className="text-lg font-bold text-pink-400 mb-2">
          រកអីនឹងមេ
        </h2>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          ទំព័រនេះរកមិនឃើញទេ ប្រហែលមកពីវាយ link ខុស ឬទំព័រហ្នឹងត្រូវបានលុបចោលហើយ។
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            ត្រឡប់ក្រោយ
          </button>

          <Link
            href="/"
            className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            ទៅទំព័រដើម
          </Link>
        </div>

      </div>
    </div>
  );
}