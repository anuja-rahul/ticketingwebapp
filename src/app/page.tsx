export default function Home() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-center justify-center h-auto">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Home
        </h1>
        <p className="mb-2">Womp Womp</p>
        <div className="bg-red-400 h-screen">red div</div>
        <div className="bg-blue-400 h-screen">blue div</div>
      </div>
    </section>
  );
}
