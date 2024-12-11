import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";

export interface poolStats {
  time: string;
  totalTickets: number;
  totalCapacity: number;
}

export interface SaleStats {
  vendor: string;
  ticketSales: number;
  date: number[];
}

export interface FormattedSaleStats {
  vendor: string;
  ticketSales: number;
  date: string;
}

// Get ticket pool status if logged in as an admin
export async function getTicketPoolStats(): Promise<{ data?: poolStats }> {
  const tokenData = await getCookieTokens();
  const path = "/stats/ticketPool";

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

// Get sales records status if logged in as an admin
export async function getSalesRecordsStats(): Promise<{ data?: SaleStats[] }> {
  const tokenData = await getCookieTokens();
  const path = "/stats/sales";

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).get(path);

    if (response.status === 200) {
      console.log(response.data);
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
