import { LoginForm } from "@/components/loginForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Login() {
  return (
    <section className="pt-10 flex flex-col justify-center items-center w-full">
      <div className="flex flex-col items-start justify-start w-full">
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
              <BreadcrumbLink href="/auth/login">login</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Login
        </h1>
        <p className="mb-2">Login to your account</p>
        <LoginForm
          className="flex items-center justify-center w-3/5 h-auto bg-blue-900/30 
        py-6 rounded-[8rem] mt-1"
        />
      </div>
    </section>
  );
}
