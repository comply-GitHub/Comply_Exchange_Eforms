const EndPoint = {
  login: "/Account/SignIn",
  SignInSaveAndExit: "/Account/SignInSaveAndExit",
  eFormSignIn1: "/eFormSignIn/eFormSignIn1",
  individualAccountHolder: "/AccountHolderDetail/InsertAccountHolderDetail",
  GetCountries: "/Country/GetAllCountries",
  GetSettings:"/Setting/GetSetting",
  GetCountriesTreaty: "/Countries/GetAllCountries",
  GetCountriesCode: "/Country/GetCountriesCode",
  GetAllIncomeCodes: "/Countries/GetAllIncomeCodes",
  GetCountryArticleByID: "/Countries/GetCountryArticleByID",
  GetStateByCountryId: "/Country/GetStateByCountryId",
  InsertAccountHolderDetail: "/AccountHolderDetail/InsertAccountHolderDetail",
  GetSecurityQuestion: "/AccountHolderDetail/GetSecurityQuestion",
  GetConfirmationCode: "/AccountHolderDetail/GetConfirmationCode",
  W9PDF: "/W9Common/W9ViewFormPdf",
  postSecurutyCode: "/W9Common/SecurityCode",
  GetSecurityQuestions: "/WebAppBasic/GetAllSecurityQuestion",
  GetTinTypes: "/WebAppBasic/GetAgentTINTypeSelectionByAgentIdForEform",
  PostFormSelection: "/AccountHolderDetail/InsertConfirmationCode",
  getBreadCrums: "/Form/GetBreadCrumbs",
  GetAgentPaymentType: "/WebAppBasic/GetAgentPaymentTypeForEform",
  GetLimitationBenefits:"/W9Common/GetLimitationBenefits",
  GetIncomeTypes:"/W9Common/GetIncomeTypeDefaults",
  GetAllHelpVideosDetails:"/HelpVideo/GetAllHelpVideos",
  GetAllLanguage:"/Language/GetAllLanguage",
  GetIGA:"/Countries/GetIGA",
  GetFederalTaxClassification:"/W9Common/GetFederalTaxClassification",
  GetAllUSFormTypes:"/FormTypes/GetAllUSFormTypes",
  GetTaxJusrisdictionMismatchExplaination:"/CaymanIndividualNonUS/GetTaxJurisdictionMismatchExplanation",
  UpsertDualCertDetailsControllingPerson:"/DualCert/UpsertDualCertDetailsControllingPerson",
  GetDualCertDetailsControlingPerson:"/DualCert/GetDualCertDetailsControllingPerson",
  //
  GetDocumentList:"/AgentEditList/GetAgentDocumentationMandatory",
  GetDocumentListType:"/Documentation/GetAdditionalDocumentationTypes",
  GetAgentExemptionCodeHidden:"/AgentEditList/GetAgentFATCAExemptionCodeHidden",
  GetAgentCapacityHiddenForEform: "/WebAppBasic/GetAgentCapacityHiddenForEform",
  GetAgentChapter4EntityTypeHiddenForEform: "/WebAppBasic/GetAgentChapter4EntityTypeHiddenForEform",
  GetAgentChapter3EntityTypeHiddenForEform: "/WebAppBasic/GetAgentChapter3EntityTypeHiddenForEform",
  GetAgentChapter4EntityTypeImportantForEform: "/WebAppBasic/GetAgentChapter4EntityTypeImportantForEform",
  GetAgentDocumentationMandatoryForEform: "/WebAppBasic/GetAgentDocumentationMandatoryForEform",
  GetAgentExemptionCodeDisabledForEform: "/WebAppBasic/GetAgentExemptionCodeDisabledForEform",
  GetAgentIncomeCodeHiddenForEform: "/WebAppBasic/GetAgentIncomeCodeHiddenForEform",
  GetAgentUSVisaTypeHiddenForEform: "/WebAppBasic/GetAgentUSVisaTypeHiddenForEform",
  GetAgentFATCAExemptionCodeHiddenForEform: "/WebAppBasic/GetAgentFATCAExemptionCodeHiddenForEform",
  GetAgentFATCAEntityGIINChallengeDisabledForEform: "/WebAppBasic/GetAgentFATCAEntityGIINChallengeDisabledForEform",
  GetAgentSPTQuestionHiddenForEform: "/WebAppBasic/GetAgentSPTQuestionHiddenForEform",
  GetAgentWrittenStatementSelectionByAgentIdForEform: "/WebAppBasic/GetAgentWrittenStatementSelectionByAgentIdForEform",
  GetAgentTINTypeSelectionByIdForEform: "/WebAppBasic/GetAgentTINTypeSelectionByIdForEform",
  GetAgentCountriesImportantForEform:"/WebAppBasic/GetAgentCountriesImportantForEform",
  GetChapter3Status:"/W9Common/GetChapter3Status",
  GetChapter4Statuses:"/W9Common/GetChapter4Statuses",
  GetFATCAChapter4Status:"/W9Common/GetFATCAChapter4Status",
  GetAgentIncomeTypeHiddenAllowAnoymo:"/AgentUSSourceIncome/GetAgentIncomeTypeHiddenAllowAnoym",
  SendOTPMail:"/Mail/SendOTPMail",
  GET_AGENT_BY_ID:"/Agent/GetAgentById",


  //Form PostAPI's
 InsertW9IndividualEntityUSForm:"/W9IndividualEntity/InsertW9IndividualEntityUSForm",
 InsertW8BENEEntityNonUSForm:"/W8BENEEntity/InsertW8BENEEntityNonUSForm",
 InsertW8BENIndividualNonUS:"/W8BENIndividual/InsertW8BENIndividualNonUS",
 InsertW8ECIIndividualEntityNonUSForm:"/W8ECIIndividualEntity/InsertW8ECIIndividualEntityNonUSForm",
 InsertW8EXPFormEntityNonUs:"/W8EXPEntity/InsertW8EXPFormEntityNonUs",
 InsertW81MYEntityNonForm:"/W8IMYEntity/InsertW8IMYEntityNonForm",
 InsertForm8233IndividualNonUSForm:"/Form8233Individual/InsertForm8233IndividualNonUSForm",
 UpsertSupportingDocumentation:"/AccountHolderDetail/UpsertSupportingDocumentation",
 UpsertDualCertW9:"/DualCert/UpsertDualCertDetails",
 UpsertAccountHolderWithholdingStatement:"/AccountHolderDetail/UpsertAccountHolderWithholdingStatement",
 InserDualCert:"/DualCert/UpsertDualCert",
 InsertCaymanIndividualNonUS:"/CaymanIndividualNonUS/InsertCaymanIndividualNonUS",
 UpsertTaxLiabilityinanyOtherJurisdictions:"/CaymanIndividualNonUS/UpsertTaxLiabilityinanyOtherJurisdictions",
 UpsertEntityW9DualCert:"/W9IndividualEntity/UpdateW9IndividualEntityDetails",
 UpsertCRSandFATCAClassification:"/DualCert/UpsertCRSandFATCAClassification",
 InsertCaymanEntityNonUS:"/CaymanEntityNonUS/InsertCaymanEntityNonUS",
 UpsertFATCAStepsDetails:"/DualCert/UpsertFATCAStepsDetails",
 UpsertSelfCertDetails:"/DualCert/UpsertSelfCertDetails",
 UpsertCRSStepsDetails:"/DualCert/UpsertCRSStepsDetails",
 GetCRSStepsDetails:"/DualCert/GetCRSStepsDetails",

// Form GetApis:
GetDual:"/DualCert/GetDualCert",
GetDualCertW9:"/DualCert/GetDualCertDetails",
GetByW8BENEEntityNonUSFormId:"/W8BENEEntity/GetByW8BENEEntityNonUSFormId",
GetByW8ECIIndividualEntityNonUSFormId:"/W8ECIIndividualEntity/GetByW8ECIIndividualEntityNonUSFormId",
GetByW8EXPFormFormEntityNonUs:"/W8EXPEntity/GetByW8EXPFormFormEntityNonUs",
GetByForm8233IndividualNonUSFormId:"/Form8233Individual/GetByForm8233IndividualNonUSFormId",
GetByW8IMYEntityNonForm :"/W8IMYEntity/GetByW8IMYEntityNonForm",
GetSupportingDocumentation:"/AccountHolderDetail/GetSupportingDocumentation",
getSupportedFile:"/FileUpload/GetFileBase64",
GetByCaymanIndividualNonUSId: "/CaymanIndividualNonUS/GetByCaymanIndividualNonUSId",
GetByCaymanEntityNonUSId: "/CaymanEntityNonUS/GetByCaymanEntityNonUSId",




//Pdf apis
GetW9Pdf:"/W9IndividualEntity/GetW9Pdf",
GetECIPdf:"/W8ECIIndividualEntity/GetECIPdf",
GetBENPdf:"/W8BENIndividual/GetBENPdf",
GetBENEPdf:"/W8BENEEntity/GetBENEPdf",
GetExpPdf:"/W8EXPEntity/GetExpPdf",
GetIMYPdf:"/W8IMYEntity/GetIMYPdf",
GetForm8233Pdf:"/Form8233Individual/GetForm8233Pdf",
GetW9DCPdf:"/W9IndividualEntity/GetW9DCPdf",
GetECIDCPdf:"/W8ECIIndividualEntity/GetECIDCPdf",
GetBENDCPdf:"/W8BENIndividual/GetBENDCPdf",
GetCaymanIndividualPdf:"/CaymanIndividualNonUS/GetCaymanIndividualPdf",


 //Account Holder Endpoints
 UpsertAccountHolderIncomeAllocation:"/AccountHolderDetail/UpsertAccountHolderIncomeAllocation",
 GetAccountHolderIncomeAllocation:"/AccountHolderDetail/GetAccountHolderIncomeAllocation",
 GetAccountHolderWithholdingStatement:"/AccountHolderDetail/GetAccountHolderWithholdingStatement",
 //SubstancialUsPassiveNFE
 UpsertAccountHolderSubstantialUsPassiveNFE:"/AccountHolderDetail/UpsertAHDSubstantialUsPassiveNFE",
 GetAccountHolderSubstantialUsPassiveNFE:"/AccountHolderDetail/GetAHDSubstantialUsPassiveNFE",
 
 //special rate and condition income types
 UpsertSpecialRateAndCondition:"/AccountHolderDetail/UpsertSpecialRateAndCondition",
 GetSpecialRateAndCondition:"/AccountHolderDetail/GetSpecialRateAndCondition",

 //save and exit creds
 UpsertSaveAndExitCreds:"/AccountHolderDetail/UpsertSaveAndExitCreds",
 InsertConfirmationCode:"/AccountHolderDetail/InsertConfirmationCode",

 //Ahd Income Report description
 UpsertIncomeReportDescription:"/AccountHolderDetail/UpsertIncomeReportDescription",
 GetIncomeReportDescription:"/AccountHolderDetail/GetIncomeReportDescription",
 
 //Form GetAPI's
 GetByW9IndividualEntityUSFormId:"/W9IndividualEntity/GetByW9IndividualEntityUSFormId",
 GetByW8BENIndividualId:"/W8BENIndividual/GetByW8BENIndividualId",
 GetByW8ECIIndividualId:"/W8ECIIndividualEntity/GetByW8ECIIndividualEntityNonUSFormId",
 GetByW8EXPIndividualId:"/W8EXPEntity/GetByW8EXPFormFormEntityNonUs",
 formPDFFieldData:"/FormTypes/GetPDFFieldValuesbyFormID",
 getSelfCetHidden:"/AgentSelfCertification/GetAgentSelfCertificationHidden",

 // skipped steps
 GetAgentSkippedSteps:"/Agent/GetAgentSkippedSteps",
 GetControllingEntity:"/DualCert/GetControllingPersonLegalStatusEntity",

 // disregarded Entities 
 UpsertAccountHolderDisRegardedEntity:"/AccountHolderDetail/UpsertAccountHolderDisRegardedEntity",
 GetDisregardedEntity:"/AccountHolderDetail/GetDisregardedEntity",
 
 GetAllGIINTypes:"/USTinType/GetAllGIINTypes",

};
export default EndPoint;
