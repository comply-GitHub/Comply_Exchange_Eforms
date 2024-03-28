import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Input,
  Paper,
  Select,
  MenuItem,
  Tooltip,
  Link,
  SelectChangeEvent
} from "@mui/material";
import { Info, DeleteOutline } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {GetHelpVideoDetails, CREATE_8233 , GetAgentDocumentationMandatoryForEformAction} from "../../../Redux/Actions";
import { useDispatch,useSelector } from "react-redux";
import BreadCrumbComponent from "../../reusables/breadCrumb";

export default function Tin(props: any) {
  const getFirstDocData = useSelector((state:any) => state.form8233);

  const [incomeArr, setIncomeArr] = useState<string[]>([]);
  const initialValue = {
    sufficientFactToJustfyExemptionForClaim12A_13: (getFirstDocData?.statementToForm8233_FileUpoad ? getFirstDocData?.statementToForm8233_FileUpoad : ""),
    additinalDocument1ID: 0,
    additinalDocument1Name: "",
    additinalDocument2ID: 0,
    additinalDocument2Name: "",
    additinalDocument3ID: 0,
    additinalDocument3Name: "",
    additinalDocument4ID: 0,
    additinalDocument4Name: "",
    additinalDocument5ID: 0,
    additinalDocument5Name: "",
    additinalDocument6ID: 0,
    additinalDocument6Name: "",
    additinalDocument7ID: 0,
    additinalDocument7Name: "",
    additinalDocument8ID: 0,
    additinalDocument8Name: "",
    additinalDocument9ID: 0,
    additinalDocument9Name: "",
    additinalDocument10ID: 0,
    additinalDocument10Name: "",
  };
  // statementToForm8233_FileUpoad
  const addIncomeType = () => {
    if (incomeArr.length < 10) {
      setIncomeArr([...incomeArr, ""]);
    } else {
      
    }
  };

  // useEffect(()=>{
  //   document.title = ""
  // },[])

  useEffect(() => {
    dispatch(GetAgentDocumentationMandatoryForEformAction());
    dispatch(GetHelpVideoDetails());
  }, []);

  const handleDelete = (indexToDelete: number) => {
    const updatedIncomeArr = [...incomeArr];
    updatedIncomeArr.splice(indexToDelete, 1);
    setIncomeArr(updatedIncomeArr);
  };
  const GetAgentDocumentationMandatoryForEformReducer = useSelector(
    (state: any) => state.GetAgentDocumentationMandatoryForEformReducer
  );

  const history = useNavigate();
  const dispatch = useDispatch();
  const [tax, setTax] = useState<string>("");

  const [submit, setSubmit] = useState<string>("1");

  const handleFile = (event: SelectChangeEvent<string>) => {
    const selectedSubmit = event.target.value;
    setSubmit(selectedSubmit);
  };

  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };

  const [toolInfo, setToolInfo] = useState("");
  console.log(getFirstDocData,"getFirstDocData")
  return (
    <>
      <Formik
      validateOnChange={false}
      validateOnBlur={false}
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          dispatch(
            CREATE_8233(values, () => {
              history(
                "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification"
              );
            })
          );
          history(
            "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification"
          );
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
               <div className="overlay-div">
            <div className="overlay-div-group">
                <div className="viewInstructions">View Instructions</div>
                <div className="viewform">View Form</div>
                <div className="helpvideo"> 
                
                {GethelpData && GethelpData[9].id === 12 ? (
  <a
    href={GethelpData[9].fieldValue}
    target="popup"
    onClick={() =>
      window.open(
        GethelpData[9].fieldValue,
        'name',
        `width=${GethelpData[9].width},height=${GethelpData[9].height},top=${GethelpData[9].top},left=${GethelpData[9].left}`
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
<div className="row w-100 h-100">
        <div className="col-4">
          <div style={{ padding: "15px 0px",height:"100%" }}>
          <BreadCrumbComponent breadCrumbCode={1362} formName={2}/>
      </div>
      </div>
      <div className="col-8 mt-3">

              <div style={{ padding: "9px" }}>
                <Paper style={{ padding: "10px" }}>
                  <Typography
                    align="left"
                    style={{
                      margin: "10px",
                      fontSize: "27px",
                      fontWeight: "550",
                    }}
                  >
                    Attach Supporting Documentation
                    <span>
                      <Tooltip
                        style={{ backgroundColor: "black", color: "white" }}
                        title={
                          <>
                            <Typography color="inherit">
                              8233 Supporting Documentation
                            </Typography>
                            <a onClick={() => setToolInfo("basic")}>
                              <Typography
                                style={{
                                  cursor: "pointer",
                                  textDecorationLine: "underline",
                                }}
                                align="center"
                              >
                                {" "}
                                View More...
                              </Typography>
                            </a>
                          </>
                        }
                      >
                        <Info
                          style={{
                            color: "#ffc107",
                            fontSize: "16px",
                            cursor: "pointer",
                            verticalAlign: "super",
                          }}
                        />
                      </Tooltip>
                    </span>
                  </Typography>
                  {toolInfo === "basic" ? (
                    <div>
                      <Paper
                        style={{
                          backgroundColor: "#dedcb1",
                          padding: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <Typography>
                          8233 Attach Supporting Documentation
                        </Typography>

                        <Typography style={{ marginTop: "10px" }}>
                          8233 Attach Supporting Documentation
                        </Typography>

                        <Link
                          href="#"
                          underline="none"
                          style={{ marginTop: "10px", fontSize: "16px" }}
                          onClick={() => {
                            setToolInfo("");
                          }}
                        >
                          --Show Less--
                        </Link>
                      </Paper>
                    </div>
                  ) : (
                    ""
                  )}

                  <Typography
                    align="left"
                    style={{ margin: "10px", fontSize: "17px" }}
                  >
                    There are no mandatory documents required for this
                    submission
                  </Typography>

                  <Typography
                    style={{
                      margin: "10px",
                      fontSize: "22px",
                      fontWeight: "550",
                    }}
                  >
                    Add Additional Documentation
                  </Typography>

                  <div
                    style={{
                      margin: "10px",
                      display: "flex",
                      marginTop: "25px",
                      justifyContent: "space-between",
                    }}
                    className="row col-12"
                  >
                    <div className="col-4">
                      <select
                        name="usTinTypeId"
                        style={{
                          border: " 1px solid #d9d9d9 ",
                          padding: " 0 10px",
                          color: "#121112",
                          fontStyle: "italic",
                          height: "38px",
                          width: "100%",
                        }}
                      >
                        <option value="">---select---</option>
                        {GetAgentDocumentationMandatoryForEformReducer.GetAgentDocumentationMandatoryForEformData?.map(
                                (ele: any) => (
                                  <option key={ele?.id} value={ele?.id}>
                                    {ele?.name}
                                  </option>
                                )
                              )}
                      </select>
                    </div>

                    <div className="col-8">
                      <Select
                        value={submit}
                        name="taxTreaty_TreatyId"
                        // value={values.}
                        onBlur={handleBlur}
                        onChange={handleFile}
                       
                        style={{
                          minWidth: "140px",
                          height: "37px",
                          marginRight: "10px",
                          fontSize:"12px"
                        }}
                      >
                        <MenuItem value="1">Keep Existing</MenuItem>
                        <MenuItem value="2">Upload:</MenuItem>
                        <MenuItem value="3">Remove</MenuItem>
                      </Select>

                      {submit === "2" && (
                        <Input style={{ fontSize: "12px" }} type="file" />
                      )}
                      <span className="my-auto text mx-2">
                        <a>View..</a>
                      </span>
                    </div>
                    <div className="col-3"></div>
                  </div>
                  {incomeArr.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px",
                        display: "flex",
                        marginTop: "25px",
                        justifyContent: "space-between",
                      }}
                      className="row col-12"
                    >
                      <div className="col-4">
                        <select
                          name="usTinTypeId"
                          style={{
                            border: " 1px solid #d9d9d9 ",
                            padding: " 0 10px",
                            color: "#121112",
                            fontStyle: "italic",
                            height: "37px",
                            width: "100%",
                          }}
                        ></select>
                      </div>

                      <div className="col-4">
                        <Input
                          style={{ fontSize: "12px", border: "none" }}
                          type="file"
                        />
                      </div>
                      <div className="col-4">
                        <DeleteOutline
                          onClick={() => handleDelete(index)}
                          style={{ color: "red", fontSize: "30px" }}
                        />
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      margin: "10px",
                      marginLeft: "20px",
                      marginTop: "1rem",
                    }}
                  >
                    <Button
                      onClick={addIncomeType}
                      variant="contained"
                      style={{ backgroundColor: "black" }}
                    >
                      Add Additional Documentation
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "5rem",
                    }}
                  >
                    <Button variant="contained" style={{ color: "white" }}>
                      SAVE & EXIT
                    </Button>
                    <Button
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      View Form
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      Continue
                    </Button>
                  </div>
                  <Typography
                    align="center"
                    style={{
                      color: "#adadac",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    Do you want to go back?
                  </Typography>
                  <Typography align="center">
                    <Button
                    onClick={()=>{
                      history("/Form8233/TaxPayer_Identification/Owner/Claim_part")
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