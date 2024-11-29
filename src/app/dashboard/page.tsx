import TicketCapacityChart from "@/components/Charts/ticketcapacityChart";

export default function Dashboard() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-center justify-center h-auto">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Dashboard
        </h1>
        <p className="mb-4 mx-6 text-center text-balance">
          checkout all the realtime statistics of user, platform and sales in
          one place
        </p>
        <TicketCapacityChart />
      </div>
    </section>
  );
}
