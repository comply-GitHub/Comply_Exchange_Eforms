import React, { useEffect, useRef,useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf, Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { Button, Collapse,Typography } from "@mui/material";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { useDispatch } from "react-redux";
import { formPDFField, getAllCountries } from "../Redux/Actions";
import moment from "moment";
import { useNavigate } from "react-router";
const W9: React.FC = () => {
  const dispatch =useDispatch();
  const history = useNavigate();
  const [values,setValues] = useState(
 
      {
        agentId: 3,
        businessTypeId: 1,
        selectedEntity: false,
        isUSEntity: false,
        isUSIndividual: false,
        uniqueIdentifier: "",
        firstName: "",
        lastName: "",
        businessName:"",
        countryOfCitizenshipId: 257,
        dob: "",
        nameOfDisregarded:"" ,
        entityName:"" ,
        taxpayerIdTypeID: 0,
        usTin: "",
        foreignTINCountryId: 0,
        foreignTIN: "",
        foreignTINNotAvailable: false,
        alternativeTINFormat: false,
        giin:"" ,
        permanentResidentialCountryId: 0,
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
        permanentResidentialStreetNumberandName1:"" ,
        permanentResidentialAptSuite1:"" ,
        permanentResidentialCityorTown1:"" ,
        permanentResidentialStateorProvince1:"" ,
        permanentResidentialZipPostalCode1:"" ,
        contactFirstName: "",
        contactLastName: "",
        contactEmail: "",
        primaryContactNumberId: 0,
        primaryContactNumber:"" ,
        alternativeNumberId: 0,
        alternativeNumber:"" ,
        alternativeNumberId1: 0,
        alternativeNumber1:"" ,
        incomeTypeId: [
            0
        ],
        paymentTypeId: 0,
        accountHolderName: "",
        accountBankName:"" ,
        accountBankBranchLocationId: 0,
        accountNumber:"" ,
        abaRouting:"" ,
        iban:"" ,
        swiftCode:"" ,
        bankCode:"" ,
        makePayable:"" ,
        payResidentalCountryId: 0,
        payStreetNumberAndName:"" ,
        payAptSuite:"" ,
        vatId: 0,
        vat: "",
        doingBusinessAsName:"" ,
        payCityorTown:"" ,
        payStateOrProvince:"" ,
        payZipPostalCode:"" ,
        sortCode:"" ,
        bsb:"" ,
        capacityId: 0,
        isCorrectPaymentPurposes: false,
        isConfirmed: false,
        usTinTypeId: 0,
        permanentresidentialzippostalcode: "",
        EnterconfirmationCode:"",
    
  }
  );
  const contentRef = useRef<HTMLDivElement>(null);

  function getFieldValues(arrayOfObjects:any) {
    setValues(arrayOfObjects.map((obj:any) => obj.fieldValue));
  }

  useEffect(() => {
    setValues(JSON.parse(localStorage.getItem("agentDetails")|| "{}"))
    // dispatch(formPDFField(2, (data:any) => getFieldValues(data)));
  }, []);


  const getCountries=(countryId:any)=>{
    var countryArray:any=[];
    dispatch(getAllCountries((data:any)=>{countryArray=data}));
    const foundCountry = countryArray.find((country:any) => country.id === countryId);
    console.log(countryArray,foundCountry,"yewadu")
    return foundCountry ? foundCountry.name : "";
  }

  const backFunction = () => {
    history(-1);
  };

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm");
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas: any) => {
        const imgWidth = 188;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        doc.addImage(
          canvas,
          "PNG",
          10,
          position,
          imgWidth,
          doc.internal.pageSize.height,
          "",
          "FAST"
        );
        while (heightLeft >= 0) {
          position = heightLeft - doc.internal.pageSize.height;
          doc.addPage();
          // doc.addImage(canvas, 'PNG', 10, position, imgWidth, doc.internal.pageSize.height, '', 'FAST');
          heightLeft -= pageHeight;
        }
        doc.save("Downld.pdf");
      });
    }
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
      <div
        style={{
          // contentVisibility: "hidden",
          margin: "0 auto",
          maxWidth: "960px",
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
              padding: "30px 20px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ margin: "10px auto" }}>
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
                        width: "24%",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        lineHeight: "1.3",
                        borderRight: "2px solid #000",
                        borderBottom: "2px solid #000",
                      }}
                    >
                      <p>
                        Form{" "}
                        <strong style={{ fontSize: "30px", fontWeight: "700" }}>
                          W-9
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
                        width: "59%",
                        fontSize: "14px",
                        lineHeight: "1.3",
                        borderRight: "2px solid #000",
                        borderBottom: "2px solid #000",
                      }}
                    >
                      <h1 style={{ fontSize: "25px", fontWeight: "bolder" }}>
                      Request for Taxpayer 
Identification Number and Certification
                      </h1>
                      <ul
                        style={{
                          listStyle: "none",
                          fontSize: "16px",
                          lineHeight: "1.5",
                          marginTop:"20px",
                          left:"0"
                        }}
                      >
                       
                       
                          &#9658; Go to www.irs.gov/FormW9 for instructions
                          and the latest information.
                      
                       
                      </ul>
                    </th>
                    <th
                      style={{
                        width: "24%",
                        boxSizing: "border-box",
                        fontSize: "18px",
                        fontWeight: "bolder",
                        lineHeight: "1.3",
                        borderBottom: "2px solid #000",
                        padding: "0 0 0 10px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          textAlign: "left",
                          color: "blue",
                          fontWeight: "400",
                          marginBottom: "15px",
                        }}
                      >
                        UID : {values.uniqueIdentifier}
                      </p>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "bolder",
                          lineHeight: "1",
                        }}
                      >
                       Give Form to the 
requester. Do not 
send to the IRS.
                      </h3>
                     
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
                      
                        </tbody>
                      </table>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                        cellPadding={0}
                      >
                       
                        <tbody>
                          <tr>
                            <td  style={{ padding: "0" }}>
                              <table
                                style={{
                                 
                                  width: "100%",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                        width: "50%",
                                        
                                      }}
                                    >
                                      1. Name (as shown on your income tax return). Name is required on this line; do not leave this line blank.
                                      <p
                                        style={{
                                          color: "#82b1ff",
                                          width: "100%",
                                          margin: "6px 0 0",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                       {values?.isUSEntity ? values?.businessName : values.firstName +" " + values.lastName} 
                                        
                                      </p>
                                    </td>
                                   
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        borderBottom: "1px solid #000",
                                        padding: "5px 10px",
                                        width: "50%",
                                        
                                      }}
                                    >
                                      2. Business name/disregarded entity name, if different from above
                                      <p
                                        style={{
                                          color: "#82b1ff",
                                          width: "100%",
                                          margin: "6px 0 0",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                       {values?.isUSEntity ? values?.businessName : values.firstName +" " + values.lastName} 
                                        
                                      </p>
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
                                             3. Check appropriate box for federal tax classification of the person whose name is entered on line 1. Check only 
<strong> one of the following seven boxes.</strong>
                                             <div style={{display:"flex",marginLeft:"10px",marginTop:"10px"}}>
                                              <div style={{display:"flex"}}>
                                                <input type="checkbox" className="mx-2"/>
                                                Individual/sole proprietor or 
single-member LLC

                                              </div>
                                              <div style={{display:"flex"}} className="mx-2">
                                                <input type="checkbox" className="mx-2"/>
                                                C Corporation

                                              </div>
                                             

                                             </div>
                                             <div style={{display:"flex",marginTop:"10px"}}>
                                             <div style={{display:"flex"}} className="mx-2">
                                                <input type="checkbox" className="mx-2"/>
                                                S Corporation

                                              </div>
                                              <div style={{display:"flex"}}>
                                                <input type="checkbox" className="mx-2"/>
                                                Partnership

                                              </div>
                                              <div style={{display:"flex"}} className="mx-2">
                                                <input type="checkbox" className="mx-2"/>
                                                Trust/estate

                                              </div>
                                             </div>
                                             <div style={{display:"flex",marginTop:"10px"}}>
                                             <div style={{display:"flex"}} className="mx-2">
                                                <input type="checkbox" className="mx-2"/>
                                                Limited liability company. Enter the tax classification (C=C corporation, S=S corporation, P=Partnership) ▶
                                                


                                              </div>
                                             </div>
                                             <h6 style={{marginLeft:"20px"}}>
                                             Note: Check the appropriate box in the line above for the tax classification of the single-member owner. Do not 
check LLC if the LLC is classified as a single-member LLC that is disregarded from the owner unless the owner of the 
LLC is another LLC that is not disregarded from the owner for U.S. federal tax purposes. Otherwise, a single-member 
LLC that is disregarded from the owner should check the appropriate box for the tax classification of its owner.
                                             </h6>
                                             <div style={{display:"flex",marginTop:"10px"}}>
                                             <div style={{display:"flex"}} className="mx-2">
                                                <input type="checkbox" className="mx-2"/>
                                                Other (see instructions) ▶

                                              </div>
                                             </div>
                                            </td>
                                            <td colSpan={2}
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "30%",
                                              }}
                                            >
                                            4 Exemptions (codes apply only to 
certain entities, not individuals; see 
instructions on page 3):
<div className="mt-3" style={{display:"flex"}}>
                                            Exempt payee code (if any)
                                            <input type="text" name="" id="" value="Armenia" style={{width:"60%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }}/>
                                            </div>
                                            <div className="mt-3" style={{display:"flex",}}>
                                           <h6 >
                                           Exemption from FATCA reporting code (if any)
                                           </h6>

                                            <input type="text" name="" id="" value="Armenia" style={{width:"60%",borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }}/>
                                            </div>
                                           <p className="mt-5" style={{fontSize:"12px"}}> (Applies to accounts maintained outside the U.S.)</p>
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
                                                borderRight: "1px solid #000",
                                              }}
                                            >
                                            <strong>5.</strong> Address (number, street, and apt. or suite no.) See instructions.
                                              <p
                                                style={{
                                                  color: "#82b1ff",
                                                  width: "100%",
                                                  margin: "6px 0 0",
                                                  lineHeight: "1.4",
                                                }}
                                              >
                                                {values.permanentResidentialCityorTown}
                                              </p>
                                            </td>
                                            <td
                                              style={{
                                               
                                                padding: "5px 10px",
                                                width: "30%",
                                              }}
                                            >Requester’s name and address (optional)  Country
                                              <p
                                                style={{
                                                  color: "#82b1ff",
                                                  width: "100%",
                                                  margin: "6px 0 0",
                                                  lineHeight: "1.4",
                                                }}
                                              >
                                                {" "}
                                                United States
                                              </p>
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
                                                borderRight: "1px solid #000",
                                              }}
                                            >
                                            <strong>6.</strong> City, state, and ZIP code
                                              <p
                                                style={{
                                                  color: "#82b1ff",
                                                  width: "100%",
                                                  margin: "6px 0 0",
                                                  lineHeight: "1.4",
                                                }}
                                              >
                                                {values.permanentResidentialCityorTown}
                                              </p>
                                            </td>
                                            <td
                                              style={{
                                                borderBottom: "1px solid #000",
                                                padding: "5px 10px",
                                                width: "30%",
                                              }}
                                            >
                                              
                                              <p
                                                style={{
                                                  color: "#82b1ff",
                                                  width: "100%",
                                                  margin: "6px 0 0",
                                                  lineHeight: "1.4",
                                                }}
                                              >
                                                {" "}
                                               
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{
                                        
                                        padding: "5px 10px",
                                      }}
                                    >
                                    <strong>7.</strong> List account number(s) here (optional)
                                      <p
                                        style={{
                                          color: "#82b1ff",
                                          width: "100%",
                                          margin: "6px 0 0",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                        {" "}
                                        United States
                                      </p>
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
                              Part I{" "}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000",
                                borderBottom: "1px solid #000",
                                padding: "5px 10px",
                              }}
                            >
                              <strong>Taxpayer Identification Number (TIN)</strong>
                              
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                            Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to 
avoid backup withholding. For individuals, this is generally your social security number (SSN). 
However, for a resident alien, sole proprietor, or disregarded entity, see the instructions for Part I, 
later. For other entities, it is your employer identification number (EIN). If you do not have a number, 
see How to get a TIN, later.
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 10px" }}>
                           <strong> Note:</strong> If the account is in more than one name, see the instructions for line 1. Also see What Name 
and Number To Give the Requester for guidelines on whose number to enter.
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
                              <strong>Certification</strong>{" "}
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2} style={{ padding: "5px 0" }}>
                              Under penalties of perjury, I certify that:
                             
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2} style={{ padding: "10px 0" }}>
                             
                                <h6>
                                1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and
                                </h6>
                                <h6>
                                2. I am not subject to backup withholding because: <h6 style={{textDecorationLine:"line-through"}}>(a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue
Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I
am no longer subject to backup withholding;</h6>and
                                </h6>
                                <h6>
                                3. I am a U.S. citizen or other U.S. person (defined below); and
                                </h6>
                               <h6>
                               4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct
                               </h6>
                           <h6> <strong>Certification instructions.</strong>
                            You must cross out item 2 above if you have been notified by the IRS that you are currently subject to backup withholding 
because you have failed to report all interest and dividends on your tax return. For real estate transactions, item 2 does not apply. For mortgage interest 
paid, acquisition or abandonment of secured property, cancellation of debt, contributions to an individual retirement arrangement (IRA), and generally, 
payments other than interest and dividends, you are not required to sign the certification, but you must provide your correct TIN. See the instructions for 
Part II, later.
                            </h6>
                            <h6 style={{color:"blue"}}>
                            The Internal Revenue Service does not require your consent to any provisions of this document other than the certifications required to avoid backup withholding.
                              </h6>
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
                                        width:"17%",
                                        fontSize: "22px",
                                        fontWeight: "bold",
                                        maxWidth: "6%",
                                      }}
                                    >
                                      Sign Here
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
                            <td style={{ width: "50%", fontSize: "30px" }}>
                              <strong>
                                General Instructions
                              </strong>
                            </td>
                            <td style={{ width: "20%", textAlign: "center" }}>
                              Cat. No. 25047Z
                            </td>
                            <td style={{ width: "30%", textAlign: "end" }}>
                              Form{" "}
                              <span
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              >
                                W-9
                              </span>{" "}
                              (Rev. 10-2021)
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "50%",fontSize:"21px" }}>
                            Section references are to the Internal Revenue Code unless otherwise 
noted.
<h5>
  <strong>Future developments.</strong> For the latest information about developments 
related to Form W-9 and its instructions, such as legislation enacted 
after they were published, go to www.irs.gov/FormW9.

</h5>
<strong style={{fontSize:"30px"}}>
Purpose of Form
</strong>
<h5>
An individual or entity (Form W-9 requester) who is required to file an 
information return with the IRS must obtain your correct taxpayer 
identification number (TIN) which may be your social security number 
(SSN), individual taxpayer identification number (ITIN), adoption 
taxpayer identification number (ATIN), or employer identification 
number (EIN), to report on an information return the amount paid to 
you, or other amount reportable on an information return. Examples of 
information returns include, but are not limited to, the following.
</h5>

  <li>
   Form 1099-INT (interest earned or paid)
  </li>

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
                              <a href={values.contactEmail}>
                                {values.contactEmail}
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
                }}
              >
                <thead>
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#000",
                        paddingBottom: "20px",
                      }}
                    >
                      {" "}
                      Tax Jurisdictions{" "}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                          fontSize: "18px",
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
                              Country
                            </td>
                            <td
                              style={{
                                border: "2px solid #000",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              TIN Type{" "}
                            </td>
                            <td
                              style={{
                                border: "2px solid #000",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              Tax Identification
                            </td>
                            <td
                              style={{
                                border: "2px solid #000",
                                textAlign: "center",
                                fontWeight: "bold",
                              }}
                            >
                              TIN Unavailable
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
                            <td style={{ border: "2px solid #000" }}>243543</td>
                            <td style={{ border: "2px solid #000" }}>False</td>
                          </tr>
                          <tr>
                            <td style={{ border: "2px solid #000" }}>
                              Antarctica
                            </td>
                            <td style={{ border: "2px solid #000" }}>
                              Foreign
                            </td>
                            <td style={{ border: "2px solid #000" }}>
                              6856383
                            </td>
                            <td style={{ border: "2px solid #000" }}>False</td>
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
                  margin: "40px auto",
                  fontSize: "20px",
                }}
                cellPadding={10}
              >
                <thead>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: "38px",
                        fontWeight: "500",
                        color: "#000",
                        paddingBottom: "0px",
                      }}
                    >
                      {" "}
                      United States Citizenship Test Results{" "}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: "30px",
                        fontWeight: "700",
                        color: "#000",
                        paddingBottom: "5px",
                      }}
                    >
                      {" "}
                      Information for tax purposes:{" "}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Was the individual born in the United States and held U.S.
                      citizenship?
                    </td>
                    <td>{values?.isUSIndividual ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Country of Citizenship of the individual:
                    </td>
                    <td>{getCountries(values.countryOfCitizenshipId)}</td>
                  </tr>
                  {/* <tr>
                    <td style={{ width: "80%" }}>
                      Country of Citizenship of the individual:
                    </td>
                    <td>United States</td>
                  </tr> */}
                  <tr>
                    <td style={{ width: "80%" }}>
                      Country of birth of the individual:
                    </td>
                    <td>{getCountries(values.permanentResidentialCountryId)}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Is the individual subject to taxation as a U.S. citizen or
                      resident alien?
                    </td>
                    <td>{values?.foreignTINCountryId==257 ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Is the individual a Permanent Resident Card Holder (Green
                      Card)?
                    </td>
                    <td>{values?.permanentResidentialCountryId==257 ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Does the individual hold dual citizenship status?
                    </td>
                    <td>{values?.permanentResidentialCountryId!==values.permanentResidentialCountryId1 ? "No" : "Yes"}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Does or did the dual citizenship include U.S. citizenship?
                    </td>
                    <td>{values?.permanentResidentialCountryId==257 || values.permanentResidentialCountryId1==257 ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Has U.S citizenship been formally renounced?
                    </td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Date U.S. citizenship was renounced:
                    </td>
                    <td>10-11-23</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Expatriate Documentation attached?
                    </td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Has the Individual been physically present in the U.S. on
                      at least 31 days during the current calendar year?
                    </td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      How many days has the Individual been in the U.S. in the
                      current years?
                    </td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      How many days has the Individual been in the U.S. in the
                      preceding years?
                    </td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      How many days has the Individual been in the U.S. in the
                      further preceding years?
                    </td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      Effective days calculated for residency in U.S.:
                    </td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td style={{ width: "80%" }}>
                      As result Individual considered as resident for tax
                      purposes:
                    </td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ paddingTop: "40px" }}>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ width: "50%" }}>Signed by: </td>
                            <td style={{ width: "50%" }}>Date: {moment().format("DD-MM-YYYY")}</td>
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
                  margin: "40px auto",
                  fontSize: "20px",
                }}
                cellPadding={10}
              >
                <thead>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        paddingBottom: "20px",
                      }}
                    >
                      Additional Information Provided:
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "50%" }}>Entity Name:</td>
                    <td style={{ width: "50%" }}>{values.entityName}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>Capacity:</td>
                    <td style={{ width: "50%" }}>Capacity Not Requested</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>Form Filed:</td>
                    <td style={{ width: "50%" }}>W-9 (Oct 2021)</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>Date:</td>
                    <td style={{ width: "50%" }}>10-17-2023</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>
                      Electronic Recipient Statement Consent:
                    </td>
                    <td style={{ width: "50%" }}>No</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>Contact email address:</td>
                    <td style={{ width: "50%" }}>
                      {" "}
                      <a
                        href={values.contactEmail}
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                       {values.contactEmail}
                      </a>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>Contact cell number:</td>
                    <td style={{ width: "50%" }}> {values.primaryContactNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>Day time contact number:</td>
                    <td style={{ width: "50%" }}>{values.primaryContactNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>
                      Day time Alternate contact number:
                    </td>
                    <td style={{ width: "50%" }}>{values.alternativeNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>
                      Day time Alternate contact number:
                    </td>
                    <td style={{ width: "50%" }}>United States 534534535</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </View>
        <div style={{ paddingTop: "20px" ,textAlign: "center" }}>
          {/* <Button
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
          </Button> */}
            <Button onClick={backFunction} variant="contained">
                  Back
                </Button>
        </div>
      </div>
      {/* </div> */}

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

export default W9;
