import { FactorySharp } from "@mui/icons-material";
import Utils from "../../Utils";

const initialState={
    chapter3Data : [],
    FATCAClassificationData : []
}

const CaymanEntityReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case Utils.actionName.InsertCaymanEntityNonUSChapter3DataRedux:
        return { 
            ...state,
            chapter3Data : action.payload 
        };

      case Utils.actionName.InsertCaymanEntityNonUSFATCAClassification:
        const { payload } = action;
        const mergedFATCAClassificationData = {
          ...state.FATCAClassificationData,
          ...payload
        };

        return {
            ...state,
            FATCAClassificationData: mergedFATCAClassificationData
        };


      case Utils.actionName.InsertCaymanEntityNonUSFATCAClassificationEmpty:
        return {
            ...state,
            FATCAClassificationData: []
        };


      default:
        return state;
    }
  }
  export default CaymanEntityReducer;