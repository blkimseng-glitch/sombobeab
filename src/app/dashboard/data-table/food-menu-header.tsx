"use client";

import { UtensilsCrossed, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoodMenuHeaderProps {
  itemCount: number;
  onAddNew?: () => void;
}

export function FoodMenuHeader({ itemCount, onAddNew }: FoodMenuHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <UtensilsCrossed className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Food Menu</h1>
          <p className="text-sm text-muted-foreground">
            Manage your food items, prices and categories
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          {itemCount} items
        </span>
        <Button
          onClick={onAddNew}
          className="gap-2 bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" />
          Add New Item
        </Button>
      </div>
    </div>
  );
}
