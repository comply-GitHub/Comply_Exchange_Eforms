import React, { useState, ChangeEvent, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormControl, Typography, Button, Input, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import { ExpandMore, Info } from "@mui/icons-material";
import Formw9 from "../reusables/W9";
import Backup from "../reusables/Backup";
import Sidebar from "./W9Forms/sideMenu";
import Tab from "./W9Forms/tabMenu";

import Certifications from "./step4/certification"
import Penalties from "./step4/penalities"
import VerifyDocs from "./step3";
import Step2 from "./W9Forms/step2";
import Step3 from "./step4";
import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../../Redux/Actions";
import PopUp from "./W9Forms/popUpWindow";

export default function App() {
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [click,setClick]=useState(false);
  const [data, setData] = useState({
    id: 0,
    agentId: 0,
    formTypeSelectionId: 0,
    federalTaxClassificationId: 0,
    firstName: "",
    lastName: "",
    businessName: "",
    isExemptionfromBackup: false,
    interestDividendPaymentId: 0,
    brokerTransactionsId: 0,
    barterExchangeTransactionId: 0,
    paymentOver600RequiredId: 0,
    paymentThirdPartyNetworkId: 0,
    isExemptionFATCAReportings: false,
    fatcaReportingId: 0,
    tiN_USTINId: 0,
    tiN_USTIN: "",
    birthCertificate: "",
    certificateOfIncorporation: "",
    drivingLicense: "",
    passport: "",
    powerOfAttorneyStatement: "",
    proofOfResidency: "",
    additionalDocumentId1: 0,
    additionalDocument1: "",
    additionalDocumentId2: 0,
    additionalDocument2: "",
    additionalDocumentId3: 0,
    additionalDocument3: "",
    additionalDocumentId4: 0,
    additionalDocument4: "",
    additionalDocumentId5: 0,
    additionalDocument5: "",
    additionalDocumentId6: 0,
    additionalDocument6: "",
    additionalDocumentId7: 0,
    additionalDocument7: "",
    additionalDocumentId8: 0,
    additionalDocument8: "",
    additionalDocumentId9: 0,
    additionalDocument9: "",
    additionalDocumentId10: 0,
    additionalDocument10: "",
    certification_CorrectTaxpayerIdentification: false,
    certification_IRS: false,
    certification_USCitizenPerson: false,
    certification_FATCACode: false,
    certification_IRSBackupWithHolding: false,
    certification_ElectronicForm: false,
    signedBy: "",
    confirmationCode: "",
    date: "",
    isConfirm: false,
    countryOfIncorporationOrganizationId: 0,
    usFederalTaxClassificationId: 0,
  });
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const initialValue = {
    id: 0,
    agentId: 0,
    formTypeSelectionId: 0,
    federalTaxClassificationId: 0,
    firstName: "",
    lastName: "",
    businessName: "",
    isExemptionfromBackup: false,
    interestDividendPaymentId: 0,
    brokerTransactionsId: 0,
    barterExchangeTransactionId: 0,
    paymentOver600RequiredId: 0,
    paymentThirdPartyNetworkId: 0,
    isExemptionFATCAReportings: false,
    fatcaReportingId: 0,
    tiN_USTINId: 0,
    tiN_USTIN: "",
    birthCertificate: "",
    certificateOfIncorporation: "",
    drivingLicense: "",
    passport: "",
    powerOfAttorneyStatement: "",
    proofOfResidency: "",
    additionalDocumentId1: 0,
    additionalDocument1: "",
    additionalDocumentId2: 0,
    additionalDocument2: "",
    additionalDocumentId3: 0,
    additionalDocument3: "",
    additionalDocumentId4: 0,
    additionalDocument4: "",
    additionalDocumentId5: 0,
    additionalDocument5: "",
    additionalDocumentId6: 0,
    additionalDocument6: "",
    additionalDocumentId7: 0,
    additionalDocument7: "",
    additionalDocumentId8: 0,
    additionalDocument8: "",
    additionalDocumentId9: 0,
    additionalDocument9: "",
    additionalDocumentId10: 0,
    additionalDocument10: "",
    certification_CorrectTaxpayerIdentification: false,
    certification_IRS: false,
    certification_USCitizenPerson: false,
    certification_FATCACode: false,
    certification_IRSBackupWithHolding: false,
    certification_ElectronicForm: false,
    signedBy: "",
    confirmationCode: "",
    date: "",
    isConfirm: false,
    countryOfIncorporationOrganizationId: 0,
    usFederalTaxClassificationId: 0,
  };
  useEffect(()=>{
    dispatch(getAllCountries())
  },[])
  const [report, setReport] = useState<string>("");
  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReport((event.target as HTMLInputElement).value);
  };

  const [selectedTaxClassification, setSelectedTaxClassification] =
    useState<string>("");
  const [selectedContinue, setselectedContinue] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
    step7: false,
    step8: false,
  });
  
  const handleTaxClassificationChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTaxClassification(event.target.value);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(()=>{
    console.log(setselectedContinue,"gh")  
    },[setselectedContinue])
  //step2
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="row m-0 h-100">

      <div
        className="col-12"
        style={{
          backgroundColor: "#0c3d69",
          marginBottom: "10px",
          padding: "20px",
        }}
        >
        <div style={{ display: "flex" }} className="row">
          
          {/* <Sidebar /> */}
        <Tab click={click} setClick={setClick}/>
        <PopUp click={click} setClick={setClick}/>
        
        <Step2
        selectedContinue={selectedContinue}
        handleTaxClassificationChange={handleTaxClassificationChange}
        selectedTaxClassification={selectedTaxClassification}
        data={data}
        handleChange={handleChange}
        setselectedContinue={setselectedContinue}
        report={report}
        handleReportChange={handleReportChange}
        initialValue={initialValue}/>

          {selectedContinue.step5 ? (
            <Certifications
            handleTaxClassificationChange={handleTaxClassificationChange}
            selectedTaxClassification={selectedTaxClassification}
            data={data}
            handleChange={handleChange}
            setselectedContinue={setselectedContinue}
            report={report}
            handleReportChange={handleReportChange}
            initialValue={initialValue}/>

          ) : (
            ""
          )}
        {selectedContinue.step6 ?(
        <Penalties
           selectedContinue={selectedContinue}
           handleTaxClassificationChange={handleTaxClassificationChange}
           selectedTaxClassification={selectedTaxClassification}
           data={data}
           handleChange={handleChange}
           setselectedContinue={setselectedContinue}
           report={report}
           handleReportChange={handleReportChange}
           initialValue={initialValue}

          />
          ):""} 
          
        </div>

        <Formw9
          open={open}
          setOpen={setOpen}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />

        <Backup
          open={open1}
          setOpen={setOpen1}
          handleClickOpen={handleClickOpen1}
          handleClose={handleClose1}
        />
      </div>
    </div>
  );
}
