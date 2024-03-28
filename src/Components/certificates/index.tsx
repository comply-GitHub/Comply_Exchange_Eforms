import React, { useEffect } from "react";
import { useState } from "react";
import "./index.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Info from "@mui/icons-material/Info";
import { Tooltip, Paper, Link } from "@mui/material";
import Form from "../reusables/Formguide";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { postFormSelection, GetHelpVideoDetails } from "../../Redux/Actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import checksolid from "../../assets/img/check-solid.png";
import agreement from "../../assets/img/agreement.png";
import docIcon from "../../assets/img/docIcon.png";
import useAuth from "../../customHooks/useAuth";
export default function Certificates(props: any) {

  const { authDetails } = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const clickInfo = () => {
    alert(
      "Instructor Identifier Format is ?*********************** \n 9- Numeric Value Only \n A - Alphabetical Character Only \n* = Alphanumeric Character only \n ? - Characters optional after this"
    );
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedCard, setSelectedCard] = useState("");
  const [toolInfo, setToolInfo] = useState("");
  const [InfoMore, setInfoMore] = useState("");
  const [diableForm, setDisableForm] = useState("usIndividual");
  type ComponentPaths = {
    [key: string]: string;
  };
  const handleCardSelect = (card: any) => {
    if (card.enabled.includes(diableForm)) {
      setSelectedCard(card.id);
    }
  };

  useEffect(()=>{
    document.title = "Form Selection"
  },[])

  useEffect(() => {
    dispatch(GetHelpVideoDetails());
    let onboardingStingifiedData = localStorage.getItem("agentDetails");
    let onboardingData;
    let isDisabledFormed;
    let selectedEntity = false;
    if (onboardingStingifiedData !== null) {
      onboardingData = JSON.parse(onboardingStingifiedData);
      selectedEntity = onboardingData.businessTypeId === 2;
    }
    console.log("DATA", onboardingData)
    if (onboardingData !== "" && onboardingData !== null) {
      if (onboardingData?.isUSIndividual == true && selectedEntity == false) {
        isDisabledFormed = "usIndividual"
      } else if (onboardingData?.isUSIndividual == false && selectedEntity == false) {
        isDisabledFormed = "usNonIndividual"
      } else if (onboardingData?.isUSEntity == true && selectedEntity == true) {
        isDisabledFormed = "usEntity"
      } else if (onboardingData?.isUSEntity == false && selectedEntity == true) {
        isDisabledFormed = "usNonEntity"
      } else {
        isDisabledFormed = "usIndividual"
      }
      console.log(isDisabledFormed, "isDisabledFormed")
      setDisableForm(isDisabledFormed);

    }
  }, [authDetails]);
  const redirectToComponent = (cardId: string) => {
    let formSelection = JSON.parse(
      localStorage.getItem("formSelection") || "{}"
    );
    // let submitData = {
    //   agentId: formSelection.agentId,
    //   confirmationCode: formSelection.confirmationCode,
    //   securityAnswer: formSelection.securityAnswer,
    //   formSelection: cardId,
    // };
    //Id	FormName
    // 1	W-9
    // 2	W-8BEN
    // 3	W-8BEN-E
    // 4	W-8ECI
    // 6	W-8EXP
    // 7	W-8IMY
    // 8	Form 8233
    const componentPaths: ComponentPaths = {
      "W-9": "/W9/purposes",
      "W-8BEN": "/W-8BEN/Declaration",
      "W-8ECI": "/W-8ECI/Info",
      "form 8233": "/Form8233/SubstantialPresence",
      "W-8BEN-E": "/BenE/Tax_Purpose_BenE",
      "W-8EXP": "/Exp/Tax_Purpose_Exp",
      "W-8IMY": "/IMY/Tax_Purpose_Exp"
    };
    // dispatch(
    //   postFormSelection(submitData, () => {
    //     if (componentPaths.hasOwnProperty(cardId)) {
    //       history(componentPaths[cardId]);
    //     }
    //   })
    // );

    // if (componentPaths.hasOwnProperty(cardId)) {
    history(componentPaths[cardId]);
    // }
  };
  const GethelpData = useSelector(
    (state: any) => state.GetHelpVideoDetailsReducer.GethelpData
  );
  const cards = [
    {
      id: "W-9",
      title: "W-9",
      enabled: ["usIndividual", "usEntity"],
      description:
        "Used by individuals and entities to certify US Tax ID number",
    },
    {
      id: "W-8BEN",
      title: "W-8BEN",
      enabled: ["usNonIndividual"],
      description:
        "Used by individuals to certify beneficial owner, or account holder of financial institution, and claim treaty benefits",
    },
    {
      id: "W-8BEN-E",
      title: "W-8BEN-E",
      enabled: ["usNonEntity"],
      description:
        "Used by entities to certify beneficial owner, or account holder of financial institution, and claim treaty benefits",
    },
    {
      id: "W-8ECI",
      title: "W-8ECI",
      enabled: ["usNonIndividual", "usNonEntity"],
      description:
        "Used by individuals, or entities, to certify beneficial owner receiving U.S. sourced income that is effectively connected with a U.S. trade or business ",
    },
    {
      id: "W-8EXP",
      title: "W-8EXP",
      enabled: ["usNonEntity"],
      description:
        "Used by governments, or other tax exempt entities, to certify beneficial owner, or account holder of financial institution",
    },
    {
      id: "W-8IMY",
      title: "W-8IMY",
      enabled: ["usNonEntity"],
      description:
        "Used by entities to certify intermediary, or flow through entity, receiving payments on behalf of another person",
    },
    {
      id: "form 8233",
      title: "Form 8233",
      enabled: ["usNonIndividual"],
      description:
        "Used by individuals to certify beneficial owner claiming treaty exemption on compensation for personal services",
    },
  ];

  return (
    <section
      className="inner_content backGround_Image py-4"
      style={{ marginBottom: "10px" }}
    >

      <div className="overlay-div">
        <div className="overlay-div-group">
          <div className="viewInstructions">View Instructions</div>
          <div className="viewform">View Form</div>
          <div className="helpvideo">

            {GethelpData && GethelpData[2].id === 4 ? (
              <a
                href={GethelpData[2].fieldValue}
                target="popup"
                onClick={() =>
                  window.open(
                    GethelpData[2].fieldValue,
                    'name',
                    `width=${GethelpData[2].width},height=${GethelpData[2].height},top=${GethelpData[2].top},left=${GethelpData[2].left}`
                  )
                }
              >
                Help Video
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: "17px" }}>
        {InfoMore == "W-9" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                W-9
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                Form W-9 - Request for Taxpayer Identification Number and
                Certification.
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                The requestor must obtain your correct taxpayer identification
                number (TIN) which may be your social security number (SSN),
                individual taxpayer identification number (ITIN), adoption
                taxpayer identification number (ATIN), or employer
                identification number (EIN), to report on an information return
                the amount paid to you, or other amount reportable on an
                information return.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        {InfoMore == "W-8BEN" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                W-8BEN
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                Form W-8BEN - Certificate of Foreign Status of Beneficial Owner
                for US Tax Withholding
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                The purpose of the W-8BEN form is to establish that you are a
                non-US person or entity. As the beneficial owner of the income
                for which, the W-8BEN form is being provided, completion of this
                form will enable you to claim a reduced rate of or exemption
                from withholding tax as a resident of a foreign country with
                which, the US has an Income Treaty.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        {InfoMore == "W-8BEN-E" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                W-8BEN-E
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                Form W-8BEN-E - Certificate of Foreign Status of Beneficial
                Owner for U.S. Tax Withholding and Reporting (Entities).
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                The purpose of the W-8BEN-E form is to establish that you are a
                non-U.S. person or entity. As the beneficial owner of the income
                for which, the W-8BEN-E form is being provided, completion of
                this form will enable you to claim a reduced rate of or
                exemption from withholding tax as a resident of a foreign
                country with which, the U.S. has an Income Treaty.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        {InfoMore == "W-8IMY" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                W-8IMY
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                FORM W-8IMY - Certificate of Foreign Intermediary, Foreign
                Flow-Through, or Certain U.S. Branches for United States Tax
                Withholding
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                Primarily, you must submit Form W-8IMY if you are a foreign
                person, or a foreign branch of a U.S. person, to establish that
                you are either a Qualified or Non-qualified intermediary that is
                not acting on your own account.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        {InfoMore == "W-8ECI" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                W-8ECI
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                Form W-8ECI - Certificate of Foreign Person’s Claim That Income
                is Effectively Connected With the Conduct of a Trade or Business
                in the US.
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                Submit form W-8ECI if you are a FOREIGN PERSON (Individual or a
                Foreign Business or Organization) and the Beneficial Owner of
                U..source income that is (or deemed to be) effectively connected
                with the conduct or trade of business with in the US. You may
                also need to file an annual US income tax return to report
                income claimed to be effectively connected. A Disregarded Entity
                may also need to fill out Form W-8ECI.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        {InfoMore == "W-8EXP" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                W-8EXP
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                FORM W-8EXP - Certificate of Foreign Government or Other Foreign
                Organization For United States Tax Withholding
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                Submit Form W-8EXP if you are a Foreign Government,
                International Organization, Foreign Central Bank of Issue,
                Foreign Tax-exempt Organization, Foreign Private Foundation, or
                Government of a U.S. possession. Submit Form W-8EXP whether or
                not you are claiming a reduced rate of, or exemption from U.S.
                tax withholding.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        {InfoMore == "form 8233" ? (
          <Paper
            style={{
              backgroundColor: "#cce5ff",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <div style={{ margin: "20px" }}>
              <Typography
                style={{
                  fontSize: "20px",
                  marginTop: "10px",
                  color: "#56595c",
                  fontWeight: "550",
                }}
              >
                8233
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "20px",
                  fontWeight: "550",
                  color: "#274b6e",
                }}
              >
                FORM 8233 - Exemption From Withholding on Compensation for
                Independent (and Certain Dependent) Personal Services of a
                Nonresident Alien Individual
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  marginTop: "18px",
                  color: "#274b6e",
                }}
              >
                The Form 8233 is used by non-U.S. persons to certify their
                status as a non-U.S. individual and to claim treaty benefits for
                compensation for independent or dependent personal services in
                the United States. Residents of a treaty country are entitled to
                reduced withholding under an applicable the treaty.
              </Typography>
            </div>
          </Paper>
        ) : (
          ""
        )}

        <div style={{ justifyContent: "space-between", display: "flex" }}>
          <Typography
            align="left"
            style={{
              fontSize: "27px",
              fontWeight: "500",
              color: "white",
              marginLeft: "10px",
            }}
          >
            Certificate Selection for U.S. Tax Purposes
            <span>
              <Tooltip
                style={{ backgroundColor: "black", color: "white" }}
                title={
                  <>
                    <Typography color="inherit">
                      Certificate Selection
                    </Typography>
                    <a onClick={() => setToolInfo("basic")}>
                      <Typography
                        style={{
                          cursor: "pointer",
                          textDecorationLine: "underline",
                        }}
                        align="center"
                      >
                        {" "}
                        View More...
                      </Typography>
                    </a>
                  </>
                }
              >
                <Info
                  style={{
                    color: "#ffc107",
                    fontSize: "20px",
                    cursor: "pointer",
                    verticalAlign: "super",
                  }}
                />
              </Tooltip>
            </span>
          </Typography>

          <Typography align="right">
            <Button
              onClick={() => {
                history("/form");
                // setOpen(true);
              }}
              style={{
                backgroundColor: "#ffc107",
                color: "black",
                fontSize: "10px",
                fontWeight: "550",
              }}
            >
              Form Guide
            </Button>
          </Typography>
        </div>
        {toolInfo === "basic" ? (
          <div>
            <Paper
              style={{
                backgroundColor: "#dedcb1",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                Certificate Selection for U.S. Tax Purposes
              </Typography>
              <Typography style={{ marginTop: "10px" }}>
                Select the most appropriate withholding certificate for your
                status and click Continue.
              </Typography>
              <Typography style={{ marginTop: "20px" }}>
                Based on details entered on the previous page, certain form
                selections which may not be applicable have been greyed out. If
                you believe a form should be available for your completion,
                press the Back button and revisit your details entered on the
                Account Holder Details page.
              </Typography>

              <Typography style={{ marginTop: "20px" }}>
                If you are uncertain which withholding certificate is correct,
                refer to the Read More link on each form and/or the Form Guide
                in the upper right-hand corner.
              </Typography>

              <Typography style={{ marginTop: "20px" }}>EH022</Typography>

              <Link
                href="#"
                underline="none"
                style={{ marginTop: "10px", fontSize: "16px" }}
                onClick={() => {
                  setToolInfo("");
                }}
              >
                --Show Less--
              </Link>
            </Paper>
          </div>
        ) : (
          ""
        )}

        <div
          className="d-flex row forms-card-data"
        >
          {cards.map((card, index1) => (
            <Card
              key={card?.id}
              className={card.enabled.includes(diableForm) ? "mx-3 mt-3" : "mx-3 mt-3 disabled"}
              sx={{
                width: "310px",
                border:
                  selectedCard === card.id
                    ? "7px solid #ffc107"
                    : "7px solid transparent",
              }}
              onClick={() => handleCardSelect(card)}
            >
              <div
                tabIndex={index1}
                onFocus={() => handleCardSelect(card)}
                onKeyDown={(e: any) => {
                  if (e.code.toLowerCase() === "enter" && e?.target?.tagName?.toUpperCase() === "DIV") {
                    redirectToComponent(selectedCard)
                  }
                }}
              >
                <CardContent>
                  <div className="iconBox text-center" >
                    <img src={docIcon} alt="" className="img-fluid mb-2" />
                  </div>
                  <div className="check-div">
                    {card.enabled.includes(diableForm) ? (<img src={checksolid} />) : ""}
                  </div>
                  <Typography align="center" variant="h6" component="div">
                    {card?.title}
                  </Typography>

                  <Typography
                    align="center"
                    style={{ fontSize: "13px", marginTop: "14px" }}
                  >
                    {card?.description}
                    <br />
                  </Typography>
                  <Typography align="center">
                    <Button
                      onClick={() => {
                        setInfoMore(card?.id);
                      }}
                      className="mt-4"
                      size="small"
                      style={{ fontWeight: "bold" }}
                    >
                      Read More
                    </Button>
                  </Typography>
                </CardContent>
              </div>

            </Card>

          ))}

          {/* <Card className="mx-3 mt-3"sx={{ width:"330px"}}>
      <CardContent>
       
        <Typography variant="h5" component="div">
          W-8BEN
        </Typography>
       
        <Typography style={{fontSize:"12px",marginTop:"14px"}}>
        Used by individuals to certify beneficial owner, or account holder of financial institution, and claim treaty benefits
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button className="mt-4"size="small">Read More</Button>
      </CardContent>
     
    </Card>
    <Card className="mx-3 mt-3"sx={{ width:"330px"}}>
      <CardContent>
       
        <Typography variant="h5" component="div">
        W-8BEN-E
        </Typography>
       
        <Typography style={{fontSize:"12px",marginTop:"14px"}}>
        Used by entities to certify beneficial owner, or account holder of financial institution, and claim treaty benefits
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button className="mt-4"size="small">Read More</Button>
      </CardContent>
     
    </Card>
    <Card className="mx-3 mt-3"sx={{ width:"330px"}}>
      <CardContent>
       
        <Typography variant="h5" component="div">
         W-8ECI
        </Typography>
       
        <Typography style={{fontSize:"12px",marginTop:"14px"}}>
        Used by individuals, or entities, to certify beneficial owner receiving U.S. sourced income that is effectively connected with a U.S. trade or business 
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button className="mt-4"size="small">Read More</Button>
      </CardContent>
     
    </Card>
    <Card className="mx-3 mt-3"sx={{ width:"330px"}}>
      <CardContent>
       
        <Typography variant="h5" component="div">
          W-8EXP
        </Typography>
       
        <Typography style={{fontSize:"12px",marginTop:"14px"}}>
        Used by governments, or other tax exempt entities, to certify beneficial owner, or account holder of financial institution
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button className="mt-4"size="small">Read More</Button>
      </CardContent>
      
    </Card>
    <Card className="mx-3 mt-3"sx={{ width:"330px"}}>
      <CardContent>
       
        <Typography variant="h5" component="div">
         W-8IMY
        </Typography>
       
        <Typography style={{fontSize:"12px",marginTop:"14px"}}>
        Used by entities to certify intermediary, or flow through entity, receiving payments on behalf of another person
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button className="mt-4"size="small">Read More</Button>
      </CardContent>
     
    </Card>
    <Card className="mx-3 mt-3"sx={{ width:"330px"}}>
      <CardContent>
       
        <Typography variant="h5" component="div">
         form 8233
        </Typography>
       
        <Typography style={{fontSize:"12px",marginTop:"14px"}}> 
       Used by individuals to certify beneficial owner claiming treaty exemption on compensation for personal services
          <br />
          {'"a benevolent smile"'}
        </Typography>
        <Button className="mt-4"size="small">Read More</Button>
      </CardContent>
     
    </Card> */}

          {selectedCard ? (
            <div style={{ marginTop: "20px" }} className="text-center">
              <Button
                style={{
                  marginTop: "35px",
                  border: "1px solid #0095dd",
                  // backgroundColor: "#D2D2D4",
                  // borderColor: "#d2d2d2",
                  color: "#ffff",
                  height: "35px",
                  lineHeight: "normal",
                  textAlign: "center",
                  fontSize: "15px",
                  textTransform: "uppercase",
                  borderRadius: "0px",
                  padding: "0 15px",
                  letterSpacing: "1px",
                }}
                size="small"
                type="submit"
                onClick={() => redirectToComponent(selectedCard)}
                variant="contained"
              // onClick={()=>(
              //   history("/W9")
              // )}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }} className="text-center ">
              <Button
                type="submit"
                size="small"
                style={{
                  marginTop: "35px",
                  border: "1px solid #0095dd",
                  backgroundColor: "#D2D2D4",
                  borderColor: "#d2d2d2",
                  color: "#4a4a4a",
                  height: "35px",
                  lineHeight: "normal",
                  textAlign: "center",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  borderRadius: "0px",

                  padding: "0 15px",
                  letterSpacing: "1px",
                }}
              >
                Continue
              </Button>
            </div>
          )}
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
                history("/login");
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
        </div>
      </div>

      <Form
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </section>
  );
}
