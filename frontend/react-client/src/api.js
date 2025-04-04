import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL ?? "http://localhost:5059";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
              await axios.post(
                  `${baseURL}/api/auth/refresh-token`, 
                  {}, 
                  { withCredentials: true }
              );
              
              return api(originalRequest);
          } catch (refreshError) {
              if (refreshError.response?.status === 401) {
                  window.location.href = "/login";
              }
              return Promise.reject(refreshError);
          }
      }
      
      return Promise.reject(error);
  }
);

export default api;
export { baseURL }