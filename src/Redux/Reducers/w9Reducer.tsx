import Utils from "../../Utils";

const {CREATE_W9}= Utils.actionName

  let initialState:any = {
    id: 0,
    agentId: 0,
    formTypeSelectionId: 0,
    federalTaxClassificationId: 0,
    firstName: "",
    lastName: "",
    businessName: "",
    isExemptionfromBackup: false,
    interestDividendPaymentId: 0,
    brokerTransactionsId: 0,
    barterExchangeTransactionId: 0,
    paymentOver600RequiredId: 0,
    paymentThirdPartyNetworkId: 0,
    isExemptionFATCAReportings: false,
    fatcaReportingId: 0,
    tiN_USTINId: 0,
    tiN_USTIN: "",
    birthCertificate: "",
    certificateOfIncorporation: "",
    drivingLicense: "",
    passport: "",
    powerOfAttorneyStatement: "",
    proofOfResidency: "",
    additionalDocumentId1: 0,
    additionalDocument1: "",
    additionalDocumentId2: 0,
    additionalDocument2: "",
    additionalDocumentId3: 0,
    additionalDocument3: "",
    additionalDocumentId4: 0,
    additionalDocument4: "",
    additionalDocumentId5: 0,
    additionalDocument5: "",
    additionalDocumentId6: 0,
    additionalDocument6: "",
    additionalDocumentId7: 0,
    additionalDocument7: "",
    additionalDocumentId8: 0,
    additionalDocument8: "",
    additionalDocumentId9: 0,
    additionalDocument9: "",
    additionalDocumentId10: 0,
    additionalDocument10: "",
    certification_CorrectTaxpayerIdentification: false,
    certification_IRS: false,
    certification_USCitizenPerson: false,
    certification_FATCACode: false,
    certification_IRSBackupWithHolding: false,
    certification_ElectronicForm: false,
    signedBy: "",
    confirmationCode: "",
    date: "",
    isConfirm: false,
    countryOfIncorporationOrganizationId: 0,
    usFederalTaxClassificationId: 0,
  };

  

  const w9Reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case CREATE_W9:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}
export default w9Reducer;