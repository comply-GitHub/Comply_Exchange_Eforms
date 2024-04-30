import Utils from "../../Utils";

const initialState:any[]=[];

const SkippedStepsReducer=(state:any[]=initialState,action:any)=>{
    switch(action.type){
        case Utils.actionName.UpdateSkippedSteps:
            return[
                ...action.payload,
            ]
            break;
        default:
            return state;
    }

}

export default SkippedStepsReducer;