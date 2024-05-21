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
import { GetHelpVideoDetails, GetAgentdocumentTypes, CREATE_8233, GetAgentDocumentationMandatoryForEformAction, post8233_EForm, getSupportingDocument, post8233_EForm_Documentation, getSupportedFile, GetAgentDocumentList } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../reusables/breadCrumb";
import SaveAndExit from "../Reusable/SaveAndExit/Index";
import GlobalValues, { FormTypeId } from "../../Utils/constVals";
import useAuth from "../../customHooks/useAuth";
import { GetForm8233Pdf } from "../../Redux/Actions/PfdActions";
import Redirect from "../../Router/RouterSkip";

interface AttachDocumentProps {
  InitialValues: any,
  FormTypeId: number,
  BreadCrumbOrder: number,
  ContinueRoute: string,
  BackRoute: string,
  GetPdf: Function,
  ContinueFunction: Function,
  SaveAndExitFunction: Function
}

const AttachDocument = ({
  InitialValues,
  FormTypeId,
  BreadCrumbOrder,
  ContinueRoute,
  BackRoute,
  GetPdf,
  ContinueFunction,
  SaveAndExitFunction
}: AttachDocumentProps) => {


  const getFirstDocData = useSelector((state: any) => state.form8233);
  const { authDetails } = useAuth();

  const [incomeArr, setIncomeArr] = useState<string[]>([]);
  const initialValue = {
    sufficientFactToJustfyExemptionForClaim12A_13: (getFirstDocData?.statementToForm8233_FileUpoad ? getFirstDocData?.statementToForm8233_FileUpoad : ""),

  };
  const onBoardingFormValuesPrevStepData = JSON.parse(localStorage.getItem("PrevStepData") ?? "null");

  const addIncomeType = () => {
    if (incomeArr.length < 10) {
      setIncomeArr([...incomeArr, ""]);
    } else {

    }
  };

  useEffect(() => {
    if (authDetails?.agentId) {
      dispatch(GetAgentDocumentList(authDetails?.agentId));



    }
  }, [authDetails])


  useEffect(() => {
    document.title = "Attatch Supporting Documentation"
    dispatch(GetAgentDocumentationMandatoryForEformAction());
    dispatch(GetHelpVideoDetails());
    dispatch(GetAgentdocumentTypes())
  }, []);

  const handleDelete = (indexToDelete: number) => {
    const updatedIncomeArr = [...incomeArr];
    updatedIncomeArr.splice(indexToDelete, 1);
    setIncomeArr(updatedIncomeArr);
  };
  const GetAgentDocumentationMandatoryForEformReducer = useSelector(
    (state: any) => state.GetAgentDocumentationMandatoryForEformReducer
  );

  const GetDocumentData = useSelector((state: any) => state.GetAgentDocumentListReducer);
  console.log(GetDocumentData, "99")
  const history = useNavigate();
  const dispatch = useDispatch();
  const [tax, setTax] = useState<string>("");

  //This code is for action taken on Existing document if any
  const [existingDoc, setExistingDoc] = useState<any[]>([]);
  const [submit, setSubmit] = useState<string>("1");
  const [selectedId, setSelectedId] = useState<string>();




  const [image, setImage] = useState("")
  const handleChangeImg = (event: any) => {
    setImage(event.target.files[0].name)

  }


  const GetDocumentTypesData = useSelector(
    (state: any) => state.GetAgentDocumentListTypesReducer
  );
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };

  const [toolInfo, setToolInfo] = useState("");


  const [docNam, setDocname] = useState("")
  const handleChangeDocument = (event: any) => {
    setDocname(event.target.value)
    setImage("")
  }

  const [additionalDocs, setAdditionalDocs] = useState<any[]>([]);
  const handleAddDocument = () => {
    if (additionalDocs.length < 10) {
      setAdditionalDocs([...additionalDocs, { id: 0, agentId: null, accountHolderDetailsId: null, formTypeId: null, formEntryId: additionalDocs.length + 1, documentTypeId: null, action: null, file: null, fileStorageName: "" }]);
    }
  };
  useEffect(() => {

    const savedFormData = JSON.parse(localStorage.getItem("form8233Data") || "{}");

    setAdditionalDocs(savedFormData.additionalDocs || []);

  }, []);

  const handleDeleteDocument = (index: number) => {
    const updatedDocs = [...additionalDocs];
    updatedDocs.splice(index, 1);
    setAdditionalDocs(updatedDocs);
  };
  const [files, setFiles] = useState<File[]>([]);

  const handleUploadFile = (e: any, index: any) => {
    const file = e.target.files[0];
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handleUpload = (event: any, index: number) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const documentTypeId = GetAgentDocumentationMandatoryForEformReducer.GetAgentDocumentationMandatoryForEformData.filter((item: any) => item.documentationId == docNam)
      const updatedDocs = [...additionalDocs];
      updatedDocs[index].file = files[0];
      updatedDocs[index].agentId = authDetails?.agentId;
      updatedDocs[index].accountHolderDetailsId = authDetails?.accountHolderId;
      updatedDocs[index].formTypeId = FormTypeId;
      updatedDocs[index].documentTypeId = documentTypeId[0]?.documentationId;
      updatedDocs[index].action = 2;
      updatedDocs[index].fileStorageName = docNam;
      setAdditionalDocs(updatedDocs);
    }
  };


  const callAPI = () => {
    const formData = new FormData()
    let obj = {}
    const mergedArray = [...additionalDocs, ...existingDoc];

    mergedArray?.forEach((me, i) => {
      Object.keys(me).forEach((key) => {
        const value = me[key];
        const objectKey = `Data[${i}].${key}`
        obj = { ...obj, [objectKey]: value }


      });

    })

    const temp = {
      obj,
      ...onBoardingFormValuesPrevStepData,
      agentId: authDetails?.agentId,
      accountHolderBasicDetailId: authDetails?.accountHolderId,
      stepName: null,
    };

    dispatch(post8233_EForm_Documentation(obj, () => {
      // history(
      //   "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification"
      // );

    }))


  }


  const handleSubmitFileAndCallAPI = () => {
    const formData = new FormData();
    let obj = {};
    const mergedArray = [...additionalDocs, ...existingDoc];
    const filesPayload = files.map((file, index) => ({
      id: index + 1,
      agentId: GetDocumentData.DocumentListData[index].agentId,
      accountHolderDetailsId: authDetails?.accountHolderId,
      formTypeId: FormTypeId,
      formEntryId: FormTypeId,
      documentTypeId: GetDocumentData.DocumentListData[index].documentationId,
      file: file.name,
      fileStorageName: file.name,
      action: 0
    }));

    mergedArray?.forEach((me, i) => {
      Object.keys(me).forEach((key) => {
        const value = me[key];
        const objectKey = `Data[${i}].${key}`;
        obj = { ...obj, [objectKey]: value };
      });
    });

    const temp = {
      ...obj,
      ...onBoardingFormValuesPrevStepData,
      agentId: authDetails?.agentId,
      accountHolderBasicDetailId: authDetails?.accountHolderId,
      stepName: null,
    };

    const payload = [...filesPayload, temp];

    dispatch(
      post8233_EForm_Documentation(
        payload,
        () => {

          localStorage.setItem("form8233Data", JSON.stringify({ additionalDocs: additionalDocs }));
          // history("/Form8233/TaxPayer_Identification/Owner/Documentaion/certification");
        },
        () => { }
      )
    );
    console.log(payload);
  };



  const [existingDocNew, setExistingDocNew] = useState<String[]>([]);
  const handleChangeExistDocument = (event: any, index: number) => {

    const documentTypeId = GetAgentDocumentationMandatoryForEformReducer.GetAgentDocumentationMandatoryForEformData.filter((item: any) => item.documentationId == event.target.value)
    const updatedDocs = [...existingDoc];
    updatedDocs[index].documentTypeId = documentTypeId[0]?.documentationId;
    setExistingDocNew(updatedDocs);
  }
  const handleUploadExisting = (event: any, index: number) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const documentTypeId = GetAgentDocumentationMandatoryForEformReducer.GetAgentDocumentationMandatoryForEformData.filter((item: any) => item.name?.trim == docNam?.trim)
      const updatedDocs = [...existingDoc];
      updatedDocs[index].file = files[0];
      setExistingDocNew(updatedDocs);
      setDocname("");
    }
  };


  const [selectedOptions, setSelectedOptions] = useState<String[]>([]);
  const handleFile = (event: any, rowId: any) => {
    setSubmit(event);
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[rowId] = event;
    existingDoc[rowId].action = Number(event);
    setSelectedOptions(newSelectedOptions);
  };

  const viewDoc = (strgName: any, folderName: string) => {
    dispatch(getSupportedFile(strgName, folderName))
  }

  useEffect(() => {
    setSelectedOptions(existingDoc?.map(() => "1"));
  }, [existingDoc]);

  useEffect(() => {
    if (authDetails?.accountHolderId !== undefined) {
      dispatch(getSupportingDocument(authDetails?.accountHolderId, FormTypeId))
    }

  }, [authDetails])
  const handleSubmitFile = () => {

    const payload = files.map((file, index) => ({
      id: index + 1,
      agentId: GetDocumentData.DocumentListData[index].agentId,
      accountHolderDetailsId: 0,
      formTypeId: FormTypeId,
      formEntryId: FormTypeId,
      documentTypeId: GetDocumentData.DocumentListData[index].documentationId,

      file: file.name,
      fileStorageName: file.name
    }));

    dispatch(post8233_EForm_Documentation(payload, () => { }, () => { }));
    console.log(payload);
  };



  useEffect(() => {
    if (localStorage?.getItem("supportingDocuments")) {
      const supportingDocumentsString = localStorage.getItem("supportingDocuments");
      const supportingDocuments = supportingDocumentsString ? JSON.parse(supportingDocumentsString) : [];
      setExistingDoc(supportingDocuments);
    }

  }, [localStorage.getItem("supportingDocuments")])
  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        initialValues={initialValue}
        onSubmit={(values, { setSubmitting }) => {
          const returnPromise = new Promise((resolve, reject) => {
            setSubmitting(true);


            ContinueFunction(handleSubmitFileAndCallAPI(),
              () => {
                Redirect(ContinueRoute, authDetails?.agentId, history);
                resolve("success");
              }, (err: any) => {
                reject(err);
              })
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
          submitForm
        }) => (
          <Form onSubmit={handleSubmit}>

            <section
              className="inner_content"
              style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
            >
              <div className="overlay-div">
                <div className="overlay-div-group">
                  <div className="viewInstructions">View Instructions</div>
                  <div className="viewform"
                    onClick={() => {
                      GetPdf();
                    }}>View Form</div>
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
              <div className="row w-100">
                <div className="col-4">
                  <div style={{ padding: "15px 0px", height: "100%" }}>
                    <BreadCrumbComponent
                      breadCrumbCode={BreadCrumbOrder}
                      formName={FormTypeId}
                    />
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
                            <Typography style={{ fontSize: "12px" }}>
                              Please see below for the supporting documentation types that may be required to be submitted along with your tax form.
                            </Typography>

                            <Typography style={{ marginTop: "10px", fontSize: "12px" }}>
                              To add a piece of supporting documentation different to those listed, please click 'Add Additional Documentation' and make your selection there.
                            </Typography>

                            <Link
                              href="#"
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px", color: "#0000C7" }}
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
                      {GetDocumentData?.DocumentListData?.map((document: any, index: any) => (
                        <>        <div className="d-flex mt-3 mx-3" style={{ justifyContent: "space-between" }} key={index}>
                          <div>
                            <Typography style={{ fontWeight: "500" }}>{document.name}</Typography>
                            <Typography style={{ fontSize: "12px" }}>{document.documentDetails}</Typography>
                          </div>
                          <div>
                            <Input type="file" onChange={(e) => handleUploadFile(e, index)} style={{ fontSize: "12px", marginTop: "10px" }} />
                          </div>
                        </div>
                          <hr className="w-100"></hr>
                        </>

                      ))
                      }


                      <Typography
                        style={{
                          margin: "10px",
                          fontSize: "22px",
                          fontWeight: "550",
                          marginTop: "20px"
                        }}
                      >
                        Add Additional Documentation
                      </Typography>


                      {selectedOptions.length > 0 && existingDoc?.map((row, index) => (
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
                              onChange={(e) => handleChangeExistDocument(e, index)}
                              value={row?.documentTypeId}
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "37px",
                                width: "100%",
                              }}
                            >
                              <option value="">---select---</option>
                              {GetAgentDocumentationMandatoryForEformReducer.GetAgentDocumentationMandatoryForEformData?.map(
                                (ele: any) => (
                                  <option key={ele?.documentationId} value={ele?.documentationId} selected={row.documentTypeId === ele.documentationId}>
                                    {ele?.name}
                                  </option>
                                )
                              )}

                            </select>
                          </div>

                          <div className="col-8">
                            <Select
                              value={selectedOptions[index]}
                              name="taxTreaty_TreatyId"
                              onBlur={handleBlur}
                              onChange={(e) => handleFile(e.target.value, index)}

                              style={{
                                minWidth: "140px",
                                height: "37px",
                                marginRight: "10px",
                                fontSize: "12px"
                              }}
                            >
                              <MenuItem value="1">Keep Existing</MenuItem>
                              <MenuItem value="2">Upload:</MenuItem>
                              <MenuItem value="3">Remove</MenuItem>
                            </Select>

                            {(selectedOptions[index] !== undefined && selectedOptions[index] === '2') && (
                              <Input style={{ fontSize: "12px" }} type="file" onChange={(e) => handleUploadExisting(e, index)} />
                            )}
                            <span className="my-auto text mx-2" style={{ fontSize: "10px", color: "blue" }}>
                              <a onClick={() => viewDoc(row.fileStorageName, 'Form8233')}>View..</a>
                            </span>
                          </div>
                        </div>
                      ))}

                      {additionalDocs.map((row, index) => (
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
                              onChange={handleChangeDocument}
                              value={row.documentTypeId}
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "37px",
                                width: "100%",
                              }}
                            >
                              <option value="">---select---</option>
                              {GetDocumentTypesData.GetDocumentListTypeData?.map(
                                (ele: any) => (
                                  <option key={ele?.documentationId} value={ele?.documentationId} selected={row.documentTypeId === ele.documentationId}>
                                    {ele?.name}
                                  </option>
                                )
                              )}

                            </select>
                          </div>

                          <div className="col-4">
                            <Input
                              style={{ fontSize: "12px", border: "none" }}
                              type="file"
                              onChange={(e) => handleUpload(e, index)}
                            />
                          </div>
                          <div className="col-4">
                            <DeleteOutline
                              onClick={() => handleDeleteDocument(index)}
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
                          onClick={handleAddDocument}
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
                        <SaveAndExit Callback={() => {
                          submitForm().then(() => {
                            const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
                            const urlValue = window.location.pathname.substring(1);
                            dispatch(post8233_EForm(
                              {
                                ...prevStepData,
                                stepName: `/${urlValue}`
                              }
                              , () => { }))
                            history(
                              GlobalValues.basePageRoute
                            );
                          })
                        }} formTypeId={FormTypeId} ></SaveAndExit>
                        <Button
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            GetPdf();
                          }}
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
                          color: "bfb0b0",
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
                            Redirect(BackRoute, authDetails?.agentId, history, true);
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
export default AttachDocument;