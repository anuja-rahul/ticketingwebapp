"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function TermsAndConditions() {
  return (
    <div className="items-top flex space-x-2 mt-6">
      <Checkbox id="terms1" required />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept our{" "}
          <Link
            href="/terms"
            target="_blank"
            className="text-primary text-sm font-medium duration-200 hover:text-muted-foreground underline"
          >
            terms and conditions
          </Link>
        </label>
        <p className="text-sm text-muted-foreground">
          By checking this you allow us to save essential cookes and data.
        </p>
      </div>
    </div>
  );
}
