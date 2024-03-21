import Utils from "../../Utils";

const initialState:any[]=[];


export const substantialUsPassiveNFEReducer=(state:any[]=initialState,action:any)=>{
    switch (action.type) {
        case Utils.actionName.UpdateSubstantialUsPassiveNFE:
          return [ ...action.payload ];
        default:
          return state;
    }
}