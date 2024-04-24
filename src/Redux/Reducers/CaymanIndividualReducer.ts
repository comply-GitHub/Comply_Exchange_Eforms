import Utils from "../../Utils";

const initialState={
    
}

const CaymanIndividualReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case Utils.actionName.InsertCaymanIndividualNonUS:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  export default CaymanIndividualReducer;