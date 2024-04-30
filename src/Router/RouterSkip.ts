import { GetAgentSkippedSteps } from "../Redux/Actions";
import store from "../Redux/store";



const Redirect=async (stepRoute:string="W-8ECI/Info",agentId:number=3,navigate:Function,isback:boolean=false)=>{
    // api call section does the call only once when the data not available in redux
    let mappingAvailable=store.getState().SkippedSteps;
    await Promise.all([new Promise((resolve,reject)=>{
        if(mappingAvailable.length==0){
            store.dispatch(GetAgentSkippedSteps(agentId,(data:any[])=>{
                mappingAvailable=data;
                resolve("data fetched");
            }));
        }else{
            resolve("data available");
        }
    })]);
   
    switch(stepRoute){ 
        ///ECI section
        case "/W-8ECI/Info":            
            if(mappingAvailable.filter(x=>x.id==15 && x.agentId==agentId).length>0 ){
             //skip condition 
             //redirecting to next step
             console.log("1111111 calling recursion based tax purpose")
             if(!isback){
                // going forward in forms case
                 Redirect("/W-8ECI/Tax_Purpose",agentId,navigate);
             }else{
                // going back in forms case
                Redirect("/Certificates",agentId,navigate);
             }
            }else{
                // step is not skipped
                console.log("1111111 naviagting to same step")
                navigate(stepRoute)
            }
            break;
        case "W-8ECI/Tax_Purpose":
            if(mappingAvailable.filter(x=>x.id==16 && x.agentId==agentId).length>0 ){
                //skip condition 
                //redirecting to next step
                // Redirect("W-8ECI/Tax_Purpose",agentId,navigate);
            }else{
                   // step is not skipped
                   navigate(stepRoute)
                }
            break;
        default:
            navigate(stepRoute);
        
    }

}

export default Redirect;