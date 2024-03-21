import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { Button, Collapse, Typography } from "@mui/material";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { color } from "html2canvas/dist/types/css/types/color";
import moment from "moment";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";
import { getAllCountries, getECIformData } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "./printStyle.css";
//import pdfBg from "../assets/img/pdfBg.png"

const FormEXP: React.FC = () => {
  const contentRef: any = useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { authDetails } = useAuth();
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

  const [values, setValues] = useState({
    accountHolderBasicDetailId: 0,
    agentId: 0,
    formTypeSelectionId: 2,
    eciUsTinTypeId: 0,
    eciUsTin: "",
    streetNumberName: "",
    aptSuite: "",
    cityTown: "",
    stateProvinceId: 0,
    zipPostalCode: "",
    chapter3Status: 0,
    firstName: "",
    lastName: "",
    countryOfResidence: null,
    businessName: "",
    businessDisgradedEntity: "",
    countryOfIncorporation: 0,
    isHybridStatus: 0,
    descriptionHybridStatus: "",
    attachSupportingDocument: "",
    attachSupportingDocumentFile: null,
    isSubmissionSingleUSOwner: false,
    isDisRegardedSection1446: false,
    isExemptionfromBackup: null,
    interestDividendPaymentId: null,
    brokerTransactionsId: null,
    barterExchangeTransactionId: null,
    paymentOver600RequiredId: null,
    paymentThirdPartyNetworkId: null,
    isExemptionFATCAReportings: null,
    fatcaReportingId: null,
    usTinTypeId: 0,
    usTin: "",
    notAvailable: false,
    notAvailableReason: "",
    foreignTINCountry: 0,
    foreignTIN: "",
    isFTINLegally: false,
    isNotAvailable: false,
    fTinNotAvailableReason: "",
    alternativeTINFormat: false,
    isExplanationNotLegallyFTIN: false,
    itemIncomeType: null,
    incomeDescription: null,
    isAppplicationCheck: false,
    isBeneficialOwnerIncome: false,
    isAmountCertificationUS: false,
    isBeneficialOwnerGrossIncome: false,
    isBeneficialOwnerNotUSPerson: false,
    isAuthorizeWithHoldingAgent: false,
    isCapacityForm: false,
    isTaxpayerIdentificationNumber: null,
    isIRS: null,
    isUSCitizen: null,
    isFATCACode: null,
    isIRSBackupWithHolding: null,
    isElectronicForm: false,
    signedBy: null,
    confirmationCode: null,
    date: null,
    isAcceptanceDeclarations: null,
    securityWord: null,
    hint: null,
    yourConfirmationCode: null,
    isAgreeWithDeclaration: null,
    isConsentRecipent: null,
    isNotConsentRecipent: null,
    statusId: null,
    stepName: "",
  });
  const [lValues, setLValues] = useState({
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

  useEffect(() => {

    dispatch(
      getAllCountries()
    );
    setLValues(JSON.parse(localStorage.getItem("agentDetails") || "{}"));
  }, []);

  useEffect(() => {
    (dispatch(getECIformData(authDetails?.accountHolderId, (data: any) => { setValues(data) })))
  }, [authDetails])

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

  const handleExportPDF = async () => {
    const pixelRatio = 3;
    let first = true;
    const data: any = document.getElementById('pdf-content');
    const pageHeight = 295; // Set the desired height of each page in the PDF

    const doc = new jsPDF("p", "mm");
    const docWidth = doc.internal.pageSize.getWidth();

    let positionY = 0;
    let currentPage = 1;

    const addNewPage = () => {
      doc.addPage();
      positionY = 0;
      currentPage++;
    };

    const renderContent = (child: any) => {
      return new Promise((resolve) => {
        html2canvas(child, { scale: pixelRatio }).then((canvas) => {
          //const imgData = canvas.toDataURL('image/jpeg');
          console.log(canvas, "canvas")
          if (canvas.height == 0) {
            resolve(true)
            return;
          }

          const imgHeight = (canvas.height * docWidth) / canvas.width;

          if (positionY + imgHeight > pageHeight && !first) {
            addNewPage();
          }
          first = false;

          doc.addImage(canvas, 'PNG', 0, positionY, docWidth, imgHeight);
          // doc.scale=3;
          positionY += imgHeight;

          resolve(true);
        });
      });
    };

    const children = Array.from(data.children);

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      await renderContent(child);
    }

    doc.save('Download.pdf');
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

  const backFunction = () => {
    history(-1);
  };

  return (
    <>
      <style>
        {`
    
      @media print{
        .pagebk-before{
          page-break-before:always;
        }
        .pagebk-after{
          page-break-before:always;
        }
      }
    
    `}


      </style>

      <section className="inner_content" style={{ backgroundColor: "#0c3d69", marginBottom: "10px", boxSizing: "border-box" }} >
        <div style={{ paddingBlockStart: "30px" }}></div>
        <div style={{
          // contentVisibility: "hidden",
          margin: "0 auto",
          maxWidth: "900px",
          width: "100%",
          padding: "0px",
          display: "table",
          boxSizing: "border-box",
          fontSize: "10px",
        }}>
          <View wrap={false}>
            <div ref={contentRef} id="pdf-content">
              <div className="page page1" style={{ background: "white", height: "auto", width: "100%", color: "black", fontFamily: "sans-serif", padding: "60px 30px 30px", boxSizing: "border-box", marginBottom: "4px" }}>
                <table style={{ width: "100%", maxWidth: "920px", color: "#000", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr>
                      <th style={{ width: "17%", boxSizing: "border-box", fontSize: "11px", lineHeight: "1.3", borderRight: "2px solid #000", borderBottom: "2px solid #000" }}>
                        <p style={{ fontSize: "12px", marginBottom: "4px" }}>Form <strong style={{ fontSize: "30px", fontWeight: "700" }}>W-8ECI</strong></p>
                        <p style={{ margin: "5px 0" }}>(Rev. October 2021)</p>
                        <p style={{ marginBottom: "0" }}>Department of the Treasury Internal Revenue Service</p>
                      </th>
                      <th style={{ padding: "0 15px", boxSizing: "border-box", textAlign: "center", fontSize: "14px", lineHeight: "1.3", borderRight: "2px solid #000", borderBottom: "2px solid #000" }}>
                        <h1 style={{ fontSize: "13px", fontWeight: "bolder" }}>Certificate of Foreign Person's Claim That Income Is Effectively <br />
                          Connected With the  Conduct of a Trade or Business in the United States</h1>
                        <ul style={{ listStyle: "none", fontSize: "12px", lineHeight: "1.1" }}>
                          <li>&#9658; Section references are to the Internal Revenue Code.</li>
                          <li>&#9658; Go to www.irs.gov/FormW8ECI for instructions and the latest information.</li>
                          <li>&#9658;Give this form to the withholding agent or payer. Do not send to the IRS.</li>
                        </ul>
                      </th>
                      <th style={{ boxSizing: "border-box", fontSize: "18px", fontWeight: "bolder", lineHeight: "1.3", borderBottom: "2px solid #000", padding: "0 0 0 10px", textAlign: "center" }}>
                        <p style={{ fontSize: "17px", textAlign: "left", color: "blue", fontWeight: "400", marginBottom: "6px" }}>UID : {lValues.uniqueIdentifier}</p>
                        <h3 style={{ fontSize: "16px", fontWeight: "bolder", lineHeight: "1", marginBottom: "3px" }}>Electronic </h3>
                        <h3 style={{ fontSize: "16px", fontWeight: "bolder", lineHeight: "1", }}>Substitute  </h3>
                        <h4 style={{ fontSize: "12px", lineHeight: "2", marginBottom: "0", fontWeight: "600" }}>Form W-8ECI</h4>
                      </th>
                    </tr>
                  </thead>
                  <tr style={{ width: "100%", borderCollapse: "collapse", margin: "10px 0" }}>
                    <td colSpan={3} >
                      <tr style={{ width: "100%", borderCollapse: "collapse", margin: "10px 0" }}>
                        <td style={{ textAlign: "start", borderCollapse: "collapse", padding: "0", textDecorationLine: "underline", textUnderlinePosition: "under", whiteSpace: "nowrap" }}><strong>Note:</strong> Persons submitting this form must file an annual U.S. income tax return to report income claimed to be effectively connected with a U.S. trade or business. See instructions. </td>
                      </tr>
                    </td>
                  </tr>
                  <tbody>
                    <tr>
                      <td colSpan={3}>
                        <table style={{ width: "100%", borderCollapse: "collapse", margin: "1px 0" }}>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "start", padding: "0", fontWeight: "bold" }}>Do NOT use this form if: </td>
                              <td style={{ textAlign: "end", padding: "0", fontWeight: "bold" }}>Instead, use Form: </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <ul style={{ width: "100%", padding: "0 0 0 16px", marginTop: "1px", textAlign: "justify", marginBottom: "0px" }}>
                                  <li style={{ marginBottom: "6px" }}>A beneficial owner solely claiming foreign status or treaty benefits. . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . .  . W8BEN or W8BEN-E </li>
                                  <li style={{ marginBottom: "6px" }}>A foreign government, international organization, foreign central bank of issue, foreign tax-exempt organization, foreign private
                                    foundation, or government of a U.S. possession claiming the applicability of section(s) 115(2), 501(c), 892, 895, or 1443(b). . . . . . . . . . W8-EXP</li>
                                  <h6 style={{ margin: "3px 0px", textAlign: "justify", fontSize: "12px" }}><strong>Note:</strong> These entities should use Form W-8ECI if they received effectively connected income and are not eligible to claim an exemption for chapter 3
                                    or 4 purposes on Form W-8EXP.</h6>

                                  <li style={{ marginBottom: "6px" }}>A foreign partnership or a foreign trust (unless claiming an exemption from U.S. withholding on income effectively connected with the
                                    conduct of a trade or business in the United States). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . <span style={{ textAlign: "end" }}> W-8BEN-E or W-8IMY</span></li>
                                  <li> A person acting as an intermediary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8IMY </li>
                                  <h6 style={{ marginTop: "2px", fontSize: "12px", marginBottom: "2px" }}><strong>Note:</strong> See instructions for additional exceptions.</h6>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style={{ width: "100%", borderCollapse: "collapse", }} cellPadding={0}>
                          <thead>
                            <tr>
                              <td style={{ background: "#000", color: "#fff", fontWeight: "bold", width: "55px", border: "1px solid #000", padding: "2px 10px", textAlign: "center" }}>Part I </td>
                              <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "2px 10px" }}>
                                <strong>Identification of Beneficial Owner</strong>(see instructions) </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={2} style={{ padding: "0" }}>
                                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                                  <tbody>
                                    <tr>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight: "1px solid #000" }}>
                                        <strong style={{ marginRight: "6px" }}>1.</strong> Name of individual or organization that is the beneficial owner
                                        <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0" }}>{values.businessName} </p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                        <strong style={{ marginRight: "6px" }}>2.</strong> Country of incorporation or organization
                                        <p style={{ color: "blue", width: "100%", margin: "2px 0 0", lineHeight: "1.0" }}> United Kingdom </p>
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
                                        <strong style={{ marginRight: "6px" }}>3.</strong> Name of disregarded entity receiving the payment (if applicable)
                                        <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0", fontWeight: "600" }}> {lValues?.firstName}{" "}{lValues?.lastName}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={4} style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                        <div style={{ width: "20px", marginRight: "10px", float: "left" }}><strong style={{ marginRight: "6px" }}>4.</strong></div>
                                        <div style={{ width: "calc(100% - 30px)", float: "left" }}>
                                          Type of entity (check the appropriate box):
                                          <div style={{ display: "flex", width: "100%", marginTop: "10px" }}>
                                            <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
                                              <div style={{ display: "flex", marginLeft: "0px! IMPORTANT" }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Partnership</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Foreign Government - Controlled Entity</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Foreign Government - Integral Part</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Private foundation</label>

                                              </div>

                                            </div>
                                            <div style={{ width: "30%", display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Simple trust</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Grantor trust</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>International organization</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={true} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Individual</label>

                                              </div>

                                            </div>
                                            <div style={{ display: "flex", width: "25%", flexDirection: "column", marginLeft: "20px" }}>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Complex trust</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Central bank of issue</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Corporation</label>

                                              </div>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Estate</label>

                                              </div>

                                            </div>
                                            <div style={{ display: "flex", width: "21%", flexDirection: "column", marginLeft: "20px" }}>
                                              <div style={{ display: "flex", }}>
                                                <input type="checkbox" checked={false} />
                                                <label style={{ fontSize: "12px", marginLeft: "7px" }}>Tax-exempt organization</label>

                                              </div>


                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td colSpan={2} style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                        <strong style={{ marginRight: "6px" }}>5.</strong> Permanent residence address (street, apt. or suite no., or rural route). <strong>Do not use a P.O. box or in-care-of address.</strong>
                                        <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0", fontWeight: "600" }}>{lValues?.permanentResidentialStreetNumberandName}{" "}{lValues?.permanentResidentialAptSuite}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>
                                        <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                          <tbody>
                                            <tr>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight: "1px solid #000" }}>
                                                City or town, state or province. Include postal code where appropriate.
                                                <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0", fontWeight: "600" }}> {lValues.permanentResidentialCityorTown}{" "}{lValues.permanentResidentialStateorProvince}{" "}{lValues.permanentResidentialZipPostalCode}</p>
                                              </td>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "30%" }}>
                                                Country
                                                <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0", fontWeight: "600" }}>
                                                  {getCountries(lValues.permanentResidentialCountryId)}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2} style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                        <strong style={{ marginRight: "6px" }}>6.</strong> Business address in the United States (street, apt. or suite no., or rural route). <strong>Do not use a P.O. box or in-care-of address.</strong>
                                        <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0", fontWeight: "600" }}> {lValues?.permanentResidentialStreetNumberandName1}{" "}{lValues?.permanentResidentialAptSuite1}</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>
                                        <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                          <tbody>
                                            <tr>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight: "0px solid #000" }} colSpan={3}>
                                                City or town, state, and ZIP code
                                                <p style={{ color: "#82b1ff", width: "100%", margin: "2px 0 0", lineHeight: "1.0", fontWeight: "600" }}>  {lValues.permanentResidentialCityorTown}{" "}{lValues.permanentResidentialStateorProvince1}{" "}{lValues.permanentResidentialZipPostalCode1}</p>
                                              </td>

                                            </tr>
                                            <tr >
                                              <td style={{ borderBottom: "1px solid #000", padding: "0px 10px", width: "29%" }}>
                                                <strong style={{ marginRight: "6px" }}>7.</strong> U.S. taxpayer identification number (required—see instructions)

                                              </td>
                                              <td style={{ borderBottom: "1px solid #000", padding: "0px 10px", width: "8.5%" }}> <input className="mx-1" type="checkbox" checked={values?.eciUsTinTypeId == 1} style={{ verticalAlign: "text-bottom" }} />
                                                SSN or ITIN</td>
                                              <td style={{ borderBottom: "1px solid #000", padding: "0px 10px" }}> <input className="mx-1" type="checkbox" checked={values?.eciUsTinTypeId == 2} style={{ verticalAlign: "text-bottom" }} />
                                                EIN</td>
                                            </tr>

                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>
                                        <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                          <tbody>
                                            <tr>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%", borderRight: "1px solid #000" }}>
                                                <strong style={{ marginRight: "6px" }}>8a.</strong> &nbsp; Foreign tax identifying number (FTIN)
                                                <p style={{ color: "#82b1ff", width: "100%", margin: "6px 0 0", lineHeight: "1.4" }}>{values.foreignTIN}</p>
                                              </td>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%" }}>
                                                <strong style={{ marginRight: "6px" }}>8b.</strong> &nbsp; Check if FTIN not legally required . . . . . . . . . . . . . . . . . . . . . . <input type="checkbox" name="" id="" checked={lValues.foreignTINNotAvailable} />
                                                <p style={{ color: "#82b1ff", width: "100%", margin: "6px 0 0", lineHeight: "1.4" }}> </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2}>
                                        <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                          <tbody>
                                            <tr>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%", borderRight: "1px solid #000" }}>
                                                <strong style={{ marginRight: "6px" }}>9.</strong> Reference number(s) (see instructions)
                                                <p style={{ color: "blue", width: "100%", margin: "6px 0 0", lineHeight: "1.4" }}>VAT : 7678676 </p>
                                              </td>
                                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%" }}>
                                                <strong style={{ marginRight: "6px" }}>10.</strong> Date of birth (MM-DD-YYYY) (see instructions)
                                                <p style={{ color: "blue", width: "100%", margin: "6px 0 0", lineHeight: "1.4" }}>{lValues?.dob ? moment(lValues?.dob).format("MM-DD-YYYY") : moment(values.date).format("MM-DD-YYYY")}  </p>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colSpan={2} style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                                <strong style={{ marginRight: "6px" }}> 11. </strong>Specify each item of income that is, or is expected to be, received from the payer that is effectively connected with the conduct of a trade or
                                                business in the United States (attach statement if necessary).
                                                <input type="text" name="" id="" value="Armenia" style={{ minWidth: "100%", maxWidth: "100%", width: "100%", borderWidth: "0 0 1px 0", borderStyle: "solid", borderColor: "#000", textAlign: "left", color: "blue" }} />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colSpan={2} style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                                <strong style={{ marginRight: "6px" }}> 12. </strong>Check here to certify that: you are a dealer in securities (as defined in section 475(c)(1)); you are a transferor of an interest in a publicly traded partnership
                                                (PTP) claiming an exception from withholding under Regulations section 1.1446(f)-4(b)(6); and any gain from the transfer of the PTP interest associated
                                                with this form is effectively connected with the conduct of a trade or business within the United States without regard to section 864(c)(8). . . . . . . . . . . . . .
                                                <input type="checkbox" name="" id="" style={{ borderWidth: "0 0 1px 0", borderStyle: "solid", borderColor: "#000", textAlign: "center", marginTop: "5px" }} />
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
                        </table>

                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "-1px" }} cellPadding={0}>
                          <thead>
                            <tr>
                              <td style={{ background: "#000", color: "#fff", fontWeight: "bold", width: "55px", border: "1px solid #000", padding: "2px 10px", textAlign: "center" }}>Part II </td>
                              <td style={{ borderTop: "0px solid #000", borderBottom: "1px solid #000", padding: "2px 10px" }}>
                                <strong>Certification</strong> </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ borderRight: "1px solid black", padding: "17px" }}>
                                <h3 style={{ fontSize: "21px", fontWeight: "600" }}>Sign Here</h3>
                              </td>
                              <td style={{ paddingLeft: "12px" }}>
                                <table>
                                  <tr>
                                    <td >Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:</td>
                                  </tr>
                                  <tr style={{ paddingLeft: "12px" }}>
                                    <td> <ul style={{ listStyle: "disc", paddingLeft: "16px", marginBottom: "3px" }}>
                                      <li> I am the beneficial owner (or I am authorized to sign for the beneficial owner) of all the payments to which this form relates,
                                      </li>
                                      <li>The amounts for which this certification is provided are effectively connected with the conduct of a trade or business in the United States</li>

                                      <li> The income for which this form was provided is includible in my gross income (or the beneficial owner’s gross income) for the taxable year, <strong>and</strong></li>
                                      <li>The beneficial owner is not a U.S. person</li>
                                    </ul>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td><p style={{ marginBottom: "10px" }}>Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the payments of which I am the
                                      beneficial owner or any withholding agent that can disburse or make payments of the amounts of which I am the beneficial owner.</p></td>
                                  </tr>
                                  <tr>
                                    <td><strong>I agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect. </strong></td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: "blue" }}>W-8ECI – Electronic Substitute Form Statement</td>
                                  </tr>
                                  <tr>
                                    <td style={{ color: "blue" }}><p style={{ fontSize: "11px", marginBottom: "3px" }}>The Internal Revenue Service does not require your consent to any provisions of this document other than the certifications required to establish your status as a non-U.S. person and
                                      that the income for which this form is provided is effectively connected with the conduct of a trade or business within the United States</p></td>
                                  </tr>
                                  <tr>
                                    <td><p style={{ margin: "5px 0px", display: "flex" }}><input type="checkbox" name="" style={{ background: "#fff", border: "1px solid #000", marginRight: "10px" }} /> <strong>I certify that I have the capacity to sign for the person identified on line 1 of this form.</strong></p></td>
                                  </tr>
                                  <tr>
                                    <td><p>Electronically signed</p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table style={{ width: "100%", fontSize: "11px" }} cellSpacing={10}>
                                        <tr>
                                          <td><span style={{ fontSize: "11px", borderBottom: "1px solid #080808", width: "100%", display: "block" }}>
                                            <img src="./assets/img/signature.PNG" style={{ display: "block" }}></img>Date:</span></td>
                                          <td style={{ verticalAlign: "bottom" }}><span style={{ fontSize: "11px", borderBottom: "1px solid #080808", width: "100%", display: "block" }}>ESC:</span></td>
                                          <td style={{ paddingRight: "5px", paddingLeft: "2px", verticalAlign: "bottom", width: "18%" }}><span style={{ fontSize: "11px", borderBottom: "1px solid #080808", width: "100%", display: "block" }}></span></td>
                                          <td style={{ verticalAlign: "bottom", width: "18%" }}><span style={{ fontSize: "11px", borderBottom: "1px solid #080808", width: "100%", display: "block" }}></span></td>
                                        </tr>
                                        <tr>
                                          <td colSpan={2}><span>Signature of beneficial owner (or individual authorized to sign for the beneficial owner) </span></td>
                                          <td style={{ textAlign: "center" }}><span>Print name</span></td>
                                          <td style={{ textAlign: "center" }}><span>Date (MM-DD-YYYY)</span></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>



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
                      <td style={{ padding: "0px 0", borderTop: "2px solid #000" }} colSpan={3}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <tbody>
                            <tr>
                              <td style={{ width: "50%", fontSize: "11px" }}>
                                <strong>For Paperwork Reduction Act Notice, see separate instructions.</strong>
                              </td>
                              <td style={{ width: "20%", textAlign: "center", fontSize: "11px" }}>
                                Cat. No. 25047Z
                              </td>
                              <td style={{ width: "30%", textAlign: "end", fontSize: "11px" }}>
                                Form <span style={{ fontSize: "16px", fontWeight: "bold" }}>W-8BEN</span> (Rev. 10-2021)
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="pagebk-after"></div>


              <div className="page page2" style={{ height: "29cm", width: "100%", background: "#fff", color: "black", fontFamily: "sans-serif", padding: "70px 30px 30px", boxSizing: "border-box", marginBottom: "4px" }}>
                <table style={{ width: "100%", maxWidth: "920px", color: "#000", borderCollapse: "collapse", fontSize: "12px" }}>
                  <tr>
                    <td>
                      <h3 style={{ fontSize: "30px", fontWeight: "600", color: "#000", paddingBottom: "22px", paddingLeft: "4px" }}>Additional notes</h3>
                      <p style={{ fontSize: "17px", fontWeight: "600" }}> City/Town Of Birth:</p>
                    </td>
                  </tr>
                </table>
              </div>



              <div className="page page3" style={{ height: "29cm", width: "100%", background: "#fff", color: "black", fontFamily: "sans-serif", padding: "70px 30px 30px", boxSizing: "border-box", marginBottom: "4px" }}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr>
                      <td colSpan={4} style={{ fontSize: "20px", fontWeight: "700", color: "#000", paddingBottom: "22px", paddingLeft: "4px" }}> Tax Jurisdictions </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "14px" }} cellPadding={10}>
                          <thead>
                            <tr>

                              <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "6px" }}>Country</td>
                              <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "6px" }}>TIN Type </td>
                              <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "6px" }}>Tax Identification</td>
                              <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold", fontSize: "18px", padding: "6px" }}>TIN Unavailable</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ border: "2px solid #000" }}>United States</td>
                              <td style={{ border: "2px solid #000" }}>Foreign</td>
                              <td style={{ border: "2px solid #000" }}>243543</td>
                              <td style={{ border: "2px solid #000" }}>False</td>
                            </tr>
                            <tr>
                              <td style={{ border: "2px solid #000" }}>Antarctica</td>
                              <td style={{ border: "2px solid #000" }}>Foreign</td>
                              <td style={{ border: "2px solid #000" }}>6856383</td>
                              <td style={{ border: "2px solid #000" }}>False</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div className="page page4" style={{ height: "29cm", width: "100%", background: "#fff", color: "black", fontFamily: "sans-serif", padding: "70px 30px 30px", boxSizing: "border-box", marginBottom: "4px" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "20px" }} cellPadding={10}>
                  <thead>
                    <tr><td colSpan={2} style={{ fontSize: "25px", fontWeight: "600", color: "#000", paddingBottom: "0px", paddingLeft: "4px" }}> United States Citizenship Test Results </td> </tr>
                    <tr><td colSpan={2} style={{ fontSize: "20px", fontWeight: "700", color: "#000", paddingBottom: "22px", paddingLeft: "4px" }}> Information for tax purposes: </td> </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Was the individual born in the United States and held U.S. citizenship?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>Teat Name</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Country of Citizenship of the individual:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>United Kingdom</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Country of Citizenship of the individual:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>India</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Country of birth of the individual:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Is the individual subject to taxation as a U.S. citizen or resident alien?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>{values.countryOfResidence === 257 ? "Yes" : "N/A"}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Is the individual a Permanent Resident Card Holder (Green Card)?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Does the individual hold dual citizenship status?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Does or did the dual citizenship include U.S. citizenship?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Has U.S citizenship been formally renounced?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Date U.S. citizenship was renounced:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Expatriate Documentation attached?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Has the Individual been physically present in the U.S. on at least 31 days during the current calendar year?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>How many days has the Individual been in the U.S. in the current years?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>How many days has the Individual been in the U.S. in the preceding years?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>N/A</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>How many days has the Individual been in the U.S. in the further preceding years?</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>7</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>Effective days calculated for residency in U.S.:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>5</td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%", fontSize: "17px", padding: "2px 6px" }}>As result Individual considered as resident for tax purposes:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>No</td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ paddingTop: "40px" }}>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr style={{ justifyContent: "space-between" }}>
                              <td align="left" style={{ width: "60%", fontSize: "17px" }}>Signed by: </td>
                              <td align="right" style={{ width: "100%", fontSize: "17px", display: "flex", marginTop: "10px" }}>Date:
                                <p style={{ fontSize: "215x", marginLeft: "5px" }}>24-11-2023</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div className="page page5" style={{ height: "29cm", width: "100%", background: "#fff", color: "black", fontFamily: "sans-serif", padding: "70px 30px 30px", boxSizing: "border-box", marginBottom: "4px" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "20px" }} cellPadding={10}>
                  <thead>
                    <tr>
                      <td colSpan={2} style={{ fontSize: "20px", fontWeight: "700", color: "#000", paddingBottom: "22px", paddingLeft: "4px" }}>Additional Information Provided:</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Entity Name:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>Test Name</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Capacity:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>Capacity Not Requested</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Form Filed:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>W-8BEN (Oct 2021)</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "18px", padding: "2px 6px" }}>Date:</td>
                      <td style={{ fontSize: "18px", padding: "2px 6px" }}>03-11-2024</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Electronic Recipient Statement Consent:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>No</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Contact email address:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}><a href={lValues.contactEmail} style={{ color: "#000" }}>TestName@testmail.com</a> </td>
                    </tr>
                    {/* <tr>  
              <td style={{width:"50%",fontSize:"17px"}}>Contact cell number:</td>
              <td style={{width:"50%",fontSize:"17px"}}>  </td> 
            </tr> */}
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Contact cell number:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}></td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Day time contact number:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>{lValues?.primaryContactNumberId} {lValues?.primaryContactNumber}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Signatory email address</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>{values?.signedBy}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>VAT Number Provided: </td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>1234567890</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Forms Exchange Agent (Business Unit)</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>ValueCoders</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Agent Contact Name:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}></td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Agent Telephone Number:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}></td>
                    </tr>

                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Hybrid status:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}>Not Applicable</td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Hybrid status attachment:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}></td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Hybrid status additional information:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}></td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%", fontSize: "17px", padding: "2px 6px" }}>Entity type:</td>
                      <td style={{ fontSize: "17px", padding: "2px 6px" }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>



              <div className="page page6" style={{ height: "29cm", width: "100%", background: "#fff", color: "black", fontFamily: "sans-serif", padding: "70px 30px 30px", boxSizing: "border-box", marginBottom: "4px" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "920px", fontSize: "17px", marginLeft: "0px" }} cellPadding={10} >
                  <thead>
                    <tr>
                      <th
                        colSpan={2}
                        style={{ fontSize: "20px", fontWeight: "700", color: "#000", paddingBottom: "22px", paddingLeft: "4px" }} >

                        Further Information:

                      </th>
                    </tr>
                  </thead>
                </table>
                <table
                  style={{

                    width: "100%",
                    maxWidth: "920px",
                    margin: "20px auto 20px",
                    fontSize: "15px",
                    border: "2px solid #000",
                    marginLeft: "0px"
                  }}

                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          borderRight: "2px solid #000",
                          borderBottom: "2px solid #000",
                          fontSize: "15px",
                          color: "#000",
                          width: "50%",
                          padding: "6px"
                        }}
                      >
                        <strong>

                          No U.S. Source Income Declaration
                        </strong>
                      </td>
                      <td style={{ borderBottom: "2px solid #000", marginLeft: '15px', padding: "6px" }}>Not Applicable</td>
                    </tr>

                  </tbody>

                </table>
                {/* <table
            style={{
             
              width: "100%",
              maxWidth: "920px",
              margin: "20px auto 20px",
              fontSize: "15px",
              border: "2px solid #000",
              marginLeft:"0px"
            }}
           
          >
            <tbody>
              <tr>
                <td
                  style={{
                    borderRight: "2px solid #000",
                    borderBottom: "2px solid #000",
                    fontSize: "15px",
                    color: "#000",
                    width: "50%", padding: "6px"
                  }}
                >
                  <strong>

                  Warning Notification Override issue Number and type:
                  </strong>
                </td>
               
              </tr>
              <tr>
                <td  style={{
                    borderRight: "2px solid #000",
                    borderBottom: "2px solid #000",
                    fontSize: "15px",
                    color: "#000",
                    width: "50%", padding: "6px"
                  }}>
                1.SIG101 - SIGNATURE
                  </td>
              </tr>
             
            </tbody>
           
          </table> */}
              </div>




            </div></View>
        </div>

        <div style={{ padding: "20px 10px" }}>
          <Button
            onClick={handleExportPDF}
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
          <Button onClick={backFunction} variant="contained">Back</Button>

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

export default FormEXP;



