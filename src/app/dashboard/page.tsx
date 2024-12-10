import PlatformHistoryGraph from "@/components/Charts/PlatformHistoryGraph";
import TaskCapacityGraph from "@/components/Charts/taskCapacityGraph";
import ThreadCapacityGraph from "@/components/Charts/threadCapacityGraph";
import TicketCapacityChart from "@/components/Charts/ticketcapacityChart";

export default function Dashboard() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-center justify-center h-auto gap-2 w-[90%]">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Dashboard
        </h1>
        <p className="mb-4 mx-6 text-center text-balance">
          checkout all the realtime statistics of user, platform and sales in
          one place
        </p>
        <PlatformHistoryGraph />
        <div className="flex flex-row w-full gap-4">
          <ThreadCapacityGraph />
          <TaskCapacityGraph />
        </div>
        <TicketCapacityChart />
      </div>
    </section>
  );
}
