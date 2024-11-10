"use client";

import { z } from "zod";
import React, { useEffect } from "react";
// import { HttpErrorResponse } from "../app/models/http/HttpErrorResponse";
import { createHttpClient } from "@/app/lib/httpClient";
// import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
// import Success from "./success";
// import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
// import ErrorFeedback from "./error";
import { Button } from "./ui/button";
import LoginCard from "./loginCard";
import { useToast } from "@/hooks/use-toast";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const registerSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["vendor", "customer", "admin"]),
});

type Schema = z.infer<typeof registerSchema>;

export function RegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  // const [errors, setErrors] = React.useState<HttpErrorResponse | undefined>(
  //   undefined
  // );
  const { toast } = useToast();

  async function onSubmit(data: Schema) {
    // setErrors(undefined);
    setSuccess(false);
    setIsLoading(true);
    createHttpClient()
      .post("/auth/register", data)
      .then((response) => {
        // testing for package return
        console.log(response.data);
        toast({
          title:
            "Account cretaed successfully : " +
            new Date().toLocaleTimeString(),
          description:
            "Your details were verified and account created successfully",
        });
        setSuccess(true);
      })
      .catch((error) => {
        toast({
          title:
            "Error occured, please try again : " +
            new Date().toLocaleTimeString(),
          description:
            error.message,
        });
        // if (error.response && error.response.data) {
        //   const errordata = error.response.data as HttpErrorResponse;
        //   setErrors(errordata);
        // } else {
        //   setErrors({
        //     message: error.message,
        //     status: error.response?.status || 500,
        //     errors: new Map(),
        //     generalErrors: ["An unexpected error occurred"],
        //   });
        //   console.log(error);
        // }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }, [success]);
  

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(registerSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <div className={clsx("gap-6 flex flex-col", className)} {...props}>
      {/* <Success
        show={success}
        message="Account created successfully"
        description="Your details were verified and account created successfully"
        action={
          <Link href="/auth/login" className="underline">
            login
          </Link>
        }
      /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-2 w-screen flex flex-col items-center justify-center">
          <div className="gap-2 w-2/5">
            <div className="flex flex-col items-center justify-center gap-y-2 mt-2 w-full">
              <Label htmlFor="email" className="mt-2 w-full">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoCorrect="off"
                autoComplete="email"
                className=""
                disabled={isLoading}
                {...register("email")}
              />
              {formState.errors.email && (
                <small className="text-red-600">
                  {formState.errors.email.message}
                </small>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-y-2 mt-4 w-full">
              <Label
                htmlFor="name"
                className="mt-2 w-full items-center flex justify-start"
              >
                Username
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="username"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register("name")}
              />
              {formState.errors.name && (
                <small className="text-red-600">
                  {formState.errors.name.message}
                </small>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-y-2 mt-4 w-full">
              <Label htmlFor="password" className="mt-2 w-full">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                autoCapitalize="off"
                autoCorrect="off"
                disabled={isLoading}
                {...register("password")}
              />
              {formState.errors.password && (
                <small className="text-red-600">
                  {formState.errors.password.message}
                </small>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-y-2 mt-4 w-full">
              <Label htmlFor="role" className="mt-2 w-full">
                Role
              </Label>
              <select
                id="role"
                autoCapitalize="off"
                autoCorrect="off"
                disabled={isLoading}
                {...register("role")}
                className="block w-full mt-1 bg-background border border-secondary rounded-lg shadow-sm focus:border-primary duration-200 p-2"
              >
                <option>Select role</option>
                <option value="vendor">Vendor</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              {formState.errors.role && (
                <small className="text-red-600">
                  {formState.errors.role.message}
                </small>
              )}
            </div>
          </div>
          {/* <ErrorFeedback
            data={errors}
            className="w-2/5 rounded-full flex flex-col justify-center items-center"
          /> */}
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-4 hover:bg-blue-900/60 duration-300"
          >
            {isLoading && "creating your account..."}
            Register
          </Button>
        </div>
      </form>
      <LoginCard />
    </div>
  );
}
