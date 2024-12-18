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
import { checkCookieStatus, sendCookieData } from "@/app/lib/BasicCrud";
// import { toast } from "sonner";
// import { HttpErrorResponse } from "../app/models/http/HttpErrorResponse";
// import Success from "./success";
// import Link from "next/link";
// import ErrorFeedback from "./error";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const dataSchema = z.object({
//   token: z.string(),
//   username: z.string().email(),
//   role: z.string(),
// });

type Schema = z.infer<typeof loginSchema>;
// type UserDataSchema = z.infer<typeof dataSchema>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const { toast } = useToast();
  const timeNow = new Date().toLocaleTimeString();

  // async function sendData(data: UserDataSchema) {
  //   // console.log("Sending data:", data);
  //   try {
  //     // console.log("Sending data:", JSON.stringify(data));
  //     const response = await fetch("/api/cookies/set", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     console.log("Result:", result);

  //     if (response.status == 201) {
  //       // console.log("Error:", result);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  async function onSubmit(data: Schema) {
    setSuccess(false);
    setIsLoading(true);
    createHttpClient()
      .post("/auth/authenticate", data)
      .then(async (response) => {
        // testing for package return
        const userData = response.data;
        const result = await sendCookieData(userData);
        console.log(await checkCookieStatus());
        // console.log(userData);
        toast({
          variant: "default",
          title: "login successful : " + timeNow,
          description:
            "You have logged in successfully, redirecting to home...",
        });

        if (result) {
          toast({
            title: "cookies saved : " + timeNow,
            description: "cookies have been saved successfully...",
          });
          setSuccess(true);
        } else {
          toast({
            variant: "destructive",
            title: "failed saving cookies : " + timeNow,
            description: "something went wrong while saving cookies...",
          });
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          toast({
            variant: "destructive",
            title: "Invalid credentials : " + timeNow,
            description: "Please check your email and password",
          });
        } else if (error.status === 422) {
          toast({
            variant: "destructive",
            title: "Invalid password : " + timeNow,
            description: "Password must not contain any empty spaces",
          });
        } else {
          console.log("Error:", error.status);
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
      }, 1500);
    }
  }, [success]);

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <div className={clsx("gap-6 flex flex-col", className)} {...props}>
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
            <TermsAndConditions />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-4 hover:bg-blue-900/60 duration-300"
          >
            {isLoading ? "logging into your account... " : "Login"}
          </Button>
        </div>
      </form>
      <LoginRegisterCard
        text="Don't have an account ?"
        url="/auth/signup"
        placeholder="signup"
      />
    </div>
  );
}
