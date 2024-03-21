import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
export const StatusSchema = () => {
  return Yup.object().shape({
    isHeldUSCitizenship: Yup.string().required(
      "Please select one of the options"
    ),
    countryOfCitizenship: Yup.string(),
    // countryOfCitizenship: Yup.string().required(
    //     "Please select one of the options"
    //   ),
    dob: Yup.date(),
    // dob: Yup.date().required("Please Enter DOB"),

    isTaxationUSCitizenOrResident: Yup.string()
    .required(
      "Please select one of the options"
    ),
    
    isPermamnentResidentCardHolder: Yup.string()
    ,
    isHoldDualCitizenshipStatus: Yup.string(),
    isHoldDualCitizenshipIncludeUSCitizenship: Yup.string().when(
      "isHoldDualCitizenshipStatus",
      {
        is: "yes",
        then: () => Yup.string(),
      }
    ),
    //Keyy Missing from UI
    // isRenouncedCitizenship: Yup.boolean().required(
    //   "Please select one of the options"
    // ),
    // dateRenouncedUSCitizenship: Yup.date().required("Please Enter DOB"),
    // // renouncementProof: "",
    isTaxLiabilityJurisdictions: Yup.string(),
    countryTaxLiability: Yup.number().when("isTaxLiabilityJurisdictions", {
      is: "yes",
      then: () =>
        Yup.number()
          //   .required("Please select a country")
          .notOneOf([0], "Please select a valid country"),
    }),
    taxReferenceNumber: Yup.number().when("isTaxLiabilityJurisdictions", {
      is: "yes",
      then: () =>
        Yup.number()
          // .required("Please select a country")
          .notOneOf([0], "Please select a valid country"),
    }),
    isTINFormatNotAvailable: Yup.boolean().when("isTaxLiabilityJurisdictions", {
      is: "yes",
      then: () => Yup.boolean().oneOf([true], "Message"),
    }),
    // isPresentAtleast31Days: Yup.boolean().required(
    //   "Please select one of the options"
    // ),
  });
};

export const US_TINSchemaW8BenE = () => {
  return Yup.object().shape({
    usTinTypeId: Yup.number().required("Please select"),
    usTin: Yup.string().when(["notAvailable", "usTinTypeId"], {
      is: (notAvailable: any, usTinTypeId: any) => JSON.stringify(notAvailable) === "false" && JSON.stringify(usTinTypeId) !== "8" && JSON.stringify(usTinTypeId) !== "7" && JSON.stringify(usTinTypeId) !== "1",
      then: () =>
        Yup.string()
          .required("Please enter US Tin"),
    }),
    notAvailable: Yup.boolean(),
    notAvailableReason: Yup.string().when("notAvailable", {
      is: true,
      then: () =>
        Yup.string()
          .required("Please enter why tin is not available"),
    }),
    fTinNotAvailableReason: Yup.string().when("isNotAvailable", {
      is: (isNotAvailable: any) => isNotAvailable == "Yes",
      then: () =>
        Yup.string()
          .required("Please Specify Reason"),
    }),
    foreignTINCountry: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value: any) => value === "No" || value === "",
      then: () =>
        Yup.string()
          .required("Please select Foreign Tin Country"),

    }),

    // .required("Please enter Foreign Tin "),
    isExplanationNotLegallyFTIN: Yup.string()
      .when(["isFTINLegally"], {
        is: (isFTINLegally: any) => isFTINLegally === true,
        then: () =>
          Yup.string()
            .required("please provide an answer")
            .oneOf(["Yes", "No"], "please provide an answer")
      })
    ,
    // tinisFTINNotLegallyRequired: true,
    // tinAlternativeFormate: true,
    isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
      is: true,
      then: () =>
        Yup.string()
          .required("Please Select"),
    }),
  });
};

export const US_TINSchema = () => {
  return Yup.object().shape({
    usTinTypeId: Yup.number().required("Please select"),
    usTin: Yup.string().when("notAvailable", {
      is: "false",
      then: () =>
        Yup.string()
        .required("Please enter US Tin"),
    }),
    notAvailable: Yup.boolean(),
    FTINFeild:Yup.string().when("notAvailable", {
      is: true,
      then: () =>
        Yup.string()
        .required("Please Specify Reason"),
    }), 
    FTINFeild1: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: "Yes",
      then: () =>
        Yup.string()
        .required("Please Specify Reason"),
    }),
    foreignTINCountry:  Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value:any) => value === "No" || value === "",
      then: () =>
        Yup.string()
        .required("Please select Foreign Tin Country"),
      
    }),
    foreignTIN: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value:any) => value === "No" || value === "",
      then: () =>
        Yup.string()
        .required("Please enter Foreign Tin"),
      
    }),
  
    // .required("Please enter Foreign Tin "),
    isFTINNotLegallyRequired: Yup.boolean(),
    // tinisFTINNotLegallyRequired: true,
    // tinAlternativeFormate: true,
    isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
      is: true,
      then: () =>
        Yup.string()
        .required("Please Select"),
    }),
  });
};
export const claimSchemaaa = () => {
  return Yup.object().shape({
    isSubmissionClaimTreaty: Yup.string().required(
      "Please select one of the options"
    ),
    permanentResidentialCountryId: Yup.string().when("isSubmissionClaimTreaty", {
      is: "yes",
      then: () => Yup.string().required("Please select owner"),
    }),
    // permanentResidentialCountryId: Yup.string().required(
    //   "Please select one of the options"
    // ),
   
  });
};

export const claimSchema = () => {
  return Yup.object().shape({
    isSubmissionClaimTreaty: Yup.string().required(
      "Please select one of the options"
    ),
    ownerResidentId: Yup.boolean().when("isSubmissionClaimTreaty", {
      is: "yes",
      then: () => Yup.string().required("Please select owner"),
    }),
    permanentResidentialCountryId: Yup.string().required(
      "Please select one of the options"
    ),
    benefitId: Yup.string().required(
      "Please select one of the options"
    ),
  });
};
export const rateSchema = () => {
  return Yup.object().shape({    
    isSubmissionSpecialRates: Yup.string().required(
      "Please select one of the options"
    ),
    articleExplanation:  Yup.string().required("Please Enter Explanation"), 
  });
};

export const specilaRateIncomeTypeSchema=(isSubmissionSpecialRates:string)=>{
  return Yup.object().shape({
    articleBeneficalOwner:Yup.string().required("Please select one of the options"),
    paragraphArticleClaimed: Yup.string().required("Please select one of the options"),    
    subParagraphArticle:Yup.string().required("Please enter Article"),  
    withHoldingClaim:  Yup.string().required("Please select one of the options"),
    incomeExpected:  Yup.string().required("Please select one of the options"), 
    articleExplanation:  Yup.string().required("Please Enter Explanation"), 
  });
}

export const certificateSchema = () => {
  return Yup.object().shape({
    isBeneficialOwnerIncome: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isPersonNameNotUSPerson: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isIncomeFormRelated: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isIncomeTaxTreaty: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    isBrokerTransactions: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isAuthorizedForm: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    isConfirmElectronicForm: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isConsentReceipentstatement: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};

export const partCertiSchema = () => {
  return Yup.object().shape({
    signedBy: Yup.string().required("Please enter "),
    EnterconfirmationCode: Yup.string()
    .required("Please enter code")
    .test(
      'match',
      'Confirmation code does not match',
      function (value) {
        const storedConfirmationCode = obValues?.confirmationCode;
        return !storedConfirmationCode || value === storedConfirmationCode;
      }
    ),
    confirmationCode: Yup.string().when("showRecoverSection", {
      is: true,
      then: () =>
      Yup.string() .required("Please enter code")
    .test(
      'match',
      'Confirmation code does not match',
      function (value) {
        const storedConfirmationCode = obValues?.confirmationCode;
        return !storedConfirmationCode || value === storedConfirmationCode;
      }
    ),
  }),
    // word: Yup.boolean().when("EnterconfirmationCode", {
    //   is: "no",
    //   then: () => Yup.string().required("Please select owner"),
    // }),
  date: Yup.date(),
  isAgreeWithDeclaration: Yup.boolean().oneOf(
    [true],
    "Please mark the checkbox"
  ),
});
};

export const declarationsSchema = () => {
  return Yup.object().shape({
    isAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isConsentReceipentstatement: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isNotConsentReceipentstatement: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};
