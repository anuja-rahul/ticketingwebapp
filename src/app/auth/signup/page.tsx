import { RegisterForm } from "@/components/registerForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


export default function Signup() {
  return (
    <section className="mt-10 flex flex-col justify-start items-start">
      <Breadcrumb className="pl-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/auth">auth</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
        <BreadcrumbLink href="/Signup">signup</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">Register</h1>
      <p className="mb-2">Register your account</p>
        <RegisterForm className="flex items-center justify-center w-3/5 h-auto bg-blue-900/30 
        py-6 rounded-[8rem] mt-1" />
      </div>
    </section>
  );
}
