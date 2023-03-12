import axios from "axios";
import {API_BASE_URL} from "../Services/constants"
import pickBy from "lodash/pickBy";

export const newGetRequest = async ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  try {
    const response = await axios.post(API, DATA, {...defaulHeader.headers});
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export const getRequest = ({ API = "", headers = {}, params = {}, data = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    instance
      .get(apiWithAuth(API), {
        ...defaulHeader.headers,
        ...(params && pickBy(params, (val) => ![""].includes(val))),
        ...(headers && pickBy(headers, (val) => ![""].includes(val))),
        responseType: responseType,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const defaulHeader = {
  headers: {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "withCredentials": true,
    "mode": 'no-cors',
  },
};

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
  defaulHeader,
});


const requestWithoutAuth = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
  defaulHeader,
});

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
requestWithoutAuth.interceptors.response.use((config) => config,handleErrorResponse);
instance.interceptors.response.use((config) => config ,handleErrorResponse);
  


export const postRequestNoAuth = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    requestWithoutAuth
      .post(
        API,
        pickBy(DATA, (val) => ![""].includes(val)),
        {
          ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
        }
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const updateAuthToken = (token = "") => {
  instance.defaults.headers = {
    ...instance.defaults.headers,
    ...{ Authorization:`Bearer ${token}`},
  };
};

export const postRequest = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        console.log(result)
        resolve(result);
      })
      .catch((error) => {
        console.log(error)
        reject(error.response);
      });
  });
};

export const putRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .put(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? pickBy(DATA, (val) => ![""].includes(val)) : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const deleteRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(apiWithAuth(API), {
        headers: {
          ...defaulHeader.headers,
          ...HEADER,
        },
        data: DATA,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const patchRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? pickBy(DATA, (val) => ![""].includes(val)) : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const apiWithAuth = (api) => {
  return api;
};

export default instance;