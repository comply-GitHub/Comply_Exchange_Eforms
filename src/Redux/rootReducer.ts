import { combineReducers } from "redux";
// import { getMovieDataReducer, getSearchDataReducer } from "./reducer";
import {
  getCountriesReducer,
  getSettingsReducer,
  getCountriesCodeReducer,
  GetAllIncomeCodesReducer,
  GetStateByCountryIdReducer,
  W9PDFReducer,
  postSecurityCodeReducer,
  getSecurityQuestionsReducer,
  getBreadCrumsReducer,
  getExpFormDataReducer,
  GetTinTypesReducer,
  GetAgentPaymentTypeReducer,
  GetAgentUSVisaTypeHiddenForEformReducer,
  GetAgentCountriesImportantForEformReducer,
  GetChapter3StatusReducer,
  GetChapter4StatusesReducer,
  GetLimitationBenefitsReducer,
  GetIncomeTypesReducer,
  GetHelpVideoDetailsReducer,
  GetAgentFATCAEntityGIINChallengeDisabledForEformReducer,
  GetAgentDocumentationMandatoryForEformReducer,
  GetAgentIncomeTypeHiddenAllowAnoymoReducer,
  SendOTPMailReducer,
  GetByW9FormReducer,
  getCountriesTreatyReducer,
  GetCountryArticleByIDReducer,
  SpecialRateAndConditionIncomeTypesReducer,
  formPDFFieldDataReducer,
  GetAllLanguageReducer,
  GetDualCertW9Reducer,
  GetDualCertReducer,
  getIGAReducer,
  GetUSFormTypeReducer,
  
} from "./Reducers";
import w9Reducer from "./Reducers/w9Reducer";
import w8Reducer from "./Reducers/w8BenNonUs";
import form8233Reducer from "./Reducers/form8233";
import w8ReducerECI from "./Reducers/w8ECI";
import { AccountHolderDetailsReducer } from "./Reducers/accounHolderDetailsReducers";
import { W8BENEReducer } from "./Reducers/W8BENE";
import { substantialUsPassiveNFEReducer } from "./Reducers/SubstantialUsPassiveNFEReducer";
import { AuthDetailsReducer } from "./Reducers/AuthDetailReducer";
import { ErrorsReducer } from "./Reducers/ErrorReducer";
import W8EXPReducer from "./Reducers/W8EXPReducer";
import DualCertReducer from "./Reducers/DualCertReducer";
import W8IMYReducer from "./Reducers/W8IMY";
import AccountStatementReducer from "./Reducers/AccountStatementReducer";

let reducers = {
  getCountriesReducer,
  getCountriesCodeReducer,
  GetDualCertW9Reducer,
  GetAllIncomeCodesReducer,
  GetStateByCountryIdReducer,
  W9PDFReducer,
  postSecurityCodeReducer,
  getSecurityQuestionsReducer,
  getBreadCrumsReducer,
  GetTinTypesReducer,
  getExpFormDataReducer,
  GetAgentPaymentTypeReducer,
  GetAgentUSVisaTypeHiddenForEformReducer,
  GetAgentCountriesImportantForEformReducer,
  GetChapter3StatusReducer,
  GetChapter4StatusesReducer,
  GetLimitationBenefitsReducer,
  GetIncomeTypesReducer,
  getSettingsReducer,
  GetHelpVideoDetailsReducer,
  GetAgentFATCAEntityGIINChallengeDisabledForEformReducer,
  GetAgentDocumentationMandatoryForEformReducer,
  GetAgentIncomeTypeHiddenAllowAnoymoReducer,
  SendOTPMailReducer,
  GetByW9FormReducer,
  CountriesTreaty:getCountriesTreatyReducer,
  CountryArticle:GetCountryArticleByIDReducer,
  SpecialRateAndConditionIncomeTypes:SpecialRateAndConditionIncomeTypesReducer,
  formPDFFieldDataReducer,
  GetAllLanguageReducer,
  GetDualCertReducer,
  getIGAReducer,
  GetUSFormTypeReducer,
  

};
const rootReducer = combineReducers({
  ...reducers,
  w9Data: w9Reducer,
  w8Data: w8Reducer,
  form8233: form8233Reducer,
  W8IMY:W8IMYReducer,
  W8ECI: w8ReducerECI,
  accountHolder: AccountHolderDetailsReducer,
  W8BENE:W8BENEReducer,
  W8EXP:W8EXPReducer,
  SubstantialUsPassiveNFE:substantialUsPassiveNFEReducer,
  AuthDetails:AuthDetailsReducer,
  Error:ErrorsReducer,
  DualCert:DualCertReducer,
  AccountStatement:AccountStatementReducer
  
});

export default rootReducer;
