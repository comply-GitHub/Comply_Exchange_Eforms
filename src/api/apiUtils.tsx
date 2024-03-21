import { apiConfig, apiKeys } from "./apiConfig";
import axios, { AxiosResponse, AxiosRequestConfig }  from "axios";


export const getUrlByKey = (key: keyof typeof apiKeys): string => {
  return apiConfig + apiKeys[key];
};

// export const getUrlByKeyAndParams = (key, params) => {
//   return apiConfig + apiKeys[key]
// }

// export const apiGet = (key, args) => {
//   if (typeof args === "string") {
//     return axios.get(getUrlByKey(key) + args);
//   }
//   else if (typeof args === "object") {
//     return axios.get(getUrlByKey(key), { params: args.params, headers: args.headers }
//     );
//   }
//   else {
//     return axios.get(getUrlByKey(key), {
//       data: args,
//       // withCredentials: true,
//     });
//   }
// };


export const apiPost = (key: keyof typeof apiKeys, args: any): Promise<AxiosResponse> => {
  return axios.post(getUrlByKey(key), args);
};

export const apiPut = (key: keyof typeof apiKeys, args: any): Promise<AxiosResponse> => {
  return axios.put(getUrlByKey(key), args);
};

export const apiPutUrl = (key: keyof typeof apiKeys, dynamicUrl: string, args: any): Promise<AxiosResponse> => {
  return axios.put(getUrlByKey(key) + dynamicUrl, args);
};

export const apiPostUrl = (key: keyof typeof apiKeys, dynamicUrl: string, args: any): Promise<AxiosResponse> => {
  return axios.post(getUrlByKey(key) + dynamicUrl, args);
};

export const apiGetUrl = (key: keyof typeof apiKeys, dynamicUrl: string, args: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.get(getUrlByKey(key) + dynamicUrl, args);
};

export const apiUploadFile = (key: keyof typeof apiKeys, args: any, config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.post(getUrlByKey(key), args, config);
};

export const apiDelete = (key: keyof typeof apiKeys, args: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.delete(getUrlByKey(key), args);
};

export const apiDeleteUrl = (key: keyof typeof apiKeys, dynamicUrl: string, args: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.delete(getUrlByKey(key) + dynamicUrl, args);
};
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
    console.log(error)
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
