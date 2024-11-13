import { createHttpClient } from "./httpClient";
import { getCookieTokens } from "./BasicCrud";

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
