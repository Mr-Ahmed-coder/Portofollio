import axios from "axios";

const isProd = import.meta.env.MODE === "production" || import.meta.env.PROD;
const rawBaseUrl = isProd 
  ? "" 
  : import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:5000";

const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}/${url}`;
};

export { API_BASE_URL };
export { resolveMediaUrl };
export default api;
