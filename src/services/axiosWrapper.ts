import axios from "axios";

const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// axiosWrapper.interceptors.request.use((config) => {
//   const token = authToken.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosWrapper;
