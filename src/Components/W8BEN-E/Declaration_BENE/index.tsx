import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Divider, Paper } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.scss";
import { GetHelpVideoDetails, postW8BEN_EForm } from "../../../Redux/Actions"
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../Redux/store";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import { ErrorModel } from "../../../Redux/Actions/errormodel";
import { GetBenEPdf } from "../../../Redux/Actions/PfdActions";
import useAuth from "../../../customHooks/useAuth";
export default function Term() {
  const { authDetails } = useAuth();
  //States
  useEffect(() => {
    document.title="Comply Exchange"
    dispatch(GetHelpVideoDetails());
  }, [])

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );

  const viewPdf = () => {
    history("/w8BenE_pdf", { replace: true });
  }
  const Version =localStorage.getItem("Version");
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const handleSubmit = (isUsSourcedIncome: boolean): Promise<any> => {
    const returnPromise = new Promise((resolve, reject) => {
      const payload = {
        ...prevStepData,
        isUsSourcedIncome
      };
      dispatch(postW8BEN_EForm(
        payload
        ,
        (data: any) => {
          localStorage.setItem("PrevStepData", JSON.stringify(payload));
          resolve(data);
        },
        (err: ErrorModel) => {
          reject(err)
        }
      ))
    });
    return returnPromise;
  }

  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform" onClick={() => {
            dispatch(GetBenEPdf(authDetails?.accountHolderId))
          }}>View Form</div>
          <div className="helpvideo">
            {GethelpData && GethelpData[3].id === 5 ? (
              <a
                href={GethelpData[3].fieldValue}
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  window.open(
                    GethelpData[3].fieldValue,
                    'popupWindow',
                    `width=${GethelpData[3].width},height=${GethelpData[3].height},top=${GethelpData[3].top},left=${GethelpData[3].left}`
                  )
                }}
              >
                Help Video
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="row w-100">
        <div className="col-4">
          <div
            style={{ padding: "20px 0px", height: "100%" }}
          >
            <BreadCrumbComponent breadCrumbCode={1204} formName={3} />
          </div>
        </div>
        <div className="col-8 mt-4">
          <div >
            <div style={{ padding: "6px" }}>
              <Paper elevation={6} style={{ padding: "13px" }}>
                <>
                  <Paper
                    elevation={6}
                    style={{
                      padding: "17px",
                      margin: "10px",
                      backgroundColor: "#e8e1e1",
                    }}
                  >
                    <Typography
                      align="left"
                      style={{ fontWeight: "550", fontSize: "30px" }}
                    >
                      Declaration of no U.S. Sourced Income
                    </Typography>

                    <Typography
                      align="left"
                      style={{ fontSize: "20px", marginTop: "20px" }}
                    >
                      If you are declaring that:
                    </Typography>
                    <Typography align="left" className="text mt-4">
                      You only provide goods and materials{" "}
                      <span style={{ fontWeight: "bold" }}>and</span>
                    </Typography>
                    <Divider className="divider" />
                    <Typography align="left" className="text">
                      Manufacture or production is undertaken entirely outside of
                      the United States and its territories
                    </Typography>
                    <Divider className="divider" />
                    <Typography align="left" className="text">
                      Any associated services provided are also undertaken
                      entirely outside of the United States and its territories
                      and
                    </Typography>
                    <Divider className="divider" />
                    <Typography align="left" className="text">
                      Invoices submitted do not request payment for dividends,
                      Insurance Premiums or Interest payments.
                    </Typography>
                    <Divider className="divider" />

                    <Typography align="left" className="text mt-4">
                      Please read the statement below and if applicable confirm
                      that the statement applies and is true and accurate.
                    </Typography>
                    <Typography align="left" className="text mt-4">
                      If you do manufacture or provide goods, undertake services
                      within the United States or your invoices are requesting
                      payments for Dividends, Insurance Premiums or Interest
                      payments please select "Income List" and you will be
                      provided with a list of income types. You should select all
                      that may apply, answering the associated question and
                      provide an indication of allocation percentage the income
                      type represents. On receipt of invoice we will compare the
                      information given to assist in the calculation of U.S.
                      withholding that may apply. Failure to make the correct
                      declarations may result in the wrong amount withholding
                      taxing place.
                    </Typography>
                  </Paper>
                  <Typography
                    align="left"
                    style={{
                      fontWeight: "550",
                      fontSize: "30px",
                      marginTop: "20px",
                      margin: "10px"
                    }}
                  >
                    Declaration Statement - Declaration of No U.S. Source Income
                  </Typography>
                  <div style={{ margin: "10px" }}>
                    <Typography align="left" className="text mt-2">
                      Under penalties of perjury I confirm that the goods or
                      materials provided or manufactured and any and all associated
                      services, including consultancy, implementation, training or
                      support are undertaken entirely from locations outside of the
                      United States and United States territories. I also confirm
                      that the invoices submitted will not include a request for
                      payment of Dividends, Insurance Premiums or Interest payments.
                    </Typography>
                    <Typography align="left" className="text mt-3">
                      I further confirm that should this situation change I will
                      provide adequate notification, clearly identify items that may
                      be considered gained from U.S. sources, identify any
                      Dividends, Insurance Premiums or Interest payments due on any
                      invoices submitted and submit an updated U.S. source income
                      statement.
                    </Typography>
                  </div>
                </>
              </Paper>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <Button
                size="large"
                variant="contained"
                style={{ color: "white" }}
                onClick={() => {
                  handleSubmit(true).then(() => {
                    history("/BenE/Tax_Purpose_BenE/Declaration_BenE/US/Factors_BenE");
                  })
                }}
              >
                U.S. Sourced Income
              </Button>
              <Button
                onClick={() => {
                  handleSubmit(false).then(() => {
                    history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE");
                  })
                }}
                size="large"
                variant="contained"
                style={{ color: "white", marginLeft: "15px" }}
              >
                No U.S. Sourced Income
              </Button>
            </div>
            <Typography
              align="center"
              style={{
                color: "#f5f5f5",
                //color: "#505E50",  
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              Do you want to go back?
            </Typography>
            <Typography align="center">
              <Button
                onClick={() => {
                  history("/BenE/Tax_Purpose_BenE")
                }}
                variant="contained"
                size="large"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >

                Back
              </Button>
            </Typography>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <footer>
          <div className="row mx-1">
            <Typography
              className="mx-2"
              align="left"
              style={{ marginBottom: "10px", color: "white", fontSize: "14px" }}
            >
              © Comply Exchange Ltd.{new Date().getFullYear()} - Version: {Version} - Render
              Time:8.6691538s
            </Typography>

            <div className="col-12 col-sm-8 col-md-6 col-lg-6 footer_nav">
              <ul className="nav inner_header_right"></ul>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
