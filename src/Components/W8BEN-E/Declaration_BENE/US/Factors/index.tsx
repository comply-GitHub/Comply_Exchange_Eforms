import React, { useState, ChangeEvent, useEffect } from "react";
import { FormControl, Typography, Button, Paper, Tooltip, Link } from "@mui/material";
import { Info } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import "./index.scss";
import {
  getAllCountries,
  W8_state,
  GetHelpVideoDetails,
  UpsertAccountHolderIncomeAllocation,
  postW8BEN_EForm,
  GetAccountHolderIncomeAllocation
} from "../../../../../Redux/Actions";
import DynamicForm from "./text";
import { validationUS } from "../../../../../schemas/w8BenE"
import { useDispatch, useSelector } from "react-redux";
import checksolid from "../../../../../assets/img/check-solid.png";
// import check from "../../../assets/img/check.png";
import Accordion from "@mui/material/Accordion";
import DeleteIcon from "@mui/icons-material/Delete";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BreadCrumbComponent from "../../../../reusables/breadCrumb";
import GlobalValues, { FormTypeId } from "../../../../../Utils/constVals";
import { AccountHolderIncomeAllocationType } from "../../../../../Interfaces/AccountHolderAllocationType";
import { convertToFormData } from "../../../../../Helpers/convertToFormData";
import useAuth from "../../../../../customHooks/useAuth";
import SaveAndExit from "../../../../Reusable/SaveAndExit/Index";
import { GetBenEPdf } from "../../../../../Redux/Actions/PfdActions";
export default function Factors() {
  const { authDetails } = useAuth();
  const history = useNavigate();
  const location = useLocation();
  const [allocation, setAllocation] = useState(0); // State to track allocation input
  const [formList, setFormList] = useState<FormData[]>([]);
  const dispatch = useDispatch();

  const IncomeTypes = ["Others", "Goods", "Services"]

  const handleAllocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // setAllocation(inputValue);

    const mirroredText = document.getElementById("mirroredText");
    if (mirroredText) {
      mirroredText.innerText = inputValue;
    }
  };
  const viewPdf = () => {
    history("/w8BenE_pdf", { replace: true });
  }

  useEffect(() => {
     document.title="Income-Report"
    dispatch(GetHelpVideoDetails());
  }, [])


  useEffect(() => {
    dispatch(GetAccountHolderIncomeAllocation(authDetails?.accountHolderId, FormTypeId.BENE, (data: any) => {
      let temp = data?.map((ele: any, index: number) => {
        return {
          option1: JSON.stringify(IncomeTypes.indexOf(ele?.incomeType)),
          text: ele?.explaination,
          option2: JSON.stringify(ele?.countryId),
          number: ele?.allocation,
        }
      });
      setFormList([...temp]);
    }));
  }, [authDetails])

  const [toolInfo, setToolInfo] = useState("");
  const [numPapers, setNumPapers] = useState(1);
  const addIncomeTypePaper = () => {
    setNumPapers(numPapers + 1);
  };
  const [expanded, setExpanded] = React.useState<string | false>("");
  const deleteIncomeTypePaper = () => {
    setNumPapers(numPapers - 1);
  };
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const [selectedOption, setSelectedOption] = useState("");
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  const urlValue = location.pathname.substring(1);
  const SaveData = () => {
    const temp = { ...PrevStepData, stepName: null };

    const payload: AccountHolderIncomeAllocationType[] =
      formList.map((element: any, index) => {
        const temp: AccountHolderIncomeAllocationType = {
          id: 0,
          accountHolderBasicDetailId: authDetails?.accountHolderId,
          agentId: authDetails.agentId,
          formTypeId: FormTypeId.BENE,
          formEntryId: index + 1,
          incomeType: IncomeTypes[element.option1],
          explaination: element.text,
          allocation: element.number,
          countryId: element.option2 !== "" && element.option2 !== "0" && element.option2 !== null ? Number.parseInt(element.option2) : null
        }
        return temp;
      })

    const returnPromise = new Promise((resolve, reject) => {
      dispatch(
        UpsertAccountHolderIncomeAllocation(
          payload,
          (retData: any) => {
            localStorage.setItem("PrevStepData", JSON.stringify(temp))
            resolve(retData);
          },
          (error: any) => {
            reject(error);
          }
        )
      );

    })
    return returnPromise;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SaveData().then(() => {
      history("/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE")
    }).catch((error) => {
      console.log(error)
    })
  };

  const handleSaveExit = () => {
    SaveData().then(() => {
      const prevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
      const temp = { ...prevStepData, stepName: `/${urlValue}` }
      dispatch(
        postW8BEN_EForm(temp, () => {
          localStorage.setItem("PrevStepData", JSON.stringify(temp));
        },
          (error: any) => {
            console.log(error);
          })
      );
      history(GlobalValues.basePageRoute);
    }).catch((error) => {
      console.log(error)
    })
  };


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
            {/* <a target="_blank" href="https://youtu.be/SqcY0GlETPk?si=KOwsaYzweOessHw-">Help Video</a> */}
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

      <div className="row w-100 ">
        <div className="col-4" >
          <div style={{ padding: "20px 0px", height: "100%", }}>
            <BreadCrumbComponent
              breadCrumbCode={1204} formName={3} />
          </div>
        </div>
        <div className="col-8 mt-3" >
          <div style={{ padding: "12px" }}>
            <Paper style={{ padding: "18px" }}>
              <div style={{ margin: "10px" }}>
                <Typography
                  align="left"
                  style={{ marginTop: "10px", fontSize: "27px", fontWeight: "550" }}
                >
                  U.S. Source Income and Determining Factors
                  <span>
                    <Tooltip
                      style={{ backgroundColor: "black", color: "white" }}
                      title={
                        <>
                          <Typography color="inherit">
                            TT-124 Q&A process, U.S. Sourced Income
                          </Typography>
                          <a onClick={() => setToolInfo("factor")}>
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
                {toolInfo === "factor" ? (
                  <div>
                    <Paper
                      style={{
                        backgroundColor: "#dedcb1",
                        padding: "15px",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography>
                        EH023: Select the type of income the submission is being
                        applied to.
                      </Typography>

                      <Typography style={{ marginTop: "10px" }}>
                        You may select more than one where multiple sources of
                        income may be covered. Generally income is considered
                        from U.S. sources if it is paid by domestic U.S.
                        corporations, U.S. citizens or resident aliens, or
                        entities formed under the laws of the United States or a
                        state.
                      </Typography>
                      <Typography className="my-2">
                        Income is also from U.S. sources if the property that
                        produces the income is located in the United States or
                        the services for which the income is paid were performed
                        in the United States.
                      </Typography>
                      <Typography className="my-2">
                        A payment is treated as being from sources within the
                        United States if the source of the payment cannot be
                        determined at the time of payment, such as fees for
                        personal services paid before the services have been
                        performed.
                      </Typography>
                      <Typography className="my-2">
                        Generally, interest on an obligation of a foreign
                        corporation or foreign partnership is foreign-source
                        income.
                      </Typography>
                      <Typography className="my-2">
                        If the entity is engaged in a trade or business in the
                        United States during its tax year, interest paid by such
                        an entity is treated as from U.S. sources only if
                        interest is paid by a U.S. trade or business conducted
                        by the entity or is allocable to income that is treated
                        as effectively connected with the conduct of a U.S.
                        trade or business. This applies to a foreign partnership
                        only if it is predominantly engaged in the active
                        conduct of a trade or business outside the United
                        States.
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

                <div className="mt-2">
                  <DynamicForm formList={formList} setFormList={setFormList} allocation={allocation} setAllocation={setAllocation} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "80px",
                }}
              >
                {/* <Button
                  disabled={allocation !== 100}
                  variant="contained"
                  style={{ color: "white" }
                  }
                  onClick={handleSaveExit}
                >
                  SAVE & EXIT
                </Button> */}

                <SaveAndExit Callback={() => { handleSaveExit(); }} formTypeId={FormTypeId.BENE} />

                <Button
                  variant="contained"
                  style={{ color: "white", marginLeft: "15px" }}
                  onClick={() => {
                    dispatch(GetBenEPdf(authDetails?.accountHolderId))
                  }}
                >
                  View form
                </Button>
                <Button
                  disabled={allocation !== 100}
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ color: "white", marginLeft: "15px" }}
                >
                  Confirm
                </Button>
              </div>
              <Typography
                align="center"
                style={{
                  //color: "#f5f5f5",
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
                  variant="contained"
                  size="large"
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                  onClick={() => {
                    history("/BenE/Tax_Purpose_BenE/Declaration_BenE");
                  }}
                >

                  Back
                </Button>
              </Typography>
            </Paper>
            {/* </Form>
        )}
  </Formik> */}
          </div>
        </div>
      </div>

    </section>
  );
}