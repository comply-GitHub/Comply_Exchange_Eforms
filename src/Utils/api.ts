import { ErrorModel } from '../Redux/Actions/errormodel';
import Utils from '../Utils';

interface ApiResponse {
  statusCode: number;
  message?: string;
}

const headers = {
  // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  'Content-Type': 'application/json',
};

const checkUserValidation = (data: ApiResponse | null): boolean => {
  if (data) {  
    const { statusCode } = data;
    const { sessionExpired, unauthorized, accessDenied } = Utils.constants.apiErrorCode;

    if (statusCode) {
      return statusCode === sessionExpired || statusCode === unauthorized || statusCode === accessDenied;
    }
    return false;
  }
  return false;
};

const logOutApiCall = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
};

const loginApiCall = (
  endPoint: string,
  params: any,
  successCallback: (response: any) => void,
  errorCallback: (error: ApiResponse) => void
) => {
  Utils.constants.axios
    .post(endPoint, params)
    .then((response) => {
      successCallback(response);
    })
    .catch((error) => {
      if (error.code === 'ECONNABORTED') {
        let payload: ApiResponse = {
          statusCode: 408,
          message: 'Something went wrong!',
        };
        errorCallback(payload);
      } else if (error.response) {
        let data: any = error.response.data;
        if (data?.code == 401) {
          logOutApiCall();
        }
        if (checkUserValidation(data)) {
          Utils.showAlert(2, data.message || '');
          setTimeout(() => {
            logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload: ApiResponse = {
          statusCode: -1,
          message: 'Please try again later',
        };
        errorCallback(payload);
      }
    });
};

// const deleteApiCall = (
//   endPoint: string,
//   params: any,
//   successCallback: (response: any) => void,
//   errorCallback: (error: ApiResponse) => void
// ) => {
//   Utils.constants.axios
//     .delete(endPoint, params, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
//     .then((response) => {
//       successCallback(response);
//     })
//     .catch((error) => {
//       if (error.code === 'ECONNABORTED') {
//         let payload: ApiResponse = {
//           statusCode: 408,
//         };
//         errorCallback(payload);
//       } else if (error.response) {
//         let data: ApiResponse = error.response.data;
//         if (checkUserValidation(data)) {
//           Utils.showAlert(2, data.message || '');
//         } else {
//           errorCallback(error.response);
//         }
//       } else if (!error.response) {
//         let payload: ApiResponse = {
//           statusCode: -1,
//           message: 'Please try again later',
//         };
//         errorCallback(payload);
//       }
//     });
// };

const postApiCall = (
  endPoint: string,
  params: any,
  successCallback: (response: any) => void,
  errorCallback: (error: ErrorModel) => void,
  headerType?: string
) => {
  if (headerType === 'multi') {
    headers['Content-Type'] = 'multipart/form-data';
  }else{    
    headers['Content-Type'] = 'application/json';
  }
  Utils.constants.axios
    .post(endPoint, params, { headers: headers })
    .then((response) => {
      successCallback(response);
    })
    .catch((error) => {
      console.log(error,"err----------->")
      if (error.code === 'ECONNABORTED') {
        let payload: any = {
          statusCode: 408,
        };
        errorCallback(payload);
      } else if (error.response) {
        let data: any = error.response.data;
        if (data.code === 401) {
          logOutApiCall();
        }
        if (checkUserValidation(data)) {
          Utils.showAlert(2, data.message || '');
          setTimeout(() => {
            logOutApiCall();
          }, 1000);
        } else {
          let payload: ErrorModel = {
            statusCode: error.response.status,
            payload: data,
            message: data.error,
          };
          errorCallback(payload);
        }
      } else if (!error.response) {
        let payload: ErrorModel = {
          statusCode: -1,
          payload:{},
          message: 'Please try again later',
        };
        errorCallback(payload);
      }
    });
};

const getApiCall = (
  endPoint: string,
  params: string = '',
  successCallback: (response: any) => void,
  errorCallback: (error: ApiResponse) => void,
  isArrayBuffer=false
) => {
  Utils.constants.axios
    .get(Utils.constants.API_URL + endPoint + params, { headers: headers, responseType: isArrayBuffer?"arraybuffer":"json"})
    .then((response) => {
      successCallback(response);
    })
    .catch((error) => {
      if (error.code === 'ECONNABORTED') {
        let payload: ApiResponse = {
          statusCode: 408,
        };
        errorCallback(payload);
      } else if (error.response) {
        let data: any = error.response.data;
        if (data.code === 401) {
          logOutApiCall();
        }
        if (checkUserValidation(data)) {
          // If user session expired
          Utils.showAlert(2, data.message || '');
          setTimeout(() => {
            logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload: ApiResponse = {
          statusCode: -1,
          message: 'Please try again later',
        };
        errorCallback(payload);
      }
    });
};

const putApiCall = (
  endPoint: string,
  params: any,
  successCallback: (response: any) => void,
  errorCallback: (error: ApiResponse) => void,
  headerType?: string
) => {
  if (headerType === 'multi') {
    headers['Content-Type'] = 'multipart/form-data';
  }
  Utils.constants.axios
    .put(endPoint, params, { headers: headers })
    .then((response) => {
      successCallback(response);
    })
    .catch((error) => {
      if (error.code === 'ECONNABORTED') {
        let payload: ApiResponse = {
          statusCode: 408,
        };
        errorCallback(payload);
      } else if (error.response) {
        let data: ApiResponse = error.response.data;
        if (checkUserValidation(data)) {
          Utils.showAlert(2, data.message || '');
          setTimeout(() => {
            logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload: ApiResponse = {
          statusCode: -1,
          message: 'Please try again later',
        };
        errorCallback(payload);
      }
    });
};

const api = {
  postApiCall,
  loginApiCall,
  putApiCall,
  getApiCall,
  // deleteApiCall,
  logOutApiCall,
};

export default api;
