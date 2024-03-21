import Utils from "../../Utils";
import { ErrorModel } from "../Actions/errormodel";

const initialState:ErrorModel={
    message:"",
    payload:{},
    statusCode:0
}

export const ErrorsReducer = (state = initialState, action: any): any => {
    switch (action.type) {
      case Utils.actionName.UpdateError:
        return {...state, ...action.payload };
      default:
        return state;
    }
  };