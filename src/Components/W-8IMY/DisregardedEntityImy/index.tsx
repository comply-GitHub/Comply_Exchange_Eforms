import React, { useEffect, useState } from 'react'
import DisregardedEntity from '../../Reusable/DisregardedEntity'
import useAuth from '../../../customHooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetImyPdf } from '../../../Redux/Actions/PfdActions';
import GlobalValues, { FormTypeId } from '../../../Utils/constVals';
import { GetAccountHolderDisregardedEntity, PostAccountHolderDisregardedEntity, postW81MY_EForm } from '../../../Redux/Actions';
import { convertToFormData_ArrayOfObject } from '../../../Helpers/convertToFormData';
import PopupModal from "../../../Redux/Actions/poupModal";
const DisregardedEntityImy = () => {

    const { authDetails } = useAuth();
    const dispatch = useDispatch();
    const history = useNavigate();
    //const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
    //const W8IMY = useSelector((state: any) => state?.W8IMY);
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (authDetails?.accountHolderId) {
            dispatch(GetAccountHolderDisregardedEntity(authDetails?.accountHolderId, FormTypeId.FW81MY, (data: any) => {
                console.log(data)
                setInitialValues({ ...data[0] });
            }))
        }
    }, [authDetails])

    const [popupState, setPopupState] = useState({
        data:"",
        status:false
    })

    const continueFunction = (values: any, successCallback: Function, errorCallback: Function) => {
        const temp = {
            // ...PrevStepData,
            //...W8IMY,
            accountHolderDetailsId: authDetails?.accountHolderId,
            agentId: authDetails?.agentId,
            formTypeId: FormTypeId.FW81MY,
            formEntryId: 0,
            userType: authDetails?.configurations?.userType ?? "GEN",
            ...values
        };

        let temp1 = convertToFormData_ArrayOfObject([temp]);

        dispatch(PostAccountHolderDisregardedEntity(temp1,
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
        dispatch(postW81MY_EForm(
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

            <DisregardedEntity
                InitialValues={initialValues}
                FormTypeId={FormTypeId.FW81MY}
                BreadCrumbOrder={1214}
                ContinueRoute='/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY'
                BackRoute='/IMY/Tax_Purpose_Exp/Chapter4_IMY'
                GetPdf={() => {
                    dispatch(GetImyPdf(authDetails?.accountHolderId, (callbackData:any)=>{
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

export default DisregardedEntityImy