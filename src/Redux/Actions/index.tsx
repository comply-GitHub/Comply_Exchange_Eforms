import { AnyAction } from "redux";
import Utils from "../../Utils";
import { convertToFormData } from "../../Helpers/convertToFormData";
import store from "../store";
import { FormTypeId } from "../../Utils/constVals";
import { ErrorModel } from "./errormodel";

export const W9_state = (value: any, callback: any = false): any => {
  return {
    type: Utils.actionName.CREATE_W9,
    payload: value,
  };
  if (callback) {
    callback();
  }
};



export const W8_state = (value: any, callback: any = false): any => {
  if (callback) {
    callback();
  }
  return {
    type: Utils.actionName.CREATE_W8,
    payload: value,
  };

};


// section W8ECI
export const W8_state_ECI = (value: any, callback: any = false): any => {
  return {
    type: Utils.actionName.CREATE_W8_ECI,
    payload: value,
  };
  if (callback) {
    callback();
  }
};

export const postW8ECI_EForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertW8ECIIndividualEntityNonUSForm,
      convertToFormData(value),
      // value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              message: responseData.error,
              statusCode: 500,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              let err: ErrorModel = {
                message: "",
                payload: {},
                statusCode: 200
              }
              dispatch({
                type: Utils.actionName.UpdateError,
                payload: { ...err },
              });
              callback();
            }
          }
        }
      },
      (error) => {
        let err: ErrorModel = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      }
      , "multi"
    );
  };
};


export const CREATE_8233 = (value: any, callback: any = false): any => {
  return {
    type: Utils.actionName.CREATE_8233,
    payload: value,
  };
  if (callback) {
    callback();
  }
};

export const CREATE_8IMY = (value: any, callback: any = false): any => {
  return {
    type: Utils.actionName.CREATE_8IMY,
    payload: value,
  };
  if (callback) {
    callback();
  }
};


export const loginAction = (value: any, callback: Function): any => {
  return (dispatch: any) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.EndPoint.login}`,
      value,
      (responseData) => {
        console.log(responseData);
        if (responseData.status == 200) {
          localStorage.setItem(
            "accessToken",
            responseData.data.token.accessToken
          );
          localStorage.setItem(
            "userDetails",
            JSON.stringify(responseData.data)
          );
          callback();
        }
      },
      (error: any) => {
        let { data } = error;
      }
    );
  };
};

// /eFormSignIn/eFormSignIn1
export const eFormSignIn1 = (value: any, callback: Function, errorCallback: Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      `${Utils.EndPoint.eFormSignIn1}`,
      { ...value, username: value?.email },
      (responseData) => {
        console.log(responseData, "responseeee");

        if (responseData.status == 200) {
          let authDetails: any =
          {
            agentId: responseData?.data?.agentId,
            accountHolderId: 0,
            token: responseData?.data?.token?.accessToken,
            configurations: { ...responseData?.data }
          }

          dispatch({
            type: Utils.actionName.UpdateAuthDetails,
            payload: authDetails
          })
          localStorage.setItem(
            "accessToken",
            responseData?.data?.token?.accessToken
          );

          localStorage.setItem("authDetails", JSON.stringify(authDetails));
          callback(responseData.data);
        }
        let err: ErrorModel = {
          message: "",
          payload: {},
          statusCode: 200
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
      },
      (error: ErrorModel) => {
        let data = error.payload;
        let err: ErrorModel = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(data);
      }
    );
  };
};

export const SignInSaveAndExit = (value: any, callback: Function, errorCallback: Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      `${Utils.EndPoint.SignInSaveAndExit}`,
      value,
      (responseData) => {
        console.log(responseData);
        if (responseData.status == 200) {
          let authDetails: any =
          {
            agentId: responseData?.data?.agentId,
            accountHolderId: responseData?.data?.accountHolderDetailsId,
            token: responseData?.data?.token?.accessToken,
            configurations: { ...responseData?.data }
          }

          dispatch({
            type: Utils.actionName.UpdateAuthDetails,
            payload: authDetails
          })
          localStorage.setItem("authDetails", JSON.stringify(authDetails));

          localStorage.setItem(
            "accessToken",
            responseData?.data?.token?.accessToken
          );

          localStorage.setItem(
            "accountHolderDetails",
            JSON.stringify(responseData?.data?.accountHolderDetail)
          );
          localStorage.setItem(
            "agentDetails",
            JSON.stringify(responseData?.data?.accountHolderDetail)
          );
          callback(responseData?.data);
        }
        let err: ErrorModel = {
          message: "",
          payload: {},
          statusCode: 200,
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
      },
      (error: ErrorModel) => {
        let err: ErrorModel = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error.payload);
      }
    );
  };
};

export const LoadExistingFormData = (formTypeId: any, AccountHolderId: any, callback: Function, errorCallback: Function) => {
  let Endpoint = "";
  switch (formTypeId) {
    case FormTypeId.W9:
      Endpoint = Utils.EndPoint.GetByW9IndividualEntityUSFormId + `?AccountHolderBasicDetailId=${AccountHolderId}`
      break;
    case FormTypeId.BEN:
      Endpoint = Utils.EndPoint.GetByW8BENIndividualId + `?AccountHolderBasicDetailId=${AccountHolderId}`
      break;
    case FormTypeId.BENE:
      Endpoint = Utils.EndPoint.GetByW8BENEEntityNonUSFormId + `?AccountHolderBasicDetailId=${AccountHolderId}`
      break;
    case FormTypeId.W8ECI:
      Endpoint = Utils.EndPoint.GetByW8ECIIndividualEntityNonUSFormId + `?AccountHolderDetailId=${AccountHolderId}`
      break;
    case FormTypeId.W8EXP:
      Endpoint = Utils.EndPoint.GetByW8EXPFormFormEntityNonUs + `?AccountHolderBasicDetailId=${AccountHolderId}`
      break;
    case FormTypeId.F8233:
      Endpoint = Utils.EndPoint.GetByForm8233IndividualNonUSFormId + `?AccountHolderBasicDetailId=${AccountHolderId}`
      break;
    case FormTypeId.FW81MY:
      Endpoint = Utils.EndPoint.GetByW8IMYEntityNonForm + `?AccountHolderBasicDetailId=${AccountHolderId}`
      break;
    case FormTypeId.CaymanIndividual:
      Endpoint = Utils.EndPoint.GetByCaymanIndividualNonUSId + `?AccountHolderDetailId=${AccountHolderId}`
      break;
    default:
      return;
  }
  return (dispatch: any) => {
    Utils.api.getApiCall(
      `${Endpoint}`,
      "",
      (responseData) => {
        console.log(responseData);
        localStorage.setItem(
          "PrevStepData",
          JSON.stringify(responseData.data)
        );
        switch (formTypeId) {
          case FormTypeId.W9:
            dispatch({
              type: Utils.actionName.InsertW9IndividualEntityUSForm,
              payload: { ...responseData?.data },
            });
            break;
          case FormTypeId.BEN:
            dispatch({
              type: Utils.actionName.InsertW8BENIndividualNonUS,
              payload: { ...responseData?.data },
            });
            break;
          case FormTypeId.BENE:
            dispatch({
              type: Utils.actionName.InsertW8BENEEntityNonUSForm,
              payload: { ...responseData?.data },
            });
            break;
          case FormTypeId.W8ECI:
            dispatch({
              type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
              payload: { ...responseData?.data },
            });
            break;
          case FormTypeId.W8EXP:
            dispatch({
              type: Utils.actionName.InsertW8EXPFormEntityNonUs,
              payload: { ...responseData?.data },
            });
            break;
          case FormTypeId.CaymanIndividual:
            dispatch({
              type: Utils.actionName.InsertCaymanIndividualNonUS,
              payload: { ...responseData?.data },
            });
            break;
          default:
            return;
        }
        callback(responseData.data);
      },
      (error: any) => {
        let { data } = error;
        errorCallback(data);
      }
    );
  };

}


export const SendOTPMail = (value: any, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.SendOTPMail,
      value,
      (responseData) => {

        if (responseData) {

          if (responseData.status === 200) {
            dispatch({
              type: Utils.actionName.SendOTPMail,
              payload: {
                SendOTPMailData: responseData.data,
              },
            });
          } else if (responseData.status == 500) {
            console.log("error");
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error) => {
      }
    );
  };
};

export const postSecurityCode = (callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.postSecurutyCode,
      "",
      (responseData) => {

        if (responseData) {

          if (responseData.status === 200) {
            dispatch({
              type: Utils.actionName.postSecurutyCode,
              payload: {
                postSecurutyCodeData: responseData.data,
              },
            });
          } else if (responseData.status == 500) {
            console.log("error");
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error) => {
      },
      "multi"
    );
  };
};
export const postOnboarding = (value: any, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.individualAccountHolder,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.individualAccountHolder,
          payload: { ...value, returnData: data },
        });

        if (responseData) {
          if (responseData.status == 500) {
            console.log("error");
          } else {
            if (callback) {
              callback(data);
            }
          }
        }
      },
      (error) => {
      }
    );
  };
};


export const GetAllLanguage = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAllLanguage, "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAllLanguage,
            payload: {
              GetAllLanguageData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getBreadCrums = (FormId: Number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.getBreadCrums,
      `?FormId=${FormId}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.getBreadCrums,
            payload: {
              getBreadCrumsData: resData.data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


export const GetAgentPaymentType = (agentId: Number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentPaymentType,
      `?agentId=${agentId}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentPaymentType,
            payload: {
              GetAgentPaymentTypeData: resData.data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getTinTypes = (agentId: Number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetTinTypes,
      `?agentId=${agentId}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetTinTypes,
            payload: {
              GetTinTypesData: resData.data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getECIformData = (_id: Number, callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetByW8ECIIndividualId,
      `?AccountHolderDetailId=${_id}`,
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetByW8ECIIndividualId,
            payload: {
              GetByW8ECIEntityNonUSFormData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};
export const getBENformData = (_id: Number, callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetByW8BENIndividualId,
      `?AccountHolderBasicDetailId=${_id}`,
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetByW8BENIndividualId,
            payload: {
              GetByW8BENEntityNonUSFormData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getExpformData = (_id: Number, callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetByW8EXPIndividualId,
      `?AccountHolderBasicDetailId=${_id}`,
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetByW8EXPIndividualId,
            payload: {
              GetByW8EXPEntityNonUSFormData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};
export const getBENEformData = (_id: Number, callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetByW8BENEEntityNonUSFormId,
      `?AccountHolderBasicDetailId=${_id}`,
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetByW8BENEEntityNonUSFormId,
            payload: {
              GetByW8BENEEntityNonUSFormData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getDualCertW9 = (_id: Number, FormId: Number, callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetDualCertW9,
      `?AccountHolderId=${_id}&FormTypeId=${FormId}`,
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetDualCertW9,
            payload: {
              DualCertData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


export const getDualCertData = (_id: Number, FormId: Number, callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetDual,
      `?AccountHolderId=${_id}&FormTypeId=${FormId}`,
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetDual,
            payload: {
              DualData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};
//GetSettings

export const getSettings = (callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetSettings,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetSettings,
            payload: {
              GetSettingsData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getAllCountries = (callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetCountries,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetCountries,
            payload: {
              allCountriesData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getAllCountriesWithTreaty = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetCountriesTreaty + "?pageSize=300",
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetCountriesTreaty,
            payload: {
              ...data
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getSecurityQuestions = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetSecurityQuestions,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetSecurityQuestions,
            payload: {
              getSecurityQuestionsData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};



export const getAllCountriesCode = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetCountriesCode,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetCountriesCode,
            payload: {
              allCountriesCodeData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getAllCountriesIncomeCode = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAllIncomeCodes,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAllIncomeCodes,
            payload: {
              allCountriesIncomeCodeData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getAllStateByCountryId = (id: any): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetStateByCountryId,
      `?CountryId=${id}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "getAllStateByCountryId from action", id)
          await dispatch({
            type: Utils.actionName.GetStateByCountryId,
            payload: {
              allCountriesStateIdData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

//PDF API's

export const getW9PDF = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.W9PDF,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.W9PDF,
            payload: {
              W9PdfData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


export const postFormSelection = (value: any, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.PostFormSelection,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.PostFormSelection,
          payload: { data: data.data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            console.log("error");
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error) => {
      }
    );
  };
};


////

export const GetAgentCapacityHiddenForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentCapacityHiddenForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentCapacityHiddenForEform,
            payload: {
              GetAgentCapacityHiddenForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentChapter4EntityTypeHiddenForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentChapter4EntityTypeHiddenForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentChapter4EntityTypeHiddenForEform,
            payload: {
              GetAgentChapter4EntityTypeHiddenForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentChapter3EntityTypeHiddenForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentChapter3EntityTypeHiddenForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentChapter3EntityTypeHiddenForEform,
            payload: {
              GetAgentChapter3EntityTypeHiddenForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentChapter4EntityTypeImportantForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentChapter4EntityTypeImportantForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentChapter4EntityTypeImportantForEform,
            payload: {
              GetAgentChapter4EntityTypeImportantForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentDocumentationMandatoryForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentDocumentationMandatoryForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentDocumentationMandatoryForEform,
            payload: {
              GetAgentDocumentationMandatoryForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentExemptionCodeDisabledForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentExemptionCodeDisabledForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentExemptionCodeDisabledForEform,
            payload: {
              GetAgentExemptionCodeDisabledForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentIncomeCodeHiddenForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentIncomeCodeHiddenForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentIncomeCodeHiddenForEform,
            payload: {
              GetAgentIncomeCodeHiddenForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

// export const GetAgentUSVisaTypeHiddenForEformAction = (): any => {
//   return (dispatch: any) => {
//     Utils.api.getApiCall(
//       Utils.EndPoint.GetAgentUSVisaTypeHiddenForEform,
//       "",
//       (resData) => {
//         const { data } = resData;
//         if (resData.status === 200) {

//           dispatch({
//             type: Utils.actionName.GetAgentUSVisaTypeHiddenForEform,
//             payload: {
//               GetAgentUSVisaTypeHiddenForEformData: resData.data,
//             },
//           });
//         } else {
//         }
//       },
//       (error: any) => {

//       }
//     );
//   };
// };


export const GetAgentUSVisaTypeHiddenForEformAction = (id:number): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentUSVisaTypeHiddenForEform,
      `?agentId=${id}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentUSVisaTypeHiddenForEform,
            payload: {
              GetAgentUSVisaTypeHiddenForEform: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentFATCAExemptionCodeHiddenForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentFATCAExemptionCodeHiddenForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentFATCAExemptionCodeHiddenForEform,
            payload: {
              GetAgentFATCAExemptionCodeHiddenForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentFATCAEntityGIINChallengeDisabledForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentFATCAEntityGIINChallengeDisabledForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentFATCAEntityGIINChallengeDisabledForEform,
            payload: {
              GetAgentFATCAEntityGIINChallengeDisabledForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentSPTQuestionHiddenForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentSPTQuestionHiddenForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentSPTQuestionHiddenForEform,
            payload: {
              GetAgentSPTQuestionHiddenForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};
export const GetAgentWrittenStatementSelectionByAgentIdForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentWrittenStatementSelectionByAgentIdForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentWrittenStatementSelectionByAgentIdForEform,
            payload: {
              GetAgentWrittenStatementSelectionByAgentIdForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


export const GetAgentTINTypeSelectionByIdForEformAction = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentTINTypeSelectionByIdForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentTINTypeSelectionByIdForEform,
            payload: {
              GetAgentTINTypeSelectionByIdForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetAgentCountriesImportantForEform = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentCountriesImportantForEform,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentCountriesImportantForEform,
            payload: {
              GetAgentCountriesImportantForEformData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}

export const GetChapter3Status = (formTypeId: number = 0): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetChapter3Status,
      `?FormTypeId=${formTypeId}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetChapter3Status,
            payload: {
              GetChapter3StatusData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}

export const GetChapter4Statuses = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetChapter4Statuses,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetChapter4Statuses,
            payload: {
              GetChapter4StatusesData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}

export const GetAgentIncomeTypeHiddenAllowAnoymo = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAgentIncomeTypeHiddenAllowAnoymo,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAgentIncomeTypeHiddenAllowAnoymo,
            payload: {
              GetAgentIncomeTypeHiddenAllowAnoymoData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}
export const GetLimitationBenefits = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetLimitationBenefits,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetLimitationBenefits,
            payload: {
              GetLimitationBenefitsData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}

export const GetIncomeTypes = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetIncomeTypes,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetIncomeTypes,
            payload: {
              GetIncomeTypesData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}

export const GetHelpVideoDetails = (): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAllHelpVideosDetails,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetAllHelpVideosDetails,
            payload: {
              GethelpData: resData.data,
            },
          });
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}


export const postW9Form = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertW9IndividualEntityUSForm,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InsertW9IndividualEntityUSForm,
          payload: { data: data.data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            errorCallback({ message: "Some error occured", error: responseData });
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error) => {
        errorCallback({ message: "Some error occured", error: error });
      },
      "multi"
    );
  };
};

export const postW8BENForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertW8BENIndividualNonUS,
    convertToFormData(value),
      // value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InsertW8BENIndividualNonUS,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};
//UpsertDualCertW9
export const postW8BEN_EForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertW8BENEEntityNonUSForm,
      convertToFormData(value),
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InsertW8BENEEntityNonUSForm,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};



export const PostDualCertDetails = (value: any,successCallback:Function,errorCallback:Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.UpsertDualCertW9,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.UpsertDualCertW9,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback(err);
          }else if(responseData.status == 200){
            successCallback(responseData)
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(err);

      },
      // "multi"
    );
  };
};


export const PostDualCert = (value: any,successCallback:Function,errorCallback:Function): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InserDualCert,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InserDualCert,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback(err);
          }else if(responseData.status == 200){
            successCallback(responseData)
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(err);

      },
      // "multi"
    );
  };
};
// export const postW8ECIForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
//   return (dispatch: any) => {
//     Utils.api.postApiCall(
//       Utils.EndPoint.InsertW8ECIIndividualEntityNonUSForm,
//       // convertToFormData(value),
//       value,
//       (responseData) => {
//         let { data } = responseData;
//         dispatch({
//           type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
//           payload: { ...value, Response: data },
//         });
//         if (responseData) {
//           if (responseData.status == 500) {
//             let err: ErrorModel = {
//               statusCode: 500,
//               message: responseData.error,
//               payload: responseData
//             }
//             dispatch({
//               type: Utils.actionName.UpdateError,
//               payload: { ...err },
//             });
//             errorCallback({ message: "Internal server error occured", payload: responseData })
//           } else {
//             if (callback) {
//               callback();
//             }
//           }
//         }
//       },
//       (error: ErrorModel) => {
//         console.log(error, "abcde")
//         let err: any = {
//           ...error
//         }
//         dispatch({
//           type: Utils.actionName.UpdateError,
//           payload: { ...err },
//         });
//         errorCallback(error)
//       },
//       // "multi"
//     );
//   };
// };

export const postW8EXPForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  console.log("exp", value)
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertW8EXPFormEntityNonUs,
      convertToFormData(value),
      //value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InsertW8EXPFormEntityNonUs,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};


export const formPDFField = (_id: Number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.formPDFFieldData,
      `?formTypeId=${_id}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.formPDFFieldData,
            payload: {
              formPDFFieldNames: data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getW9Form = (_id: Number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetByW9IndividualEntityUSFormId,
      `?AccountHolderDetailId=${_id}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GetByW9IndividualEntityUSFormId,
            payload: {
              GetByW9FormData: data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const UpsertAccountHolderIncomeAllocation = (payload: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.UpsertAccountHolderIncomeAllocation,
      payload,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          // dispatch({
          //   type: Utils.actionName.UpsertAccountHolderIncomeAllocation,
          //   payload: {
          //     UpsertAccountHolderIncomeAllocationData: data,
          //   },
          // });
          if (callback) {
            callback(resData.data);
          }
        } else {
          errorCallback({ message: "Some error occured.", payload: data });
        }
      },
      (error: any) => {
        errorCallback({ message: "Some error occured.", payload: error });
      }
    );
  };
}

export const GetAccountHolderIncomeAllocation = (_id: Number, FormTypeId: number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAccountHolderIncomeAllocation,
      `?AccountHolderDetailId=${_id}&FormTypeId=${FormTypeId}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          // dispatch({
          //   type: Utils.actionName.GetByW9IndividualEntityUSFormId,
          //   payload: {
          //     GetByW9FormData: data,
          //   },
          // });
          if (callback) {
            callback(resData.data);
          }
        } else {

        }
      },
      (error: any) => {
      }
    );
  };
}


export const GET_AGENT_BY_ID = (_id: Number, callback: Function): any => {
  return (dispatch: any) => {
    // const token = localStorage.getItem('accessToken');

    // alert(token);

    Utils.api.getApiCall(
      Utils.EndPoint.GET_AGENT_BY_ID,
      `?Id=${_id}`,
      (resData) => {
        const { data } = resData;

        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.GET_AGENT_BY_ID,
            payload: {
              agentDataById: data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


export const getAllStateByCountryId1 = (id: any, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetStateByCountryId,
      `?CountryId=${id}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "getAllStateByCountryId1 from action", id)
          await dispatch({
            type: Utils.actionName.GetStateByCountryId,
            payload: {
              allCountriesStateIdData: resData.data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


// substantial us passive nfe apis
export const UpdateSubstantialUsPassiveNFE = (values: any): any => {
  return (dispatch: any) => {
    dispatch(
      {
        type: Utils.actionName.UpdateSubstantialUsPassiveNFE,
        payload: [...values]
      }
    )
  }
}

export const UpsertSubstantialUsPassiveNFE = (callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  const payload = store.getState().SubstantialUsPassiveNFE;
  console.log(payload, "payloadddd")
  return (dispatch: any) => {
    Utils.api.postApiCall
      (
        Utils.EndPoint.UpsertAccountHolderSubstantialUsPassiveNFE,
        payload,
        (response) => {
          const { data } = response;
          callback(data);
          //dispatch an action here if needed
        },
        (err) => {
          errorCallback({ message: "Some erro occured while saving", payload: err });
        }
      )
    // dispatch(
    //   {
    //     type:Utils.actionName.PosteSubstantialUsPassiveNFE,
    //     payload: [...values]
    //   }
    // )
  }
}

export const GetSubstantialUsPassiveNFE = (accountHolderId: any, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAccountHolderSubstantialUsPassiveNFE,
      `?accountHolderId=${accountHolderId}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "GetSubstantialUsPassiveNFE from action", accountHolderId)

          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetCountryArticleByID = (id: any, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetCountryArticleByID,
      `?CountryId=${id}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "GetCountryArticleByID from action", id)
          await dispatch({
            type: Utils.actionName.GetCountryArticleByID,
            payload: {
              CountryArticleData: resData.data,
            },
          });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

// special rate and condition apis
export const UpsertSpecialRateAndCondition = (payload: any, callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall
      (
        Utils.EndPoint.UpsertSpecialRateAndCondition,
        payload,
        (response) => {
          const { data } = response;
          callback(data);
          //dispatch an action here if needed
          dispatch(
            {
              type: Utils.actionName.UpsertSpecialRateAndConditionsIncomeTypes,
              payload: [...payload]
            }
          )
        },
        (err) => {
          errorCallback({ message: "Some erro occured while saving", payload: err });
        }
      )
    // dispatch(
    //   {
    //     type:Utils.actionName.PosteSubstantialUsPassiveNFE,
    //     payload: [...values]
    //   }
    // )
  }
}
export const GetSpecialRateAndCondition = (AccountHolderId: number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetSpecialRateAndCondition,
      `?accountHolderId=${AccountHolderId}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "GetSpecialRateAndCondition from action", AccountHolderId)
          // await dispatch({
          //   type: Utils.actionName.GetSecurityQuestion,
          //   payload: {
          //     CountryArticleData: resData.data,
          //   },
          // });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};


export const UpsertSaveAndExitCreds = (payload: any, callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall
      (
        Utils.EndPoint.UpsertSaveAndExitCreds,
        payload,
        (response) => {
          const { data } = response;
          callback(data);
          //dispatch an action here if needed
          // dispatch(
          //   {
          //     type: Utils.actionName.UpsertSaveAndExitCreds,
          //     payload: [...payload]
          //   }
          // )
        },
        (err: any) => {
          errorCallback({ message: "Some erro occured while saving", payload: err.data });
        }
      )
    // dispatch(
    //   {
    //     type:Utils.actionName.PosteSubstantialUsPassiveNFE,
    //     payload: [...values]
    //   }
    // )
  }
}

export const GetSecurityQuestion = (AccountHolderId: number, callback: Function): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetSecurityQuestion,
      `?accountHolderId=${AccountHolderId}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "GetSecurityQuestion from action", AccountHolderId)
          // await dispatch({
          //   type: Utils.actionName.GetSecurityQuestion,
          //   payload: {
          //     CountryArticleData: resData.data,
          //   },
          // });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const GetConfirmationCode = (AccountHolderId: number, SecurityAnswer: string, callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetConfirmationCode,
      `?accountHolderId=${AccountHolderId}&securityAnswer=${SecurityAnswer}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "GetConfirmationCode from action", AccountHolderId)
          // await dispatch({
          //   type: Utils.actionName.GetSecurityQuestion,
          //   payload: {
          //     CountryArticleData: resData.data,
          //   },
          // });
          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
        errorCallback(error.data)
      }
    );
  };
};

export const InsertConfirmationCode = (payload: any, callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall
      (
        Utils.EndPoint.InsertConfirmationCode,
        payload,
        (response) => {
          const { data } = response;
          callback(data);
          //dispatch an action here if needed
        },
        (err) => {
          errorCallback({ message: "Some erro occured while saving", payload: err });
        }
      )
  }
}

// AHD IncomeReportDescription
// /AccountHolderDetail/GetIncomeReportDescription?accountHolderId=1
export const GetIncomeReportDescription = (AccountHolderId: number, callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetIncomeReportDescription,
      `?accountHolderId=${AccountHolderId}`,
      async (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data, "GetIncomeReportDescription from action", AccountHolderId)

          if (callback) {
            callback(resData.data);
          }
        } else {
        }
      },
      (error: any) => {
        errorCallback(error.data)
      }
    );
  };
};

export const UpsertIncomeReportDescription = (payload: any, callback: Function, errorCallback: Function = (err: any) => { console.log(err) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall
      (
        Utils.EndPoint.UpsertIncomeReportDescription,
        payload,
        (response) => {
          const { data } = response;
          callback(data);
          //dispatch an action here if needed
        },
        (err) => {
          errorCallback({ message: "Some error occured while saving", payload: err });
        }
      )
  }
}



//Form 8233 post request
export const post8233_EForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertForm8233IndividualNonUSForm,
      convertToFormData(value),
      (responseData) => {
        let { data } = responseData;
        //console.log("Form 8233 Response Data",responseData);
        dispatch({
          type: Utils.actionName.InsertForm8233IndividualNonUSForm,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};


export const getSupportingDocument = (AccountHolderId: number, FormTypeId: number): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetSupportingDocumentation,
      `?AccountHolderId=${AccountHolderId}&FormTypeId=${FormTypeId}`,
      async (resData) => {
        const { data } = resData;

        const newData = data.map((doc: any) => ({
          ...doc,
          action: 1, // Update the 'action' key to 1
        }));
        // setExistingDoc(newData);


        localStorage.setItem("supportingDocuments", JSON.stringify(newData));

        // if (resData.status === 200) {
        //   dispatch({
        //     type: Utils.actionName.GetAllHelpVideosDetails,
        //     payload: {
        //       GethelpData: resData.data,
        //     },
        //   });
        // }
        //console.log(data);
      },
      (error: any) => {
        console.log(error)
      }
    );
  };
};

export const post8233_EForm_Documentation = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.UpsertSupportingDocumentation,
      convertToFormData(value),
      (responseData) => {
        let { data } = responseData;
        //console.log("Form 8233 Response Data",responseData);
        dispatch({
          type: Utils.actionName.UpsertSupportingDocumentation,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};


export const getSupportedFile = (storageName: number, FolderName: string): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.getSupportedFile,
      `?storagename=${storageName}&subFolder=${FolderName}`,
      async (resData) => {
        const { data } = resData;
        const link = document.createElement('a');
        link.href = data;
        link.target = "_blank";
        link.download = new Date().toString();

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        //localStorage.setItem("supportingDocuments", JSON.stringify(newData));

        // if (resData.status === 200) {
        //   dispatch({
        //     type: Utils.actionName.GetAllHelpVideosDetails,
        //     payload: {
        //       GethelpData: resData.data,
        //     },
        //   });
        // }
        //console.log(data);
      },
      (error: any) => {
        console.log(error)
      }
    );
  };
};


export const postW81MY_EForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertW81MYEntityNonForm,
      convertToFormData(value),
      (responseData) => {
        let { data } = responseData;
        //console.log("Form 8233 Response Data",responseData);
        dispatch({
          type: Utils.actionName.InsertW8IMYEntityNonForm,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};
//GetFederalTaxClassification
export const getIGA = (callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetIGA,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetIGA,
            payload: {
              allIGAData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
};

export const getFederalTax = (callback: any = () => { console.log("") }): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetFederalTaxClassification,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.actionName.GetFederalTaxClassification,
            payload: {
              FederalData: resData.data,
            },
          });

        } else {
        }
      },
      (error: any) => {
      }
    );
  };
}

export const postW81MY_EForm_AccountStatement = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.UpsertAccountHolderWithholdingStatement,
      convertToFormData(value),
      (responseData) => {
        let { data } = responseData;
        //console.log("Form 8233 Response Data",responseData);
        dispatch({
          type: Utils.actionName.UpsertAccountHolderWithholdingStatement,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};

export const getAllAccountStatement = (accountHolderId: number, formTypeId: number): any => {
  return (dispatch: any) => {
    Utils.api.getApiCall(
      Utils.EndPoint.GetAccountHolderWithholdingStatement,
      `?AccountHolderId=${accountHolderId}&FormTypeId=${formTypeId}`,
      async (resData) => {
        const { data } = resData;
        

        if (resData.status === 200) {
          dispatch({
            type: Utils.actionName.getAllAccountStatement,
            payload: {
              getAllAccountStatementdata: resData.data,
            },
          });
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  };
};

export const postSCIndividualEForm = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.InsertCaymanIndividualNonUS,
    convertToFormData(value),
      // value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.InsertCaymanIndividualNonUS,
          payload: { ...value,renouncementProofFile:"", Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};

export const upsertTaxLiablitySCIndividual = (value: any, callback: Function, errorCallback: Function = (error: any) => { console.log(error) }): any => {
  return (dispatch: any) => {
    Utils.api.postApiCall(
      Utils.EndPoint.UpsertTaxLiabilityinanyOtherJurisdictions,
    convertToFormData(value),
      // value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.actionName.UpsertTaxLiabilityinanyOtherJurisdictions,
          payload: { ...value, Response: data },
        });
        if (responseData) {
          if (responseData.status == 500) {
            let err: ErrorModel = {
              statusCode: 500,
              message: responseData.error,
              payload: responseData
            }
            dispatch({
              type: Utils.actionName.UpdateError,
              payload: { ...err },
            });
            errorCallback({ message: "Internal server error occured", payload: responseData })
          } else {
            if (callback) {
              callback();
            }
          }
        }
      },
      (error: ErrorModel) => {
        console.log(error)
        let err: any = {
          ...error
        }
        dispatch({
          type: Utils.actionName.UpdateError,
          payload: { ...err },
        });
        errorCallback(error)
      },
      "multi"
    );
  };
};