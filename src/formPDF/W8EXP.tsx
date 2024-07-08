'use client'

import { Button, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";
import { getAllCountries, getExpformData } from "../Redux/Actions";

export default function FormW8EXP() {

  const dispatch = useDispatch();
  const history = useNavigate();
  const contentRef: any = useRef(null);
  const { authDetails } = useAuth();
  //  const contentRef = useRef<HTMLDivElement>(null);
  const [pageData, setPageData]: any = useState()

  const getCountriesReducer = useSelector(
    (state: any) => state.getCountriesReducer
  );

  const Version =localStorage.getItem("Version");
  // const contentRef = useRef<HTMLDivElement>(null);
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
    (dispatch(getExpformData(authDetails?.agentId, (data: any) => { setValues(data) })))
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

  return (
    <>
      <section ref={contentRef} style={{ fontSize: "12px" }}>
        <div
          style={{
            padding: "0",
            margin: "10px auto",
            background: "#fff",
            width: "100%",
            maxWidth: "960px",
            paddingBlock: "20px",
          }}
        >
          <section>
            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                color: "#000",
                borderCollapse: "collapse",
                margin: "auto",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "22.5%",
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
                        W-8EXP
                      </strong>
                    </p>
                    <p style={{ margin: "15px 0" }}>(Rev. July 2017)</p>
                    <p>Department of the Treasury Internal Revenue Service</p>
                  </th>
                  <th
                    style={{
                      padding: "0 10px",
                      boxSizing: "border-box",
                      textAlign: "center",
                      width: "53.5%",
                      fontSize: "14px",
                      lineHeight: "1.3",
                      borderRight: "2px solid #000",
                      borderBottom: "2px solid #000",
                    }}
                  >
                    <h1 style={{ fontSize: "13.5px", fontWeight: "700" }}>
                      CCertificate of Foreign Government or Other Foreign
                      <br></br> Organization for United States Tax
                      <br></br>  Withholding and Reporting
                    </h1>
                    <h3 style={{ fontSize: "12px", fontWeight: "700" }}>
                      (For use by foreign governments, international organizations, foreign central banks of issue, foreign
                      tax-exempt organizations, foreign private foundations, and governments of U.S. possessions.)
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        paddingLeft: "0",
                      }}
                    >
                      <li>
                        &#9658; Go to www.irs.gov/FormW8EXP for instructions and the latest information.
                        Code.
                      </li>
                      <li>
                        &#9658; Section references are to the Internal Revenue Code.
                      </li>
                      <li>
                        &#9658; Give this form to the withholding agent or payer. Do not send to the IRS.
                      </li>
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
                        textAlign: "right",
                        color: "#1133a9",
                        fontWeight: "400",
                        marginBottom: "15px",
                      }}
                    >
                      UID : {lValues.uniqueIdentifier}
                    </p>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                        lineHeight: "1",
                      }}
                    >
                      Electronic{" "}
                    </h3>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                        lineHeight: "1",
                      }}
                    >
                      Substitute{" "}
                    </h3>
                    <h5>Form W-8EXP</h5>
                  </th>
                </tr>
              </thead>
            </table>
          </section>

          <section>
            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "10px auto",
              }}
            >
              <tbody style={{ alignItems: "justify" }}>
                <tr>
                  <td
                    style={{
                      textAlign: "start",
                      padding: "0",
                      fontWeight: "bold",
                    }}
                  >
                    Do not use this form for:
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
                      }}
                    >

                      <li style={{ marginBottom: "6px" }}>
                        A foreign government or other foreign organization that is not claiming the applicability of section(s) 115(2), 501(c), 892, 895,
                        <br></br>or 1443(b)

                        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . .  .. W-8BEN or W-8BEN-E
                      </li>
                      <li style={{ marginBottom: "6px" }}>
                        A beneficial owner solely claiming foreign status or treaty benefits . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8BEN-E or W-8IMY
                      </li>
                      <li style={{ marginBottom: "6px" }}>
                        A foreign partnership or a foreign trust . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8BEN-E or W-8IMY
                      </li>
                      <li style={{ marginBottom: "6px" }}>
                        A person claiming that income is effectively connected with the conduct of a trade or business in the United States   . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . W-8ECI
                      </li>
                      <li style={{ marginBottom: "6px" }}>
                        A person acting as an intermediary
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . W-8IMY
                      </li>
                    </ul>
                  </td>
                </tr>
                {/* <tr>
                  <td colSpan={2} style={{ borderTop: "1px solid #000", padding: "10px 0" }}> <strong>Note:</strong> If you are resident in a FATCA partner jurisdiction (that is, a Model 1 IGA jurisdiction with reciprocity), certain tax account information may be
                    provided to your jurisdiction of residence.</td>
                </tr> */}
              </tbody>
            </table>
            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "10px auto 0",
              }}
              cellPadding={0}
            >
              <thead>
                <tr
                  style={{
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <td style={{ verticalAlign: "top", width: "120px" }}>
                    {" "}
                    <div
                      style={{
                        background: "black",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "120px",
                        padding: "0px 10px",
                        height: "35px",
                        display: "flex",
                      }}
                    >
                      <p style={{ margin: "auto", fontSize: "18px" }}>Part I</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900", fontSize: "18px" }}>
                    {" "}
                    <strong>Identification of Beneficial Owner</strong>
                  </td>
                </tr>
              </thead>
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "0px auto 10px",
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
                      color: "#000",
                    }}
                  >
                    <div style={{ width: "100%", display: "table" }}>
                      <div
                        style={{
                          float: "left",
                          paddingRight: "10px",
                          width: "20px",
                        }}
                      >
                        1
                      </div>
                      <div style={{ float: "left" }}>
                        Name of organization
                      </div>
                    </div>
                    <p
                      style={{
                        color: "#050581",
                        width: "100%",
                        margin: "6px 0 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {" "}
                      Lorem Ipsum Text
                    </p>
                  </td>
                  <td
                    style={{
                      borderBottom: "1px solid #000",
                      padding: "5px 10px",
                      width: "50%",
                      color: "#000",
                    }}
                  >
                    <div style={{ width: "100%", display: "table" }}>
                      <div
                        style={{
                          float: "left",
                          paddingRight: "10px",
                          width: "20px",
                        }}
                      >
                        2
                      </div>
                      <div style={{ float: "left" }}>
                        Country of incorporation or organization
                      </div>
                    </div>
                    <p
                      style={{
                        color: "#050581",
                        width: "100%",
                        margin: "6px 0 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {" "}
                      Lorem Ipsum Text
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      borderBottom: "1px solid #000",
                      padding: "0px 10px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            float: "left",
                            paddingRight: "10px",
                            width: "20px",
                          }}
                        >
                          3
                        </div>
                        <div style={{ float: "left", width: "48px", borderRight: "1px solid #000000" }}>
                          Type of entity
                        </div>
                      </div>
                      <div
                        style={{
                          width: "calc(100% - 15px)",
                          display: "table",
                          marginTop: "10px",
                          fontSize: "14px",
                          lineHeight: "1.3",
                        }}
                      >
                        <ul
                          style={{
                            width: "100%",
                            display: "flex",
                            flexFlow: "row wrap",
                            gap: "6px 0",
                            listStyle: "none",
                          }}
                        >
                          <li style={{ width: "50%", display: "flex" }}>
                            <div>
                              <input type="checkbox" name="" id="" />
                            </div> &nbsp; Foreign government
                          </li>
                          <li style={{ width: "50%", display: "flex" }}>
                            <div>
                              <input type="checkbox" name="" id="" />
                            </div>&nbsp;
                            Foreign tax-exempt organization
                          </li>
                          <li style={{ width: "50%", display: "flex" }}>
                            <div>
                              <input type="checkbox" name="" id="" />
                            </div>&nbsp;
                            International organization
                          </li>
                          <li style={{ width: "50%", display: "flex" }}>
                            <div>
                              <input type="checkbox" name="" id="" />
                            </div> &nbsp;
                            Foreign private foundation
                          </li>
                          <li style={{ width: "50%", display: "flex" }}>
                            <div>
                              <input type="checkbox" name="" id="" />
                            </div>
                            &nbsp;
                            Foreign central bank of issue (not wholly
                            owned by the foreign sovereign)
                          </li>
                          <li style={{ width: "50%", display: "flex" }}>
                            <div>
                              <input type="checkbox" name="" id="" />
                            </div>
                            &nbsp;
                            Government of a U.S. possession
                          </li>
                        </ul>
                      </div>
                    </div>
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
                    <div style={{ width: "100%", display: "table" }}>
                      <div
                        style={{
                          float: "left",
                          paddingRight: "10px",
                          width: "20px",
                        }}
                      >
                        4
                      </div>
                      <div style={{ float: "left" }}>
                        Chapter 4 Status (FATCA status):
                      </div>
                    </div>
                    <div
                      style={{
                        width: "calc(100% - 15px)",
                        display: "flex",
                        marginTop: "10px",
                        fontSize: "14px",
                        lineHeight: "1.3",
                      }}
                    >
                      <ul
                        style={{
                          width: "50%",
                          listStyle: "none",
                          paddingLeft: "22px",
                          gap: "6px 0",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" name="" id="" />
                          </div>
                          &nbsp;
                          Participating FFI.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" name="" id="" />
                          </div>
                          &nbsp;
                          Reporting Model 1 FFI.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Reporting Model 2 FFI.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Registered deemed-compliant FFI (other than a Reporting Model 1 FFI).
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Nonreporting IGA FFI. Complete Part III.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Territory financial institution. Complete Part III.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          International organization.
                        </li>
                      </ul>
                      <ul
                        style={{
                          width: "50%",
                          listStyle: "none",
                          paddingLeft: "18px",
                          gap: "6px 0",
                          display: "flex",
                          flexDirection: "column",

                        }}>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" name="" id="" />
                          </div>
                          &nbsp;
                          Foreign government (including a political subdivision),
                          government of a U.S. possession, or foreign central bank of
                          issue. Complete Part III.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" name="" id="" />
                          </div>
                          &nbsp;
                          Exempt retirement plan of foreign government. Complete Part III.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          501(c) organization. Complete Part III.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Passive NFFE. Complete Part III.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Direct reporting NFFE.
                        </li>
                        <li style={{ width: "100%", display: "flex" }}>
                          <div>
                            <input type="checkbox" checked name="" id="" />
                          </div>
                          &nbsp;
                          Sponsored direct reporting NFFE. Complete Part III.
                        </li>
                      </ul>
                    </div>
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
                    <div style={{ width: "100%", display: "table" }}>
                      <div
                        style={{
                          paddingRight: "10px",
                          width: "20px",
                          display: "table-cell",
                        }}
                      >
                        5
                      </div>
                      <div
                        style={{
                          width: "calc(100% - 20px)",
                          display: "table-cell",
                        }}
                      >
                        Permanent address (street, apt. or suite no., or rural route). <strong> Do not use a P.O. box or in-care-of address (other than a registered address).</strong>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "rgb(5, 5, 129)",
                        width: "100%",
                        margin: "6px 0 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {" "}
                      {lValues.permanentResidentialAptSuite}{" "}{lValues.permanentResidentialStreetNumberandName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
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
                            City or town, state or province. Include postal code where appropriate.
                            <p
                              style={{
                                color: "rgb(5, 5, 129)",
                                width: "100%",
                                margin: "6px 0 0",
                                lineHeight: "1.4",
                              }}
                            >
                              {lValues.permanentResidentialCityorTown} {" "} {lValues.permanentResidentialZipPostalCode}
                            </p>
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
                                color: "rgb(5, 5, 129)",
                                width: "100%",
                                margin: "6px 0 0",
                                lineHeight: "1.4",
                              }}
                            >
                              {" "}
                              {getCountries(lValues.permanentResidentialCountryId)}
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
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>6</div>
                      <div>
                        Mailing address (if different from above).
                      </div>
                    </div>
                    <p
                      style={{
                        width: "100%",
                        color: "blue",
                        marginLeft: "30.72px",
                        marginBottom: "0px",
                        minHeight: "24px",
                      }}
                    >{lValues.permanentResidentialAptSuite1}{" "}{lValues.permanentResidentialStreetNumberandName1}</p>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      borderBottom: "1px solid #000",
                      padding: "0px 10px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "33%", display: "flex", borderRight: "1px solid" }}>
                        <div style={{ paddingRight: "10px" }}>7</div>
                        <div>
                          <div>
                            U.S. TIN, if required (see instructions)
                          </div>
                          <p
                            style={{
                              color: "rgb(5, 5, 129)",
                              width: "100%",
                              margin: "6px 0 0",
                              lineHeight: "1.4",
                            }}
                          >
                            {" "}
                            QIEIN: 11-1111111
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "33%", display: "flex", borderRight: "1px solid" }}>
                        <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>8a</div>
                        <div>
                          <div>
                            GIIN
                          </div>
                          <p
                            style={{
                              color: "rgb(5, 5, 129)",
                              width: "100%",
                              margin: "6px 0 0",
                              lineHeight: "1.4",
                            }}
                          >
                            {" "}

                          </p>
                        </div>
                      </div>
                      <div style={{ width: "33%", display: "flex" }}>
                        <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>b</div>
                        <div>
                          <div>
                            Foreign TIN (see instructions) <span style={{ color: "#050581 !important", }}>&#x2713;</span>
                          </div>
                          <p
                            style={{
                              color: "rgb(5, 5, 129)",
                              width: "100%",
                              margin: "6px 0 0",
                              lineHeight: "1.4",
                            }}
                          >
                            {" "}
                            {values.foreignTIN}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      // borderBottom: "1px solid #000",
                      padding: "5px 10px",
                    }}
                  >
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>9</div>
                      <div>
                        Reference number(s) (see instructions)
                      </div>
                    </div>
                    <p
                      style={{
                        width: "100%",
                        marginLeft: "30.72px",
                        marginBottom: "0px",
                        minHeight: "24px",
                      }}
                    >A/C #: asd1, VAT : 123456789</p>
                  </td>
                </tr>
              </tbody>
              {/* <tfoot>
                <tr>
                  <td style={{ borderTop: "2px solid #000" }}>
                    For Paperwork Reduction Act Notice, see separate
                    instructions.
                  </td>
                  <td style={{ borderTop: "2px solid #000" }}>
                    <div style={{ display: "flex", paddingLeft: "20px" }}>
                      <div style={{ width: "50%" }}>Cat. No. 25402Q</div>
                      <div style={{ width: "50%" }}>
                        Form <strong>W-8EXP</strong> (Rev. 10-2021)
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot> */}
            </table>
          </section>
          <section style={{ breakAfter: "page", breakBefore: "page" }}>

            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "0px auto 10px auto",
              }}
              cellPadding={0}
            >
              <thead>

                <tr
                  style={{
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <td style={{ verticalAlign: "top", width: "120px" }}>
                    {" "}
                    <div
                      style={{
                        background: "black",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "120px",
                        padding: "0px 10px",
                        height: "35px",
                        display: "flex",
                      }}
                    >
                      <p style={{ margin: "auto", fontSize: "18px" }}>Part II</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900", fontSize: "18px" }}>
                    {" "}
                    <strong>Qualification Statement for Chapter 3 Status</strong>
                  </td>
                </tr>
              </thead>
            </table>

            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "0px auto 10px",
              }}
              cellPadding={0}
            >
              <tbody>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>10</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a foreign government:
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      a
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                      }}
                    />{" "}
                    I certify that the entity identified in Part I is a foreign government within the meaning of section 892 and the payments are within the scope of the exemption granted by section 892.
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px" }}></td>
                  <td style={{ fontSize: "14px", fontWeight: "600", padding: "10px 0" }}>
                    Check box 10b or box 10c, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      b
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          The entity identified in Part I is an integral part of the government of
                        </div>
                        <div style={{ width: "495px", borderBottom: "1px solid", marginLeft: "5px" }}>

                        </div>.
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      c
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          The entity identified in Part I is a controlled entity of the government of
                        </div>
                        <div style={{ width: "480px", borderBottom: "1px solid", marginLeft: "5px" }}>

                        </div>.
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>11</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a foreign government:
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that:
                      </label>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        <ul
                          style={{
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            paddingRight: "0px",
                            margin: "0px",
                          }}
                        >
                          <li>
                            The entity identified in Part I is an international organization within the meaning of section 7701(a)(18), <strong>and</strong>
                          </li>
                          <li>
                            The payments are within the scope of the exemption granted by section 892.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>12</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a foreign central bank of issue (not wholly owned by the foreign sovereign):
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that:
                      </label>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        <ul
                          style={{
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            paddingRight: "0px",
                            margin: "0px",
                          }}
                        >
                          <li>
                            The entity identified in Part I is a foreign central bank of issue,
                          </li>
                          <li>
                            The entity identified in Part I does not hold obligations or bank deposits to which this form relates for use in connection with the conduct of a commercial banking function or other commercial activity, <strong>and</strong>
                          </li>
                          <li>
                            The payments are within the scope of the exemption granted by section 895.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>13</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a foreign tax-exempt organization, including foreign private foundations:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        opacity: "0"
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        If any of the income to which this certification relates constitutes income includible under section 512 in computing the entity’s unrelated business taxable income, attach a statement identifying the amounts.
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px" }}></td>
                  <td style={{ fontSize: "14px", fontWeight: "600", padding: "10px 0" }}>
                    Check either box 13a or box 13b
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      a
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        checked
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div>
                        I certify that the entity identified in Part I has been issued a determination letter by the IRS dated <span style={{ color: "rgb(5, 5, 129)", borderBottom: "1px solid black", width: "122px" }}>11-20-2023</span>that is currently in effect and that concludes that it is an exempt organization described in section 501(c).
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      b
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                      }}
                    />{" "}
                    I have attached to this form an opinion from U.S. counsel concluding that the entity identified in Part I is described in section 501(c).
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px" }}></td>
                  <td style={{ fontSize: "14px", fontWeight: "600", padding: "10px 0" }}>
                    For section 501(c)(3) organizations only, check either box 13c or box 13d.
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      c
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                      }}
                    />{" "}
                    If the determination letter or opinion of counsel concludes that the entity identified in Part I is described in section 501(c)(3),
                    I certify that the organization is not a private foundation described in section 509. I have attached an affidavit of the
                    organization setting forth sufficient facts for the IRS to determine that the organization is not a private foundation because it
                    meets one of the exceptions described in section 509(a)(1), (2), (3), or (4).
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto" }}>
                      d
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                      }}
                    />{" "}
                    If the determination letter or opinion of counsel concludes that the entity identified in Part I is described in section 501(c)(3), I certify that the organization is a private foundation described in section 509.
                  </td>
                </tr>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>14</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a government of a U.S. possession:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that the entity identified in Part I is a government of a possession of the United States, or is a political subdivision thereof, and is claiming the exemption granted by section 115(2).
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>


            {/* -------------------------------------------------- III --------------------------------------------------------------- */}

            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "10px auto",
              }}
              cellPadding={0}
            >
              <thead>
                <tr
                  style={{
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <td style={{ verticalAlign: "top", width: "120px" }}>
                    {" "}
                    <div
                      style={{
                        background: "black",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "120px",
                        padding: "0px 10px",
                        height: "35px",
                        display: "flex",
                      }}
                    >
                      <p style={{ margin: "auto", fontSize: "18px" }}>Part III</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900", fontSize: "18px" }}>
                    {" "}
                    <strong>
                      Qualification Statement for Chapter 4 Status (if required)
                    </strong>
                  </td>
                </tr>
              </thead>
            </table>


            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "0px auto 10px",
              }}
              cellPadding={0}
            >
              <tbody>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>15</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a nonreporting IGA FFI:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that the entity identified in Part I:
                      </label>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        <ul
                          style={{
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            paddingRight: "0px",
                            margin: "0px",
                          }}
                        >
                          <li>
                            <div style={{}}>
                              <div>
                                Meets the requirements to be considered a nonreporting financial institution pursuant to an applicable IGA between the United States
                              </div>
                              <div style={{ display: "flex" }}>
                                and <div style={{ color: "rgb(5, 5, 129)", borderBottom: "1px solid black", width: "806px" }}></div>;
                              </div>
                            </div>
                          </li>
                          <li>
                            <div style={{ display: "flex" }}>
                              Is treated as a <div style={{ color: "rgb(5, 5, 129)", borderBottom: "1px solid black", width: "415px" }}></div> under the provisions of the applicable IGA (see instructions);<strong>and</strong>
                            </div>
                          </li>
                          <li>
                            If you are an FFI treated as a registered deemed-compliant FFI under an applicable Model 2 IGA, provide your GIIN:
                          </li>
                          <li style={{ display: "flex" }}>
                            &#9654;<div style={{ color: "rgb(5, 5, 129)", borderBottom: "1px solid black", width: "750px" }}></div>
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>16</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a territory financial institution:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that the entity identified in Part I is a financial institution (other than an investment entity) that is incorporated or
                        organized under the laws of a possession of the United States.
                      </label>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>17</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a foreign government (including a political subdivision), government of a U.S. possession, or foreign central bank of issue:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that the entity identified in Part I is the beneficial owner of the payment and is not engaged in commercial financial
                        activities of a type engaged in by an insurance company, custodial institution, or depository institution with respect to the
                        payments, accounts, or obligations for which this form is submitted (except as permitted in Regulations section 1.1471-6(h)(2)).
                      </label>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>18</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For an exempt retirement plan of a foreign government:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong></strong>
                    </label>
                  </td>
                  <td style={{ padding: "0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that the entity identified in Part I:
                      </label>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        <ul
                          style={{
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            paddingRight: "0px",
                            margin: "0px",
                          }}
                        >
                          <li>
                            Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a
                            U.S. possession (each as defined in Regulations section 1.1471-6 or an applicable Model 1 or Model 2 IGA) to provide
                            retirement, disability, or death benefits to beneficiaries or participants that are current or former employees of the sponsor (or
                            persons designated by such employees); <strong>or</strong>
                          </li>
                          <li>
                            Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a
                            U.S. possession (each as defined in Regulations section 1.1471-6 or an applicable Model 1 or Model 2 IGA) to provide
                            retirement, disability, or death benefits to beneficiaries or participants that are not current or former employees of such
                            sponsor, but are in consideration of personal services performed for the sponsor.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>19</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a 501(c) organization:
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto", fontWeight: "bolder" }}>

                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          I certify that the entity identified in Part I is an entity described in section 501(c) but is not an insurance company described in section 501(c)(15).
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", fontWeight: "bolder" }}>20</td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>

                    For a passive NFFE:
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto", fontWeight: "bolder" }}>
                      a
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          I certify that the entity identified in Part I is a foreign entity that is not a financial institution (other than an investment entity organized in a possession of the United States).
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px" }}></td>
                  <td style={{ fontSize: "14px", fontWeight: "600", padding: "10px 0" }}>
                    Check box 20b or 20c, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto", fontWeight: "bolder" }}>
                      b
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          I further certify that the entity identified in Part I has no substantial U.S. owners, <strong>or</strong>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto", fontWeight: "bolder" }}>
                      c
                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          I further certify that the entity identified in Part I has provided a statement including the name, address, and TIN of each
                          substantial U.S. owner of the NFFE (see instructions).
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto", fontWeight: "bolder" }}>
                      21
                    </div>
                  </td>
                  <td style={{ padding: "10px 0", fontWeight: "bolder" }}>
                    <div style={{ display: "flex" }}>

                      <div style={{ display: "flex" }}>
                        <div>
                          Name of sponsoring entity
                        </div>
                        <div style={{ width: "495px", borderBottom: "1px solid", marginLeft: "5px" }}>

                        </div>.
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px", textAlign: "center", display: "flex" }}>
                    <div style={{ margin: "9px auto auto auto", fontWeight: "bolder" }}>

                    </div>
                  </td>
                  <td style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                        }}
                      />{" "}
                      <div style={{ display: "flex" }}>
                        <div>
                          I certify that the entity identified in Part I is a direct reporting NFFE that is sponsored by the entity identified in line 21.
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
            {/* -------------------------------------------------- III end--------------------------------------------------------------- */}

            {/* -------------------------------------------------- IV Certification--------------------------------------------------------------- */}
            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "10px auto",
              }}
              cellPadding={0}
            >
              <thead>
                <tr
                  style={{
                    borderTop: "1px solid #000",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <td style={{ verticalAlign: "top", width: "120px" }}>
                    {" "}
                    <div
                      style={{
                        background: "black",
                        color: "#fff",
                        fontWeight: "bold",
                        width: "120px",
                        padding: "0px 10px",
                        height: "35px",
                        display: "flex",
                      }}
                    >
                      <p style={{ margin: "auto", fontSize: "18px" }}>Part IV</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900", fontSize: "18px" }}>
                    {" "}
                    <strong>
                      Certification
                    </strong>
                  </td>
                </tr>
              </thead>
            </table>
            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                borderCollapse: "collapse",
                margin: "0px auto 10px",
              }}
              cellPadding={0}
            >
              <tbody>
                <tr>
                  <td
                    colSpan={2}

                  >
                    Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the payments
                    of which I am the beneficial owner or any withholding agent that can disburse or make payments of the amounts of which I am
                    the beneficial owner.
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect.
                  </td>
                </tr>


                {/* <tr>
                  <td colSpan={2}>
                    <p style={{ color: "#1133a9",marginBottom:"0px" }}>
                    W-8EXP – Electronic Substitute Form Statement:
                    </p>
                  </td>
                </tr> */}
                <tr>
                  <td colSpan={2} style={{ color: "#1133a9", fontWeight: "600", }}>
                    The Internal Revenue Service does not require your consent to any provisions of this document other than the certifications
                    required to establish your status as a foreign government, international organization, foreign central bank of issue, foreign taxexempt organization, foreign private foundation, or government of a U.S. possession, and your chapter 4 status (if required).
                  </td>
                </tr>

                <tr>
                  <td colSpan={2}>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              display: "flex",
                            }}
                          >
                            <div style={{ minWidth: "maxcontent", marginTop: "auto", marginBottom: "auto" }}>Sign Here</div>
                            <div style={{ height: "0px", width: "0px", borderTop: "25px solid transparent", borderLeft: "16px solid #000000", borderBottom: "25px solid transparent", marginLeft: "5px" }}></div>
                          </td>
                          <td style={{ width: "85%", fontSize: "11px" }}>
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
                                      width: "55%",
                                      color: "#1133a9",
                                      verticalAlign: "bottom",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "table",
                                        borderBottom: "1px solid #000",
                                        width: "100%",
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "table-cell",
                                          textAlign: "left",
                                          width: "60%",
                                          fontWeight: "600",
                                        }}
                                      >
                                        111
                                      </span>
                                      <span
                                        style={{
                                          display: "table-cell",
                                          width: "30%",
                                        }}
                                      >
                                        {" "}

                                      </span>
                                    </div>
                                  </td>

                                  <td
                                    style={{

                                      padding: "0 10px",
                                      color: "#1133a9",
                                      verticalAlign: "bottom",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "table",
                                        borderBottom: "1px solid #000",
                                        width: "100%"

                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "table-cell",
                                          textAlign: "left",
                                          width: "60%",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {values.signedBy}
                                      </span>

                                    </div>
                                  </td>

                                  <td
                                    style={{
                                      width: "20%",
                                      borderBottom: "1px solid #000",
                                      color: "#1133a9",
                                      fontWeight: "600",
                                    }}
                                  >
                                    17-10-2023
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      width: "50%",
                                      color: "#1133a9",
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <p >
                                      <span style={{ fontSize: "8px" }}>
                                        Self Certified Electronic Signature Of The Individual Authorized To Sign For The Beneficial Owner.
                                      </span>
                                      <br></br>
                                      <span style={{ fontSize: "14px" }}> (Self certification electronic signature)</span>

                                    </p>
                                  </td>
                                  <td style={{

                                    padding: "0 10px", textAlign: "center"
                                  }}
                                  >
                                    Print Name
                                  </td>
                                  <td
                                    style={{
                                      width: "20%",
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
                <tr>
                  <td colSpan={2}>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              display: "flex",
                            }}
                          >

                          </td>
                          <td style={{ width: "85%", fontSize: "11px" }}>
                            <table
                              style={{
                                borderCollapse: "collapse",
                                width: "100%",
                              }}
                              cellSpacing="10"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked
                                      name=""
                                      id=""
                                      style={{
                                        background: "#fff",
                                        border: "1px solid #000",
                                        marginRight: "10px",
                                        marginBottom: "auto",
                                      }}
                                    />

                                    <strong>

                                      I certify that I have the capacity to sign for the entity identified on line 1 of this form.◘
                                    </strong>

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
          </section>
          <section>
            <table
              style={{
                width: "100%",
                maxWidth: "920px",
                color: "#000",
                borderCollapse: "collapse",
                margin: "auto",
              }}
            >
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
                        <tr style={{ fontSize: "13px" }}>
                          <td style={{ width: "40%", fontSize: "15px" }}>
                            <strong>

                            </strong>
                          </td>
                          <td style={{ width: "10%", color: "#1133a9" }}></td>
                          <td style={{ width: "20%", textAlign: "center" }}>

                          </td>
                          <td style={{ width: "30%", textAlign: "center" }}>
                            Form{" "}
                            <span
                              style={{ fontSize: "17px", fontWeight: "bold" }}
                            >
                              W-8EXP
                            </span>{" "}
                            (Rev. 10-2021)
                          </td>
                        </tr>
                        <tr style={{ fontSize: "13px", fontWeight: "500" }}>
                          <td style={{ width: "40%", color: "#1133a9", fontWeight: "600", }}>
                            Electronic Submission Confirmation:
                          </td>
                          <td style={{ width: "10%", color: "#1133a9", fontWeight: "600", }}>
                            YVQ7NL
                          </td>
                          <td
                            style={{
                              width: "20%",
                              color: "#1133a9",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            Email Address :
                          </td>
                          <td style={{ width: "30%", color: "#1133a9", textAlign: "center" }}>
                            <a href="mailto:abhay.singh2@mail.com" style={{ color: "#1133a9", fontWeight: "600", }}>
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
          </section>

          {/* -------------------------------------------------- IV Certification end--------------------------------------------------------------- */}

          <section style={{ breakAfter: 'page', breakBefore: 'page' }}>
            <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: "920px", margin: "40px auto" }}>
              <thead>
                <tr>
                  <td colSpan={4} style={{ fontSize: "32px", fontWeight: "bold", color: "#000", paddingBottom: "20px" }}> Tax Jurisdictions </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4}>
                    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "18px" }} cellPadding={10}>
                      <thead>
                        <tr>

                          <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold" }}>Country</td>
                          <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold" }}>TIN Type </td>
                          <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold" }}>Tax Identification</td>
                          <td style={{ border: "2px solid #000", textAlign: "center", fontWeight: "bold" }}>TIN Unavailable</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "2px solid #000" }}>Antarctica</td>
                          <td style={{ border: "2px solid #000" }}>Foreign</td>
                          <td style={{ border: "2px solid #000" }}>DCD12</td>
                          <td style={{ border: "2px solid #000" }}>False</td>
                        </tr>
                        <tr>
                          <td style={{ border: "2px solid #000" }}>United States</td>
                          <td style={{ border: "2px solid #000" }}>QIEIN</td>
                          <td style={{ border: "2px solid #000" }}>11-1111111</td>
                          <td style={{ border: "2px solid #000" }}>False</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section style={{ breakAfter: "page", breakBefore: "page" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "40px auto",
                fontSize: "17px",
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
                  <td style={{ width: "50%" }}>{lValues.entityName}</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Capacity:</td>
                  <td style={{ width: "50%" }}>Capacity Not Requested</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Form Filed:</td>
                  <td style={{ width: "50%" }}>W-8EXP (July 2017)</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Date:</td>
                  <td style={{ width: "50%" }}>111-28-2023</td>
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
                      href={lValues.contactEmail}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      {lValues.contactEmail}
                    </a>{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Contact cell number:</td>
                  <td style={{ width: "50%" }}> </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Day time contact number:</td>
                  <td style={{ width: "50%" }}> {lValues.primaryContactNumber}</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>
                    Day time Alternate contact number:
                  </td>
                  <td style={{ width: "50%" }}>{lValues.alternativeNumber}</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>
                    Day time Alternate contact number:
                  </td>
                  <td style={{ width: "50%" }}> {lValues.alternativeNumber1}</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Signatory email address:</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>
                    Forms Exchange Agent (Business Unit):
                  </td>
                  <td style={{ width: "50%" }}>ValueCoders</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Agent Contact Name:</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Agent Telephone Number:</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Agent Email Address:</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Hybrid status:</td>
                  <td style={{ width: "50%" }}>Not Applicable</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Hybrid status attachment:</td>
                  <td style={{ width: "50%" }}>No</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>
                    Hybrid status additional information:
                  </td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Entity type:</td>
                  <td style={{ width: "50%" }}>U.S. Branch</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section style={{ breakAfter: "page", breakBefore: "page" }}>
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
            {/* <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "20px auto",
                fontSize: "17px",
              }}
              cellPadding={10}
            >
              <tbody>
                <tr>
                  <td colSpan={2} style={{ padding: "0" }}>
                    <div
                      style={{
                        border: "2px solid #000",
                        padding: "10px 20px",
                        margin: "5px 0",
                      }}
                    >
                      <h5><strong>Form vs Country Conflict Additional Information:</strong> </h5>
                      <p style={{ marginBottom: "0" }}>
                      I am the spouse or unmarried child (under age 21) of a foreign student, teacher, trainee, intern,
                      exchange visitor, international organization employee, or foreign government-related individual,
                      who lives at the same address.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table> */}

            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "20px auto 20px",
                fontSize: "17px",
                border: "2px solid #000",
              }}
              cellPadding={10}
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
                  <td style={{ borderBottom: "2px solid #000" }}>Not Applicable</td>
                </tr>
              </tbody>
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "0px auto",
                fontSize: "17px",
              }}
              cellPadding={10}
            >
              <tbody>
                <tr>
                  <td colSpan={2} style={{ padding: "0" }}>
                    <div
                      style={{
                        border: "2px solid #000",
                        padding: "10px 20px",
                        margin: "5px 0",
                      }}
                    >
                      <h5>
                        Warning Notification Override issue Number and type:
                      </h5>
                      <ol start={1}>
                        <li>TIN154 - TIN</li>
                        <li>TIN109 - TIN</li>
                        <li>SIG101 - SIGNATURE</li>
                        <li>ICOR114 - Country of Incorp</li>
                        <li>FTIN101 - TIN</li>
                        <li>IGA105 - IGA</li>
                        <li>TIN139 - TIN</li>
                      </ol>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
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
                    © Comply Exchange Ltd.2023 - Version: {Version} - Render
                    Time:8.6691538s
                  </Typography>
                  <div className="col-12 col-sm-8 col-md-6 col-lg-6 footer_nav">
                    <ul className="nav inner_header_right"></ul>
                  </div>
                </div>
              </footer>
            </div>
          </section>
        </div>

      </section>


    </>
  )
}