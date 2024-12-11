
import { RegisterForm } from "@/components/registerForm";

export const metadata = {
  title: "TicketingApp - Signup",
};

export default function Signup() {
  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-svh">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          Signup
        </h1>
        <p className="mb-2">Register your account</p>
        <RegisterForm
          className="flex items-center justify-center w-3/5 h-auto bg-blue-900/30 
        py-6 rounded-[8rem] mt-1"
        />
      </div>
    </section>
  );
}
