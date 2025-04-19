import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL ?? "http://localhost:5059";
const imagesURL = process.env.REACT_APP_IMAGES_URL ?? "http://localhost:5059/upload"
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

let isRefreshing = false;
let failedRequestsQueue = [];

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRequest = originalRequest.url.includes("/api/auth/");
    
    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._isRetry) {
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
        await api.post("/api/auth/refresh-token");
        const retryResponse = await api(originalRequest);
        failedRequestsQueue.forEach(req => req.resolve());
        return retryResponse;
      } catch (refreshError) {
        failedRequestsQueue.forEach(req => req.reject(refreshError));
        
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        failedRequestsQueue = [];
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { baseURL, imagesURL };
