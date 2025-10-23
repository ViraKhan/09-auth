import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const apiClient = axios.create({
  baseURL,
  withCredentials: true, 
});
export default apiClient;
