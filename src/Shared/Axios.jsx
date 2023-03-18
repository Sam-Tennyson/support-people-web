import axios from "axios";
import {API_BASE_URL} from "../Services/constants"

const defaulHeader = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "withCredentials": true,
    "mode": 'no-cors',
  },
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
  headers: defaulHeader.headers,
});

export const getRequest = async ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => await instance.get(API)
export const postRequest = async ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => await instance.post(API, DATA)
export const putRequest = async ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => await instance.put(API, DATA)
export const deleteRequest = async ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => await instance.delete(API)

// Error handler
const handleErrorResponse = (error) => {
    if(error.response && error.response.status) {
      console.log(error)
      const { response : { status } } = error;
      if(status === 401) {
        localStorage.clear();
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }


// Error interceptors
instance.interceptors.response.use((config) => config ,handleErrorResponse);

export const updateAuthToken = (token = "") => {
  instance.defaults.headers = {
    ...instance.defaults.headers,
    ...{ Authorization:`Bearer ${token}`},
  };
};

export default instance;