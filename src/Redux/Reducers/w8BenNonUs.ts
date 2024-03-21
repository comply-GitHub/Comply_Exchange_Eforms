import Utils from "../../Utils";

const {CREATE_W8}= Utils.actionName

let initialState={
    accountHolderBasicDetailId: 0,
    agentId: 0,
    formTypeSelectionId: 0,
    isHeldUSCitizenship: false,
    countryOfCitizenship: "",
    dob: "",
    isTaxationUSCitizenOrResident: false,
    isPermamnentResidentCardHolder: false,
    isHoldDualCitizenshipStatus: false,
    isHoldDualCitizenshipIncludeUSCitizenship: false,
    isRenouncedCitizenship: false,
    dateRenouncedUSCitizenship: "",
    renouncementProof: "",
    isTaxLiabilityJurisdictions: false,
    countryTaxLiability: "",
    taxReferenceNumber: "",
    isTINFormatNotAvailable: false,
    isPresentAtleast31Days: false,
    usTinTypeId: 0,
    usTin: "",
    notAvailable: false,
    foreignTINCountry: "",
    foreignTIN: "",
    isFTINNotLegallyRequired: false,
    tinNotAvailable: false,
    tinAlternativeFormate: false,
    isNotLegallyFTIN: false,
    reasonNonAvailability: "",
    isSubmissionClaimTreaty: false,
    ownerResidentId: 0,
    isSubmissionSpecialRates: false,
    articleBeneficalOwner: "",
    paragraphArticleClaimed: "",
    subParagraphArticle: "",
    withHoldingClaim: "",
    incomeExpected: "",
    articleExplanation: "",
    isBeneficialOwnerIncome: false,
    isPersonNameNotUSPerson: false,
    isIncomeFormRelated: false,
    isIncomeTaxTreaty: false,
    isBrokerTransactions: false,
    isAuthorizedForm: false,
    isConfirmElectronicForm: false,
    signedBy: "",
    confirmationCode: "",
    date: "",
    securityCode: "",
    hint: "",
    recoverConfirmationCode: "",
    isCheckAcceptance: false,
    isCertifyCapacitySign: false,
    attachedPowerOfAttorney: "",
    isAgreeWithDeclaration: false,
    isConsentReceipentstatement: false,
    isNotConsentReceipentstatement: false,
  }

  
  const w8Reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case CREATE_W8:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
export default w8Reducer;