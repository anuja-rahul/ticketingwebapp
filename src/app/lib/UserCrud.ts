import { createHttpClient } from "./httpClient";
import { getCookieTokens } from "./BasicCrud";
import { CustomerTicketStats } from "../user/page";

export interface VendorStats {
  id: number;
  eventName: string;
  email: string;
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
  maxTicketCapacity: number;
}

// interface CustomerTicketStats {
//   customerEmail: string;
//   eventName: string;
//   ticketsBought: number;
// }

export async function getUser() {
  const tokenData = await getCookieTokens();
  const path = "/user";

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).get(path);
    if (response.status == 200) {
      return response;
    } else {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error("Error:", error);
    return null;
  }
}

// Get events under vendor email
export async function getVendorConfigs(): Promise<{ data?: VendorStats[] }> {
  const tokenData = await getCookieTokens();
  const path = "/config/event";

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).get(path);

    if (response.status === 200) {
      return { data: response.data };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

export async function getCustomerTicketConfigs(): Promise<{
  data?: CustomerTicketStats[] | [];
}> {
  const tokenData = await getCookieTokens();
  const path = "/ticket/all";

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).get(path);

    if (response.status === 200) {
      return { data: response.data };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}
