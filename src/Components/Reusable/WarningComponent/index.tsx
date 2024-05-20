import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Infoicon from "../../../assets/img/info.png";
import useAuth from '../../../customHooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../Utils';

const WarningCompoenet = ({ warningCode, warningMessage, formTypeId }: any) => {

    const { authDetails } = useAuth();
    const dispatch = useDispatch()

    const Warnings: any[] = useSelector((state: any) => state?.Warnings);

    useEffect(() => {
        console.log("warning comp", authDetails?.accountHolderId)
        if (authDetails?.accountHolderId) {
            const newPayload = {
                formTypeId,
                accountHolderBasicDetailId: authDetails?.accountHolderId,
                warningCode,
                warningMessage
            }
            dispatch(
                {
                    type: Utils.actionName.UpdateWarnings,
                    payload: newPayload
                }
            )
        }
    }, [warningCode, warningMessage, formTypeId, authDetails?.accountHolderId])


    return (
        <div
            style={{
                backgroundColor: "#e8e1e1",
                padding: "10px",
            }}
        >
            <Typography>
                {warningCode}
                <span className="mx-2">
                    <img
                        src={Infoicon}
                        style={{
                            color: "#ffc107",
                            height: "22px",
                            width: "20px",
                            boxShadow: "inherit",

                            cursor: "pointer",
                            marginBottom: "3px",
                        }}
                    />
                    {warningMessage}
                </span>
            </Typography>
        </div>
    )
}

export default WarningCompoenet