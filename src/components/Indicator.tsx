import clsx from "clsx";

interface IndicatorProps {
  className?: string;
}

export default function Indicator({ className }: IndicatorProps) {
  return (
    <div
      className={clsx(className, "rounded-full w-2 h-2 border-muted-foreground text-foreground/80")}
    ></div>
  );
}
