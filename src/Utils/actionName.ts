const ActionName = {

    LOGIN: "Account/SignIn",
    SIGNUP: "SIGNUP",

    //auth details
    UpdateAuthDetails:"UpdateAuthDetails",

    USER:"USER",
    CREATE_W9:"CREATE_W9",
    CREATE_W8:"CREATE_W8",
    CREATE_W8_ECI:"CREATE_W8_ECI",
    individualAccountHolder: "individualAccountHolder",
    GetCountries: "GetCountries",
    GetCountriesTreaty: "GetCountriesTreaty",
    GetCountriesCode: "GetCountriesCode",
    GetAllIncomeCodes :"GetAllIncomeCodes",
    GetStateByCountryId:"GetStateByCountryId",
    GetCountryArticleByID:"GetCountryArticleByID",
    GetSecurityQuestion:"GetSecurityQuestion",
    GetConfirmationCode:"GetConfirmationCode",
    InsertAccountHolderDetail:"InsertAccountHolderDetail",
    CREATE_8233:"CREATE_8233",
    postSecurutyCode:"postSecurityCode",
    GetSecurityQuestions:"GetSecurityQuestions",
    GetTinTypes:"GetTinTypes",
    PostFormSelection:"PostFormSelection",
    getBreadCrums:"getBreadCrums",
    GetAgentPaymentType:"GetAgentPaymentType",
    //PDFs
    W9PDF:"W9PDF",
    //
    GetAgentCapacityHiddenForEform: "GetAgentCapacityHiddenForEform",
    GetAgentChapter4EntityTypeHiddenForEform: "GetAgentChapter4EntityTypeHiddenForEform",
    GetAgentChapter3EntityTypeHiddenForEform: "GetAgentChapter3EntityTypeHiddenForEform",
    GetAgentChapter4EntityTypeImportantForEform: "GetAgentChapter4EntityTypeImportantForEform",
    GetAgentDocumentationMandatoryForEform: "GetAgentDocumentationMandatoryForEform",
    GetAgentExemptionCodeDisabledForEform: "GetAgentExemptionCodeDisabledForEform",
    GetAgentIncomeCodeHiddenForEform: "GetAgentIncomeCodeHiddenForEform",
    GetAgentUSVisaTypeHiddenForEform: "GetAgentUSVisaTypeHiddenForEform",
    GetAgentFATCAExemptionCodeHiddenForEform: "GetAgentFATCAExemptionCodeHiddenForEform",
    GetAgentFATCAEntityGIINChallengeDisabledForEform: "GetAgentFATCAEntityGIINChallengeDisabledForEform",
    GetAgentSPTQuestionHiddenForEform: "GetAgentSPTQuestionHiddenForEform",
    GetAgentWrittenStatementSelectionByAgentIdForEform: "GetAgentWrittenStatementSelectionByAgentIdForEform",
    GetAgentTINTypeSelectionByIdForEform: "GetAgentTINTypeSelectionByIdForEform",
    GetAgentCountriesImportantForEform:"GetAgentCountriesImportantForEform",
    GetChapter3Status:"GetChapter3Status",
    GetChapter4Statuses:"GetChapter4Statuses",
    GetLimitationBenefits:"GetLimitationBenefits",
    GetIncomeTypes:"GetIncomeTypes",
    GetAgentIncomeTypeHiddenAllowAnoymo:"GetAgentIncomeTypeHiddenAllowAnoymo",
    SendOTPMail:"SendOTPMail",
    GetAllHelpVideosDetails:"GetAllHelpVideosDetails",
    GET_AGENT_BY_ID: "GET_AGENT_BY_ID",
    
    InsertW9IndividualEntityUSForm:"InsertW9IndividualEntityUSForm",
    InsertW8BENEEntityNonUSForm:"InsertW8BENEEntityNonUSForm",
    InsertW8BENIndividualNonUS:"InsertW8BENIndividualNonUS",
    InsertW8ECIIndividualEntityNonUSForm:"InsertW8ECIIndividualEntityNonUSForm",
    InsertW8EXPFormEntityNonUs:"InsertW8EXPFormEntityNonUs",
    InsertW8IMYEntityNonForm:"InsertW8IMYEntityNonForm",
    InsertForm8233IndividualNonUSForm:"InsertForm8233IndividualNonUSForm",
    UpsertSupportingDocumentation:"UpsertSupportingDocumentation",
    //Account holder
    UpsertAccountHolderIncomeAllocation:"/AccountHolderDetail/UpsertAccountHolderIncomeAllocation",
    GetAccountHolderIncomeAllocation:"/AccountHolderDetail/GetAccountHolderIncomeAllocation",

    GetByW9IndividualEntityUSFormId:"GetByW9IndividualEntityUSFormId",

    UpdateSubstantialUsPassiveNFE:"UpdateSubstantialUsPassiveNFE",
    PosteSubstantialUsPassiveNFE:"PosteSubstantialUsPassiveNFE",
    formPDFFieldData:"formPDFFieldData",
    UpsertSpecialRateAndConditionsIncomeTypes:"UpsertSpecialRateAndConditionsIncomeTypes",
    GetByW8BENEEntityNonUSFormId:"GetByW8BENEEntityNonUSFormId",
    UpsertSaveAndExitCreds:"UpsertSaveAndExitCreds",
    GetByW8BENIndividualId:"GetByW8BENIndividualId",
    GetByW8ECIIndividualId:"GetByW8ECIIndividualId",
    GetByW8EXPIndividualId:"GetByW8EXPIndividualId",
    //errors
    UpdateError:"UpdateError"
  };

  export default ActionName;