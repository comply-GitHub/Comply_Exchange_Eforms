import Utils from "../../Utils";
import GlobalValues from "../../Utils/constVals";

const initialState = {
  id: 0,
  agentId: GlobalValues.agentId,
  businessTypeId: 1,
  isUSEntity: false,
  isUSIndividual: true,
  uniqueIdentifier: "",
  firstName: "",
  lastName: "",
  countryOfCitizenshipId: 0,
  dob: "",
  nameOfDisregarded: "",
  entityName: "",
  taxpayerIdTypeID: 0,
  usTin: "",
  foreignTINCountryId: 0,
  foreignTIN: "",
  foreignTINNotAvailable: false, //
  alternativeTINFormat: false, //
  giin: "",
  permanentResidentialCountryId: 0,
  otherCountry: "",
  permanentResidentialStreetNumberandName: "",
  permanentResidentialAptSuite: "",
  permanentResidentialCityorTown: "",
  permanentResidentialStateorProvince: "",
  permanentResidentialZipPostalCode: "",
  isAddressRuralRoute: true,
  isAddressPostOfficeBox: false,
  isCareOfAddress: false,
  isalternativebusinessaddress: false,
  permanentResidentialCountryId1: 0,
  permanentResidentialStreetNumberandName1: "",
  permanentResidentialAptSuite1: "",
  permanentResidentialCityorTown1: "",
  permanentResidentialStateorProvince1: "",
  permanentResidentialZipPostalCode1: "",
  contactFirstName: "",
  contactLastName: "",
  contactEmail: "",
  primaryContactNumberId: 0,
  primaryContactNumber: "",
  alternativeNumberId: 0,
  alternativeNumber: "",
  alternativeNumberId1: 0,
  alternativeNumber1: "",
  incomeTypeId: [],
  paymentTypeId: 0,
  accountHolderName: "",
  accountBankName: "",
  accountBankBranchLocationId: 0,
  accountNumber: "",
  abaRouting: "",
  iban: "",
  swiftCode: "",
  bankCode: "",
  makePayable: "",
  payResidentalCountryId: 0,
  payStreetNumberAndName: "",
  payAptSuite: "",
  vatId: 0,
  vat: "",
  doingBusinessAsName: "",
  payCityorTown: "",
  payStateOrProvince: "",
  payZipPostalCode: "",
  sortCode: "",
  bsb: "",
  capacityId: 1,
  isCorrectPaymentPurposes: true,
  isConfirmed: false,
}

export const AccountHolderDetailsReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case Utils.actionName.individualAccountHolder:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}