import Utils from "../../Utils";
import { ErrorModel } from "./errormodel";

const convertAndDownloadPdf = (base64String: string, fileName: string) => {
    try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = base64String;
        link.target = "_blank";
        link.download = fileName;

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);

    } catch (e) {
        console.log("e", e)
    }

}

export const GetW9Pdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetW9Pdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "W9.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetEciPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetECIPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "ECI_Pdf.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetBenPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetBENPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "BEN_Pdf.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetBenEPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetBENEPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "BENE_Pdf.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetExpPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetExpPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "EXP_Pdf.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetImyPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetIMYPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "IMY_Pdf.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetForm8233Pdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetForm8233Pdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "Form8233_Pdf.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};


// dual cert Actions
export const GetW9DCPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetW9DCPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "W9DCIndividual.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetECIDCPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetECIDCPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "ECI-DC.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};

export const GetBENDCPdf = (accountHolderId: number, callback: Function = (data: any) => { console.log(data) }, errorCallback: Function = (error: any) => { console.log(error) }): any => {
    return (dispatch: any) => {
        Utils.api.getApiCall(
            Utils.EndPoint.GetBENDCPdf,
            `?AccountHolderDetailId=${accountHolderId}`,
            // value,
            (responseData) => {
                const { data } = responseData;
                console.log(responseData, "resp data")
                //   dispatch({
                //     type: Utils.actionName.InsertW8ECIIndividualEntityNonUSForm,
                //     payload: { ...value, Response: data },
                //   });
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
                        convertAndDownloadPdf(data?.pdf, "BEN-DC.pdf")
                    }
                }
            },
            (error: any) => {
                let err: ErrorModel = {
                    ...error
                }
                dispatch({
                    type: Utils.actionName.UpdateError,
                    payload: { ...err },
                });
                errorCallback(error)
            },
            false
        );
    };
};