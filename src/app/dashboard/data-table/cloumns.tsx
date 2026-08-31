"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, ImageOff, Eye, Edit, Copy } from "lucide-react";

import { type DataTableFeatures } from "./data-table-features";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Products } from "@/lib/data-table";
import { ExpandableCell } from "./expandable-cell";
import { getCategoryStyle } from "@/lib/category-style";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<DataTableFeatures, Products>();

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columns = columnHelper.columns([
  /* ---------------- Checkbox ---------------- */
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  /* ---------------- ID Column ---------------- */
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 text-xs font-bold uppercase tracking-wider text-slate-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[130px]">
        <ExpandableCell
          value={String(row.original.id)}
          monospace
          copyable
          className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-[11px] font-mono font-semibold text-slate-700"
        />
      </div>
    ),
  }),

  /* ---------------- Image Column ---------------- */
  columnHelper.accessor("image_url", {
    header: () => <span className="text-xs font-bold uppercase tracking-wider text-slate-700">រូបភាព</span>,
    enableSorting: false,
    cell: ({ row }) => {
      const url = Array.isArray(row.original.image_url)
        ? row.original.image_url[0]
        : row.original.image_url;

      return url ? (
        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xs transition-transform duration-200 hover:scale-105">
          <img
            src={url}
            alt={row.original.name ?? "product"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-slate-400">
          <ImageOff className="h-4 w-4" />
        </div>
      );
    },
  }),

  /* ---------------- Name Column ---------------- */
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 text-xs font-bold uppercase tracking-wider text-slate-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ឈ្មោះ
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="py-1 text-sm font-semibold text-slate-900 leading-relaxed">
        {row.original.name}
      </div>
    ),
  }),

  /* ---------------- Price Column ---------------- */
  columnHelper.accessor("price", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 text-xs font-bold uppercase tracking-wider text-slate-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        តម្លៃ
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-bold text-emerald-600">
        {currency.format(row.original.price)}
      </span>
    ),
  }),

  /* ---------------- Category Column ---------------- */
  columnHelper.accessor("category", {
    header: () => <span className="text-xs font-bold uppercase tracking-wider text-slate-700">ប្រភេទ</span>,
    filterFn: "arrIncludesCategory",
    cell: ({ row }) => (
      <span
        className={cn(
          "inline-flex max-w-[200px] items-center truncate rounded-full border px-3 py-1 text-xs font-semibold shadow-2xs",
          getCategoryStyle(row.original.category)
        )}
      >
        {row.original.category}
      </span>
    ),
  }),

  /* ---------------- Description Column ---------------- */
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 text-xs font-bold uppercase tracking-wider text-slate-700"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ការពិពណ៌នា
        <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[280px] py-1 text-xs leading-relaxed text-slate-600 line-clamp-2">
        <ExpandableCell value={row.original.description} />
      </div>
    ),
  }),

  /* ---------------- Actions Column ---------------- */
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
          >
            <DropdownMenuLabel className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              សកម្មភាព
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(product?.id))
              }
              className="cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              <Copy className="mr-2 h-3.5 w-3.5 text-slate-400" />
              ចម្លង ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 bg-slate-100" />
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
              <Eye className="mr-2 h-3.5 w-3.5 text-slate-400" />
              មើលលម្អិត
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
              <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
              កែប្រែ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);