import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";

export interface TicketSchema {
  customerEmail: string;
  eventName: string;
  ticketsBought: number;
}

interface CustomerTicketProp {
  eventName: string;
}

// Buy tickets
export async function addCustomerTicket({
  eventName,
}: CustomerTicketProp): Promise<{ data?: TicketSchema }> {
  const tokenData = await getCookieTokens();
  const path = "/ticket/add/" + eventName;

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).post(path);

    if (response.status === 200) {
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
