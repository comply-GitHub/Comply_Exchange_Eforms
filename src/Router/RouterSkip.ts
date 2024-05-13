import { GetAgentSkippedSteps } from "../Redux/Actions";
import store from "../Redux/store";
const handleBENESupportingDocsBackRoute = () => {
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  if (PrevStepData?.isClaimTreaty === "no" || PrevStepData?.isClaimTreaty === false) {
      return "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E"
      
  } else {
     return "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE"
      
  }
}
const handleBackRoute = () => {
  const PrevStepData = JSON.parse(localStorage.getItem("PrevStepData") || "{}");
  if (PrevStepData?.isClaimTreaty === "no" || PrevStepData?.isClaimTreaty === false) {
      return "/W-8BEN/Declaration/US_Tin/Claim"
      
  } else {
     return "/W-8BEN/Declaration/US_Tin/Rates"
      
  }
}

const Redirect = async (
  stepRoute: string = "W-8ECI/Info",
  agentId: number = 3,
  navigate: Function,
  isback: boolean = false
) => {
  // api call section does the call only once when the data not available in redux
  let mappingAvailable = store.getState().SkippedSteps;
  await Promise.all([
    new Promise((resolve, reject) => {
      if (mappingAvailable.length == 0) {
        store.dispatch(
          GetAgentSkippedSteps(agentId, (data: any[]) => {
            mappingAvailable = data;
            resolve("data fetched");
          })
        );
      } else {
        resolve("data available");
      }
    }),
  ]);
  console.log(mappingAvailable, "mappingAvailable");
  switch (stepRoute) {
    //ECI section
    case "/W-8ECI/Info":
      if (
        mappingAvailable.filter((x) => x.id == 15 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step
        //  console.log("1111111 calling recursion based tax purpose")
        if (!isback) {
          // going forward in forms case
          Redirect("/W-8ECI/Tax_Purpose", agentId, navigate);
        } else {
          // going back in forms case
          Redirect("/Certificates", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "W-8ECI/Tax_Purpose":
      if (
        mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect("/W-8ECI/Tax_Payer", agentId, navigate);
        } else {
          // going back in forms case
          Redirect("/W-8ECI/Info", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "W-8ECI/Tax_Payer":
      if (
        mappingAvailable.filter((x) => x.id == 29 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect("/W-8ECI/Income", agentId, navigate);
        } else {
          // going back in forms case
          Redirect("/W-8ECI/Tax_Purpose", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/W-8ECI/Income":
      if (
        mappingAvailable.filter((x) => x.id == 27 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect("/W-8ECI/Certification", agentId, navigate);
        } else {
          // going back in forms case
          Redirect("/W-8ECI/Tax_Payer", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/W-8ECI/Certification":
      if (
        mappingAvailable.filter((x) => x.id == 46 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect("/W-8ECI/Certification/Participation", agentId, navigate);
        } else {
          // going back in forms case
          Redirect("/W-8ECI/Income", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/W-8ECI/Certification/Participation":
      if (
        mappingAvailable.filter((x) => x.id == 47 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/W-8ECI/Certification/Participation/Submit_Eci",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect("/W-8ECI/Certification", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/W-8ECI/Certification/Participation/Submit_Eci":
      navigate("/W-8ECI/Certification/Participation/Submit_Eci"); //Mandetory Step
      break;

    //BenE section
    case "/Attach_document_BENE":
      if (
        mappingAvailable.filter((x) => x.id == 32 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            handleBENESupportingDocsBackRoute(),
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

    // case "/BenE/Tax_Purpose_BenE":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 15 && x.agentId == agentId) //x.id not confirmed
    //       .length > 0
    //   ) {
    //     //skip condition
    //     //redirecting to next step
    //     //  console.log("1111111 calling recursion based tax purpose")
    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/BenE/Tax_Purpose_BenE/Declaration_BenE",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/Certificates", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    // case "/BenE/Tax_Purpose_BenE/Declaration_BenE":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/BenE/Tax_Purpose_BenE", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    // case "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect(
    //         "/BenE/Tax_Purpose_BenE/Declaration_BenE",
    //         agentId,
    //         navigate
    //       );
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;

    case "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/DisregardedBeneE":
      if (
        mappingAvailable.filter((x) => x.id == 22 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

    // case "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/BenE/Tax_Purpose_BenE", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    case "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E":
      if (
        mappingAvailable.filter((x) => x.id == 52 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

    //Exp Section
    case "/Exp/Tax_Purpose_Exp":
      if (
        mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step
        //  console.log("1111111 calling recursion based tax purpose")
        if (!isback) {
          // going forward in forms case
          Redirect("/Exp/Tax_Purpose_Exp/Chapter4_Exp", agentId, navigate);
        } else {
          // going back in forms case
          Redirect("/Certificates", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/Exp/Tax_Purpose_Exp/Chapter4_Exp":
      if (
        mappingAvailable.filter((x) => x.id == 20 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect("/Exp/Tax_Purpose_Exp", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    // case "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 20 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/Exp/Tax_Purpose_Exp/Chapter4_Exp", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    case "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp":
      if (
        mappingAvailable.filter((x) => x.id == 44 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp":
      if (
        mappingAvailable.filter((x) => x.id == 45 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp/Submit_Exp",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp/Submit_Exp":
      if (
        mappingAvailable.filter((x) => x.id == 45 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp/Submit_Exp/ThankYou_Exp",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

    //IMY section

    case "/IMY/Tax_Purpose_Exp/DisregardedImy":
      if (
        mappingAvailable.filter((x) => x.id == 22 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/IMY/Tax_Purpose_Exp/Chapter4_IMY",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

    // case "/IMY/Tax_Purpose_Exp":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 20 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/IMY/Tax_Purpose_Exp/Chapter4_IMY",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/Certificates", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    //case "/IMY/Tax_Purpose_Exp/Chapter4_IMY":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 20 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/IMY/Tax_Purpose_Exp", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    // case "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY":
    //   if (
    //     mappingAvailable.filter((x) => x.id == 20 && x.agentId == agentId)
    //       .length > 0
    //   ) {
    //     //x.id not confirmed
    //     //skip condition
    //     //redirecting to next step

    //     if (!isback) {
    //       // going forward in forms case
    //       Redirect(
    //         "/IMY/Tax_Purpose_Exp/Chapter4_IMY",
    //         agentId,
    //         navigate
    //       );
    //     } else {
    //       // going back in forms case
    //       Redirect("/IMY/Tax_Purpose_Exp/Chapter4_IMY/Statement", agentId, navigate);
    //     }
    //   } else {
    //     // step is not skipped
    //     navigate(stepRoute);
    //   }
    //   break;
    case "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY":
      if (
        mappingAvailable.filter((x) => x.id == 45 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/IMY/Tax_Purpose_Exp/Chapter4_IMY/Statement",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

    //  8233 Section
    case "/Form8233/TaxPayer_Identification/Owner/Documentaion":
      if (
        mappingAvailable.filter((x) => x.id == 53 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/Form8233/TaxPayer_Identification/Owner/Claim_part",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification":
      if (
        mappingAvailable.filter((x) => x.id == 48 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/Form8233/TaxPayer_Identification/Owner/Documentaion",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233":
      if (
        mappingAvailable.filter((x) => x.id == 13 && x.agentId == agentId)
          .length > 0
      ) {
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233/ThankYou_8233",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect(
            "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;

      // w9
      case "/Attach_document_w9":
        if (
          mappingAvailable.filter((x) => x.id == 30 && x.agentId == agentId)
            .length > 0
        ) {
          //skip condition
          //redirecting to next step
  
          if (!isback) {
            // going forward in forms case
            Redirect(
              "/US_Purposes/Back/Exemption/Tax/Certificates",
              agentId,
              navigate
            );
          } else {
            // going back in forms case
            Redirect(
              "/US_Purposes/Back/Exemption/Tax",
              agentId,
              navigate
            );
          }
        } else {
          // step is not skipped
          navigate(stepRoute);
        }
        break;
  
//BEN
case "/Attach_document_BEN":
  if (
    mappingAvailable.filter((x) => x.id == 31 && x.agentId == agentId)
      .length > 0
  ) {
    //skip condition
    //redirecting to next step

    if (!isback) {
      // going forward in forms case
      Redirect(
        "/W-8BEN/Declaration/US_Tin/Certificates",
        agentId,
        navigate
      );
    } else {
      // going back in forms case
      Redirect(
        handleBackRoute(),
        agentId,
        navigate
      );
    }
  } else {
    // step is not skipped
    navigate(stepRoute);
  }
  break;

//ECI
case "/Attach_document_ECI":
  if (
    mappingAvailable.filter((x) => x.id == 36 && x.agentId == agentId)
      .length > 0
  ) {
    //skip condition
    //redirecting to next step

    if (!isback) {
      // going forward in forms case  ContinueRoute='/W-8ECI/Certification'
               
      Redirect(
        "/W-8ECI/Certification",
        agentId,
        navigate
      );
    } else {
      // going back in forms case
      Redirect(
        "/W-8ECI/Income",
        agentId,
        navigate
      );
    }
  } else {
    // step is not skipped
    navigate(stepRoute);
  }
  break;

//EXP
case "/Attach_document_EXP":
  if (
    mappingAvailable.filter((x) => x.id == 34 && x.agentId == agentId)
      .length > 0
  ) {
    //skip condition
    //redirecting to next step

    if (!isback) {
      // going forward in forms case  ContinueRoute='/W-8ECI/Certification'
               
      Redirect(
        "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp",
        agentId,
        navigate
      );
    } else {
      // going back in forms case
      Redirect(
        "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp",
        agentId,
        navigate
      );
    }
  } else {
    // step is not skipped
    navigate(stepRoute);
  }
  break;
// IMY


case "/Attach_document_IMY":
  if (
    mappingAvailable.filter((x) => x.id == 33 && x.agentId == agentId)
      .length > 0
  ) {
    //skip condition
    //redirecting to next step

    if (!isback) {
      // going forward in forms case  ContinueRoute='/W-8ECI/Certification'
               
      Redirect(
        "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY",
        agentId,
        navigate
      );
    } else {
      // going back in forms case
      Redirect(
        "/IMY/Tax_Purpose_Exp/Chapter4_IMY/Statement",
        agentId,
        navigate
      );
    }
  } else {
    // step is not skipped
    navigate(stepRoute);
  }
  break;

//8233
case "/Form8233/TaxPayer_Identification/Owner/Documentaion":
  if (
    mappingAvailable.filter((x) => x.id == 53 && x.agentId == agentId)
      .length > 0
  ) {
    //skip condition
    //redirecting to next step

    if (!isback) {
      // going forward in forms case  ContinueRoute='/W-8ECI/Certification'
               
      Redirect(
        "/Form8233/TaxPayer_Identification/Owner/Documentaion/certification",
        agentId,
        navigate
      );
    } else {
      // going back in forms case
      Redirect(
        "/Form8233/TaxPayer_Identification/Owner/Claim_part",
        agentId,
        navigate
      );
    }
  } else {
    // step is not skipped
    navigate(stepRoute);
  }
  break;


    default:
      navigate(stepRoute);
  }
};

export default Redirect;
