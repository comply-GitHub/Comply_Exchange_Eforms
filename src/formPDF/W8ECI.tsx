import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { Button, Collapse,Typography } from "@mui/material"; 
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { color } from "html2canvas/dist/types/css/types/color";
import moment from "moment";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";
import { getAllCountries, getECIformData } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const FormEXP: React.FC = () => {
  const contentRef:any = useRef(null);
  const dispatch =useDispatch();
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

  const [values, setValues] = useState( {
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
} );
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

useEffect(() => {
   
  dispatch(
    getAllCountries()
  );
  setLValues(JSON.parse(localStorage.getItem("agentDetails") || "{}"));
}, []);

useEffect(() => {
  (dispatch(getECIformData(authDetails?.accountHolderId,(data:any)=>{setValues(data)})))
},[authDetails])

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
    <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        {/* <iframe src={form1}></iframe> */}
        {/* {notView ? (<div ref={pdfRef} dangerouslySetInnerHTML={{__html: form1}} />):""} */}
        <div style={{ paddingBlockStart: "30px" }}></div>
    <div  style={{margin: "0 auto",maxWidth:"960px",width:"100%", padding:"0px", display:"table", boxSizing:"border-box" }}>
     
      <View wrap={false}>
      <div  ref={contentRef} style={{ background:"#fff", color:
      
      "black", fontFamily: "sans-serif", padding:"30px 20px", boxSizing:"border-box"}} >
        <div style={{margin:"10px auto"}}>
          <table style={{ width: "100%", maxWidth: "920px", color:"#000", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th style={{ width: "24%", boxSizing:"border-box", fontSize:"14px", lineHeight:"1.3", borderRight:"2px solid #000", borderBottom:"2px solid #000" }}>
                <p>Form <strong style={{ fontSize: "30px", fontWeight: "700" }}>W-8ECI</strong></p>
                <p style={{ margin: "15px 0" }}>(Rev. October 2021)</p>
                <p>Department of the Treasury Internal Revenue Service</p>
              </th>
              <th style={{padding:"0 15px", boxSizing:"border-box", textAlign:"center" ,width: "52%", fontSize: "14px", lineHeight: "1.3", borderRight: "2px solid #000", borderBottom: "2px solid #000" }}>
                <h1 style={{fontSize:"16px", fontWeight:"bolder"}}>Certificate of Foreign Status of Beneficial Owner for United
                  States Tax Withholding and Reporting (Individuals)</h1>
                <ul style={{ listStyle:"none", fontSize:"14px", lineHeight:"1.5"}}>
                  <li>&#9658; For use by individuals. Entities must use Form W-8BEN-E.</li>
                  <li>&#9658; Go to www.irs.gov/FormW8BEN for instructions and the latest information.</li>
                  <li>&#9658; Give this form to the withholding agent or payer. Do not send to the IRS.</li>
                </ul>
              </th>
              <th style={{ width: "24%", boxSizing:"border-box", fontSize: "18px", fontWeight:"bolder", lineHeight: "1.3", borderBottom: "2px solid #000", padding:"0 0 0 10px"  }}>
                <p style={{fontSize: "17px", textAlign: "left", color: "blue", fontWeight:"400", marginBottom:"15px" }}>UID : {lValues.uniqueIdentifier}</p>
                <h3 style={{ fontSize: "27px", fontWeight:"bolder", lineHeight: "1",}}>Electronic </h3>
                <h3 style={{ fontSize: "27px", fontWeight:"bolder", lineHeight: "1",}}>Substitute  </h3>
                <h4 style={{ lineHeight: "2",}}>Form W-8ECI</h4>
              </th>
             </tr>
          </thead>
          <tr style={{ width: "100%", borderCollapse:"collapse", margin:"10px 0"}}>
          <td colSpan={3} >
               
               
                    <tr style={{ width: "100%", borderCollapse:"collapse", margin:"10px 0"}}>
                        <td style={{textAlign:"start", borderCollapse:"collapse",  padding:"0", textDecorationLine:"underline", textUnderlinePosition:"under"}}><strong>Note:</strong> Persons submitting this form must file an annual U.S. income tax return to report income claimed to be effectively connected with a U.S. trade or business. See instructions. </td>
                       
                    </tr>
                  
                  

            </td>
          </tr>
          <tbody>
            <tr>
              <td colSpan={3}>
                <table style={{ width: "100%", borderCollapse:"collapse", margin:"10px 0"}}>
                  <tbody>
                    <tr>
                        <td style={{textAlign:"start", padding:"0", fontWeight:"bold"}}>Do NOT use this form if: </td>
                        <td style={{textAlign:"end", padding:"0", fontWeight:"bold"}}>Instead, use Form: </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <ul style={{ width:"100%", padding:"0 0 0 16px", marginTop:"15px"}}>
                          <li style={{marginBottom:"6px"}}>A beneficial owner solely claiming foreign status or treaty benefits. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . W8BEN or W8BEN-E </li>
                          <li style={{marginBottom:"6px"}}>A foreign government, international organization, foreign central bank of issue, foreign tax-exempt organization, foreign private
foundation, or government of a U.S. possession claiming the applicability of section(s) 115(2), 501(c), 892, 895, or 1443(b). . . . . . . . . . W8-EXP</li>
<h6><strong>Note:</strong> These entities should use Form W-8ECI if they received effectively connected income and are not eligible to claim an exemption for chapter 3 
or 4 purposes on Form W-8EXP.</h6>

                          <li style={{marginBottom:"6px"}}>A foreign partnership or a foreign trust (unless claiming an exemption from U.S. withholding on income effectively connected with the
conduct of a trade or business in the United States). . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . <span style={{ textAlign: "end" }}> W-8BEN-E or W-8IMY</span></li>
                          <li>You are a person acting as an intermediary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8IMY </li>
                          <h6 style={{marginTop:"6px"}}><strong>Note:</strong> See instructions for additional exceptions.</h6>
                        </ul>
                      </td>
                    </tr>
                  
                    
                  </tbody>
                  
                </table>
                <table style={{ width:"100%", borderCollapse:"collapse",}} cellPadding={0}>
                  <thead>
                    <tr>
                      <td style={{background:"#000", color:"#fff", fontWeight:"bold", width:"120px", border: "1px solid #000", padding:"5px 10px", textAlign:"center"}}>Part I </td>
                      <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "5px 10px" }}>
                        <strong>Identification of Beneficial Owner</strong>(see instructions) </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{padding:"0"}}>
                        <table style={{ borderCollapse: "collapse", width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%", borderRight:"1px solid #000" }}>
                                1. Name of individual who is the beneficial owner
                              <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>{values.businessName} </p>
                              </td>
                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%" }}>
                                2. Country of citizenship
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>  {getCountries(
                                            values.countryOfIncorporation
                                          )}</p>
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
                                      <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> {lValues?.firstName}{" "}{lValues?.lastName}</p>
                                    </td>
                                  </tr>
                                  <tr>
    <td colSpan={4} style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
        <div style={{ width: "20px", marginRight: "10px", float: "left" }}>4.</div>
        <div style={{ width: "calc(100% - 30px)", float: "left" }}>
            Type of entity (check the appropriate box):
           <div style={{display:"flex" , width:"100%",marginTop:"10px"}}>
           <div style={{ display: "flex", flexDirection: "column" ,width:"40%"}}>
               <div  style={{ display: "flex", }}> 
               <input type="checkbox" className="mx-2" checked={false}/>
                <label style={{fontSize:"14px"}}>Partnership</label>
               
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false}/>
                <label style={{fontSize:"14px"}}>Foreign Government - Controlled Entity</label>
               
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false }/>
                <label style={{fontSize:"14px"}}>Foreign Government - Integral Part</label>
                
                </div>
                <div  style={{ display: "flex", }}>
                <input type="checkbox" className="mx-2" checked={false }/> 
                <label style={{fontSize:"14px"}}>Private foundation</label>
               
                </div>
               
            </div>
            <div style={{ width:"30%",display: "flex", flexDirection: "column",marginLeft:"20px" }}>
            <div  style={{ display: "flex", }}> 
            <input type="checkbox" className="mx-2" checked={false }/>
                <label style={{fontSize:"14px"}}>Simple trust</label>
                
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false }/>
                <label style={{fontSize:"14px"}}>Grantor trust</label>
                
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false }/>
                <label style={{fontSize:"14px"}}>International organization</label>
                
                </div>
                <div  style={{ display: "flex", }}>
                <input type="checkbox" className="mx-2" checked={true} /> 
                <label style={{fontSize:"14px"}}>Individual</label>
                
                </div>
               
            </div>
            <div style={{ display: "flex",width:"25%", flexDirection: "column",marginLeft:"20px" }}>
            <div  style={{ display: "flex", }}> 
            <input type="checkbox" className="mx-2" checked={false }/>
                <label style={{fontSize:"14px"}}>Complex trust</label>
               
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false} />
                <label style={{fontSize:"14px"}}>Central bank of issue</label>
               
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false} />
                <label style={{fontSize:"14px"}}>Corporation</label>
               
                </div>
                <div  style={{ display: "flex", }}> 
                <input type="checkbox" className="mx-2" checked={false} />
                <label style={{fontSize:"14px"}}>Estate</label>
                
                </div>
               
            </div>
            <div style={{ display: "flex",width:"21%", flexDirection: "column" ,marginLeft:"20px"}}>
            <div  style={{ display: "flex", }}> 
            <input type="checkbox" className="mx-2" checked={false} />
                <label style={{fontSize:"14px"}}>Tax-exempt organization</label>
                
                </div>
               
               
            </div>
           </div>
        </div>
    </td>
</tr>

                            <tr>
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                5. Permanent residence address (street, apt. or suite no., or rural route). <strong>Do not use a P.O. box or in-care-of address.</strong>
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>{lValues?.permanentResidentialStreetNumberandName}{" "}{lValues?.permanentResidentialAptSuite}</p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight:"1px solid #000" }}>
                                      City or town, state or province. Include postal code where appropriate.
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> {lValues.permanentResidentialCityorTown}{" "}{lValues.permanentResidentialStateorProvince}{" "}{lValues.permanentResidentialZipPostalCode}</p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "30%" }}>
                                        Country
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>
                                            {getCountries(lValues.permanentResidentialCountryId)}
                                          </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                             6. Business address in the United States (street, apt. or suite no., or rural route). <strong>Do not use a P.O. box or in-care-of address.</strong>
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> {lValues?.permanentResidentialStreetNumberandName1}{" "}{lValues?.permanentResidentialAptSuite1}</p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight:"1px solid #000" }}>
                                      City or town, state, and ZIP code
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>  {lValues.permanentResidentialCityorTown}{" "}{lValues.permanentResidentialStateorProvince1}{" "}{lValues.permanentResidentialZipPostalCode1}</p>
                                      </td>
                                     
                                    </tr>
                            <tr >
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                7. U.S. taxpayer identification number (required—see instructions) <td>
                                  <div style={{display:"flex"}}>
                                    <div style={{display:"flex"}}> 
                                      <input className="mx-1" type="checkbox" checked={values?.eciUsTinTypeId==1}/>
                                      SSN or ITIN
                                    </div>
                                    <div style={{display:"flex",marginLeft:"15px"}}> 
                                      <input className="mx-1" type="checkbox" checked={values?.eciUsTinTypeId==2}/>
                                      EIN
                                    </div>
{" "}{values.eciUsTin}
                                  </div>
                                </td>
                               
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
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%", borderRight:"1px solid #000" }}>
                                      8a. &nbsp; Foreign tax identifying number (FTIN)
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>{values.foreignTIN}</p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%" }}>
                                       8b. &nbsp; Check if FTIN not legally required . . . . . . . . . . . <input type="checkbox" name="" id="" checked={lValues.foreignTINNotAvailable}/>
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> </p>
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
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%", borderRight:"1px solid #000" }}>
                                      9. Reference number(s) (see instructions) 
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4", textAlign:"center"}}>VAT : 7678676 </p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%"}}>
                                     10. Date of birth (MM-DD-YYYY) (see instructions)
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4", textAlign:"center"}}>{lValues?.dob ? moment(lValues?.dob).format("MM-DD-YYYY") : moment(values.date).format("MM-DD-YYYY")}  </p>
                                      </td>
                                    </tr>
                                    <tr>
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                11. Specify each item of income that is, or is expected to be, received from the payer that is effectively connected with the conduct of a trade or
business in the United States (attach statement if necessary).
                                <input type="text" name="" id="" value="Armenia" style={{ minWidth:"100%", maxWidth:"100%", width:"100%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }}/>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                12. Check here to certify that: you are a dealer in securities (as defined in section 475(c)(1)); you are a transferor of an interest in a publicly traded partnership
(PTP) claiming an exception from withholding under Regulations section 1.1446(f)-4(b)(6); and any gain from the transfer of the PTP interest associated
with this form is effectively connected with the conduct of a trade or business within the United States without regard to section 864(c)(8). . . . . . . . . . . . . .   
                                <input type="checkbox"  name="" id="" style={{borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", marginTop:"5px" }}/>
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
               
                <table style={{ width:"100%", borderCollapse:"collapse", marginTop:"10px"}} cellPadding={0}>
                  <thead>
                    <tr>
                      <td style={{background:"#000", color:"#fff", fontWeight:"bold", width:"120px", border: "1px solid #000", padding:"5px 10px", textAlign:"center"}}>Part II </td>
                      <td style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", padding: "5px 10px" }}>
                        <strong>Certification</strong> </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{ padding:"5px 0"}}>Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:</td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ padding:"10px 0"}}>
                        <ul style={{ listStyle:"disc", paddingLeft:"16px"}}>
                            <li> I am the beneficial owner (or I am authorized to sign for the beneficial owner) of all the payments to which this form relates,
                      </li>
                        <li>The amounts for which this certification is provided are effectively connected with the conduct of a trade or business in the United States</li>
                       
                        <li> The income for which this form was provided is includible in my gross income (or the beneficial owner’s gross income) for the taxable year, <strong>and</strong></li>
                        <li>The beneficial owner is not a U.S. person</li>
                        </ul>
                        <h6>Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the payments of which I am the 
beneficial owner or any withholding agent that can disburse or make payments of the amounts of which I am the beneficial owner.</h6>
                        <strong>I agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect. </strong>
                      </td> 
                    </tr>
                     <tr>
                      <td colSpan={2}>
                      <h4 style={{ color:"blue"}}>W-8ECI – Electronic Substitute Form Statement</h4>
                      </td>
                     </tr>
                     <tr>
                     <td colSpan={2} style={{color:"blue"}}>
                      The Internal Revenue Service does not require your consent to any provisions of this document other than the certifications required to establish your status as a non-U.S. person and, if applicable, obtain
a reduced rate of withholding.
                      </td>
                     </tr>
                     <tr>
                      <td colSpan={2} style={{ padding:"10px 0"}}>
                      <input type="checkbox" name="" style={{ background:"#fff", border:"1px solid #000", marginRight:"10px"}}  /> <strong>I certify that I have the capacity to sign for the person identified on line 1 of this form.</strong>
                      </td>
                     </tr>
                     <tr>
                      <td colSpan={2}>
                        <table style={{borderCollapse:"collapse", width:"100%"}}>
                          <tbody>
                            <tr>
                              <td style={{fontSize:"22px", fontWeight:"bold", maxWidth:"20%"}}>Sign Here</td>
                              <td style={{ width:"80%"}}>
                                <table style={{borderCollapse:"collapse", width:"100%",}} cellSpacing="10">
                                  <tbody>
                                    <tr>
                                      <td style={{width:"70%",  padding:"0 10px", color:"blue", verticalAlign:"bottom"}}>
                                      <div style={{ display:"table",borderBottom:"1px solid #000", width:"100%"}}>
                                      <span style={{display:"table-cell",textAlign:"left", width:"50%"}}>Date : {moment(values.date).format("DD-MM-YYYY hh-mm-ss A")} </span>
                                      <span  style={{display:"table-cell",textAlign:"right", width:"50%"}}> ESC : YSCML</span>
                                      </div>
                                      </td>
                                      <td style={{width:"30%", borderBottom:"1px solid #000", color:"blue"}}>{moment().format("DD-MM-YYYY")}</td>
                                      
                                    </tr>
                                    <tr>
                                      <td style={{width:"70%",color:"#000", textAlign:"center"}}>
                                      Signature of beneficial owner (or individual authorized to sign for beneficial owner)
                                      </td>
                                      <td style={{width:"30%",color:"#000", textAlign:"center"}}> 
                                      Date 
                                      (MM-DD-YYYY)
                                      </td>
                                    </tr>
                                   
                                   
                                  
                                    <tr>
                                      <td colSpan={2} style={{fontSize:"16px", color:"blue", borderBottom:"1px solid #000"}}>{values.signedBy}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2} style={{fontSize:"16px", color:"#000"}}>Print name of signer</td>
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
              <td style={{padding:"10px 0", borderTop:"2px solid #000"}} colSpan={3}>
                <table style={{width:"100%", borderCollapse:"collapse"}}>
                    <tbody>
                      <tr>
                        <td style={{width:"50%", fontSize:"15px"}}>
                          <strong>For Paperwork Reduction Act Notice, see separate instructions.</strong>
                        </td>
                        <td style={{width:"20%", textAlign:"center"}}>
                        Cat. No. 25047Z
                        </td>
                        <td style={{width:"30%", textAlign:"end"}}>
                        Form <span style={{fontSize:"20px", fontWeight:"bold"}}>W-8BEN</span> (Rev. 10-2021)
                        </td>
                      </tr>
                      <tr>
                        <td style={{width:"50%", color:"blue"}}>
                        Electronic Submission Confirmation: {values.yourConfirmationCode}
                        </td>
                        <td style={{width:"20%", textAlign:"center"}}>
                        Email Address :
                        </td>
                        <td style={{width:"30%", color:"blue"}}>
                         <a style={{marginLeft:"43px"}} href={lValues.contactEmail}>{lValues.contactEmail}</a>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </td>
            </tr>
          </tfoot>
          </table>

          <table style={{borderCollapse:"collapse", width:"100%", margin:"40px auto", fontSize:"20px"}} cellPadding={10}>
            <thead>
              <tr>
                <td colSpan={2} style={{ fontSize:"30px",fontWeight:"600", color:"#000", paddingBottom:"4px"}}> United States Citizenship Test Results </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ fontSize:"25px",fontWeight:"700", color:"#000", paddingBottom:"5px"}}> Information for tax purposes: </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Was the individual born in the United States and held U.S. citizenship?</td>
                <td style={{fontSize:"17px"}}>{values.isUSCitizen}</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Country of Citizenship of the individual:</td>
                <td style={{fontSize:"17px"}}>{getCountries(values.countryOfResidence)}</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Country of Citizenship of the individual:</td>
                <td style={{fontSize:"17px"}}>{getCountries(values.countryOfIncorporation)}</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Country of birth of the individual:</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Is the individual subject to taxation as a U.S. citizen or resident alien?</td>
                <td style={{fontSize:"17px"}}>{values.countryOfResidence===257 ? "Yes" : "N/A"}</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Is the individual a Permanent Resident Card Holder (Green Card)?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Does the individual hold dual citizenship status?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Does or did the dual citizenship include U.S. citizenship?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Has U.S citizenship been formally renounced?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Date U.S. citizenship was renounced:</td>
                <td style={{fontSize:"17px"}} >N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Expatriate Documentation attached?</td>
                <td style={{fontSize:"17px"}} >N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Has the Individual been physically present in the U.S. on at least 31 days
during the current calendar year?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>How many days has the Individual been in the U.S. in the current years?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>How many days has the Individual been in the U.S. in the preceding years?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>How many days has the Individual been in the U.S. in the further preceding years?</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>Effective days calculated for residency in U.S.:</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%",fontSize:"17px"}}>As result Individual considered as resident for tax purposes:</td>
                <td style={{fontSize:"17px"}}>N/A</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ paddingTop:"40px"}}>
                  <table style={{width:"100%"}}>
                    <tbody>
                      <tr style={{justifyContent:"space-between"}}>  
                        <td align="left" style={{width:"75%",fontSize:"20px"}}>Signed by: </td>
                        <td align="right" style={{width:"100%",fontSize:"20px",display:"flex",marginTop:"10px"}}>Date: 
                        <p style={{color:"blue",fontSize:"20px",marginLeft:"5px"}}>24-11-2023</p>
                        </td> 
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{borderCollapse:"collapse", width:"100%", margin:"40px auto", fontSize:"20px"}} cellPadding={10}>
            <thead>
              <tr>
                <td colSpan={2} style={{ fontSize:"30px", fontWeight:"bold", paddingBottom:"20px"}}>Additional Information Provided:</td>
              </tr>
            </thead>
            <tbody>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Entity Name:</td>
                <td style={{width:"50%",fontSize:"17px"}}>{values?.businessName}</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Capacity:</td>
                <td style={{width:"50%",fontSize:"17px"}}>{values?.isCapacityForm? "Yes" : "No"}</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Form Filed:</td>
                <td style={{width:"50%",fontSize:"17px"}}>W-8BEN (Oct 2021)</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Date:</td>
                <td style={{width:"50%",fontSize:"17px"}}>{moment(values?.date).format('MM-DD-YYYY')}</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Electronic Recipient Statement Consent:</td>
                <td style={{width:"50%",fontSize:"17px"}}>{values?.isConsentRecipent ? "yes":"No"}</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Contact email address:</td>
                <td style={{width:"50%",fontSize:"17px"}}> <a href={lValues.contactEmail} style={{ color:"#000"}}>{lValues.contactEmail}</a> </td> 
              </tr>
              {/* <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Contact cell number:</td>
                <td style={{width:"50%",fontSize:"17px"}}>  </td> 
              </tr> */}
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Day time contact number:</td>
                <td style={{width:"50%",fontSize:"17px"}}>{lValues?.primaryContactNumberId} {lValues?.primaryContactNumber}</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Signatory email address</td>
                <td style={{width:"50%",fontSize:"17px"}}>{values?.signedBy}</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Forms Exchange Agent (Business Unit)</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Agent Contact Name:</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Agent Telephone Number:</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Agent Email Address:</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Hybrid status:</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Hybrid status attachment:</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Hybrid status additional information:</td>
                <td style={{width:"50%",fontSize:"17px"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%",fontSize:"17px"}}>Entity type:</td>
                <td style={{width:"50%",fontSize:"17px"}}>{values.eciUsTinTypeId}</td> 
              </tr>
            </tbody>
          </table>
          
          <table style={{borderCollapse:"collapse", width:"100%", margin:"40px auto"}}>
            <thead>
              <tr>
                <td colSpan={4} style={{ fontSize:"32px",fontWeight:"bold", color:"#000", paddingBottom:"20px"}}> Tax Jurisdictions </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>
                  <table style={{borderCollapse:"collapse", width:"100%", fontSize:"18px"}} cellPadding={10}>
                    <thead>
                      <tr>
                        
                        <td style={{border:"2px solid #000", textAlign:"center", fontWeight:"bold"}}>Country</td>
                        <td style={{border:"2px solid #000", textAlign:"center", fontWeight:"bold"}}>TIN Type </td>
                        <td style={{border:"2px solid #000", textAlign:"center", fontWeight:"bold"}}>Tax Identification</td>
                        <td style={{border:"2px solid #000", textAlign:"center", fontWeight:"bold"}}>TIN Unavailable</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{border:"2px solid #000"}}>United States</td>
                        <td style={{border:"2px solid #000"}}>Foreign</td>
                        <td style={{border:"2px solid #000"}}>243543</td>
                        <td style={{border:"2px solid #000"}}>False</td>
                      </tr>
                      <tr>
                        <td style={{border:"2px solid #000"}}>Antarctica</td>
                        <td style={{border:"2px solid #000"}}>Foreign</td>
                        <td style={{border:"2px solid #000"}}>6856383</td>
                        <td style={{border:"2px solid #000"}}>False</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "40px auto 0px",
                fontSize: "17px",
              }}
              cellPadding={10}
            >
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      paddingBottom: "20px",
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
                fontSize: "17px",
                border: "2px solid #000",
              }}
             
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      borderRight: "2px solid #000",
                      borderBottom: "2px solid #000",
                      fontSize: "20px",
                      color: "#000",
                      width: "50%",
                    }}
                  >
                    <strong>

                    No U.S. Source Income Declaration
                    </strong>
                  </td>
                  <td style={{ borderBottom: "2px solid #000",marginLeft:'15px' }}>Not Applicable</td>
                </tr>
               
              </tbody>
             
            </table>
            <table
              style={{
               
                width: "100%",
                maxWidth: "920px",
                margin: "20px auto 20px",
                fontSize: "17px",
                border: "2px solid #000",
              }}
             
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      borderRight: "2px solid #000",
                      borderBottom: "2px solid #000",
                      fontSize: "20px",
                      color: "#000",
                      width: "50%",
                    }}
                  >
                    <strong>

                    Warning Notification Override issue Number and type:
                    </strong>
                  </td>
                 
                </tr>
                <tr>
                  <td>
                  1.SIG101 - SIGNATURE
                    </td>
                </tr>
               
              </tbody>
             
            </table>
        </div>
      </div> 
      </View>
      {/* <div style={{ paddingTop: "20px" }}>
        <Button onClick={downloadPDF} variant="contained">Download PDF</Button>
      </div> */}
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
        <Button onClick={backFunction} variant="contained">Back</Button>
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

export default FormEXP;



       