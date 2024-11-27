import TicketCapacityChart from "@/components/Charts/ticketcapacityChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full h-auto">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center h-auto">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Dashboard
        </h1>
        <p className="mb-4 mx-6 text-center text-balance">checkout all the realtime statistics of user, platform and sales in one place</p>
        <TicketCapacityChart />
      </div>
    </section>
  );
}
