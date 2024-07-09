import React, { useEffect, useState } from 'react'
import AttachDocument from '../../AttachDocument';
import useAuth from '../../../customHooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetExpPdf } from '../../../Redux/Actions/PfdActions';
import GlobalValues, { FormTypeId } from '../../../Utils/constVals';
import { GetAccountHolderDisregardedEntity, PostAccountHolderDisregardedEntity, post8233_EForm_Documentation,postW8EXPForm } from '../../../Redux/Actions';
import PopupModal from "../../../Redux/Actions/poupModal";
const AttachDocumentEXP = () => {

    const { authDetails } = useAuth();
    const dispatch = useDispatch();
    const history = useNavigate();
   
    const [initialValues, setInitialValues] = useState({});

    // useEffect(() => {
    //     if (authDetails?.accountHolderId) {
    //         dispatch(GetAccountHolderDisregardedEntity(authDetails?.accountHolderId, FormTypeId.FW81MY, (data: any) => {
    //             console.log(data)
    //             setInitialValues({ ...data[0] });
    //         }))
    //     }
    // }, [authDetails])

    const continueFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const temp = {
           
            accountHolderDetailsId: authDetails?.accountHolderId,
            agentId: authDetails?.agentId,
            formTypeId: FormTypeId.W8EXP,
            formEntryId: 0,
            userType: authDetails?.configurations?.userType ?? "GEN",
            ...values
        };

       

        dispatch(post8233_EForm_Documentation(temp,
            (data: any) => {
                //localStorage.setItem("PrevStepData", JSON.stringify(temp))
                successCallback(data);
            },
            (err: any) => {
                errorCallback(err);
            }
        ))
    }
    const [popupState, setPopupState] = useState({
        data:"",
        status:false
    })
    
    const saveAndExitFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
        const urlValue = window.location.pathname.substring(1);
        dispatch(postW8EXPForm(
            {
                ...prevStepData,
                stepName: `/${urlValue}`
            }
            ,
            (data: any) => {
                history(GlobalValues.basePageRoute);
                successCallback(data);
            }
            ,
            (err: any) => {
                errorCallback(err);
            }
        ))

    }

    return (
        <div>

            <AttachDocument
                InitialValues={initialValues}
                FormTypeId={FormTypeId.W8EXP}
                BreadCrumbOrder={1267}
                ContinueRoute='/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp'
                BackRoute='/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp'
                GetPdf={() => {
                  
                        dispatch(GetExpPdf(authDetails?.accountHolderId, (callbackData:any)=>{
                          setPopupState({
                              status:true,
                              data: callbackData?.pdf
                          })
                      }))
                
                }}
                ContinueFunction={continueFunction}
                SaveAndExitFunction={saveAndExitFunction}
            />
             <PopupModal data={popupState} setPopupState={setPopupState} />
        </div>
    )
}

export default AttachDocumentEXP