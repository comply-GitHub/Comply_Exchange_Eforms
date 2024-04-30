import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography, Paper, Checkbox, Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ExpandMore } from "@mui/icons-material";
import useAuth from "../../../../../customHooks/useAuth";
import { FormTypeId } from "../../../../../Utils/constVals";
import SideBar from "../../../../Reusable/SideBar";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import { postSCFATCAClassification } from "../../../../../Redux/Actions";
export default function Declaration (props: any){

  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  const CRSData = localStorage.getItem("lastClickedPanelHeading");
  const CRSClassificationData = useSelector((state:any) => state?.CRSEntityReducer?.CRSClassificationData);
  const { authDetails } = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [expandedState, setExpandedState] = React.useState<string | false>("panel1");
  const handleChangeAccodionState = (panel: string, panelHeading: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    if (newExpanded) {
      setExpandedState(panel);
      localStorage.setItem("clickedPanelHeading", panelHeading);
    } else {
      setExpandedState(false);
      localStorage.removeItem("clickedPanelHeading");
    }
  };
  const isContinueEnabled = expandedState !== "panel1";
  const [isAccordionVisible, setIsAccordionVisible] = useState<boolean>(false);
  const initialValue = {
    id:0,
    // agentId: authDetails.agentId,
    // accountHolderBasiacDetailId: authDetails.accountHolderId,
    formTypeId: FormTypeId.CaymanEntity,
    formEntryId:0,
    classificationType : "CRS",
    userType:"SC",
    heading1:CRSClassificationData?.heading1 ? CRSClassificationData?.heading1 : "",
    subHeading1:CRSClassificationData?.subheading1 ? CRSClassificationData?.subheading1 : "",
    heading2:CRSClassificationData?.heading2 ? CRSClassificationData?.heading2 : "",
    subHeading2:CRSClassificationData?.subheading2 ? CRSClassificationData?.subheading2 : "",
    heading3:CRSClassificationData?.heading3 ? CRSClassificationData?.heading3 : "",
    subHeading3:CRSClassificationData?.subheading3 ? CRSClassificationData?.subheading3 : "",
    heading4:CRSClassificationData?.heading4 ? CRSClassificationData?.heading4 : "",
    subHeading4:CRSClassificationData?.subheading4 ? CRSClassificationData?.subheading4 : "",
    heading5:CRSClassificationData?.heading5 ? CRSClassificationData?.heading5 : "",
    subHeading5:CRSClassificationData?.subheading5 ? CRSClassificationData?.subheading5 : "",
    selectedHeading: CRSClassificationData?.selectedHeading ? CRSClassificationData?.selectedHeading : "",
    selectedSubHeading: CRSClassificationData?.selectedSubHeading ? CRSClassificationData?.selectedSubHeading : "",
  };


    useEffect(() => {
      document.title = "CRS Classification"
    }, [])
  return (
    <Fragment>
     <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
     <SideBar/>
      <div className="row w-100">
        <div className="col-4 mt-3">

          <BreadCrumbComponent breadCrumbCode={1330} formName={FormTypeId.CaymanEntity} />
        </div>

        <div className="col-8 mt-3">
         
        <div style={{ padding: "11px" }}>
          <Paper style={{ padding: "10px" }}>
            <Formik
            validateOnChange={true}
            validateOnBlur={true}
              initialValues={initialValue}
              // validationSchema={SubmitSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("values", values)
                setSubmitting(true);
                const result = {
                  agentId: authDetails.agentId,
                  accountHolderDetailsId: authDetails.accountHolderId,
                  ...PrevStepData, 
                  ...values,
                 
                };
                const returnPromise = new Promise((resolve, reject) => {
                dispatch(
                  postSCFATCAClassification(result, (data: any) => {
                    localStorage.setItem("DualCertData", JSON.stringify(result))
                    resolve(data);
                  }
                    , (err: any) => {
                      reject(err);
                    }
                  )
                );
              })
              return returnPromise;

            }}
            >
              {({
                errors,
                touched,
                handleBlur,
                values,
                handleSubmit,
                handleChange,
                isSubmitting,
                setFieldValue,
                submitForm,
                isValid
              }) => (
                <form onSubmit={handleSubmit}>
               <>
                  <div style={{marginTop:"10px",height:"210px",backgroundColor:"#fff"}}>
                  <div style={{justifyContent:"space-between",display:"flex",marginTop:"10px"}}>
                  <Typography
                      align="left"
                      style={{
                        fontSize: "27px",
                        color: "black",
                        fontWeight: "bold",
                        marginLeft:'10px'
                      
                      }}
                    >
                    CRS Classification:
                    </Typography>
                    <Button
                    onClick={() =>{ 
                      history("/Cayman/Entity/CRS/Start")
                    
                   }}
                      style={{ backgroundColor: "#d3ae33",cursor:"pointer",color: "black", fontSize: "12px", fontWeight: "bold" }}
                    >
                    CRS Classification Guide
                    </Button>
                  </div>
                
                   <div style={{marginLeft:"10px",marginTop:"10px",}}>
                 
                  <div className="d-flex mt-3">
                    <Typography style={{fontSize:"19px"}}>Select CRS Classification:</Typography>
                    <Link className="mx-2"   onClick={() =>{ 
                      history("/Cayman/Entity/CRS/Start")
                    
                   }} style={{fontSize:"19px",textDecorationLine:"none",color:"#1149c4",cursor:"pointer"}}>Click Here to start Process</Link>
                  </div>
                   </div>
                   <div className="mt-3 " style={{marginLeft:"10px"}}>
                    <Typography style={{fontSize:"28px",fontWeight:"540"}}>{CRSClassificationData?.selectedHeading}</Typography>
                   </div>
                  </div>
                  
                 </>
            
                 <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",

                    }}
                  >
                   
                    <Button
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" ,fontSize:"12px",}}
                    >
                      View Form
                    </Button>

                    <Button    
                    type="submit"
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" ,fontSize:"12px",}}
                    >
                      Confirm
                    </Button>
                  </div>
            


                
                </form>
           
              )}
            </Formik>
          </Paper>
          </div>
        </div>
   
      </div>
      </section>
    </Fragment>
  );
};


