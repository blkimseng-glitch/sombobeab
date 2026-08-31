"use client";

import React from "react";
import {
  ColumnFiltersState,
  SortingState,
  useTable,
  type ColumnVisibilityState,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import { Search, LayoutGrid, Filter, ChevronDown, PackageOpen } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@base-ui/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { features, type DataTableFeatures } from "./data-table-features";
import { getCategoryStyle } from "@/lib/category-style";
import { FoodMenuHeader } from "./food-menu-header";
import { TablePagination } from "./table-pagination";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  onAddNew?: () => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  onAddNew,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const categoryColumn = table.getColumn("category");

  const allCategoryNames = React.useMemo(() => {
    const names = new Set<string>();
    data.forEach((row: any) => {
      if (typeof row?.category === "string") {
        names.add(row.category);
      } else if (row?.category?.name) {
        names.add(row.category.name);
      }
    });
    return [...names].sort();
  }, [data]);

  const activeCategoryFilter =
    (categoryColumn?.getFilterValue() as string[]) ?? [];

  const toggleCategory = (name: string) => {
    const next = activeCategoryFilter.includes(name)
      ? activeCategoryFilter.filter((c) => c !== name)
      : [...activeCategoryFilter, name];
    categoryColumn?.setFilterValue(next.length ? next : undefined);
  };

  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-5 bg-slate-50/50 p-6 rounded-3xl border border-slate-200/60 shadow-xs">
      {/* Page Header */}
      <FoodMenuHeader itemCount={totalCount} onAddNew={onAddNew} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="ស្វែងរកតាមឈ្មោះ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium text-slate-800 transition-all outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
          />
        </div>

        {/* Action Dropdowns */}
        <div className="ml-auto flex items-center gap-2">
          {/* Columns Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50">
              <LayoutGrid className="h-4 w-4 text-slate-500" />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-50 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer rounded-lg py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50">
              <Filter className="h-4 w-4 text-slate-500" />
              តម្រង (Filter)
              {activeCategoryFilter.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                  {activeCategoryFilter.length}
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-50 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
            >
              {allCategoryNames.length === 0 ? (
                <div className="px-2 py-3 text-center text-xs text-slate-400">
                  មិនមានប្រភេទទេ
                </div>
              ) : (
                allCategoryNames.map((name) => (
                  <DropdownMenuCheckboxItem
                    key={name}
                    className="cursor-pointer rounded-lg py-1.5"
                    checked={activeCategoryFilter.includes(name)}
                    onCheckedChange={() => toggleCategory(name)}
                  >
                    <span
                      className={`mr-2 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getCategoryStyle(
                        name
                      )}`}
                    >
                      {name}
                    </span>
                  </DropdownMenuCheckboxItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Table Wrapper */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="max-h-[68vh] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-slate-100/80 backdrop-blur-md border-b border-slate-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-11 px-4 text-left align-middle font-bold text-slate-700"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="divide-y divide-slate-100">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-slate-50 data-[state=true]:bg-violet-50/70"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3.5 align-middle">
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-56 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <PackageOpen className="h-10 w-10 opacity-40" />
                      <p className="text-sm font-medium text-slate-500">
                        មិនមានទិន្នន័យស្របតាមការស្វែងរកឡើយ។
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table Pagination */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-2.5">
          <TablePagination
            pageIndex={table.state.pagination?.pageIndex ?? 0}
            pageCount={table.getPageCount()}
            pageSize={table.state.pagination?.pageSize ?? 6}
            totalRows={totalCount}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            onPageChange={(index: number) => table.setPageIndex(index)}
            onPreviousPage={() => table.previousPage()}
            onNextPage={() => table.nextPage()}
          />
        </div>
      </div>
    </div>
  );
}