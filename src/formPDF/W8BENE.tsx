import React, { useEffect, useRef,useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf, Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { Button, Collapse,Typography } from "@mui/material";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { useDispatch, useSelector } from "react-redux";
import { LoadExistingFormData, formPDFField, getAllCountries, getBENEformData } from "../Redux/Actions";
import moment from "moment";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";

const W8BenE= () => {
  const contentRef:any = useRef(null);
  const dispatch =useDispatch();
  const history = useNavigate();
  const { authDetails } = useAuth();
  const [values, setValues] = useState({
      agentId: 3,    
      accountHolderBasicDetailId: authDetails?.accountHolderId,
      formTypeSelectionId: 2,
      chapter3Status: 1,
      businessName: "",
      businessDisgradedEntity: "",
      countryOfIncorporation: 257,
      isHybridStatus: 0,
      descriptionHybridStatus: "",
      attachSupportingDocument: null,
      attachSupportingDocumentFile: null,
      isSubmissionSingleUSOwner: false,
      isDisRegardedSection1446: false,
      chapter4Status: 0,
      isPassiveNFFE40A: false,
      isPassiveNFFE40B: false,
      isPassiveNFFE40C: false,
      isCertify: true,
      isCertify23Entity: true,
      isCertify19FFI: true,
      isCertify22Entity: false,
      isCertify18FFI: false,
      sponsoringName: "",
      isCertify21Entity: true,
      isCertify30Entity: false,
      isCertify41Entity: false,
      isCertify34Entity: false,
      planReorganization: "2023-10-09T05:56:50.137",
      isCertify32Entity: false,
      isCertify33Entity: false,
      priorDate: "2023-10-09T05:56:50.137",
      isCertify38Entity: false,
      isCertify29aEntityPart1: true,
      isCertify29bEntityPart1: true,
      isCertify29cEntityPart1: true,
      isCertify29dEntityPart1: true,
      isCertify29eEntityPart1: true,
      isCertify29fEntityPart1: true,
      isCertify27Entity: false,
      isCertify28aEntity: false,
      isCertify28bEntity: false,
      isCertify36Entity: false,
      isCertify26Entity: false,
      igAbetweenUnitedStates: null,
      iga: "",
      istreated: 1,
      otherTreated: "",
      trustee: true,
      sponsor: true,
      neither: true,
      nametrusteeorsponsor: "",
      trusteeOther: "",
      isCertify19FFITrustee: true,
      isCertify24aFFIPart1: false,
      isCertify24bFFIPart1: false,
      isCertify24cFFIPart1: false,
      isCertify24dFFIPart1: false,
      isCertify24FFIPart1: true,
      isCertify40aEntityPart1: true,
      isCertify40bEntityPart1: true,
      isCertify40cEntityPart1: true,
      permanentResidentialCountryId:257,
      isCertify37a: false,
      aEntityStockMarket: "",
      isCertify37b: false,
      bEntityStockMarket: "",
      namesecuritiesmarket: "",
      isCertify25aEntityPart1: false,
      hasBeenBoundBy: false,
      currentBoundBy: false,
      nameSponsoringEntity: "",
      isCertify43: false,
      nameSponsoringEntity16: "",
      isCertify17a: false,
      isCertify17b: false,
      isCertify39: false,
      isCertify35: false,
      payeesection501: "2023-10-09T05:56:50.137",
      usTinTypeId: 7,
      usTin: 45-4354355,
      notAvailable: false,
      notAvailableReason: null,
      foreignTINCountry: 0,
      foreignTIN: 123123123123,
      isFTINLegally: false,
      isNotAvailable: false,
      fTinNotAvailableReason: null,
      alternativeTINFormat: false,
      isExplanationNotLegallyFTIN: false,
      isSubmissionClaimTreaty: true,
      ownerResidentId: 0,
      limitationBenefitsId: 0,
      articleParagraph: "",
      isClaimTreaty: true,
      isSubmissionSpecialRates: true,
      articleBeneficalOwnerId: 1,
      paragraphArticleClaimed: 1,
      subParagraphArticle: "",
      foreignTINNotAvailable:false,
      withHoldingClaim: 1,
      incomeExpectedId: 1,
      otherRating: "",
      articleExplanation: "",
      isBeneficialOwnerIncome: true,
      isPersonNameNotUSPerson: true,
      isIncomeFormRelated: true,
      isBrokerTransactions: true,
      isAuthorizedForm: true,
      isAgree30DaysCertififcation: true,
      isCertifyCapacitySign: true,
      isConfirmElectronicForm: true,
      signedBy: "",
      confirmationCode: "",
      date: "2024-01-30T13:56:02",
      securityCode: "",
      hint: "",
      recoverConfirmationCode: "",
      isCheckAcceptance: true,
      isAgreeWithDeclaration: true,
      isConsentReceipentstatement: true,
      isNotConsentReceipentstatement: true,
      // statusId: 1,
      // stepName: /BenE/Tax_Purpose_BenE
    
  });
  const [lValues,setLValues]=useState({
  agentId: 3,
  businessTypeId: 1,
  selectedEntity: false,
  isUSEntity: false,
  isUSIndividual: false,
  uniqueIdentifier: "",
  firstName: "",
  lastName: "",
  countryOfCitizenshipId: 0,
  dob: "",
  nameOfDisregarded: "",
  entityName: "",
  taxpayerIdTypeID: 0,
  usTin: "",
  foreignTINCountryId: 0,
  foreignTIN: "",
  foreignTINNotAvailable: false,
  alternativeTINFormat: false,
  giin: "",
  permanentResidentialCountryId: "",
  permanentResidentialStreetNumberandName: "",
  permanentResidentialAptSuite: "",
  permanentResidentialCityorTown: "",
  permanentResidentialStateorProvince: "",
  permanentResidentialZipPostalCode: "",
  isAddressRuralRoute: false,
  isAddressPostOfficeBox: false,
  isCareOfAddress: false,
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
  incomeTypeId: [
        0
    ],
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
  isCorrectPaymentPurposes: false,
  isConfirmed: false,
  taxpayerIdTypeName: "",
  usTinTypeId: 0,
  permanentresidentialzippostalcode: ""
})

const getCountriesReducer = useSelector(
  (state: any) => state.getCountriesReducer
);
  // const downloadPDF = () => {
  //   if (contentRef.current) {
  //     const content = contentRef.current.cloneNode(true) as HTMLDivElement;
  //     console.log("contentRef.current", content);
  //     content.style.fontSize = "16px";
  //     content.style.color = "black";
  //     const imgWidth = 188;
  //     const scale = 5; // You can adjust the scale as needed
  //     const canvasWidth = 4800; // Set your desired canvas width
  //     // const canvasHeight =10000; // Set your desired canvas height
  //     // const imgHeight = (canvasHeight * imgWidth) / canvasWidth;
  //     // let heightLeft = imgHeight;
  //     let position = 0;
  //     // heightLeft -= pageHeight;
  //     const doc = new jsPDF('p', 'mm');
  //     // doc.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
  //     doc.addImage(canvas, 'PNG');

  //     html2canvas(contentRef.current, {
  //       width: 960,
  //       height: 960,
  //       // scale: 1,
  //     }).then((canvas) => {
  //       console.log("canvas----------->",canvas)
  //       // const content = contentRef.current.cloneNode(true) as HTMLDivElement;
  //       console.log("contentRef.current", content);
  //       content.style.fontSize = "16px";
  //       content.style.color = "black";
  //       const imgWidth = 188;
  //       const pageHeight = 295;
  //       const scale = 5; // You can adjust the scale as needed
  //       const canvasWidth = 4800; // Set your desired canvas width
  //       const canvasHeight =4800; // Set your desired canvas height
  //       const imgHeight = (canvasHeight * imgWidth) / canvasWidth;
  //       let heightLeft = imgHeight;
  //       let position = 0;
  //       heightLeft -= pageHeight;
  //       const doc = new jsPDF('p', 'mm');
  //       doc.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
  //       const pdf = new jsPDF();
  //       const imgData = canvas.toDataURL("image/png", 1.0); // Use original image quality
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         0,
  //         0,
  //         canvas.width / scale,
  //         canvas.height / scale
  //       );
  //       // pdf.addImage(
  //       //   imgData,
  //       //   "PNG",
  //       //   10,
  //       //   10,
  //       //   canvasWidth / scale,
  //       //     canvasHeight / scale
  //       // );
  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         doc.addPage();
  //         doc.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save("example.pdf");
  //     });
  //   }
  // };

  const downloadPDF = async () => {
    const pixelRatio = 3;
    const canvas = await html2canvas(contentRef.current, { scale: pixelRatio });
    const pageHeight = 295;
    const imgWidth = 210;

    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const doc = new jsPDF("p", "mm");

    while (heightLeft > 0) {
      doc.addImage(
        canvas,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        "",
        "FAST"
      );
      position -= pageHeight;
      heightLeft -= pageHeight;
      if (heightLeft > 0) doc.addPage();
    }

    doc.save("Download.pdf");
  
};


  const handleDownload = async () => {
    
    if (contentRef.current) {

      const pixelRatio = 3;
      const canvas = await html2canvas(contentRef.current, { scale: pixelRatio });
      const pageHeight = 295;
      const imgWidth = 210;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      console.log(imgHeight, canvas.height, imgWidth, canvas.width);
      let heightLeft = imgHeight;
      let position = 0;

      const doc = new jsPDF("p", "mm");

      while (heightLeft > 0) {
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        position -= pageHeight;
        heightLeft -= pageHeight;
        if (heightLeft > 0) doc.addPage();
      }

      doc.save("Download.pdf");
    }
  
  };

  const getCountries = (countryId: any) => {
    let countryName = null;
    for (let i = 0; i < getCountriesReducer?.allCountriesData?.length; i++) {
        if (getCountriesReducer?.allCountriesData[i].id == countryId) {
            countryName = getCountriesReducer?.allCountriesData[i].name;
            break;
        }
    }
    return countryName;
}

  useEffect(() => {
   
    dispatch(
      getAllCountries()
    );
    setLValues(JSON.parse(localStorage.getItem("agentDetails") || "{}"));
  }, []);

  useEffect(() => {
    (dispatch(getBENEformData(authDetails?.accountHolderId,(data:any)=>{setValues(data)})))
  },[authDetails])

  const backFunction = () => {
    history(-1);
  };

  return (
    <>
    {console.log(values,lValues,"ALL VALUES")}
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        {/* <iframe src={form1}></iframe> */}
        {/* {notView ? (<div ref={pdfRef} dangerouslySetInnerHTML={{__html: form1}} />):""} */}
        <div style={{ paddingBlockStart: "30px" }}></div>
        
      <div
        style={{
          contentVisibility: "hidden",
          margin: "0 auto",
          maxWidth: "900px",
          width: "100%",
          padding: "0px",
          display: "table",
          boxSizing: "border-box",
        }}
      >
        {/* <h1 style={{ color: "red", paddingLeft:"20px"}} >Heading 1</h1> */}
        <View wrap={false}>
          <div
            ref={contentRef}
            style={{
              background: "#fff",
              color: "black",
              fontFamily: "sans-serif",
              padding: "60px 30px 30px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ margin: "10px auto", fontSize: "12px" }}>
              <table
                style={{
                  width: "100%",
                  maxWidth: "920px",
                  color: "#000",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "20%",
                        boxSizing: "border-box",
                        fontSize: "10px",
                        lineHeight: "1.3",
                        borderRight: "2px solid #000",
                        borderBottom: "2px solid #000",
                      }}
                    >
                      <p>
                        Form{" "}
                        <strong style={{ fontSize: "25px", fontWeight: "700" }}>
                          W-8BEN-E
                        </strong>
                      </p>
                      <p style={{ margin: "15px 0" }}>(Rev. October 2021)</p>
                      <p>Department of the Treasury Internal Revenue Service</p>
                    </th>
                    <th
                      style={{
                        padding: "0 15px",
                        boxSizing: "border-box",
                        textAlign: "center",
                        // width: "52%",
                        fontSize: "10px",
                        lineHeight: "1.3",
                        borderRight: "2px solid #000",
                        borderBottom: "2px solid #000",
                      }}
                    >
                      <h1 style={{ fontSize: "13px", fontWeight: "bolder" }}>
                        Certificate of Status of Beneficial Owner for
                        United States Tax Withholding and Reporting (Entities)
                      </h1>
                      <ul
                        style={{
                          listStyle: "none",
                          fontSize: "12px",
                          lineHeight: "1.5",
                        }}
                      >
                        <li>
                          ▶ For use by entities. Individuals must use Form W-8BEN.
                        </li>
                        <li>
                          ▶ Section references are to the Internal Revenue Code.
                        </li>
                        <li>
                          ▶ Go to www.irs.gov/FormW8BENE for instructions and the latest information.
                        </li>
                        <li>
                          ▶ Give this form to the withholding agent or payer. Do not send to the IRS.
                        </li>
                      </ul>
                    </th>
                    <th
                      style={{
                        // width: "24%",
                        boxSizing: "border-box",
                        fontSize: "13px",
                        fontWeight: "bolder",
                        lineHeight: "1.3",
                        borderBottom: "2px solid #000",
                        padding: "0 0 0 10px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "10px",
                          textAlign: "right",
                          color: "blue",
                          fontWeight: "400",
                          marginBottom: "15px",
                        }}
                      >
                        UID : {lValues.uniqueIdentifier}
                      </p>
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "bolder",
                          lineHeight: "1",
                        }}
                      >
                        Electronic{" "}
                      </h3>
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "bolder",
                          lineHeight: "1",
                        }}
                      >
                        Substitute{" "}
                      </h3>
                      <h6 style={{ fontSize: "12px", fontWeight: "600" }}>Form W-8BEN-E</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          margin: "10px 0",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "start",
                                padding: "0",
                                fontWeight: "bold",
                              }}
                            >
                              Do NOT use this form if:{" "}
                            </td>
                            <td
                              style={{
                                textAlign: "end",
                                padding: "0",
                                fontWeight: "bold",
                              }}
                            >
                              Instead, use Form:{" "}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <ul
                                style={{
                                  width: "100%",
                                  padding: "0 0 0 16px",
                                  marginTop: "15px",
                                  textAlign: "justify"
                                }}
                              >
                                <li style={{ marginBottom: "6px" }}>
                                  U.S. entity or U.S. citizen or resident . . . . . . . . . .
                                  . . . . . . . . . . . . . . . . . . . . . . .
                                  . . . . . . . . . . . . . . . . . . . . . . .
                                  . . . . . . . . .W-9
                                </li>
                                <li style={{ marginBottom: "6px" }}>
                                  A foreign individual . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                  . . . . . . . . . . . . . . . . . . . .W-8BEN (Individual) or Form 8233
                                </li>
                                <li style={{ marginBottom: "6px" }}>
                                  A foreign individual or entity claiming that income is effectively connected with the conduct of trade or business within the United States
                                  (unless claiming treaty benefits) . . . .
                                  . . . . . . . . . . . . . . . . . . . . . . .
                                  . . . . . .{" "}
                                  W-8ECI
                                </li>
                                <li>  A foreign government, international organization, foreign central bank of issue, foreign tax-exempt organization, foreign private foundation, or
                                  government of a U.S. possession claiming that income is effectively connected U.S. income or that is claiming the applicability of section(s) 115(2),
                                  501(c), 892, 895, or 1443(b) (unless claiming treaty benefits) (see instructions for other exceptions) . . . . . . . . . W-8ECI or W-8EXP
                                </li>
                                <li>
                                  Any person acting as an intermediary (including a qualified intermediary acting as a qualified derivatives dealer) . . . . . . . . . W-8BEN_E
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                        cellPadding={0}
                      >
                        <thead>
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part I{" "}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>
                                Identification of Beneficial Owner
                              </strong>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ padding: "0" }}>
                              <table
                                style={{
                                  borderCollapse: "collapse",
                                  width: "100%",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                        width: "60%",
                                        borderRight: "1px solid #000",
                                      }}
                                    >
                                      1. Name of organization that is the beneficial owner
                                      <p
                                        style={{
                                          color: "#08118a",
                                          width: "100%",
                                          margin: "6px 0 0",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                            {values?.businessName}
                                      </p>
                                    </td>
                                    <td
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                        width: "40%",
                                      }}
                                    >
                                      2. Country of incorporation or organization
                                      <p
                                        style={{
                                          color: "#08118a",
                                          width: "100%",
                                          margin: "6px 0 0",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                        {" "}
                                        {getCountries(
                                            values.permanentResidentialCountryId
                                          )}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                      }}
                                    >
                                      3. Name of disregarded entity receiving the payment (if applicable, see instructions)
                                      <p
                                        style={{
                                          color: "#82b1ff",
                                          width: "100%",
                                          margin: "6px 0 0",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                      {lValues.entityName}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                      }}>
                                      <div style={{ width: "20px", marginRight: "10px", float: "left" }}>4.</div>
                                      <div style={{ width: "calc(100% - 30px)", float: "left" }}>
                                        Chapter 3 Status (entity type) (Must check one box only):
                                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                                          <tbody>
                                            <tr>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===1}/>Corporation</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===2}/>Partnership</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===3}/>Simple trust</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===4}/>Tax-exempt organization</td>
                                            </tr>
                                            <tr>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===5}/>Complex trust</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===6}/>Foreign Government - Controlled Entity</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===7}/>Central Bank of Issue</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===8}/>Private foundation</td>
                                            </tr>
                                            <tr>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===9}/>Estate</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===10}/>Foreign Government - Integral Part</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===11}/>Grantor trust</td>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} checked={values.chapter3Status===12}/>Disregarded entity</td>
                                            </tr>
                                            <tr>
                                              <td><input type="checkbox" style={{ marginRight: "5px" }} />International organization</td>
                                            </tr>
                                            <tr>
                                              <td colSpan={4}>
                                                If you entered disregarded entity, partnership, simple trust, or grantor trust above, is the entity a hybrid making a treaty claim? If “Yes,” complete Part III. &nbsp;
                                                <input type="checkbox" name="YesCheck" id="YesCheck" /><label htmlFor="YesCheck" style={{ marginRight: "10px", marginLeft: "5px" }}>Yes</label>
                                                <input type="checkbox" name="NoCheck" id="NoCheck" /><label htmlFor="NoCheck" style={{ marginLeft: "5px" }}>No</label>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                        verticalAlign: "top"
                                      }}
                                    >
                                      <div style={{ width: "20px", marginRight: "5px", float: "left" }}>5.</div>
                                      <div style={{ width: "calc(100% - 25px)", float: "left" }}>
                                        <p>Chapter 4 Status (FATCA status) (See instructions for details and complete the certification below for the entity's applicable status.)</p>
                                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                                          <tr>
                                            <td style={{ width: "50%", verticalAlign: "top" }}>
                                              <div>
                                                <input type="checkbox" name="" id="FFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===1}/>
                                                <label htmlFor="FFI" style={{ width: "calc(100% - 30px)" }}>Nonparticipating FFI (including an FFI related to a Reporting IGA FFI other than a deemed-com</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id="parFFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===2} />
                                                <label htmlFor="FFI" style={{ width: "calc(100% - 30px)" }}>Participating FFI</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id="1FFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===3} />
                                                <label htmlFor="1FFI" style={{ width: "calc(100% - 30px)" }}>Reporting Model 1 FFI.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id="2FFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===4} />
                                                <label htmlFor="2FFI" style={{ width: "calc(100% - 30px)" }}>Reporting Model 2 FFI.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id="RdCFFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===5} />
                                                <label htmlFor="RdCFFI" style={{ width: "calc(100% - 30px)" }}>Registered deemed-compliant FFI (other than a reporting Model 1 FFI, sponsored FFI, or nonreporting IGA FFI covered in Part XII). See instructions.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id="SprdFFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===6} />
                                                <label htmlFor="SprdFFI" style={{ width: "calc(100% - 30px)" }}>Sponsored FFI. Complete Part IV</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===7} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Certified deemed-compliant nonregistering local bank. Complete Part V.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===8} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Certified deemed-compliant FFI with only low-value accounts. Complete Part VI.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===9} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Certified deemed-compliant sponsored, closely held investment vehicle. Complete Part VII. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===10} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Certified deemed-compliant limited life debt investment entity. Complete Part VIII.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===11} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Certain investment entities that do not maintain financial accounts. Complete Part IX.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===12} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Owner-documented FFI. Complete Part X. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===13} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}>Restricted distributor. Complete Part XI.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id="NIFFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===14} />
                                                <label htmlFor="NIFFI" style={{ width: "calc(100% - 30px)" }}>Nonreporting IGA FFI. Complete Part XII.</label>
                                              </div>


                                            </td>
                                            <td style={{ width: "50%" }}>
                                              <div>
                                                <input type="checkbox" name="" id="NIFFI" style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===15} />
                                                <label htmlFor="NIFFI" style={{ width: "calc(100% - 30px)" }}>Foreign government, government of a U.S. possession, or foreign central bank of issue. Complete Part XIII. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===16} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> International organization. Complete Part XIV </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===17} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Exempt retirement plans. Complete Part XV. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===18} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Entity wholly owned by exempt beneficial owners. Complete Part XVI. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===19} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Territory financial institution. Complete Part XVII. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===20} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Excepted nonfinancial group entity. Complete Part XVIII. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===1} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Excepted nonfinancial start-up company. Complete Part XIX. </label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===21} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Excepted nonfinancial entity in liquidation or bankruptcy. Complete Part XX.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===22} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> 501(c) organization. Complete Part XXI.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===23} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Nonprofit organization. Complete Part XXII.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===24} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Publicly traded NFFE or NFFE affiliate of a publicly traded corporation. Complete Part XXIII.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===25} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Excepted territory NFFE. Complete Part XXIV.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===26} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Active NFFE. Complete Part XXV</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===27} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Passive NFFE. Complete Part XXVI.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===28} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Excepted inter-affiliate FFI. Complete Part XXVII.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===29} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Direct reporting NFFE</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===1} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Sponsored direct reporting NFFE. Complete Part XXVIII.</label>
                                              </div>
                                              <div>
                                                <input type="checkbox" name="" id=" " style={{ width: "20px", margin: "5px 5px 0 0", verticalAlign: "top" }} checked={values.chapter4Status===30} />
                                                <label htmlFor=" " style={{ width: "calc(100% - 30px)" }}> Account that is not a financial account.</label>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{
                                      borderBottom: "1px solid #000"
                                    }}>
                                      <div style={{ float: "left", width: "20px", marginRight: "10px" }}>6.</div>
                                      <div style={{ float: "left", width: "calc(100% - 30px)" }}>
                                        Permanent residence address (street, apt. or suite no., or rural route). Do not use a P.O. box or in-care-of address (other than a registered address).
                                      </div>
                                      <div>
                                        <p style={{ color: "blue", marginBottom: "5px" }}>{lValues.permanentResidentialAptSuite}{" "}{lValues.permanentResidentialStreetNumberandName}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}>
                                      <table
                                        style={{
                                          borderCollapse: "collapse",
                                          width: "100%",
                                        }}
                                        cellPadding={0}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "70%",
                                                borderRight: "1px solid #000",
                                              }}
                                            >
                                              <div style={{ float: "left", width: "20px", marginRight: "10px" }}> </div>
                                              <div style={{ float: "left", width: "calc(100% - 30px)" }}>City or town, state or province. Include postal code where appropriate. </div>
                                              <div>
                                                <p style={{ color: "blue", marginBottom: "5px" }}>{lValues.permanentResidentialCityorTown} {" "} {lValues.permanentResidentialZipPostalCode} </p>
                                              </div>
                                            </td>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "30%",
                                              }}
                                            >
                                              Country
                                              <p
                                                style={{
                                                  color: "blue",
                                                  marginBottom: "5px",
                                                  lineHeight: "1.4",
                                                }}
                                              >
                                                {getCountries(lValues.permanentResidentialCountryId)}
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{
                                      borderBottom: "1px solid #000"
                                    }}>
                                      <div style={{ float: "left", width: "20px", marginRight: "10px" }}>7.</div>
                                      <div style={{ float: "left", width: "calc(100% - 30px)" }}>
                                        Mailing address (if different from above)
                                      </div>
                                      <div>
                                        <p style={{ color: "blue", marginBottom: "5px" }}>{lValues.permanentResidentialAptSuite1}{" "}{lValues.permanentResidentialStreetNumberandName1}</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}>
                                      <table
                                        style={{
                                          borderCollapse: "collapse",
                                          width: "100%",
                                        }}
                                        cellPadding={0}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "70%",
                                                borderRight: "1px solid #000",
                                              }}
                                            >
                                              <div style={{ float: "left", width: "20px", marginRight: "10px" }}> </div>
                                              <div style={{ float: "left", width: "calc(100% - 30px)" }}>City or town, state or province. Include postal code where appropriate.  </div>
                                              <div>
                                                <p style={{ color: "blue", marginBottom: "5px" }}>{lValues.permanentResidentialCityorTown1}&nbsp;</p>
                                              </div>
                                            </td>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "30%",
                                              }}
                                            >
                                              Country
                                              <p style={{ color: "blue", marginBottom: "5px" }}>{getCountries(lValues.permanentResidentialCountryId1)}&nbsp;</p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}>
                                      <table
                                        style={{
                                          borderCollapse: "collapse",
                                          width: "100%",
                                        }}
                                        cellPadding={0}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "70%",
                                              }}
                                            >
                                              <div style={{ float: "left", width: "auto" }}>For Paperwork Reduction Act Notice, see separate instructions </div>
                                              <div style={{ float: "right", width: "auto", marginLeft: "10px" }}> Cat. No. 59689N</div>
                                            </td>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "30%",
                                                textAlign: "end"
                                              }}
                                            >
                                              Form <strong>W-8BEN-E</strong> (Rev. 10-2021)
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{
                                      borderBottom: "1px solid #000"
                                    }}>
                                      <div style={{ float: "left", width: "20px", marginRight: "10px" }}>8.</div>
                                      <div style={{ float: "left", width: "calc(100% - 30px)" }}>
                                        U.S. taxpayer identification number (TIN), if required
                                      </div>
                                      <div>
                                        <p style={{ color: "blue", marginBottom: "5px" }}>EIN: 12-3456789</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{
                                      borderBottom: "1px solid #000"
                                    }}>
                                      <div style={{ float: "left", width: "33.33%", borderRight: "1px solid #000", padding: "10px" }}>
                                        9a. &nbsp; GIIN 
                                      </div>
                                      <div style={{ float: "left", width: "33.33%", borderRight: "1px solid #000", padding: "10px" }}>
                                        b &nbsp; Foreign TIN<p style={{ float: "right" }}>{values.foreignTIN}</p>
                                      </div>
                                      <div style={{ float: "left", width: "33.33%", borderRight: "1px solid #000", padding: "10px" }}>
                                        Check if FTIN not legally required...... ▶ <input type="checkbox" name="" id="" style={{ float: "right" }} checked={values.foreignTINNotAvailable}/>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{
                                      borderBottom: "1px solid #000"
                                    }}>
                                      <div style={{ float: "left", width: "20px", marginRight: "10px" }}>10.</div>
                                      <div style={{ float: "left", width: "calc(100% - 30px)" }}>
                                        Reference number(s) (see instructions)
                                      </div>
                                      <div>
                                        <p style={{ color: "blue", marginBottom: "5px" }}>A/C #: asd1, VAT : 123456789</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2} style={{
                                      borderBottom: "1px solid #000",
                                      padding: "10px"
                                    }}>
                                      <strong>Note:</strong> Please complete remainder of the form including signing the form in Part XXX.
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginTop: "10px",
                        }}
                        cellPadding={0}
                      >
                        <thead>
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part II{" "}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Disregarded Entity or Branch Receiving Payment.</strong> (Complete only if a disregarded entity with a GIIN or a
                              branch of an FFI in a country other than the FFI’s country of residence. See instructions.)
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                              <div style={{ width: "20px", float: "left" }}> <strong>11.</strong> </div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                <p>Chapter 4 Status (FATCA status) of disregarded entity or branch receiving payment</p>
                                <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse", width: "100%" }}>
                                  <tbody>
                                    <tr>
                                      <td style={{ width: "33.33%", marginBottom: "10px" }}>
                                        <div>
                                          <input
                                            type="checkbox"
                                            name=""
                                            id="FFI"
                                            style={{ width: "20px", margin: "0px 5px 0 0", verticalAlign: "middle" }}
                                          />
                                          <label htmlFor="FFI" style={{ width: " calc(100% - 30px)" }}>Branch treated as nonparticipating FFI.</label>
                                        </div>
                                      </td>
                                      <td style={{ width: "33.33%", marginBottom: "10px" }}>
                                        <div>
                                          <input
                                            type="checkbox"
                                            name=""
                                            id="FFI"
                                            style={{ width: "20px", margin: "0px 5px 0 0", verticalAlign: "middle" }}
                                          />
                                          <label htmlFor="FFI" style={{ width: " calc(100% - 30px)" }}>Reporting Model 1 FFI.</label>
                                        </div>
                                      </td>
                                      <td style={{ width: "33.33%" }}>
                                        <div>
                                          <input
                                            type="checkbox"
                                            name=""
                                            id="FFI"
                                            style={{ width: "20px", margin: "0px 5px 0 0", verticalAlign: "middle" }}
                                          />
                                          <label htmlFor="FFI" style={{ width: " calc(100% - 30px)" }}>U.S. Branch.
                                          </label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ width: "33.33%" }}>
                                        <div>
                                          <input
                                            type="checkbox"
                                            name=""
                                            id="FFI"
                                            style={{ width: "20px", margin: "0px 5px 0 0", verticalAlign: "middle" }}
                                          />
                                          <label htmlFor="FFI" style={{ width: " calc(100% - 30px)" }}>Participating FFI.
                                          </label>
                                        </div>
                                      </td>
                                      <td style={{ width: "33.33%" }}>
                                        <div>
                                          <input
                                            type="checkbox"
                                            name=""
                                            id="FFI"
                                            style={{ width: "20px", margin: "0px 5px 0 0", verticalAlign: "middle" }}
                                          />
                                          <label htmlFor="FFI" style={{ width: " calc(100% - 30px)" }}>Reporting Model 2 FFI.
                                          </label>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                              <div style={{ width: "20px", float: "left" }}> <strong>12.</strong> </div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                Address of disregarded entity or branch (street, apt. or suite no., or rural route). <strong> Do not use a P.O. box or in-care-of address</strong> (other than a
                                registered address).

                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px", borderTop: "1px solid #000" }}>
                              <div style={{ width: "20px", float: "left" }}>&nbsp;</div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                City or town, state or province. Include postal code where appropriate.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px", borderTop: "1px solid #000" }}>
                              <div style={{ width: "20px", float: "left" }}>&nbsp;</div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>Country
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px", borderTop: "1px solid #000" }}>
                              <div style={{ width: "20px", float: "left" }}>13.</div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                GIIN (if any) ___________________________________________________________________
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginTop: "10px",
                        }}
                        cellPadding={0}
                      >
                        <thead>
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part III{" "}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Claim of Tax Treaty Benefits</strong> (if applicable). (For chapter 3 purposes only.)
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px", borderTop: "1px solid #000" }}>
                              <div style={{ width: "20px", float: "left" }}> <b>14.</b> </div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                I certify that (check all that apply):
                                <div style={{ width: "100%", marginTop: "10px" }}>
                                  <div style={{ width: "20px", float: "left" }}>a.</div>
                                  <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "20px", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /></div>
                                      <div style={{ width: "calc(100% - 20px)", float: "left" }}>The beneficial owner is a resident of within the meaning of the income tax  <input type="text" name="" id="" value={getCountries(values.foreignTINCountry)} style={{ width: "200px", borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", margin: "0 5px", padding: "0px 10px" }} />
                                        treaty between the United States and that country.</div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ width: "100%", marginTop: "10px" }}>
                                  <div style={{ width: "20px", float: "left" }}>b.</div>
                                  <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "20px", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /></div>
                                      <div style={{ width: "calc(100% - 20px)", float: "left" }}>The beneficial owner derives the item (or items) of income for which the treaty benefits are claimed, and, if applicable, meets the
                                        requirements of the treaty provision dealing with limitation on benefits. The following are types of limitation on benefits provisions that may
                                        be included in an applicable tax treaty (check only one; see instructions):</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Government</div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Company that meets the ownership and base erosion test</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Tax-exempt pension trust or pension fund</div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Company that meets the derivative benefits test</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Other tax-exempt organization</div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Company with an item of income that meets active trade or business test</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Publicly traded corporation</div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Favorable discretionary determination by the U.S. competent authority received</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Publicly traded corporation</div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Favorable discretionary determination by the U.S. competent authority received</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Subsidiary of a publicly traded corporation</div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> No LOB article in treaty</div>
                                    </div>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "30%", float: "left" }}>  &nbsp; </div>
                                      <div style={{ width: "70%", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /> Other (specify Article and paragraph): <input type="text" name="" id="" style={{ width: "200px", borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", margin: "0 5px", padding: "0px 10px" }} /></div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ width: "100%", marginTop: "15px" }}>
                                  <div style={{ width: "20px", float: "left" }}>c.</div>
                                  <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                    <div style={{ width: "100%" }}>
                                      <div style={{ width: "20px", float: "left" }}><input type="checkbox" style={{ verticalAlign: "middle" }} /></div>
                                      <div style={{ width: "calc(100% - 20px)", float: "left" }}>The beneficial owner is a resident of within the meaning of the income tax  <input type="text" name="" id="" value={getCountries(values.foreignTINCountry)} style={{ width: "200px", borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", margin: "0 5px", padding: "0px 10px" }} />The beneficial owner is claiming treaty benefits for U.S. source dividends received from a foreign corporation or interest from a U.S. trade
                                        or business of a foreign corporation and meets qualified resident status (see instructions). </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                              <div style={{ width: "20px", float: "left" }}> <b>15.</b></div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                <strong>Special rates and conditions</strong> (if applicable—see instructions):
                                <div style={{ width: "100%", marginBottom: "10px" }}>
                                  The beneficial owner is claiming the provisions of Article and paragraph <input type="text" name="" id="" value="12 (13)" style={{ borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px" }} />
                                  of the treaty identified on line 14a above to claim a % rate of withholding on (specify type of income):
                                  Explain the additional conditions in the Article the beneficial owner meets to be eligible for the rate of withholding: <input type="text" name="" id="" value="complysandbox.com/(S(ilregg5rdlxww1v1oauzcam1))/Pages/SRCPrepopulator_OBFX." style={{ borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px 0 0", width: "100%" }} />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part V
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Sponsored FFI</strong>
                            </td>
                          </tr>

                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                              <div style={{ width: "20px", float: "left" }}> <b>16.</b></div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                              Name of sponsoring entity:
                                <input type="text" name="" id="" value="12 (13)" style={{ borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px" }} />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                              <div style={{ width: "20px", float: "left" }}> <b>17.</b></div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                                Check whichever box applies.
                                <div style={{ width: "100%", padding: "10px 0" }}>
                                  <div style={{ width: "100%" }}>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                      Is an investment entity;
                                    </li>
                                    <li>
                                      Is not a QI, WP (except to the extent permitted in the withholding foreign partnership agreement), or WT; and
                                    </li>
                                    <li>
                                      Has agreed with the entity identified above (that is not a nonparticipating FFI) to act as the sponsoring entity for this entity.
                                    </li>
                                  </ul>
                                  <div style={{ width: "100%" }}>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                    }}
                                  >
                                    <li>
                                      Is a controlled foreign corporation as defined in section 957(a);
                                    </li>
                                    <li>
                                      Is not a QI, WP, or WT;
                                    </li>
                                    <li>
                                      Is wholly owned, directly or indirectly, by the U.S. financial institution identified above that agrees to act as the sponsoring entity for this entity; and
                                    </li>
                                    <li>Shares a common electronic account system with the sponsoring entity (identified above) that enables the sponsoring entity to identify all
                                      account holders and payees of the entity and to access all account and customer information maintained by the entity including, but not limited
                                      to, customer identification information, customer documentation, account balance, and all payments made to account holders or payees.</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part IV
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>
                      Certified Deemed-Compliant Nonregistering Local Bank
                    </strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                            
                                <div style={{ width: "100%", padding: "10px 0" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "20px", float: "left" }}> <b>18.</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                     Operates and is licensed solely as a bank or credit union (or similar cooperative credit organization operated without profit) in its country of
incorporation or organization;
                                    </li>
                                    <li>
                                    Engages primarily in the business of receiving deposits from and making loans to, with respect to a bank, retail customers unrelated to such
bank and, with respect to a credit union or similar cooperative credit organization, members, provided that no member has a greater than 5%
interest in such credit union or cooperative credit organization;
                                    </li>
                                    <li>
                                    Does not solicit account holders outside its country of organization;
                                    </li>
                                    <li>
                                     Has no fixed place of business outside such country (for this purpose, a fixed place of business does not include a location that is not
advertised to the public and from which the FFI performs solely administrative support functions);
                                    </li>
                                    <li>
                                    Has no more than $175 million in assets on its balance sheet and, if it is a member of an expanded affiliated group, the group has no more
than $500 million in total assets on its consolidated or combined balance sheets; <strong>and</strong>
                                    </li>
                                    <li>
                                    Does not have any member of its expanded affiliated group that is a foreign financial institution, other than a foreign financial institution that
is incorporated or organized in the same country as the FFI identified in Part I and that meets the requirements set forth in this part.
                                    </li>
                                  </ul>
                                 </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part VI
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>
                              Certified Deemed-Compliant FFI with Only Low-Value Accounts
                    </strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                            
                                <div style={{ width: "100%", padding: "10px 0" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "20px", float: "left" }}> <b>19.</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                    Is not engaged primarily in the business of investing, reinvesting, or trading in securities, partnership interests, commodities, notional
principal contracts, insurance or annuity contracts, or any interest (including a futures or forward contract or option) in such security,
partnership interest, commodity, notional principal contract, insurance contract or annuity contract;
                                    </li>
                                   
                                   
                                   
                                    <li>
                                    No financial account maintained by the FFI or any member of its expanded affiliated group, if any, has a balance or value in excess of
$50,000 (as determined after applying applicable account aggregation rules); <strong>and</strong>
                                    </li>
                                    <li>
                                    Neither the FFI nor the entire expanded affiliated group, if any, of the FFI, have more than $50 million in assets on its consolidated or
combined balance sheet as of the end of its most recent accounting year.
                                    </li>
                                  </ul>
                                 </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                              Part VII
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Certified Deemed-Compliant Sponsored, Closely Held Investment Vehicle</strong>
                            </td>
                          </tr>

                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                              <div style={{ width: "20px", float: "left" }}> <b>20.</b></div>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                              Name of sponsoring entity:
                                <input type="text" name="" id="" value="" style={{ borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px" }} />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                 
                                  <div style={{ width: "20px", float: "left" }}> <b>21.</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                    Is an FFI solely because it is an investment entity described in Regulations section 1.1471-5(e)(4);
                                    </li>
                                    <li>
                                    Is not a QI, WP, or WT;
                                    </li>
                                    <li>
                                    Will have all of its due diligence, withholding, and reporting responsibilities (determined as if the FFI were a participating FFI) fulfilled by the
sponsoring entity identified on line 20;
                                    </li>
                                    <li>20 or fewer individuals own all of the debt and equity interests in the entity (disregarding debt interests owned by U.S. financial institutions,
participating FFIs, registered deemed-compliant FFIs, and certified deemed-compliant FFIs and equity interests owned by an entity if that
entity owns 100% of the equity interests in the FFI and is itself a sponsored FFI).</li>
                                  </ul>
                                 </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                            Part VIII
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong> Certified Deemed-Compliant Limited Life Debt Investment Entity</strong>
                            </td>
                          </tr>

                         
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "20px", float: "left" }}> <b>22.</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                    Was in existence as of January 17, 2013;
                                    </li>
                                    <li>
                                     Issued all classes of its debt or equity interests to investors on or before January 17, 2013, pursuant to a trust indenture or similar agreement; <strong>and</strong>
                                    </li>
                                    <li>
                                    Is certified deemed-compliant because it satisfies the requirements to be treated as a limited life debt investment entity (such as the
restrictions with respect to its assets and other requirements under Regulations section 1.1471-5(f)(2)(iv)).
                                    </li>
                                   
                                  </ul>
                                 </div>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                          Part IX 
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Certain Investment Entities that Do Not Maintain Financial Accounts</strong>
                            </td>
                          </tr>

                         
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "20px", float: "left" }}> <b>23.</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                     Is a financial institution solely because it is an investment entity described in Regulations section 1.1471-5(e)(4)(i)(A),<strong>and</strong>
                                    </li>
                                    <li>
                                    Does not maintain financial accounts
                                    </li>
                                   
                                   
                                  </ul>
                                 </div>
                              </div>
                            </td>
                          </tr>


                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                           Part X
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Owner-Documented FFI</strong>
                            </td>
                          </tr>

                         <tr>
                          <td colSpan={2} style={{ padding: "5px 10px" }}>
                          <strong>Note:</strong> This status only applies if the U.S. financial institution, participating FFI, or reporting Model 1 FFI to which this form is given has agreed that it will 
treat the FFI as an owner-documented FFI (see instructions for eligibility requirements). In addition, the FFI must make the certifications below.
                          </td>
                          </tr>  
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>24.a</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    (All owner-documented FFIs check here) I certify that the FFI identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                    Does not act as an intermediary;
                                    </li>
                                    <li>
                                    Does not accept deposits in the ordinary course of a banking or similar business; 
                                    </li>
                                    <li>
                                    Does not hold, as a substantial portion of its business, financial assets for the account of others;
                                    </li>
                                    <li>Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to
a financial account;</li>
                             <li>
                              Is not owned by or in an expanded affiliated group with an entity that accepts deposits in the ordinary course of a banking or similar
business, holds, as a substantial portion of its business, financial assets for the account of others, or is an insurance company (or the holding
company of an insurance company) that issues or is obligated to make payments with respect to a financial account;
                              </li> 
                              <li>
                              Does not maintain a financial account for any nonparticipating FFI; <strong>and</strong>
                                </li> 
                               
                                    <li>
                                    Does not have any specified U.S. persons that own an equity interest or debt interest (other than a debt interest that is not a financial
account or that has a balance or value not exceeding $50,000) in the FFI other than those identified on the FFI owner reporting statement.
                                    </li>
                                   
                                  </ul>
                                 </div>
                              </div>
                            </td>
                          </tr>



                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                           Part X
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Owner-Documented FFI (Continued)</strong>
                            </td>
                          </tr>

                         <tr>
                          <td colSpan={2} style={{ padding: "5px 10px" }}>
                          <strong>Check box 24b or 24c, whichever applies</strong>
                          </td>
                          </tr>  
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>b</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                     I certify that the FFI identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                     Has provided, or will provide, an FFI owner reporting statement that contains:
                                    </li>
                                    <ul>
                                    (i) The name, address, TIN (if any), chapter 4 status, and type of documentation provided (if required) of every individual and specified 
U.S. person that owns a direct or indirect equity interest in the owner-documented FFI (looking through all entities other than specified 
U.S. persons);
                                    </ul>
                                    <ul>
                                    (ii) The name, address, TIN (if any), and chapter 4 status of every individual and specified U.S. person that owns a debt interest in the 
owner-documented FFI (including any indirect debt interest, which includes debt interests in any entity that directly or indirectly owns 
the payee or any direct or indirect equity interest in a debt holder of the payee) that constitutes a financial account in excess of 
$50,000 (disregarding all such debt interests owned by participating FFIs, registered deemed-compliant FFIs, certified deemedcompliant FFIs, excepted NFFEs, exempt beneficial owners, or U.S. persons other than specified U.S. persons); <strong>
and</strong>
                                    </ul>
                                    <ul>(iii) Any additional information the withholding agent requests in order to fulfill its obulgations with respect to the entity.</ul>
                             <li>
                             Has provided, or will provide, valid documentation meeting the requirements of Regulations section 1.1471-3(d)(6)(iii) for each person 
identified in the FFI owner reporting statement.
                              </li> 
                                   
                                  </ul>
                              <div style={{ width: "100%" }}>
                              <div style={{ width: "25px", float: "left" }}> <b>c</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the FFI identified in Part I has provided, or will provide, an auditor's letter, signed within 4 years of the date of payment,
from an independent accounting firm or legal representative with a location in the United States stating that the firm or representative has 
reviewed the FFI’s documentation with respect to all of its owners and debt holders identified in Regulations section 1.1471-3(d)(6)(iv)(A)(2), 
and that the FFI meets all the requirements to be an owner-documented FFI. The FFI identified in Part I has also provided, or will provide, 
an FFI owner reporting statement of its owners that are specified U.S. persons and Form(s) W-9, with applicable waivers.</div>     
                                 </div>
                              </div>
                            </td>
                          </tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                          <strong>Check box 24d if applicable </strong>(optional, see instructions)
                          </td>

                       
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                          <div style={{ width: "100%" }}>
                              <div style={{ width: "25px", float: "left" }}> <b>d</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified on line 1 is a trust that does not have any contingent beneficiaries or designated classes with unidentified 
beneficiaries.</div> 
</div>
</div>
</td>
</tr>



<tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                          Part XI
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Restricted Distributor</strong>
                            </td>
                          </tr>

                        
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left",marginRight: "15px" }}> <b>25 a</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    (All restricted distributors check here) I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                    Operates as a distributor with respect to debt or equity interests of the restricted fund with respect to which this form is furnished;
                                    </li>
                                   <li>
                                   Provides investment services to at least 30 customers unrelated to each other and less than half of its customers are related to each other;
                                   </li>
                                   <li>
                                    Is required to perform AML due diligence procedures under the anti-money laundering laws of its country of organization (which is an FATFcompliant jurisdiction);
                                   </li>
                             <li>
                             Operates solely in its country of incorporation or organization, has no fixed place of business outside of that country, and has the same 
country of incorporation or organization as all members of its affiliated group, if any;
                              </li> 
                              <li>
                              Does not solicit customers outside its country of incorporation or organization;
                              </li>
                              <li>
                               Has no more than $175 million in total assets under management and no more than $7 million in gross revenue on its income statement for 
the most recent accounting year;
                              </li>
                              <li>
                              Is not a member of an expanded affiliated group that has more than $500 million in total assets under management or more than $20 million 
in gross revenue for its most recent accounting year on a combined or consolidated income statement; <strong>and</strong>
                                </li>
                                   <li> Does not distribute any debt or securities of the restricted fund to specified U.S. persons, passive NFFEs with one or more substantial U.S. 
owners, or nonparticipating FFIs.</li>
                                  </ul>
                                  <tr>
                          <td colSpan={2} style={{ padding: "5px 10px" }}>
                          <strong >Check box 25b or 25c, whichever applies.</strong>
                          <td style={{marginTop:"5px"}}>I further certify that with respect to all sales of debt or equity interests in the restricted fund with respect to which this form is furnished that are made 
after December 31, 2011, the entity identified in Part I:</td>
                          </td>


                          </tr>  
                              <div style={{ width: "100%" }}>
                              <div style={{ width: "25px", float: "left" }}> <b>b</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    Has been bound by a distribution agreement that contained a general prohibition on the sale of debt or securities to U.S. entities and U.S. 
resident individuals and is currently bound by a distribution agreement that contains a prohibition of the sale of debt or securities to any 
specified U.S. person, passive NFFE with one or more substantial U.S. owners, or nonparticipating FFI.</div>     
                                 </div>
                                 <div style={{ width: "100%",marginTop:"7px" }}>
                              <div style={{ width: "25px", float: "left" }}> <b>c</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    Is currently bound by a distribution agreement that contains a prohibition on the sale of debt or securities to any specified U.S. person, 
passive NFFE with one or more substantial U.S. owners, or nonparticipating FFI and, for all sales made prior to the time that such a 
restriction was included in its distribution agreement, has reviewed all accounts related to such sales in accordance with the procedures 
identified in Regulations section 1.1471-4(c) applicable to preexisting accounts and has redeemed or retired any, or caused the restricted 
fund to transfer the securities to a distributor that is a participating FFI or reporting Model 1 FFI securities which were sold to specified U.S. 
persons, passive NFFEs with one or more substantial U.S. owners, or nonparticipating FFIs.</div>     
                                 </div>
                              
                            </td>
                          </tr>
                            

                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                         Part XII 
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Nonreporting IGA FFI</strong>
                            </td>
                          </tr>

                        
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left",marginRight: "15px" }}> <b>26</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                  <ul
                                    style={{
                                      listStyle: "disc",
                                      marginBottom: "5px"
                                    }}
                                  >
                                    <li>
                                     Meets the requirements to be considered a nonreporting financial institution pursuant to an applicable IGA between the United States and
<input type="text" style={{marginLeft:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}} /> The applicable IGA is a <input type="checkbox" style={{marginLeft:"5px",marginRight:'5px'}} />Model 1 IGA or a <input type="checkbox" style={{marginLeft:"5px",marginRight:'5px'}} />Model 2 IGA; and
is treated as a  <input type="text" style={{marginLeft:"5px",marginRight:'5px',borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}} />Model 1 IGA or a <input type="checkbox" style={{marginLeft:"5px",marginRight:'5px',marginTop:"5px"}} />under the provisions of the applicable IGA or Treasury regulations 
(if applicable, see instructions);

                                    </li>
                                   <li>

                                   If you are a trustee documented trust or a sponsored entity, provide the name of the trustee or sponsor<input type="text"style={{marginLeft:"5px",marginRight:'5px',marginTop:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}} />
                                   <br/>
                                   The trustee is:<input type="checkbox" style={{marginLeft:"5px",marginRight:'5px',marginTop:"5px"}} /> U.S. <input type="checkbox" style={{marginLeft:"15px",marginRight:'5px',marginTop:"5px"}} /> Foreign
                                   </li>
                                   
                            
                                  </ul>
                                
                              </div>
                              </div>
                               
                              
                            </td>
                          </tr>

                          
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                       Part XIII 
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Foreign Government, Government of a U.S. Possession, or Foreign Central Bank of Issue</strong>
                            </td>
                          </tr>

                        
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                             
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>27</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is the beneficial owner of the payment, and is not engaged in commercial financial activities of a 
type engaged in by an insurance company, custodial institution, or depository institution with respect to the payments, accounts, or 
obligations for which this form is submitted (except as permitted in Regulations section 1.1471-6(h)(2)).</div>
                                 </div>
                                 </div>
                              
                            </td>
                          </tr>


                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                     Part XV 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Exempt Retirement Plans</strong>
                            </td>
                          </tr>

                        
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                            <strong>Check box 29a, b, c, d, e, or f, whichever applies.</strong>
                              <div style={{ width: "calc(100% - 20px)", float: "left" }}>
                               
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left",marginRight: "15px" }}> <b>28 a</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                 <ul>
                                  <li>
                                  Is established in a country with which the United States has an income tax treaty in force (see Part III if claiming treaty benefits);
                                  </li>
                                  <li>
                                  Is operated principally to administer or provide pension or retirement benefits; <strong>and</strong>
                                    </li>
                                    <li> Is entitled to treaty benefits on income that the fund derives from U.S. sources (or would be entitled to benefits if it derived any such income) 
as a resident of the other country which satisfies any applicable limitation on benefits requirement.</li>
                                 </ul>
                                 </div>
                                 <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>b</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                 <ul>
                                  <li>
                                  Is organized for the provision of retirement, disability, or death benefits (or any combination thereof) to beneficiaries that are former 
employees of one or more employers in consideration for services rendered;
                                  </li>
                                  <li>
                                   No single beneficiary has a right to more than 5% of the FFI’s assets; <strong>and</strong>
                                    </li>
                                    <li>  Is subject to government regulation and provides annual information reporting about its beneficiaries to the relevant tax authorities in the 
country in which the fund is established or operated;<strong>and</strong></li>
<li>(i) Is generally exempt from tax on investment income under the laws of the country in which it is established or operates due to its status 
as a retirement or pension plan;</li>
<li>(ii) Receives at least 50% of its total contributions from sponsoring employers (disregarding transfers of assets from other plans described 
in this part, retirement and pension accounts described in an applicable Model 1 or Model 2 IGA, other retirement funds described in 
an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A));</li>
<li>(iii) Either does not permit or penalizes distributions or withdrawals made before the occurrence of specified events related to retirement, 
disability, or death (except rollover distributions to accounts described in Regulations section 1.1471-5(b)(2)(i)(A) (referring to retirement 
and pension accounts), to retirement and pension accounts described in an applicable Model 1 or Model 2 IGA, or to other retirement 
funds described in this part or in an applicable Model 1 or Model 2 IGA); <strong>or</strong></li>
<li>
(iv) Limits contributions by employees to the fund by reference to earned income of the employee or may not exceed $50,000 annually.
</li>
                                 </ul>
                                 <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left"}}> <b>c</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                 <ul>
                                  <li>
                                  Is organized for the provision of retirement, disability, or death benefits (or any combination thereof) to beneficiaries that are former 
employees of one or more employers in consideration for services rendered;
                                  </li>
                                  <li>
                                  Has fewer than 50 participants;
                                    </li>
                                    <li> Is sponsored by one or more employers each of which is not an investment entity or passive NFFE;</li>
                                 <li> Employee and employer contributions to the fund (disregarding transfers of assets from other plans described in this part, retirement and 
pension accounts described in an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A)) are 
limited by reference to earned income and compensation of the employee, respectively;</li>
<li> Participants that are not residents of the country in which the fund is established or operated are not entitled to more than 20% of the fund’s assets; <strong>and</strong></li>
  <li>
  Is subject to government regulation and provides annual information reporting about its beneficiaries to the relevant tax authorities in the 
country in which the fund is established or operates.
    </li>                             
                               
                                 </ul>

                               
                              
                            </td>
                          </tr>
                          
                          <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                     Part XV 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Exempt Retirement Plans(continued)</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>d</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is formed pursuant to a pension plan that would meet the requirements of section 401(a), other 
than the requirement that the plan be funded by a trust created or organized in the United States.</div>
                                 </div>
                                
                                 <div style={{ width: "100%",marginTop:"7px" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>e</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is established exclusively to earn income for the benefit of one or more retirement funds
described in this part or in an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A) (referring to 
retirement and pension accounts), or retirement and pension accounts described in an applicable Model 1 or Model 2 IGA.</div>
                                 </div>
                               
                                 <div style={{ width: "100%",marginTop:"7px" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left",}}> <b>f</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                
                                
                                 
                                 <ul style={{marginTop:"7px"}}>
                                  <li>
                                  Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. possession 
(each as defined in Regulations section 1.1471-6) or an exempt beneficial owner described in an applicable Model 1 or Model 2 IGA to provide 
retirement, disability, or death benefits to beneficiaries or participants that are current or former employees of the sponsor (or persons 
designated by such employees); or
                                  </li>
                                  <li>
                                  Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. possession 
(each as defined in Regulations section 1.1471-6) or an exempt beneficial owner described in an applicable Model 1 or Model 2 IGA to provide 
retirement, disability, or death benefits to beneficiaries or participants that are not current or former employees of such sponsor, but are in 
consideration of personal services performed for the sponsor.
                                    </li>
                                   
                                 </ul>
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                   Part XVI 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Entity Wholly Owned by Exempt Beneficial Owners</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>30</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is formed pursuant to a pension plan that would meet the requirements of section 401(a), other 
than the requirement that the plan be funded by a trust created or organized in the United States.</div>
                                 </div>
                                
                                <ul>
                                  <li>
                                   Is an FFI solely because it is an investment entity;
                                    </li>

<li>
Each direct holder of an equity interest in the investment entity is an exempt beneficial owner described in Regulations section 1.1471-6 or in 
an applicable Model 1 or Model 2 IGA;
</li>
<li>
Each direct holder of a debt interest in the investment entity is either a depository institution (with respect to a loan made to such entity) or an 
exempt beneficial owner described in Regulations section 1.1471-6 or an applicable Model 1 or Model 2 IGA.
  </li>
  <li>
  Has provided an owner reporting statement that contains the name, address, TIN (if any), chapter 4 status, and a description of the type of 
documentation provided to the withholding agent for every person that owns a debt interest constituting a financial account or direct equity 
interest in the entity; <strong>and</strong>
  </li>
<li>
Has provided documentation establishing that every owner of the entity is an entity described in Regulations section 1.1471-6(b), (c), (d), (e), 
(f) and/or (g) without regard to whether such owners are beneficial owners.
</li>




                                </ul>
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
                 Part XVII  
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Territory Financial Institution</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>31</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is a financial institution (other than an investment entity) that is incorporated or organized under
the laws of a possession of the United States.</div>
                                 </div>
                                
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
               Part XVIII 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Excepted Nonfinancial Group Entit</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>32</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                <ul>
                                  <li>
                                  Is a holding company, treasury center, or captive finance company and substantially all of the entity’s activities are functions described in 
Regulations section 1.1471-5(e)(5)(i)(C) through (E);
                                  </li>
                                  <li>
                                  Is a member of a nonfinancial group described in Regulations section 1.1471-5(e)(5)(i)(B);
                                  </li>
                                  <li>
                                  Is not a depository or custodial institution (other than for members of the entity’s expanded affiliated group); and
                                  </li>
                                  <li>
                                  Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any 
investment vehicle with an investment strategy to acquire or fund companies and then hold interests in those companies as capital assets for 
investment purposes.
                                  </li>
                                </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
              Part XIX 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Excepted Nonfinancial Start-Up Company</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>33</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                <ul>
                                  <li>
                                  Was formed on (or, in the case of a new line of business, the date of board resolution approving the new line of business)
(date must be less than 24 months prior to date of payment);
                                  </li>
                                  <li>
                                  Is not yet operating a business and has no prior operating history or is investing capital in assets with the intent to operate a new line of 
business other than that of a financial institution or passive NFFE;
                                  </li>
                                  <li>
                                   Is investing capital into assets with the intent to operate a business other than that of a financial institution; <strong>and</strong>
                                  </li>
                                  <li>
                                  Does not function (or hold itself out) as an investment fund, such as a private equity fund, venture capital fund, leveraged buyout fund, or any 
investment vehicle whose purpose is to acquire or fund companies and then hold interests in those companies as capital assets for investment purposes.
                                  </li>
                                </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
             Part XX 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Excepted Nonfinancial Entity in Liquidation or Bankruptcy</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>34</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                                <ul>
                                  <li>
                                  Filed a plan of liquidation, filed a plan of reorganization, or filed for bankruptcy on
                                  <input type="text" style={{marginLeft:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}}/>
                                  </li>
                                  <li>
                                  During the past 5 years has not been engaged in business as a financial institution or acted as a passive NFFE;
                                  </li>
                                  <li>
                                  Is either liquidating or emerging from a reorganization or bankruptcy with the intent to continue or recommence operations as a nonfinancial 
entity; <strong>and</strong>
                                  </li>
                                  <li>
                                  Has, or will provide, documentary evidence such as a bankruptcy filing or other public documentation that supports its claim if it remains in 
bankruptcy or liquidation for more than 3 years.
                                  </li>
                                </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
            Part XXI 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>501(c) Organization</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>35</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is a 501(c) organization that:</div>
                                 </div>
                                <ul>
                                  <li>
                                  Has been issued a determination letter from the IRS that is currently in effect concluding that the payee is a section 501(c) organization that is 
dated ;
                                  <input type="text"style={{marginLeft:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}}/><strong style={{marginLeft:"5px"}}>or</strong>
                                  </li>
                                  <li>
                                  Has provided a copy of an opinion from U.S. counsel certifying that the payee is a section 501(c) organization (without regard to whether the 
payee is a foreign private foundation).
                                  </li>
                                 
                                </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
           Part XXII 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Nonprofit Organization</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>36</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is a nonprofit organization that meets the following requirements.</div>
                                 </div>
                                <ul>
                                 
                                  <li>
                                  The entity is established and maintained in its country of residence exclusively for religious, charitable, scientific, artistic, cultural or educational purposes;
                                  </li>
                                 <li>
                                 The entity is exempt from income tax in its country of residence;
                                 </li>
                                 <li>
                                 The entity has no shareholders or members who have a proprietary or beneficial interest in its income or assets;
                                  </li>
                                  <li>
                                  Neither the applicable laws of the entity’s country of residence nor the entity’s formation documents permit any income or assets of the entity 
to be distributed to, or applied for the benefit of, a private person or noncharitable entity other than pursuant to the conduct of the entity’s 
charitable activities or as payment of reasonable compensation for services rendered or payment representing the fair market value of property 
which the entity has purchased;<strong> and</strong>
                                  </li>
                                  <li> The applicable laws of the entity’s country of residence or the entity’s formation documents require that, upon the entity’s liquidation or 
dissolution, all of its assets be distributed to an entity that is a foreign government, an integral part of a foreign government, a controlled entity 
of a foreign government, or another organization that is described in this part or escheats to the government of the entity’s country of 
residence or any political subdivision thereof</li>
                                </ul>
                               
                                 </td>
                                </tr>
                        
                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
           Part XXIII 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Publicly Traded NFFE or NFFE Affiliate of a Publicly Traded Corporation</strong>
                            </td>
                          </tr>
                          <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                    <strong>Check box 37a or 37b, whichever applies.</strong>
                                  </td>
                                 </tr>

                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left",marginLeft: "5px"  }}> <b>37a</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that:</div>
                                 </div>
                                
                                <ul>
                                 
                                  <li>
                                  The entity identified in Part I is a foreign corporation that is not a financial institution; <strong>and</strong>
                                  </li>
                                 <li>
                                 The stock of such corporation is regularly traded on one or more established securities markets, including
                                 <input type="text" style={{marginLeft:"5px",marginRight:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}}/>(name one securities exchange upon which the stock is regularly traded)
                                 </li>
                                
                                </ul>
                               
                                 </td>
                                </tr>
                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left",marginLeft: "5px"  }}> <b>b</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that:</div>
                                 </div>
                                
                                <ul>
                                 
                                  <li>
                                  The entity identified in Part I is a foreign corporation that is not a financial institution; 
                                  </li>
                                 <li>
                                 The entity identified in Part I is a member of the same expanded affiliated group as an entity the stock of which is regularly traded on an 
established securities market;
                                 </li>
                                 <li>
                                 The name of the entity, the stock of which is regularly traded on an established securities market, is <input type="text"style={{marginLeft:"5px",marginRight:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}}/><strong>and</strong>
                                 </li>
                               <li>
                               The name of the securities market on which the stock is regularly traded is <input type="text" style={{marginLeft:"5px",marginRight:"5px",marginTop:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}}/>
                               </li>
                                </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
         Part XXIV 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Excepted Territory NFFE</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>38</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that :</div>
                                 </div>
                                <ul>
                                  <li>
                                  The entity identified in Part I is an entity that is organized in a possession of the United States;
                                  </li>
                                 <li>
                                 The entity identified in Part I:
                                 </li>
                                 <ul>
                                 (i) Does not accept deposits in the ordinary course of a banking or similar business;
                                  </ul>
                                  <ul>
                                  (ii) Does not hold, as a substantial portion of its business, financial assets for the account of others;<strong>or</strong>
                                  </ul>
                                  <ul> (iii) Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with 
respect to a financial account; <strong>and</strong></ul>
<li>
All of the owners of the entity identified in Part I are bona fide residents of the possession in which the NFFE is organized or incorporated.
</li>
                                </ul>
                               
                                 </td>
                                </tr>
                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
        Part XXV 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Active NFFE</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>39</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that :</div>
                                 </div>
                                <ul>
                                 
                                  <li>
                                  The entity identified in Part I is a foreign entity that is not a financial institution;
                                  </li>
                                 <li>
                                 Less than 50% of such entity’s gross income for the preceding calendar year is passive income; <strong>and</strong>
                                 </li>
                                
<li>
 Less than 50% of the assets held by such entity are assets that produce or are held for the production of passive income (calculated as a 
weighted average of the percentage of passive assets measured quarterly) (see instructions for the definition of passive income).
</li>
                                </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
        Part XXVI 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Passive NFFE</strong>
                            </td>
                          </tr>


                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>40a</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I is a foreign entity that is not a financial institution (other than an investment entity organized in a
possession of the United States) and is not certifying its status as a publicly traded NFFE (or affiliate), excepted territory NFFE, active 
NFFE, direct reporting NFFE, or sponsored direct reporting NFFE.</div>
                                 </div>
                               
                               
                                 </td>
                                </tr>
                                <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                    <strong>Check box 40b or 40c, whichever applies.</strong>
                                  </td>
                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>b</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I further certify that the entity identified in Part I has no substantial U.S. owners (or, if applicable, no controlling U.S. persons);<strong>or</strong></div>
                                 </div>
                               
                               
                                 </td>
                                </tr>
                                <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>c</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I further certify that the entity identified in Part I has provided the name, address, and TIN of each substantial U.S. owner (or, if applicable,
controlling U.S. person) of the NFFE in Part XXIX.</div>
                                 </div>
                               
                               
                                 </td>
                                </tr>


                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
      Part XXVII 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Excepted Inter-Affiliate FFI</strong>
                            </td>
                          </tr>
                          <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>41</b></div>
                                    <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                    I certify that the entity identified in Part I:</div>
                                 </div>
                               <ul>
                                <li>Is a member of an expanded affiliated group;</li>
                                <li> Does not maintain financial accounts (other than accounts maintained for members of its expanded affiliated group);</li>
                              <li>
                               Does not make withholdable payments to any person other than to members of its expanded affiliated group;
                              </li>
                              <li>
                              Does not hold an account (other than depository accounts in the country in which the entity is operating to pay for expenses) with or receive
payments from any withholding agent other than a member of its expanded affiliated group; <strong>and</strong>
                              </li>
                              <li>
                               Has not agreed to report under Regulations section 1.1471-4(d)(2)(ii)(C) or otherwise act as an agent for chapter 4 purposes on behalf of any financial
institution, including a member of its expanded affiliated group
                              </li>
                               </ul>
                               
                                 </td>
                                </tr>

                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
     Part XXVIII 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Sponsored Direct Reporting NFFE </strong>(see instructions for when this is permitted)
                            </td>
                          </tr>
                          <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>42</b></div>
                                  Name of sponsoring entity:
                                    <input  name="" id="" style={{ verticalAlign: "middle", marginRight: "5px",marginLeft:"5px",borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px" }} />
                                   </div>

                                   <div style={{ width: "25px", float: "left" }}> <b>43</b></div>

                                   <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                   I certify that the entity identified in Part I is a direct reporting NFFE that is sponsored by the entity identified on line 42.
                                   </div>
                                
                             
                               
                                 </td>
                                </tr>
                        
                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
     Part XXVIII 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Sponsored Direct Reporting NFFE </strong>(see instructions for when this is permitted)
                            </td>
                          </tr>
                          <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                <div style={{ width: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                  <div style={{ width: "25px", float: "left" }}> <b>42</b></div>
                                  Name of sponsoring entity:
                                    <input  type="text" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px",marginLeft:"5px" ,borderWidth: "0 0 1px 0", borderBottom: "1px solid #000", padding: "0 10px"}} />
                                   </div>

                                   <div style={{ width: "25px", float: "left" }}> <b>43</b></div>

                                   <input type="checkbox" name="" id="" style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                   I certify that the entity identified in Part I is a direct reporting NFFE that is sponsored by the entity identified on line 42.
                                   </div>
                                
                             
                               
                                 </td>
                                </tr>
                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
    Part XXIX 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Substantial U.S. Owners of Passive NFFE</strong>
                            </td>
                          </tr>
                          <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                  As required by Part XXVI, provide the name, address, and TIN of each substantial U.S. owner of the NFFE. Please see the instructions for a definition of 
substantial U.S. owner. If providing the form to an FFI treated as a reporting Model 1 FFI or reporting Model 2 FFI, an NFFE may also use this part for 
reporting its controlling U.S. persons under an applicable IGA.
                             
                               
                                 </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>
                                  <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  margin: "40px auto",
                }}
              >
               
                <tbody >
                  <tr>
                    <td>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "12px",
                        }}
                        cellPadding={10}
                      >
                        <thead>
                          <tr>
                            <td
                              style={{
                                border: "2px solid #000",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Name
                            </td>
                            <td
                              style={{
                                border: "2px solid #000",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Address
                            </td>
                            <td
                              style={{
                                border: "2px solid #000",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Tin
                            </td>
                           
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ border: "2px solid #000" }}>
                              United States
                            </td>
                            <td style={{ border: "2px solid #000" }}>
                              Foreign
                            </td>
                            <td style={{ border: "2px solid #000" }}>{values.usTin}</td>
                           
                          </tr>
                          <tr>
                            <td style={{ border: "2px solid #000" }}>
                              {getCountries(values.foreignTINCountry)}
                            </td>
                            <td style={{ border: "2px solid #000" }}>
                              Foreign
                            </td>
                            <td style={{ border: "2px solid #000" }}>
                              {values.foreignTIN}
                            </td>
                           
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
                                  </td>
                                </tr>
                                
                                <tr>
                            <td
                              style={{
                                background: "#000",
                                color: "#fff",
                                fontWeight: "bold",
                                width: "120px",
                                border: "1px solid #000",
                                padding: "5px 10px",
                                textAlign: "center",
                              }}
                            >
   Part XXX 
                            </td>
                            <td
                              style={{  
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Certification</strong>
                            </td>
                          </tr>
                          <tr>
                                  <td colSpan={2} style={{ padding: "5px 10px" ,width: "100%"}}>
                                  Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further 
certify under penalties of perjury that:
<ul>
  <li>
  The entity identified on line 1 of this form is the beneficial owner of all the income or proceeds to which this form relates, is using this form to certify its status for 
chapter 4 purposes, or is submitting this form for purposes of section 6050W or 6050Y;
    </li>
    <li> The entity identified on line 1 of this form is not a U.S. person;</li>
    <li> This form relates to: (a) income not effectively connected with the conduct of a trade or business in the United States, (b) income effectively connected with the 
conduct of a trade or business in the United States but is not subject to tax under an income tax treaty, (c) the partner’s share of a partnership’s effectively 
connected taxable income, or (d) the partner’s amount realized from the transfer of a partnership interest subject to withholding under section 1446(f); and</li>
<li>
 For broker transactions or barter exchanges, the beneficial owner is an exempt foreign person as defined in the instructions
</li>
</ul>
Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income of which the entity on line 1 is the beneficial 
owner or any withholding agent that can disburse or make payments of the income of which the entity on line 1 is the beneficial owner.
<br/>
                  <strong>I agree that I will submit a new form within 30 days if any certification on this form becomes incorrect.</strong>           
                               
                                 </td>
                                </tr>



                          <tr>
                            <td colSpan={2} style={{ color: "blue" }}>
                              The Internal Revenue Service does not require your
                              consent to any provisions of this document other
                              than the certifications required to establish your
                              status as a non-U.S. person and, if applicable,
                              obtain a reduced rate of withholding.
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "10px 0" }}>
                              <input
                                type="checkbox"
                                name=""
                                defaultChecked
                                id=""
                                style={{
                                  background: "#fff",
                                  border: "1px solid #000",
                                  marginRight: "5px",
                                 
                                }}
                              />{" "}
                              <strong>I certify that I have the capacity to sign for the
                              person identified on line 1 of this form.</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <table
                                style={{
                                  borderCollapse: "collapse",
                                  width: "100%",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        fontSize: "12px",
                                        
                                        maxWidth: "20%",
                                      }}
                                    >
                                      <h6 style={{fontWeight: "bold",}}>Sign Here</h6>
                                    </td>
                                    <td style={{ width: "80%" }}>
                                      <table
                                        style={{
                                          borderCollapse: "collapse",
                                          width: "100%",
                                        }}
                                        cellSpacing="10"
                                      >
                                        <tbody>
                                          <tr>
                                            <td colSpan={2}>Electronically signed</td>
                                          </tr>
                                          <tr>
                                            <td colSpan={2}> 
                                              {/* <img src="" alt="" />  */}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                width: "70%",
                                                padding: "0 10px",
                                                color: "blue",
                                                verticalAlign: "bottom",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "table",
                                                  borderBottom:
                                                    "1px solid #000",
                                                  width: "100%",
                                                }}
                                              >
                                                <span
                                                  style={{
                                                    display: "table-cell",
                                                    textAlign: "left",
                                                    width: "50%",
                                                  }}
                                                >
                                                  Date : {moment().format("DD-MM-YYYY hh-mm-ss A")}
                                                </span>
                                                <span
                                                  style={{
                                                    display: "table-cell",
                                                    textAlign: "right",
                                                    width: "50%",
                                                  }}
                                                >
                                                  {" "}
                                                  ESC : YSCML
                                                </span>
                                              </div>
                                            </td>
                                            <td
                                              style={{
                                                width: "30%",
                                                borderBottom: "1px solid #000",
                                                padding: "10px",
                                                color: "blue",
                                              }}
                                            >
                                              {moment().format("DD-MM-YYYY")}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={{
                                                width: "70%",
                                                color: "#000",
                                                textAlign: "center",
                                              }}
                                            >
                                              Signature of beneficial owner (or
                                              individual authorized to sign for
                                              beneficial owner)
                                            </td>
                                            <td
                                              style={{
                                                width: "30%",
                                                color: "#000",
                                                textAlign: "center",
                                              }}
                                            >
                                              Date (MM-DD-YYYY)
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan={2}
                                              style={{
                                                fontSize: "12px",
                                                color: "blue",
                                                borderBottom: "1px solid #000",
                                              }}
                                            >
                                              {values.signedBy}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan={2}
                                              style={{
                                                fontSize: "12px",
                                                color: "#000",
                                              }}
                                            >
                                              Print name of signer
                                            </td> {"   "}{values.signedBy}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      style={{ padding: "10px 0", borderTop: "2px solid #000" }}
                      colSpan={3}
                    >
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ width: "50%", fontSize: "12px" }}>
                              <strong>
                                For Paperwork Reduction Act Notice, see separate
                                instructions.
                              </strong>
                            </td>
                            <td style={{ width: "20%", textAlign: "center" }}>
                              Cat. No. 25047Z
                            </td>
                            <td style={{ width: "30%", textAlign: "end" }}>
                              Form{" "}
                              <span
                                style={{ fontSize: "12px", fontWeight: "bold" }}
                              >
                                W-8BEN
                              </span>{" "}
                              (Rev. 10-2021)
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "50%", color: "blue" }}>
                              Electronic Submission Confirmation: {values.confirmationCode}
                            </td>
                            <td
                              style={{
                                width: "20%",
                                color: "blue",
                                textAlign: "center",
                              }}
                            >
                              Email Address :
                            </td>
                            <td style={{ width: "30%", color: "blue" }}>
                              <a href={lValues.contactEmail}>
                                {lValues.contactEmail}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tfoot>
              </table>



              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  margin: "40px auto",
                  fontSize: "14px",
                }}
                cellPadding={5}
              >
                <thead>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        paddingBottom: "10px",
                      }}
                    >
                      Additional Information Provided:
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "50%",}}>Entity Name:</td>
                    <td style={{ width: "50%" ,}}>{lValues.entityName}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Capacity:</td>
                    <td style={{ width: "50%" ,}}>Capacity Not Requested</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Form Filed:</td>
                    <td style={{ width: "50%", }}>W-8BEN (Oct 2021)</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>Date:</td>
                    <td style={{ width: "50%" ,}}>{moment().format("DD-MM-YYYY")}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>
                      Electronic Recipient Statement Consent:
                    </td>
                    <td style={{ width: "50%", }}>No</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Contact email address:</td>
                    <td style={{ width: "50%" ,}}>
                      {" "}
                      <a
                        href={lValues.contactEmail}
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                       {lValues.contactEmail}
                      </a>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>Contact cell number:</td>
                    <td style={{ width: "50%", }}>{lValues.contactEmail} </td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Day time contact number:</td>
                    <td style={{ width: "50%" ,}}>
                      {/* United States */}
                       {lValues.primaryContactNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>
                      Day time Alternate contact number:
                    </td>
                    <td style={{ width: "50%" ,}}>
                      United States
                       {lValues.alternativeNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>
                      Day time Alternate contact number:
                    </td>
                    <td style={{ width: "50%", }}>
                      United States 
                      {lValues.alternativeNumber1}</td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  margin: "40px auto",
                  fontSize: "14px",
                }}
                cellPadding={5}
              >
                <thead>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        paddingBottom: "10px",
                      }}
                    >
                     Banking Information:
                     <h6>Accompanying Form W-8BEN-E (Rev - Oct 2021), Submitted 3/1/2024 7:22:26 AM</h6>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "50%" ,}}>Remittance Information:</td>
                    <td style={{ width: "50%", }}>{lValues.entityName}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Entity Name:</td>
                    <td style={{ width: "50%", }}>Capacity Not Requested</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>Payment Type:</td>
                    <td style={{ width: "50%" ,}}>W-8BEN (Oct 2021)</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Account Holder Name:</td>
                    <td style={{ width: "50%" ,}}>{moment().format("DD-MM-YYYY")}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>
                    Capacity:
                    </td>
                    <td style={{ width: "50%",}}>No</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>Bank Name:</td>
                    <td style={{ width: "50%" ,}}>
                      {" "}
                      <a
                        href={lValues.contactEmail}
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                       {lValues.contactEmail}
                      </a>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>Bank Branch Location:</td>
                    <td style={{ width: "50%", }}>{lValues.contactEmail} </td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>Bank Account Number:</td>
                    <td style={{ width: "50%" ,}}>
                      {/* United States */}
                       {lValues.primaryContactNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" ,}}>
                    Bank code:
                    </td>
                    <td style={{ width: "50%" ,}}>
                      United States
                       {lValues.alternativeNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%", }}>
                    Signed By
                    </td>
                    <td style={{ width: "50%" ,}}>
                      United States 
                      {lValues.alternativeNumber1}</td>
                  </tr>
                  <tr>
                  <td style={{ width: "50%" ,}}>
                  E-Sign Date:
                    </td>
                    <td style={{ width: "50%", }}>
                      United States 
                      {lValues.alternativeNumber1}</td>
                    </tr>
                    <tr>
                  <td style={{ width: "50%", }}>
                  Email
                    </td>
                    <td style={{ width: "50%" ,}}>
                      United States 
                      {lValues.alternativeNumber1}</td>
                    </tr>
                    <tr>
                  <td style={{ width: "50%" ,}}>
                  Electronic Confirmation Code:
                    </td>
                    <td style={{ width: "50%" ,}}>
                      United States 
                      {lValues.alternativeNumber1}</td>
                    </tr>
                </tbody>
              </table>
              <section style={{ breakAfter: "page", breakBefore: "page" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "40px auto 0px",
                fontSize: "14px",
              }}
              cellPadding={5}
            >
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      paddingBottom: "0px",
                      textAlign: "left",
                      paddingLeft: "0",
                    }}
                  >
                    <strong>
                    Further Information:
                    </strong>
                  </th>
                </tr>
              </thead>
            </table>
           

            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                margin: "20px auto 20px",
                fontSize: "13px",
                border: "2px solid #000",
              }}
             
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      borderRight: "2px solid #000",
                      borderBottom: "2px solid #000", 
                      color: "#000",
                      width: "50%",
                      padding:"5px 10px"
                    }}
                  >
                    <strong>

                    No U.S. Source Income Declaration
                    </strong>
                  </td>
                  <td style={{ borderBottom: "2px solid #000",marginLeft:'5px', padding:"5px 10px" }}>Not Selected</td>
                </tr>
               
              </tbody>
              <tr>
              <td  colSpan={2}
        style={{
          borderRight: "2px solid #000",
          borderBottom: "2px solid #000",
          color: "#000",
          fontSize:"14px",
          padding:"5px 10px"
        }}>
                Declaration Statement - Declaration of No U.S. Source Income Under penalties of perjury I
confirm that the goods or materials provided or manufactured and any and all associated
services, including consultancy, implementation, training or support are undertaken entirely from
locations outside of the United States and United States territories. I also confirm that the invoices
submitted will not include a request for payment of Dividends, Insurance Premiums or Interest
payments. I further confirm that should this situation change I will provide adequate notification,
clearly identify items that may be considered gained from U.S. sources, identify any Dividends,
Insurance Premiums or Interest payments due on any invoices submitted and submit an updated
U.S. source income statement.
<div className="col-12 mt-3" style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="col-6" >Signed by:</div>
      <div className="col-5">Date:</div>
    </div>
                </td>
                
                </tr>
            </table>

            <table
             style={{
               
              width: "100%",
              maxWidth: "920px",
              margin: "20px auto 20px",
              fontSize: "13px",
              border: "2px solid #000",
            }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      borderRight: "2px solid #000",
                      borderBottom: "2px solid #000", 
                      color: "#000",
                      width: "100%",
                      padding:"5px 10px"
                    }}
                  >
                    <strong>

                    No U.S. Source Income 
                    </strong>
                  </td>
                 
                </tr>
                <tr>
      <td
        style={{
          borderBottom: "2px solid #000",
          fontSize: "14px",
          color: "#000",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Selection made:</div>
          <div>Other</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Question answered:</div>
          <div>Please provide an explanation</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Answer:</div>
          <div>ghg</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Allocation %:</div>
          <div>100%</div>
        </div>
      </td>
    </tr>
               
              </tbody>
             
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "0px auto",
                fontSize: "14px",
              }}
              cellPadding={10}
            >
              <tbody>
                <tr>
                  <td colSpan={2} style={{ padding: "0" }}>
                    <div
                      style={{
                        border: "2px solid #000",
                        padding: "10px 10px",
                        margin: "2px 0",
                      }}
                    >
                      <h6>
                       <strong> Warning Notification Override issue Number and type:</strong>
                      </h6>
                      <ol start={1}>
                        <li>FTIN100 - TIN</li>
                        <li>A113 - Address</li>
                        <li>SIG101 - SIGNATURE</li>
                        <li>IGA105 - IGA</li>
                      </ol>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
            </div>
          </div>
        </View>
        <div style={{ paddingTop: "20px" }}>
        <Button
            onClick={downloadPDF}
            variant="contained"
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
            Download PDF
          </Button>
          <Button
            onClick={backFunction}
            variant="contained"
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
            Back
          </Button>
        </div>

      </div>
      <div className="container-fluid">
          <footer>
            <div className="row mx-1">
              <Typography
                className="mx-2"
                align="left"
                style={{
                  marginBottom: "10px",
                  color: "white",
                  fontSize: "12px",
                }}
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
    </>
  );
};

export default W8BenE;
