import api from './api';
import EndPoint from './endpoints';
import constants from './constants';
import showAlert from './alert';
import PathName from './pathname';
import actionName from "./actionName"
import moment from 'moment';

const Utils = {
  api,
  EndPoint,
  constants,
  showAlert,
  PathName,
  actionName
};

export default Utils;

/**
 * To validate email
 * @param email email string to validate
 * @returns  return true or false
 */
export const validateEmail = (email: string) => /[a-z0-9]+@[a-z]{2,}\.[a-z]{2,3}/.test(email);

export const getCommaSeperatedNum = (value: number | string) => {
  const num = Number(value);
  if (!num) {
    return value;
  }
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

export function capitalizeFirstLetter(string: string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}
/**
 * To validate phone
 * @param phone  phone string to validate
 * @returns return true or false
 */
export const validatePhone = (phone: string) =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);

/**
 * To validate password is strong or not
 * @param password password string to validate
 * @returns return true or false
 */
export const validatePassword = (password: string) =>
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

// Not used just here to show that functions that are used to perform calculations are placed in utils

export const formatDollars = (dollar: number) => {
  let dollars;
  dollars = (Math.round(dollar * 100) / 100).toFixed(2);
  dollars = dollar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dollars;
};

export const dateFormater = (date: number) => {
  return moment(date).format('MMM DD YYYY,hh:mm A');
};

export const getToken = (name: string) => {
  return localStorage.getItem(name);
};
export const setToken = (name: string, value: string | any) => {
  return localStorage.setItem(name, value);
};

export const validateValues = (value: any) => {
  return Intl.NumberFormat('en-US', {
    useGrouping: false,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPC = (val: number) => {
  return Intl.NumberFormat('en-US', {
    useGrouping: true,
    maximumFractionDigits: 2,
  }).format(val);
};

export const handleDisabled = (
  permissionsArray: any,
  userType: string,
  buttonName: string,
  tabName?: string
) => {
  if (permissionsArray && permissionsArray.length && userType === 'SUB_ADMIN') {
    if (tabName) {
      if (tabName === 'Promotions') {
        if (permissionsArray.includes('VIEW_GLOBAL_COUPONS')) {
          return false;
        } else if (permissionsArray.includes('VIEW_USER_SPECIFIC_COUPONS')) {
          return false;
        } else {
          return true;
        }
      }
    } else if (permissionsArray.includes(buttonName)) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};
