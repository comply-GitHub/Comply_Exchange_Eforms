import * as Yup from "yup";
import { isAlphaNumeric } from "../Helpers/convertToFormData";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
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
      .min(2, "Field Cannot be Empty")
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
      if (chapter4Status == 2) {
        if (isPassiveNFFE40B !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else {
        return schema;
      }

    }),
    isCertify39: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 6 || chapter4Status == 7 || chapter4Status == 35 || chapter4Status == 8) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify35: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 36) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    //Sponsored Direct Reporting NFFE
    nameSponsoringEntity: Yup.string().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 33) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify43: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 33) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),


    isCertify22Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 9) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify18FFI: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 10) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify30Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 13) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify41Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 14) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify32Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 16) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify38Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 18) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),

    isCertify27Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 20) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify36Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 23) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify34Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 15) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    planReorganization: Yup.string().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 15) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify33Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 17) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    priorDate: Yup.string().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 17) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    // International organization
    isCertify28aEntity: Yup.boolean()
    // .when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 21) {
    //     return schema.oneOf([true], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    ,
    isCertify28bEntity: Yup.boolean().when(["chapter4Status", "isCertify28aEntity"], ([chapter4Status, isCertify28aEntity], schema) => {
      if (chapter4Status == 21 && isCertify28aEntity == false) {
        return schema.oneOf([true], "Please check this checkbox");
      } else
        if (chapter4Status == 21) {
          if (isCertify28aEntity == true) { return schema; }
          else {
            return schema.oneOf([true], "Please check this checkbox a or b");
          }
        }
        else {
          return schema;
        }
    }),


    // NON Reporting FFI

    // iGAbetweenUnitedStates:Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 24) {
    //     return schema.oneOf([true], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // iGA:Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 24) {
    //     return schema.oneOf([true], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // istreated:Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 24) {
    //     return schema.oneOf([true], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // otherTreated:Yup.string().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 24) {
    //     return schema.notOneOf([undefined,""], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // isCertify26Entity:Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 24) {
    //     return schema.oneOf([true], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    isCertify24aFFIPart1: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 25) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify24bFFIPart1: Yup.boolean(),
    isCertify24cFFIPart1: Yup.boolean().when(["chapter4Status", "isCertify24bFFIPart1"], ([chapter4Status, isCertify24bFFIPart1], schema) => {
      console.log(isCertify24bFFIPart1)
      if (chapter4Status == 25) {
        if (isCertify24bFFIPart1 !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else {
        return schema;
      }

    }),
    //Sponsored FFI
    nameSponsoringEntity16: Yup.string().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 34) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify17a: Yup.boolean(),
    isCertify17b: Yup.boolean().when(["chapter4Status", "isCertify17a"], ([chapter4Status, isCertify17a], schema) => {
      console.log(isCertify17a)
      if (chapter4Status == 34) {
        if (isCertify17a !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else {
        return schema;
      }
    }),
    // Restricted Distributor
    isCertify25aEntityPart1: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 32) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    hasBeenBoundBy: Yup.boolean(),
    currentBoundBy: Yup.boolean().when(["chapter4Status", "hasBeenBoundBy"], ([chapter4Status, hasBeenBoundBy], schema) => {
      console.log(hasBeenBoundBy)
      if (chapter4Status == 32) {
        if (hasBeenBoundBy !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else {
        return schema;
      }
    }),

    //Publicly Traded NFFE or NFFE Affiliate of a Publicly Traded Corporation
    isCertify37a: Yup.boolean(),
    aEntityStockMarket: Yup.string().when(["chapter4Status", "isCertify37a"], ([chapter4Status, isCertify37a], schema) => {
      if (chapter4Status == 28 && isCertify37a == true) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify37b: Yup.boolean().when(["chapter4Status", "isCertify37a"], ([chapter4Status, isCertify37a], schema) => {
      if (chapter4Status == 28 && isCertify37a == false) {
        return schema.oneOf([true], "Please check this checkbox");
      } else
        if (chapter4Status == 28) {
          if (isCertify37a == true) {
            return schema;

          }
          else {
            return schema.oneOf([true], "Please check this checkbox a or b");
          }
        }
        else { return schema; }
    }),
    bEntityStockMarket: Yup.string().when(["chapter4Status", "isCertify37b"], ([chapter4Status, isCertify37b], schema) => {
      if (chapter4Status == 28 && isCertify37b == true) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    namesecuritiesmarket: Yup.string().when(["chapter4Status", "isCertify37b"], ([chapter4Status, isCertify37b], schema) => {
      if (chapter4Status == 28 && isCertify37b == true) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    nameSponsoringEntity1: Yup.string().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 11) {
        return schema.notOneOf([undefined, ""], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isCertify21Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 11) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    // Non reporting IGA FFI
    isCertify26Entity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 24) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    iGAbetweenUnitedStates: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 24) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    iGA: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 24) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    istreated: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
      if (chapter4Status == 24) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),

    //Exempt Retirement Plans
    isCertify29aEntity: Yup.boolean().when(["chapter4Status", "isCertify29bEntity", "isCertify29cEntity", "isCertify29dEntity", "isCertify29eEntity", "isCertify29fEntity"], ([chapter4Status, isCertify29bEntity, isCertify29cEntity, isCertify29dEntity, isCertify29eEntity, isCertify29fEntity], schema) => {
      if (chapter4Status == 19) {
        if (isCertify29bEntity === true) {
          return schema.oneOf([false], "");
        } else if (isCertify29cEntity === true) {
          return schema.oneOf([false], "");

        } else if (isCertify29dEntity === true) {
          return schema.oneOf([false], "");

        } else if (isCertify29eEntity === true) {
          return schema.oneOf([false], "");

        } else if (isCertify29fEntity === true) {
          return schema.oneOf([false], "");

        }
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    // isCertify29bEntity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 19) {
    //     return schema.oneOf([true, false], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // isCertify29cEntity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 19) {
    //     return schema.oneOf([true, false], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // isCertify29dEntity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 19) {
    //     return schema.oneOf([true, false], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // isCertify29eEntity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 19) {
    //     return schema.oneOf([true, false], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
    // isCertify29fEntity: Yup.boolean().when(["chapter4Status"], ([chapter4Status], schema) => {
    //   if (chapter4Status == 19) {
    //     return schema.oneOf([true, false], "Please check this checkbox");
    //   } else {
    //     return schema;
    //   }
    // }),
  });
};


export const US_TINSchemaW8BenE = (isGiinEnabled: boolean) => {
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

    giinId: Yup.string()
    .nullable()
    .test({
      name: 'Uppercase',
      message: 'GIIN is required and must be all uppercase',
      test: (value, context) => {
        const { isUSEntity } = context.parent;
        if (isGiinEnabled && isUSEntity === 'no') {
          if (value) {
            const hasLowerCase = /[a-z]/.test(value);
            return !hasLowerCase;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    })
    .test({
      name: 'length',
      message: 'GIIN length should be 19 characters',
      test: (value, context) => {
        const { isUSEntity } = context.parent;
        if (isGiinEnabled && isUSEntity === 'no') {
          return value?.length === 19;
        } else {
          return true;
        }
      },
    })
    .test({
      name: 'format',
      message: 'GIIN format should be valid',
      test: (value, context) => {
        const { isUSEntity } = context.parent;
        if (isGiinEnabled && isUSEntity === 'no') {
          if (!value) {
            return false;
          }
          // Check for the exact format based on the mask
          const regex = /^[0-9]{3}[A-Z]{3}\.[0-9]{5}\.[A-Z]{2}\.[0-9]{3}$/;
          return regex.test(value);
        } else {
          return true;
        }
      },
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
    isAcceptanceDeclarations: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};
export const partCertiSchema_W8Bene = (RetroactiveStatementValue:any) => {

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
    withHoldingClaim: Yup.string().notOneOf(["", undefined], "Please select one of the options"),
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

export const SubmitSchema = () => {
  return Yup.object().shape({
    isConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { isNotConsentReceipentstatement } = this.parent;
        return (value && !isNotConsentReceipentstatement) || (!value && isNotConsentReceipentstatement);
      }
    ),

    isNotConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { isConsentReceipentstatement } = this.parent;
        return (value && !isConsentReceipentstatement) || (!value && isConsentReceipentstatement);
      }
    ),
    isAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      ""
    )
  });
};