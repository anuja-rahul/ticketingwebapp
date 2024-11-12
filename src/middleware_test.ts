import { NextRequest, NextResponse } from "next/server";
import { createHttpClient } from "./app/lib/httpClient";
import { z } from "zod";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = await checkCookieStatus(request);

  const currentUrl = new URL(request.url);
  const allowedPaths = ["/auth/login", "/auth/register", "/auth", "/"];

  if (!session && !allowedPaths.includes(currentUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // If session exists or the URL is allowed, continue the request
  return NextResponse.next();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dataSchema = z.object({
  token: z.string(),
  username: z.string().email(),
  role: z.string(),
});

export type tokenDataSchema = z.infer<typeof dataSchema>;

// Send the cookie data to be saved
export async function sendCookieData(data: tokenDataSchema) {
  try {
    const response = await fetch("http://localhost:3000/api/cookies/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Result:", result);

    if (response.status == 201) {
      // console.log("Error:", result);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Deletes the cookies
export async function deleteCookies() {
  try {
    const response = await fetch("http://localhost:3000/api/cookies/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("Result:", result);

    if (response.status == 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// child
// send a GET request to demo controller to check for validity of tokens
async function checkAuth(path: string, token: { token: { value: string } }) {
  if (token == undefined) {
    return false;
  }
  console.log("token value", token.token.value);

  createHttpClient({ Authorization: "Bearer " + token.token.value })
    .get(path)
    .then(async (response) => {
      if (response.status == 200) {
        return true;
      } else {
        // if not valid delete the cookies
        await deleteCookies();
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return false;
}

// Get all 3 cookies (token, role, username[email])
export async function getCookieTokens() {
  try {
    const response = await fetch("http://localhost:3000/api/cookies/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    // console.log("Read Token", result);

    if (response.status == 200) {
      // console.log("Error:", result);
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Parent
// Check if the cookies exist and send a request to backend using the token to check for validity
export async function checkCookieStatus(request: NextRequest) {
  try {
    const baseURL = new URL(request.url).origin;
    const response = await fetch(`${baseURL}/api/cookies/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      // checking validity
      const tokenData = await getCookieTokens();
      const validity = await checkAuth("/demo", tokenData);
      if (validity) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
