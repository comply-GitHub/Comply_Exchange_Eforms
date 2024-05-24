import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Collapse,
  CardHeader,
  IconButton,
  FormControl,
  Typography,
  Select,
  MenuItem,
  Input,
  Button,
  Tooltip,
  Link,
} from "@mui/material";
import View_Insructions from "../viewInstruction";
import Infoicon from "../../assets/img/info.png";
// import { useDispatch } from "react-redux";
import {
  RemoveCircleOutlineOutlined,
  ControlPointOutlined,
  Delete,
  Info,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Formik, Form } from "formik";
import { EntitySchema } from "../../schemas/entityindex";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import "./style.css"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import entity from "../../../src/assets/img/entity.png";
import individual from "../../../src/assets/img/individual.png";
import Checkbox from "@mui/material/Checkbox";
// import { apiGetUrl, apiPostUrl } from "../../api/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  postOnboarding,
  getAllCountries,
  getAllCountriesCode,
  getAllCountriesIncomeCode,
  GetAgentPaymentType,
  getAllStateByCountryId,
  getTinTypes,
  GetHelpVideoDetails,
  GET_AGENT_BY_ID,
  GetAgentSkippedSteps,
  getAllCountriesAgentWise,
  getAllCountriesIncomeCodeAgentWise,
  GetAgentUSVisaTypeHiddenForEformAction,
  GetAgentIncomeTypeHiddenAllowAnoymo
} from "../../Redux/Actions";
import { AppDispatch } from "../../Redux/store";
import GlobalValues from "../../Utils/constVals";
import Utils from "../../Utils";
import useAuth from "../../customHooks/useAuth";

export default function Entity() {
  const { authDetails } = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  //   //States
  const [incomeData, setIncomeData] = useState<any>([]);
  // const [value, onChange] = useState<Value2>(null);
  const [open, setOpen] = useState("");
  const [incomeArr, setIncomeArr] = useState(["intrest"]);
  // const [accInfoSection, setAccInfoSection] = useState(false);
  // const [accInfoType, setAccInfoType] = useState('');
  const [bankLocation, setBankLocation] = useState("");
  const [alternateNo, setAlternateNo] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesCode, setCountriesCode] = useState([]);
  const [incomeCodes, setIncomeCodes] = useState([]);
  const [usStates, setUsStates] = useState([]);
  const [ustinArray, setUStinArray] = useState([]);
  const [ustinValue, setUStinvalue] = useState([]);
  const [nonUSEntity, setNonUSEntity] = useState([]);

  const [notUsIndividual, setNonUsIndividual] = useState([]);
  const [values, setValues] = useState({ vat: "", vatId: 0 });
  const [toolInfo, setToolInfo] = useState("");
  const [holdPreviousVal, setPreVal] = useState([]);
  const [agentDetail, setAgentData] = useState<any>({});

  const [stateList1, setallStateById1] = useState([]);
  const [stateList2, setallStateById2] = useState([]);

  const accountHolderDetails = JSON.parse(localStorage.getItem("accountHolderDetails") || "{}")
  const authDetailsString = localStorage.getItem("authDetails") || "{}";

  const auth = JSON.parse(authDetailsString);
  const userType = auth?.configurations?.userType;
  const Income = auth?.configurations?.requestincometype;
  const IncomeMandatory = auth?.configurations?.requestincometypeAndWhenYesMakeMandatory;
  const Payment = auth?.configurations?.requestBankAccountInformation;
  const PaymentMandatry = auth?.configurations?.requestBankAccountInformationAndWhenYesMakeMandatory;

  const skippedSteps = useSelector((state: any) => state.SkippedSteps);
  const [isGiinEnabled, setIsGiinEnabled] = useState(false);

  const [payload, setPayload] = useState({
    id: 0,
    agentId: authDetails?.agentId,
    businessTypeId: 2,
    isUSEntity: true,
    isUSIndividual: false,
    uniqueIdentifier: "",
    firstName: "",
    lastName: "",
    countryOfCitizenshipId: 0,
    dob: "",
    nameOfDisregarded: "",
    entityName: "",
    taxpayerIdTypeID: 1,
    usTin: "",
    foreignTINCountryId: 0,
    foreignTIN: "",
    foreignTINNotAvailable: false,
    alternativeTINFormat: false,
    giinId: "",
    bsb: "",
    permanentResidentialCountryId: 0,
    otherCountry: "",
    permanentResidentialStreetNumberandName: "",
    permanentResidentialAptSuite: "",
    permanentResidentialCityorTown: "",
    permanentResidentialStateorProvince: "",
    permanentResidentialZipPostalCode: "",
    isAddressRuralRoute: true,
    isAddressPostOfficeBox: true,
    isCareOfAddress: true,
    isalternativebusinessaddress: false,
    permanentResidentialCountryId1: 0,
    permanentResidentialStreetNumberandName1: "",
    permanentResidentialAptSuite1: "",
    permanentResidentialCityorTown1: "",
    permanentResidentialStateorProvince1: "",
    permanentResidentialZipPostalCode1: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    primaryContactNumberId: 0,
    primaryContactNumber: "",
    alternativeNumberId: 0,
    alternativeNumber: "",
    alternativeNumberId1: 0,
    alternativeNumber1: "",
    incomeTypeId: [],
    paymentTypeId: 0,
    accountHolderName: "",
    userType: userType,
    accountBankName: "",
    accountBankBranchLocationId: 0,
    accountNumber: "",
    abaRouting: "",
    iban: "",
    swiftCode: "",
    bankCode: "",
    vatId: 0,
    vat: "",
    doingBusinessAsName: "",
    makePayable: "",
    payResidentalCountryId: 0,
    payStreetNumberAndName: "",
    payAptSuite: "",
    payCityorTown: "",
    sortCode: "",
    capacityId: 1,
    payStateOrProvince: "",
    payZipPostalCode: "",
    isCorrectPaymentPurposes: true,
    isConfirmed: false,
  });

  var [initialValues, setInitialValues] = useState({
    id: 0,
    agentId: authDetails?.agentId,
    businessTypeId: 2,
    isUSEntity: "yes",
    isUSIndividual: "no",
    uniqueIdentifier: "",
    firstName: "",
    lastName: "",
    countryOfCitizenshipId: 0,
    dob: "",
    nameOfDisregarded: "",
    entityName: "",
    taxpayerIdTypeID: 1,
    usTin: "",
    foreignTINCountryId: 0,
    foreignTIN: "",
    foreignTINNotAvailable: false, //
    alternativeTINFormat: false, //
    giinId: "",
    permanentResidentialCountryId: 0,
    otherCountry: "",
    permanentResidentialStreetNumberandName: "",
    permanentResidentialAptSuite: "",
    permanentResidentialCityorTown: "",
    permanentResidentialStateorProvince: "",
    permanentResidentialZipPostalCode: "",
    isAddressRuralRoute: "yes",
    userType: userType,
    isAddressPostOfficeBox: "no",
    isCareOfAddress: "no",
    isalternativebusinessaddress: "no",
    permanentResidentialCountryId1: 0,
    permanentResidentialStreetNumberandName1: "",
    permanentResidentialAptSuite1: "",
    permanentResidentialCityorTown1: "",
    permanentResidentialStateorProvince1: "",
    permanentResidentialZipPostalCode1: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    primaryContactNumberId: 0,
    primaryContactNumber: "",
    alternativeNumberId: 0,
    alternativeNumber: "",
    alternativeNumberId1: 0,
    alternativeNumber1: "",
    incomeTypeId: [],
    paymentTypeId: 0,
    accountHolderName: "",
    accountBankName: "",
    accountBankBranchLocationId: 0,
    accountNumber: "",
    abaRouting: "",
    iban: "",
    swiftCode: "",
    bankCode: "",
    makePayable: "",
    payResidentalCountryId: 0,
    payStreetNumberAndName: "",
    payAptSuite: "",
    vatId: 0,
    vat: "",
    doingBusinessAsName: "",
    payCityorTown: "",
    payStateOrProvince: "",
    payZipPostalCode: "",
    sortCode: "",
    bsb: "",
    capacityId: 1,
    isCorrectPaymentPurposes: true,
    isConfirmed: false,
  });

  // useEffect(() => {
  //   apiGetUrl("GetCountries", "", {})
  //     .then((res) => {
  //       setCountries(res.data);
  //       console.log(res.data, "res.data");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   apiGetUrl("GetCountriesCode", "", {})
  //     .then((res) => {
  //       setCountriesCode(res.data);
  //       console.log(res.data, "res.data");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   apiGetUrl("GetAllIncomeCodes", "", {})
  //     .then((res) => {
  //       setIncomeCodes(res.data);
  //       console.log(res.data, "res.data");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const ahdData: any = useSelector((state: any) => state?.accountHolder);
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
        accountHolderName: ahdData.accountHolderName === "" ? "" : ahdData.accountHolderName,
      };
      setInitialValues(temp);
    }
  }

  useEffect(() => {
    if (skippedSteps.length === 0) {
      dispatch(
        GetAgentSkippedSteps(authDetails?.agentId, (data: any[]) => {
          // mappingAvailable = data; 
        })
      );
    }
  }, [authDetails?.agentId])

  useEffect(() => {
    let temp1: any[] = skippedSteps.filter((x: any) => x.id == 8 && x.agentId == authDetails?.agentId);
    setIsGiinEnabled(temp1?.length > 0 ? false : true);

  }, [skippedSteps, authDetails?.agentId])

  // useEffect(() =>{
  // document.title=""
  // },[])
  useEffect(()=>{
    if(authDetails?.agentId){
      dispatch(GetAgentUSVisaTypeHiddenForEformAction(authDetails?.agentId));
      dispatch(getAllCountriesAgentWise(authDetails?.agentId));   
      dispatch(getAllCountriesIncomeCodeAgentWise(authDetails?.agentId));    
      dispatch(
        getTinTypes(authDetails?.agentId, (data: any) => {
          setUStinArray(data);
          let datas = data.filter((ele: any) => {
            return ele.usIndividual === true;
          });
          setUStinvalue(datas);
          let nonData = data.filter((ele: any) => {
            return ele.nonUSIndividual === true;
          });
          setNonUsIndividual(nonData)
        })
      );
      dispatch(
        GetAgentPaymentType(authDetails?.agentId, () => {
          // console.log("Data");
        })
      );
  
      dispatch(
        GET_AGENT_BY_ID(authDetails?.agentId, (data: any) => {
          // alert(data.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat)
          setAgentData(data);
        }));
    }
  },[authDetails])


  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCode());
    dispatch(getAllCountriesIncomeCode());
    dispatch(GetHelpVideoDetails());
    dispatch(getAllStateByCountryId(0));
    dispatch(GetAgentIncomeTypeHiddenAllowAnoymo());
   

    LoadPageData();
  }, []);

  const getCountriesAgentWiseReducer = useSelector(
    (state: any) => state.getCountriesAgentWiseReducer
  );

  const onUidBlur = (e: any, values: any): any => {
    const value = e.target.value;
    if (agentDetail.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat === undefined) return;
    var format = "S";
    const formatVal = agentDetail.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat;
    if (formatVal.length == 0) return;

    if (value.length < formatVal.split('?')[0].length) {

      setPayload({ ...payload, uniqueIdentifier: payload.uniqueIdentifier });
      values.uniqueIdentifier = "";
      setPreVal(values.uniqueIdentifier);
    }
  }

  const onNumberChange = (e: any, values: any): any => {
    const value = e.target.value

    if (agentDetail.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat === undefined) return;

    var format = "S";
    const formatVal = agentDetail.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat;

    if (formatVal.length == 0) return;

    setPayload({ ...payload, uniqueIdentifier: payload.uniqueIdentifier });
    if ((checkNUmberOnly(value) && formatVal.split('')[0] == "9")
      || (checkCharecterOnly(value) && formatVal.split('')[0] == "S")
      || formatVal.split('')[0] == "*"
    ) {

      if (values.uniqueIdentifier.length <= formatVal.length) {
        setPreVal(values.uniqueIdentifier);
      }
      else {
        values.uniqueIdentifier = holdPreviousVal;
      }
    } else {

      values.uniqueIdentifier = holdPreviousVal;

    }

  }

  const checkCharecterOnly = (val: any): any => {

    let pattern = /\d/g;
    let result = val.match(pattern);
    if (result && result.length) {
      return false;
    }
    return true;

  }

  const checkNUmberOnly = (val: any): any => {

    if (!isNaN(+val)) { return true; }
    return false;

  }



  const onChangeUsInit = (values: any) => {
    let data;
    if (values.isUSIndividual == "no") {
      data = ustinArray.filter((ele: any | undefined) => {
        // Filter out elements where usIndividual is true
        return ele?.usIndividual === false;
      });
      // Do something with the filtered data...
    } else {
      data = ustinArray.filter((ele: any | undefined) => {
        // Filter out elements where usIndividual is false
        return ele?.usIndividual === true;
      });
      // Do something with the filtered data...
    }
    setUStinvalue(data);
  };

  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );
  const getCountriesCodeReducer = useSelector(
    (state: any) => state.getCountriesCodeReducer
  );
  const GetAllIncomeCodesReducer = useSelector(
    (state: any) => state.GetAllIncomeCodesReducer
  );
  const GetAllIncomeCodesAgentWiseReducer = useSelector(
    (state: any) => state.GetAllIncomeCodesAgentWiseReducer
  );
  const GetStateByCountryIdReducer = useSelector(
    (state: any) => state.GetStateByCountryIdReducer
  );
  const GetAgentPaymentTypeData = useSelector(
    (state: any) => state.GetAgentPaymentTypeReducer.GetAgentPaymentTypeData
  );
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const GetAgentUSVisaTypeHiddenForEform = useSelector((state: any) =>
    state.GetAgentIncomeTypeHiddenAllowAnoymoReducer.GetAgentIncomeTypeHiddenAllowAnoymoData
  )
  // useEffect(() => {
  //   if (payload.permanentResidentialCountryId == 258) {
  //     apiGetUrl("GetStateByCountryId", "", {})
  //       .then((res) => {
  //         setUsStates(res.data);
  //         console.log(res.data, "res.data");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [payload.permanentResidentialCountryId]);
  const redirectFunc = () => {
    history("/Term");
  };

  const formatTin = (e: any, values: any): any => {
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 2) {
      setPayload({ ...payload, usTin: payload.usTin + "-" });
      values.usTin = values.usTin + "-";
    }
    // if (e.target.value.length === 6) {
    //   setPayload({ ...payload, usTin: payload.usTin + "-" });
    //   values.usTin = values.usTin + "-";
    // }
  };

  const formatBankCode = (e: any, values: any): any => {

    if (e.target.value.length === 9) return;
    if (e.key === "Backspace" || e.key === "Delete") return;
    if (e.target.value.length === 2) {
      setPayload({ ...payload, usTin: payload.bankCode + "-" });
      values.bankCode = values.bankCode + "-";
    }
    if (e.target.value.length === 5) {
      setPayload({ ...payload, usTin: payload.bankCode + "-" });
      values.bankCode = values.bankCode + "-";
    }

  };

  const handleOpen = (val: any) => {
    if (open === val) {
      setOpen("");
    } else setOpen(val);
  };
  const [selectedValues, setSelectedValues] = useState(Array(incomeArr.length).fill("0"));
  const [incomeErrors, setIncomeErrors] = useState("");
  // const handleRadio = event => {
  //   setSelectedValue(event.target.value);
  // };

  // const handleRadio1 = event => {
  //   setSelectedValue1(event.target.value);
  // };

  const addIncomeType = () => {
    setIncomeArr((incomeArr) => [...incomeArr, ""]);
  };
  const handleDelete = (i: any) => {
    const updatedIncomeCodes = [...incomeArr];
    updatedIncomeCodes.splice(i, 1);
    incomeData.splice(i, 1);
    setIncomeArr(updatedIncomeCodes);
    setIncomeData(incomeData);
  };
  const handleSubmit = (e: any, values: any) => {
    e.preventDefault();
    dispatch(postOnboarding(values, redirectFunc));
    redirectFunc();
  };

  const returnFieldName = (
    handleBlur: any,
    touched: any,
    errors: any,
    values: any,
    handleChange: any
  ) => {
    if (values.accountBankBranchLocationId == 258) {
      return (
        <div className="col-lg-3 col-6 col-md-3 mt-2">
          <FormControl className="w-100">
            <Typography align="left">
              ABA/Routing
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Input
              style={{
                border: " 1px solid #d9d9d9 ",
                height: " 36px",
                lineHeight: "36px ",
                background: "#fff ",
                fontSize: "13px",
                color: " #000 ",
                fontStyle: "normal",
                borderRadius: "1px",
                padding: " 0 10px ",
              }}
              id="outlined"
              name="abaRouting"
              placeholder="Enter ABA / Routing"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.abaRouting && errors.abaRouting)}
              value={values.abaRouting}
            />
            {touched.abaRouting && errors.abaRouting ? (<p className="error">{errors.abaRouting}</p>) : ""}
          </FormControl>
        </div>
      );
    } else if (values.accountBankBranchLocationId == 257) {
      return (
        <div className="col-lg-3 col-6 col-md-3 mt-2">
          <FormControl className="w-100">
            <Typography align="left">
              {/* {returnFieldName()} */}
              Sort Code
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Input
              style={{
                border: " 1px solid #d9d9d9 ",
                height: " 36px",
                lineHeight: "36px ",
                background: "#fff ",
                fontSize: "13px",
                color: " #000 ",
                fontStyle: "normal",
                borderRadius: "1px",
                padding: " 0 10px ",
              }}
              id="outlined"
              name="sortCode"
              placeholder="Sort Code"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.sortCode && errors.sortCode)}
              value={values.sortCode}
            />
            {touched.sortCode && errors.sortCode ? (<p className="error">{errors.sortCode}</p>) : ""}
          </FormControl>
        </div>
      );
    } else if (values?.accountBankBranchLocationId == 16) {
      return (
        <div className="col-lg-3 col-6 col-md-3 mt-2">
          <FormControl className="w-100">
            <Typography align="left">
              {/* {returnFieldName()} */}
              BSB
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Input
              style={{
                border: " 1px solid #d9d9d9 ",
                height: " 36px",
                lineHeight: "36px ",
                background: "#fff ",
                fontSize: "13px",
                color: " #000 ",
                fontStyle: "normal",
                borderRadius: "1px",
                padding: " 0 10px ",
              }}
              id="outlined"
              name="bsb"
              placeholder="Enter Bank code"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.bsb && errors.bsb)}
              value={values.bsb}
            />
            {touched.bsb && errors.bsb ? (<p className="error">{errors.bsb}</p>) : ""}
          </FormControl>
        </div>
      );
    } else {
      return (
        <div className="col-lg-3 col-6 col-md-3 mt-2">
          <FormControl className="w-100">
            <Typography align="left">
              Bank Code
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Input
              style={{
                border: " 1px solid #d9d9d9 ",
                height: " 36px",
                lineHeight: "36px ",
                background: "#fff ",
                fontSize: "13px",
                color: " #000 ",
                fontStyle: "normal",
                borderRadius: "1px",
                padding: " 0 10px ",
              }}
              id="outlined"
              name="bankCode"
              placeholder=" Enter Bank Code"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyUp={(e) => formatBankCode(e, values)}
              inputProps={{ maxLength: 8 }}
              error={Boolean(touched.bankCode && errors.bankCode)}
              value={values.bankCode}
            />
            {touched.bankCode && errors.bankCode ? (<p className="error">{errors.bankCode}</p>) : ""}
          </FormControl>
        </div>
      );
    }
  };

  const clickInfo = () => {
    alert(
      "Instructor Identifier Format is ?*********************** \n 9- Numeric Value Only \n A - Alphabetical Character Only \n* = Alphanumeric Character only \n ? - Characters optional after this"
    );
  };


  useEffect(() => {
    selectedValues.forEach((ele, i) => {
      if (ele === "0") {
        setIncomeErrors("Income field is mandatory")
        return;
      }
      setIncomeErrors("")
    })

  }, [selectedValues])
  const handleIcome = (e: any, i: number) => {
    const newValue = e.target.value;
    setSelectedValues(prevState => {
      const newState = [...prevState];
      newState[i] = newValue;
      return newState;
    });
  };
  // console.log(errors,"error")
  return (
    <section
      className="inner_content backGround_Image"
      style={{ paddingTop: "25px" }}
    >
      <Typography
        align="center"
        style={{
          fontSize: "32px",
          fontWeight: "500",
          color: "white",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        Account Holder Details
      </Typography>

      <div className="container-fluid">
        <div className="row"></div>

        <div className="row">
          <div className="col-12">
            <div className="tabview">
              <ul>
                <li>
                  <button onClick={() => history("/IndividualUs")}>
                    <div>
                      <div>
                        {" "}
                        <img src={individual} />
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>
                        Individual
                      </span>
                    </div>
                  </button>
                </li>
                <li style={{ fontSize: "14px", fontWeight: "400" }}>OR</li>
                <li>
                  <button className="active">
                    <div>
                      <div>
                        {" "}
                        <img src={entity} />
                      </div>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>
                        Entity
                      </span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="overlay-div">
          <div className="overlay-div-group">
            <div className="helpvideo">
              <div className="helpvideo">
                {GethelpData && GethelpData[1].id === 3 ? (
                  <a
                    href={GethelpData[1].fieldValue}
                    target="popup"
                  // onClick={
                  //   () =>
                  //   window.open(
                  //     GethelpData[1].fieldValue,
                  //     'name',
                  //     `width=${GethelpData[1].width},height=${GethelpData[1].height},top=${GethelpData[1].top},left=${GethelpData[1].left}`
                  //   )
                  // }
                  >
                    Help Video
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-12 mt-3"
          style={{ padding: "1.5rem 8px 8px 8px" }}
        >
          <Paper elevation={6} style={{ padding: "5rem 17px 17px 17px" }}>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validateOnChange={true}
              validateOnBlur={true}
              validateOnMount={true}
              onSubmit={(values, { setSubmitting }) => {
                const payload = {
                  id: authDetails?.accountHolderId,
                  agentId: authDetails?.agentId,
                  businessTypeId: 2,
                  selectedEntity: true,
                  isUSEntity: values?.isUSEntity == "yes" ? true : false,
                  isUSIndividual: false,
                  uniqueIdentifier: values?.uniqueIdentifier,
                  firstName: values?.firstName,
                  lastName: values?.lastName,
                  countryOfCitizenshipId: values?.countryOfCitizenshipId,
                  dob: values?.dob,
                  nameOfDisregarded: values?.nameOfDisregarded,
                  entityName: values?.entityName,
                  taxpayerIdTypeID: userType == "SC" ? 1 : values?.taxpayerIdTypeID,
                  usTin: values?.usTin,
                  foreignTINCountryId: values?.foreignTINCountryId,
                  foreignTIN: values?.foreignTIN,
                  foreignTINNotAvailable: values?.foreignTINNotAvailable, //
                  alternativeTINFormat: values?.alternativeTINFormat, //
                  giinId: values?.giinId,
                  permanentResidentialCountryId:
                    values?.permanentResidentialCountryId,
                  permanentResidentialStreetNumberandName:
                    values?.permanentResidentialStreetNumberandName,
                  permanentResidentialAptSuite:
                    values?.permanentResidentialAptSuite,
                  permanentResidentialCityorTown:
                    values?.permanentResidentialCityorTown,
                  permanentResidentialStateorProvince:
                    values?.permanentResidentialStateorProvince,
                  permanentResidentialZipPostalCode:
                    values?.permanentResidentialZipPostalCode,
                  isAddressRuralRoute:
                    values?.isAddressRuralRoute == "yes" ? true : false,
                  isAddressPostOfficeBox:
                    values?.isAddressPostOfficeBox == "yes" ? true : false,
                  isCareOfAddress:
                    values?.isCareOfAddress == "yes" ? true : false,
                  isalternativebusinessaddress:
                    values?.isalternativebusinessaddress == "yes"
                      ? true
                      : false,
                  permanentResidentialCountryId1:
                    values?.permanentResidentialCountryId1,
                  permanentResidentialStreetNumberandName1:
                    values?.permanentResidentialStreetNumberandName1,
                  permanentResidentialAptSuite1:
                    values?.permanentResidentialAptSuite1,
                  permanentResidentialCityorTown1:
                    values?.permanentResidentialCityorTown1,
                  permanentResidentialStateorProvince1:
                    values?.permanentResidentialStateorProvince1,
                  permanentResidentialZipPostalCode1:
                    values?.permanentResidentialZipPostalCode1,
                  contactFirstName: values?.contactFirstName,
                  contactLastName: values?.contactLastName,
                  contactEmail: values?.contactEmail,
                  primaryContactNumberId: values?.primaryContactNumberId,
                  primaryContactNumber: values?.primaryContactNumber,
                  alternativeNumberId: values?.alternativeNumberId,
                  alternativeNumber: values?.alternativeNumber,
                  alternativeNumberId1: values?.alternativeNumberId1,
                  alternativeNumber1: values?.alternativeNumber1,
                  incomeTypeId: incomeArr,
                  paymentTypeId: values?.paymentTypeId,
                  accountHolderName:
                    values?.accountHolderName === ""
                      ? ""
                      : values?.accountHolderName,
                  accountBankName: values?.accountBankName,
                  accountBankBranchLocationId:
                    values?.accountBankBranchLocationId,
                  accountNumber: values?.accountNumber,
                  abaRouting: values?.abaRouting,
                  iban: values?.iban,
                  swiftCode: values?.swiftCode,
                  bankCode: values?.bankCode,
                  makePayable: values?.makePayable,
                  payResidentalCountryId: values?.payResidentalCountryId,
                  payStreetNumberAndName: values?.payStreetNumberAndName,
                  payAptSuite: values?.payAptSuite,
                  vatId: values?.vatId,
                  vat: values?.vat,
                  doingBusinessAsName: values?.doingBusinessAsName,
                  payCityorTown: values?.payCityorTown,
                  payStateOrProvince: values?.payStateOrProvince,
                  payZipPostalCode: values?.payZipPostalCode,
                  sortCode: values?.sortCode,
                  bsb: values?.bsb,
                  capacityId: values?.capacityId,
                  isCorrectPaymentPurposes: values?.isCorrectPaymentPurposes,
                  isConfirmed: values?.isConfirmed,
                  usTinTypeId: +values?.taxpayerIdTypeID,
                };


                dispatch(postOnboarding(payload, (data: any) => {
                  console.log(data)
                  if (data.accountHolderID) {
                    dispatch({
                      type: Utils.actionName.UpdateAuthDetails,
                      payload: { ...authDetails, accountHolderId: data.accountHolderID }
                    })
                    localStorage.setItem("authDetails", JSON.stringify({ ...authDetails, accountHolderId: data.accountHolderID }));
                  }
                  localStorage.setItem("agentDetails", JSON.stringify({ ...payload, id: data.accountHolderID }));
                  localStorage.setItem("accountHolderDetails", JSON.stringify({ ...payload, id: data.accountHolderID }));
                  localStorage.setItem("isFormFilling", "true");
                  redirectFunc();
                }));

                setSubmitting(false);
              }
              }
              validationSchema={EntitySchema(userType, PaymentMandatry, IncomeMandatory, isGiinEnabled)}
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
              }) => (
                <Form onSubmit={handleSubmit}>
                  {values.permanentResidentialCountryId == 186 ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A111
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          {" "}
                          You have selected "other" and entered a country for
                          your permanent residency address not recognised by the
                          system. Your agent may need to obtain further
                          information from you.
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}
                  {values.isUSEntity === "no" && values.permanentResidentialCountryId === 256 ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A113
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          You have identified that you are submitting a form on
                          behalf of a NON U.S. Individual or a NON US Entity and
                          selected a form type W-8. You have indicated that the
                          Permanent Residential Address for U.S tax purposes IS
                          IN the United States. You will be asked to supply
                          additional information later in the process and your
                          agent may need to contact you for further information.
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}

                  {values.permanentResidentialCountryId && values.permanentResidentialCountryId1 &&
                    values.permanentResidentialCountryId !==
                    values.permanentResidentialCountryId1 ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A111
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          The country selected for your permanent residence
                          address does not match the country selected for your
                          mailing address. Your agent may need to obtain further
                          information from you.
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}
                  {values.permanentResidentialCountryId1 === 258 ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A111
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          You have provided an alternative mailing address that
                          is in the United States. Your agent may need to obtain
                          further information from you.{" "}
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}

                  {values.isAddressPostOfficeBox === "yes" ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A101
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          {" "}
                          You have indicated that your permanent residency
                          address is a PO Box. This may not be accepted as a
                          valid address. Your agent may need to obtain further
                          information from you.
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}

                  {values.isCareOfAddress === "yes" ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A102
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          {" "}
                          You have indicated that your permanent residency
                          address may be located at a Care of Address. This may
                          not be accepted as a valid address. Your agent may
                          need to obtain further information from you.
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}

                  {values.isUSEntity === "yes" && values.permanentResidentialCountryId &&
                    values.permanentResidentialCountryId != 258 ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A103
                        <span className="mx-1">
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
                        </span>
                        <span style={{ fontWeight: "Bold" }}>
                          Potential Address Mismatch
                        </span>
                      </Typography>

                      <Typography className="mt-3">
                        You have identified that you are submitting a form on
                        behalf of a U.S. Individual or a US Entity and indicated
                        that the Permanent Residential Address used for U.S tax
                        purposes is not in the U.S.
                      </Typography>
                      <Typography className="mt-2">
                        You will be asked to supply additional information later
                        in the process and your agent may need to contact you
                        for further information.
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}

                  {values.isUSEntity === "no" &&
                    values.permanentResidentialCountryId == 258 ? (
                    <div
                      className="my-4 mx-3"
                      style={{ backgroundColor: "#e8e1e1", padding: "10px" }}
                    >
                      <Typography>
                        A113
                        <span className="mx-1">
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
                        </span>
                        <span className="mx-1" style={{ marginTop: "1px" }}>
                          You are submitting a form on behalf of a Non U.S
                          Individual or a Non U.S Entity and indicated that the
                          Permanent Residential Address used for U.S tax
                          purposes is in the United States.
                        </span>
                      </Typography>
                    </div>
                  ) : (
                    ""
                  )}

                  {toolInfo === "ForeignTin" ? (
                    <div className="mt-5">
                      <Paper
                        style={{ backgroundColor: "#d1ecf1", padding: "15px" }}
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Typography style={{ color: "#0c5460" }}>
                            United Kingdom TIN Format is 9999999999 false 9-
                            Numeric value only A- Alphabetic character only *-
                            Alphanumeric character only ?- Characters optional
                            after this IF TIN format is not available, please
                            check the below box and continue
                          </Typography>

                          <Typography>
                            <CloseIcon
                              style={{
                                color: "#0c5460",
                                cursor: "pointer",
                                fontSize: "medium",
                              }}
                              onClick={() => {
                                setToolInfo("");
                              }}
                            />
                          </Typography>
                        </div>
                      </Paper>
                    </div>
                  ) : (
                    ""
                  )}

                  {toolInfo === "identity" ? (
                    <div className="mt-5">
                      <Paper
                        style={{ backgroundColor: "#d1ecf1", padding: "15px", marginLeft: "23px" }}
                      >
                        <div
                          className="d-flex"
                          style={{ justifyContent: "space-between" }}
                        >
                          <Typography style={{ color: "#0c5460" }}>
                            Instructor Identifier Format is ?********** 9-
                            Numeric value only A- Alphabetic character only *-
                            Alphanumeric character only ?- Characters optional
                            after this
                          </Typography>

                          <Typography>
                            <CloseIcon
                              style={{
                                color: "#0c5460",
                                cursor: "pointer",
                                fontSize: "medium",
                              }}
                              onClick={() => {
                                setToolInfo("");
                              }}
                            />
                          </Typography>
                        </div>
                      </Paper>
                    </div>
                  ) : (
                    ""
                  )}

                  <>{console.log(values, "entity", errors)}</>
                  <CardHeader
                    style={{ textAlign: "left" }}
                    className="flex-row-reverse"
                    title={
                      <div
                        style={{
                          marginLeft: "13px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen("basics")}
                        >
                          Basic Details
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Basic details - Entity
                                </Typography>
                                <a

                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setToolInfo("basic");
                                  }}

                                >
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
                              onClick={(e) => {
                                e.stopPropagation();

                              }}
                              style={{
                                color: "#ffc107",
                                fontSize: "15px",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            // onClick={clickInfo}
                            />
                          </Tooltip>
                        </div>
                        <p className="error mb-0">
                          {errors?.uniqueIdentifier && touched?.uniqueIdentifier || errors?.entityName && touched?.entityName
                            ? "Mandatory Information Required!"
                            : ""}
                        </p>
                      </div>
                    }
                    action={
                      <IconButton
                        onClick={() => handleOpen("basics")}
                        aria-label="expand"
                        size="small"
                        style={{ marginTop: "3px" }}
                      >
                        {open === "basics" ? (
                          <RemoveCircleOutlineOutlined />
                        ) : (
                          <ControlPointOutlined />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  {toolInfo === "basic" ? (
                    <div>
                      <Paper
                        style={{ backgroundColor: "#dedcb1", padding: "15px" }}
                      >
                        <Typography>Are you a U.S. Business?</Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          Select 'Yes' if: You are submitting a form on behalf
                          of a U.S. Business/Entity.
                        </Typography>
                        <Typography>
                          Select 'No' if: You are submitting a form on behalf of
                          a Business/Entity that is not a U.S. Business/Entity.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          IRS Form Guidance
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          A U.S. entity is an entity created or organized in the
                          U.S. or under the law of any state in the United
                          States.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          The term 'Non-U.S. Entity' generally means any
                          business or organization including corporations,
                          partnerships, public or private limited companies,
                          trusts etc, not created or organized in the United
                          States or under the law of any state in the U.S. or
                          its territories.
                        </Typography>
                        <Typography>
                          For additional clarification, follow the following
                          link:{" "}
                          <Link href="https://www.irs.gov/individuals/international-taxpayers/classification-of-taxpayers-for-us-tax-purposes">
                            https://www.irs.gov/individuals/international-taxpayers/classification-of-taxpayers-for-us-tax-purposes
                          </Link>
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          Ref: H002{" "}
                        </Typography>
                        <Link
                          underline="none"
                          style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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
                  <Collapse
                    className="px-5 mx-2"
                    in={open === "basics"}
                    timeout="auto"
                    unmountOnExit
                  >
                    <FormControl className="w-100">
                      <div className="row">
                        <div>
                          <Typography
                            align="left"
                            style={{ marginTop: "20px" }}
                          >
                            Are you a U.S. Entity?
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <div className="d-flex">
                            <FormControl
                              error={Boolean(
                                touched.isUSEntity && errors.isUSEntity
                              )}
                            >
                              <RadioGroup
                                id="isUSEntity"
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values.isUSEntity}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  control={<Radio />}
                                  value="yes"
                                  name="isUSEntity"
                                  label="Yes"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  value="no"
                                  name="isUSEntity"
                                  label="No"
                                />
                              </RadioGroup>
                              {errors.isUSEntity ? (
                                <div>
                                  <Typography color="error">
                                    {errors.isUSEntity}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                            {/* <Typography className="my-auto">Yes</Typography>
                            <Radio
                              checked={values.isUSEntity}
                              onChange={handleChange}
                              // setPayload({ ...payload, isUSEntity: true })
                              value={true}
                              name="isUSEntity"
                              inputProps={{ "aria-label": "Yes" }}
                            />
                            <Typography className="my-auto">No</Typography>
                            <Radio
                              checked={!values.isUSEntity}
                              onChange={handleChange}
                              value={false}
                              name="isUSEntity"
                              inputProps={{ "aria-label": "No" }}
                            /> */}
                          </div>
                          {/* <div className="d-flex">
                            <Typography className="my-auto">Yes</Typography>
                            <Radio
                              required
                              checked={payload.isUSEntity}
                              onChange={() =>
                                setPayload({ ...payload, isUSEntity: true })
                              }
                              value="yes"
                              name="radio-buttons"
                              inputProps={{ "aria-label": "Yes" }}
                            />
                            <Typography className="my-auto">No</Typography>
                            <Radio
                              required
                              checked={!payload.isUSEntity}
                              onChange={() =>
                                setPayload({ ...payload, isUSEntity: false })
                              }
                              // value={!payload.isUSEntity}
                              value="no"
                              name="radio-buttons"
                              inputProps={{ "aria-label": "No" }}
                            />
                          </div> */}
                        </div>

                        <div className="col-lg-3 col-6 col-md-3">
                          <Typography className="d-flex w-100 ">
                            Unique Identifier
                            <span style={{ color: "red" }}>*</span>
                            <Tooltip
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                              title={
                                <>
                                  <a
                                    onClick={() => setToolInfo("identity")}
                                  ></a>
                                </>
                              }
                            >
                              <Info
                                style={{
                                  color: "#ffc107", fontSize: "15px",
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setToolInfo("identity")}
                              />
                            </Tooltip>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            className="w-100 input"

                            name="uniqueIdentifier"
                            placeholder="Enter Instructor Identifier"
                            onChange={handleChange}
                            onKeyUp={(e) => onNumberChange(e, values)}
                            onBlur={(e) => onUidBlur(e, values)}
                            error={Boolean(
                              touched.uniqueIdentifier &&
                              errors.uniqueIdentifier
                            )}
                            value={values?.uniqueIdentifier}
                          />
                          {touched.uniqueIdentifier &&
                            errors.uniqueIdentifier ? (<p className="error">{errors.uniqueIdentifier}</p>) : ""}
                        </div>
                      </div>
                    </FormControl>

                    {values.isUSEntity === "no" ? (
                      <div className="row">
                        <div className="col-lg-3 col-6 col-md-3 mt-2">
                          <FormControl className="w-100">
                            <Typography align="left">
                              Entity Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              required
                              id="outlined"
                              name="entityName"
                              placeholder="Enter Business Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched.entityName && errors.entityName
                              )}
                              value={values.entityName}
                            />
                            {touched.entityName && errors.entityName ? (<p className="error">{errors.entityName}</p>) : ""}
                          </FormControl>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col-lg-3 col-6 col-md-3 mt-2">
                          <FormControl className="w-100">
                            <Typography align="left">
                              Entity Name<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              id="outlined"
                              name="entityName"
                              placeholder="Enter Business Name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched.entityName && errors.entityName
                              )}
                              value={values.entityName}
                            />
                            {touched.entityName && errors.entityName ? (<p className="error">{errors.entityName}</p>) : ""}
                          </FormControl>
                        </div>
                      </div>
                    )}
                  </Collapse>
                  <hr className="w-100"></hr>

                  <CardHeader
                    style={{ textAlign: "left" }}
                    className="flex-row-reverse"
                    title={
                      <div
                        style={{
                          marginLeft: "13px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen("tax")}
                        >
                          Tax Identification Numbers
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Taxpayer information
                                </Typography>
                                <a
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setToolInfo("tin");
                                  }}
                                >
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
                              onClick={(e) => {
                                e.stopPropagation();

                              }}
                              style={{
                                color: "#ffc107",
                                fontSize: "15px",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            // onClick={clickInfo}
                            />
                          </Tooltip>
                        </div>
                        <p className="error mb-0">
                          {errors?.taxpayerIdTypeID && touched?.taxpayerIdTypeID ||
                            errors?.usTin && touched?.usTin ||
                            errors?.vatId && touched?.vatId || errors?.vat && touched?.vat
                            ? "Mandatory Information Required!"
                            : ""}
                        </p>
                      </div>
                    }
                    action={
                      <IconButton
                        onClick={() => handleOpen("tax")}
                        aria-label="expand"
                        size="small"
                        style={{ marginTop: "3px" }}
                      >
                        {open === "tax" ? (
                          <RemoveCircleOutlineOutlined />
                        ) : (
                          <ControlPointOutlined />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  {toolInfo === "tin" ? (
                    <div>
                      <Paper
                        style={{ backgroundColor: "#dedcb1", padding: "15px" }}
                      >
                        <Typography>
                          Where applicable enter your US and Non-US (i.e.
                          “Foreign”) taxpayer identification number(s) along
                          with the US TIN Type and Foreign Country(ies)
                          correlating to the FTIN(s).?
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          Please note that some jurisdictions do not provide
                          FTINs and this will be indicated if you select one of
                          those jurisdictions. If you select a country that
                          normally does provide an FTIN, but you do not wish to
                          provide or cannot provide, you have the option to
                          provide an explanation. Not providing a FTIN when it
                          would normally be available may lead to the highest
                          rate of withholding being applied, where treaty
                          benefits could apply.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          Note: the Foreign TIN box restricts formatting per the
                          Foreign Country selected, based on OECD guidance. By
                          ticking “TIN Format not available”, this disables the
                          formatting so that any format may be input.
                        </Typography>
                        <Typography>
                          An individual’s US TIN type is generally a Social
                          Security Number (SSN) or an Individual Tax
                          Identification Number (ITIN).?
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          An entity’s US TIN may be an employer identification
                          number (EIN): including a withholding foreign
                          partnership/trust EIN (WP/T-EIN) or a qualified
                          intermediary EIN (QI-EIN).{" "}
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          A TIN must be furnished on US tax returns when filed
                          or when claiming treaty benefits. A US or Foreign TIN
                          must generally be provided on a withholding
                          certificate (i.e. W-8) if the beneficial owner is
                          receiving effectively connected income (ECI), claiming
                          tax treaty benefits (other than for income from
                          marketable, actively traded, securities), claiming an
                          exemption for ECI or claiming an exemption for certain
                          annuities.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          If you are required to have a US TIN but do not have
                          one you may apply for an EIN on Form SS-4, Application
                          for Employer Identification Number, a SSN on Form
                          SS-5, Application for a Social Security Card or an
                          ITIN on Form W-7, IRS Application for Individual
                          Taxpayer Identification Number.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          IRS Form Guidance:
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          See Regulations section 1.1441-1(e)(4) (vii) for when
                          you are required to provide a U.S. TIN on a Form W-8
                          associated with a payment subject to chapter 3
                          withholding. A partner in a partnership conducting a
                          trade or business in the United States will likely be
                          allocated effectively connected taxable income. The
                          partner is required to file a U.S. federal income tax
                          return and must have a U.S. taxpayer identification
                          number (TIN). You must provide a U.S. TIN if you are:
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          - Claiming an exemption from withholding under section
                          871(f) for certain annuities received under qualified
                          plans, or{" "}
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          - Claiming benefits under an income tax treaty and
                          have not provided a foreign TIN on line 9b.{" "}
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          However, a TIN is not required to be shown in order to
                          claim treaty benefits on the following items of
                          income:
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          - Dividends and interest from stocks and debt
                          obligations that are actively traded;
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          - investment company registered under the Investment
                          Company Act of 1940 (mutual fund);
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          - Dividends, interest, or royalties from units of
                          beneficial interest in a unit investment trust that
                          are (or were upon issuance) publicly offered and are
                          registered with the SEC under the Securities Act of
                          1933;
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          - and Income related to loans of any of the above
                          securities.
                        </Typography>

                        <Link
                          underline="none"
                          style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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

                  <Collapse
                    className="px-5 mx-2"
                    in={open === "tax"}
                    timeout="auto"
                    unmountOnExit
                  >
                    {values.isUSEntity === "no" ? (
                      <div className="row d-flex mt-3">
                        <div className="col-lg-3 col-6 col-md-3 ">
                          <Typography align="left" className="d-flex w-100 ">
                            U.S. TIN Type
                            <span
                              style={{ color: "red", verticalAlign: "super" }}
                            >
                              *
                            </span>
                          </Typography>

                          <FormControl className="w-100">
                            <select
                              style={{
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "36px",
                              }}
                              name="taxpayerIdTypeID"
                              id="taxpayerIdTypeID"
                              onChange={(e: any) => {
                                handleChange(e);

                                if (
                                  e.target.value == 0 ||
                                  e.target.value == 1 ||
                                  e.target.value == 3 ||
                                  e.target.value == 4 ||
                                  e.target.value == 5 ||
                                  e.target.value == 7 ||
                                  e.target.value == 8
                                )
                                  setFieldValue("usTin", "");
                              }}
                              value={values.taxpayerIdTypeID}
                            >
                              <option value={0}>---select---</option>
                              {/* <option value={2}>SSN/ITIN</option> */}
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
                          </FormControl>
                          {errors.taxpayerIdTypeID && touched.taxpayerIdTypeID ? (<p className="error">{errors.taxpayerIdTypeID}</p>) : ""}
                        </div>

                        <div className="col-lg-3 col-6 col-md-3">
                          <FormControl className="w-100">
                            <Typography align="left" className="d-flex w-100 ">
                              U.S.TIN
                            </Typography>
                            <Input
                              disabled={
                                values.taxpayerIdTypeID == 8 ||
                                values.taxpayerIdTypeID == 7 ||
                                values.taxpayerIdTypeID == 1
                              }
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              id="outlined"
                              name="usTin"
                              placeholder="Enter U.S. TIN"
                              onKeyDown={(e) => formatTin(e, values)}
                              onChange={handleChange}
                              inputProps={{ maxLength: 10 }}
                              value={values.usTin}
                            />
                          </FormControl>
                          {errors.usTin && touched.usTin ? <p className="error">{errors.usTin}</p> : <></>}
                          {/* {values.taxpayerIdTypeID == 6 ||
                            values.taxpayerIdTypeID == 7 ||
                            values.taxpayerIdTypeID == 8 ||
                            values.taxpayerIdTypeID == 1 ? (
                            ""
                          ) : (
                            <p className="error">{errors.usTin}</p>
                          )} */}
                        </div>
                        <div className="col-lg-3 col-6 col-md-3 ">
                          <Typography align="left" className="d-flex w-100 ">
                            Foreign TIN Country

                          </Typography>

                          <FormControl className="w-100">
                            <select
                              style={{
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "36px",
                              }}
                              name="foreignTINCountryId"
                              id="Income"
                              defaultValue={0}
                              onChange={(e) => {
                                handleChange(e);
                                if (Number(e.target.value) === 0) {
                                  setFieldValue("foreignTIN", "");
                                } else if (values.foreignTINCountryId == 0 || values.foreignTINNotAvailable == true) {
                                  setFieldValue("foreignTIN", "");
                                }
                              }}
                              value={values.foreignTINCountryId}
                            >
                              <option value={0}>---select---</option>
                              {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                            </select>
                          </FormControl>
                        </div>

                        <div className="col-lg-3 col-6 col-md-3">
                          <FormControl className="w-100">
                            <Typography align="left">Foreign TIN</Typography>
                            <Input
                              disabled={
                                values.foreignTINCountryId == 0 ||
                                (values.foreignTINCountryId != 0 &&
                                  values.foreignTINNotAvailable == true)
                              }
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              id="outlined"
                              name="foreignTIN"
                              placeholder="Enter foreign TIN"
                              onChange={handleChange}
                              value={values.foreignTIN}
                            />
                          </FormControl>
                          <div className="d-flex">
                            <Typography
                              style={{ fontSize: "13px", marginTop: "10px" }}
                            >
                              Not Available{" "}
                            </Typography>
                            <FormControl
                              error={Boolean(
                                touched.foreignTINNotAvailable &&
                                errors.foreignTINNotAvailable
                              )}
                            >
                              <Checkbox
                                id="foreignTINNotAvailable"
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values.foreignTINNotAvailable}
                                // disabled={values.foreignTINCountryId == 0}
                                checked={values.foreignTINNotAvailable}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (e.target.value)
                                    setFieldValue(
                                      "alternativeTINFormat",
                                      false
                                    );
                                    setFieldValue("foreignTIN", "");
                                }}
                              />

                              {errors.foreignTINNotAvailable &&
                                touched.foreignTINNotAvailable ? (
                                <div>
                                  <Typography color="error">
                                    {errors.foreignTINNotAvailable}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                            <Typography
                              style={{ fontSize: "13px", marginTop: "10px" }}
                            >
                              Alternative TIN Format
                            </Typography>
                            <FormControl
                              error={Boolean(
                                touched.alternativeTINFormat &&
                                errors.alternativeTINFormat
                              )}
                            >
                              <Checkbox
                                id="alternativeTINFormat"
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values.alternativeTINFormat}
                                // disabled={
                                //   values.foreignTINCountryId == 0 ||
                                //   values.foreignTINCountryId != 257
                                // }
                                checked={values.alternativeTINFormat}
                                onChange={(e) => {
                                  handleChange(e);
                                  if (e.target.value)
                                    setFieldValue(
                                      "foreignTINNotAvailable",
                                      false
                                    );
                                    setFieldValue("foreignTIN", "");
                                }}
                              />

                              {errors.alternativeTINFormat &&
                                touched.alternativeTINFormat ? (
                                <div>
                                  <Typography color="error">
                                    {errors.alternativeTINFormat}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                          {/* <div className="col-lg-3 col-6 col-md-3 ">
                            <FormControl className="w-100">
                              <Typography align="left">
                                GIIN
                                <Info
                                  style={{
                                    color: "#ffc107",
                                    fontSize: "15px",
                                    marginBottom: "12px",
                                  }}
                                  
                                />
                              </Typography>
                              <Input
                                required
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="giin"
                                type="uppercase"
                                placeholder="Enter GIIN"
                                onChange={(e) =>
                                  setPayload({
                                    ...payload,
                                    giin: e.target.value,
                                  })
                                }
                                value={payload.giin}
                              />
                            </FormControl>
                          </div> */}
                        </div>
                        {userType === "DC" ? (
                          ""
                        ) :
                          <div className="col-12">
                            <div className="row">
                              <div className="col-lg-3 col-6 col-md-3 ">
                                <Typography align="left" className="d-flex w-100">
                                  Value Added Tax Number (VAT)
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>

                                <FormControl className="w-100">
                                  <select
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                    name="vatId"
                                    defaultValue={0}
                                    onChange={(e: any) => {
                                      handleChange(e);

                                      if (
                                        e.target.value == 2 ||
                                        e.target.value == 0
                                      )
                                        setFieldValue("vat", "");
                                    }}
                                    value={values.vatId}
                                  >
                                    <option value={0}>---select---</option>
                                    <option value={1}>My VAT Number is</option>
                                    <option value={2}>
                                      I Do Not Have A VAT Number
                                    </option>
                                  </select>
                                  {errors.vatId && touched.vatId ? (<p className="error">{errors.vatId}</p>) : ""}
                                </FormControl>
                              </div>

                              <div className="col-lg-3 col-6 col-md-3 ">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Value Added Tax Number (VAT)
                                    {/* <span style={{ color: 'red' }}>*</span> */}
                                  </Typography>
                                  <Input
                                    disabled={
                                      values.vatId == 0 || values.vatId == 2
                                    }
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="vat"
                                    placeholder="Enter Value Added Tax Number"
                                    // onKeyDown={formatTin}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 11 }}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.vat && errors.vat)}
                                    //   error={Boolean(touched.usTin && errors.vat)}
                                    value={values.vat}
                                  />
                                  {errors.vat && touched.vat ? <p className="error">{errors.vat}</p> : <></>}
                                </FormControl>
                              </div>


                            </div>
                          </div>

                        }
                        {isGiinEnabled ? <div className="col-12" style={{ marginTop: "20px" }}>
                          <div className="row">
                            <div className="col-lg-3 col-6 col-md-3 ">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  GIIN
                                  {/* <span style={{ color: 'red' }}>*</span> */}
                                  <span>
                                    <Tooltip
                                      style={{
                                        backgroundColor: "black",
                                        color: "white",
                                      }}
                                      title={
                                        <>
                                          <Typography color="inherit">
                                            Tax Residency Information - GIIN
                                          </Typography>
                                          <a onClick={() => setToolInfo("giin")}>
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

                                  {toolInfo === "giin" ? (
                                    <div>
                                      <Paper
                                        style={{
                                          backgroundColor: "#dedcb1",
                                          padding: "15px",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Typography sx={{ color: "black", marginBottom: "10px" }}>GIIN means a Global Intermediary Identification Number assigned to a PFFI or Registered Deemed Compliant FFI.</Typography>
                                        <Typography sx={{ color: "gray", marginBottom: "10px" }}>
                                          A separate GIIN will be issued to the Financial Institution to identify each jurisdiction, including the FI's jurisdiction of residence, in which the FI maintains a branch that is not treated as a Limited Branch.
                                        </Typography>
                                        <Typography sx={{ color: "gray", marginBottom: "10px" }}>
                                          A GIIN will be issued to only those Financial Institutions that are not Limited FFIs, Limited Branches, or U.S. branches of an FFI, and will be issued after an FI's FATCA Registration is submitted and approved.
                                        </Typography>
                                        <Typography sx={{ color: "gray", marginBottom: "10px" }}>
                                          Format: XXXXXX.XXXXX.XX.XXX
                                        </Typography>
                                        <Link
                                          href="#"
                                          underline="none"
                                          style={{
                                            marginTop: "10px",
                                            fontSize: "16px", color: "#0000C7"
                                          }}
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
                                </Typography>
                                <Input
                                  style={{
                                    border: " 1px solid #d9d9d9 ",
                                    height: " 36px",
                                    lineHeight: "36px ",
                                    background: "#fff ",
                                    fontSize: "13px",
                                    color: " #000 ",
                                    fontStyle: "normal",
                                    borderRadius: "1px",
                                    padding: " 0 10px ",
                                  }}
                                  id="outlined"
                                  name="giinId"
                                  placeholder="Enter GIIN"
                                  onChange={handleChange}
                                  // inputProps={{ maxLength: 11 }}
                                  onBlur={handleBlur}
                                  error={Boolean(touched.giinId && errors.giinId)}
                                  value={values.giinId}
                                />
                                {errors.giinId && touched.giinId ? <p className="error">{errors.giinId}</p> : <></>}
                              </FormControl>
                            </div>


                          </div>
                        </div> : <></>}

                      </div>
                    ) : (
                      <div className="col-12 d-flex">
                        <div className="col-lg-3 col-6 col-md-3 ">
                          <Typography align="left" className="d-flex w-100 ">
                            U.S. TIN Type
                            <span
                              style={{ color: "red", verticalAlign: "super" }}
                            >
                              *
                            </span>
                          </Typography>

                          <FormControl className="w-100">
                            <select
                              style={{
                                padding: " 0 10px",
                                color: "#121112",
                                fontStyle: "italic",
                                height: "36px",
                              }}
                              name="taxpayerIdTypeID"
                              id="Income"
                              defaultValue={1}
                              onChange={(e: any) => {
                                handleChange(e);

                                if (
                                  e.target.value == 0 ||
                                  e.target.value == 5 ||
                                  e.target.value == 6 ||
                                  e.target.value == 7 ||
                                  e.target.value == 8
                                )
                                  setFieldValue("usTin", "");
                              }}
                              value={values.taxpayerIdTypeID}
                            >
                              <option value={0}>---select---</option>
                              {/* <option value={2}>EIN</option>
                              <option value={3}>QIEIN</option>
                              <option value={4}>WPEIN</option>
                              <option value={5}>U.S TIN not applicable</option>
                              <option value={6}>U.S TIN not available</option> */}
                              {nonUSEntity?.map((ele: any) => (
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
                            {errors.taxpayerIdTypeID && touched.taxpayerIdTypeID ? (<p className="error">{errors.taxpayerIdTypeID}</p>) : ""}
                          </FormControl>
                        </div>

                        <div className="col-lg-3 col-6 col-md-3 mx-2">
                          <FormControl className="w-100">
                            <Typography className="d-flex w-100 " align="left">
                              U.S. TIN
                              <span
                                style={{ color: "red", verticalAlign: "super" }}
                              >
                                *
                              </span>
                            </Typography>
                            <Input
                              disabled={values.taxpayerIdTypeID == 0}
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              id="outlined"
                              name="usTin"
                              placeholder="Enter U.S. TIN"
                              onKeyDown={(e) => formatTin(e, values)}
                              onChange={handleChange}
                              inputProps={{ maxLength: 11 }}
                              value={values.usTin}
                            />
                          </FormControl>
                        </div>
                      </div>
                    )}
                  </Collapse>
                  <hr className="w-100"></hr>

                  {/* Permanent Residence Section */}
                  <CardHeader
                    style={{ textAlign: "left" }}
                    className="flex-row-reverse"
                    title={
                      <div
                        style={{
                          marginLeft: "13px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen("pra")}
                        >
                          Permanent Residence Address
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Address Details
                                </Typography>
                                <a
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setToolInfo("Address");
                                  }}

                                >
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
                              onClick={(e) => {
                                e.stopPropagation();

                              }}
                              style={{
                                color: "#ffc107",
                                fontSize: "15px",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            // onClick={clickInfo}
                            />
                          </Tooltip>
                        </div>
                        <p className="error mb-0">
                          {errors?.permanentResidentialCountryId && touched?.permanentResidentialCountryId ||
                            errors?.permanentResidentialStreetNumberandName && touched?.permanentResidentialStreetNumberandName ||
                            errors?.permanentResidentialCityorTown && touched?.permanentResidentialCityorTown ||
                            errors?.permanentResidentialZipPostalCode && touched?.permanentResidentialZipPostalCode ||
                            errors?.isAddressRuralRoute && touched?.isAddressRuralRoute ||
                            errors?.isalternativebusinessaddress && touched?.isalternativebusinessaddress ||
                            errors?.isAddressPostOfficeBox && touched?.isAddressPostOfficeBox ||
                            errors?.isCareOfAddress && touched?.isCareOfAddress ||
                            errors?.permanentResidentialCountryId1 && touched?.permanentResidentialCountryId1 ||
                            errors?.permanentResidentialStreetNumberandName1 && touched?.permanentResidentialStreetNumberandName1 ||
                            errors?.permanentResidentialCityorTown1 && touched?.permanentResidentialCityorTown1 ||
                            errors?.permanentResidentialZipPostalCode1 && touched?.permanentResidentialZipPostalCode1
                            ? "Mandatory Information Required!"
                            : ""}
                        </p>
                      </div>
                    }
                    action={
                      <IconButton
                        onClick={() => handleOpen("pra")}
                        aria-label="expand"
                        size="small"
                        style={{ marginTop: "3px" }}
                      >
                        {open === "pra" ? (
                          <RemoveCircleOutlineOutlined />
                        ) : (
                          <ControlPointOutlined />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  {toolInfo === "Address" ? (
                    <div>
                      <Paper
                        style={{ backgroundColor: "#dedcb1", padding: "15px" }}
                      >
                        <Typography>
                          Please enter the permanent residence address of the
                          individual, business or organization the submission
                          represents. This should be in the country where that
                          payee’s income tax submission is made.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          If there is a mailing address that differs from the
                          permanent address, then please enter that as well.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          IRS Guidance:
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          Non-US Person, W-8 submissions, should not use a Post
                          Office (PO Box), a Care-of-address, or mailing address
                          of a financial organization as these may not be
                          considered valid. If you do, the agent receiving the
                          form may require additional information from you to
                          help validate your residency status. Ref: EH005
                        </Typography>

                        <Link
                          underline="none"
                          style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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
                  <Collapse
                    className="px-5 mx-2"
                    in={open === "pra"}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="row d-flex">
                      <div className="col-lg-3 col-6 col-md-3">
                        <Typography className="d-flex w-100 ">
                          Country:
                          <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <FormControl className="w-100">
                          <select
                            style={{
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "36px",
                            }}
                            name="permanentResidentialCountryId"
                            id="Income"
                            // defaultValue={1}
                            onChange={(e) => {
                              handleChange(e);
                              dispatch(getAllStateByCountryId(e.target.value));
                            }}
                            onBlur={handleBlur}
                            value={values.permanentResidentialCountryId}
                          >
                            <option value={0}>---select---</option>

                            {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                          </select>
                          {errors.permanentResidentialCountryId && touched.permanentResidentialCountryId ? (<p className="error">
                            {errors.permanentResidentialCountryId}
                          </p>) : ""}
                        </FormControl>
                      </div>
                      {values.permanentResidentialCountryId == 186 ? (
                        <div className="col-lg-3 col-6 col-md-3 mx-3">
                          <FormControl className="w-100">
                            <Typography align="left">
                              Other:
                              <span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              id="outlined"
                              name="otherCountry"
                              placeholder="Enter Other Country Name"
                              onChange={handleChange}
                              // onBlur={handleBlur}
                              error={Boolean(
                                touched.otherCountry && errors.otherCountry
                              )}
                              value={values.otherCountry}
                            />
                            {errors.permanentResidentialStreetNumberandName && touched.permanentResidentialStreetNumberandName ? (<p className="error">
                              {errors.permanentResidentialStreetNumberandName}
                            </p>) : ""}
                          </FormControl>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            Street Number and Name:
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="permanentResidentialStreetNumberandName"
                            placeholder="Enter Street Number and Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.permanentResidentialStreetNumberandName &&
                              errors.permanentResidentialStreetNumberandName
                            )}
                            value={
                              values.permanentResidentialStreetNumberandName
                            }
                          />
                          {touched.permanentResidentialStreetNumberandName &&
                            errors.permanentResidentialStreetNumberandName ? (<p className="error">
                              {errors.permanentResidentialStreetNumberandName}
                            </p>) : ""}
                        </FormControl>
                      </div>
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">Apt/Suite:</Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="permanentResidentialAptSuite"
                            placeholder="Enter Apt/Suite"
                            onChange={handleChange}
                            value={values.permanentResidentialAptSuite}
                          />
                        </FormControl>
                      </div>
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            City or Town:<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="permanentResidentialCityorTown"
                            placeholder="Enter City or Town"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.permanentResidentialCityorTown &&
                              errors.permanentResidentialCityorTown
                            )}
                            value={values.permanentResidentialCityorTown}
                          />
                          {touched.permanentResidentialCityorTown &&
                            errors.permanentResidentialCityorTown ? (<p className="error">
                              {errors.permanentResidentialCityorTown}
                            </p>) : ""}
                        </FormControl>
                      </div>
                      {/* {is_US ? (
                    <div className="col-lg-3 col-6 col-md-3 mt-2">
                      <FormControl className="w-100">
                        <Select
                          style={{
                            padding: ' 0 10px',
                            color: '#7e7e7e',
                            fontStyle: 'italic',
                            height: '36px',
                            marginTop: '23px',
                          }}
                          defaultValue={0}
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                        >
                          <MenuItem value="0">--Select--</MenuItem>
                          <MenuItem value={1}>Alabama</MenuItem>
                          <MenuItem value={2}>Alaska</MenuItem>
                          <MenuItem value={3}>etc</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  ) : ( */}
                      {GetStateByCountryIdReducer?.allCountriesStateIdData &&
                        GetStateByCountryIdReducer?.allCountriesStateIdData
                          ?.length > 0 ? (
                        <div className="col-lg-3 col-6 col-md-3 mt-2">
                          <Typography align="left" className="d-flex w-100 ">
                            State or Province:
                            {/* <span style={{ color: 'red' }}>*</span> */}
                          </Typography>

                          <FormControl className="w-100">
                            <select
                              style={{
                                padding: " 0 10px",
                                color: "#7e7e7e",
                                fontStyle: "italic",
                                height: "36px",
                              }}
                              name="permanentResidentialStateorProvince"
                              // id="Income"
                              onChange={handleChange}
                              value={values.permanentResidentialStateorProvince}
                            >
                              <option value="0">
                                <em>---select---</em>
                              </option>
                              {GetStateByCountryIdReducer?.allCountriesStateIdData?.map(
                                (ele: any) => (
                                  <option key={ele?.id} value={ele?.name}>
                                    {ele?.name}
                                  </option>
                                )
                              )}
                            </select>
                          </FormControl>
                        </div>
                      ) : (
                        <div className="col-lg-3 col-6 col-md-3 mt-2">
                          <FormControl className="w-100">
                            <Typography align="left">
                              State or Province:
                            </Typography>
                            <Input
                              disabled={
                                values.permanentResidentialCountryId == 0
                              }
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              id="outlined"
                              name="permanentResidentialStateorProvince"
                              placeholder="Enter State or Province"
                              onChange={handleChange}
                              value={values.permanentResidentialStateorProvince}
                            />
                          </FormControl>
                        </div>
                      )}
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            Zip / Postal Code:
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="permanentResidentialZipPostalCode"
                            placeholder="Enter Zip or Postal Code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.permanentResidentialZipPostalCode &&
                              errors.permanentResidentialZipPostalCode
                            )}
                            value={values.permanentResidentialZipPostalCode}
                          />
                          {touched.permanentResidentialZipPostalCode &&
                            errors.permanentResidentialZipPostalCode ? (<p className="error">
                              {errors.permanentResidentialZipPostalCode}
                            </p>) : ""}
                        </FormControl>
                      </div>
                      {values.permanentResidentialCountryId == 45 ? (
                        <div className="mx-5">
                          <Typography style={{ marginTop: "20px" }}>
                            Is this address a rural route number?
                            <span style={{ color: "red" }}>*</span>
                          </Typography>

                          <div className="d-flex">
                            <FormControl
                              error={Boolean(
                                touched.isAddressRuralRoute &&
                                errors.isAddressRuralRoute
                              )}
                            >
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={values.isAddressRuralRoute}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                  name="isAddressRuralRoute"
                                />
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                  name="isAddressRuralRoute"
                                />
                              </RadioGroup>
                              {errors.isAddressRuralRoute &&
                                touched.isAddressRuralRoute ? (
                                <div>
                                  <Typography color="error">
                                    {errors.isAddressRuralRoute}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="d-flex">
                      {values.isUSEntity == "yes" ? (
                        <div className="">
                          <Typography style={{ marginTop: "20px" }}>
                            Is there an alternative mailing or business address
                            in the U.S.?
                            <span style={{ color: "red" }}>*</span>
                            <span>
                              <Tooltip
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                                title={
                                  <>
                                    <Typography color="inherit">
                                      Address Details
                                    </Typography>
                                    <a onClick={() => setToolInfo("mail")}>
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
                                    fontSize: "15px",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                // onClick={clickInfo}
                                />
                              </Tooltip>
                            </span>
                          </Typography>
                          {toolInfo === "mail" ? (
                            <div>
                              <Paper
                                style={{
                                  backgroundColor: "#dedcb1",
                                  padding: "15px",
                                }}
                              >
                                <Typography>
                                  Please check this box if you have an
                                  alternative mailing address away from the
                                  permanent residential address entered here.
                                </Typography>
                                <Typography style={{ marginTop: "10px" }}>
                                  You will be asked to enter the alternative
                                  address later in the process and in some
                                  circumstances you may need to provide
                                  additional information.
                                </Typography>

                                <Link
                                  underline="none"
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "16px", cursor: "pointer", color: "#0000C7"
                                  }}
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

                          <div className="d-flex">
                            <FormControl
                              error={Boolean(
                                touched.isalternativebusinessaddress &&
                                errors.isalternativebusinessaddress
                              )}
                            >
                              <RadioGroup
                                id="isalternativebusinessaddress"
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                value={values.isalternativebusinessaddress}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  control={<Radio />}
                                  value="no"
                                  name="isalternativebusinessaddress"
                                  label="No"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  value="yes"
                                  name="isalternativebusinessaddress"
                                  label="Yes"
                                />
                              </RadioGroup>
                              {errors.isalternativebusinessaddress &&
                                touched.isalternativebusinessaddress ? (
                                <div>
                                  <Typography color="error">
                                    {errors.isalternativebusinessaddress}
                                  </Typography>
                                </div>
                              ) : (
                                ""
                              )}
                            </FormControl>
                            {/* <Typography className="my-auto">Yes</Typography>
                            <Radio
                              required
                              checked={values.isalternativebusinessaddress}
                              onChange={handleChange}
                              value={values.isalternativebusinessaddress}
                              name="radio-buttons"
                              inputProps={{ "aria-label": "A" }}
                            />
                            <Typography className="my-auto">No</Typography>
                            <Radio
                              required
                              checked={!values.isalternativebusinessaddress}
                              onChange={handleChange}
                              value={!values.isalternativebusinessaddress}
                              name="radio-buttons"
                              inputProps={{ "aria-label": "B" }}
                            /> */}
                          </div>
                        </div>
                      ) : (
                        <div className="col-12">
                          <div
                            className=" d-lg-flex justify-content-between"
                            style={{ justifyContent: "between" }}
                          >
                            <>
                              <div className="col-4">
                                <Typography
                                  align="left"
                                  style={{ marginTop: "20px" }}
                                >
                                  Is this address a PO Box?
                                  <span style={{ color: "red" }}>*</span>
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          TT-071 PO BOX Address
                                        </Typography>
                                        <a onClick={() => setToolInfo("PO")}>
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
                                        fontSize: "15px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                        verticalAlign: "super",
                                      }}
                                    />
                                  </Tooltip>
                                </Typography>
                                {toolInfo === "PO" ? (
                                  <div className="post">
                                    <Paper
                                      style={{
                                        backgroundColor: "#dedcb1",
                                        padding: "10px",
                                      }}
                                    >
                                      <Typography>
                                        A Post Office Box is a mail box located
                                        at a post office (versus at a permanent
                                        residence).
                                      </Typography>
                                      <Typography style={{ marginTop: "10px" }}>
                                        You should not use a P.O. Box or an
                                        in-care-of-address (other than a
                                        registered address). If you do, we may
                                        need to contact you for further
                                        information to help validate the
                                        submission.
                                      </Typography>

                                      <Typography style={{ marginTop: "10px" }}>
                                        If you reside in a country that does not
                                        use street addresses, you may enter a
                                        descriptive address.
                                      </Typography>

                                      <Link
                                        underline="none"
                                        style={{
                                          marginTop: "10px",
                                          fontSize: "16px", cursor: "pointer", color: "#0000C7"
                                        }}
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
                                <FormControl
                                  error={Boolean(
                                    touched.isAddressPostOfficeBox &&
                                    errors.isAddressPostOfficeBox
                                  )}
                                >
                                  <RadioGroup
                                    id="isAddressPostOfficeBox"
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={values.isAddressPostOfficeBox}
                                    onChange={handleChange}
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="yes"
                                      name="isAddressPostOfficeBox"
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="no"
                                      name="isAddressPostOfficeBox"
                                      label="No"
                                    />
                                  </RadioGroup>
                                  {errors.isAddressPostOfficeBox &&
                                    touched.isAddressPostOfficeBox ? (
                                    <div>
                                      <Typography color="error">
                                        {errors.isAddressPostOfficeBox}
                                      </Typography>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                                {/* <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  value={false}
                                  control={<Radio />}
                                  label="No"
                                  checked={!values.isAddressPostOfficeBox}
                                  onChange={handleChange}
                                />
                                <FormControlLabel
                                  value={true}
                                  control={<Radio />}
                                  label="Yes"
                                  checked={values.isAddressPostOfficeBox}
                                  onChange={handleChange}
                                />
                              </RadioGroup>
                              <p className="error">
                                {errors.isAddressPostOfficeBox}
                              </p> */}
                              </div>
                            </>

                            <div className="col-3">
                              <Typography style={{ marginTop: "20px" }}>
                                Is this an In Care Of address?
                                <span style={{ color: "red" }}>*</span>
                                <Tooltip
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                  }}
                                  title={
                                    <>
                                      <Typography color="inherit">
                                        TT-067 In Care Of Address
                                      </Typography>
                                      <a onClick={() => setToolInfo("CareOf")}>
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
                                      fontSize: "15px",
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                      verticalAlign: "super",
                                    }}
                                  />
                                </Tooltip>
                              </Typography>
                              {toolInfo === "CareOf" ? (
                                <div className="post">
                                  <Paper
                                    style={{
                                      backgroundColor: "#dedcb1",
                                      padding: "10px",
                                    }}
                                  >
                                    <Typography>
                                      An In Care Of Address denotes that
                                      something is to be delivered to an address
                                      where the recipient does not normally
                                      receive mail.{" "}
                                    </Typography>
                                    <Typography style={{ marginTop: "10px" }}>
                                      You should not use a P.O. Box or an
                                      in-care-of-address (other than a
                                      registered address). If you do, we may
                                      need to contact you for further
                                      information to help validate the
                                      submission.
                                    </Typography>

                                    <Typography style={{ marginTop: "10px" }}>
                                      If you reside in a country that does not
                                      use street addresses, you may enter a
                                      descriptive address.{" "}
                                    </Typography>

                                    <Link
                                      underline="none"
                                      style={{
                                        marginTop: "10px",
                                        fontSize: "16px", cursor: "pointer", color: "#0000C7"
                                      }}
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

                              <div className="d-flex">
                                <FormControl
                                  error={Boolean(
                                    touched.isCareOfAddress &&
                                    errors.isCareOfAddress
                                  )}
                                >
                                  <RadioGroup
                                    id="isCareOfAddress"
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={values.isCareOfAddress}
                                    onChange={handleChange}
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="yes"
                                      name="isCareOfAddress"
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="no"
                                      name="isCareOfAddress"
                                      label="No"
                                    />
                                  </RadioGroup>
                                  {errors.isCareOfAddress &&
                                    touched.isCareOfAddress ? (
                                    <div>
                                      <Typography color="error">
                                        {errors.isCareOfAddress}
                                      </Typography>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                                {/* <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="No"
                                    checked={!values.isCareOfAddress}
                                    onChange={handleChange}
                                  />foreignTINNotAvailable
                                  <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Yes"
                                    checked={values.isCareOfAddress}
                                    onChange={handleChange}
                                  />
                                </RadioGroup>
                                <p className="error">
                                  {errors.isCareOfAddress}
                                </p> */}
                              </div>
                            </div>
                            <div className="col-5">
                              <Typography style={{ marginTop: "20px" }}>
                                Is there an alternative mailing or business
                                address in the U.S.?
                                <span style={{ color: "red" }}>*</span>
                                <span>
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          TT-065 Alternate Mailing Address
                                        </Typography>
                                        <a onClick={() => setToolInfo("mail")}>
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
                                        fontSize: "15px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                        verticalAlign: "super",
                                      }}
                                    // onClick={clickInfo}
                                    />
                                  </Tooltip>
                                </span>
                              </Typography>
                              {toolInfo === "mail" ? (
                                <div className="post">
                                  <Paper
                                    style={{
                                      backgroundColor: "#dedcb1",
                                      padding: "15px",
                                    }}
                                  >
                                    <Typography>
                                      Please check this box if you have an
                                      alternative mailing address away from the
                                      permanent residential address entered
                                      here.
                                    </Typography>
                                    <Typography style={{ marginTop: "10px" }}>
                                      You will be asked to enter the alternative
                                      address later in the process and in some
                                      circumstances you may need to provide
                                      additional information.
                                    </Typography>

                                    <Link
                                      underline="none"
                                      style={{
                                        marginTop: "10px",
                                        fontSize: "16px", cursor: "pointer", color: "#0000C7"
                                      }}
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

                              <div className="d-flex">
                                <FormControl
                                  error={Boolean(
                                    touched.isalternativebusinessaddress &&
                                    errors.isalternativebusinessaddress
                                  )}
                                >
                                  <RadioGroup
                                    id="isalternativebusinessaddress"
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    value={values.isalternativebusinessaddress}
                                    onChange={handleChange}
                                  >
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="yes"
                                      name="isalternativebusinessaddress"
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      control={<Radio />}
                                      value="no"
                                      name="isalternativebusinessaddress"
                                      label="No"
                                    />
                                  </RadioGroup>
                                  {errors.isalternativebusinessaddress &&
                                    touched.isalternativebusinessaddress ? (
                                    <div>
                                      <Typography color="error">
                                        {errors.isalternativebusinessaddress}
                                      </Typography>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </FormControl>
                                {/* <Typography className="my-auto">Yes</Typography>
                                <Radio
                                  checked={values.isalternativebusinessaddress}
                                  onChange={() =>
                                    setPayload({
                                      ...payload,
                                      isalternativebusinessaddress: true,
                                    })
                                  }
                                  value={values.isalternativebusinessaddress}
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "A" }}
                                />
                                <Typography className="my-auto">No</Typography>
                                <Radio
                                  checked={!values.isalternativebusinessaddress}
                                  onChange={() =>
                                    setPayload({
                                      ...payload,
                                      isalternativebusinessaddress: false,
                                    })
                                  }
                                  value={!values.isalternativebusinessaddress}
                                  name="radio-buttons"
                                  inputProps={{ "aria-label": "B" }}
                                />
                                <p className="error">
                                  {errors.isalternativebusinessaddress}
                                </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {values.isalternativebusinessaddress == "yes" ? (
                      <>
                        <div className="row">
                          <div className="col-lg-3 col-6 col-md-3">
                            <Typography className="d-flex w-100 ">
                              Country:
                              <span style={{ color: "red" }}>*</span>
                            </Typography>

                            <FormControl className="w-100">
                              <select
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                                name="permanentResidentialCountryId1"
                                id="Income"
                                // defaultValue={1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.permanentResidentialCountryId1}
                              >
                                <option value={0}>---select---</option>
                                {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                              </select>
                              {errors.permanentResidentialCountryId1 && touched.permanentResidentialCountryId1 ? (<p className="error">
                                {errors.permanentResidentialCountryId1}
                              </p>) : ""}
                            </FormControl>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                Street Number and Name:
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="permanentResidentialStreetNumberandName1"
                                placeholder="Enter Street Number and Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.permanentResidentialStreetNumberandName1 &&
                                  errors.permanentResidentialStreetNumberandName1
                                )}
                                value={
                                  values.permanentResidentialStreetNumberandName1
                                }
                              />
                              {touched.permanentResidentialStreetNumberandName1 &&
                                errors.permanentResidentialStreetNumberandName1 ? (<p className="error">
                                  {
                                    errors.permanentResidentialStreetNumberandName1
                                  }
                                </p>) : ""}
                            </FormControl>
                          </div>
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">Apt/Suite:</Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="permanentResidentialAptSuite1"
                                placeholder="Enter Apt/Suite"
                                onChange={handleChange}
                                value={values.permanentResidentialAptSuite1}
                              />
                            </FormControl>
                          </div>
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                City or Town:
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="permanentResidentialCityorTown1"
                                placeholder="Enter City or Town"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.permanentResidentialCityorTown1 &&
                                  errors.permanentResidentialCityorTown1
                                )}
                                value={values.permanentResidentialCityorTown1}
                              />
                              {touched.permanentResidentialCityorTown1 &&
                                errors.permanentResidentialCityorTown1 ? (<p className="error">
                                  {errors.permanentResidentialCityorTown1}
                                </p>) : ""}
                            </FormControl>
                          </div>
                          {GetStateByCountryIdReducer?.allCountriesStateIdData &&
                            GetStateByCountryIdReducer?.allCountriesStateIdData
                              ?.length > 0 ? (
                            <div className="col-lg-3 col-6 col-md-3 mt-2">
                              <Typography
                                align="left"
                                className="d-flex w-100 "
                              >
                                State or Province:
                                {/* <span style={{ color: 'red' }}>*</span> */}
                              </Typography>

                              <FormControl className="w-100">
                                <select
                                  style={{
                                    padding: " 0 10px",
                                    color: "#121112",
                                    fontStyle: "italic",
                                    height: "36px",
                                  }}
                                  name="permanentResidentialStateorProvince1"
                                  id="Income"
                                  onChange={handleChange}
                                  value={
                                    values.permanentResidentialStateorProvince1
                                  }
                                >
                                  <option value="0">
                                    <em>---select---</em>
                                  </option>
                                  {GetStateByCountryIdReducer?.allCountriesStateIdData?.map(
                                    (ele: any) => (
                                      <option key={ele?.id} value={ele?.name}>
                                        {ele?.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </FormControl>
                            </div>
                          ) : (
                            <div className="col-lg-3 col-6 col-md-3 mt-2">
                              <FormControl className="w-100">
                                <Typography align="left">
                                  State or Province:
                                  {/* <span style={{ color: 'red' }}>*</span> */}
                                </Typography>
                                <Input
                                  disabled={
                                    values.permanentResidentialCountryId1 == 0
                                  }
                                  style={{
                                    border: " 1px solid #d9d9d9 ",
                                    height: " 36px",
                                    lineHeight: "36px ",
                                    background: "#fff ",
                                    fontSize: "13px",
                                    color: " #000 ",
                                    fontStyle: "normal",
                                    borderRadius: "1px",
                                    padding: " 0 10px ",
                                  }}
                                  id="outlined"
                                  name="permanentResidentialStateorProvince1"
                                  placeholder="Enter State or Province"
                                  onChange={handleChange}
                                  value={
                                    values.permanentResidentialStateorProvince1
                                  }
                                />
                              </FormControl>
                            </div>
                          )}
                          <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography align="left">
                                Zip / Postal Code:
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                              <Input
                                style={{
                                  border: " 1px solid #d9d9d9 ",
                                  height: " 36px",
                                  lineHeight: "36px ",
                                  background: "#fff ",
                                  fontSize: "13px",
                                  color: " #000 ",
                                  fontStyle: "normal",
                                  borderRadius: "1px",
                                  padding: " 0 10px ",
                                }}
                                id="outlined"
                                name="permanentResidentialZipPostalCode1"
                                placeholder="Enter Zip or Postal Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                  touched.permanentResidentialZipPostalCode1 &&
                                  errors.permanentResidentialZipPostalCode1
                                )}
                                value={
                                  values.permanentResidentialZipPostalCode1
                                }
                              />
                              {touched.permanentResidentialZipPostalCode1 &&
                                errors.permanentResidentialZipPostalCode1 ? (<p className="error">
                                  {errors.permanentResidentialZipPostalCode1}
                                </p>) : ""}
                            </FormControl>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </Collapse>

                  {/* Contact Details */}
                  <hr className="w-100"></hr>

                  <CardHeader
                    style={{ textAlign: "left" }}
                    className="flex-row-reverse"
                    title={
                      <div
                        style={{
                          marginLeft: "13px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen("cd")}
                        >
                          Contact Details
                          <Tooltip
                            style={{ backgroundColor: "black", color: "white" }}
                            title={
                              <>
                                <Typography color="inherit">
                                  Contact Details
                                </Typography>
                                <a
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setToolInfo("Contact");
                                  }}
                                >
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
                              onClick={(e) => {
                                e.stopPropagation();

                              }}
                              style={{
                                color: "#ffc107",
                                fontSize: "15px",
                                marginLeft: "5px",
                                cursor: "pointer",
                              }}
                            // onClick={clickInfo}
                            />
                          </Tooltip>
                        </div>
                        <p className="error mb-0">
                          {errors?.contactFirstName && touched?.contactFirstName ||
                            errors?.contactLastName && touched?.contactLastName ||
                            errors?.contactEmail && touched?.contactEmail
                            ? "Mandatory Information Required!"
                            : ""}
                        </p>
                      </div>
                    }
                    action={
                      <IconButton
                        onClick={() => handleOpen("cd")}
                        aria-label="expand"
                        size="small"
                        style={{ marginTop: "3px" }}
                      >
                        {open === "cd" ? (
                          <RemoveCircleOutlineOutlined />
                        ) : (
                          <ControlPointOutlined />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  {toolInfo === "Contact" ? (
                    <div>
                      <Paper
                        style={{ backgroundColor: "#dedcb1", padding: "15px" }}
                      >
                        <Typography>
                          Please enter your contact details here and the
                          capacity in which you will be signing the submission.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          On confirmation an email will be sent to the address
                          entered and contain a PIN that must be entered at the
                          point of signature.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          If you have not received the email within a few
                          minutes, it probably means your local email service
                          has detected an automated email and captured the email
                          in a local spam or quarantine folder. Please see
                          'more' below for further information or contact:
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          If you do not receive the email containing your
                          confirmation code:
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          The email is dispatched to the email address given as
                          soon as you confirm the details entered into this
                          screen and move across to the next part of the
                          submission process. Delivery should take place within
                          a few minutes, although on occasion it may take a
                          little longer because of issues outside of our
                          control.
                        </Typography>
                        <Typography style={{ marginTop: "10px" }}>
                          The following factors may impact delivery of the
                          email: internet traffic, your internal email service
                          delay, the way your internal email service is
                          configured to accept automatically generated emails,
                          or possibly the security settings of your browser.
                        </Typography>

                        <Typography style={{ marginTop: "10px" }}>
                          Please also check your spam or junk email folder.
                        </Typography>
                        <Link
                          underline="none"
                          style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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
                  <Collapse
                    className="px-5 mx-2"
                    in={open === "cd"}
                    timeout="auto"
                    unmountOnExit
                  >
                    <div className="row">
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            First Name<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="contactFirstName"
                            placeholder="Enter First Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.contactFirstName &&
                              errors.contactFirstName
                            )}
                            value={values.contactFirstName}
                          />
                          {touched.contactFirstName &&
                            errors.contactFirstName ? (<p className="error">{errors.contactFirstName}</p>) : ""}
                        </FormControl>
                      </div>
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            Last Name<span style={{ color: "red" }}>*</span>
                          </Typography>
                          <Input
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="contactLastName"
                            placeholder="Enter Last Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.contactLastName && errors.contactLastName
                            )}
                            value={values.contactLastName}
                          />
                          {touched.contactLastName && errors.contactLastName ? (<p className="error">{errors.contactLastName}</p>) : ""}
                        </FormControl>
                      </div>
                      <div className="row">
                        <div
                          className="col-lg-3 col-6 col-md-3 mt-2 mx-2"
                          style={{ paddingLeft: "0px" }}
                        >
                          <FormControl className="w-100">
                            <Typography align="left">
                              Email<span style={{ color: "red" }}>*</span>
                            </Typography>
                            <Input
                              style={{
                                border: " 1px solid #d9d9d9 ",
                                height: " 36px",
                                lineHeight: "36px ",
                                background: "#fff ",
                                fontSize: "13px",
                                color: " #000 ",
                                fontStyle: "normal",
                                borderRadius: "1px",
                                padding: " 0 10px ",
                              }}
                              name="contactEmail"
                              id="outlined"
                              placeholder="example@domain.com"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={Boolean(
                                touched.contactEmail && errors.contactEmail
                              )}
                              value={values.contactEmail}
                            />
                            {touched.contactEmail && errors.contactEmail ? (<p className="error">{errors.contactEmail}</p>) : ""}
                          </FormControl>
                        </div>
                      </div>

                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            Primary Contact Number
                          </Typography>
                          <select
                            style={{
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "36px",
                            }}
                            name="primaryContactNumberId"
                            id="Income"
                            onChange={handleChange}
                            value={values.primaryContactNumberId}
                          >
                            <option value={0}>---select---</option>
                            {getCountriesCodeReducer.allCountriesCodeData?.map(
                              (ele: any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {ele?.name}
                                </option>
                              )
                            )}
                          </select>
                          <Input
                            className="mt-2"
                            disabled={values.primaryContactNumberId == 0}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="primaryContactNumber"
                            placeholder="Enter Primary Number"
                            onChange={handleChange}
                            value={values.primaryContactNumber}
                          />
                        </FormControl>
                      </div>
                      <div className="col-lg-3 col-6 col-md-3 mt-2">
                        <FormControl className="w-100">
                          <Typography align="left">
                            Alternative Number
                          </Typography>
                          <select
                            style={{
                              padding: " 0 10px",
                              color: "#121112",
                              fontStyle: "italic",
                              height: "36px",
                            }}
                            name="alternativeNumberId"
                            id="Income"
                            onChange={handleChange}
                            value={values.alternativeNumberId}
                          >
                            <option value={0}>---Select---</option>
                            {/* <option value={1}>--Select1--</option> */}
                            {getCountriesCodeReducer.allCountriesCodeData?.map(
                              (ele: any) => (
                                <option key={ele?.id} value={ele?.id}>
                                  {ele?.name}
                                </option>
                              )
                            )}
                          </select>
                          <Input
                            className="mt-2"
                            disabled={values.alternativeNumberId == 0}
                            style={{
                              border: " 1px solid #d9d9d9 ",
                              height: " 36px",
                              lineHeight: "36px ",
                              background: "#fff ",
                              fontSize: "13px",
                              color: " #000 ",
                              fontStyle: "normal",
                              borderRadius: "1px",
                              padding: " 0 10px ",
                            }}
                            id="outlined"
                            name="alternativeNumber"
                            placeholder="Enter Alternate Mobile No"
                            onChange={handleChange}
                            value={values.alternativeNumber}
                          />
                        </FormControl>
                        <div>
                          {alternateNo ? (
                            <div className="mt-2">
                              <FormControl className="w-100">
                                {/* <Typography align="left">
                                Secondary Contact Number
                              </Typography> */}
                                <span className="w-100 d-flex">
                                  <select
                                    className="w-100"
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                    name="alternativeNumberId1"
                                    id="Income"
                                    onChange={handleChange}
                                    value={values.alternativeNumberId1}
                                  >
                                    <option value={0}>---select---</option>
                                    {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                                  </select>
                                  <Delete
                                    sx={{
                                      right: {
                                        xs: "-10%",
                                        md: "-10%",
                                        lg: "-8%",
                                        xl: "-5%",
                                      },
                                    }}
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                      marginTop: "5px",
                                      position: "absolute",
                                    }}
                                    onClick={() => {
                                      setAlternateNo(false);
                                    }}
                                  />
                                </span>
                                <Input
                                  className="mt-2"
                                  disabled={values.alternativeNumberId1 == 0}
                                  style={{
                                    border: " 1px solid #d9d9d9 ",
                                    height: " 36px",
                                    lineHeight: "36px ",
                                    background: "#fff ",
                                    fontSize: "13px",
                                    color: " #000 ",
                                    fontStyle: "normal",
                                    borderRadius: "1px",
                                    padding: " 0 10px ",
                                  }}
                                  id="outlined"
                                  name="alternativeNumber1"
                                  placeholder="Enter Alternate Mobile No"
                                  onChange={handleChange}
                                  value={values.alternativeNumber1}
                                />
                              </FormControl>
                            </div>
                          ) : (
                            <Typography
                              style={{
                                color: "#007bff",
                                cursor: "pointer",
                                fontSize: "12px",
                                marginTop: "8px",
                              }}
                              onClick={() => setAlternateNo(true)}
                            >
                              <a>Add Alternative Number</a>
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                  </Collapse>

                  <hr className="w-100 "></hr>

                  {Income === true ? (
                    <>
                      {values.isUSEntity == "yes" ? (
                        <>
                          <CardHeader
                            className="flex-row-reverse"
                            title={
                              <div
                                style={{
                                  marginLeft: "13px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "left",

                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleOpen("it")}
                                >
                                  Income Type
                                  {IncomeMandatory === true ? ("") :
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        color: "grey",
                                        marginLeft: "4px",
                                        marginTop: "11px",
                                      }}
                                    >
                                      (Optional)
                                    </span>
                                  }
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          Q&A, Income Type
                                        </Typography>
                                        <a


                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setToolInfo("income");
                                          }}

                                        >
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
                                      onClick={(e) => {
                                        e.stopPropagation();

                                      }}
                                      style={{
                                        color: "#ffc107",
                                        fontSize: "15px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                                {touched.incomeTypeId && incomeErrors.length > 0 && IncomeMandatory === true ?
                                  <p className="error mb-0">Mandatory Information Required</p>
                                  : null
                                }
                              </div>
                            }
                            action={
                              <IconButton
                                onClick={() => handleOpen("it")}
                                aria-label="expand"
                                size="small"
                                style={{ marginTop: "3px" }}
                              >
                                {open === "it" ? (
                                  <RemoveCircleOutlineOutlined />
                                ) : (
                                  <ControlPointOutlined />
                                )}
                              </IconButton>
                            }
                          ></CardHeader>

                          {toolInfo === "income" ? (
                            <div>
                              <Paper
                                style={{
                                  backgroundColor: "#dedcb1",
                                  padding: "15px",
                                }}
                              >
                                <Typography>
                                  Income type or code is requested as part of the
                                  tax form completion process for purposes of
                                  calculating withholding rates, where applicable,
                                  and to further determine how you should be
                                  reported on. You should select the type of code
                                  that best defines the payments that you expect
                                  to receive. Income Types, associated with Form
                                  1099 reporting, can include things like:
                                  Interest, Dividends, Rents, Royalties, Prizes
                                  and Awards. Income Codes, associated with Form
                                  1042-S reporting, can be found here:
                                  https://www.irs.gov/pub/irs-pdf/p515.pdf
                                </Typography>

                                <Link
                                  underline="none"
                                  style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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

                          <Collapse
                            className="px-5 mx-2"
                            in={open === "it"}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Typography className="d-flex w-100 pb-2">
                              Income Type
                            </Typography>
                            {/* <>{console.log(incomeArr, "qqq")}</> */}
                            {incomeArr.length &&
                              incomeArr.map((ind, i) => {

                                return (
                                  <div className="col-lg-3 col-6 col-md-3 ">
                                    <FormControl className="w-100 d-flex" key={i}>
                                      <span className="w-100 d-flex pb-2">
                                        <select
                                          className="w-100"
                                          style={{
                                            padding: " 0 10px",
                                            color: "#121112",
                                            fontStyle: "italic",
                                            height: "36px",
                                          }}
                                          name="incomeTypeId"
                                          onBlur={handleBlur}

                                          id="Income"
                                          onChange={(e: any) => handleIcome(e, i)}
                                          value={selectedValues[i]}
                                        >
                                          <option value="0">---select---</option>

                                          {GetAgentUSVisaTypeHiddenForEform?.map(
                                            (ele: any) => (
                                              <option
                                                key={ele?.incomeTypeId}
                                                value={ele?.incomeTypeId}
                                              >
                                                {ele?.name}
                                              </option>
                                            )
                                          )}
                                        </select>
                                        {incomeArr.length > 1 && (
                                          <Delete
                                            onClick={() => handleDelete(i)}
                                            style={{
                                              color: "red",
                                              fontSize: "20px",
                                              marginTop: "8px",
                                              marginLeft: "4px",
                                            }}
                                          />
                                        )}
                                      </span>
                                      {selectedValues[i] === '0' && IncomeMandatory === true && incomeErrors.length > 0 && touched.incomeTypeId ? (
                                        <p className="error">Please select an income type.</p>
                                      ) : ""}
                                      {/* {errors.incomeTypeId && touched.incomeTypeId ?(  <p className="error">{errors.incomeTypeId}</p>):""} */}
                                    </FormControl>
                                  </div>
                                );
                              })}

                            {incomeArr.length < 5 ? (
                              <Typography
                                style={{
                                  color: "#007bff",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={addIncomeType}
                              >
                                <a>Add Income Type</a>
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Collapse>
                        </>
                      ) : (
                        <>
                          <CardHeader
                            className="flex-row-reverse"
                            title={
                              <div
                                style={{
                                  marginLeft: "13px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "left",

                                    cursor: "pointer"
                                  }}
                                  onClick={() => handleOpen("it")}
                                >
                                  Income Code
                                  {IncomeMandatory === true ? ("") :
                                    <span
                                      style={{
                                        fontSize: "13px",
                                        color: "grey",
                                        marginLeft: "4px",
                                        marginTop: "11px",

                                      }}
                                    >
                                      (Optional)
                                    </span>
                                  }
                                  <Tooltip
                                    style={{
                                      backgroundColor: "black",
                                      color: "white",
                                    }}
                                    title={
                                      <>
                                        <Typography color="inherit">
                                          Q&A, Income Type
                                        </Typography>
                                        <a
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setToolInfo("income");
                                          }}   >
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
                                      onClick={(e) => {
                                        e.stopPropagation();

                                      }}
                                      style={{
                                        color: "#ffc107",
                                        fontSize: "15px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                                {touched.incomeTypeId && incomeErrors.length > 0 && IncomeMandatory === true ?
                                  <p className="error mb-0">Mandatory Information Required</p>
                                  : null
                                }
                              </div>
                            }
                            action={
                              <IconButton
                                onClick={() => handleOpen("it")}
                                aria-label="expand"
                                size="small"
                                style={{ marginTop: "3px" }}
                              >
                                {open === "it" ? (
                                  <RemoveCircleOutlineOutlined />
                                ) : (
                                  <ControlPointOutlined />
                                )}
                              </IconButton>
                            }
                          ></CardHeader>

                          {toolInfo === "income" ? (
                            <div>
                              <Paper
                                style={{
                                  backgroundColor: "#dedcb1",
                                  padding: "15px",
                                }}
                              >
                                <Typography>
                                  Income type or code is requested as part of the
                                  tax form completion process for purposes of
                                  calculating withholding rates, where applicable,
                                  and to further determine how you should be
                                  reported on. You should select the type of code
                                  that best defines the payments that you expect
                                  to receive. Income Types, associated with Form
                                  1099 reporting, can include things like:
                                  Interest, Dividends, Rents, Royalties, Prizes
                                  and Awards. Income Codes, associated with Form
                                  1042-S reporting, can be found here:
                                  https://www.irs.gov/pub/irs-pdf/p515.pdf
                                </Typography>

                                <Link
                                  underline="none"
                                  style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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
                          <Collapse
                            className="px-5 mx-2"
                            in={open === "it"}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Typography className="d-flex w-100 pb-2">
                              Income Code
                            </Typography>
                            {incomeArr.length && incomeArr.length <= 4 &&
                              incomeArr.map((ind, i) => {
                                // console.log(ind, i,"udvgjudgvfjdbgjfd")
                                return (
                                  <div className="col-lg-3 col-6 col-md-3 ">
                                    <FormControl className="w-100 d-flex" key={i}>
                                      <span className="w-100 d-flex pb-2">
                                        <select
                                          className="w-100"
                                          style={{
                                            padding: " 0 10px",
                                            color: "#121112",
                                            fontStyle: "italic",
                                            height: "36px",
                                          }}
                                          name="incomeTypeId"
                                          onBlur={handleBlur}
                                          onChange={(e: any) => handleIcome(e, i)}
                                          value={selectedValues[i]}
                                        >
                                          <option value="0">---select---</option>
                                          {GetAllIncomeCodesAgentWiseReducer.allCountriesIncomeCodeDataAgentWise?.map(
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
                                        {incomeArr.length > 1 && (
                                          <Delete
                                            onClick={() => handleDelete(i)}
                                            style={{
                                              color: "red",
                                              fontSize: "20px",
                                              marginTop: "8px",
                                              marginLeft: "4px",
                                            }}
                                          />
                                        )}
                                      </span>
                                      {selectedValues[i] === '0' && IncomeMandatory === true && incomeErrors.length > 0 && touched.incomeTypeId ? (
                                        <p className="error">Please select an income type.</p>
                                      ) : ""}
                                    </FormControl>
                                  </div>
                                );
                              })}


                            {incomeArr.length < 5 ? (
                              <Typography
                                style={{
                                  color: "#007bff",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                                onClick={addIncomeType}
                              >
                                <a>Add Income code</a>
                              </Typography>
                            ) : (
                              ""
                            )}
                          </Collapse>

                        </>
                      )}
                      <hr className="w-100"></hr>
                    </>
                  ) : ""}
                  {/* <hr className="w-100"></hr> */}

                  {Payment === true ? (
                    <>
                      <CardHeader
                        className="flex-row-reverse"
                        title={
                          <div
                            style={{
                              marginLeft: "13px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",

                                cursor: "pointer",
                              }}
                              onClick={() => handleOpen("pt")}
                            >
                              Payment Type

                              {PaymentMandatry === true ? ("") :
                                <span
                                  style={{
                                    fontSize: "13px",
                                    color: "grey",
                                    marginLeft: "4px",
                                    marginTop: "11px",
                                  }}
                                >
                                  (Optional)
                                </span>
                              }
                              <Tooltip
                                style={{ backgroundColor: "black", color: "white" }}
                                title={
                                  <>
                                    <Typography color="inherit">
                                      TT-134 Q&A, Account{" "}
                                    </Typography>
                                    <Typography color="inherit">
                                      {" "}
                                      information
                                    </Typography>
                                    <a

                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setToolInfo("account");
                                      }}


                                    >
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
                                  onClick={(e) => {
                                    e.stopPropagation();

                                  }}
                                  style={{
                                    color: "#ffc107",
                                    fontSize: "15px",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            </div>
                            <p className="error mb-0">
                              {errors?.paymentTypeId && touched?.paymentTypeId
                                ? "Mandatory Information Required"
                                : ""}
                            </p>
                          </div>
                        }
                        action={
                          <IconButton
                            onClick={() => handleOpen("pt")}
                            aria-label="expand"
                            size="small"
                            style={{ marginTop: "3px" }}
                          >
                            {open === "pt" ? (
                              <RemoveCircleOutlineOutlined />
                            ) : (
                              <ControlPointOutlined />
                            )}
                          </IconButton>
                        }
                      ></CardHeader>
                      {toolInfo === "account" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                            }}
                          >
                            <Typography>
                              As part of the tax form completion process, your
                              withholding agent has requested that you provide
                              banking details associated with your account. Here,
                              you will be asked to select the method for which
                              payment will be remitted, as permitted by the
                              withholding agent. Allowable options can include:
                              ACH, Wire or Check
                            </Typography>

                            <Link
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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
                      <Collapse
                        className="px-5 mx-2"
                        in={open === "pt"}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="col-lg-3 col-6 col-md-3 ">
                          <Typography className="d-flex w-100 pb-2">
                            Payment Type
                            <span style={{ color: "red" }}>*</span>
                          </Typography>

                          <FormControl className="w-100 d-flex">
                            <span className="w-100 d-flex">
                              <select
                                className="w-100"
                                style={{
                                  padding: " 0 10px",
                                  color: "#121112",
                                  fontStyle: "italic",
                                  height: "36px",
                                }}
                                name="paymentTypeId"
                                onBlur={handleBlur}
                                id="Payment"
                                onChange={handleChange}
                                value={values.paymentTypeId}
                              >
                                <option value="">---select---</option>
                                {GetAgentPaymentTypeData?.map((ele: any) => (
                                  <option
                                    key={ele?.paymentTypeId}
                                    value={ele?.paymentTypeId}
                                  >
                                    {ele?.name}
                                  </option>
                                ))}
                              </select>

                              {/* <Delete
                              style={{
                                color: "red",
                                fontSize: "20px",
                                marginTop: "8px",
                                marginLeft: "4px",
                              }}
                            /> */}
                            </span>
                            {errors.paymentTypeId && touched.paymentTypeId ? (<p className="error">{errors.paymentTypeId}</p>) : ""}
                          </FormControl>
                        </div>
                      </Collapse>
                      <hr className="w-100"></hr>
                    </>
                  ) : ""}

                  {values.paymentTypeId ? (
                    <>
                      <CardHeader
                        style={{ textAlign: "left" }}
                        className="flex-row-reverse"
                        title={
                          <div
                            style={{
                              marginLeft: "13px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "left",
                                cursor: "pointer",
                              }}
                              onClick={() => handleOpen("ai")}
                            >
                              Account Information
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: "grey",
                                  marginLeft: "4px",
                                  marginTop: "11px",
                                }}
                              >
                                (Mandatory)
                              </span>
                              <Tooltip
                                style={{
                                  backgroundColor: "black",
                                  color: "white",
                                }}
                                title={
                                  <>
                                    <Typography color="inherit">
                                      TT-126 Q&A,Account
                                    </Typography>
                                    <Typography color="inherit">
                                      {" "}
                                      information
                                    </Typography>
                                    <a
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setToolInfo("Account1");
                                      }}
                                    >
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
                                  onClick={(e) => {
                                    e.stopPropagation();

                                  }}
                                  style={{
                                    color: "#ffc107",
                                    fontSize: "15px",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                // onClick={clickInfo}
                                />
                              </Tooltip>
                            </div>
                            <p className="error mb-0">
                              {errors?.accountHolderName && touched?.accountHolderName ||
                                errors?.accountBankName && touched?.accountBankName||
                                errors?.accountBankBranchLocationId && touched?.accountBankBranchLocationId||
                                errors?.accountNumber && touched?.accountNumber||
                                errors?.makePayable && touched?.makePayable||
                                errors?.payResidentalCountryId && touched?.payResidentalCountryId||
                                errors?.payStreetNumberAndName && touched?.payStreetNumberAndName||
                                errors?.payCityorTown && touched?.payCityorTown||
                                errors?.payStateOrProvince && touched?.payStateOrProvince||
                                errors?.payZipPostalCode && touched?.payZipPostalCode||
                                errors?.sortCode && touched?.sortCode||
                                errors?.bsb && touched?.bsb||
                                errors?.bankCode && touched?.bankCode||
                                errors?.abaRouting && touched?.abaRouting
                                ? "Mandatory Information Required!"
                                : ""}
                            </p>
                          </div>
                        }
                        action={
                          <IconButton
                            onClick={() => handleOpen("ai")}
                            aria-label="expand"
                            size="small"
                            style={{ marginTop: "3px" }}
                          >
                            {open !== "ai" ? (
                              <ControlPointOutlined />
                            ) : (
                              <RemoveCircleOutlineOutlined />
                            )}
                          </IconButton>
                        }
                      ></CardHeader>
                      {toolInfo === "Account1" ? (
                        <div>
                          <Paper
                            style={{
                              backgroundColor: "#dedcb1",
                              padding: "15px",
                            }}
                          >
                            <Typography>
                              If you have an account number, or several account
                              numbers relating to the certificate submission
                              please identify here.
                              <Typography>
                                The account details provided will be used to:
                              </Typography>
                            </Typography>
                            <Typography>
                              <ul>
                                <li>
                                  Make payments to you if you are entitled to
                                  any
                                </li>
                                <li>
                                  Ensure your form is correctly matched to your
                                  account
                                </li>
                                <li>
                                  for further validation of new and existing
                                  information
                                </li>
                                <li>
                                  In some circumstance will allow us to document
                                  multiple accounts with the same certificate
                                </li>
                              </ul>
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Please see our privacy statement for further
                              information.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              See more information on what to do if you have a
                              joint account.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Joint Accounts
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Please note that if you are submitting a form on
                              behalf of an entity, which is part of a joint
                              account and in receipt of a payment, the joint
                              account should submit their own form.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              The form you are submitting ONLY represents the
                              legal entity named on the form and DOES NOT
                              represent the account or any joint account
                              holders.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              We can contact the joint account holder by email
                              informing them that they may need to submit a form
                              too.
                            </Typography>
                            <Typography style={{ marginTop: "10px" }}>
                              Ref: EH025
                            </Typography>

                            <Link
                              underline="none"
                              style={{ marginTop: "10px", fontSize: "16px", cursor: "pointer", color: "#0000C7" }}
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
                      <Collapse
                        className="px-5 mx-2"
                        in={open === "ai"}
                        timeout="auto"
                        unmountOnExit
                      >
                        {/* ACH */}
                        {values.paymentTypeId == 1 ? (
                          <>
                            <div className="row">
                              <Typography
                                style={{
                                  fontSize: "20px",
                                  color: "grey",
                                  marginBottom: "20px",
                                }}
                              >
                                Banking Information
                              </Typography>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Account holder name
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="accountHolderName"
                                    placeholder="Enter  Account holder name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.accountHolderName &&
                                      errors.accountHolderName
                                    )}
                                    value={values.accountHolderName}
                                  />
                                  {touched.accountHolderName &&
                                    errors.accountHolderName ? (<p className="error">
                                      {errors.accountHolderName}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Bank name
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="accountBankName"
                                    placeholder="Enter Bank name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.accountBankName &&
                                      errors.accountBankName
                                    )}
                                    value={values.accountBankName}
                                  />
                                  {touched.accountBankName &&
                                    errors.accountBankName ? (<p className="error">
                                      {errors.accountBankName}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <Typography align="left">
                                  Bank Branch Location
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl className="w-100">
                                  <select
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                    // labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="accountBankBranchLocationId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.accountBankBranchLocationId}
                                  >
                                    <option value={0}>---select---</option>
                                    {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                                  </select>
                                  {errors.accountBankBranchLocationId && touched.accountBankBranchLocationId ? (<p className="error">
                                    {errors.accountBankBranchLocationId}
                                  </p>) : ""}
                                </FormControl>
                              </div>

                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Account Number
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="accountNumber"
                                    placeholder="Enter Account Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.accountNumber &&
                                      errors.accountNumber
                                    )}
                                    inputProps={{ maxLength: 10 }}
                                    value={values.accountNumber}
                                  />
                                  {touched.accountNumber &&
                                    errors.accountNumber ? (<p className="error">
                                      {errors.accountNumber}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                              {returnFieldName(
                                handleBlur,
                                touched,
                                errors,
                                values,
                                handleChange
                              )}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {/* Check */}
                        {values.paymentTypeId == 3 ? (
                          <>
                            <div className="row">
                              <Typography
                                style={{
                                  fontSize: "20px",
                                  color: "grey",
                                  marginBottom: "20px",
                                }}
                              >
                                Payment Information
                              </Typography>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Make Payable To
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="makePayable"
                                    placeholder="Enter Make Payable To"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.makePayable && errors.makePayable
                                    )}
                                    value={values.makePayable}
                                  />
                                  {touched.makePayable && errors.makePayable ? (<p className="error">{errors.makePayable}</p>) : ""}
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    {" "}
                                    Country
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <select
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                    id="outlined"
                                    name="payResidentalCountryId"
                                    // placeholder="Enter Residential Country"
                                    onChange={(e) => {
                                      handleChange(e);
                                      //alert(e.target.value);
                                      setFieldValue("payStateOrProvince", "")
                                      dispatch(getAllStateByCountryId(e.target.value));
                                    }}
                                    onBlur={handleBlur}
                                    value={values.payResidentalCountryId}
                                  >
                                    <option value={0}>---select---</option>
                                    {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                                  </select>
                                  {errors.payResidentalCountryId && touched.payResidentalCountryId ? (<p className="error">
                                    {errors.payResidentalCountryId}
                                  </p>) : ""}
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <Typography align="left">
                                  Doing Business As Name
                                  {/* <span style={{ color: 'red' }}>*</span> */}
                                </Typography>
                                <FormControl className="w-100">
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    //REMAINING
                                    id="outlined"
                                    placeholder="Enter Doing Business As Name"
                                    name="doingBusinessAsName"
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    // error={Boolean(touched.doingBusinessAsName && errors.doingBusinessAsName)}
                                    value={values.doingBusinessAsName}
                                  />
                                  {/* <p style={{color: "red",textAlign:"left"}}>{errors.doingBusinessAsName}</p> */}
                                </FormControl>
                              </div>

                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Street Number And Name
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="payStreetNumberAndName"
                                    placeholder="Enter Street Number And Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.payStreetNumberAndName &&
                                      errors.payStreetNumberAndName
                                    )}
                                    value={values.payStreetNumberAndName}
                                  />
                                  {touched.payStreetNumberAndName &&
                                    errors.payStreetNumberAndName ? (<p className="error">
                                      {errors.payStreetNumberAndName}
                                    </p>) : ""}
                                </FormControl>
                              </div>

                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Apt/Suite
                                    {/* <span style={{ color: 'red' }}>*</span> */}
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="payAptSuite"
                                    placeholder="Enter Apt/Suite"
                                    onChange={handleChange}
                                    value={values.payAptSuite}
                                  />
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    City OR Town
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="payCityorTown"
                                    placeholder="Enter  City OR Town"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.payCityorTown &&
                                      errors.payCityorTown
                                    )}
                                    value={values.payCityorTown}
                                  />
                                  {touched.payCityorTown &&
                                    errors.payCityorTown ? (<p className="error">
                                      {errors.payCityorTown}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                              {values?.payResidentalCountryId == 258 ? (
                                <div className="col-lg-3 col-6 col-md-3 mt-2">
                                  <FormControl className="w-100">
                                    <Typography align="left">
                                      State OR Provience
                                      <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                    <select
                                      // disabled ={payload.payResidentalCountryId == 0}
                                      style={{
                                        padding: " 0 10px",
                                        color: "#7e7e7e",
                                        fontStyle: "italic",
                                        height: "36px",
                                      }}
                                      // id="outlined"
                                      name="payStateOrProvince"
                                      // placeholder="Enter State OR Provience"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.payStateOrProvince}
                                    >
                                      <option value="0">
                                        <em>---select---</em>
                                      </option>
                                      {GetStateByCountryIdReducer?.allCountriesStateIdData?.map(
                                        (ele: any) => (
                                          <option
                                            key={ele?.id}
                                            value={ele?.name}
                                          >
                                            {ele?.name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </FormControl>
                                </div>
                              ) : (
                                <div className="col-lg-3 col-6 col-md-3 mt-2">
                                  <FormControl className="w-100">
                                    <Typography align="left">
                                      State OR Provience
                                      <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                    <Input
                                      disabled={
                                        values.payResidentalCountryId == 0
                                      }
                                      style={{
                                        border: " 1px solid #d9d9d9 ",
                                        height: " 36px",
                                        lineHeight: "36px ",
                                        background: "#fff ",
                                        fontSize: "13px",
                                        color: " #000 ",
                                        fontStyle: "normal",
                                        borderRadius: "1px",
                                        padding: " 0 10px ",
                                      }}
                                      id="outlined"
                                      name="payStateOrProvince"
                                      //placeholder="Enter State OR Provience"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={Boolean(
                                        touched.payStateOrProvince &&
                                        errors.payStateOrProvince
                                      )}
                                      value={values.payStateOrProvince}
                                    />
                                    {errors.payStateOrProvince && touched.payStateOrProvince ? <p className="error">{errors.payStateOrProvince}</p> : <></>}
                                  </FormControl>
                                </div>
                              )}
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography align="left">
                                    Zip/Postal Code
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="payZipPostalCode"
                                    placeholder="Enter Zip/Postal Code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.payZipPostalCode &&
                                      errors.payZipPostalCode
                                    )}
                                    value={values.payZipPostalCode}
                                  />
                                  {touched.payZipPostalCode &&
                                    errors.payZipPostalCode ? (<p className="error">
                                      {errors.payZipPostalCode}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                            </div>

                            <div className="d-flex mt-3">
                              <Checkbox
                                checked={values.isCorrectPaymentPurposes}
                                name="radio-buttons"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // error={Boolean(touched.isCorrectPaymentPurposes && errors.isCorrectPaymentPurposes)}
                                value={values.isCorrectPaymentPurposes}
                              />
                              {touched.isCorrectPaymentPurposes && errors.isCorrectPaymentPurposes ? (<p className="error">
                                {errors.isCorrectPaymentPurposes}
                              </p>) : ""}
                              <Typography
                                align="left"
                                style={{ marginTop: "10px" }}
                              >
                                Please check the box to confirm that the above
                                details are correct for payment purposes.
                                <span style={{ color: "red" }}>*</span>
                              </Typography>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {values.paymentTypeId == 2 ? (
                          <>
                            <div className="row">
                              <Typography
                                style={{
                                  fontSize: "20px",
                                  color: "grey",
                                  marginBottom: "20px",
                                }}
                              >
                                Banking Information
                              </Typography>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography>
                                    Account holder name
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="accountHolderName"
                                    placeholder="Enter Account holder name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.accountHolderName &&
                                      errors.accountHolderName
                                    )}
                                    value={values.accountHolderName}
                                  />
                                  {touched.accountHolderName &&
                                    errors.accountHolderName ? (<p className="error">
                                      {errors.accountHolderName}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography> Bank name</Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="accountBankName"
                                    placeholder="Enter Bank name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.accountBankName &&
                                      errors.accountBankName
                                    )}
                                    value={values.accountBankName}
                                  />
                                  {touched.accountBankName &&
                                    errors.accountBankName ? (<p className="error">
                                      {errors.accountBankName}
                                    </p>) : ""}
                                </FormControl>
                              </div>
                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <Typography>
                                  Bank Branch Location
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <FormControl className="w-100">
                                  <select
                                    style={{
                                      padding: " 0 10px",
                                      color: "#121112",
                                      fontStyle: "italic",
                                      height: "36px",
                                    }}
                                    // labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name="accountBankBranchLocationId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.accountBankBranchLocationId}
                                  >
                                    <option
                                      value={0}
                                      onClick={() => setBankLocation("")}
                                    >
                                      ---select---
                                    </option>
                                    {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry === "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
  <option value={500}>---</option>
  {getCountriesAgentWiseReducer.agentWiseCountriesData
    ?.filter((ele:any) => ele.isImportantCountry !== "Yes")
    .map((ele:any) => (
      <option key={ele.id} value={ele.id}>
        {ele.name}
      </option>
    ))}
                                  </select>
                                  {errors.accountBankBranchLocationId && touched.accountBankBranchLocationId ? (<p className="error">
                                    {errors.accountBankBranchLocationId}
                                  </p>) : ""}
                                </FormControl>
                              </div>

                              <div className="col-lg-3 col-6 col-md-3 mt-2">
                                <FormControl className="w-100">
                                  <Typography>
                                    Account Number
                                    <span style={{ color: "red" }}>*</span>
                                  </Typography>
                                  <Input
                                    style={{
                                      border: " 1px solid #d9d9d9 ",
                                      height: " 36px",
                                      lineHeight: "36px ",
                                      background: "#fff ",
                                      fontSize: "13px",
                                      color: " #000 ",
                                      fontStyle: "normal",
                                      borderRadius: "1px",
                                      padding: " 0 10px ",
                                    }}
                                    id="outlined"
                                    name="accountNumber"
                                    placeholder="Enter Account Number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(
                                      touched.accountNumber &&
                                      errors.accountNumber
                                    )}
                                    inputProps={{ maxLength: 10 }}
                                    value={values.accountNumber}
                                  />
                                  {touched.accountNumber &&
                                    errors.accountNumber ? (<p className="error">
                                      {errors.accountNumber}
                                    </p>) : ""}
                                </FormControl>
                              </div>

                              {values.accountBankBranchLocationId == 258 ? (
                                <div className="col-lg-3 col-6 col-md-3 mt-2">
                                  <FormControl className="w-100">
                                    <Typography>
                                      ABA / Routing
                                      <span style={{ color: "red" }}>*</span>
                                    </Typography>
                                    <Input
                                      style={{
                                        border: " 1px solid #d9d9d9 ",
                                        height: " 36px",
                                        lineHeight: "36px ",
                                        background: "#fff ",
                                        fontSize: "13px",
                                        color: " #000 ",
                                        fontStyle: "normal",
                                        borderRadius: "1px",
                                        padding: " 0 10px ",
                                      }}
                                      id="outlined"
                                      name="abaRouting"
                                      placeholder="Enter ABA / Routing"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      error={Boolean(
                                        touched.abaRouting && errors.abaRouting
                                      )}
                                      value={values.abaRouting}
                                    />
                                      {errors.abaRouting && touched.abaRouting ? <p className="error">{errors.abaRouting}</p> : <></>}
                                  </FormControl>
                                </div>
                              ) : (
                                ""
                              )}
                              {values.accountBankBranchLocationId == 257 ? (
                                <div className="d-flex col-12">
                                  <div className="col-lg-3 col-6 col-md-3 mt-2">
                                    <FormControl className="w-100">
                                      <Typography>
                                        IBAN
                                        {/* <span style={{ color: 'red' }}>*</span> */}
                                      </Typography>
                                      <Input
                                        style={{
                                          border: " 1px solid #d9d9d9 ",
                                          height: " 36px",
                                          lineHeight: "36px ",
                                          background: "#fff ",
                                          fontSize: "13px",
                                          color: " #000 ",
                                          fontStyle: "normal",
                                          borderRadius: "1px",
                                          padding: " 0 10px ",
                                          width: "96%"
                                        }}
                                        id="outlined"
                                        name="iban"
                                        placeholder="Enter IBAN"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.iban}
                                      />
                                    </FormControl>

                                  </div>
                                  <div className="col-lg-3 col-6 col-md-3 mt-2">
                                    <FormControl className="w-100">
                                      <Typography style={{ marginLeft: "5px" }}>Swift code</Typography>
                                      <Input
                                        style={{
                                          border: " 1px solid #d9d9d9 ",
                                          height: " 36px",
                                          lineHeight: "36px ",
                                          width: "96%",
                                          marginLeft: "5px",
                                          background: "#fff ",
                                          fontSize: "13px",
                                          color: " #000 ",
                                          fontStyle: "normal",
                                          borderRadius: "1px",
                                          padding: " 0 10px ",
                                        }}
                                        id="outlined"
                                        name="swiftCode"
                                        placeholder="Enter Swift code"
                                        onChange={handleChange}
                                        value={values.swiftCode}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {/* <div className="col-lg-3 col-6 col-md-3 mt-2">
                            <FormControl className="w-100">
                              <Typography>
                                Swift code
                              </Typography>
                              <Input
                                
                                style={{
                                  border: ' 1px solid #d9d9d9 ',
                                  height: ' 36px',
                                  lineHeight: '36px ',
                                  background: '#fff ',
                                  fontSize: '13px',
                                  color: ' #000 ',
                                  fontStyle: 'normal',
                                  borderRadius: '1px',
                                  padding: ' 0 10px ',
                                }}
                                id="outlined"
                                name="swiftCode"
                                placeholder="Enter Swift code"
                                onChange={(e: any) =>
                                  setPayload({
                                    ...payload,
                                    swiftCode: e.target.value,
                                  })
                                }
                                value={payload.swiftCode}
                              />
                            </FormControl>
                          </div> */}
                            </div>
                            {/* <FormControl className="mx-1">
                          <Typography>
                            Account holder name
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Input
                            required
                            style={{
                              border: ' 1px solid #d9d9d9 ',
                              height: ' 36px',
                              lineHeight: '36px ',
                              background: '#fff ',
                              fontSize: '13px',
                              color: ' #000 ',
                              fontStyle: 'normal',
                              borderRadius: '1px',
                              padding: ' 0 10px ',
                            }}
                            name="account_holder_name"
                            id="outlined"
                            placeholder="Enter Account holder name"
                          />
                        </FormControl> */}

                            {/* <FormControl className="mx-1">
                          <Typography>
                            Bank name<span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Input
                            required
                            style={{
                              border: ' 1px solid #d9d9d9 ',
                              height: ' 36px',
                              lineHeight: '36px ',
                              background: '#fff ',
                              fontSize: '13px',
                              color: ' #000 ',
                              fontStyle: 'normal',
                              borderRadius: '1px',
                              padding: ' 0 10px ',
                            }}
                            name="bank_name"
                            id="outlined"
                            placeholder="Enter Bank name"
                          />
                        </FormControl> */}

                            {/* <FormControl className="mx-1">
                          <Typography>
                            Bank Branch Location:
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Select
                            style={{
                              padding: ' 0 10px',
                              color: '#7e7e7e',
                              fontStyle: 'italic',
                              height: '36px',
                            }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                          >
                            <MenuItem
                              value=""
                              onClick={() => setBankLocation('')}
                            >
                              <em>--Select--</em>
                            </MenuItem>
                            <MenuItem
                              value={1}
                              onClick={() => setBankLocation('UK')}
                            >
                              UK
                            </MenuItem>
                            <MenuItem
                              value={2}
                              onClick={() => setBankLocation('US')}
                            >
                              US
                            </MenuItem>
                            <MenuItem
                              value={3}
                              onClick={() => setBankLocation('xyz')}
                            >
                              Others
                            </MenuItem>
                          </Select>
                       
                        </FormControl> */}

                            {/* <FormControl className="mx-1">
                          <Typography>
                            Account number
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Input
                            required
                            style={{
                              border: ' 1px solid #d9d9d9 ',
                              height: ' 36px',
                              lineHeight: '36px ',
                              background: '#fff ',
                              fontSize: '13px',
                              color: ' #000 ',
                              fontStyle: 'normal',
                              borderRadius: '1px',
                              padding: ' 0 10px ',
                            }}
                            name="account_number"
                            id="outlined"
                            placeholder="Enter Account number"
                          />
                        </FormControl> */}
                            {/* {bankLocation === 'US' ? (
                          // <FormControl className="mx-1">
                          //   <Typography>
                          //     ABA / Rounting
                          //     <span style={{ color: 'red' }}>*</span>
                          //   </Typography>
                          //   <Input
                          //     required
                          //     style={{
                          //       border: ' 1px solid #d9d9d9 ',
                          //       height: ' 36px',
                          //       lineHeight: '36px ',
                          //       background: '#fff ',
                          //       fontSize: '13px',
                          //       color: ' #000 ',
                          //       fontStyle: 'normal',
                          //       borderRadius: '1px',
                          //       padding: ' 0 10px ',
                          //     }}
                          //     name="aba"
                          //     id="outlined"
                          //     placeholder="Enter ABA / Rounting"
                          //   />
                          // </FormControl>
                        ) : (
                          ''
                        )} */}

                            {/* {bankLocation !== '' ? (
                          <>
                            <FormControl>
                              <Typography>IBAN</Typography>
                              <Input
                                style={{
                                  border: ' 1px solid #d9d9d9 ',
                                  height: ' 36px',
                                  lineHeight: '36px ',
                                  background: '#fff ',
                                  fontSize: '13px',
                                  color: ' #000 ',
                                  fontStyle: 'normal',
                                  borderRadius: '1px',
                                  padding: ' 0 10px ',
                                }}
                                name="iban"
                                id="outlined"
                                placeholder="Enter IBAN"
                              />
                            </FormControl>
                            <FormControl className="mx-1">
                              <Typography>Swift code</Typography>
                              <Input
                                style={{
                                  border: ' 1px solid #d9d9d9 ',
                                  height: ' 36px',
                                  lineHeight: '36px ',
                                  background: '#fff ',
                                  fontSize: '13px',
                                  color: ' #000 ',
                                  fontStyle: 'normal',
                                  borderRadius: '1px',
                                  padding: ' 0 10px ',
                                }}
                                name="swift_code"
                                id="outlined"
                                placeholder="Enter Swift code"
                              />
                            </FormControl>
                          </>
                        ) : (
                          ''
                        )} */}
                          </>
                        ) : (
                          ""
                        )}
                      </Collapse>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="row d-flex mx-1 mt-3">
                  <div
                        className="d-flex p-0 flex-column"
                        onClick={() => {
                          setFieldValue("isConfirmed", !values.isConfirmed);
                        }}
                      >
                    <div className="d-flex p-0">
                      <div className="w-auto px-2">
                        <Checkbox
                          className="pr-0"
                          checked={values.isConfirmed || false}
                          name="isConfirmed"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        
                        // onBlur={handleBlur}
                        // error={Boolean(touched.isConfirmed && errors.isConfirmed)}
                        // value={payload.isConfirmed}
                        />
                      </div>

                      <div
                        className="w-auto d-flex p-0"
                        onClick={() => {
                          setFieldValue("isConfirmed", !values.isConfirmed);
                        }}
                        style={{ marginLeft: "-0.5rem" }}
                      >
                        <Typography className="my-auto">
                          I confirm the information above is correct.
                        </Typography>
                      </div>
                    </div>
                    </div>
                    {errors.isConfirmed && touched.isConfirmed ? (<p className="error">
                      {errors.isConfirmed}
                    </p>) : ""}
                    {values.isConfirmed ? (
                      <div className="text-center">
                        <Button
                          type="submit"
                          disabled={!values.isConfirmed}
                          // onClick={() => history("/Term")}
                          style={{
                            border: "1px solid #0095dd",
                            background: "#0095dd",
                            height: "45px",
                            lineHeight: "normal",
                            textAlign: "center",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            borderRadius: "0px",
                            color: "#fff",
                            padding: "0 35px",
                            letterSpacing: "1px",
                          }}
                          className="btn btn_submit  btn-primary-agent"
                        >
                          Continue
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Button
                          type="submit"
                          disabled
                          style={{
                            border: "1px solid #0095dd",
                            backgroundColor: "#D2D2D4",
                            borderColor: "#d2d2d2",
                            color: "#4a4a4a",
                            height: "45px",
                            lineHeight: "normal",
                            textAlign: "center",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            borderRadius: "0px",

                            padding: "0 35px",
                            letterSpacing: "1px",
                          }}
                          className="btn btn_submit  btn-primary-agent"
                        >
                          Continue
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </Paper>
        </div>
      </div>
      <div className="container-fluid">
        <footer>
          <div className="row mx-1">
            <Typography
              className="mx-2"
              align="left"
              style={{ marginBottom: "10px", color: "white", fontSize: "12px" }}
            >
              © Comply Exchange Ltd.2023 - Version: 2.2.0.29 - Render
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
