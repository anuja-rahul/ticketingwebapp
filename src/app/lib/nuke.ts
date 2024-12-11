import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";

export interface NukeStats {
  data: string;
  auth: boolean;
}

// get role
export async function getRole(): Promise<{
  auth: boolean;
}> {
  const tokenData = await getCookieTokens();

  try {
    if (tokenData.role.value === "ADMIN") {
      return { auth: true };
    } else {
      return { auth: false };
    }
  } catch (error) {
    console.error("Error:", error);
    return { auth: false };
  }
}

// Nuke the server if logged in as an admin
export async function getNukeData(): Promise<{
  data: NukeStats | null;
}> {
  const tokenData = await getCookieTokens();
  const path = "/system/nuke";

  try {
    const response = await createHttpClient({
      Authorization: `Bearer ${tokenData.token.value}`,
    }).get(path);

    if (response.status === 200) {
      return { data: response.data };
    } else {
      return { data: null };
    }
  } catch (error) {
    console.error("Error:", error);
    return { data: null };
  }
}
