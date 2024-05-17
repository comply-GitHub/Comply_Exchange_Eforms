import Utils from "../../Utils";

const initialState:any[]=[]

const WarningReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case Utils.actionName.UpdateWarnings:
        if(state.filter(x=>x?.warningCode===action?.payload?.warningCode 
            && x?.accountHolderBasicDetailId===action?.payload?.accountHolderBasicDetailId
            && x?.formTypeId===action?.payload?.formTypeId
        ).length>0){
            return state;
        }else{ 

            Utils.api.postApiCall(
                Utils.EndPoint.InsertFormWarnings,
                action?.payload,
                (responseData) => {
                  let { data } = responseData;
                  if (responseData) {                   
                  }
                },
                (error:any) => {
                  //console.log(error)                
                },
                "multi"
              );
            return [ ...state, action.payload ];
        }
        break;
      default:
        return state;
    }
}
export default WarningReducer;