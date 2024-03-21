"use client";

import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";

export default function FormW8IMY() {
  const contentRef: any = useRef(null);
  //  const boxRef = useRef<HTMLDivElement>(null);
  const [pageData, setPageData]: any = useState();

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

  return (
    <>
      <section ref={contentRef} style={{fontSize:"12px"}}>
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
                        W-8BEN-E
                      </strong>
                    </p>
                    <p style={{ margin: "15px 0" }}>(Rev. October 2021)</p>
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
                      Certificate of Foreign Intermediary, Foreign Flow-Through
                      Entity, or Certain U.S. Branches for United States Tax
                      Withholding and Reporting
                    </h1>
                    <ul
                      style={{
                        listStyle: "none",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        paddingLeft: "0",
                      }}
                    >
                      <li>
                        &#9658; Section references are to the Internal Revenue
                        Code.
                      </li>
                      <li>
                        &#9658; Go to www.irs.gov/FormW8IMY for instructions and
                        the latest information.
                      </li>
                      <li>
                        &#9658; Give this form to the withholding agent or
                        payer. Do not send to the IRS.
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
                      UID : 6utykj
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
                    <h5>Form W-8BEN-E</h5>
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
                      }}
                    >
                      <li style={{ marginBottom: "6px" }}>
                        A beneficial owner solely claiming foreign status or
                        treaty benefits (other than a qualified intermediary
                        (QI) acting as a qualified derivatives dealer (QDD)) . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                        . . . . . . . . . .W-8BEN or W-8BEN-E
                      </li>
                      <li style={{ marginBottom: "6px" }}>
                        A hybrid entity claiming treaty benefits on its own
                        behalf (other than a QI acting as a QDD) . . . . . . . .
                        . . . . . . . . . . . . . W-8BEN-E
                      </li>
                      <li style={{ marginBottom: "6px" }}>
                        A foreign person claiming that income is effectively
                        connected with the conduct of a trade or business in the
                        United States . . . . . W-8ECI
                      </li>
                      <li>
                        A disregarded entity with a single foreign owner that is
                        the beneficial owner (other than a QI acting as a QDD)
                        of the income to which this form relates. Instead, the
                        single foreign owner should use . . . . . . . . . . . .
                        . . . . . . W-8BEN, W-8ECI, or W-8BEN-E
                      </li>
                      <li>
                        A foreign government, international organization,
                        foreign central bank of issue, foreign tax-exempt
                        organization, foreign private foundation, or government
                        of a U.S. possession claiming the applicability of
                        section(s) 115(2), 501(c), 892, 895, or 1443(b) . . . .
                        . . . . . . W-8EXP
                      </li>
                      <li>
                        U.S. entity or U.S. citizen or resident . . . . . . . .
                        . . . . . . . . . . . . . . . . . . . . . . . . W-9
                      </li>
                      <li>
                        {" "}
                        A foreign person documenting itself for purposes of
                        section 6050W . . . . . . . . . . . . . . W-8BEN,
                        W-8BEN-E, or W-8ECI
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
                      <p style={{ margin: "auto" }}>Part I</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
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
                        1.
                      </div>
                      <div style={{ float: "left" }}>
                        Name of organization that is acting as intermediary .
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
                        2.
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
                  <td colSpan={2}>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
                      cellPadding={0}
                    >
                      <tbody>
                        <tr>
                          <td
                            colSpan={2}
                            style={{
                              borderBottom: "1px solid #000",
                              padding: "5px 10px",
                              width: "70%",
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
                                3.
                              </div>
                              <div style={{ float: "left" }}>
                                Name of disregarded entity (if applicable), see
                                instructions.
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
                              Lorem Ipsum asd1
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
                    <div style={{ width: "100%", display: "table" }}>
                      <div
                        style={{
                          float: "left",
                          paddingRight: "10px",
                          width: "20px",
                        }}
                      >
                        4.
                      </div>
                      <div style={{ float: "left" }}>
                        Chapter 3 Status (entity type) (Must check one box
                        only.):
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
                          <input type="checkbox" name="" id="" /> &nbsp; QI
                          (including a QDD). Complete Part III
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Withholding foreign trust. Complete Part VII.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Nonqualified intermediary. Complete Part IV.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Nonwithholding foreign partnership. Complete Part
                          VIII.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Territory financial institution. Complete Part V.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Nonwithholding foreign simple trust. Complete Part
                          VIII.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp; U.S.
                          branch. Complete Part VI.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Nonwithholding foreign grantor trust. Complete Part
                          VIII.
                        </li>
                        <li style={{ width: "50%", display: "flex" }}>
                          <input type="checkbox" name="" id="" /> &nbsp;
                          Withholding foreign partnership. Complete Part VII..
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
                        5.
                      </div>
                      <div
                        style={{
                          width: "calc(100% - 20px)",
                          display: "table-cell",
                        }}
                      >
                        Chapter 4 Status (FATCA status) (See instructions for
                        details and complete the certification below for the
                        entity’s applicable status.) (Must check one box only.):
                      </div>
                    </div>
                    <div
                      style={{
                        width: "calc(100% - 15px)",
                        display: "flex",
                        flexFlow: "row",
                        marginTop: "10px",
                        fontSize: "14px",
                        lineHeight: "1.3",
                      }}
                    >
                      <ul
                        style={{
                          width: "50%",
                          display: "flex",
                          flexFlow: "column",
                          listStyle: "none",
                          paddingLeft: "20px",
                          gap: "5px",
                        }}
                      >
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "top" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Nonparticipating foreign financial institution (FFI)
                          (including an FFI related to a Reporting IGA FFI other
                          than a deemed-compliant FFI, participating FFI, or
                          exempt beneficial owner). Complete Part IX (if
                          applicable).
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "top" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Participating FFI.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "top" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Reporting Model 1 FFI.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" checked />
                          </span>{" "}
                          Reporting Model 2 FFI.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Registered deemed-compliant FFI (other than a
                          reporting Model 1 FFI, sponsored FFI, or nonreporting
                          IGA FFI covered in Part XIX).
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Territory financial institution. Complete Part V.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Sponsored FFI (other than a certified deemed-compliant
                          sponsored, closely held investment vehicle). Complete
                          Part X.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>{" "}
                          Certified deemed-compliant nonregistering local bank.
                          Complete Part XII.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Certified deemed-compliant FFI with only low-value
                          accounts. Complete Part XIII.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Certified deemed-compliant sponsored, closely held
                          investment vehicle. Complete Part XIV.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Certified deemed-compliant limited life debt
                          investment entity. Complete Part XV.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Certain investment entities that do not maintain
                          financial accounts. Complete Part XVI{" "}
                        </li>
                      </ul>
                      <ul
                        style={{
                          width: "50%",
                          display: "flex",
                          flexFlow: "column",
                          listStyle: "none",
                          paddingLeft: "20px",
                          gap: "10px",
                        }}
                      >
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Owner-documented FFI. Complete Part XI
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Restricted distributor. Complete Part XVII.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Foreign central bank of issue. Complete Part XVIII.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Nonreporting IGA FFI. Complete Part XIX.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Exempt retirement plans. Complete Part XX.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Excepted nonfinancial group entity. Complete Part XXI.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Excepted nonfinancial start-up company. Complete Part
                          XXII.{" "}
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Excepted nonfinancial entity in liquidation or
                          bankruptcy. Complete Part XXIII.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Publicly traded NFFE or NFFE affiliate of a publicly
                          traded corporation. Complete Part XXIV.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Excepted territory NFFE. Complete Part XXV
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Active NFFE. Complete Part XXVI.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Passive NFFE. Complete Part XXVII.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Direct reporting NFFE.
                        </li>
                        <li style={{ display: "flex", gap: "10px" }}>
                          <span style={{ verticalAlign: "middle" }}>
                            <input type="checkbox" name="" id="" />
                          </span>
                          Sponsored direct reporting NFFE. Complete Part XXVIII.
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
                        6.
                      </div>
                      <div
                        style={{
                          width: "calc(100% - 20px)",
                          display: "table-cell",
                        }}
                      >
                        Permanent residence address (street, apt. or suite no.,
                        or rural route). (Must check one box only.):
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
                      asd1, asd1
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
                            City or town, state or province. Include postal code
                            where appropriate.
                            <p
                              style={{
                                color: "rgb(5, 5, 129)",
                                width: "100%",
                                margin: "6px 0 0",
                                lineHeight: "1.4",
                              }}
                            >
                              asd1, AS, asd1
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
                              United States
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
                      <div style={{ paddingRight: "10px", width: "20px" }}>
                        8.
                      </div>
                      <div style={{ width: "40%" }}>
                        {" "}
                        U.S. taxpayer identification number, if required &#9654;{" "}
                      </div>
                      <div
                        style={{
                          width: "150px",
                          color: "rgb(5, 5, 129)",
                          borderBottom: "1px solid #000",
                        }}
                      >
                        12-3456213
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ width: "25%", display: "flex", gap: "10px" }}
                      >
                        <input type="checkbox" name="" id="" /> QI-EIN
                      </div>
                      <div
                        style={{ width: "25%", display: "flex", gap: "10px" }}
                      >
                        <input type="checkbox" name="" id="" /> WP-EIN
                      </div>
                      <div
                        style={{ width: "25%", display: "flex", gap: "10px" }}
                      >
                        <input type="checkbox" name="" id="" /> WT-EIN
                      </div>
                      <div
                        style={{ width: "25%", display: "flex", gap: "10px" }}
                      >
                        <input type="checkbox" name="" id="" /> EIN
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
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>9a.</div>
                      <div> GIIN (if applicable) &#9654;</div>
                      <div
                        style={{
                          color: "rgb(5, 5, 129)",
                          borderBottom: "1px solid #000",
                          width: "75%",
                        }}
                      >
                        12-3456213
                      </div>
                    </div>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px", width: "20px" }}>
                        b.
                      </div>
                      <div>
                        Foreign taxpayer identification number, if required
                        &#9654;
                      </div>
                      <div
                        style={{
                          color: "rgb(5, 5, 129)",
                          borderBottom: "1px solid #000",
                          width: "50%",
                        }}
                      >
                        12-3456213
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>10.</div>
                      <div style={{ width: "40%" }}>
                        {" "}
                        Reference number(s) (see instructions){" "}
                      </div>
                    </div>
                    <p
                      style={{
                        width: "100%",
                        color: "rgb(5, 5, 129)",
                        marginBottom: "0px",
                      }}
                    >
                      12-3456213
                    </p>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ borderTop: "2px solid #000" }}>
                    For Paperwork Reduction Act Notice, see separate
                    instructions.
                  </td>
                  <td style={{ borderTop: "2px solid #000" }}>
                    <div style={{ display: "flex", paddingLeft: "20px" }}>
                      <div style={{ width: "50%" }}>Cat. No. 25402Q</div>
                      <div style={{ width: "50%" }}>
                        Form <strong>W-8IMY</strong> (Rev. 10-2021)
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </section>
          <section style={{ breakAfter: "page", breakBefore: "page" }}>
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
                  <td style={{ verticalAlign: "top" }}>
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
                      <p style={{ margin: "auto" }}>Part II</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px" }}>
                    <strong>
                      Disregarded Entity or Branch Receiving Payment.
                    </strong>{" "}
                    (Complete only if a disregarded entity with a GIIN or a
                    branch of an FFI in a country other than the FFI’s country
                    of residence. Do not complete Part II for QDD branches. See
                    instructions.){" "}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      borderBottom: "1px solid #000",
                      padding: "5px 10px",
                    }}
                  >
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px", lineHeight: "1.3" }}>
                        11.
                      </div>
                      <div style={{ lineHeight: "1" }}>
                        {" "}
                        Chapter 4 Status (FATCA status) of disregarded entity or
                        branch receiving payment.{" "}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexFlow: "row wrap" }}>
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <input type="checkbox" name="" id="" /> Branch treated
                        as nonparticipating FFI.
                      </div>
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <input type="checkbox" name="" id="" /> Reporting Model
                        1 FFI.
                      </div>
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <input type="checkbox" name="" id="" /> U.S. Branch.
                      </div>
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <input type="checkbox" name="" id="" /> Participating
                        FFI.
                      </div>
                      <div
                        style={{
                          width: "33.33%",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <input type="checkbox" name="" id="" /> Reporting Model
                        2 FFI.
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
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>12.</div>
                      <div>
                        {" "}
                        Address of branch (street, apt. or suite no., or rural
                        route).{" "}
                        <strong>
                          Do not use a P.O. box or in-care-of address
                        </strong>{" "}
                        (other than a registered address).
                      </div>
                    </div>
                    <p
                      style={{
                        width: "100%",
                        marginLeft: "30.72px",
                        marginBottom: "0px",
                        minHeight: "24px",
                      }}
                    ></p>
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
                            City or town, state or province. Include postal code
                            where appropriate.
                            <p
                              style={{
                                color: "rgb(5, 5, 129)",
                                width: "100%",
                                margin: "6px 0 0",
                                lineHeight: "1.4",
                              }}
                            >
                              asd1, AS, asd1
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
                              United States
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
                      <div style={{ paddingRight: "10px" }}>13.</div>
                      <div>GIIN (if any) &#9654;</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "900",
                      paddingBottom: "10px",
                    }}
                  >
                    Chapter 3 Status Certifications
                  </td>
                </tr>
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
                      <p style={{ margin: "auto" }}>Part III</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Qualified Intermediary</strong>
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
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    All Qualified Intermediaries
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30.72px" }}>14</td>
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
                    I certify that the entity identified in Part I (or branch,
                    if relevant):
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <ul style={{ marginBottom: "0px" }}>
                      <li>
                        {" "}
                        Is a QI with respect to the accounts identified on line
                        10 or in a withholding statement associated with this
                        form (as required) that is one or more of the following:
                      </li>
                    </ul>
                    <ul
                      style={{
                        listStyleType: "none",
                        paddingLeft: "28px",
                        marginBottom: "0px",
                      }}
                    >
                      <li>
                        <strong>(i)</strong> Not acting for its own account;
                      </li>
                      <li>
                        <strong>(ii)</strong> A QDD receiving payments on
                        underlying securities and/or potential section 871(m)
                        transactions;
                      </li>
                      <li>
                        <strong>(iii)</strong> A QI assuming primary withholding
                        responsibility for payments of substitute interest, as
                        permitted by the QI Agreement.
                      </li>
                    </ul>
                    <ul style={{ marginBottom: "0px" }}>
                      <li>
                        {" "}
                        Has provided or will provide a withholding statement (as
                        required) for purposes of chapters 3 and 4, and section
                        1446(a), or section 1446(f), subject to the
                        certifications made on this form.
                      </li>
                      <li>
                        To the extent it acts as a disclosing QI for purposes of
                        section 1446(a) or (f) for payments associated with this
                        form, the QI is to provide the required payee
                        documentation to associate with an amount realized or an
                        amount subject to withholding on a PTP distribution.
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
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
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Qualified Intermediaries When Not Acting As Qualified
                    Derivatives Dealers (check all that apply)
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>15a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />{" "}
                    I certify that the entity identified in Part I of this form
                    assumes primary withholding responsibility for purposes of
                    chapters 3 and 4 for each account identified on a
                    withholding statement attached to this form (or, if no
                    withholding statement is attached to this form, for all
                    accounts).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    assumes primary withholding and reporting responsibility for
                    each payment of an amount realized from the sale of an
                    interest in a publicly traded partnership under section
                    1446(f) associated with each account identified on a
                    withholding statement attached to this form for receiving
                    such amounts (or, if no withholding statement is attached to
                    this form, for all accounts).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    assumes primary withholding as a nominee under Regulations
                    section 1.1446-4(b)(3) for each distribution by a publicly
                    traded partnership associated with each account identified
                    on a withholding statement attached to this form for
                    receiving such distributions (or, if no withholding
                    statement is attached to this form, for all accounts).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>d </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    is a QI acting as a qualified securities lender assuming
                    primary withholding and reporting responsibilities with
                    respect to payments that are U.S. source substitute
                    dividends received from the withholding agent associated
                    with each account identified on a withholding statement
                    attached to this form (or, if no withholding statement is
                    attached to this form, for all accounts).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>e </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    assumes primary withholding responsibility for purposes of
                    chapters 3 and 4 and primary Form 1099 reporting and backup
                    withholding responsibility for all payments of U.S. source
                    interest and substitute interest associated with this form,
                    as permitted by the QI Agreement.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>f </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    assumes primary Form 1099 reporting and backup withholding
                    responsibility or reporting responsibility as a
                    participating FFI or registered deemed-compliant FFI with
                    respect to accounts that it maintains that are held by
                    specified U.S. persons as permitted under Regulations
                    sections 1.6049-4(c)(4)(i) or (c)(4)(ii) in lieu of Form
                    1099 reporting for each account identified on a withholding
                    statement attached to this form (or, if no withholding
                    statement is attached to this form, for all accounts).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>g </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    does not assume primary Form 1099 reporting and backup
                    withholding responsibility for each account identified on a
                    withholding statement attached to this form (or, if no
                    withholding statement is attached to this form, for all
                    accounts).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>h </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    (Complete only to the extent the entity identified in Part I
                    of this form does not assume primary Form 1099 reporting and
                    backup withholding responsibility.) If the entity identified
                    in Part I of this form has allocated or will allocate a
                    portion of a payment to a chapter 4 withholding rate pool of
                    U.S. payees on a withholding statement associated with this
                    form, I certify that the entity meets the requirements of
                    Regulations section 1.6049-4(c)(4)(iii) with respect to any
                    account holder of an account it maintains that is included
                    in such a withholding rate pool.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>i </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    (Complete only to the extent the entity identified in Part I
                    of this form does not assume primary Form 1099 reporting and
                    backup withholding responsibility.) If the entity identified
                    in Part I of this form has allocated or will allocate a
                    portion of a payment to a chapter 4 withholding rate pool of
                    U.S. payees on a withholding statement associated with this
                    form, to the extent the U.S. payees are account holders of
                    an intermediary or flowthrough entity receiving a payment
                    from the entity, I certify that the entity has obtained, or
                    will obtain, documentation sufficient to establish each such
                    intermediary or flow-through entity status as a
                    participating FFI, registered deemed-compliant FFI, or FFI
                    that is a QI.
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Qualified Derivatives Dealers
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>16a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that each QDD identified in Part I of this form or
                    on a withholding statement associated with this form meets
                    the requirements to act as a QDD (including approval by the
                    IRS to so act) and assumes primary withholding and reporting
                    responsibilities under chapters 3, 4, and 61 and section
                    3406 with respect to any payments it makes with respect to
                    potential section 871(m) transactions.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                        opacity: "0",
                      }}
                    />
                    Entity classification of QDD:
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                        marginLeft: "10px",
                      }}
                    />
                    Corporation
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                        marginLeft: "10px",
                      }}
                    />
                    Partnership
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                        marginLeft: "10px",
                      }}
                    />
                    Disregarded Entity
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part IV----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part IV</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Nonqualified Intermediary</strong>
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
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check all that apply.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>17a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    (All nonqualified intermediaries and QIs that are not acting
                    in their capacity as such check here.) I certify that the
                    entity identified in Part I of this form is not acting as a
                    QI with respect to each account(s) for which this form is
                    provided and is not acting for its own account.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div>
                      I certify that the entity identified in Part I of this
                      form is using this form to transmit withholding
                      certificates and/or other documentation and has provided,
                      or will provide, a withholding statement, as required.
                      <strong> Note: </strong>If this form is provided for
                      purposes of the entity’s interest in a publicly traded
                      partnership, see the instructions for Part IV before
                      checking this <strong>box.</strong>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    meets the requirements of Regulations section
                    1.6049-4(c)(4)(iii) with respect to any account holder of an
                    account it maintains that is included in a withholding rate
                    pool of U.S. payees provided on a withholding statement
                    associated with this form (excluding a distribution from a
                    publicly traded partnership).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>d </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I of this form
                    is acting as a qualified securities lender (other than a QI)
                    assuming primary withholding and reporting responsibilities
                    with respect to payments associated with this form that are
                    U.S. source substitute dividends received from the
                    withholding agent.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>e </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    To the extent that the entity identified in Part I of this
                    form is providing an alternative withholding statement
                    described in Regulations section 1.1441-1(e)(3)(iv)(C)(3)
                    for any payments associated with the form, the entity
                    represents that the information on all of the withholding
                    statements associated with this withholding certificate have
                    been (or will be) verified for inconsistency with any other
                    account information the entity has for the beneficial owners
                    for determining the rate of withholding with respect to each
                    payee (applying the standards of knowledge under section
                    1441 or section 1471, as applicable).
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part IV end----------------------- */}

            {/* ---------------------Part V  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part V</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Territory Financial Institution</strong>
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>18a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a
                    financial institution (other than an investment entity that
                    is not also a depository institution, custodial institution,
                    or specified insurance company) that is incorporated or
                    organized under the laws of a territory of the United
                    States.
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the box on line 18b or 18c, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I further certify that the entity identified in Part I is
                    using this form as evidence of its agreement with the
                    withholding agent to be treated as a U.S. person for
                    purposes of chapters 3 and 4 with respect to any reportable
                    amounts and withholdable payments associated with this
                    withholding certificate.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I further certify that the entity identified in Part I:
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
                            Is using this form to transmit withholding
                            certificates and/or other documentation for the
                            persons for whom it receives a payment of a
                            reportable amount or a withholdable payment; and
                          </li>
                          <li>
                            Has provided or will provide a withholding
                            statement, as required.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the boxes on lines 18d, and 18e or 18f, as applicable.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>d </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I agrees to be
                    treated as a U.S. person under Regulations section
                    1.1446(f)-4(a)(2)(i)(B) with respect to amounts realized on
                    sales of interests in publicly traded partnerships.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>e </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div>
                      I certify that the entity identified in Part I agrees to
                      be treated as a U.S. person (as described in Regulations
                      section 1.1441-1(b)(2)(iv)(A)) and as a nominee under
                      Regulations section 1.1446-4(b)(3) with respect to
                      distributions by publicly traded partnerships,{" "}
                      <strong>or</strong>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>f </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div>
                      Is not acting as a nominee for distributions from publicly
                      traded partnerships and is providing withholding
                      statements for the distributions.
                      <strong>Note:</strong> If this form is provided for an
                      amount realized, see the instructions for Part V before
                      providing a withholding statement for an amount realized
                      when the entity does not check the box on line 18d.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part V end----------------------- */}

            {/* ---------------------Part VI  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part VI</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Certain U.S. Branches</strong>
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>19a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
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
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a U.S.
                    branch receiving reportable amounts or withholdable payments
                    that are not income effectively connected with the conduct
                    of a trade or business in the United States, distributions
                    from publicly traded partnerships, or amounts realized on
                    sales of interests in publicly traded partnerships.
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the box on line 19b or 19c, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
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
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a U.S.
                    branch of a foreign bank or insurance company described in
                    Regulations section 1.1441-1(b)(2)(iv)(A) that is using this
                    form as evidence of its agreement with the withholding agent
                    to be treated as a U.S. person with respect to any
                    reportable amounts or withholdable payments associated with
                    this withholding certificate.
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
                      <strong>c </strong>
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
                            Is using this form to transmit withholding
                            certificates and/or other documentation for the
                            persons for whom the branch receives a payment of a
                            reportable amount;
                          </li>
                          <li>
                            Has provided or will provide a withholding
                            statement, as required. <strong>and</strong>
                          </li>
                          <li>
                            In the case of a withholdable payment, is applying
                            the rules described in Regulations section
                            1.1471-4(d)(2)(iii)(C).
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the boxes on lines 19d, and 19e or 19f, as applicable.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>d </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
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
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a U.S.
                    branch (as described in Regulations section
                    1.1446(f)-4(a)(2)(i)(B)) that is acting as a U.S. person
                    with respect to amounts realized on the sales of interests
                    in publicly traded partnerships,
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>e </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a U.S.
                    branch (as described in Regulations section
                    1.1441-1(b)(2)(iv)(A)) that is treated as a U.S. person and
                    as a nominee with respect to distributions by publicly
                    traded partnerships under Regulations section
                    1.1446-4(b)(3), or
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>f </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px", margin: "0px" }}>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        Is not acting as a nominee for distributions from
                        publicly traded partnerships and is providing
                        withholding statements for the distributions.
                        <strong>Note:</strong> If this form is provided for an
                        amount realized, see the instructions for Part VI before
                        providing a withholding statement for an amount realized
                        when the U.S. branch does not check the box on line 19d.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part VI end ----------------------- */}

            {/* ---------------------Part VII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part VII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      Withholding Foreign Partnership (WP) or Withholding
                      Foreign Trust (WT)
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>20 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
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
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a
                    withholding foreign partnership or a withholding foreign
                    trust that is compliant with the terms of its WP or WT
                    agreement.
                  </td>
                </tr>
              </tbody>
            </table>
            {/* ---------------------Part VII end  ----------------------- */}

            {/* ---------------------Part VIII   ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part VIII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      Nonwithholding Foreign Partnership, Simple Trust, or
                      Grantor Trust
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
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check all that apply.
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>21a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px", margin: "0px" }}>
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
                            Is a nonwithholding foreign partnership, a
                            nonwithholding foreign simple trust, or a
                            nonwithholding foreign grantor trust and is
                            providing this form for payments that are not
                            effectively connected, or are not treated as
                            effectively connected, with the conduct of a trade
                            or business in the United States;{" "}
                            <strong> and</strong>
                          </li>
                          <li>
                            Is using this form to transmit withholding
                            certificates and/or other documentation and has
                            provided or will provide a withholding statement, as
                            required for purposes of chapters 3 and 4, that is
                            subject to the certifications made on this form.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a foreign
                    partnership or foreign grantor trust that is a partner in a
                    lower-tier partnership and is providing this Form W-8BEN-E for
                    purposes of section 1446(a).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a foreign
                    partnership receiving an amount realized on the transfer of
                    an interest in a partnership for purposes of section
                    1446(f).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>d </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a foreign
                    partnership providing a withholding statement for a modified
                    amount realized from the transfer (check, when applicable,
                    only if box 21c is checked).
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>e </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a foreign
                    grantor trust providing the form on behalf of each grantor
                    or other owner of the trust under Regulations section
                    1.1446(f)-1(c)(2)(vii) that is transmitting withholding
                    certificates and providing a withholding statement to
                    allocate the amount realized to each grantor or other owner.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>f </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    To the extent the entity identified in Part I of this form
                    is providing an alternative withholding statement described
                    in Regulations section 1.1441-1(e)(3)(iv)(C)(3) for any
                    payments associated with the form, the entity represents
                    that the information on all of the withholding certificates
                    associated with the withholding statement may be relied on
                    based on the standards of knowledge under section 1441 or
                    section 1471 applicable to the entity.
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part VIII end  ----------------------- */}

            {/* ---------------------Part IX   ----------------------- */}

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
                <tr style={{ borderTop: "1px solid #000000" }}>
                  <td
                    colSpan={2}
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "900",
                      paddingBottom: "10px",
                    }}
                  >
                    Chapter 4 Status Certifications
                  </td>
                </tr>
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
                      <p style={{ margin: "auto" }}>Part IX</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Qualified Intermediary</strong>
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>22 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
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
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is using this
                    form to transmit withholding certificates and/or other
                    documentation and has provided or will provide a withholding
                    statement that indicates the portion of the payment
                    allocated to one or more exempt beneficial owners
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part IX end  ----------------------- */}

            {/* ---------------------Part X  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part X</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Sponsored FFI</strong>
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
                  <td colSpan={2}>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>
                        <label>
                          <strong>23a </strong>
                        </label>
                      </div>
                      <div> Name of sponsoring entity: &#9654;</div>
                      <div
                        style={{
                          color: "rgb(5, 5, 129)",
                          borderBottom: "1px solid #000",
                          width: "70%",
                        }}
                      >
                        12-3456213
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the box on line 23b or 23c, whichever applies.
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px", margin: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>

                      I certify that the entity identified in Part I:
                      </label>
                      <p style={{ padding: "0px", margin: "0px" }}>
                        <ul style={{        paddingTop: "0px",
                              paddingBottom: "0px",
                              paddingRight: "0px",
                              margin: "0px",}}>
                          <li>Is an investment entity;</li>
                          <li>
                            Is not a QI, WP (except to the extent permitted in the
                            withholding foreign partnership agreement), or WT;{" "}
                            <strong>and</strong>
                          </li>
                          <li>
                            Has agreed with the entity identified above (that is
                            not a nonparticipating FFI) to act as the sponsoring
                            entity for this entity
                          </li>
                        </ul>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px", margin: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                        I certify that the entity identified in Part I:
                      </label>
                    <p style={{ padding: "0px", margin: "0px" }}>
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Is a controlled foreign corporation as defined in
                          section 957(a);
                        </li>
                        <li>Is not a QI, WP, or WT;</li>
                        <li>
                          Is wholly owned, directly or indirectly, by the U.S.
                          financial institution identified above that agrees to
                          act as the sponsoring entity for this entity;
                          <strong>and</strong>
                        </li>
                        <li>
                          Shares a common electronic account system with the
                          sponsoring entity (identified above) that enables the
                          sponsoring entity to identify all account holders and
                          payees of the entity and to access all account and
                          customer information maintained by the entity
                          including, but not limited to, customer identification
                          information, customer documentation, account balance,
                          and all payments made to account holders or payees.
                        </li>
                      </ul>
                    </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part X end   ----------------------- */}

            {/* ---------------------Part XI      ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XI</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Owner-Documented FFI</strong>
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
                    style={{
                      
                      fontWeight: "",
                      padding: "10px 0px",
                    }}
                  >
                    <strong    
                    style={{
                      fontSize: "18px",                      
                    }}>Note:</strong> This status only applies if the U.S.
                    financial institution, participating FFI, reporting Model 1
                    FFI, or reporting Model 2 FFI to which this form is given
                    has agreed that it will treat the FFI as an owner-documented
                    FFI. The owner-documented FFI must make the certifications
                    below
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>24a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />


                    <div style={{ padding: "0px", margin: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                      I certify that the FFI identified in Part I:

                      </label>
                    <p style={{ padding: "0px", margin: "0px" }}>
                      <ul style={{ marginBottom: "0px" }}>
                        <li>Does not act as an intermediary;</li>
                        <li>
                          Does not accept deposits in the ordinary course of a
                          banking or similar business;
                        </li>
                        <li>
                          Does not hold, as a substantial portion of its
                          business, financial assets for the account of others;
                        </li>
                        <li>
                          Is not an insurance company (or the holding company of
                          an insurance company) that issues or is obligated to
                          make payments with respect to a financial account;
                        </li>
                        <li>
                          Is not affiliated with an entity (other than an FFI
                          that is also treated as an owner-documented FFI) that
                          accepts deposits in the ordinary course of a banking
                          or similar business, holds, as a substantial portion
                          of its business, financial assets for the account of
                          others, or is an insurance company (or the holding
                          company of an insurance company) that issues or is
                          obligated to make payments with respect to a financial
                          account; <strong>and</strong>
                        </li>
                        <li>
                          Does not maintain a financial account for any
                          nonparticipating FFI.
                        </li>
                      </ul>
                    </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600", padding: "" }}
                  >
                    Check the box on line 24b or 24c, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px", margin: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                      I certify that the FFI identified in Part I:

                      </label>
                    <p style={{ padding: "0px", margin: "0px" }}>
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Has provided, or will provide, an FFI owner reporting
                          statement (including any applicable owner
                          documentation) that contains:
                          <p>
                            (i) The name, address, TIN (if any), chapter 4
                            status, and type of documentation provided (if
                            required) of every individual and specified U.S.
                            person that owns a direct or indirect equity
                            interest in the owner-documented FFI (looking
                            through all entities other than specified U.S.
                            persons);
                          </p>
                          <p>
                            (ii) The name, address, TIN (if any), chapter 4
                            status, and type of documentation provided (if
                            required) of every individual and specified U.S.
                            person that owns a debt interest in the
                            owner-documented FFI (including any indirect debt
                            interest, which includes debt interests in any
                            entity that directly or indirectly owns the payee or
                            any direct or indirect equity interest in a debt
                            holder of the payee) that constitutes a financial
                            account in excess of $50,000 (disregarding all such
                            debt interests owned by participating FFIs,
                            registered deemed-compliant FFIs, certified
                            deemed-compliant FFIs, excepted NFFEs, exempt
                            beneficial owners, or U.S. persons other than
                            specified U.S. persons); <strong>and</strong>
                          </p>
                          <p>
                            (iii) Any additional information the withholding
                            agent requests in order to fulfill its obligations
                            with respect to the entity.
                          </p>
                        </li>
                      </ul>
                    </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <div style={{ padding: "0px", margin: "0px" }}>
                      <label style={{ padding: "0px", margin: "0px" }}>
                      I certify that the FFI identified in Part I:

                      </label>
                    <p style={{ padding: "0px", margin: "0px" }}>
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Has provided, or will provide, an auditor’s letter,
                          signed no more than 4 years prior to the date of
                          payment, from an independent accounting firm or legal
                          representative with a location in the United States
                          stating that the firm or representative has reviewed
                          the FFI’s documentation with respect to all of its
                          owners and debt holders identified in Regulations
                          section 1.1471-3(d)(6)(iv)(A)(2) and that the FFI
                          meets all the requirements to be an owner-documented
                          FFI. The FFI identified in Part I has also provided,
                          or will provide, an FFI owner reporting statement and
                          Form W-9, with applicable waivers, as described in
                          Regulations section 1.1471-3(d)(6)(iv).
                        </li>
                      </ul>
                    </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part XI end  ----------------------- */}

            {/* ---------------------Part XII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      Certified Deemed-Compliant Nonregistering Local Bank
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>25 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the FFI identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Operates and is licensed solely as a bank or credit
                          union (or similar cooperative credit organization
                          operated without profit) in its country of
                          incorporation or organization;
                        </li>
                        <li>
                          Is not a QI, WP (except to the extent permitted in the
                          withholding foreign partnership agreement), or WT;{" "}
                          <strong>and</strong>
                        </li>
                        <li>
                          Has agreed with the entity identified above (that is
                          not a nonparticipating FFI) to act as the sponsoring
                          entity for this entity
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Is a controlled foreign corporation as defined in
                          section 957(a);
                        </li>
                        <li>Is not a QI, WP, or WT;</li>
                        <li>
                          Is wholly owned, directly or indirectly, by the U.S.
                          financial institution identified above that agrees to
                          act as the sponsoring entity for this entity;
                          <strong>and</strong>
                        </li>
                        <li>
                          Shares a common electronic account system with the
                          sponsoring entity (identified above) that enables the
                          sponsoring entity to identify all account holders and
                          payees of the entity and to access all account and
                          customer information maintained by the entity
                          including, but not limited to, customer identification
                          information, customer documentation, account balance,
                          and all payments made to account holders or payees.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part XII end   ----------------------- */}

            {/* ---------------------Part XIII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XIII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      I certify that the FFI identified in Part I:
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>26 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the FFI identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Is not engaged primarily in the business of investing,
                          reinvesting, or trading in securities, partnership
                          interests, commodities, notional principal contracts,
                          insurance or annuity contracts, or any interest
                          (including a futures or forward contract or option) in
                          such security, partnership interest, commodity,
                          notional principal contract, insurance contract, or
                          annuity contract;
                        </li>
                        <li>
                          No financial account maintained by the FFI or any
                          member of its expanded affiliated group, if any, has a
                          balance or value in excess of $50,000 (as determined
                          after applying applicable account aggregation rules);{" "}
                          <strong>and</strong>
                        </li>
                        <li>
                          Neither the FFI nor the FFI’s entire expanded
                          affiliated group, if any, has more than $50 million in
                          assets on its consolidated or combined balance sheet
                          as of the end of its most recent accounting year.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Is a controlled foreign corporation as defined in
                          section 957(a);
                        </li>
                        <li>Is not a QI, WP, or WT;</li>
                        <li>
                          Is wholly owned, directly or indirectly, by the U.S.
                          financial institution identified above that agrees to
                          act as the sponsoring entity for this entity;
                          <strong>and</strong>
                        </li>
                        <li>
                          Shares a common electronic account system with the
                          sponsoring entity (identified above) that enables the
                          sponsoring entity to identify all account holders and
                          payees of the entity and to access all account and
                          customer information maintained by the entity
                          including, but not limited to, customer identification
                          information, customer documentation, account balance,
                          and all payments made to account holders or payees.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part XIII end   ----------------------- */}

            {/* ---------------------Part  XIV  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XIV</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      Certified Deemed-Compliant Sponsored, Closely Held
                      Investment Vehicle
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
                  <td colSpan={2}>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>
                        <label>
                          <strong>27a </strong>
                        </label>
                      </div>
                      <div> Name of sponsoring entity: &#9654;</div>
                      <div
                        style={{
                          color: "rgb(5, 5, 129)",
                          borderBottom: "1px solid #000",
                          width: "70%",
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the FFI identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Is an FFI solely because it is an investment entity
                          described in Regulations section 1.1471-5(e)(4);
                        </li>
                        <li>Is not a QI, WP, or WT;</li>
                        <li>
                          Will have all of its due diligence, withholding, and
                          reporting responsibilities (determined as if the FFI
                          were a participating FFI) fulfilled by the sponsoring
                          entity identified on line 27a;<strong>and</strong>
                        </li>
                        <li>
                          20 or fewer individuals own all of the debt and equity
                          interests in the entity (disregarding debt interests
                          owned by U.S. financial institutions, participating
                          FFIs, registered deemed-compliant FFIs, and certified
                          deemed-compliant FFIs and equity interests owned by an
                          entity that owns 100% of the equity interests in the
                          FFI identified in Part I and is itself a sponsored
                          FFI).
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XIV end   ----------------------- */}

            {/* ---------------------Part  XV  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XV</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      Certified Deemed-Compliant Limited Life Debt Investment
                      Entity
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>28 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the FFI identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>Was in existence as of January 17, 2013;</li>
                        <li>
                          Issued all classes of its debt or equity interests to
                          investors on or before January 17, 2013, pursuant to a
                          trust indenture or similar agreement;
                          <strong>and</strong>
                        </li>
                        <li>
                          Is certified deemed-compliant because it satisfies the
                          requirements to be treated as a limited life debt
                          investment entity (such as the restrictions with
                          respect to its assets and other requirements under
                          Regulations section 1.1471-5(f)(2)(iv)).
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XV end   ----------------------- */}

            {/* ---------------------Part  XVI  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XVI</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                      Certain Investment Entities That Do Not Maintain Financial
                      Accounts
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>29 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Is a financial institution solely because it is an
                          investment entity described in Regulations section
                          1.1471-5(e)(4)(i)(A);<strong>and</strong>
                        </li>
                        <li>Does not maintain financial accounts.</li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XVI end   ----------------------- */}

            {/* ---------------------Part  XVII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XVII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Restricted Distributor</strong>
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>30a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      (All restricted distributors check here.) I certify that
                      the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                          Operates as a distributor with respect to debt or
                          equity interests of the restricted fund with respect
                          to which this form is furnished;
                        </li>
                        <li>
                          Provides investment services to at least 30 customers
                          unrelated to each other and less than half of its
                          customers are related to each other;
                        </li>
                        <li>
                          Is required to perform AML due diligence procedures
                          under the anti-money laundering laws of its country of
                          organization (which is a FATF-compliant jurisdiction);
                        </li>
                        <li>
                          Operates solely in its country of incorporation or
                          organization, has no fixed place of business outside
                          of that country, and has the same country of
                          incorporation or organization as all members of its
                          affiliated group, if any;
                        </li>
                        <li>
                          Does not solicit customers outside its country of
                          incorporation or organization;
                        </li>
                        <li>
                          Has no more than $175 million in total assets under
                          management and no more than $7 million in gross
                          revenue on its income statement for the most recent
                          accounting year;
                        </li>
                        <li>
                          Is not a member of an expanded affiliated group that
                          has more than $500 million in total assets under
                          management or more than $20 million in gross revenue
                          for its most recent accounting year on a combined or
                          consolidated income statement;<strong>and</strong>
                        </li>
                        <li>
                          Does not distribute any debt or securities of the
                          restricted fund to specified U.S. persons, passive
                          NFFEs with one or more substantial U.S. owners, or
                          nonparticipating FFIs.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the box on line 30b or 30c, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 0" }} colSpan={2}>
                    I further certify that with respect to all sales of debt or
                    equity interests in the restricted fund with respect to
                    which this form is furnished that are made after December
                    31, 2011, the entity identified in Part I:
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
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
                        marginTop: "3px",
                      }}
                    />
                    I certify that the entity identified in Part I is a U.S.
                    branch of a foreign bank or insurance company described in
                    Regulations section 1.1441-1(b)(2)(iv)(A) that is using this
                    form as evidence of its agreement with the withholding agent
                    to be treated as a U.S. person with respect to any
                    reportable amounts or withholdable payments associated with
                    this withholding certificate.
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    c Is currently bound by a distribution agreement that
                    contains a prohibition on the sale of debt or securities to
                    any specified U.S. person, passive NFFE with one or more
                    substantial U.S. owners, or nonparticipating FFI and, for
                    all sales made prior to the time that such a restriction was
                    included in its distribution agreement, has reviewed all
                    accounts related to such sales in accordance with the
                    procedures identified in Regulations section 1.1471-4(c)
                    applicable to preexisting accounts and has redeemed or
                    retired any securities which were sold to specified U.S.
                    persons, passive NFFEs with one or more substantial U.S.
                    owners, or nonparticipating FFIs, or will transfer the
                    securities to a distributor that is a participating FFI,
                    reporting Model 1 FFI, or reporting Model 2 FFI.
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XVII end   ----------------------- */}

            {/* ---------------------Part  XVIII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XVIII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Foreign Central Bank of Issue</strong>
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>31 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      I certify that the entity identified in Part I is treated
                      as the beneficial owner of the payment solely for purposes
                      of chapter 4 under Regulations section 1.1471-6(d)(4).
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XVIII end   ----------------------- */}

            {/* ---------------------Part  XIX  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XIX</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>Nonreporting IGA FFI</strong>
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>32 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0 0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      <p style={{ marginBottom: "0px" }}>
                        I certify that the entity identified in Part I:
                        <ul style={{ marginBottom: "0px" }}>
                          <li>
                            Meets the requirements to be considered a
                            nonreporting financial institution pursuant to an
                            applicable IGA between the United States and
                          </li>
                        </ul>
                      </p>
                      <span
                        style={{
                          width: "50%",
                          borderBottom: "1px solid #000000",
                        }}
                      ></span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ padding: "0", display: "flex" }}>
                    <div
                      style={{
                        width: "69%",
                        display: "flex",
                        borderBottom: "1px solid black",
                        marginLeft: "20px",
                      }}
                    ></div>
                    <div style={{ display: "flex", width: "55%" }}>
                      . The applicable IGA is a
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                          marginBottom: "auto",
                          marginTop: "3px",
                          marginLeft: "10px",
                        }}
                      />
                      Model 1 IGA or a
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        style={{
                          background: "#fff",
                          border: "1px solid #000",
                          marginRight: "10px",
                          marginBottom: "auto",
                          marginTop: "3px",
                          marginLeft: "10px",
                        }}
                      />
                      Model 2 IGA; and
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ padding: "0", display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "20px",
                        width: "115px",
                      }}
                    >
                      is treated as a
                    </div>
                    <div
                      style={{
                        width: "65%",
                        display: "flex",
                        borderBottom: "1px solid black",
                        marginLeft: "5px",
                      }}
                    ></div>
                    <div style={{ display: "flex", width: "55%" }}>
                      under the provisions of the applicable IGA or Treasury
                      regulations
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong> </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0 0 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                        opacity: "0",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                      <p style={{ marginBottom: "0px" }}>
                        I certify that the entity identified in Part I:
                        <ul style={{ marginBottom: "0px" }}>
                          <li>
                            Meets the requirements to be considered a
                            nonreporting financial institution pursuant to an
                            applicable IGA between the United States and
                          </li>
                        </ul>
                      </p>
                      <span
                        style={{
                          width: "50%",
                          borderBottom: "1px solid #000000",
                        }}
                      ></span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XIX end   ----------------------- */}

         {/* ---------------------Part  XX  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XX</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Exempt Retirement Plans
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
                    style={{ fontSize: "18px", fontWeight: "600", padding: "" }}
                  >
                    Check the box on line 33a, b, c, d, e, or f, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>33a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        Is established in a country with which the United States has an income tax treaty in force;
                        </li>
                        <li> Is operated principally to administer or provide pension or retirement benefits; <strong>and</strong> </li>
                        <li>
                        Is entitled to treaty benefits on income that the fund derives from U.S. sources (or would be entitled to benefits if it derived any such income) as a resident of the other country which satisfies any applicable limitation on benefits requirement.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        Is established in a country with which the United States has an income tax treaty in force;
                        </li>
                        <li> Is organized for the provision of retirement, disability, or death benefits (or any combination thereof) to beneficiaries that are former 
                        employees of one or more employers in consideration for services rendered;</li>
                        <li>
                        No single beneficiary has a right to more than 5% of the FFI’s assets;
                        </li>
                        <li>
                        Is subject to government regulation and provides annual information reporting about its beneficiaries to the relevant tax authorities in the 
                        country in which the fund is established or operated; <strong>and</strong> 
                        </li>
                      </ul>
                      <ul
                      style={{
                        listStyleType: "none",
                        paddingLeft: "28px",
                        marginBottom: "0px",
                      }}
                    >
                   
                      <li>
                        <strong>(i)</strong> Is generally exempt from tax on investment income under the laws of the country in which it is established or operates due to its 
                        status as a retirement or pension plan;
                      </li>
                      <li>
                        <strong>(ii)</strong> Receives at least 50% of its total contributions from sponsoring employers (disregarding transfers of assets from other plans 
                        described in this part, retirement and pension accounts described in an applicable Model 1 or Model 2 IGA, other retirement funds 
                        described in an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A));
                      </li>
                      <li>
                        <strong>(iii)</strong> Either does not permit or penalizes distributions or withdrawals made before the occurrence of specified events related to 
                        retirement, disability, or death (except rollover distributions to accounts described in Regulations section 1.1471-5(b)(2)(i)(A) 
                        (referring to retirement and pension accounts), to retirement and pension accounts described in an applicable Model 1 or Model 2 
                        IGA, or to other retirement funds described in this part or in an applicable Model 1 or Model 2 IGA); <strong>or</strong> 
                      </li>
                      <li>
                      <strong>(iv)</strong> Limits contributions by employees to the fund by reference to earned income of the employee or may not exceed $50,000 annually.
                      </li>
                    </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>c </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        Is organized for the provision of retirement, disability, or death benefits (or any combination thereof) to beneficiaries that are former 
                        employees of one or more employers in consideration for services rendered;
                        </li>
                        <li>Has fewer than 50 participants;</li>
                        <li>
                        Is sponsored by one or more employers, each of which is not an investment entity or passive NFFE;
                        </li>
                        <li>
                        Employee and employer contributions to the fund (disregarding transfers of assets from other plans described in this part, retirement and 
                        pension accounts described in an applicable Model 1 or Model 2 IGA, or accounts described in Regulations section 1.1471-5(b)(2)(i)(A)) are 
                        limited by reference to earned income and compensation of the employee, respectively;
                        </li>
                        <li>
                        Participants that are not residents of the country in which the fund is established or operated are not entitled to more than 20% of the fund’s assets;<strong>and</strong>
                        </li>
                        <li>
                        Is subject to government regulation and provides annual information reporting about its beneficiaries to the relevant tax authorities in the 
                        country in which the fund is established or operates.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>d </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I is formed pursuant to a pension plan that would meet the requirements of section 401(a), other 
                    than the requirement that the plan be funded by a trust created or organized in the United States.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>e </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I is established exclusively to earn income for the benefit of one or more retirement funds described 
                    in this part or in an applicable Model 1 or Model 2 IGA, accounts described in Regulations section 1.1471-5(b)(2)(i)(A) (referring to 
                    retirement and pension accounts), or retirement and pension accounts described in an applicable Model 1 or Model 2 IGA.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>f </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. 
                        possession (each as defined in Regulations section 1.1471-6) or an exempt beneficial owner described in an applicable Model 1 or Model 
                        2 IGA to provide retirement, disability, or death benefits to beneficiaries or participants that are current or former employees of the sponsor 
                        (or persons designated by such employees);<strong>or</strong>
                        </li>
                        <li> Is established and sponsored by a foreign government, international organization, central bank of issue, or government of a U.S. 
                        possession (each as defined in Regulations section 1.1471-6) or an exempt beneficial owner described in an applicable Model 1 or Model 
                        2 IGA to provide retirement, disability, or death benefits to beneficiaries or participants that are not current or former employees of such 
                        sponsor, but are in consideration of personal services performed for the sponsor.</li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XX end   ----------------------- */}


           {/* ---------------------Part  XXI  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXI</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Excepted Nonfinancial Group Entity
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>34 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>Was in existence as of January 17, 2013;</li>
                        <li>
                        Is a holding company, treasury center, or captive finance company and substantially all of the entity’s activities are functions described in 
                        Regulations section 1.1471-5(e)(5)(i)(C) through (E);
                        </li>
                        <li>
                          Is certified deemed-compliant because it satisfies the
                          requirements to be treated as a limited life debt
                          investment entity (such as the restrictions with
                          respect to its assets and other requirements under
                          Regulations section 1.1471-5(f)(2)(iv)).
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XXI end   ----------------------- */}



           {/* ---------------------Part  XXII  ----------------------- */}

            {/* ---------------------Part  XXII end   ----------------------- */}

           {/* ---------------------Part  XXIII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXIII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Excepted Nonfinancial Entity in Liquidation or Bankruptcy
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>36 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li >
                          <div style={{display:"flex"}}>
                          <p style={{marginBottom:"0px"}}>Filed a plan of liquidation, filed a plan for reorganization, or filed for bankruptcy on the following date:</p><div style={{width:"288px", borderBottom:"1px solid black",marginLeft:"5px"}}></div>
                          </div>
                        </li>
                        <li>
                        Has not been engaged during the past 5 years in business as a financial institution or acted as a passive NFFE;
                        </li>
                        <li>
                        Is either liquidating or emerging from a reorganization or bankruptcy with the intent to continue or recommence operations as a 
                        nonfinancial entity; <strong>and</strong> 
                        </li>
                        <li>
                        Has provided, or will provide, documentary evidence such as a bankruptcy filing or other public documentation that supports its claim if 
                        it remains in bankruptcy or liquidation for more than 3 years.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>   
              </tbody>
            </table>

            {/* ---------------------Part  XXIII end   ----------------------- */}
           {/* ---------------------Part  XXIV  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXIV</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Publicly Traded NFFE or NFFE Affiliate of a Publicly Traded Corporation
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
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Check the box on line 37a or 37b, whichever applies.
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>37a </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that:
                      <ul style={{ marginBottom: "0px" }}>
                        <li> The entity identified in Part I is a foreign corporation that is not a financial institution; <strong>and</strong></li>
                        <li>
                          <div style={{display:"flex"}}>
                          <p style={{marginBottom:"0px"}}>The stock of such corporation is regularly traded on one or more established securities markets, including</p><div style={{width:"272px", borderBottom:"1px solid black",marginLeft:"5px"}}></div>
                          </div>
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>b </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that:
                      <ul style={{ marginBottom: "0px" }}>
                        <li> The entity identified in Part I is a foreign corporation that is not a financial institution;</li>
                        <li>
                        The entity identified in Part I is a member of the same expanded affiliated group as an entity the stock of which is regularly traded on an
                        established securities market;
                        </li>
                        <li>
                          <div style={{display:"flex"}}>
                          <p style={{marginBottom:"0px"}}> The name of the entity, the stock of which is regularly traded on an established securities market, is</p><div style={{width:"278px", borderBottom:"1px solid black",marginLeft:"5px"}}></div><p style={{marginBottom:"0px"}}>: <strong>and</strong></p>
                          </div>
                        </li>
                        <li>
                          <div style={{display:"flex"}}>
                          <p style={{marginBottom:"0px"}}> The name of the securities market on which the stock is regularly traded is &#9654;</p><div style={{width:"417px", borderBottom:"1px solid black",marginLeft:"5px"}}></div>
                          </div>
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XXIV end   ----------------------- */}

     {/* ---------------------Part  XXV  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXV</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Excepted Territory NFFE
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>38 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        The entity identified in Part I is an entity that is organized in a possession of the United States;
                        </li>
                        <li> All of the owners of the entity identified in Part I are bona fide residents of the possession in which the NFFE is organized or incorporated;
                         <strong>and</strong> </li>
                        <li>
                        The entity identified in Part I:
                        </li>
                      </ul>
                      <ul
                      style={{
                        listStyleType: "none",
                        paddingLeft: "28px",
                        marginBottom: "0px",
                      }}
                    >
                   
                      <li>
                        <strong>(i)</strong> Does not accept deposits in the ordinary course of a banking or similar business;
                      </li>
                      <li>
                        <strong>(ii)</strong> Does not hold, as a substantial portion of its business, financial assets for the account of others;<strong>and</strong>
                      </li>
                      <li>
                        <strong>(iii)</strong> Is not an insurance company (or the holding company of an insurance company) that issues or is obligated to make payments with respect to a financial account.
                      </li>
                    </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XXV end   ----------------------- */}


 {/* ---------------------Part  XXVI  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXVI</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Active NFFE
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>39 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        The entity identified in Part I is a foreign entity that is not a financial institution;
                        </li>
                        <li>  Less than 50% of such entity’s gross income for the preceding calendar year is passive income;
                         <strong>and</strong> </li>
                        <li>
                        Less than 50% of the assets held by such entity are assets that produce or are held for the production of passive income (calculated as a weighted average of the percentage of passive assets measured quarterly). See the instructions for the definition of passive income.
                        </li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XXVI end   ----------------------- */}



 {/* ---------------------Part  XXVII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXVII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Passive NFFE
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>40 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I:
                      <ul style={{ marginBottom: "0px" }}>
                        <li>
                        Is a foreign entity that is not a financial institution (this category includes an entity organized in a possession of the United States that
                        engages (or holds itself out as being engaged) primarily in the business of investing, reinvesting, or trading in securities, partnership
                        interests, commodities, notional principal contracts, insurance or annuity contracts, or any interest in such security, partnership interest,
                        commodity, notional principal contract, insurance contract, or annuity contract); <strong>and</strong> 
                        </li>
                        <li>   Is using this form to transmit withholding certificates and/or other documentation and has provided or will provide a withholding statement, as required.</li>
                      </ul>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XXVII end   ----------------------- */}

  {/* ---------------------Part  XXVIII  ----------------------- */}

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
                      <p style={{ margin: "auto" }}>Part XXVIII</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
                    {" "}
                    <strong>
                    Sponsored Direct Reporting NFFE
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
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>41 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                  <div style={{ marginBottom: "0px" }}>
             
        
                      <div style={{display:"flex"}}>
                      <p style={{marginBottom:"0px"}}> Name of sponsoring entity: &#9654;</p><div style={{width:"600px", borderBottom:"1px solid black", marginLeft:"15px"}}></div>
                      </div>
                    
                  </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "30.72px",
                      padding: "10px 0",
                      verticalAlign: "top",
                    }}
                  >
                    {" "}
                    <label>
                      <strong>42 </strong>
                    </label>
                  </td>
                  <td style={{ padding: "10px 0", display: "flex" }}>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      style={{
                        background: "#fff",
                        border: "1px solid #000",
                        marginRight: "10px",
                        marginBottom: "auto",
                        marginTop: "3px",
                      }}
                    />
                    <p style={{ marginBottom: "0px" }}>
                    I certify that the entity identified in Part I is a direct reporting NFFE that is sponsored by the entity identified on line 41.
         
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ---------------------Part  XXVIII end   ----------------------- */}

            {/* -------------------------------------------------- XXIX Certification--------------------------------------------------------------- */}
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
                      <p style={{ margin: "auto" }}>Part XXIX</p>
                    </div>{" "}
                  </td>
                  <td style={{ padding: "0px 10px", fontWeight: "900" }}>
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
                    Under penalties of perjury, I declare that I have examined the information on this form, and to the best of my knowledge and belief, it is true, correct, and 
                    complete. Furthermore, I authorize this form to be provided to any withholding agent that has control, receipt, or custody of the income or proceeds for 
                    which I am providing this form or any withholding agent that can disburse or make payments of the amounts for which I am providing this form.
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    style={{ fontSize: "18px", fontWeight: "600" }}
                  >
                   I agree that I will submit a new form within 30 days if any certification made on this form becomes incorrect
                  </td>
                </tr>

        
                <tr>
                  <td colSpan={2}>
                    <p style={{ color: "#1133a9",marginBottom:"0px" }}>
                    W-8BEN-E – Electronic Substitute Form Statement:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ color: "#1133a9" }}>
                  The Internal Revenue Service does not require your consent to any provisions of this document other than the certifications required to establish: (1) your status as a qualified
                  intermediary, a nonqualified intermediary, a specific type of U.S. branch, a withholding foreign partnership, a withholding foreign trust, a nonwithholding foreign partnership, a
                  nonwithholding foreign simple trust, or a nonwithholding foreign grantor trust; (2) your chapter 4 status; and/or (3) prior to January 1, 2020, your status as a qualified
                  securities lender.
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
                              display:"flex",
                            }}
                          >
                           <div style={{minWidth:"maxcontent", marginTop:"auto",marginBottom:"auto"}}>Sign Here</div> 
                            <div style={{height:"0px",width:"0px",borderTop:"25px solid transparent", borderLeft:"16px solid #000000",borderBottom:"25px solid transparent", marginLeft:"5px"}}></div>
                          </td>
                          <td style={{ width: "85%",fontSize:"11px" }}>
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
                                        }}
                                      >
                                        Date : 10-17-2023 12:00:53 IST{" "}
                                      </span>
                                      <span
                                        style={{
                                          display: "table-cell",
                                       
                                          width: "30%",
                                        }}
                                      >
                                        {" "}
                                        ESC : YSCML
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
                                        width:"100%"
                                        
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "table-cell",
                                          textAlign: "left",
                                          width: "60%",
                                        }}
                                      >
                                        asd1
                                      </span>
                  
                                    </div>
                                  </td>
                                 
                                  <td
                                    style={{
                                      width: "20%",
                                      borderBottom: "1px solid #000",
                                      color: "#1133a9",
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
                                    }}
                                  >
                                    Signature of beneficial owner (or individual
                                    authorized to sign for beneficial owner)
                                  </td>
                                  <td  style={{
                                      
                                      padding: "0 10px",textAlign:"center"}}
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
                        <tr style={{fontSize:"13px"}}>
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
                              W-8BEN
                            </span>{" "}
                            (Rev. 10-2021)
                          </td>
                        </tr>
                        <tr style={{fontSize:"13px",fontWeight:"500"}}>
                          <td style={{ width: "40%", color: "#1133a9" }}>
                            Electronic Submission Confirmation: 
                          </td>
                          <td style={{ width: "10%", color: "#1133a9" }}>
                           YVQ7NL
                          </td>
                          <td
                            style={{
                              width: "20%",
                              color: "#1133a9",
                              textAlign: "center",
                            }}
                          >
                            Email Address :
                          </td>
                          <td style={{ width: "30%", color: "#1133a9",textAlign:"center" }}>
                            <a href="mailto:abhay.singh2@mail.com" style={{ color: "#1133a9",}}>
                              abhay.singh2@mail.com
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
            {/* -------------------------------------------------- XXIX Certification end --------------------------------------------------------------- */}

          {/* <section style={{ breakAfter: "page", breakBefore: "page" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
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
                          <td style={{ border: "2px solid #000" }}>Foreign</td>
                          <td style={{ border: "2px solid #000" }}>243543</td>
                          <td style={{ border: "2px solid #000" }}>False</td>
                        </tr>
                        <tr>
                          <td style={{ border: "2px solid #000" }}>
                            Antarctica
                          </td>
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
          </section> */}
          {/* <section style={{ breakAfter: "page", breakBefore: "page" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "40px auto 0",
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
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "0px auto",
                fontSize: "20px",
              }}
              cellPadding={10}
            >
              <tbody>
                <tr>
                  <td style={{ width: "80%" }}>
                    Was the individual born in the United States and held U.S.
                    citizenship?
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Country of Citizenship of the individual:
                  </td>
                  <td>United States</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Country of Citizenship of the individual:
                  </td>
                  <td>United States</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Country of birth of the individual:
                  </td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Is the individual subject to taxation as a U.S. citizen or
                    resident alien?
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Is the individual a Permanent Resident Card Holder (Green
                    Card)?
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Does the individual hold dual citizenship status?
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td style={{ width: "80%" }}>
                    Does or did the dual citizenship include U.S. citizenship?
                  </td>
                  <td>Yes</td>
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
                    Has the Individual been physically present in the U.S. on at
                    least 31 days during the current calendar year?
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
              </tbody>
            </table>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: "920px",
                margin: "0px auto",
                fontSize: "20px",
              }}
              cellPadding={10}
            >
              <tfoot>
                <tr>
                  <td style={{ width: "50%" }}>Signed by: </td>
                  <td style={{ width: "50%" }}>Date: 24-11-2023</td>
                </tr>
              </tfoot>
            </table>
          </section> */}
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
                  <td style={{ width: "50%" }}>fgjghkghk hgkjghk</td>
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
                      href="mailto:abhay.singh2@mail.com"
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      abhay.singh2@mail.com
                    </a>{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Contact cell number:</td>
                  <td style={{ width: "50%" }}> </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Day time contact number:</td>
                  <td style={{ width: "50%" }}>United States 8638676734</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>
                    Day time Alternate contact number:
                  </td>
                  <td style={{ width: "50%" }}>United States 534534535</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>
                    Day time Alternate contact number:
                  </td>
                  <td style={{ width: "50%" }}>United States 534534535</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Signatory email address:</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>Income Details:</td>
                  <td style={{ width: "50%" }}>
                    01-Interest paid by U.S. obligors - general
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>VAT Number Provided:</td>
                  <td style={{ width: "50%" }}>7678676</td>
                </tr>
                <tr>
                  <td style={{ width: "50%"}}>
                    Forms Exchange Agent (Business Unit):
                  </td>
                  <td style={{ width: "50%"}}>ValueCoders</td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>&nbsp;</td>
                  <td style={{ width: "50%" }}>&nbsp;</td>
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
            <table
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
            </table>

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
      </section>
      <section
        style={{
          maxWidth: "960px",
          width: "100%",
          textAlign: "start",
          margin: "20px auto",
        }}
      >
        <Button variant="contained" onClick={downloadPDF}>
          click me
        </Button>
      </section>
    </>
  );
}
