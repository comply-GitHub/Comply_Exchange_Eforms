import { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DialogContentText from "@mui/material/DialogContentText";
import React from "react";

import {
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Form = (props: any) => {
  const { open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const history = useNavigate();

  const [Tax, setTax] = useState<string>("");
  const handleTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax(event.target.value);
  };

  const [Foreign, setForeign] = useState<string>("");
  const handleForeignChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForeign(event.target.value);
  };

  const [Intermediary, setIntermediary] = useState<string>("");
  const handleIntermediaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIntermediary(event.target.value);
  };

  const [Reverse, setReverse] = useState<string>("");
  const handleReverseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReverse(event.target.value);
  };

  const [Hybrid, setHybrid] = useState<string>("");
  const handleHybridChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHybrid(event.target.value);
  };
  const [Tin, setTin] = useState<string>("");
  const handleTinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTin(event.target.value);
  };
  const [Disregarded, setDisregarded] = useState<string>("");
  const handleDisregardedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisregarded(event.target.value);
  }

  const [Trust, setTrust] = useState<string>("");
  const handleTrustChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrust(event.target.value);
  };
  const [ForeignRES , setForeignRES] =useState<string>("");
const handleForeignRESChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setForeignRES(event.target.value);
};


  const [Result, setResult] = useState<string>("");
  const handleResultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResult(event.target.value);
  };
  const [Benefit, setBenefit] = useState<string>("");
  const handleBenefitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBenefit(event.target.value);
  };

  return (
    <Fragment>
      <section
        className="inner_content"
        style={{ backgroundColor: "#0c3d69", marginBottom: "10px" }}
      >
        <div className="container-fluid">
          <div className="col-lg-12 mt-20" style={{ padding: "18px" }}>
            <Paper elevation={6} style={{ padding: "17px", marginTop: "20px" }}>
              <Typography
                align="left"
                style={{
                  fontSize: "29px",
                  color: "#04506e",
                  fontWeight: "bold",
                }}
              >
                Forms Selection Guide
              </Typography>

              <Paper
                className="mt-2"
                elevation={3}
                style={{ padding: "17px", backgroundColor: "#d4d9d4" }}
              >
                <Typography
                  align="center"
                  className="mt-3"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Determination of Intermediary Status
                </Typography>

                <Typography
                  align="left"
                  className="mt-3"
                  style={{ fontSize: "16px", color: "#383a3b" }}
                >
                  Are you an Intermediary or acting in the capacity of a
                  flow-through where you may need to supply additional U.S. tax
                  certification on behalf of your clients or the underlying
                  beneficial owners?
                </Typography>
                <Typography className="mt-2">
                  An intermediary is any person that acts as a custodian,
                  broker, nominee, or otherwise as an agent for another person,
                  regardless of whether that other person is the beneficial
                  owner of the amount paid (or to be paid), a flow-through
                  entity, or another intermediary.
                </Typography>

                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={Intermediary}
                    onChange={handleIntermediaryChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      className="label"
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                {Intermediary === "Yes" ? (
                  <>
                    <Typography
                      align="center"
                      className="mt-3"
                      style={{
                        fontSize: "20px",
                        color: "#383a3b",
                        fontWeight: "bold",
                      }}
                    >
                      Hybrid Entity
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      Are you submitting a certificate claiming treaty benefits
                      for or on behalf of a Hybrid entity?
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      A hybrid entity is any person (other than an individual)
                      that is treated as fiscally transparent in the U.S., but
                      is not treated as fiscally transparent by a country with
                      which the U.S. has an income tax treaty. Hybrid status is
                      relevant for claiming treaty benefits.
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      Fiscally transparent entity. An entity is considered
                      fiscally transparent if the interest holders are required
                      to separately take into account their share of the
                      entity’s income on a current basis, whether or not the
                      income has been distributed. Also, the character and
                      source of the income must be determined as if the income
                      had been realized by the interest holders directly from
                      the source.
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Hybrid}
                        onChange={handleHybridChange}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          className="label"
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>

                    {Hybrid === "Yes" ? (
                      <>
                        <Typography
                          align="center"
                          className="mt-3"
                          style={{
                            fontSize: "20px",
                            color: "#383a3b",
                            fontWeight: "bold",
                          }}
                        >
                          Reverse Hybrid
                        </Typography>

                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          Are you submitting a certificate to claim treaty
                          benefits for a Reverse Hybrid entity transmitting
                          beneficial owner documentation provided by the
                          interest holders to claim benefits on their behalf?
                        </Typography>

                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          A Reverse Hybrid entity is any Person (other than an
                          individual) that is not fiscally transparent under
                          U.S. tax law principles, but that is fiscally
                          transparent under the laws of a jurisdiction with
                          which the United States has an income tax treaty.
                        </Typography>

                        <Typography>
                          Fiscally transparent entity. An entity is treated as
                          fiscally transparent with respect to an item of income
                          for which treaty benefits are claimed to the extent
                          that the interest holders in the entity must, on a
                          current basis, take into account separately their
                          shares of an item of income paid to the entity whether
                          or not distributed and must determine the character of
                          the items of income as if they were realized directly
                          from the sources from which realized by the entity.
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={Reverse}
                            onChange={handleReverseChange}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              className="label"
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>

                        {Reverse === "Yes" ? (
                          <>
                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "26px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              Form Selection Guide Result
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              We are not authorized to provide tax advice
                              through this process, but the answers provided
                              suggest you may need to provide a Form W-8IMY.
                              "Certificate of Foreign Intermediary, Foreign
                              Flow-through Entity, or Certain U.S. Branches for
                              United States Tax Withholding".
                            </Typography>
                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              A valid Form W-IMY and any associated
                              documentation must be provided by:
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              Qualified Intermediaries not acting on their own
                              account representing they will provide withholding
                              statements as required
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              Nonqualified intermediaries not acting on their
                              own account and if applicable transmit withholding
                              statements, associated certificates or other
                              documentary evidence as required
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              Foreign Partnerships, Foreign Simple or Grantor
                              Trusts to establish that they are non-withholding
                              for purposes of section 1441 and 1442 and to
                              represent that the income is not effectively
                              connected with a U.S. trade or business; and that
                              the form is being used to transmit withholding
                              certificates and associated documentation as
                              required
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              For a detailed explanation of who should submit a
                              form W-8IMY please see the IRS instructions.
                            </Typography>

                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              If you need further guidance you may wish to
                              contact your local tax advisers.
                            </Typography>
                            {/* <Typography
                              align="center"
                              style={{ marginTop: "20px" }}
                            >
                              <Button
                                style={{ fontSize: "16px" }}
                                size="small"
                                type="submit"
                                onClick={() => {
                                  history("/Certificates");
                                }}
                                variant="contained"
                              >
                                Close1
                              </Button>
                            </Typography> */}
                          </>
                        ) : Reverse === "No" ? (
                          <>
                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "26px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              Form Selection Guide Result
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              We are not authorized to provide tax advice
                              through this process, but the answers provided
                              suggest that you may need to provide a Form
                              W-8BEN-E. A Form W-8BEN-E is "A Certificate of
                              Foreign Status of Beneficial Owner for United
                              States Tax Withholding".
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              Who should submit a Form W-8BEN-E?
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              You must provide a valid Form W-8BEN-E to the
                              withholding agent or payer if submitting a U.S.
                              tax certificate on behalf of a Foreign Person who
                              is the beneficial owner of an amount subject to
                              U.S. tax withholding. Form W-8BEN-E should be
                              provided whether or not you are claiming a reduced
                              rate of, or exemption from withholding.
                            </Typography>

                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              If you need further guidance you may wish to
                              contact your local tax advisers.
                            </Typography>
                            {/* <Typography
                              align="center"
                              style={{ marginTop: "20px" }}
                            >
                              <Button
                                style={{ fontSize: "16px" }}
                                size="small"
                                type="submit"
                                onClick={() => {
                                  history("/Certificates");
                                }}
                                //   onClick={handleClose}
                                variant="contained"
                              >
                                Confirm
                              </Button>
                            </Typography> */}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : Hybrid === "No" ? (
                      <>
                        <Typography
                          align="center"
                          className="mt-3"
                          style={{
                            fontSize: "20px",
                            color: "#383a3b",
                            fontWeight: "bold",
                          }}
                        >
                          Effectively Connected Income
                        </Typography>
                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          Is the income this submission relates to considered to
                          be effectively connected with conduct of a trade or
                          business within the United States?
                        </Typography>
                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          Generally, when a non-U.S. person engages in a trade
                          or business in the United States they should have a
                          U.S. tax identification number (TIN), have a U.S.
                          business or postal address and report income on an
                          annual U.S. income tax information return.
                        </Typography>
                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          In cases where different types of income are received
                          it may be necessary to complete more than one
                          submission.
                        </Typography>
                        <br />
                        <Typography
                          align="center"
                          className="mt-3"
                          style={{
                            fontSize: "20px",
                            color: "#383a3b",
                            fontWeight: "bold",
                          }}
                        >
                          The Form W-8ECI is not considered valid when provided
                          without an appropriate TIN....
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={Tin}
                            onChange={handleTinChange}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              className="label"
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>

                        {Tin === "Yes" ? (
                          <>
                            <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "26px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Form Selection Guide Result
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          We are not authorized to provide tax
                                          advice through this process, but the
                                          answers provided suggest that you may
                                          need to provide a Form W-8BEN-E. A
                                          Form W-8BEN-E is "A Certificate of
                                          Foreign Status of Beneficial Owner for
                                          United States Tax Withholding".
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Who should submit a Form W-8BEN-E?
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          You must provide a valid Form W-8BEN-E
                                          to the withholding agent or payer if
                                          submitting a U.S. tax certificate on
                                          behalf of a Foreign Person who is the
                                          beneficial owner of an amount subject
                                          to U.S. tax withholding. Form W-8BEN-E
                                          should be provided whether or not you
                                          are claiming a reduced rate of, or
                                          exemption from withholding.
                                        </Typography>

                                        <Typography
                                          align="center"
                                          className="mt-3 mb-5"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          If you need further guidance you may
                                          wish to contact your local tax
                                          advisers.
                                        </Typography>
                                     <br/>

                                    {""}
                                    <Typography
                                          align="center"
                                          className="mt-3 my-3"
                                          style={{
                                            fontSize: "26px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Form Selection Guide Result
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          We are not authorized to provide tax
                                          advice through this process, but the
                                          answers provided suggest that you may
                                          need to provide a Form W-8BEN-E. A
                                          Form W-8BEN-E is "A Certificate of
                                          Foreign Status of Beneficial Owner for
                                          United States Tax Withholding".
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Who should submit a Form W-8BEN-E?
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          You must provide a valid Form W-8BEN-E
                                          to the withholding agent or payer if
                                          submitting a U.S. tax certificate on
                                          behalf of a Foreign Person who is the
                                          beneficial owner of an amount subject
                                          to U.S. tax withholding. Form W-8BEN-E
                                          should be provided whether or not you
                                          are claiming a reduced rate of, or
                                          exemption from withholding.
                                        </Typography>

                                        <Typography
                                          align="center"
                                          // className="mt-3"
                                          className="mt-3 mb-5"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          If you need further guidance you may
                                          wish to contact your local tax
                                          advisers.
                                        </Typography>
                                       {""}
                                       <div className="my-3">
                                        </div>


                                       {/* <Typography
                                          align="center"
                                          className="mt-5 my-3"
                                          style={{
                                            fontSize: "26px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Form Selection Guide Result
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          We are not authorized to provide tax
                                          advice through this process, but the
                                          answers provided suggest that you may
                                          need to provide a Form W-8BEN-E. A
                                          Form W-8BEN-E is "A Certificate of
                                          Foreign Status of Beneficial Owner for
                                          United States Tax Withholding".
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Who should submit a Form W-8BEN-E?
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          You must provide a valid Form W-8BEN-E
                                          to the withholding agent or payer if
                                          submitting a U.S. tax certificate on
                                          behalf of a Foreign Person who is the
                                          beneficial owner of an amount subject
                                          to U.S. tax withholding. Form W-8BEN-E
                                          should be provided whether or not you
                                          are claiming a reduced rate of, or
                                          exemption from withholding.
                                        </Typography>

                                        <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          If you need further guidance you may
                                          wish to contact your local tax
                                          advisers.
                                        </Typography>
                                        */}
                                        <Typography
                                          align="center"
                                          style={{ marginTop: "20px" }}
                                        >
                                          <Button
                                            style={{ fontSize: "13px" }}
                                            size="small"
                                            type="submit"
                                            onClick={() => {
                                              history("/Certificates");
                                            }}
                                            //   onClick={handleClose}
                                            variant="contained"
                                          >
                                            Close
                                          </Button>
                                        </Typography>
                          
                          </>
                        ) : (
                          <>
                             <Typography
                      align="center"
                      className="mt-3"
                      style={{
                        fontSize: "20px",
                        color: "#383a3b",
                        fontWeight: "bold",
                      }}
                    >
                     Disregarded Entity
 
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                     Are you making the submission on behalf of a Disregarded Entity for U.S. tax purposes?
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                     A disregarded entity is defined as a business entity that has a single owner and is not a corporation under Regulations section 301.7701-2(b) is disregarded as an entity separate from its owner.
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      A disregarded entity should not submit a Form W-8BEN to a partnership for purposes of section 1446. Instead the owner of such entity shall provide appropriate documentation. See Regulations section 1.1446-1.
                    </Typography>
                    <FormControl className="mt-5">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Disregarded}
                        onChange={handleDisregardedChange}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          className="label"
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : Intermediary === "No" ? (
                  <>
                    <Typography
                      align="center"
                      className="mt-3"
                      style={{
                        fontSize: "20px",
                        color: "#383a3b",
                        fontWeight: "bold",
                      }}
                    >
                      Effectively Connected Income
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      Is the income this submission relates to considered to be
                      effectively connected with conduct of a trade or business
                      within the United States?
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      Generally, when a non-U.S. person engages in a trade or
                      business in the United States they should have a U.S. tax
                      identification number (TIN), have a U.S. business or
                      postal address and report income on an annual U.S. income
                      tax information return.
                    </Typography>
                    <Typography
                      align="left"
                      className="mt-3"
                      style={{ fontSize: "16px", color: "#383a3b" }}
                    >
                      In cases where different types of income are received it
                      may be necessary to complete more than one submission.
                    </Typography>
                    <br />
                    <Typography
                      align="center"
                      className="mt-3"
                      style={{
                        fontSize: "20px",
                        color: "#383a3b",
                        fontWeight: "bold",
                      }}
                    >
                      The Form W-8ECI is not considered valid when provided
                      without an appropriate TIN.
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Tin}
                        onChange={handleTinChange}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          className="label"
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>

                    {Tin === "Yes" ? (
                      <>
                        <Typography
                          align="center"
                          className="mt-3"
                          style={{
                            fontSize: "20px",
                            color: "#383a3b",
                            fontWeight: "bold",
                          }}
                        >
                          Non-U.S. Partnerships or non-U.S. Trusts
                        </Typography>
                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          Is the income derived allocated through a non-U.S.
                          Partnership or a non-U.S. Trust?
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={Trust}
                            onChange={handleTrustChange}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              className="label"
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>

                        {Trust === "Yes" ? (
                          <>
                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "20px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              A Treaty Benefit or Foreign Person Claim
                            </Typography>
                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              Are you making this submission to claim treaty
                              benefits (if applicable) or making the submission
                              only to claim Foreign Person status for U.S. tax
                              purposes?
                            </Typography>
                            <Typography align="left"
                              className="mt-3"
                              style={{ fontSize: '16px', color: '#383a3b' }}>
                              A Foreign Person in this context includes all non-U.S. persons that could be described as, non-resident alien individuals, foreign (non-U.S.); corporations, partnerships, trusts estates and any other person that is not a U.S. person for U.S. tax purposes whether or not the resident country has an applicable tax treaty with the United States. It also includes a foreign branch or office of a U.S. financial institution or U.S. clearing organization if the foreign branch is a registered as a qualified intermediary.
                            </Typography>
                            <FormControl>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={Result}
                                onChange={handleResultChange}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  className="label"
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </FormControl>
                            {Result === "Yes" ? (
                              <>
                                <Typography
                                  align="center"
                                  className="mt-3"
                                  style={{
                                    fontSize: "26px",
                                    color: "#383a3b",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Form Selection Guide Result
                                </Typography>

                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{ fontSize: "16px", color: "#383a3b" }}
                                >
                                  We are not authorized to provide tax advice
                                  through this process, but the answers provided
                                  suggest that you may need to provide a Form
                                  W-8BEN-E. A Form W-8BEN-E is "A Certificate of
                                  Foreign Status of Beneficial Owner for United
                                  States Tax Withholding".
                                </Typography>

                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{
                                    fontSize: "16px",
                                    color: "#383a3b",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Who should submit a Form W-8BEN-E?
                                </Typography>

                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{ fontSize: "16px", color: "#383a3b" }}
                                >
                                  You must provide a valid Form W-8BEN-E to the
                                  withholding agent or payer if submitting a
                                  U.S. tax certificate on behalf of a Foreign
                                  Person who is the beneficial owner of an
                                  amount subject to U.S. tax withholding. Form
                                  W-8BEN-E should be provided whether or not you
                                  are claiming a reduced rate of, or exemption
                                  from withholding.
                                </Typography>

                                <Typography
                                  align="center"
                                  className="mt-3"
                                  style={{
                                    fontSize: "16px",
                                    color: "#383a3b",
                                    fontWeight: "bold",
                                  }}
                                >
                                  If you need further guidance you may wish to
                                  contact your local tax advisers.
                                </Typography>
                                <Typography
                                  align="center"
                                  style={{ marginTop: "20px" }}
                                >
                                  <Button
                                    style={{ fontSize: "13px" }}
                                    size="small"
                                    type="submit"
                                    onClick={() => {
                                      history("/Certificates");
                                    }}
                                    //   onClick={handleClose}
                                    variant="contained"
                                  >
                                    Close
                                  </Button>
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography
                                  align="center"
                                  className="mt-3"
                                  style={{
                                    fontSize: "20px",
                                    color: "#383a3b",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Foreign Government or International
                                  Organization
                                </Typography>
                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{ fontSize: "16px", color: "#383a3b" }}
                                >
                                  Are you making the submission on behalf of a
                                  foreign government or other foreign
                                  organization, claiming applicability of
                                  sections of 115(2), 501(c) 892 895 or 1443(b)
                                  of the Internal Revenue Code?
                                </Typography>
                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{ fontSize: "16px", color: "#383a3b" }}
                                >
                                  AA foreign government includes only the
                                  integral parts or controlled entities of a
                                  foreign sovereign as defined in Temporary
                                  Regulations section 1.892-2T.
                                </Typography>
                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{ fontSize: "16px", color: "#383a3b" }}
                                >
                                  An integral part of a foreign sovereign, in
                                  general is any person, body of persons,
                                  organizations, agency, bureau fund,
                                  instrumentality, or other body, however
                                  designated that constitutes a governing of a
                                  foreign country. The net earnings of the
                                  governing authority must be credited to its
                                  own account or to other accounts of the
                                  foreign sovereign with no portion benefiting
                                  any private person.
                                </Typography>
                                <Typography
                                  align="left"
                                  className="mt-3"
                                  style={{ fontSize: "16px", color: "#383a3b" }}
                                >
                                  An international organization is any public
                                  international organization entitled to enjoy
                                  privileges exemptions and immunities as an
                                  international organization under the
                                  International Organizations Immunity Act. (22
                                  U.S.C. 288-288(f)). In general to qualify as
                                  an international organization, the United
                                  States must participate in the organization
                                  pursuant to a treaty or under the authority of
                                  an Act of Congress authorization such
                                  participation.
                                </Typography>
                                <FormControl>
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={Foreign}
                                    onChange={handleForeignChange}
                                  >
                                    <FormControlLabel
                                      value="Yes"
                                      control={<Radio />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      className="label"
                                      value="No"
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </FormControl>

                                {Foreign === "Yes" ? (
                                  <>
                                    <Typography
                                      align="left"
                                      className="mt-3"
                                      style={{
                                        fontSize: "20px",
                                        color: "#383a3b",
                                      }}
                                    >
                                      Are you a qualifying tax exempt
                                      organization under U.S. tax principles
                                      receiving unrelated business taxable
                                      income subject to withholding under
                                      section 1443 (a)?
                                    </Typography>

                                    <FormControl>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={Tax}
                                        onChange={handleTaxChange}
                                      >
                                        <FormControlLabel
                                          value="Yes"
                                          control={<Radio />}
                                          label="Yes"
                                        />
                                        <FormControlLabel
                                          className="label"
                                          value="No"
                                          control={<Radio />}
                                          label="No"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                    {Tax === "Yes" ? (
                                      <>
                                        <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "26px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Form Selection Guide Result
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          We are not authorized to provide tax
                                          advice through this process, but the
                                          answers provided suggest that you may
                                          need to provide a Form W-8BEN-E. A
                                          Form W-8BEN-E is "A Certificate of
                                          Foreign Status of Beneficial Owner for
                                          United States Tax Withholding".
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Who should submit a Form W-8BEN-E?
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          You must provide a valid Form W-8BEN-E
                                          to the withholding agent or payer if
                                          submitting a U.S. tax certificate on
                                          behalf of a Foreign Person who is the
                                          beneficial owner of an amount subject
                                          to U.S. tax withholding. Form W-8BEN-E
                                          should be provided whether or not you
                                          are claiming a reduced rate of, or
                                          exemption from withholding.
                                        </Typography>

                                        <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          If you need further guidance you may
                                          wish to contact your local tax
                                          advisers.
                                        </Typography>
                                        <Typography
                                          align="center"
                                          style={{ marginTop: "20px" }}
                                        >
                                          <Button
                                            style={{ fontSize: "13px" }}
                                            size="small"
                                            type="submit"
                                            onClick={() => {
                                              history("/Certificates");
                                            }}
                                            //   onClick={handleClose}
                                            variant="contained"
                                          >
                                            Close
                                          </Button>
                                        </Typography>
                                      </>
                                    ) : (
                                      <>
                                        <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "26px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Form Selection Guide Result
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          We are not authorized to provide tax
                                          advice through this process, but the
                                          answers provided suggest that you may
                                          need to provide a Form W-8EXP.
                                          "Certificate of Foreign Government or
                                          Other Foreign Organization for United
                                          States Tax Withholding".
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Who should submit a Form W-8EXP?
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          You must provide a valid Form W-8BEN-E
                                          to the withholding agent or payer if
                                          submitting a U.S. tax certificate on
                                          behalf of a Foreign Person who is the
                                          beneficial owner of an amount subject
                                          to U.S. tax withholding. Form W-8BEN-E
                                          should be provided whether or not you
                                          are claiming a reduced rate of, or
                                          exemption from withholding.
                                        </Typography>

                                        <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          If you need further guidance you may
                                          wish to contact your local tax
                                          advisers.
                                        </Typography>
                                        <Typography
                                          align="center"
                                          style={{ marginTop: "20px" }}
                                        >
                                          <Button
                                          style={{ fontSize: "13px" }}
                                            size="small"
                                            type="submit"
                                            onClick={() => {
                                              history("/Certificates");
                                            }}
                                            //   onClick={handleClose}
                                            variant="contained"
                                          >
                                            Close
                                          </Button>
                                        </Typography>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </>
                        ) : Trust === "No" ? (
                          <>
                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "26px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              Form Selection Guide Result
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              We are not authorized to provide tax advice
                              through this process, but the answers provided
                              suggest that you may need to provide a Form
                              W-8EXP. "Certificate of Foreign Government or
                              Other Foreign Organization for United States Tax
                              Withholding".
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              Who should submit a Form W-8EXP?
                            </Typography>

                            <Typography
                              align="left"
                              className="mt-3"
                              style={{ fontSize: "16px", color: "#383a3b" }}
                            >
                              You must provide a valid Form W-8BEN-E to the
                              withholding agent or payer if submitting a U.S.
                              tax certificate on behalf of a Foreign Person who
                              is the beneficial owner of an amount subject to
                              U.S. tax withholding. Form W-8BEN-E should be
                              provided whether or not you are claiming a reduced
                              rate of, or exemption from withholding.
                            </Typography>

                            <Typography
                              align="center"
                              className="mt-3"
                              style={{
                                fontSize: "16px",
                                color: "#383a3b",
                                fontWeight: "bold",
                              }}
                            >
                              If you need further guidance you may wish to
                              contact your local tax advisers.
                            </Typography>
                            <Typography
                              align="center"
                              style={{ marginTop: "20px" }}
                            >
                              <Button
                                style={{ fontSize: "13px" }}
                                size="small"
                                type="submit"
                                onClick={() => {
                                  history("/Certificates");
                                }}
                                //   onClick={handleClose}
                                variant="contained"
                              >
                                Close
                              </Button>
                            </Typography>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : Tin === "No" ? (
                      <>
                        <Typography
                          align="center"
                          className="mt-3"
                          style={{
                            fontSize: "20px",
                            color: "#383a3b",
                            fontWeight: "bold",
                          }}
                        >
                          A Treaty Benefit or Foreign Person Claim
                        </Typography>
                        <Typography
                          align="left"
                          className="mt-3"
                          style={{ fontSize: "16px", color: "#383a3b" }}
                        >
                          Are you making this submission to claim treaty
                          benefits (if applicable) or making the submission
                          only to claim Foreign Person status for U.S. tax
                          purposes?
                        </Typography>
                        <Typography align="left"
                          className="mt-3"
                          style={{ fontSize: '16px', color: '#383a3b' }}>
                          A Foreign Person in this context includes all non-U.S. persons that could be described as, non-resident alien individuals, foreign (non-U.S.); corporations, partnerships, trusts estates and any other person that is not a U.S. person for U.S. tax purposes whether or not the resident country has an applicable tax treaty with the United States. It also includes a foreign branch or office of a U.S. financial institution or U.S. clearing organization if the foreign branch is a registered as a qualified intermediary.
                        </Typography>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={Benefit}
                            onChange={handleBenefitChange}
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              className="label"
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>

                       
                      </>
                     
                    ) : (
                      ""
                    )}
                    {Benefit === "No" ? (
                     <>
                     <Typography
                       align="center"
                       className="mt-3"
                       style={{
                         fontSize: "20px",
                         color: "#383a3b",
                         fontWeight: "bold",
                       }}
                     >
                       Foreign Government or International
                       Organization
                     </Typography>
                     <Typography
                       align="left"
                       className="mt-3"
                       style={{ fontSize: "16px", color: "#383a3b" }}
                     >
                       Are you making the submission on behalf of a
                       foreign government or other foreign
                       organization, claiming applicability of
                       sections of 115(2), 501(c) 892 895 or 1443(b)
                       of the Internal Revenue Code?
                     </Typography>
                     <Typography
                       align="left"
                       className="mt-3"
                       style={{ fontSize: "16px", color: "#383a3b" }}
                     >
                       AA foreign government includes only the
                       integral parts or controlled entities of a
                       foreign sovereign as defined in Temporary
                       Regulations section 1.892-2T.
                     </Typography>
                     <Typography
                       align="left"
                       className="mt-3"
                       style={{ fontSize: "16px", color: "#383a3b" }}
                     >
                       An integral part of a foreign sovereign, in
                       general is any person, body of persons,
                       organizations, agency, bureau fund,
                       instrumentality, or other body, however
                       designated that constitutes a governing of a
                       foreign country. The net earnings of the
                       governing authority must be credited to its
                       own account or to other accounts of the
                       foreign sovereign with no portion benefiting
                       any private person.
                     </Typography>
                     <Typography
                       align="left"
                       className="mt-3"
                       style={{ fontSize: "16px", color: "#383a3b" }}
                     >
                       An international organization is any public
                       international organization entitled to enjoy
                       privileges exemptions and immunities as an
                       international organization under the
                       International Organizations Immunity Act. (22
                       U.S.C. 288-288(f)). In general to qualify as
                       an international organization, the United
                       States must participate in the organization
                       pursuant to a treaty or under the authority of
                       an Act of Congress authorization such
                       participation.
                     </Typography>
                     <FormControl>
                       <RadioGroup
                         row
                         aria-labelledby="demo-row-radio-buttons-group-label"
                         name="row-radio-buttons-group"
                         value={ForeignRES}
                         onChange={handleForeignRESChange}
                       >
                         <FormControlLabel
                           value="Yes"
                           control={<Radio />}
                           label="Yes"
                         />
                         <FormControlLabel
                           className="label"
                           value="No"
                           control={<Radio />}
                           label="No"
                         />
                       </RadioGroup>
                     </FormControl>

                     {ForeignRES === "No" ? (
                       <>
                          <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "26px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Form Selection Guide Result
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          We are not authorized to provide tax
                                          advice through this process, but the
                                          answers provided suggest that you may
                                          need to provide a Form W-8BEN-E. A
                                          Form W-8BEN-E is "A Certificate of
                                          Foreign Status of Beneficial Owner for
                                          United States Tax Withholding".
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Who should submit a Form W-8BEN-E?
                                        </Typography>

                                        <Typography
                                          align="left"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                          }}
                                        >
                                          You must provide a valid Form W-8BEN-E
                                          to the withholding agent or payer if
                                          submitting a U.S. tax certificate on
                                          behalf of a Foreign Person who is the
                                          beneficial owner of an amount subject
                                          to U.S. tax withholding. Form W-8BEN-E
                                          should be provided whether or not you
                                          are claiming a reduced rate of, or
                                          exemption from withholding.
                                        </Typography>

                                        <Typography
                                          align="center"
                                          className="mt-3"
                                          style={{
                                            fontSize: "16px",
                                            color: "#383a3b",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          If you need further guidance you may
                                          wish to contact your local tax
                                          advisers.
                                        </Typography>
                                        <Typography
                                          align="center"
                                          style={{ marginTop: "20px" }}
                                        >
                                          <Button
                                           style={{ fontSize: "13px" }}
                                            size="small"
                                            type="submit"
                                            onClick={() => {
                                              history("/Certificates");
                                            }}
                                            //   onClick={handleClose}
                                            variant="contained"
                                          >
                                            Close
                                          </Button>
                                        </Typography>
                        
                       </>
                     ) : (
                       ""
                     )}
                   </>
                     ):(
                      ""
                    )}
                   

                  </>
                  
                ) : (
                  ""
                )}
                


                {Disregarded === "Yes" ? (
                 <>
                 <Typography
                  align="center"
                  className="mt-3"
                  style={{
                    fontSize: "26px",
                    color: "#383a3b",
                    fontWeight: "bold",
                  }}
                >
                  Form Selection Guide Result
                </Typography>
                <Typography
                  align="left"
                  className="mt-3"
                  style={{
                    fontSize: "16px",
                    color: "#383a3b",
                  }}
                >
You have stated that the Foreign Person you are making this submission on behalf of is a Disregarded Entity for U.S. tax purposes.
                </Typography>

              
                <Typography
                  align="left"
                  className="mt-3"
                  style={{
                    fontSize: "16px",
                    color: "#383a3b",
                    fontWeight: "bold",
                  }}
                >
                  We are not authorized to provide tax advice through this process, but the answers provided suggest that you may need to have the owner of the Disregarded Entity submit a U.S. tax certificate on their own behalf.

                </Typography>

               

                <Typography
                  align="left"
                  className="mt-3"
                  style={{
                    fontSize: "16px",
                    color: "#383a3b",
                  }}
                >
                 If you have the required authority or appropriate power of attorney to make a submission on their behalf go back and make a selection that describes the disregarded entity's classification for U.S. tax purposes.

                </Typography>

                

               



                <Typography
                  align="center"
                  className="mt-3"
                  style={{
                    fontSize: "16px",
                    color: "#383a3b",
                    fontWeight: "bold",
                  }}
                >
                  If you need further guidance you may
                  wish to contact your local tax
                  advisers.
                </Typography>
                <Typography
                  align="center"
                  style={{ marginTop: "20px" }}
                >
                  <Button
                   style={{ fontSize: "13px" }}
                    size="small"
                    type="submit"
                    onClick={() => {
                      history("/Certificates");
                    }}
                    //   onClick={handleClose}
                    variant="contained"
                  >
                    Close
                  </Button>
                </Typography>
                 </>

                ) :
                Disregarded === "No" ?(
                  <>
                  <Typography
                   align="center"
                   className="mt-3"
                   style={{
                     fontSize: "26px",
                     color: "#383a3b",
                     fontWeight: "bold",
                   }}
                 >
                   Form Selection Guide Result
                 </Typography>
 
               
                 <Typography
                   align="left"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                     fontWeight: "bold",
                   }}
                 >
                   We are not authorized to provide tax advice through this process, but the answers provided suggest you may need to provide a Form W-8IMY. "Certificate of Foreign Intermediary, Foreign Flow-through Entity, or Certain U.S. Branches for United States Tax Withholding"....
 
                 </Typography>
 
                 <Typography
                   align="left"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                   }}
                 >
                 A valid Form W-IMY and any associated documentation must be provided by:
                 </Typography>
 
 
                 <Typography
                   align="left"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                   }}
                 >
                  Qualified Intermediaries not acting on their own account representing they will provide withholding statements as required
                 </Typography>
 
                 <Typography
                   align="left"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                   }}
                 >
 Nonqualified intermediaries not acting on their own account and if applicable transmit withholding statements, associated certificates or other documentary evidence as required
                 </Typography>
 
                 <Typography
                   align="left"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                   }}
                 >
 Foreign Partnerships, Foreign Simple or Grantor Trusts to establish that they are non-withholding for purposes of section 1441 and 1442 and to represent that the income is not effectively connected with a U.S. trade or business; and that the form is being used to transmit withholding certificates and associated documentation as required
                 </Typography>
 
                 <Typography
                   align="left"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                   }}
                 >
 For a detailed explanation of who should submit a form W-8IMY please see the IRS instructions.
                 </Typography>
 
 
 
                 <Typography
                   align="center"
                   className="mt-3"
                   style={{
                     fontSize: "16px",
                     color: "#383a3b",
                     fontWeight: "bold",
                   }}
                 >
                   If you need further guidance you may
                   wish to contact your local tax
                   advisers.
                 </Typography>
                 <Typography
                   align="center"
                   style={{ marginTop: "20px" }}
                 >
                   <Button
                     style={{ fontSize: "13px" }}
                     size="small"
                     type="submit"
                     onClick={() => {
                       history("/Certificates");
                     }}
                     //   onClick={handleClose}
                     variant="contained"
                   >
                     Close
                   </Button>
                 </Typography>
                  </> ):""}


              </Paper>
              <Typography
                align="center"
                style={{
                  color: "#adadac",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                Do you want to go back?
              </Typography>
              <Typography align="center">
                <Button
                  onClick={() => {
                    history("/form");
                  }}
                  variant="contained"
                  size="small"
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                 
                  Back
                </Button>
              </Typography>
            </Paper>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Form;
