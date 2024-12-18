import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";
import { VendorStats } from "./UserCrud";

interface createVendorConfigsProps {
  eventName: string;
}

// Create an event if logged in as customer/admin
export async function createVendorConfigs({
  eventName,
}: createVendorConfigsProps): Promise<{ data?: VendorStats }> {
  const tokenData = await getCookieTokens();
  const path = "/config/event";

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).post(path, { eventName });

    if (response.status === 201) {
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

// Get all events if logged in as customer/admin
export async function getAllVendorConfigs(): Promise<{ data?: VendorStats[] }> {
  const tokenData = await getCookieTokens();
  const path = "/config/all";

  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).get(path);

    if (response.status === 200) {
      // console.log({ data: response.data });
      return { data: response.data };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

export interface updateVendorConfigTotalTicketsProps {
  eventName?: string;
  totalTickets?: number;
}

// update VendorEventConfig totalTickets
export async function updateVendorConfigTotalTickets({
  eventName,
  totalTickets,
}: updateVendorConfigTotalTicketsProps): Promise<{
  data?: VendorStats;
}> {
  const tokenData = await getCookieTokens();
  const path = "/config/event/" + eventName + "/" + totalTickets;
  try {
    const response = await createHttpClient({
      Authorization: "Bearer " + tokenData.token.value,
    }).put(path);
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
