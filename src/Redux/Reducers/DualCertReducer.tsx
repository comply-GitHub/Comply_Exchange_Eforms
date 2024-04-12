import Utils from "../../Utils";

const initialState={
    
}

const DualCertReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case Utils.actionName.InserDualCert:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  export default DualCertReducer;