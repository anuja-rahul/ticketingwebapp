"use client";


export default function NotFound() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          404 Not Found
        </h1>
        <p className="mb-2">Womp Womp</p>
      </div>
    </section>
  );
}
