"use client";

import { z } from "zod";
import React, { useEffect } from "react";
import { createHttpClient } from "@/app/lib/httpClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LoginRegisterCard from "./loginRegisterCard";
import { useToast } from "@/hooks/use-toast";
import { TermsAndConditions } from "./termsAndConditions";
import { sendCookieData } from "@/app/lib/BasicCrud";

// import { toast } from "sonner";
// import { HttpErrorResponse } from "../app/models/http/HttpErrorResponse";
// import Success from "./success";
// import Link from "next/link";
// import ErrorFeedback from "./error";

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
  const { toast } = useToast();

  // const [errors, setErrors] = React.useState<HttpErrorResponse | undefined>(
  //   undefined
  // );

  async function onSubmit(data: Schema) {
    // setErrors(undefined);
    setSuccess(false);
    setIsLoading(true);
    createHttpClient()
      .post("/auth/register", data)
      .then(async (response) => {
        const userData = response.data;
        const result = await sendCookieData(userData);
        console.log(response.data);
        toast({
          title:
            "Account cretaed successfully : " + new Date().toLocaleTimeString(),
          description:
            "Your account was created successfully, redirecting to home...",
        });
        if (result) {
          toast({
            title: "cookies saved : " + new Date().toLocaleTimeString(),
            description: "cookies have been saved successfully...",
          });
          setSuccess(true);
        } else {
          toast({
            variant: "destructive",
            title: "failed saving cookies : " + new Date().toLocaleTimeString(),
            description: "something went wrong while saving cookies...",
          });
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          toast({
            variant: "destructive",
            title: "Invalid credentials : " + new Date().toLocaleTimeString(),
            description: "Please check your email and password",
          });
        } else if (error.status === 422) {
          toast({
            variant: "destructive",
            title: "Invalid credentials : " + new Date().toLocaleTimeString(),
            description:
              "Email/Username/Password must not contain any empty spaces",
          });
        } else if (error.status === 409) {
          toast({
            variant: "destructive",
            title: "Invalid credentials : " + new Date().toLocaleTimeString(),
            description: "Account with email/username already exists",
          });
        } else {
          toast({
            variant: "destructive",
            title:
              "Error occured, please try again : " +
              new Date().toLocaleTimeString(),
            description: error.message,
          });
        }
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
            <TermsAndConditions />
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
            {isLoading ? "creating your account... " : "Register"}
          </Button>
        </div>
      </form>
      <LoginRegisterCard
        text="Already have an account ?"
        url="/auth/login"
        placeholder="login"
      />
    </div>
  );
}
