import { Check, Close, ContentCopy } from "@mui/icons-material";
import { Alert, Button, FormControl, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetConfirmationCode, GetSecurityQuestion } from "../../../Redux/Actions";
import GlobalValues from "../../../Utils/constVals";
import useAuth from "../../../customHooks/useAuth";

const textStyle = {
    color: "gray",
    fontWeight: 500
}
const SecurityCodeRecover = ({ setRecoverPassword, hideBack = false }: any) => {

    const { authDetails } = useAuth();

    const [initialValues, setInitialValues] = useState(
        {
            securityWord: "",
            hint: "",
            confirmationCode: ""
        }
    );
    const [payload, setPayload] = useState<any>({});
    const [copying, setCopying] = useState(false);
    const [error, setError] = useState(undefined);


    const dispatch = useDispatch();

    const handleCopyClick = (e: any) => {
        setCopying(true);
        navigator.clipboard.writeText(payload?.confirmationCode);
        document.execCommand('copy');
        e.target.focus();
        setTimeout(() => {
            setCopying(false);
        }, 2000)
    };

    const handleChange = (e: any) => {
        let data = { ...payload };
        data[e.target.name] = e.target.value;
        setPayload(data);
    }

    const handleHint = (e: any) => {
        dispatch(GetSecurityQuestion(authDetails?.accountHolderId, (data: any) => {
            console.log(data, "security question")
            setPayload({ ...payload, hint: data })
        }))
    }

    useEffect(() => { console.log(error, "backend error") }, [error])

    const handleGetConfirmationCode = (e: any) => {
        dispatch(GetConfirmationCode(authDetails?.accountHolderId, payload.securityWord, (data: any) => {
            console.log(data, "security question")
            setPayload({ ...payload, confirmationCode: data })
        }, (err: any) => {
            console.log(err)
            setError(err.error);
            setTimeout(() => {
                setError(undefined);
            }, 2000)
        }

        ))
    }

    return (
        <>
            {error ?
                <Alert icon={<Close fontSize="inherit" />} severity="error" sx={{ marginTop: "10px" }}>
                    {error}
                </Alert> : ""
            }
            <div style={{ padding: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "2vh" }}>

                    <Typography align="left" sx={textStyle}>
                        Security word
                    </Typography>

                    <FormControl className="w-98">
                        <Input
                            style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                width: "80%",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                            }}
                            name="securityWord"
                            id="outlined"
                            onChange={handleChange}
                            value={payload.securityWord}
                        />
                    </FormControl>

                    <Typography align="left" color={"primary"}>
                        <a href="" onClick={(e: any) => { e.preventDefault(); handleHint(e); }} >  Hint?</a>
                    </Typography>


                    <FormControl className="w-98">
                        <Input
                            style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                width: "80%",
                                lineHeight: "36px ",
                                background: "lightgray",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                            }}
                            name="hint"
                            id="outlined"
                            value={payload.hint}
                            onChange={handleChange}
                        />
                        {/* <p className="error">{errors.contactEmail}</p> */}
                    </FormControl>

                    <Typography align="left" sx={textStyle}>
                        Confirmation Code
                    </Typography>

                    <FormControl className="w-98" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        <Input
                            style={{
                                border: " 1px solid #d9d9d9",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "lightgray",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                            }}
                            readOnly={true}
                            name="confirmationCode"
                            id="outlined"
                            onChange={handleChange}
                            value={payload.confirmationCode}
                        />
                        <div className="copyButton" style={{ justifySelf: "center", justifyContent: "center", alignContent: "initial", display: "grid", gridTemplateColumns: "1fr 1fr" }}>


                            <Button variant="text"
                                onClick={(e) => {
                                    handleCopyClick(e);
                                    //setToolInfo("basic")
                                }}>
                                <ContentCopy
                                    style={{ fontSize: "18px", marginTop: "5px", cursor: "pointer" }}
                                />
                            </Button>
                            {copying ?
                                <Alert icon={<Check fontSize="inherit" />} severity="success" >
                                    Copied
                                </Alert> : ""
                            }

                        </div>
                        {/* <p className="error">{errors.contactEmail}</p> */}
                    </FormControl>

                </div >
            </div>
            <div
                style={{
                    display: "grid",
                    justifyContent: "center",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5px",
                }}
            >
                <Button
                    variant="contained"
                    style={{
                        color: "white",
                        width: "50px",
                        justifySelf: "right",
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        //Callback();
                        handleGetConfirmationCode(e);
                    }}
                >
                    Ok
                </Button>
                {!hideBack ? <Button
                    variant="contained"
                    style={{ color: "white", width: "60px", justifySelf: "left" }}
                    onClick={(e) => {
                        e.preventDefault();
                        setRecoverPassword(false);
                        //Callback();
                    }}
                >
                    Back
                </Button> :
                    <></>
                }
            </div>
        </>
    );
};

export default SecurityCodeRecover;
