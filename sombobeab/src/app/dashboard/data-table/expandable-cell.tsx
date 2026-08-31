"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

interface ExpandableCellProps {
  value: string;
  className?: string;
  monospace?: boolean;
  copyable?: boolean;
}

export function ExpandableCell({
  value,
  className,
  monospace,
  copyable,
}: ExpandableCellProps) {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleCopy = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`block max-w-full truncate text-left hover:underline underline-offset-2 decoration-dotted ${
          monospace ? "font-mono text-xs text-muted-foreground" : "text-sm"
        } ${className ?? ""}`}
        title="Click to view full text"
      >
        {value}
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1.5 w-max max-w-sm rounded-md border border-border bg-popover p-3 text-sm text-popover-foreground shadow-md"
          role="dialog"
        >
          <div className="flex items-start gap-2">
            <p
              className={`flex-1 whitespace-pre-wrap break-words ${
                monospace ? "font-mono text-xs" : ""
              }`}
            >
              {value}
            </p>
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Copy"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
