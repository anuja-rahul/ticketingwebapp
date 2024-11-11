export default function MyKBD() {
  return (
    <span className="pointer-events-none inline-flex h-9 select-none items-center gap-1 rounded px-1.5 font-mono text-xs font-medium text-foreground/80 opacity-100">
      Sidebar
      <kbd className="inline-flex items-center justify-center pointer-events-none h-6 w-6 select-none gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>
      </kbd>
      <kbd className="pointer-events-none justify-center inline-flex h-6 w-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
        <span className="text-xs">M</span>
      </kbd>
    </span>
  );
}
