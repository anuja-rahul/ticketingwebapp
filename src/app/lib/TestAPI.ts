import { createHttpClient } from "./httpClient";

export async function TestAPI() {
  try {
    const response = await createHttpClient().get("/test");
    if (response.status === 200) {
      console.log(response);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function TestServerRoutes() {
  try {
    const response = await fetch("/api/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
