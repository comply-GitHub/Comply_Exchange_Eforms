import React, { useEffect, useState } from 'react'
import AttachDocument from '../../AttachDocument';
import useAuth from '../../../customHooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetW9Pdf } from '../../../Redux/Actions/PfdActions';
import GlobalValues, { FormTypeId } from '../../../Utils/constVals';
import { GetAccountHolderDisregardedEntity, PostAccountHolderDisregardedEntity, post8233_EForm_Documentation,postW9Form } from '../../../Redux/Actions';

const AttachDocumentW9 = () => {

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
            formTypeId: FormTypeId.W9,
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
        dispatch(postW9Form(
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
                FormTypeId={FormTypeId.W9}
                BreadCrumbOrder={1214}
                ContinueRoute='/US_Purposes/Back/Exemption/Tax/Certificates'
                BackRoute='/US_Purposes/Back/Exemption/Tax'
                GetPdf={() => {
                    dispatch(GetW9Pdf(authDetails?.accountHolderId))
                }}
                ContinueFunction={continueFunction}
                SaveAndExitFunction={saveAndExitFunction}
            />
        </div>
    )
}

export default AttachDocumentW9