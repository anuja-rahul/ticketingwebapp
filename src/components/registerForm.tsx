/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { z } from "zod";
import React from "react";
import { HttpErrorResponse } from "../app/models/http/HttpErrorResponse";
import { createHttpClient } from "@/app/lib/httpClient";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Success from "./success";
import Link from "next/link";
import { Label } from "@components/ui/label";
import { Input } from "./ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["vendor", "customer", "admin"]),
});

type Schema = z.infer<typeof registerSchema>;

export function registerForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<HttpErrorResponse | undefined>(
    undefined
  );

  async function onSubmit(data: Schema) {
    setErrors(undefined);
    setSuccess(false);
    setIsLoading(true);
    createHttpClient()
      .post("/auth/register", data)
      .then(() => {
        toast.success("Account created successfully");
        setSuccess(true);
      })
      .catch((error) => {
        const errordata = error.response.data as HttpErrorResponse;
        setErrors(errordata);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const { register, handleSubmit, formState } = useForm<Schema>({
    resolver: zodResolver(registerSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <div className={clsx("grid gap-6", className)} {...props}>
      <Success
        show={success}
        message="Account created successfully"
        description="Your details were veried and account created successfully"
        action={
          <Link href="/auth/login" className="underline">
            login
          </Link>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoCorrect="off"
              autoComplete="email"
              disabled={isLoading}
              {...register("email")}
            />
            {formState.errors.email && (
              <small className="text-red-600">
                {formState.errors.email.message}
              </small>
            )}

            <Label htmlFor="password">password</Label>
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
        </div>
      </form>
    </div>
  );
}
