"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  totalRows: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (index: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

function getPageNumbers(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);

  const pages = new Set<number>([
    0,
    total - 1,
    current,
    current - 1,
    current + 1,
  ]);
  const sorted = [...pages]
    .filter((p) => p >= 0 && p < total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) result.push("ellipsis");
    result.push(page);
  });
  return result;
}

export function TablePagination({
  pageIndex,
  pageCount,
  pageSize,
  totalRows,
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: TablePaginationProps) {
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-3">
      <span className="text-sm text-muted-foreground">
        Showing {start} to {end} of {totalRows} items
      </span>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers(pageIndex, pageCount).map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="px-1.5 text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={page === pageIndex ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 text-sm ${
                page === pageIndex ? "bg-violet-600 hover:bg-violet-700" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
