import Utils from "../../Utils";

const initialState={
    
}

const W8EXPReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case Utils.actionName.InsertW8EXPFormEntityNonUs:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  export default W8EXPReducer;