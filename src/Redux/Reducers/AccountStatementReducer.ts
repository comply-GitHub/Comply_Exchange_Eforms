import Utils from "../../Utils";

const {getAllAccountStatement}= Utils.actionName

let initialState={}

  
  const AccountStatementReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case getAllAccountStatement:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
export default AccountStatementReducer;