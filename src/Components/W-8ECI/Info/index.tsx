import React, { useEffect, useState } from "react";
import {
  FormControl,
  Typography,
  Button,
  Input,
  Paper,
  Accordion,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Link,
  Checkbox,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import checksolid from "../../../assets/img/check-solid.png";
import { ExpandMore, Info } from "@mui/icons-material";
import { Formik, Form } from "formik";
import "./index.scss";
import BreadCrumbComponent from "../../reusables/breadCrumb";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../customHooks/useAuth";
import { TinSchema } from "../../../schemas/w8ECI";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTinTypes, GetHelpVideoDetails, getAllStateByCountryId, postW8ECI_EForm } from "../../../Redux/Actions"
import { useDispatch, useSelector } from "react-redux";
// import useAuth from "../../../customHooks/useAuth";
import GlobalValues, { FormTypeId } from "../../../Utils/constVals";
import SaveAndExit from "../../Reusable/SaveAndExit/Index";
import { GetEciPdf } from "../../../Redux/Actions/PfdActions";


export default function Tin(props: any) {
  const { authDetails } = useAuth();
  const obValues = JSON.parse(localStorage.getItem("accountHolderDetails") || "{}");
  const W8ECI = useSelector((state: any) => state.W8ECI);
  const isIndividual = obValues?.businessTypeId == 1;
  const isEntity = obValues?.businessTypeId == 2;

  const [initialValue, setInitialValue] = useState({
    formTypeSelectionId: obValues?.businessTypeId,
    streetNumberName: W8ECI?.streetNumberName ?? obValues.permanentResidentialStreetNumberandName,
    eciUsTinTypeId: W8ECI?.eciUsTinTypeId ?? obValues.taxpayerIdTypeID,
    eciUsTin: W8ECI?.eciUsTin ?? obValues.usTin,
    aptSuite: W8ECI?.aptSuite ?? obValues.permanentResidentialAptSuite,
    cityTown: W8ECI?.cityTown ?? obValues.permanentResidentialCityorTown,
    stateProvinceId: W8ECI?.stateProvinceId ?? obValues.permanentResidentialStateorProvince,
    zipPostalCode: W8ECI?.zipPostalCode ?? obValues.permanentresidentialzippostalcode,
  });

  const LoadData = () => {
    setInitialValue({
      formTypeSelectionId: obValues?.businessTypeId,
      streetNumberName: W8ECI?.streetNumberName ?? obValues.permanentResidentialStreetNumberandName,
      eciUsTinTypeId: W8ECI?.eciUsTinTypeId ?? obValues.taxpayerIdTypeID,
      eciUsTin: W8ECI?.eciUsTin ?? obValues.usTin,
      aptSuite: W8ECI?.aptSuite ?? obValues.permanentResidentialAptSuite,
      cityTown: W8ECI?.cityTown ?? obValues.permanentResidentialCityorTown,
      stateProvinceId: W8ECI?.stateProvinceId ?? obValues.permanentResidentialStateorProvince,
      zipPostalCode: W8ECI?.zipPostalCode ?? obValues.permanentresidentialzippostalcode,
    })
  }

  const history = useNavigate();
  const [expanded, setExpanded] = React.useState<string | false>("");
  const dispatch = useDispatch();
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [toolInfo, setToolInfo] = useState("");
  const [ustinArray, setUStinArray] = useState([]);
  const [ustinValue, setUStinvalue] = useState([]);


  const GetStateByCountryIdReducer = useSelector(
    (state: any) => state.GetStateByCountryIdReducer
  );
  const onChangeSingle = (e: any, setFieldValue: any) => {
    console.log(e.target.value)
    if (e.target.value == 2) {
      setFieldValue('eciUsTin', obValues.usTin)
    }
    else {
      setFieldValue('eciUsTin', "")
    }
  };

  const viewPdf = () => {
    history("/w8Eci_pdf", { replace: true });
  }

  useEffect(() => {
    document.title = "Steps | ECI Mandatory Information"
  }, [])

  useEffect(() => {
    dispatch(
      getTinTypes(authDetails?.agentId, (data: any) => {
        console.log(data)
        setUStinArray(data);
        let datas = data.filter((ele: any) => {
          return (isIndividual ? ele.nonUSIndividual === true : isEntity ? ele.nonUSEntity == true : false);
        });
        setUStinvalue(datas);
        LoadData()
      })
    );
  }, [authDetails])

  useEffect(() => {
    dispatch(getAllStateByCountryId(258));
    dispatch(GetHelpVideoDetails());
  }, []);

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [payload, setPayload] = useState({ eciUsTin: "" })
  const formatTin = (e: any, values: any): any => {
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 3) {
      setPayload({ ...payload, eciUsTin: payload.eciUsTin + "-" });
      values.eciUsTin = values.eciUsTin + "-";
    }
    if (e.target.value.length === 6) {
      setPayload({ ...payload, eciUsTin: payload.eciUsTin + "-" });
      values.eciUsTin = values.eciUsTin + "-";
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={TinSchema}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
        onSubmit={(values, { setSubmitting }) => {
          let temp =
          {
            ...values,
            agentId: authDetails?.agentId,
            accountHolderBasicDetailId: authDetails?.accountHolderId,
          };
          setSubmitting(true);

          const returnPromise = new Promise((resolve, reject) => {
            dispatch(postW8ECI_EForm(
              temp,
              (data: any) => {
                resolve(data);
                localStorage.setItem("PrevStepData", JSON.stringify(temp));
              },
              (err: any) => {
                reject(err);
              }
            ));
          });

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
          submitForm,
          setFieldValue,
          isValid,

        }) => (
          <Form onSubmit={handleSubmit}>
            <section
              className="inner_ncontent"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
              <>{console.log("values", values, "errors", errors)}</>
              <div className="overlay-div">
                <div className="overlay-div-group">
                  <div className="viewInstructions">View Instructions</div>
                  <div className="viewform" onClick={() => {
                    dispatch(GetEciPdf(authDetails?.accountHolderId))
                  }}>View Form</div>
                  <div className="helpvideo">
                    {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
                    {GethelpData && GethelpData[5].id === 7 ? (
                      <a
                        href={GethelpData[5].fieldValue}
                        target="popup"
                        onClick={() =>
                          window.open(
                            GethelpData[5].fieldValue,
                            'name',
                            `width=${GethelpData[5].width},height=${GethelpData[5].height},top=${GethelpData[5].top},left=${GethelpData[5].left}`
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
              <div className="row w-100">
                <div className="col-4">
                  <div style={{ padding: "20px 0px", height: "100%" }}>
                    <BreadCrumbComponent breadCrumbCode={1202} formName={FormTypeId.W8ECI} />
                  </div>
                </div>
                <div className="col-8 mt-3">
                  <div style={{ padding: "12px" }}>
                    <Paper style={{ padding: "18px" }}>
                      <Typography
                        align="left"
                        style={{
                          margin: "10px",
                          fontSize: "27px",
                          fontWeight: "550",
                        }}
                      >
                        ECI Mandatory Information
                      </Typography>
                      <Typography
                        align="left"
                        style={{ margin: "13px", fontSize: "19px" }}
                      >
                        Please Provide your U.S. TIN
                      </Typography>

                      <div className="mt-3">
                        <div
                          style={{
                            margin: "7px",
                            display: "flex",
                            marginTop: "25px",
                            justifyContent: "space-between",
                          }}
                          className="row col-12"
                        >
                          <div className="col-4">
                            <Typography>
                              U.S. TIN Type
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <select
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              name="eciUsTinTypeId"
                              id="Income"
                              defaultValue={0}

                              onChange={(e) => { handleChange(e); onChangeSingle(e, setFieldValue) }}
                              // onBlur={handleBlur}
                              value={values.eciUsTinTypeId}
                            >

                              <option value={0}>---select---</option>
                              {ustinValue?.map((ele: any) => (
                                // ele?.nonUSIndividual &&
                                //   values?.isUSIndividual == "no" ||
                                // ele?.usIndividual &&
                                //   values?.isUSIndividual == "Yes" ?
                                // (
                                <option
                                  key={ele?.taxpayerIdTypeID}
                                  value={ele?.taxpayerIdTypeID}
                                >
                                  {ele?.taxpayerIdTypeName}
                                </option>
                                // ) : (
                                //   ""
                                // );
                              ))}
                            </select>
                            <p className="error">
                              {touched?.eciUsTinTypeId ? errors.eciUsTinTypeId?.toString() : ""}
                            </p>
                          </div>

                          <div className="col-4">
                            <Typography>
                              U.S. TIN <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              disabled={
                                values.eciUsTinTypeId == 0 ||
                                values.eciUsTinTypeId == 1 ||
                                values.eciUsTinTypeId == 7 ||
                                values.eciUsTinTypeId == 8
                              }
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              id="outlined"
                              name="eciUsTin"
                              placeholder="Enter U.S. TIN"
                              onKeyDown={(e) => formatTin(e, values)}
                              onChange={handleChange}
                              inputProps={{ maxLength: 11 }}
                              // onBlur={handleBlur}
                              error={Boolean(errors.eciUsTin)}
                              value={values.eciUsTin}
                            />
                            {/* <p className="error">{errors.eciUsTin}</p> */}
                          </div>
                          <div className="col-4"></div>
                        </div>
                        <Typography
                          align="left"
                          style={{
                            fontSize: "18px",
                            marginLeft: "18px",
                            marginTop: "2rem",
                          }}
                        >
                          Please Provide your Business Address in the United
                          States
                        </Typography>
                        <div
                          style={{
                            margin: "7px",
                            display: "flex",
                            marginTop: "25px",
                            justifyContent: "space-between",
                          }}
                          className="row col-12"
                        >
                          <div className="col-4">
                            <Typography style={{ fontSize: "17px" }}>
                              Street Number and Name:{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              id="outlined"
                              name="streetNumberName"
                              placeholder="Enter Street Number and Name"
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              error={Boolean(touched?.streetNumberName && errors.streetNumberName)}
                              value={values.streetNumberName}
                            />
                            {touched?.streetNumberName && errors?.streetNumberName ? <p className="error">{errors.streetNumberName as string}</p> : null}
                          </div>

                          <div className="col-4">
                            <Typography>Apt/Suite: </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              id="outlined"
                              name="aptSuite"
                              placeholder="Enter Apt/Suite"
                              onChange={handleChange}
                              value={values.aptSuite}
                            />
                          </div>
                          <div className="col-4">
                            <Typography>
                              City or Town:{" "}
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              id="outlined"
                              name="cityTown"
                              placeholder="Enter City or Town"
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              error={Boolean(touched.cityTown && errors.cityTown)}
                              value={values.cityTown}
                            />
                            {touched.cityTown && errors.cityTown ? <p className="error">{errors.cityTown as string}</p> : null}
                          </div>
                        </div>
                        <div
                          style={{
                            margin: "10px",
                            display: "flex",
                            marginTop: "25px",
                            justifyContent: "space-between",
                          }}
                          className="row col-12" >
                          <div className="col-4">
                            <Typography>
                              State or Province:
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <FormControl className="w-100">
                              <select
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "50px",
                                  width: "100%",
                                }}
                                name="stateProvinceId"
                                // id="Income"
                                onChange={handleChange}
                                // onBlur={handleBlur}
                                value={values.stateProvinceId}
                              >
                                <option value="0">
                                  <em>---select---</em>
                                </option>
                                {GetStateByCountryIdReducer?.allCountriesStateIdData?.map(
                                  (ele: any) => (
                                    <option
                                      key={ele?.id}
                                      value={ele?.id}
                                    >
                                      {ele?.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </FormControl>





                            {/* <Input
                              // disabled={
                              //   values.stateProvinceId == 0
                              // }
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              // id="outlined"
                              name="stateProvinceId"
                              placeholder="Enter State or Province"
                              type="text"
                              value={values.stateProvinceId}
                              // onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(errors.stateProvinceId)}
                            /> */}

                          </div>

                          <div className="col-4">
                            <Typography>
                              Zip or Postal Code:
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "50px",
                                width: "100%",
                              }}
                              id="outlined"
                              name="zipPostalCode"
                              placeholder="Enter Zip or Postal Code"
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              error={Boolean(touched.zipPostalCode && errors.zipPostalCode)}
                              value={values.zipPostalCode}
                            />
                            {touched.zipPostalCode && errors.zipPostalCode ? <p className="error">{errors.zipPostalCode as string}</p> : null}
                          </div>
                          <div className="col-4"></div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "80px",
                        }}
                      >
                        <SaveAndExit
                          Callback={
                            () => {
                              submitForm().then((data) => {
                                const prevStepData = JSON.parse(
                                  localStorage.getItem("PrevStepData") || "{}"
                                );
                                const urlValue =
                                  window.location.pathname.substring(1);
                                dispatch(
                                  postW8ECI_EForm(
                                    {
                                      ...prevStepData,
                                      ...values,
                                      stepName: `/${urlValue}`,
                                    },
                                    () => {
                                      history(GlobalValues.basePageRoute);
                                    }
                                  )
                                );
                              }).catch((error) => {
                                console.log(error);
                              })
                            }
                          }
                          formTypeId={FormTypeId.W8ECI}
                        >
                        </SaveAndExit>
                        <Button
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            dispatch(GetEciPdf(authDetails?.accountHolderId))
                          }}
                        >
                          View Form
                        </Button>
                        <Button
                          // type="submit"
                          disabled={!isValid}
                          onClick={() => {
                            submitForm().then((data) => {
                              history("/W-8ECI/Tax_Purpose");
                            }).catch((error) => {
                              console.log(error);
                            })
                          }}
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                        >
                          Continue
                        </Button>
                      </div>
                      <Typography
                        align="center"
                        style={{
                          color: "#505E50",
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
                            history("/Certificates");
                          }}
                          variant="contained"
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
                    </Paper>
                  </div>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
}
