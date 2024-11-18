import { getCookieTokens } from "./BasicCrud";
import { createHttpClient } from "./httpClient";
import { VendorStats } from "./UserCrud";

// Get all events if logged in as customer/admin
export async function getAllVendorConfigs(): Promise<{ data?: VendorStats[] }> {
  const tokenData = await getCookieTokens();
  const path = "/config/all";

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

export async function updateVendorConfigTotalTickets(): Promise<{
  data?: VendorStats;
}> {
  // return stuff
}
