import Utils from "../../Utils";


const initialState={
    agentId:0,
    accountHolderId:0,
    token:"",
    configurations:{}
};

export const AuthDetailsReducer = (state = initialState, action: any): any => {
    switch (action.type) {
      case Utils.actionName.UpdateAuthDetails:
        return {...state, ...action.payload };
      default:
        return state;
    }
  };