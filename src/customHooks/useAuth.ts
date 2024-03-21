import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../Utils";

const useAuth = () => {

  const AuthDetails=useSelector((state:any)=>state?.AuthDetails);
  const dispatch=useDispatch(); 
  const [authData, setAuthData] = useState<any>();

  useEffect(() => {
    if(AuthDetails!==null && AuthDetails!==undefined && AuthDetails.agentId!==0){
      console.log("auth details main",AuthDetails)
      setAuthData(AuthDetails);        
    }else{        
        //check the localstaorage
        let localAuthDetails=JSON.parse(localStorage.getItem("authDetails")||"{}");
        if(localAuthDetails && (localAuthDetails?.agentId!==undefined ||localAuthDetails?.agentId!==0)){
          console.log("auth details from local storage",localAuthDetails)   
          dispatch({
            type: Utils.actionName.UpdateAuthDetails,
            payload: { ...localAuthDetails}
          }) 
        }else{
            //call the api to get the data            
        }
    } 
    
  }, []);

  useEffect(() => {
    if(AuthDetails!==null && AuthDetails!==undefined && AuthDetails.agentId!==0){
      console.log("auth details main",AuthDetails)
      setAuthData(AuthDetails);        
    }    
  }, [AuthDetails]);

  return {authDetails:authData};
};

export default useAuth;
