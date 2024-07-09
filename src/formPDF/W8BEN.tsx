import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { pdf, Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { Button, Collapse, Typography } from "@mui/material";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import { useDispatch, useSelector } from "react-redux";
import { formPDFField, getAllCountries, getBENformData } from "../Redux/Actions";
import moment from "moment";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";

const W8Ben: React.FC = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const contentRef:any = useRef(null);
  const Version =localStorage.getItem("Version");
  const { authDetails } = useAuth();
  const [values, setValues] = useState({
    agentId: 3,
    businessTypeId: 1,
    selectedEntity: false,
    isUSEntity: false,
    isUSIndividual: false,
    uniqueIdentifier: "",
    firstName: "",
    lastName: "",
    businessName: "",
    countryOfCitizenshipId: 257,
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
    incomeTypeId: [0],
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
    capacityId: 0,
    isCorrectPaymentPurposes: false,
    isConfirmed: false,
    usTinTypeId: 0,
    permanentresidentialzippostalcode: "",
    EnterconfirmationCode: "",
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
  // const contentRef = useRef<HTMLDivElement>(null);

  function getFieldValues(arrayOfObjects: any) {
    setValues(arrayOfObjects.map((obj: any) => obj.fieldValue));
  }

  useEffect(() => {
    dispatch(
      getAllCountries()
    );
    setLValues(JSON.parse(localStorage.getItem("agentDetails") || "{}"));
  }, []);

  useEffect(() => {
    (dispatch(getBENformData(authDetails?.agentId,(data:any)=>{setValues(data)})))
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
    console.log(countryName, "countryName");
    return countryName;
}

  const backFunction = () => {
    // window.location.href = window.location.href;
    history(-1);
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF("p", "mm");
  //   if (contentRef.current) {
  //     html2canvas(contentRef.current).then((canvas: any) => {
  //       const imgWidth = 188;
  //       const pageHeight = 295;
  //       const imgHeight = canvas.height * imgWidth;
  //       let heightLeft = imgHeight;
  //       let position = 0;
  //       heightLeft -= pageHeight;
  //       doc.addImage(
  //         canvas,
  //         "PNG",
  //         10,
  //         position,
  //         imgWidth,
  //         doc.internal.pageSize.height,
  //         "",
  //         "FAST"
  //       );
  //       while (heightLeft >= 0) {
  //         position = heightLeft - doc.internal.pageSize.height;
  //         doc.addPage();
  //         // doc.addImage(canvas, 'PNG', 10, position, imgWidth, doc.internal.pageSize.height, '', 'FAST');
  //         heightLeft -= pageHeight;
  //       }
  //       doc.save("Downld.pdf");
  //     });
  //   }
  // };

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
            maxWidth: "900px",
            width: "100%",
            padding: "0px",
            display: "table",
            boxSizing: "border-box",
            fontSize: "10px",
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
                          width: "16%",
                          boxSizing: "border-box", 
                          lineHeight: "1.3",
                          borderRight: "2px solid #000",
                          borderBottom: "2px solid #000",
                        }}
                      >
                        <p style={{ margin: "0" }}>
                          Form{" "}
                          <strong
                            style={{ fontSize: "25px", fontWeight: "700" }}
                          >
                            W-8BEN
                          </strong>
                        </p>
                        <p style={{ margin: "5px 0 10px" }}>(Rev. October 2021)</p>
                        <p>
                          Department of the Treasury Internal Revenue Service
                        </p>
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
                        <h1 style={{ fontSize: "13px", fontWeight: "900" }}>
                          Certificate of Foreign Status of Beneficial Owner for
                          United States Tax Withholding and Reporting
                          (Individuals)
                        </h1>
                        <ul
                          style={{
                            listStyle: "none",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            padding: "0",
                            margin:"0"
                          }}
                        >
                          <li>
                            &#9658; For use by individuals. Entities must use
                            Form W-8BEN-E.
                          </li>
                          <li>
                            &#9658; Go to www.irs.gov/FormW8BEN for instructions
                            and the latest information.
                          </li>
                          <li>
                            &#9658; Give this form to the withholding agent or
                            payer. Do not send to the IRS.
                          </li>
                        </ul>
                      </th>
                      <th
                        style={{ 
                          boxSizing: "border-box",
                          fontSize: "14px",
                          fontWeight: "bolder",
                          lineHeight: "1.3",
                          borderBottom: "2px solid #000",
                          padding: "0 0 0 10px",
                        }}
                      >
                        <p
                          style={{ 
                            textAlign: "right",
                            color: "blue",
                            fontWeight: "400",
                            marginBottom: "15px",
                          }}
                        >
                          UID : {values.uniqueIdentifier}
                        </p>
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: "800",
                            lineHeight: "1",
                          }}
                        >
                          Electronic{" "}
                        </h3>
                        <h3
                          style={{ 
                            fontSize:"16px",
                            fontWeight: "800",
                            lineHeight: "1",
                          }}
                        >
                          Substitute{" "}
                        </h3>
                        <h5 style={{ fontSize: "inherit", lineHeight: "1", fontWeight:"600", marginBottom:"0px" }}>Form W-8BEN</h5>
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
                            margin: "5px 0px",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  textAlign: "start",
                                  padding: "0",
                                  fontWeight: "800",
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
                                    padding: "5px 10px ",
                                    marginBottom:"0px", 
                                  }}
                                >
                                  <li style={{ marginBottom: "6px" }}>
                                    You are NOT an individual . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . . .W-8BEN-E{" "}
                                  </li>
                                  <li style={{ marginBottom: "6px" }}>
                                    You are a U.S. citizen or other U.S. person,
                                    including a resident alien individual . . .
                                    . . . . . . . . . . . . . . . . . . . . .W-9
                                  </li>
                                  <li style={{ marginBottom: "6px" }}>
                                    You are a beneficial owner claiming that
                                    income is effectively connected with the
                                    conduct of trade or business within the
                                    United States (other than personal services)
                                    . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . . . . . .{" "}
                                    <span style={{ textAlign: "end" }}>
                                      W-8ECI
                                    </span>
                                  </li>
                                  <li>
                                    You are a beneficial owner who is receiving
                                    compensation for personal services performed
                                    in the United States . . . . . . . 8233 or
                                    W-4
                                  </li>
                                  <li>
                                    You are a person acting as an intermediary .
                                    . . . . . . . . . . . . . . . . . . . . . .
                                    . . . . . . W-8IMY{" "}
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={2}
                                style={{
                                  borderTop: "1px solid #000",
                                  padding: "10px 0",
                                }}
                              >
                                {" "}
                                <strong style={{fontWeight:"800"}}>Note:</strong> If you are resident in a
                                FATCA partner jurisdiction (that is, a Model 1
                                IGA jurisdiction with reciprocity), certain tax
                                account information may be provided to your
                                jurisdiction of residence.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table
                          style={{ width: "100%", borderCollapse: "collapse", fontSize:"11px" }}
                          cellPadding={0}
                        >
                          <thead>
                            <tr>
                              <td
                                style={{
                                  background: "#000",
                                  color: "#fff",
                                  fontWeight: "bold",
                                  width: "fit-content",
                                  border: "1px solid #000",
                                  padding: "0px",
                                  textAlign: "center",
                                  fontSize:" 14px",
                                }}
                              >
                                Part I{" "}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000",
                                  borderBottom: "1px solid #000",
                                  padding:" 0px 10px",
                                  fontSize:" 13px",
                                }}
                              >
                                <strong>
                                  Identification of Beneficial Owner
                                </strong>
                                (see instructions){" "}
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
                                          width: "50%",
                                          borderRight: "1px solid #000",
                                        }}
                                      >
                                        <strong style={{marginRight:"5px"}}>1.</strong> Name of individual who is the
                                        beneficial owner
                                        <p
                                          style={{
                                            color: "#82b1ff",
                                            width: "100%",
                                            margin: "0",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          { values.firstName +
                                              " " +
                                              values.lastName}
                                        </p>
                                      </td>
                                      <td
                                        style={{
                                          borderBottom: "1px solid #000",
                                          padding: "5px 10px",
                                          width: "50%",
                                        }}
                                      >
                                        <strong style={{marginRight:"5px"}}>2.</strong> Country of citizenship
                                        <p
                                          style={{
                                            color: "#82b1ff",
                                            width: "100%",
                                            margin: "6px 0 0",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          {getCountries(
                                            values.countryOfCitizenshipId
                                          )}
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
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "70%",
                                                  borderRight: "1px solid #000",
                                                }}
                                              >
                                                <strong style={{marginRight:"5px"}}>3.</strong> City or town, state or
                                                province. Include postal code
                                                where appropriate.
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                  }}
                                                >
                                                  {
                                                    values.permanentResidentialCityorTown
                                                  }
                                                </p>
                                              </td>
                                              <td
                                                style={{
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "30%",
                                                }}
                                              >
                                                Country
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                  }}
                                                >{}
                                                  {getCountries(
                                                    values.permanentResidentialCountryId
                                                  )}
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
                                          borderBottom: "1px solid #000",
                                          padding: "5px 10px",
                                        }}
                                      >
                                        <strong style={{marginRight:"5px"}}>4.</strong> Mailing address (if different from
                                        above)
                                        <p
                                          style={{
                                            color: "#82b1ff",
                                            width: "100%",
                                            margin: "6px 0 0",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          {getCountries(
                                            values.permanentResidentialCountryId
                                          )}
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
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "70%",
                                                  borderRight: "1px solid #000",
                                                }}
                                              >
                                                City or town, state or province.
                                                Include postal code where
                                                appropriate.
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                  }}
                                                >
                                                  {
                                                    values.permanentResidentialCityorTown
                                                  }
                                                </p>
                                              </td>
                                              <td
                                                style={{
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "30%",
                                                }}
                                              >
                                                Country
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                  }}
                                                >
                                                 {getCountries(values.permanentResidentialCountryId)}
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
                                          borderBottom: "1px solid #000",
                                          padding: "5px 10px",
                                        }}
                                      >
                                        <strong style={{marginRight:"5px"}}>5.</strong> Mailing address (if different from
                                        above)
                                        <p
                                          style={{
                                            color: "#82b1ff",
                                            width: "100%",
                                            margin: "6px 0 0",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          {getCountries(values.permanentResidentialCountryId1)}
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
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "50%",
                                                  borderRight: "1px solid #000",
                                                }}
                                              >
                                                <strong>6a.</strong> &nbsp; Foreign tax
                                                identifying number (see instructions)
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                  }}
                                                >
                                                  {values.foreignTIN}
                                                </p>
                                              </td>
                                              <td
                                                style={{
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "50%",
                                                }}
                                              >
                                                <strong style={{marginRight:"5px"}}>6b.</strong> &nbsp; Check if FTIN not
                                                legally required . . . . . . . .
                                                . . .{" "}
                                                <input
                                                  type="checkbox"
                                                  name=""
                                                  id=""
                                                  checked={
                                                    !values.foreignTINNotAvailable
                                                  }
                                                />
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
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "50%",
                                                  borderRight: "1px solid #000",
                                                }}
                                              >
                                                <strong style={{marginRight:"5px"}}>7.</strong> Reference number(s) (see
                                                instructions)
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  VAT : {values.vatId}
                                                </p>
                                              </td>
                                              <td
                                                style={{
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "5px 10px",
                                                  width: "50%",
                                                }}
                                              >
                                               <strong style={{marginRight:"5px"}}>8.</strong>  Date of birth (MM-DD-YYYY) (see
                                                instructions)
                                                <p
                                                  style={{
                                                    color: "#82b1ff",
                                                    width: "100%",
                                                    margin: "6px 0 0",
                                                    lineHeight: "1.4",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  {" "}
                                                  {moment(values.dob).format(
                                                    "MM/DD/YYYY"
                                                  )}
                                                </p>
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
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "-2px",
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
                                  width: "fit-content",
                                  border: "1px solid #000",
                                  padding: "0px",
                                  textAlign: "center",
                                  fontSize:"13px",
                                }}
                              >
                                Part II{" "}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000",
                                  borderBottom: "1px solid #000",
                                  padding: "0px 10px",
                                  fontSize:"13px",
                                }}
                              >
                                <strong>Claim of Tax Treaty Benefits</strong>{" "}
                                (for chapter 3 purposes only) (see instructions){" "}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={2} style={{ padding: "5px 10px" }}>
                                <strong style={{marginRight:"5px"}}>9.</strong> I certify that the beneficial owner is a
                                resident of within the meaning of{" "}
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  value={getCountries(
                                    values.countryOfCitizenshipId
                                  )}
                                  style={{
                                    minWidth: "100px",
                                    maxWidth: "200px",
                                    width: "100%",
                                    borderWidth: "0 0 1px 0",
                                    borderStyle: "solid",
                                    borderColor: "#000",
                                    textAlign: "center",
                                    color: "blue",
                                  }}
                                />{" "}
                                the income tax treaty between the United States
                                and that country.
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{ padding: "5px 10px" }}>
                                <strong  style={{marginRight:"5px"}}>10.</strong> Special rates and conditions (if
                                applicable—see instructions): The beneficial
                                owner is claiming the provisions of Article and
                                paragraph{" "}
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  value="IV (2) 34343"
                                  style={{
                                    minWidth: "100px",
                                    maxWidth: "200px",
                                    width: "100%",
                                    borderWidth: "0 0 1px 0",
                                    borderStyle: "solid",
                                    borderColor: "#000",
                                    textAlign: "center",
                                    color: "blue",
                                  }}
                                />{" "}
                                of the treaty identified on line 9 above to
                                claim a{" "}
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  value="0"
                                  style={{
                                    minWidth: "50px",
                                    maxWidth: "100px",
                                    width: "100%",
                                    borderWidth: "0 0 1px 0",
                                    borderStyle: "solid",
                                    borderColor: "#000",
                                    textAlign: "center",
                                    color: "blue",
                                  }}
                                />
                                % rate of withholding on (specify type of
                                income):
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  value="Income of Representation "
                                  style={{
                                    minWidth: "100px",
                                    maxWidth: "200px",
                                    width: "100%",
                                    borderWidth: "0 0 1px 0",
                                    borderStyle: "solid",
                                    borderColor: "#000",
                                    textAlign: "center",
                                    color: "blue",
                                  }}
                                />
                                Explain the additional conditions in the Article
                                and paragraph the beneficial owner meets to be
                                eligible for the rate of withholding:
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  value="4343"
                                  style={{
                                    minWidth: "50px",
                                    maxWidth: "100px",
                                    width: "100%",
                                    borderWidth: "0 0 1px 0",
                                    borderStyle: "solid",
                                    borderColor: "#000",
                                    textAlign: "center",
                                    color: "blue",
                                  }}
                                />
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
                                  width: "80px",
                                  border: "1px solid #000",
                                  padding: "0px",
                                  textAlign: "center",
                                  fontSize:"13px",
                                }}
                              >
                                Part III{" "}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000",
                                  borderBottom: "1px solid #000",
                                  padding: "0px 10px",
                                  fontSize:"13px",
                                }}
                              >
                                <strong>Certification</strong>{" "}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={2} style={{ padding: "5px 0" }}>
                                Under penalties of perjury, I declare that I
                                have examined the information on this form and
                                to the best of my knowledge and belief it is
                                false, correct, and complete. I further certify
                                under penalties of perjury that:
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{ padding: "0px 0" }}>
                                <ul
                                  style={{
                                    listStyle: "disc",
                                    paddingLeft: "16px",
                                    marginBottom:"0px"
                                  }}
                                >
                                  <li>
                                    I am the individual that is the beneficial
                                    owner (or am authorized to sign for the
                                    individual that is the beneficial owner) of
                                    all the income or proceeds to which this
                                    form relates or am using this form to
                                    document myself for chapter 4 purposes;
                                  </li>
                                  <li>
                                    The person named on line 1 of this form is
                                    not a U.S. person;
                                  </li>
                                  <li>
                                    This form relates to:
                                    <ol style={{ listStyle: "lower-alpha" }}>
                                      <li>
                                        income not effectively connected with
                                        the conduct of a trade or business in
                                        the United States;
                                      </li>
                                      <li>
                                        {" "}
                                        income effectively connected with the
                                        conduct of a trade or business in the
                                        United States but is not subject to tax
                                        under an applicable income tax treaty;
                                      </li>
                                      <li>
                                        the partner’s share of a partnership’s
                                        effectively connected taxable income; or
                                      </li>
                                      <li>
                                        {" "}
                                        the partner’s amount realized from the
                                        transfer of a partnership interest
                                        subject to withholding under section
                                        1446(f);
                                      </li>
                                    </ol>
                                  </li>
                                  <li>
                                    The person named on line 1 of this form is a
                                    resident of the treaty country listed on
                                    line 9 of the form (if any) within the
                                    meaning of the income tax treaty between the
                                    United States and that country; and
                                  </li>
                                  <li>
                                    For broker transactions or barter exchanges,
                                    the beneficial owner is an exempt foreign
                                    person as defined in the
                                    instructions.Furthermore, I authorize this
                                    form to be provided to any withholding agent
                                    that has control, receipt, or custody of the
                                    income of which I am the beneficial owner or
                                    any withholding agent that can disburse or
                                    make payments of the income of which I am
                                    the beneficial owner.{" "}
                                    <strong>
                                      I agree that I will submit a new form
                                      within 30 days if any certification made
                                      on this form becomes incorrect.{" "}
                                    </strong>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <p style={{ color: "blue", marginBlockEnd:"4px" }}>
                                  W-8BEN – Electronic Substitute Form Statement
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{ color: "blue", marginBlockEnd:"4px" }}>
                                The Internal Revenue Service does not require
                                your consent to any provisions of this document
                                other than the certifications required to
                                establish your status as a non-U.S. person and,
                                if applicable, obtain a reduced rate of
                                withholding.
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{ padding: "10px 0" }}>
                                <input
                                  type="checkbox"
                                  name=""
                                  id=""
                                  style={{
                                    background: "#fff",
                                    border: "1px solid #000",
                                    marginRight: "10px",
                                    verticalAlign:"sub"
                                  }}
                                />{" "}
                                I certify that I have the capacity to sign for
                                the person identified on line 1 of this form.
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
                                        verticalAlign:"top"
                                      }}
                                      >
                                        <h6 style={{
                                          fontSize: "14px",
                                          fontWeight: "bold", 
                                          marginTop:"20px",
                                        }}>Sign Here</h6>
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
                                              <td colSpan={2}>
                                                <p
                                                  style={{
                                                    color: "black",
                                                    fontSize:"10px",
                                                    marginBlockEnd:"4px"
                                                  }}
                                                >Electronically signed
                                                </p>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colSpan={2}>
                                                 {/* <img src="" alt="" style={{maxWidth:"50px"}} /> */}
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
                                                    Date : 10-17-2023 12:00:53
                                                    IST{" "}
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
                                                  borderBottom:
                                                    "1px solid #000",
                                                  padding: "10px",
                                                  color: "blue",
                                                }}
                                              >
                                                {moment().format("MM-DD-YYYY")}
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
                                                Signature of beneficial owner
                                                (or individual authorized to
                                                sign for beneficial owner)
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
                                                  color: "blue",
                                                  borderBottom:
                                                    "1px solid #000",
                                                }}
                                              >
                                                jghkdk10
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                colSpan={2}
                                                style={{ 
                                                  color: "#000",
                                                }}
                                              >
                                                Print name of signer
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
                        style={{
                          padding: "0px 0",
                          borderTop: "2px solid #000",
                        }}
                        colSpan={3}
                      >
                        <table
                          style={{ width: "100%", borderCollapse: "collapse",
                          fontSize:"12px", }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ width: "50%", }}>
                                <strong>
                                  For Paperwork Reduction Act Notice, see
                                  separate instructions.
                                </strong>
                              </td>
                              <td style={{ width: "20%", textAlign: "center" }}>
                                Cat. No. 25047Z
                              </td>
                              <td style={{ width: "30%", textAlign: "end" }}>
                                Form{" "}
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  W-8BEN
                                </span>{" "}
                                (Rev. 10-2021)
                              </td>
                            </tr>
                            <tr>
                              <td style={{ width: "50%", color: "blue" }}>
                                Electronic Submission Confirmation:{" "}
                                {values.EnterconfirmationCode}
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
                    borderSpacing:"0",
                    width: "100%",
                    margin: "40px auto",
                    fontSize:"13px",
                  }}
                >
                  <thead>
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#000",
                          paddingBottom: "15px",
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
                            fontSize: "13px",
                            fontWeight:"500"
                          }}
                          cellPadding={3}
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
                              <td style={{ border: "2px solid #000" }}>
                                243543
                              </td>
                              <td style={{ border: "2px solid #000" }}>
                                False
                              </td>
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
                              <td style={{ border: "2px solid #000" }}>
                                False
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
                          fontSize: "18px",
                          fontWeight: "600",
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
                        Was the individual born in the United States and held
                        U.S. citizenship?
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
                      <td>
                        {getCountries(values.permanentResidentialCountryId)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%" }}>
                        Is the individual subject to taxation as a U.S. citizen
                        or resident alien?
                      </td>
                      <td>
                        {values?.foreignTINCountryId == 257 ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%" }}>
                        Is the individual a Permanent Resident Card Holder
                        (Green Card)?
                      </td>
                      <td>
                        {values?.permanentResidentialCountryId == 257
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%" }}>
                        Does the individual hold dual citizenship status?
                      </td>
                      <td>
                        {values?.permanentResidentialCountryId !==
                        values.permanentResidentialCountryId1
                          ? "No"
                          : "Yes"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "80%" }}>
                        Does or did the dual citizenship include U.S.
                        citizenship?
                      </td>
                      <td>
                        {values?.permanentResidentialCountryId == 257 ||
                        values.permanentResidentialCountryId1 == 257
                          ? "Yes"
                          : "No"}
                      </td>
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
                        Has the Individual been physically present in the U.S.
                        on at least 31 days during the current calendar year?
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
                              <td style={{ width: "50%" }}>
                                Date: {moment().format("DD-MM-YYYY")}
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
                          fontWeight: "700",
                          paddingBottom: "10px",
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
                      <td style={{ width: "50%" }}>W-8BEN (Oct 2021)</td>
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
                      <td style={{ width: "50%" }}>
                        {" "}
                        {values.primaryContactNumber}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "50%" }}>Day time contact number:</td>
                      <td style={{ width: "50%" }}>
                        {values.primaryContactNumber}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "50%" }}>
                        Day time Alternate contact number:
                      </td>
                      <td style={{ width: "50%" }}>
                        {values.alternativeNumber}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "50%" }}>
                        Day time Alternate contact number:
                      </td>
                      <td style={{ width: "50%" }}>United States 534534535</td>
                    </tr>
                  </tbody>
                </table>
                <table
                  style={{
                    borderCollapse: "collapse",
                    borderSpacing:"0",
                    width: "100%",
                    margin: "40px auto",
                    fontSize:"13px",
                  }}
                >
                  <thead>
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#000",
                          paddingBottom: "15px",
                        }}
                      >
                        Further Information:
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
                            fontSize: "13px",
                            fontWeight:"500"
                          }}
                          cellPadding={3}
                        >
                          <thead>
                            <tr>
                              <td
                                style={{
                                  border: "2px solid #000",
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  width: "50%",
                                }}
                              >
                                No U.S. Source Income Declaration
                              </td>
                              <td
                                style={{
                                  border: "2px solid #000",
                                  textAlign: "left",
                                  fontWeight: "bold",
                                }}
                              >
                                Selected
                              </td>
                               
                            </tr>
                          </thead>
                          <tbody>
                            <tr> 
                              <td colSpan={2} style={{ border: "2px solid #000", borderBottom:"0", paddingBlockEnd:"20px" }}>
                              Declaration Statement - Declaration of No U.S. Source Income Under penalties of perjury I
confirm that the goods or materials provided or manufactured and any and all associated
services, including consultancy, implementation, training or support are undertaken entirely from
locations outside of the United States and United States territories. I also confirm that the invoices
submitted will not include a request for payment of Dividends, Insurance Premiums or Interest
payments. I further confirm that should this situation change I will provide adequate notification,
clearly identify items that may be considered gained from U.S. sources, identify any Dividends,
Insurance Premiums or Interest payments due on any invoices submitted and submit an updated
U.S. source income statement.
                              </td> 
                            </tr> 
                            <tr>
                              <td style={{ borderBottom: "2px solid #000", borderLeft: "2px solid #000" }}>
                              <strong>Signed by:</strong>
                              </td>
                              <td style={{ borderBottom: "2px solid #000",  borderRight: "2px solid #000"}}>
                              <strong>Date: 03-05-2024</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            </div>
          </View>
          <div style={{ paddingTop: "20px", textAlign: "center" ,display:"flex", justifyContent:"space-between"}}>
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
            <Button  className="btn btn_submit  btn-primary-agent" onClick={backFunction} variant="contained" style={{ borderRadius: "0px",backgroundColor:"#0095dd"}}>
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
                © Comply Exchange Ltd.{new Date().getFullYear()} - Version: {Version}- Render
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

export default W8Ben;
