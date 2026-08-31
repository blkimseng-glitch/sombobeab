"use client";

import Image from "next/image";
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
  /* ------------------------------ Checkbox Select ------------------------------ */
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

  /* --------------------------------- ID Column --------------------------------- */
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[140px]">
        <ExpandableCell
          value={String(row.original.id)}
          monospace
          copyable
          className="rounded-md border border-violet-200 bg-violet-50/80 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-900/50 dark:bg-violet-950/40 dark:text-violet-300"
        />
      </div>
    ),
  }),

  /* ------------------------------- Image Column ------------------------------- */
  columnHelper.accessor("image_url", {
    header: "រូបភាព",
    enableSorting: false,
    cell: ({ row }) => {
      const url = Array.isArray(row.original.image_url)
        ? row.original.image_url[0]
        : row.original.image_url;

      return url ? (
        <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border/60 bg-muted shadow-sm transition-transform hover:scale-105">
          <img
            src={url}
            alt={row.original.name ?? "product"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground/60">
          <ImageOff className="h-4 w-4" />
        </div>
      );
    },
  }),

  /* -------------------------------- Name Column -------------------------------- */
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ឈ្មោះ
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="py-1 font-medium text-foreground leading-relaxed">
        {row.original.name}
      </div>
    ),
  }),

  /* ------------------------------- Price Column ------------------------------- */
  columnHelper.accessor("price", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        តម្លៃ
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
        {currency.format(row.original.price)}
      </span>
    ),
  }),

  /* ----------------------------- Category Column ----------------------------- */
  columnHelper.accessor("category", {
    header: "ប្រភេទ",
    filterFn: "arrIncludesCategory",
    cell: ({ row }) => (
      <span
        className={cn(
          "inline-flex max-w-[200px] items-center truncate rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-xs",
          getCategoryStyle(row.original.category)
        )}
      >
        {row.original.category}
      </span>
    ),
  }),

  /* ---------------------------- Description Column ---------------------------- */
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ការពិពណ៌នា
        <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-70" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[280px] py-1.5 leading-relaxed text-sm text-muted-foreground">
        <ExpandableCell value={row.original.description} />
      </div>
    ),
  }),

  /* ------------------------------ Actions Column ------------------------------ */
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-accent focus-visible:ring-1"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 z-50">
            <DropdownMenuLabel>សកម្មភាព (Actions)</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(product?.id))
              }
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              ចម្លង ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              មើលលម្អិត
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              កែប្រែ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);