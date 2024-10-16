import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
const PrevValues = JSON.parse(localStorage.getItem("PrevStepData") || '{}')



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
    // IsPresentAtleast31Days: Yup.boolean().required(
    //   "Please select one of the options"
    // ),
  });
};

export const US_TINSchemaW8Ben_Dc = () => {
  return Yup.object().shape({
    usTinTypeId: PrevValues.usTinTypeId !== null && PrevValues.usTinTypeId !== "" ? Yup.number().required("Please select") : Yup.number(),
    usTin: Yup.string().when(["notAvailable", "usTinTypeId"], {
      is: (notAvailable: any, usTinTypeId: any) => {
        const prevUsTinTypeId = PrevValues.tinValue;
        return !notAvailable &&
          usTinTypeId !== 8 &&
          usTinTypeId !== 7 &&
          usTinTypeId !== 1 &&
          (prevUsTinTypeId !== null && prevUsTinTypeId !== "");
      },
      then: () => Yup.string().required("Please enter US Tin"),
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
    foreignTIN: Yup.string().when("foreignTINCountry", {
      is: (foreignTINCountry: any) => {
        const prevForeignTIN = PrevValues.foreignTIN;
        return PrevValues.foreignTINCountry !== 0 && (prevForeignTIN !== null && prevForeignTIN !== "");
      },
      then: () => Yup.string().required("Please enter Foreign TIN"),
    }),

    foreignTINCountry: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value: any) => value === "No" || value === "",
      then: () => Yup.string().test('foreignTINCountryRequired', 'Please select Foreign Tin Country', function (value) {
        const prevForeignTINCountry = PrevValues.foreignTINCountry;
        if (!value && (prevForeignTINCountry !== null && prevForeignTINCountry !== "")) {
          return false;
        }
        return true;
      }),
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

export const US_TINSchemaW8BenE = () => {
  return Yup.object().shape({
    usTinTypeId: Yup.number()
    .notOneOf([0], "Please select"),
    
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
    foreignTIN: Yup.string().nullable()
      .test(
        "Foreign tin",
        "Foreign tin must be provided",
        (value, validationContext) => {
          const {
            createError,
            parent: { foreignTINCountry, isFTINLegally, isNotAvailable }
          } = validationContext;

          console.log(foreignTINCountry, isFTINLegally, isNotAvailable, value, "yupppppo")
          // if (!value) {
          //   return createError({
          //     message: "The downpayment field is required"
          //   });
          // }

          // if (loan === "Mortgage Loan") {
          //   return value >= 25 && value < 100;
          // }

          if (foreignTINCountry >= 0 && isFTINLegally === false && (isNotAvailable === "No" || isNotAvailable === undefined)) {
            if (!value) {
              return createError({
                message: "The Foreign tin field is required"
              });
            } else
              return value?.length > 0;
          }

          return true

        }
      ),
    fTinNotAvailableReason: Yup.string().when("isNotAvailable", {
      is: (isNotAvailable: any) => isNotAvailable == "Yes",
      then: () =>
        Yup.string()
          .required("Please Specify Reason"),
    }),
    foreignTINCountry: Yup.string().nullable().required().when("tinisFTINNotLegallyRequired", {
      is: (value: any) => value === "No" || value === "",
      then: () =>
        Yup.string()
          .required("Please select Foreign Tin Country"),

    }),

    isExplanationNotLegallyFTIN: Yup.string()
      .when(["isFTINLegally"], {
        is: (isFTINLegally: any) => isFTINLegally === true,
        then: () =>
          Yup.string()
            .required("please provide an answer")
            .oneOf(["Yes", "No"], "please provide an answer")
      })
    ,

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
    FTINFeild: Yup.string().when("notAvailable", {
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
    foreignTINCountry: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value: any) => value === "No" || value === "",
      then: () =>
        Yup.string()
          .required("Please select Foreign Tin Country"),

    }),
    foreignTIN: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value: any) => value === "No" || value === "",
      then: () =>
        Yup.string()
          .required("Please enter Foreign Tin"),

    }),


    isFTINNotLegallyRequired: Yup.boolean(),

    isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
      is: true,
      then: () =>
        Yup.string()
          .required("Please Select"),
    }),
  });
};

export const ClaimSchema = () => {
  return Yup.object().shape({
    isSubmissionClaimTreaty: Yup.string().required(
      "Please select one of the options"
    ),
    ownerResidentId: Yup.string().when(["isSubmissionClaimTreaty"], {
      is: (isSubmissionClaimTreaty: any) => isSubmissionClaimTreaty === "yes",
      then: () => Yup.string().required().notOneOf([""], "Please select a Country from the list")
    }),

  });
};

export const claimSchemaaa = () => {
  return Yup.object().shape({
    isClaimTreaty: Yup.string().required(
      "Please select one of the options"
    ),
    ownerResidentId: Yup.string().when(["isClaimTreaty"], {
      is: (isClaimTreaty: any) => isClaimTreaty === "yes",
      then: () => Yup.string().required().notOneOf(["0"], "Please select a Country from the list")
    }),
    limitationBenefitsId: Yup.string().when(["ownerResidentId"], ([ownerResidentId], schema) => {
      if (ownerResidentId && ownerResidentId != "" && ownerResidentId !== "0") {
        return schema.required("Please select an option.").notOneOf(["0"], "Please select an option.");
      } else {
        return schema;
      }
    }),
    isSubmissionClaimTreaty: Yup.string().when(["ownerResidentId"], ([ownerResidentId], schema) => {

      if (ownerResidentId != undefined && ownerResidentId != "" && ownerResidentId !== "0") {
        return schema.notOneOf(["", undefined, null], "Please select an option.");
      } else {
        return schema;
      }
    }),
  });
};

export const SubstantialSchema = () => {
  return Yup.object().shape({
    DaysInCurrentYear: Yup.number().min(0, "must be non negative").max(366).required("Field Cannot be Empty"),
    DaysInFirstYearBefore: Yup.number().min(0, "must be non negative").max(366).required("Field Cannot be Empty"),
    DaysInSecondYearBefore: Yup.number().min(0, "must be non negative").max(366).required("Field Cannot be Empty"),
    totalQualifyingDays: Yup.number(),
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
    articleExplanation: Yup.string().when("isSubmissionSpecialRates",
      {
        is: "yes",
        then: () => Yup.string().required("Please Enter Explanation"),
      }),
  });
};

export const specilaRateIncomeTypeSchema = (isSubmissionSpecialRates: string) => {
  return Yup.object().shape({
    articleBeneficalOwner: Yup.string().notOneOf(["", "0", undefined], "Please select one of the options"),
    paragraphArticleClaimed: Yup.string().notOneOf(["", "0", undefined], "Please select one of the options"),
    subParagraphArticle: Yup.string().notOneOf(["", "0", undefined], "Please enter Article"),
    withHoldingClaim: Yup.string().notOneOf(["", undefined], "Please select one of the options"),
    incomeExpectedId: Yup.string().notOneOf(["", "0", undefined], "Please select one of the options"),
    //articleExplanation: Yup.string().notOneOf(["", "0", undefined], "Please Enter Explanation"),
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

    signedBy: Yup.string().required("Please enter name of the person signing the form"),
    confirmationCode: Yup.string()
      .required("Please enter code")
      .test(
        'match',
        'Confirmation code does not match',
        function (value) {
          const storedConfirmationCode = obValues?.confirmationCode;
          return !storedConfirmationCode || value === storedConfirmationCode;
        }
      ),

    date: Yup.date(),
    isAcceptanceDeclarations: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};



export const partCertiSchema_W8Ben = (RetroactiveStatementValue:any) => {

  return Yup.object().shape({
    signedBy: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Please enter name of the person signing the form"),
    }),
    
    confirmationCode: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.test(
        'match',
        'Confirmation code does not match',
        function (value) {
          const storedConfirmationCode = obValues.confirmationCode;
          return !storedConfirmationCode || value === storedConfirmationCode;
        },
      )
    }),

    date: Yup.date(),
    isAcceptanceDeclarations: Yup.boolean().when([], {
      is: () => !RetroactiveStatementValue,
      then: schema => schema.oneOf(
      [true],
      "Please mark the checkbox")
  }),

    name: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Name is required"),
    }),
    isCircumstanceenable: Yup.boolean().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.oneOf([true], "This field is required"),
    }),
    enterDate: Yup.date().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Date is required"),
    }),
    changedDetails: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Changed details are required"),
    }),
    writtenExplanation: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Written explanation is required"),
    }),
    affidavitSignedBy: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Affidavit signed by is required"),
    }),
    affidavitConfirmationCode: Yup.string().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.test(
        'match',
        'Confirmation code does not match',
        function (value) {
          const storedConfirmationCode = obValues.confirmationCode;
          return !storedConfirmationCode || value === storedConfirmationCode;
        },
      ),
    }),
    affidavitDate: Yup.date().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.required("Affidavit date is required"),
    }),
    acceptanceConfirmation: Yup.boolean().when([], {
      is: () => RetroactiveStatementValue,
      then: schema => schema.oneOf([true], "Acceptance confirmation is required"),
    }),
  });
};

export const partCertiSchema_W9 = () => {
  return Yup.object().shape({

    signedBy: Yup.string().required("Please enter name of the person signing the form"),
    confirmationCode: Yup.string()
      .required("Please enter code")
      .test(
        'match',
        'Confirmation code does not match',
        function (value) {
          const storedConfirmationCode = obValues?.confirmationCode;
          return !storedConfirmationCode || value === storedConfirmationCode;
        }
      ),

    // word: Yup.boolean().when("EnterconfirmationCode", {
    //   is: "no",
    //   then: () => Yup.string().required("Please select owner"),
    // }),
    date: Yup.date(),
    isCheckAcceptance: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};

export const partCertiSchema_DC_BEN = () => {
  return Yup.object().shape({

    signedBy: Yup.string().required("Please enter name of the person signing the form"),
    confirmationCode: Yup.string()
      .required("Please enter code")
      .test(
        'match',
        'Confirmation code does not match',
        function (value) {
          const storedConfirmationCode = obValues?.confirmationCode;
          return !storedConfirmationCode || value === storedConfirmationCode;
        }
      ),

    // word: Yup.boolean().when("EnterconfirmationCode", {
    //   is: "no",
    //   then: () => Yup.string().required("Please select owner"),
    // }),
    date: Yup.date(),
    isCheckAcceptance: Yup.boolean().oneOf(
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
