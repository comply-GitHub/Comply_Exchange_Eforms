import {
    Alert,
    Box,
    Button,
    FormControl,
    Input,
    Modal,
    Typography,
  } from "@mui/material";
  import { Form, Formik } from "formik";
  // import { MuiOtpInput } from "mui-one-time-password-input";
  import "./index.scss";
  import React, { ReactEventHandler, useEffect, useState } from "react";
  
  import useAuth from "../../../customHooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { GetHelpVideoDetails } from "../../../Redux/Actions";
import View_Insructions from "../../viewInstruction";
import { GetW9Pdf } from "../../../Redux/Actions/PfdActions";
  
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    // border: "2px solid #000",
    //maxWidth: "100%",
    // margin: "2%",
    // fontSize: "1.2rem",
    // overflow: "auto",
    // boxSizing: "border-box",  
  };
  
  
  const SideBar = ({ Callback, formTypeId }: any) => {
    const { authDetails } = useAuth()
    const dispatch = useDispatch();
    const [canvaBx, setCanvaBx] = useState(false);
    const handleCanvaOpen = () => {
      setCanvaBx(true);
    };
    const handleCanvaClose = () => {
      setCanvaBx(false);
    };
    const GethelpData = useSelector(
      (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
    );

    useEffect(() => {
      dispatch(GetHelpVideoDetails());

    },[])
  
  
  
    return (
        <>
        <View_Insructions
        canvaBx={canvaBx}
        handleCanvaClose={handleCanvaClose}
      />
      {canvaBx === true ? (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => {
            handleCanvaClose();
          }}
        ></div>
      ) : null}
      {/* {/ sidebar design end /} */}
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div
            className="viewInstructions"
            onClick={() => {
              handleCanvaOpen();
            }}
          >
            View Instructions
          </div>
          <div className="viewform" onClick={() => {
            dispatch(GetW9Pdf(authDetails?.accountHolderId))
          }}>
            View Form
          </div>
          <div className="helpvideo">
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[8].fieldValue,
                    "name",
                    `width=${GethelpData[8].width},height=${GethelpData[8].height},top=${GethelpData[8].top},left=${GethelpData[8].left}`
                  )
                }
              >
                Help Video
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
        
        </>
        
    );
  };
  
  export default SideBar;
  

