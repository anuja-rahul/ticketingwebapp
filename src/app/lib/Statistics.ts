import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";

export interface HistoryStats {
    date: string;
    totalUsers: number;
    totalSales: number;
}


export interface HistoryStatsRaw {
    date: number[];
    totalUsers: number
    totalSales: number;
}

// Get History if logged in as an admin
export async function getHistoryStats(): Promise<{
  data?: HistoryStatsRaw[];
}> {
  const tokenData = await getCookieTokens();
  const path = "/stats/history";

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