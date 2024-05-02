import { GetAgentSkippedSteps } from "../Redux/Actions";
import store from "../Redux/store";

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
    case "/BenE/Tax_Purpose_BenE":
      if (
        mappingAvailable.filter((x) => x.id == 15 && x.agentId == agentId) //x.id not confirmed
          .length > 0
      ) {
        //skip condition
        //redirecting to next step
        //  console.log("1111111 calling recursion based tax purpose")
        if (!isback) {
          // going forward in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect("/Certificates", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/BenE/Tax_Purpose_BenE/Declaration_BenE":
      if (
        mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
          .length > 0
      ) {
        //x.id not confirmed
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect("/BenE/Tax_Purpose_BenE", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE":
      if (
        mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
          .length > 0
      ) {
        //x.id not confirmed
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
            "/BenE/Tax_Purpose_BenE/Declaration_BenE",
            agentId,
            navigate
          );
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
    case "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE":
      if (
        mappingAvailable.filter((x) => x.id == 16 && x.agentId == agentId)
          .length > 0
      ) {
        //x.id not confirmed
        //skip condition
        //redirecting to next step

        if (!isback) {
          // going forward in forms case
          Redirect(
            "/BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE",
            agentId,
            navigate
          );
        } else {
          // going back in forms case
          Redirect("/BenE/Tax_Purpose_BenE", agentId, navigate);
        }
      } else {
        // step is not skipped
        navigate(stepRoute);
      }
      break;
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
   
   
   
   
      default:
      navigate(stepRoute);
  }
};

export default Redirect;
