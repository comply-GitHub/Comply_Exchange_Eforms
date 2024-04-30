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

        // Construct a new FATCAClassificationData array by merging the payload into the existing data
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

      
      const mergedFATCAClassificationData = {
        ...state.FATCAClassificationData,
        ...payload
    };

      default:
        return state;
    }
  }
  export default CaymanEntityReducer;