import Utils from "../../Utils";
import GlobalValues from "../../Utils/constVals";


const initialState={
    agentId: 0,
    formTypeSelectionId: 2,
    accountHolderBasicDetailId: 0,
    businessDisgradedEntity: "",
    other: "",
    countryOfIncorporation: 0,
    chapter3Status: 0,
    attachSupportingDocumentFile:null,
    attachSupportingDocument:null,
    descriptionHybridStatus:"",
    isHybridStatus: 0,
    isSubmissionSingleUSOwner: "",
    isDisRegardedSection1446:"",
    statusId: 0,
    //chapter4 status
    chapter4Status: 0,
    isPassiveNFFE40A:false,
    isPassiveNFFE40B:false,
    isPassiveNFFE40C:false,
    isCertify39:false,
    isCertify22Entity:false,
    isCertify18FFI:false,
    isCertify30Entity:false,
    isCertify41Entity:false,
    isCertify34Entity:false,
    planReorganization:"",
    isCertify32Entity:false,
    isCertify33Entity:false,
    priorDate:"",
    isCertify38Entity:false,
    isCertify27Entity:false,
    isCertify28aEntity:false,
    isCertify28bEntity:false,
    isCertify36Entity:false,
    isCertify26Entity:false,
    iGAbetweenUnitedStates:0,
    iGA:"",
    istreated:0,
    otherTreated:"",
    isCertify24aFFIPart1:false,    
    isCertify24bFFIPart1:false,    
    isCertify24cFFIPart1:false,    
    isCertify24dFFIPart1:false,
    isCertify37a:false,
    aEntityStockMarket:"",  
    isCertify37b:false,
    bEntityStockMarket:"",
    namesecuritiesmarket:"",
    isCertify25aEntityPart1:false,
    hasBeenBoundBy:false,
    currentBoundBy:false,
    nameSponsoringEntity:"",
    isCertify43:false,
    nameSponsoringEntity16:"",
    isCertify17a:false,
    isCertify17b:false,
    isCertify35:false,
    payeesection501:"",
    //foreginTIN_CountryId: 0

    // for tin page
    usTinTypeId: "",
    usTin:"",
    tinValue: "",
    notAvailable: false,
    notAvailableReason:"",
    foreignTINCountry: "",
    foreignTIN: "",
    isFTINLegally: false,
    isNotAvailable: "",
    fTinNotAvailableReason:"",
    alternativeTINFormat:"",
    isExplanationNotLegallyFTIN: "",
}

export const W8BENEReducer=(state:any=initialState,action:any)=>{
    switch (action.type) {
        case Utils.actionName.InsertW8BENEEntityNonUSForm:
          return { ...state, ...action.payload };
        default:
          return state;
    }
}

export const W8ECIReducer=(state:any=initialState,action:any)=>{
  switch (action.type) {
      case Utils.actionName.InsertW8ECIIndividualEntityNonUSForm:
        return { ...state, ...action.payload };
      default:
        return state;
  }
}
//InsertW8ECIIndividualEntityNonUSForm