import React, { useEffect, useState } from 'react'
import AttachDocument from '../../../../AttachDocument';
import useAuth from '../../../../../customHooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetBenPdf } from '../../../../../Redux/Actions/PfdActions';
import GlobalValues, { FormTypeId } from '../../../../../Utils/constVals';
import { GetAccountHolderDisregardedEntity, PostAccountHolderDisregardedEntity, post8233_EForm_Documentation,postW8BENForm } from '../../../../../Redux/Actions';

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


    const handleBackRoute = () => {
        const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
        if (PrevStepData?.isClaimTreaty === "no" || PrevStepData?.isClaimTreaty === false) {
            return "/W-8BEN/Declaration/US_Tin/Claim"
            
        } else {
           return "/W-8BEN/Declaration/US_Tin/Rates"
            
        }
    }

    const continueFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const temp = {
           
            accountHolderDetailsId: authDetails?.accountHolderId,
            agentId: authDetails?.agentId,
            formTypeId: FormTypeId.BEN,
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

    const saveAndExitFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
        const urlValue = window.location.pathname.substring(1);
        dispatch(postW8BENForm(
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
                FormTypeId={FormTypeId.BEN}
                BreadCrumbOrder={1260}
                ContinueRoute="/W-8BEN/Declaration/US_Tin/Certificates"
                BackRoute={handleBackRoute()}
                GetPdf={() => {
                    dispatch(GetBenPdf(authDetails?.accountHolderId))
                }}
                ContinueFunction={continueFunction}
                SaveAndExitFunction={saveAndExitFunction}
            />
        </div>
    )
}

export default AttachDocumentEXP