import React, { useState, useEffect } from "react";
import {
  Collapse,
  FormControl,
  Typography,
  Button,
  Tooltip,
  Link,
  Input,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Checkbox,
  Divider,
  IconButton,
} from "@mui/material";
import SelfCertType from "./selfCert";
import { Form, Formik } from "formik";
import { W8_state_ECI, PostDualCert, GetHelpVideoDetails, getAllCountries, UpsertDualCertDetailsControllingPerson, GetDualCertDetailsPerson } from "../../../../Redux/Actions";
import { SelfCertSchema_w9_DC } from "../../../../schemas/w8Exp";
import InfoIcon from "@mui/icons-material/Info";
import checksolid from "../../../assets/img/check-solid.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbComponent from "../../../reusables/breadCrumb";
import View_Insructions from "../../../viewInstruction";
import { useLocation } from "react-router-dom";
import GlobalValues, { FormTypeId } from "../../../../Utils/constVals";
import SaveAndExit from "../../../Reusable/SaveAndExit/Index";
import { useNavigate } from "react-router-dom";
import { ControlPointOutlined, Info, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { CardHeader } from "reactstrap";
import moment from "moment";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./index.scss";
import useAuth from "../../../../customHooks/useAuth";
import { boolean } from "yup";
import Redirect from "../../../../Router/RouterSkip";
import { GetECIDCPdf } from "../../../../Redux/Actions/PfdActions";
type ValuePiece = Date | null;
type Value2 = ValuePiece | [ValuePiece, ValuePiece];
export default function Certifications(props: any) {
  const location = useLocation();
  const PrevStepData = JSON.parse(localStorage.getItem("DualCertData") || "{}");
  const SelfControllingData = JSON.parse(localStorage.getItem("SelfCertData") || "{}");
  
  console.log(PrevStepData, "prevv")
  const urlValue = location.pathname.substring(1);
  const [IsCompDataValid,SetIsCompDataValid]=useState(false);
 
// console.log(formattedDate); 
const individualSelfType = {
  // firstName: SelfControllingData?.[0]?.firstName || "",
  // familyName: SelfControllingData?.[0]?.familyName || "",
  // dateOfBirth: SelfControllingData?.[0]?.dateOfBirth || "",
  // countryOfBirth: SelfControllingData?.[0]?.countryOfBirth || "",
  // cityOfBirth: SelfControllingData?.[0]?.cityOfBirth ||"",
  // permanentHouseNumberOrName: SelfControllingData?.[0]?.permanentHouseNumberOrName || "",
  // permanentRoadName: SelfControllingData?.[0]?.permanentRoadName|| "",
  // permanentLocation: SelfControllingData?.[0]?.permanentLocation || "",
  // permanentCityOrTown: SelfControllingData?.[0]?.permanentCityOrTown || "",
  // permanentStateOrProvince: SelfControllingData?.[0]?.permanentStateOrProvince || "",
  // permanentZipOrPostalCode: SelfControllingData?.[0]?.permanentZipOrPostalCode || "",
  // permanentResidentialCountry: SelfControllingData?.[0]?.permanentResidentialCountry ||"",
  // alterHouseNumberOrName: SelfControllingData?.[0]?.alterHouseNumberOrName ||"",
  // alterRoadName: SelfControllingData?.[0]?.alterRoadName || "",
  // alterLocation: SelfControllingData?.[0]?.alterLocation ||"",
  // alterCityOrTown: SelfControllingData?.[0]?.alterCityOrTown || "",
  // alterStateOrProvince: SelfControllingData?.[0]?.alterStateOrProvince || "",
  // alterZipOrPostalCode: SelfControllingData?.[0]?.alterZipOrPostalCode || "",
  // alterResidentialCountry: SelfControllingData?.[0]?.alterResidentialCountry || "",
  // primaryTaxJurisdictionCountry1: SelfControllingData?.[0]?.primaryTaxJurisdictionCountry1 ? SelfControllingData[0].primaryTaxJurisdictionCountry1 : "",
  // tinType1: SelfControllingData?.[0]?.tinType1 || "",
  // tiN1: SelfControllingData?.[0]?.tiN1 || "",
  // tinUnavailable1: SelfControllingData?.[0]?.tinUnavailable1 ||false,
  // primaryTaxJurisdictionCountry2: SelfControllingData?.[0]?.primaryTaxJurisdictionCountry2 || "",
  // tinType2: SelfControllingData?.[0]?.tinType2 || "",
  // tiN2: SelfControllingData?.[0]?.tiN2 ||"",
  // tinUnavailable2: SelfControllingData?.[0]?.tinUnavailable2 ||false,
  // PrimaryTaxJurisdictionCountry3: SelfControllingData?.[0]?.PrimaryTaxJurisdictionCountry3 ||"",
  // tinType3: SelfControllingData?.[0]?.tinType3 || "",
  // tiN3: SelfControllingData?.[0]?.tiN3 || "",
  // tinUnavailable3: SelfControllingData?.[0]?.tinUnavailable3 ||false,
  // ReasonforNonAvailabilityofTIN: SelfControllingData?.[0]?.ReasonforNonAvailabilityofTIN ||"",
  // legalNameofEntity1: SelfControllingData?.[0]?.legalNameofEntity1 ||"",
  // legalNameofEntity2: SelfControllingData?.[0]?.legalNameofEntity2 || "",
  // legalNameofEntity3: SelfControllingData?.[0]?.legalNameofEntity3 ||"",
  // StatusEntity1: SelfControllingData?.[0]?.StatusEntity1 ||"",
  // statusEntity2: SelfControllingData?.[0]?.statusEntity2 || "",
  // StatusEntity3: SelfControllingData?.[0]?.StatusEntity3 || "",
  // ownershipPercentage: SelfControllingData?.[0]?.ownershipPercentage || "",
  // emailAddress: SelfControllingData?.[0]?.emailAddress || "",
  // usTaxCertificateSubmissionRequest: SelfControllingData?.[0]?.usTaxCertificateSubmissionRequest || false
};

  const SelfCertControllingPerson = useSelector((state: any) => state.SelfCertControllingPerson);

  console.log(SelfCertControllingPerson, "SelfCertControllingPerson")
  const [initialValues, setInitialValues] = useState({

    // firstName: SelfControllingData.firstName || "",
    // familyName: SelfControllingData.familyName || "",
    // dateofBirth: SelfControllingData.dateofBirth || "",
    // CountryofBirth: SelfControllingData.CountryofBirth || "",
    // CityofBirth: SelfControllingData.CityofBirth || "",
    // permanentHouseNumberorName: SelfControllingData.permanentHouseNumberorName || "",
    // permanentRoadName: SelfControllingData.permanentRoadName || "",
    // permanentLocation: SelfControllingData.permanentLocation || "",
    // permanentCityorTown: SelfControllingData.permanentCityorTown || "",
    // permanentStateorProvince: SelfControllingData.permanentStateorProvince || "",
    // permanentZiporPostalCode: SelfControllingData.permanentZiporPostalCode || "",
    // permanentResidentialCountry: SelfControllingData.permanentResidentialCountry || "",
    // alterHouseNumberorName: SelfControllingData.alterHouseNumberorName || "",
    // alterRoadName: SelfControllingData.alterRoadName || "",
    // alterLocation: SelfControllingData.alterLocation || "",
    // alterCityorTown: SelfControllingData.alterCityorTown || "",
    // alterStateorProvince: SelfControllingData.alterStateorProvince || "",
    // alterZiporPostalCode: SelfControllingData.alterZiporPostalCode || "",
    // alterResidentialCountry: SelfControllingData.alterResidentialCountry || 0,
    // primaryTaxJurisdictionCountry1: SelfControllingData.primaryTaxJurisdictionCountry1 || "",
    // tinType1: SelfControllingData.tinType1 || "",
    // tiN1: SelfControllingData.tiN1 || "",
    // tinUnavailable1: SelfControllingData.tinUnavailable1 || false,
    // primaryTaxJurisdictionCountry2: SelfControllingData.primaryTaxJurisdictionCountry2 || "",
    // tinType2: SelfControllingData.tinType2 || "",
    // tiN2: SelfControllingData.tiN2 || "",
    // tinUnavailable2: SelfControllingData.tinUnavailable2 || false,
    // PrimaryTaxJurisdictionCountry3: SelfControllingData.PrimaryTaxJurisdictionCountry3 || "",
    // tinType3: SelfControllingData.tinType3 || "",
    // tiN3: SelfControllingData.tiN3 || "",
    // tinUnavailable3: SelfControllingData.tinUnavailable3 || false,
    // ReasonforNonAvailabilityofTIN: SelfControllingData.ReasonforNonAvailabilityofTIN || "",
    // legalNameofEntity1: SelfControllingData.legalNameofEntity1 || "",
    // legalNameofEntity2: SelfControllingData.legalNameofEntity2 || "",
    // legalNameofEntity3: SelfControllingData.legalNameofEntity3 || "",
    // StatusEntity1: SelfControllingData.StatusEntity1 || "",
    // statusEntity2: SelfControllingData.statusEntity2 || "",
    // StatusEntity3: SelfControllingData.StatusEntity3 || "",
    // ownershipPercentage: SelfControllingData.ownershipPercentage || "",
    // emailAddress: SelfControllingData.emailAddress || "",
    // usTaxCertificateSubmissionRequest: SelfControllingData.usTaxCertificateSubmissionRequest || false


  });

  const [incomeTypeData, setIncomeTypeData] = useState(SelfCertControllingPerson?.length > 1 ? [...SelfCertControllingPerson] : [{ ...individualSelfType }]);
 
 console.log(incomeTypeData,"incomedata")
  const DeleteIncomeType = (index: number) => {
    let temp = [...incomeTypeData]
    console.log(index, "deleting box", temp?.splice(index, 1))
    setIncomeTypeData([...temp]);
  }
  

  
  const AddIncomeType = () => {
    setIncomeTypeData((prev) => {
      return [...prev, { ...individualSelfType }];
    })
  }
  const { authDetails } = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [incomeTypesValid, setIncomeTypeValid] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [value, onChange] = useState<Value2>(null);
  const [canvaBx, setCanvaBx] = useState(false);
  const [open, setOpen] = useState("");
  const handleCanvaOpen = () => {
    setCanvaBx(true);
  }
 
  const handleCanvaClose = () => {
    setCanvaBx(false);
  }
  const handleOpen = (val: any) => {
    if (open === val) {
      setOpen("");
    } else setOpen(val);
  };
  useEffect(() => {
    document.title = "Controlling Person(s) of a Passive NFE"
  }, [])
  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    dispatch(getAllCountries());
  }, [])
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChangestatus =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [toolInfo, setToolInfo] = useState("");
  const ahdData: any = useSelector((state: any) => state?.accountHolder);

  const accountHolderDetails = JSON.parse(localStorage.getItem("accountHolderDetails") || "{}")
  const authDetailsString = localStorage.getItem("authDetails") || "{}";
  const auth = JSON.parse(authDetailsString);
  const userType = auth?.configurations?.userType;
  const LoadPageData = () => {
    if (ahdData !== null && ahdData !== undefined) {
      let temp = {
        ...ahdData,
        id: accountHolderDetails.id ?? 0,
        isUSEntity: ahdData.isUSEntity === true ? "yes" : "no",
        isUSIndividual: ahdData.isUSIndividual === true ? "yes" : "no",
        isAddressRuralRoute: ahdData.isAddressRuralRoute === true ? "yes" : "no",
        isAddressPostOfficeBox: ahdData.isAddressPostOfficeBox === true ? "yes" : "no",
        isCareOfAddress: ahdData.isCareOfAddress === true ? "yes" : "no",
        isalternativebusinessaddress: ahdData.isalternativebusinessaddress === true ? "yes" : "no",
      };
      setInitialValues(temp);
    }
  }
  useEffect(() => {
    dispatch(GetDualCertDetailsPerson(authDetails?.accountHolderId, FormTypeId.W8ECI,(res: any[]) => {
      console.log(res, "existing data");
      let temp = res.map((ele: any) => {
        return {
          agentId: authDetails.agentId,
          accountHolderDetailsId: authDetails?.accountHolderId,
          formTypeId: FormTypeId.W8ECI,
          formEntryId: ele.formEntryId,
          firstName: ele.firstName,
          familyName: ele.familyName,
          dateofBirth: ele.dateofBirth,
          countryofBirth: ele.countryofBirth,
          cityofBirth: ele.cityofBirth,
          permanentHouseNumberorName: ele.permanentHouseNumberorName,
          permanentRoadName: ele.permanentRoadName,
          permanentLocation: ele.permanentLocation,
          permanentCityorTown: ele.permanentCityorTown,
          permanentStateorProvince: ele.permanentStateorProvince,
          permanentZiporPostalCode: ele.permanentZiporPostalCode,
          permanentResidentialCountry: ele.permanentResidentialCountry,
          alterHouseNumberorName: ele.alterHouseNumberorName,
              alterRoadName: ele.alterRoadName,
         alterLocation: ele.alterLocation,
         alterCityorTown: ele.alterCityorTown,
        alterStateorProvince: ele.alterStateorProvince,
          alterZiporPostalCode: ele.alterZiporPostalCode,
        alterResidentialCountry: ele.alterResidentialCountry,
          primaryTaxJurisdictionCountry1: ele.primaryTaxJurisdictionCountry1,
          tinType1: ele.tinType1,
          tiN1: ele.tiN1,
          tinUnavailable1: ele.tinUnavailable1,
          primaryTaxJurisdictionCountry2: ele.primaryTaxJurisdictionCountry2,
          tinType2: ele.tinType2,
          tiN2: ele.tiN2,
          tinUnavailable2: ele.TINUnavailable2,
          primaryTaxJurisdictionCountry3: ele.primaryTaxJurisdictionCountry3,
          tinType3: ele.tinType3,
          tiN3: ele.TIN3,
          tinUnavailable3: ele.tinUnavailable3,
          reasonforNonAvailabilityofTIN: ele.reasonforNonAvailabilityofTIN,
          LegalNameofEntity1: ele.LegalNameofEntity1,
          legalNameofEntity2: ele.legalNameofEntity2,
          legalNameofEntity3: ele.LegalNameofEntity3,
          statusEntity1: ele.statusEntity1,
          statusEntity2: ele.statusEntity2,
          statusEntity3: ele.statusEntity3,
          ownershipPercentage: ele.ownershipPercentage,
          emailAddress: ele.emailAddress,
          usTaxCertificateSubmissionRequest: ele.usTaxCertificateSubmissionRequest,
         
        }
      })
      setIncomeTypeData(temp);
    }))
  }, [authDetails])
  // useEffect(() => {
  //   console.log(incomeTypeData, "income type data")
  //   let isLengthMore = false;
  //   for (let i = 0; i < incomeTypeData.length; i++) {
  //     SelfCertSchema_w9_DC().validate(incomeTypeData[i])
  //       .then((error) => {

  //       }).catch((error) => {
  //         setIncomeTypeValid(false);
  //         console.log(error);
  //       })
  //   }
  // }, [incomeTypeData])
  const [TinTax, setTinTax] = useState(false);

  // useEffect(() => {
  //   Promise.all(incomeTypeData.map(x => SelfCertSchema_w9_DC(x.showAlternateAddress,showTin,showTin2).validate(x))).then(() => {
  //     setTinTax(true);
  //   }).catch((err) => {
  //     console.log(err, "123")

  //     setTinTax(false);
  //   })

  // }, [incomeTypeData])
  const setAccountHolder = (e: any, values: any): any => {
    if (values.accountHolderName === "") {
      values.accountHolderName = values.firstName + values.familyName;
    } else values.accountHolderName = e.target.value;
  };
  const viewPdf = () => {
    history("w9_pdf");
  }

  useEffect(() => {
    // Promise.all(incomeTypeData.map(x => SelfCertSchema_w9_DC().validate(x))).then(() => {
    //   setTinTax(true);
    // }).catch((err) => {
    //   console.log(err, "123")

    //   setTinTax(false);
    // })
    // console.log(incomeTypeData, "123")

  }, [incomeTypeData])

  const UpdateIncomeType = (payload: any, index: number) => {
    console.log("child data",payload)
    setIncomeTypeData((prev) => {
      let temp = [...prev];
      temp[index] = payload;
      return temp;
    });
    setIncomeTypeValid(true);
  }
  const SubmitIncomeTypes = () => {
    let returnPromise = new Promise((resolve, reject) => {
      let temp = incomeTypeData.map((ele: any, index: number) => {
        const formattedDateOfBirth = ele.dateofBirth
        ? new Date(ele.dateofBirth).toISOString().slice(0, -5) + 'Z'
        : '';
        let payload = {
          id: 0,
          accountHolderDetailsId: authDetails?.accountHolderId,
          agentId: authDetails?.agentId,
          formTypeId: 3,
          formEntryId: index + 1,
          dualCertId:index + 1,
          firstName: ele.firstName,
          familyName: ele.familyName,
          dateofBirth:formattedDateOfBirth,
          countryofBirth: ele.countryofBirth,
          cityofBirth: ele.cityofBirth,
          permanentHouseNumberorName: ele.permanentHouseNumberorName,
          permanentRoadName: ele.permanentRoadName,
          permanentLocation: ele.permanentLocation,
          permanentCityorTown: ele.permanentCityorTown,
          permanentStateorProvince: ele.permanentStateorProvince,
          permanentZiporPostalCode: ele.permanentZiporPostalCode,
          permanentResidentialCountry:  parseInt(ele.permanentResidentialCountry),
          AlterHouseNumberorName: ele.AlterHouseNumberorName,
          AlterRoadName: ele.AlterRoadName,
          AlterLocation: ele.AlterLocation,
          AlterCityorTown: ele.AlterCityorTown,
          AlterStateorProvince: ele.AlterStateorProvince,
          AlterZiporPostalCode: ele.AlterZiporPostalCode,
          AlterResidentialCountry: ele.AlterResidentialCountry,
          primaryTaxJurisdictionCountry1:  parseInt(ele.primaryTaxJurisdictionCountry1),
          tinType1: ele.tinType1,
          tiN1: ele.tiN1,
          tinUnavailable1: ele.tinUnavailable1,
          primaryTaxJurisdictionCountry2:  parseInt(ele.primaryTaxJurisdictionCountry2),
          tinType2: ele.tinType2,
          tiN2: ele.tiN2,
          tinUnavailable2: ele.tinUnavailable2,
          primaryTaxJurisdictionCountry3: parseInt(ele.primaryTaxJurisdictionCountry3),
          tinType3: ele.tinType3,
          tiN3: ele.tiN3,
          tinUnavailable3: ele.tinUnavailable3,
          reasonforNonAvailabilityofTIN: ele.reasonforNonAvailabilityofTIN,
          legalNameofEntity1: ele.legalNameofEntity1,
          legalNameofEntity2: ele.legalNameofEntity2,
          legalNameofEntity3: ele.legalNameofEntity3,
          statusEntity1:  parseInt(ele.statusEntity1),
          statusEntity2:  parseInt(ele.statusEntity2),
          statusEntity3:  parseInt(ele.statusEntity3),
          ownershipPercentage: ele.ownershipPercentage,
          emailAddress: ele.emailAddress,
          usTaxCertificateSubmissionRequest: ele.usTaxCertificateSubmissionRequest,
        };
        return payload;
      })
        // if(IsCompDataValid ===true){
          dispatch(
            UpsertDualCertDetailsControllingPerson(
              temp,
              (data: any) => {
                // Save data in localStorage after dispatch completes
                localStorage.setItem('SelfCertData', JSON.stringify(temp));
                resolve(data);
              },
              (err: any) => {
                reject(err);
              }
            )
          );
        // }
       
      });
      return returnPromise;
  }

  return (
    <section
      className="inner_content"
      style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
    >
      <View_Insructions canvaBx={canvaBx} handleCanvaClose={handleCanvaClose} />
      {canvaBx === true ? (<div className="offcanvas-backdrop fade show" onClick={() => { handleCanvaClose() }}></div>) : null}

      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions" onClick={() => { handleCanvaOpen(); }}>View Instructions</div>
          <div className="viewform" onClick={() => {
            dispatch(GetECIDCPdf(authDetails?.accountHolderId))
          }}>View Form</div>
          <div className="helpvideo">
            {GethelpData && GethelpData[8].id === 10 ? (
              <a
                href={GethelpData[8].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[8].fieldValue,
                    'name',
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
      <div className="row w-100 " >
        <div className="col-4">
          <div style={{ padding: "20px 0px", height: "100%" }}>
            <BreadCrumbComponent breadCrumbCode={1210} formName={16} />

          </div>
        </div>

        <div className="col-8 mt-3">
          <div style={{ padding: "10px" }}>
            <Paper >
              <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validateOnBlur={true}
                enableReinitialize
                validateOnMount={true}
                onSubmit={(values, { setSubmitting }) => {
                 
                  let temp = {
                    ...PrevStepData,
                    agentId: authDetails?.agentId,
                    accountHolderBasicDetailId: authDetails?.accountHolderId,
                    stepName: null
                  };
                  const returnPromise = new Promise((resolve, reject) => {
                    SubmitIncomeTypes().then(
                      (data) => {
                        localStorage.setItem("PrevStepData", JSON.stringify(temp));
                        
                        // history("/US_Determination_W9_DC")
                        Redirect(
                        "/Tax_dualCert_Eci",
                          authDetails?.agentId,
                          history,
                          false
                        );
                        setSubmitting(true);
                        resolve(data);
                      },
                      (err) => {
                        reject(err);
                      }
                    );
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
                  setFieldValue,
                  submitForm,
                  isValid
                }) => (

                  <Form onSubmit={handleSubmit}>
                    <>{console.log(values,"valuess")}</>
                    <Paper style={{ padding: "14px" }}>
                    <Typography style={{ fontSize: "26px", fontWeight: "550", marginLeft: "8px" }} className="mt-2 mb-3">Self Certification - Controlling Person(s) of a Passive NFE</Typography>
                    {incomeTypeData.map((_, index) => (
                            <SelfCertType index={index} DeleteIncomeType={DeleteIncomeType} length={incomeTypeData.length} data={incomeTypeData[index]} UpdateIncomeType={UpdateIncomeType} handleSubmit={handleSubmit} SetIsCompDataValid={SetIsCompDataValid} incomeTypeData={incomeTypeData} />
                          ))}

                      <div>
                        <Button  onClick={AddIncomeType} variant="contained" style={{ backgroundColor: "#364048", color: "#fff" }}>
                          Add a controlling person
                        </Button>
                      </div>






                      <div
                        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
                      >

                        <Button

                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            dispatch(GetECIDCPdf(authDetails?.accountHolderId))
                          }}
                        >
                          View form
                        </Button>
                        <Button

//disabled={!isValid || !TinTax}
disabled={!IsCompDataValid }
type="submit"
                          variant="contained"
                          style={{ color: "white", marginLeft: "15px" }}
                          onClick={() => {
                            submitForm().then((data) => {

                            }).catch((error) => {
                              console.log(error);
                            })
                          }}
                        >
                          Continue
                        </Button>
                      </div>

                    </Paper>
                  </Form>
                )}
              </Formik>
            </Paper>

          </div>
        </div>
      </div>
    </section>
  );
}

