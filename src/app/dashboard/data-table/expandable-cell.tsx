"use client";

import React, { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ExpandableCellProps {
  value: string;
  monospace?: boolean;
  copyable?: boolean;
  className?: string;
}

export function ExpandableCell({
  value,
  monospace = false,
  copyable = false,
  className = "",
}: ExpandableCellProps) {
  const [copied, setCopied] = useState(false);

  if (!value) {
    return <span className="text-slate-400 italic text-xs">គ្មានការពិពណ៌នា</span>;
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      {/* ផ្នែក Trigger: បង្ហាញក្នុង Table Cell (Truncate 2 បន្ទាត់) */}
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`group flex items-center justify-between text-left w-full rounded-lg p-1.5 transition-all hover:bg-slate-100/80 active:scale-[0.98] focus:outline-none ${className}`}
        >
          <span
            className={`line-clamp-2 text-xs leading-relaxed text-slate-600 group-hover:text-slate-900 transition-colors ${
              monospace ? "font-mono" : ""
            }`}
          >
            {value}
          </span>
        </button>
      </PopoverTrigger>

      {/* ផ្នែក Popover Card: បង្ហាញពេលប៉ះ/ចុចលើវា */}
      <PopoverContent
        align="start"
        sideOffset={6}
        className="z-50 w-80 rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-md animate-in fade-in-0 zoom-in-95"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              ការពិពណ៌នាពេញ
            </span>
          </div>

          {/* Button Copy ក្នុង Card */}
          {copyable && (
            <button
              onClick={handleCopy}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-600">ចម្លងរួច</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-slate-400" />
                  <span>ចម្លង</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Card Body: បង្ហាញអត្ថបទពេញ */}
        <div className="max-h-56 overflow-y-auto pr-1">
          <p
            className={`text-xs leading-relaxed text-slate-700 whitespace-pre-wrap break-words ${
              monospace ? "font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100" : ""
            }`}
          >
            {value}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}