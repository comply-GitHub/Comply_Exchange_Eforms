import Utils from "../../Utils";

const {CREATE_8233}= Utils.actionName

let initialState={
    
  agentId: 0,
  formTypeSelectionId: 0,
  accountHolderBasicDetailId: 0,
  daysAvailableInThisYear: 0,
  daysAvailableIn_OneYearbefore: 0,
  daysAvailableIn_TwoYearbefore: 0,
  totalQualifyingDays: 0,
  usTINTypeId: 0,
  usTIN: 0,
  foreginTIN_CountryId: 0,
  foregionTIN: "",
  reasionForForegionTIN_NotAvailable: "",
  notAvailable: true,
  alternativeTIN_Format: true,
  exemptionApplicableForCompensationForCalnderYear: 0,
  otherTaxBeginingYear: 0,
  otherTaxEndYear: 0,
  usVisaTypeID: 0,
  countryIssuingPassportId: 0,
  countryIssuingPassportNumber: "",
  dateOfEntryIntoUS: "",
  nonImmigrationStatus: true,
  currentNonImmigrationStatus: "",
  dateNonImmigrationStatusExpire: "",
  declarationOfDurationStayStatus: true,
  foreignStudent_Teacher_Professor_ResearcherStatus: true,
  statementToForm8233_FileUpoad: "",
  taxTreaty_DescriptionOfPersonalServiceYouProvide: "",
  taxTreaty_TotalCompensationYouExpectForThisCalenderYear: 0,
  taxTreaty_TreatyId: 0,
  taxTreaty_TreatyArticleId: 0,
  taxTreaty_TotalCompensationListedon11bExemptFromTax: 0,
  taxTreaty_CheckAll: true,
  taxTreaty_CountryOfResidenceId: 0,
  taxTreaty_NoncompensatoryScholarshiporFellowshipIncome: 0,
  taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID: 0,
  taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID: 0,
  totalIncomeListedIncomeonLine13ATaxExemptAmount: 0,
  sufficientFactToJustfyExemptionForClaim12A_13: "",
  additinalDocument1ID: 0,
  additinalDocument1Name: "",
  additinalDocument2ID: 0,
  additinalDocument2Name: "",
  additinalDocument3ID: 0,
  additinalDocument3Name: "",
  additinalDocument4ID: 0,
  additinalDocument4Name: "",
  additinalDocument5ID: 0,
  additinalDocument5Name: "",
  additinalDocument6ID: 0,
  additinalDocument6Name: "",
  additinalDocument7ID: 0,
  additinalDocument7Name: "",
  additinalDocument8ID: 0,
  additinalDocument8Name: "",
  additinalDocument9ID: 0,
  additinalDocument9Name: "",
  additinalDocument10ID: 0,
  additinalDocument10Name: "",
  i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome: true,
  i_Certify_BeneficialOwnerIsNotUSPerson: true,
  i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B: true,
  i_Certify_FurthermoreIAuthorise: true,
  i_Certify_ConfirmYouHaveReviewedTheElectronicForm: true,
  signBy: "",
  enterConfirmationCode: "",
  signDate: "",
  confirmationOfAcceptanceWithTheAboveDeclarations: true,
  securityWord: "",
  hint: "",
  yourConfirmationCode: "",
  isDeclaration: true,
  isConsentRecipent: true,
  isNotConsentRecipent: true,
  }

  
  const form8233Reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case CREATE_8233:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
export default form8233Reducer;