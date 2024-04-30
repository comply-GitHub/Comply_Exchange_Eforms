
import Utils from "../../Utils";

const { CREATE_W8_ECI, InsertW8ECIIndividualEntityNonUSForm } = Utils.actionName

let initialState = {
  accountHolderBasicDetailId: 0,
  agentId: 0,
  formTypeSelectionId: 1,
  // eciUsTinTypeId: 0,
  // eciUsTin: "",
  // streetNumberName: "",
  // aptSuite: "",
  // cityTown: "",
  // stateProvinceId: 0,
  // zipPostalCode: "",
  chapter3Status: 0,
  // firstName: "",
  // lastName: "",
  countryOfResidence: 0,
  businessName: "",
  businessDisgradedEntity: "",
  countryOfIncorporation: 0,
  isHybridStatus: 0,
  descriptionHybridStatus: "",
  attachSupportingDocument: "",
  isSubmissionSingleUSOwner: false,
  isDisRegardedSection1446: false,
  isExemptionfromBackup: 0,
  interestDividendPaymentId: 0,
  brokerTransactionsId: 0,
  barterExchangeTransactionId: 0,
  paymentOver600RequiredId: 0,
  paymentThirdPartyNetworkId: 0,
  isExemptionFATCAReportings: false,
  fatcaReportingId: 0,
  // usTinTypeId: 0,
  // usTin: "",
  // notAvailable: false,
  // foreignTINCountry: "",
  // foreignTIN: "",
  // isFTINLegally: false,
  // isNotAvailable: false,
  // alternativeTINFormat: false,
  // isExplanationNotLegallyFTIN: "",
  itemIncomeType: 0,
  incomeDescription: "",
  isAppplicationCheck: false,
  isBeneficialOwnerIncome: false,
  isAmountCertificationUS: false,
  isBeneficialOwnerGrossIncome: false,
  isBeneficialOwnerNotUSPerson: false,
  isAuthorizeWithHoldingAgent: false,
  isCapacityForm: false,
  isTaxpayerIdentificationNumber: false,
  isIRS: false,
  isUSCitizen: false,
  isFATCACode: false,
  isIRSBackupWithHolding: false,
  isElectronicForm: false,
  signedBy: "",
  confirmationCode: "",
  date: "",
  isAcceptanceDeclarations: false,
  securityWord: "",
  hint: "",
  yourConfirmationCode: "",
  isAgreeWithDeclaration: false,
  isConsentRecipent: false,
  isNotConsentRecipent: false,
}

const w8ReducerECI = (state = initialState, action: any) => {
  switch (action.type) {
    case InsertW8ECIIndividualEntityNonUSForm:
      return { ...state, ...action.payload };
    case CREATE_W8_ECI:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
export default w8ReducerECI;