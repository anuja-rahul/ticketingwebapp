import { z } from "zod";
import { createHttpClient } from "./httpClient";

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
    const response = await fetch("/api/cookies/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Result:", result);

    if (response.status == 201) {
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
    const response = await fetch("/api/cookies/delete", {
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
  console.log("token value", token.token.value);

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + token.token.value,
    }).get(path);
    if (response.status == 200) {
      return true;
    } else {
      await deleteCookies();
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

// Get all 3 cookies (token, role, username[email])
export async function getCookieTokens() {
  try {
    const response = await fetch("/api/cookies/get", {
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
export async function checkCookieStatus() {
  try {
    const response = await fetch("/api/cookies/check", {
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
