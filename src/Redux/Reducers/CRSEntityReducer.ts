import { FactorySharp } from "@mui/icons-material";
import Utils from "../../Utils";

const initialState={
    chapter3Data : [],
    CRSClassificationData : []
}

const CRSEntityReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case Utils.actionName.InsertCaymanEntityNonUSChapter3DataRedux:
        return { 
            ...state,
            chapter3Data : action.payload 
        };

      case Utils.actionName.InsertCRSEntityNonUSClassification:
        const { payload } = action;
        const mergedCRSClassificationData = {
          ...state.CRSClassificationData,
          ...payload
        };

      return {
          ...state,
          CRSClassificationData: mergedCRSClassificationData
      };
      
      default:
        return state;
    }
  }
  export default CRSEntityReducer;