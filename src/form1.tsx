import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { Button, Collapse } from "@mui/material"; 
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
const Form1: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

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


  const downloadPDF=()=> {
    const doc = new jsPDF('p', 'mm');
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas: any) => {
        const imgWidth = 188;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        doc.addImage(canvas, 'PNG', 10, position, imgWidth, doc.internal.pageSize.height, '', 'FAST');
        while (heightLeft >= 0) {
          position = heightLeft - doc.internal.pageSize.height;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 10, position, imgWidth, doc.internal.pageSize.height, '', 'FAST');
          heightLeft -= pageHeight;
        }
        console.log(doc,")))))DOC")
        doc.save('Downld.pdf');
      });
    }
  }

  

  return (
    <>
    <div  style={{margin: "0 auto",maxWidth:"960px",width:"100%", padding:"0px", display:"table", boxSizing:"border-box" }}>
      <h1 style={{ color: "red", paddingLeft:"20px"}} >Heading 1</h1>
      <View wrap={false}>
      <div  ref={contentRef} style={{ background:"#fff", color:
      
      "black", fontFamily: "sans-serif", padding:"30px 20px", boxSizing:"border-box"}} >
        <div style={{margin:"10px auto"}}>
          <table style={{ width: "100%", maxWidth: "920px", color:"#000", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th style={{ width: "24%", boxSizing:"border-box", fontSize:"14px", lineHeight:"1.3", borderRight:"2px solid #000", borderBottom:"2px solid #000" }}>
                <p>Form <strong style={{ fontSize: "30px", fontWeight: "700" }}>W-8BEN</strong></p>
                <p style={{ margin: "15px 0" }}>(Rev. October 2021)</p>
                <p>Department of the Treasury Internal Revenue Service</p>
              </th>
              <th style={{padding:"0 15px", boxSizing:"border-box", textAlign:"center" ,width: "52%", fontSize: "14px", lineHeight: "1.3", borderRight: "2px solid #000", borderBottom: "2px solid #000" }}>
                <h1 style={{fontSize:"16px", fontWeight:"bolder"}}>Certificate of Foreign Status of Beneficial Owner for United
                  States Tax Withholding and Reporting (Individuals)</h1>
                <ul style={{ listStyle:"none", fontSize:"12px", lineHeight:"1.5"}}>
                  <li>&#9658; For use by individuals. Entities must use Form W-8BEN-E.</li>
                  <li>&#9658; Go to www.irs.gov/FormW8BEN for instructions and the latest information.</li>
                  <li>&#9658; Give this form to the withholding agent or payer. Do not send to the IRS.</li>
                </ul>
              </th>
              <th style={{ width: "24%", boxSizing:"border-box", fontSize: "18px", fontWeight:"bolder", lineHeight: "1.3", borderBottom: "2px solid #000", padding:"0 0 0 10px"  }}>
                <p style={{fontSize: "14px", textAlign: "right", color: "blue", fontWeight:"400", marginBottom:"15px" }}>UID : 6utykj</p>
                <h3 style={{ fontSize: "20px", fontWeight:"bolder", lineHeight: "1",}}>Electronic </h3>
                <h3 style={{ fontSize: "20px", fontWeight:"bolder", lineHeight: "1",}}>Substitute  </h3>
                <h5>Form W-8BEN</h5>
              </th>
             </tr>
          </thead>
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
                          <li style={{marginBottom:"6px"}}>You are NOT an individual . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .W-8BEN-E </li>
                          <li style={{marginBottom:"6px"}}>You are a U.S. citizen or other U.S. person, including a resident alien individual . . . . . . . . . . . . . . . . . . . . . . . .W-9</li>
                          <li style={{marginBottom:"6px"}}>You are a beneficial owner claiming that income is effectively connected with the conduct of trade or business within the United States
                            (other than personal services) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . <span style={{ textAlign: "end" }}>W-8ECI</span></li>
                          <li>You are a beneficial owner who is receiving compensation for personal services performed in the United States . . . . . . . 8233 or W-4</li>
                          <li>You are a person acting as an intermediary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8IMY </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ borderTop:"1px solid #000", padding:"10px 0"}}> <strong>Note:</strong> If you are resident in a FATCA partner jurisdiction (that is, a Model 1 IGA jurisdiction with reciprocity), certain tax account information may be
provided to your jurisdiction of residence.</td>
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
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> Lorem Ipsum Text</p>
                              </td>
                              <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%" }}>
                                2. Country of citizenship
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> Lorem Ipsum Text</p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight:"1px solid #000" }}>
                                        3. City or town, state or province. Include postal code where appropriate. 
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> Lorem Ipsum Text</p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "30%" }}>
                                        Country
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> United States</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                4 Mailing address (if different from above) 
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> United States</p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "70%", borderRight:"1px solid #000" }}>
                                        City or town, state or province. Include postal code where appropriate. 
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> Lorem Ipsum Text</p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "30%" }}>
                                        Country
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> United States</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}  style={{ borderBottom: "1px solid #000", padding: "5px 10px" }}>
                                5 Mailing address (if different from above) 
                                <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}> United States</p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <table style={{ borderCollapse: "collapse", width: "100%" }} cellPadding={0}>
                                  <tbody>
                                    <tr>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%", borderRight:"1px solid #000" }}>
                                      6a &nbsp; Foreign tax identifying number (see instructions)
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4"}}>243543</p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%" }}>
                                       6b &nbsp; Check if FTIN not legally required . . . . . . . . . . . <input type="checkbox" name="" id="" />
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
                                      7 Reference number(s) (see instructions) 
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4", textAlign:"center"}}>VAT : 7678676 </p>
                                      </td>
                                      <td style={{ borderBottom: "1px solid #000", padding: "5px 10px", width: "50%"}}>
                                      Date of birth (MM-DD-YYYY) (see instructions)
                                        <p style={{color:"#82b1ff", width:"100%", margin:"6px 0 0", lineHeight:"1.4", textAlign:"center"}}> 10-10-2023 </p>
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
                        <strong>Claim of Tax Treaty Benefits</strong> (for chapter 3 purposes only) (see instructions) </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{padding:"5px 10px"}}>
                      9 I certify that the beneficial owner is a resident of within the meaning of  <input type="text" name="" id="" value="Armenia" style={{ minWidth:"100px", maxWidth:"200px", width:"100%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }} /> the income tax
treaty between the United States and that country. 
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{padding:"5px 10px"}}>
                      10 Special rates and conditions (if applicable—see instructions): The beneficial owner is claiming the provisions of Article and paragraph <input type="text" name="" id="" value="IV (2) 34343" style={{ minWidth:"100px", maxWidth:"200px", width:"100%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }} /> of the treaty identified on line 9 above to claim a  <input type="text" name="" id="" value="0" style={{ minWidth:"50px", maxWidth:"100px", width:"100%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }} />% rate of withholding on (specify type of income):<input type="text" name="" id="" value="Income of Representation " style={{ minWidth:"100px", maxWidth:"200px", width:"100%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }} />Explain the additional conditions in the Article and paragraph the beneficial owner meets to be eligible for the rate of withholding:<input type="text" name="" id="" value="4343" style={{ minWidth:"50px", maxWidth:"100px", width:"100%", borderWidth:"0 0 1px 0", borderStyle:"solid", borderColor:"#000", textAlign:"center", color:"blue" }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style={{ width:"100%", borderCollapse:"collapse", marginTop:"10px"}} cellPadding={0}>
                  <thead>
                    <tr>
                      <td style={{background:"#000", color:"#fff", fontWeight:"bold", width:"120px", border: "1px solid #000", padding:"5px 10px", textAlign:"center"}}>Part III </td>
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
                            <li>I am the individual that is the beneficial owner (or am authorized to sign for the individual that is the beneficial owner) of all the income or proceeds to which this form
                      relates or am using this form to document myself for chapter 4 purposes;
                      </li>
                        <li>The person named on line 1 of this form is not a U.S. person;</li>
                        <li>This form relates to:
                          <ol style={{ listStyle:"lower-alpha"}}>
                            <li>income not effectively connected with the conduct of a trade or business in the United States;</li>
                            <li> income effectively connected with the conduct of a trade or business in the United States but is not subject to tax under an applicable income tax treaty;</li>
                            <li>the partner’s share of a partnership’s effectively connected taxable income; or</li>
                            <li> the partner’s amount realized from the transfer of a partnership interest subject to withholding under section 1446(f);</li>
                          </ol>
                        </li>
                        <li>The person named on line 1 of this form is a resident of the treaty country listed on line 9 of the form (if any) within the meaning of the income tax treaty between the United States and that country; and</li>
                        <li>For broker transactions or barter exchanges, the beneficial owner is an exempt foreign person as defined in the instructions.Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income of which I am the beneficial owner or any withholding agent that can disburse or make payments of the income of which I am the beneficial owner. <strong>I agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect. </strong></li>
                        </ul>
                      </td> 
                    </tr>
                     <tr>
                      <td colSpan={2}>
                      <p style={{ color:"blue"}}>W-8BEN – Electronic Substitute Form Statement</p>
                      </td>
                     </tr>
                     <tr>
                     <td colSpan={2}>
                      The Internal Revenue Service does not require your consent to any provisions of this document other than the certifications required to establish your status as a non-U.S. person and, if applicable, obtain
a reduced rate of withholding.
                      </td>
                     </tr>
                     <tr>
                      <td colSpan={2} style={{ padding:"10px 0"}}>
                      <input type="checkbox" name="" id=""style={{ background:"#fff", border:"1px solid #000", marginRight:"10px"}}  /> I certify that I have the capacity to sign for the person identified on line 1 of this form.
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
                                      <span style={{display:"table-cell",textAlign:"left", width:"50%"}}>Date : 10-17-2023 12:00:53 IST </span>
                                      <span  style={{display:"table-cell",textAlign:"right", width:"50%"}}> ESC : YSCML</span>
                                      </div>
                                      </td>
                                      <td style={{width:"30%", borderBottom:"1px solid #000", padding:"10px", color:"blue"}}>17-10-2023</td>
                                    </tr>
                                    <tr>
                                      <td style={{width:"70%",color:"#000", textAlign:"center"}}>
                                      Signature of beneficial owner (or individual authorized to sign for beneficial owner)
                                      </td>
                                      <td style={{width:"30%",color:"#000", textAlign:"center"}}> 
                                      Date (MM-DD-YYYY)
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan={2} style={{fontSize:"16px", color:"blue", borderBottom:"1px solid #000"}}>jghkdk10</td>
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
                        Electronic Submission Confirmation: YVQ7NL
                        </td>
                        <td style={{width:"20%", color:"blue", textAlign:"center"}}>
                        Email Address :
                        </td>
                        <td style={{width:"30%", color:"blue"}}>
                         <a href="mailto:abhay.singh2@mail.com">abhay.singh2@mail.com</a>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </td>
            </tr>
          </tfoot>
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

          <table style={{borderCollapse:"collapse", width:"100%", margin:"40px auto", fontSize:"20px"}} cellPadding={10}>
            <thead>
              <tr>
                <td colSpan={2} style={{ fontSize:"38px",fontWeight:"500", color:"#000", paddingBottom:"0px"}}> United States Citizenship Test Results </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ fontSize:"30px",fontWeight:"700", color:"#000", paddingBottom:"5px"}}> Information for tax purposes: </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{width:"80%"}}>Was the individual born in the United States and held U.S. citizenship?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Country of Citizenship of the individual:</td>
                <td>United States</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Country of Citizenship of the individual:</td>
                <td>United States</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Country of birth of the individual:</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Is the individual subject to taxation as a U.S. citizen or resident alien?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Is the individual a Permanent Resident Card Holder (Green Card)?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Does the individual hold dual citizenship status?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Does or did the dual citizenship include U.S. citizenship?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Has U.S citizenship been formally renounced?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Date U.S. citizenship was renounced:</td>
                <td>10-11-23</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Expatriate Documentation attached?</td>
                <td>No</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Has the Individual been physically present in the U.S. on at least 31 days
during the current calendar year?</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>How many days has the Individual been in the U.S. in the current years?</td>
                <td>8</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>How many days has the Individual been in the U.S. in the preceding years?</td>
                <td>2</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>How many days has the Individual been in the U.S. in the further preceding years?</td>
                <td>2</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>Effective days calculated for residency in U.S.:</td>
                <td>9</td>
              </tr>
              <tr>
                <td style={{width:"80%"}}>As result Individual considered as resident for tax purposes:</td>
                <td>No</td>
              </tr>
              <tr>
                <td colSpan={2} style={{ paddingTop:"40px"}}>
                  <table style={{width:"100%"}}>
                    <tbody>
                      <tr>  
                        <td style={{width:"50%"}}>Signed by: </td>
                        <td style={{width:"50%"}}>Date: 24-11-2023</td> 
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
                <td style={{width:"50%"}}>Entity Name:</td>
                <td style={{width:"50%"}}>fgjghkghk hgkjghk</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Capacity:</td>
                <td style={{width:"50%"}}>Capacity Not Requested</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Form Filed:</td>
                <td style={{width:"50%"}}>W-8BEN (Oct 2021)</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Date:</td>
                <td style={{width:"50%"}}>10-17-2023</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Electronic Recipient Statement Consent:</td>
                <td style={{width:"50%"}}>No</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Contact email address:</td>
                <td style={{width:"50%"}}> <a href="mailto:abhay.singh2@mail.com" style={{ color:"#000", textDecoration:"none"}}>abhay.singh2@mail.com</a> </td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Contact cell number:</td>
                <td style={{width:"50%"}}>  </td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Day time contact number:</td>
                <td style={{width:"50%"}}>United States 8638676734</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Day time Alternate contact number:</td>
                <td style={{width:"50%"}}>United States 534534535</td> 
              </tr>
              <tr>  
                <td style={{width:"50%"}}>Day time Alternate contact number:</td>
                <td style={{width:"50%"}}>United States 534534535</td> 
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
      </View>
      <div style={{ paddingTop: "20px" }}>
        <Button onClick={downloadPDF} variant="contained">Download PDF</Button>
      </div>
    </div>
    </>
  );
};

export default Form1;
