import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL ?? "http://localhost:5059";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

let isRefreshing = false;
let failedRequestsQueue = [];

const isExcludedFromRetry = (url) => {
  return url?.includes("/api/auth/check-auth") || url?.includes("/api/auth/refresh-token");
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._isRetry &&
      !isExcludedFromRetry(originalRequest.url)
    ) {
      originalRequest._isRetry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await api.post("/api/auth/refresh-token", {}, { withCredentials: true });

        const retryResponse = await api(originalRequest);

        failedRequestsQueue.forEach(req => req.resolve());
        failedRequestsQueue = [];

        return retryResponse;
      } catch (refreshError) {
        failedRequestsQueue.forEach(req => req.reject(refreshError));
        failedRequestsQueue = [];

        if (refreshError.response?.status === 401) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { baseURL };
