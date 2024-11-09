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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import ErrorFeedback from "./error";
import { Button } from "./ui/button";

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
        if (error.response && error.response.data) {
          const errordata = error.response.data as HttpErrorResponse;
          setErrors(errordata);
        } else {
          setErrors({
            message: "An unexpected error occurred",
            status: 500,
            errors: new Map(),
            generalErrors: ["An unexpected error occurred"]
          });
          console.log(error)
        }
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
        description="Your details were verified and account created successfully"
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

            <Label htmlFor="name">Username</Label>
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

            <Label htmlFor="password">Password</Label>
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

            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              autoCapitalize="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("role")}
              className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select role</option>
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
          <ErrorFeedback data={errors} />
          <Button disabled={isLoading} type="submit">
            {isLoading && "creating your account..."}
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
