import API from "./api";

API.interceptors.response.use(
   response => {
      return response;
   },
   error => {
      console.error('Error:', error);
      return Promise.reject(error);
   }
);

export default API;