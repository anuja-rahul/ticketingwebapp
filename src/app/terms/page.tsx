"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Terms() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-svh">
      <div className="flex flex-col justify-center items-center mt-12 w-4/5">
        <div className="space-y-1 flex flex-col justify-center items-center text-sm text-muted-foreground w-auto">
          <h2 className="text-4xl font-medium text-foreground leading-none mb-4">
            Terms and Conditions
          </h2>
          <p>It is what is is</p>
        </div>
        <div className="flex flex-row items-center justify-center h-auto mt-10 w-3/5">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Cookies</AccordionTrigger>
              <AccordionContent>
                Yes. we only save essential cookies to maintain user sessions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>User data collection</AccordionTrigger>
              <AccordionContent>
                Only through the signup/login forms
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Data protection</AccordionTrigger>
              <AccordionContent>
                All your data is encrypted or hashed before being stored by us.
                So you don&apos;t have to worry about your sensitive data being
                stolen.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
