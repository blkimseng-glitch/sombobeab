"use client";

import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";

import { type DataTableFeatures } from "./data-table-features";
import { ArrowUpDown, MoreHorizontal, ImageOff } from "lucide-react";

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

const columnHelper = createColumnHelper<DataTableFeatures, Products>();

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columns = columnHelper.columns([
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("id", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px]">
        <ExpandableCell
          value={String(row.original.id)}
          monospace
          copyable
          className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-violet-700"
        />
      </div>
    ),
  }),
  columnHelper.accessor("image_url", {
    header: "រូបភាព",
    enableSorting: false,
    cell: ({ row }) => {
      const url = Array.isArray(row.original.image_url)
        ? row.original.image_url[0]
        : row.original.image_url;

      return url ? (
        <div className="h-14 w-14 overflow-hidden rounded-lg border border-border bg-muted">
          <img
            src={url}
            alt={row.original.name ?? "product"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 text-muted-foreground">
          <ImageOff className="h-5 w-5" />
        </div>
      );
    },
  }),

  columnHelper.accessor("name", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ឈ្មោះ
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.name}</span>
    ),
  }),

  columnHelper.accessor("price", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        តម្លៃ
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="tabular-nums text-foreground">
        {currency.format(row.original.price)}
      </span>
    ),
  }),

  columnHelper.accessor("category", {
    header: "ប្រភេទ",
    filterFn: "arrIncludesCategory",
    cell: ({ row }) => (
      <span
        className={`inline-flex max-w-[220px] items-center truncate rounded-md border px-2.5 py-1 text-xs font-medium ${getCategoryStyle(
          row.original.category,
        )}`}
      >
        {row.original.category}
      </span>
    ),
  }),

  columnHelper.accessor("description", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-3 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ការពិពណ៌នា
        <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="max-w-[260px]">
        <ExpandableCell value={row.original.description} />
      </div>
    ),
  }),

  // columnHelper.display({
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const products = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger
  //           render={
  //             <Button
  //               variant="ghost"
  //               className="h-8 w-8 p-0 data-[popup-open]:bg-muted"
  //             />
  //           }
  //         >
  //           <span className="sr-only">Open menu</span>
  //           <MoreHorizontal className="h-4 w-4" />
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               navigator.clipboard.writeText(products?.id as string)
  //             }
  //           >
  //             Copy product ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View product</DropdownMenuItem>
  //           <DropdownMenuItem>Edit product</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // }),
]);
