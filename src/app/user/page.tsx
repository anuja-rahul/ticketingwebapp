"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { getUser } from "../lib/UserCrud";
import { usePathname } from "next/navigation";

interface UserModel {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function User() {
  const [user, setUser] = useState<UserModel | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        if (response?.data) {
          setUser(response.data as UserModel);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, [pathname]);

  return (
    <section className="pt-10 flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col items-start justify-start w-full">
        <Breadcrumb className="ml-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">User</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-foreground text-4xl my-4 text-balance text-center font-bold">
          User Profile
        </h1>
        <p className="mb-2">Welcome to your profile</p>
        {user ? (
          <div className="p-4 border rounded-md shadow-md">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
