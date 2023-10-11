// /* eslint no-underscore-dangle: 0 */

// import axios from "axios";

// // import { AUTHENTICATION_ENDPOINT, BASE_URL } from "../configs/api-config";
// // import { cookies } from "../contexts/auth";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   timeout: 60 * 1000,
// });

// axiosInstance.interceptors.request.use(
//   (req) => {
//     if (req.url.includes("/token/refresh")) {
//       req.headers["X-CSRF-TOKEN"] = cookies.get("workz_csrf_refresh_token");
//       req.headers["Content-Type"] = "application/json";
//     } else {
//       req.headers["X-CSRF-TOKEN"] = cookies.get("workz_csrf_access_token");
//     }
//     return req;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest = error.config;
//     if (error.response === undefined) {
//       return Promise.reject(error);
//     }
//     if (
//       error.response.status === 401 &&
//       originalRequest.url === "/token/refresh"
//     ) {
//       console.log("Cookie not set properly or refresh token expired.");
//       [
//         "workz_access_token",
//         "workz_refresh_token",
//         "isUserAuthenticated",
//       ].forEach((k) => cookies.remove(k, { path: "/" }));
//       ["permissions", "proxyTenant", "proxyTenantName", "user_name"].forEach(
//         (k) => localStorage.removeItem(k)
//       );
//       window.location.replace("/login");
//     }
//     if (
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       originalRequest.url !== AUTHENTICATION_ENDPOINT
//     ) {
//       originalRequest._retry = true;
//       return axiosInstance
//         .get("/token/refresh")
//         .then((res) => {
//           if (res.status === 200) {
//             return axiosInstance(originalRequest);
//           }
//           return null;
//         })
//         .catch((error) => {
//           return Promise.reject(error);
//         });
//     }
//     return Promise.reject(error);
//   }
// );

// export { axiosInstance };