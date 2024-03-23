import axios from 'axios';
import { getToken } from '.';

const API_URL = 'http://122.176.139.248:8088/api/';
//const API_URL = 'https://localhost:44319/api/';


export const apiErrorCode = {
  unauthorized: 401,
  accessDenied: 430,
  sessionExpired: 423,
  validationError: 400,
  emailNotVerified: 403,
  internalError: 500,
};

const apiSuccessCode = {
  success: 200,
  postSuccess: 201,
  putSuccess: 202,
};

export const $axios = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    platform: 3,
    timezone: 0,
    language: 'en',
    offset: 0,
    api_key: 1234,
  },
});

$axios.interceptors.request.use(
  (config: any) => {
    const token = getToken('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = 'Basic c2xpY2U6c2xpY2VAMTIz';
    }

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //   config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMDA1Iiwicm9sZSI6IkFkbWluIiwiYXVkIjoidXNlciIsImlzcyI6ImFkbWluIiwibmJmIjoxNzA2ODUyNjk2LCJleHAiOjE3Mzc5NjAyOTYsImlhdCI6MTcwNjg1MjY5Nn0.s4sU4DUy2Pp4125VUUfNCnqsSid_A6FIt0lxnbc6Pr8';
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
const constants = {
  apiErrorCode,
  // API_URL: process.env.REACT_APP_API_URL,
  API_URL:"http://122.176.139.248:8088/api",
  //API_URL:"https://localhost:44319/api",
  apiSuccessCode,
  axios: $axios,
};
export default constants;
