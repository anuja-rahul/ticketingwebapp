import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";

export interface ticketThrealPoolStats {
  createdAt: number[];
  name: string;
  activeThreads: number;
  idleThreads: number;
  totalThreads: number;
}

export interface TransformedTicketThreadPoolStats {
  createdAt: string;
  name: string;
  activeThreads: number;
  idleThreads: number;
  totalThreads: number;
}

interface getThreadPoolStatsProps {
  threadType: string;
}


// Get ticketThreadpool status if logged in as an admin
export async function getThreadPoolStats({threadType}: getThreadPoolStatsProps): Promise<{
  data?: ticketThrealPoolStats[];
}> {
  const tokenData = await getCookieTokens();
  const path = "/thread/sort/" + threadType;

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).get(path);

    if (response.status === 200) {
      //   console.log(response.data);
      return { data: response.data };
    } else {
      return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error:", error);
    return {};
  }
}
