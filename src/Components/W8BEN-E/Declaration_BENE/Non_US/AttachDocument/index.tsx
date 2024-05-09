import React, { useEffect, useState } from 'react'
import AttachDocument from '../../../../AttachDocument';
import useAuth from '../../../../../customHooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetBenEPdf } from '../../../../../Redux/Actions/PfdActions';
import GlobalValues, { FormTypeId } from '../../../../../Utils/constVals';
import { post8233_EForm_Documentation,postW8BEN_EForm } from '../../../../../Redux/Actions';

const AttachDocumentW9 = () => {

    const { authDetails } = useAuth();
    const dispatch = useDispatch();
    const history = useNavigate();
   
    const [initialValues, setInitialValues] = useState({});

   

    const continueFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const temp = {
           
            accountHolderDetailsId: authDetails?.accountHolderId,
            agentId: authDetails?.agentId,
            formTypeId: FormTypeId.BENE,
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
    const handleBackRoute = () => {
        const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
        if (PrevStepData?.isClaimTreaty === "no" || PrevStepData?.isClaimTreaty === false) {
            return "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E"
            
        } else {
           return "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE"
            
        }
    }
    const saveAndExitFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
        const urlValue = window.location.pathname.substring(1);
        dispatch(postW8BEN_EForm(
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
                FormTypeId={FormTypeId.BENE}
                BreadCrumbOrder={1214}
                ContinueRoute='/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE'
                BackRoute={handleBackRoute()}
                
                GetPdf={() => {
                    dispatch(GetBenEPdf(authDetails?.accountHolderId))
                }}
                ContinueFunction={continueFunction}
                SaveAndExitFunction={saveAndExitFunction}
            />
        </div>
    )
}

export default AttachDocumentW9