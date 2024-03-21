import { combineReducers } from "redux";
// import { getMovieDataReducer, getSearchDataReducer } from "./reducer";
import {
  getCountriesReducer,
  getCountriesCodeReducer,
  GetAllIncomeCodesReducer,
  GetStateByCountryIdReducer,
  W9PDFReducer,
  postSecurityCodeReducer,
  getSecurityQuestionsReducer,
  getBreadCrumsReducer,
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

let reducers = {
  getCountriesReducer,
  getCountriesCodeReducer,
  GetAllIncomeCodesReducer,
  GetStateByCountryIdReducer,
  W9PDFReducer,
  postSecurityCodeReducer,
  getSecurityQuestionsReducer,
  getBreadCrumsReducer,
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
  CountriesTreaty:getCountriesTreatyReducer,
  CountryArticle:GetCountryArticleByIDReducer,
  SpecialRateAndConditionIncomeTypes:SpecialRateAndConditionIncomeTypesReducer,
  formPDFFieldDataReducer,


};
const rootReducer = combineReducers({
  ...reducers,
  w9Data: w9Reducer,
  w8Data: w8Reducer,
  form8233: form8233Reducer,
  W8ECI: w8ReducerECI,
  accountHolder: AccountHolderDetailsReducer,
  W8BENE:W8BENEReducer,
  W8EXP:W8EXPReducer,
  SubstantialUsPassiveNFE:substantialUsPassiveNFEReducer,
  AuthDetails:AuthDetailsReducer,
  Error:ErrorsReducer
});

export default rootReducer;
