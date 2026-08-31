"use client";

import {
  ColumnFiltersState,
  SortingState,
  useTable,
  type ColumnVisibilityState,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import { Search, LayoutGrid, Filter, ChevronDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@base-ui/react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PackageOpen } from "lucide-react";
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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
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
      if (row?.category?.name) names.add(row.category.name);
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
    <div className="space-y-6">
      {/* Page header */}
      <FoodMenuHeader itemCount={totalCount} onAddNew={onAddNew} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by title..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-10 w-full rounded-lg border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" className="gap-2" />}
            >
              <LayoutGrid className="h-4 w-4" />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
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

          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" className="gap-2" />}
            >
              <Filter className="h-4 w-4" />
              Filter
              {activeCategoryFilter.length > 0 && (
                <span className="rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {activeCategoryFilter.length}
                </span>
              )}
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {allCategoryNames.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  No categories
                </div>
              ) : (
                allCategoryNames.map((name) => (
                  <DropdownMenuCheckboxItem
                    key={name}
                    checked={activeCategoryFilter.includes(name)}
                    onCheckedChange={() => toggleCategory(name)}
                  >
                    <span
                      className={`mr-2 rounded px-1.5 py-0.5 text-xs ${getCategoryStyle(
                        name,
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

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="max-h-[70vh] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-11 bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-muted/40 data-[state=true]:bg-muted/60"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2.5">
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <PackageOpen className="h-8 w-8" />
                      <p className="text-sm">No products match your filter.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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
  );
}
