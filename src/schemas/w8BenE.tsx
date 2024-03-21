import * as Yup from "yup";

export const TaxPurposeSchema = () => {
  return Yup.object().shape({
    chapter3Status: Yup.number()
      .min(1, "")
      .required(""),
    // lastName: Yup.string(),
    businessName: Yup.string().required("Field Cannot be Empty"),
    countryOfIncorporation: Yup.number().notOneOf([0], "Field Cannot be Empty"),
  });
};


export const validationUS = () => {
  return Yup.object().shape({
    interestDividendPaymentId: Yup.string().required("Field Cannot be Empty"),
    explaination: Yup.string().required("Field Cannot be Empty"),
    allocation: Yup.string().required("Field Cannot be Empty")
  });
};

export const chapter4Schema = () => {
  return Yup.object().shape({
    chapter4Status: Yup.number()
      .min(1, "Field Cannot be Empty")
      .required("Field Cannot be Empty"),
    isPassiveNFFE40A: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 2) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isPassiveNFFE40B: Yup.boolean(),
    isPassiveNFFE40C: Yup.boolean().when(["chapter4Status", "isPassiveNFFE40B"], ([chapter4Status, isPassiveNFFE40B], schema) => {
      console.log(isPassiveNFFE40B)
      if (chapter4Status === 2) {
        if (isPassiveNFFE40B !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else {
        return schema;
      }

    }),
    isCertify39: Yup.boolean().when(['chapter4Status'], ([chapter4Status], schema) => {
      if (chapter4Status === 6) {
        return schema.oneOf([true], 'Please check this checkbox');
      } else {
        return schema;
      }
    }),
    isCertify22Entity: Yup.boolean().when(['chapter4Status'], ([chapter4Status], schema) => {
      if (chapter4Status === 9) {
        return schema.oneOf([true], 'Please check this checkbox');
      } else {
        return schema;
      }
    }),

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
    foreignTIN: Yup.string()
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


export const claimSchemaW8BenE = () => {
  return Yup.object().shape({
    isClaimTreaty: Yup.string().required(
      "Please select one of the options"
    ),
    ownerResidentId: Yup.string().when(["isClaimTreaty"], {
      is: (isClaimTreaty: any) => isClaimTreaty === "yes",
      then: () => Yup.string().notOneOf(["", "0"], "Please select a Country from the list")
    }),
    limitationBenefitsId: Yup.string().when(["ownerResidentId"], ([ownerResidentId], schema) => {
      if (ownerResidentId && ownerResidentId != "" && ownerResidentId !== "0") {
        return schema.notOneOf(["", "0"], "Please select an option.");
      } else {
        return schema;
      }
    }),
    isSubmissionClaimTreaty: Yup.string().when(["ownerResidentId"], ([ownerResidentId], schema) => {
      //console.log(ownerResidentId,"valeeeeeeeeeee")
      if (ownerResidentId != undefined && ownerResidentId != "" && ownerResidentId !== "0") {
        return schema.notOneOf(["", undefined, null], "Please select an option.");
      } else {
        return schema;
      }
    }),
  });
};

export const partCertiSchema = () => {
  return Yup.object().shape({

    signedBy: Yup.string().required("Please enter name of the person signing the form"),
    confirmationCode: Yup.string()
      .required("Please enter code")
    // .test(
    //   'match',
    //   'Confirmation code does not match',
    //   function (value) {
    //     const storedConfirmationCode = obValues?.confirmationCode;
    //     return !storedConfirmationCode || value === storedConfirmationCode;
    //   }
    // ), 
    ,
    // word: Yup.boolean().when("EnterconfirmationCode", {
    //   is: "no",
    //   then: () => Yup.string().required("Please select owner"),
    // }),
    date: Yup.date(),
    isAcceptanceDeclarations: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};


export const rateSchema = () => {
  return Yup.object().shape({
    isSubmissionSpecialRates: Yup.string().oneOf(["yes", "no"],
      "Please select one of the options"
    ),
    articleExplanation: Yup.string().required("Please enter explanation"),
  });
};

export const specilaRateIncomeTypeSchema = (isSubmissionSpecialRates: string) => {
  return Yup.object().shape({
    articleBeneficalOwner: Yup.string().notOneOf(["", "0"], "Please select one of the options"),
    paragraphArticleClaimed: Yup.string().notOneOf(["", "0"], "Please select one of the options"),
    subParagraphArticle: Yup.string().trim().notOneOf(["", undefined], "Please enter subparagraph"),
    withHoldingClaim: Yup.string().notOneOf([""], "Please select one of the options"),
    incomeExpectedId: Yup.string().notOneOf(["", "0"], "Please select one of the options"),
  });
}

export const certificateSchema = () => {
  return Yup.object().shape({
    isBeneficialOwnerIncome: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isPersonNameNotUSPerson: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isIncomeFormRelated: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isAuthorizedForm: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isBrokerTransactions: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isAgree30DaysCertififcation: Yup.boolean().oneOf([true], ""),
    isCertifyCapacitySign: Yup.boolean().oneOf([true], ""),
    isConfirmElectronicForm: Yup.boolean().oneOf([true], ""),
  });
};