import axios from 'axios';

const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const createHttpClient = (additionalHeaders = {}) => {
  return axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      ...defaultHeaders,
      ...additionalHeaders
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  });
};

// export async function TestAPI() {
//   try {
//     const response = await createHttpClient().get("/test");
//     if (response.status === 200) {
//       return response;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
