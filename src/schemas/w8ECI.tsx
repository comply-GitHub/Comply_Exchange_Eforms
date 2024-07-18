import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
export const TinSchema = () => {
  return Yup.object().shape({
    streetNumberName: Yup.string().required("Field cannot be empty"),
    eciUsTinTypeId: Yup.number()
      .required("Field cannot be empty"),
    eciUsTin: Yup.string().when("eciUsTinTypeId", {
      is: (eciUsTinTypeId: any) =>
        (eciUsTinTypeId != 1 && eciUsTinTypeId != 7 && eciUsTinTypeId != 8 && eciUsTinTypeId != 0),
      then: () => Yup.string().required("Please Enter TIN")
    }),
    // .required("Field cannot be empty"),
    cityTown: Yup.string().required("Field cannot be empty"),
    stateProvinceId: Yup.string().required("Field cannot be empty"),
    zipPostalCode: Yup.string().required("Field cannot be empty"),
  });
};

export const TaxPurposeSchema = (IsIndividual: boolean = false) => {
  return (IsIndividual ?
    Yup.object().shape({
      //firstName: Yup.string().required("Field cannot be empty"),
      chapter3Status: Yup.number().notOneOf([0], "Field cannot be empty"),
      countryOfIncorporation: Yup.number()
        .notOneOf([0], "Field cannot be empty"),
      lastName: Yup.string(),
      //businessName: Yup.string().required("Field cannot be empty"),
    })
    :
    Yup.object().shape({
      //firstName: Yup.string().required("Field cannot be empty"),
      chapter3Status: Yup.number().notOneOf([0], "Field cannot be empty"),
      countryOfIncorporation: Yup.number()
        .notOneOf([0], "Field cannot be empty"),
      //lastName: Yup.string(),
      businessName: Yup.string().required("Field cannot be empty"),
    })
  )
};



export const FederalTaxSchema = () => {
  return Yup.object().shape({
    federalTaxClassificationId: Yup.number().notOneOf([0], "Field cannot be empty"),


    countryOfIncorporation: Yup.number().when(["federalTaxClassificationId"], {
      is: (federalTaxClassificationId: any) => [5, 6, 7, 8, 9, 10].includes(federalTaxClassificationId),
      then: () => Yup.number().notOneOf([0, -1, undefined, null], "Please Select Country Of Incorporation"),
    }),

    LLCOwnerEntityType: Yup.number().when(["federalTaxClassificationId"], {
      is: (federalTaxClassificationId: any) => [7].includes(federalTaxClassificationId),
      then: () => Yup.number().notOneOf([0, -1, undefined, null], "Please Select Country Of Incorporation"),
    }),

    BusinessName: Yup.string().when(["federalTaxClassificationId"], {
      is: (federalTaxClassificationId: any) => [5, 6, 8, 9, 10].includes(federalTaxClassificationId),
      then: () => Yup.string().notOneOf(["", undefined, null], "Please Enter Business Name"),
    }),

    BusinessDisregardedEntityName: Yup.string().when(["federalTaxClassificationId"], {
      is: (federalTaxClassificationId: any) => [7].includes(federalTaxClassificationId),
      then: () => Yup.string().notOneOf(["", undefined, null], "Please Enter Business Name"),
    }),
    OtherType: Yup.string().when(["federalTaxClassificationId"], {
      is: (federalTaxClassificationId: any) => [11].includes(federalTaxClassificationId),
      then: () => Yup.string().notOneOf(["", undefined, null], "Please Enter Other"),
    }),
    USFederalTaxClassification: Yup.string().when(["federalTaxClassificationId"], {
      is: (federalTaxClassificationId: any) => [5, 8].includes(federalTaxClassificationId),
      then: () => Yup.string().notOneOf(["", undefined, null], "Please Select One Of the Option"),
    }),
  });
};


export const FederalTaxSchema_dualCert = () => {
  return Yup.object().shape({
    //  federalTaxClassificationId: Yup.number().notOneOf([0], "Field cannot be empty"),


    //  countryOfIncorporation: Yup.number().when(["federalTaxClassificationId"], {
    //    is: (federalTaxClassificationId: any) => [5, 6, 7,8, 9, 10].includes(federalTaxClassificationId),
    //    then: () => Yup.number().notOneOf([0,-1 ,undefined,null],"Please Select Country Of Incorporation"),
    //  }),

    //  LLCOwnerEntityType: Yup.number().when(["federalTaxClassificationId"], {
    //    is: (federalTaxClassificationId: any) => [7].includes(federalTaxClassificationId),
    //    then: () => Yup.number().notOneOf([0,-1 ,undefined,null],"Please Select Country Of Incorporation"),
    //  }),

    //  BusinessName: Yup.string().when(["federalTaxClassificationId"], {
    //    is: (federalTaxClassificationId: any) => [5, 6, 8, 9, 10].includes(federalTaxClassificationId),
    //    then: () => Yup.string().notOneOf(["" ,undefined,null],"Please Enter Business Name"),
    //  }),

    //  BusinessDisregardedEntityName: Yup.string().when(["federalTaxClassificationId"], {
    //    is: (federalTaxClassificationId: any) => [7].includes(federalTaxClassificationId),
    //    then: () => Yup.string().notOneOf(["" ,undefined,null],"Please Enter Business Name"),
    //  }),
    //  OtherType:Yup.string().when(["federalTaxClassificationId"], {
    //    is: (federalTaxClassificationId: any) => [11].includes(federalTaxClassificationId),
    //    then: () => Yup.string().notOneOf(["" ,undefined,null],"Please Enter Other"),
    //  }),
    //  USFederalTaxClassification: Yup.string().when(["federalTaxClassificationId"], {
    //    is: (federalTaxClassificationId: any) => [5, 8].includes(federalTaxClassificationId),
    //    then: () => Yup.string().notOneOf(["" ,undefined,null],"Please Select One Of the Option"),
    //  }),
    DateOfIncorporation: Yup.string().required("Field cannot be empty"),
    IsJurisdictionforTaxPurposes: Yup.string().required("Field cannot be empty"),
    IsTieBreakerClauseUnderApplicableTaxTreaty: Yup.string().when(["IsJurisdictionforTaxPurposes"], {
      is: (IsJurisdictionforTaxPurposes: any) => "Yes".includes(IsJurisdictionforTaxPurposes),
      then: () => Yup.string().notOneOf(["", undefined, null], "Please Select one of the options"),
    }),
    CountryIdwhereTaxesarePaid: Yup.number().when(["IsJurisdictionforTaxPurposes"], {
      is: (IsJurisdictionforTaxPurposes: any) => "Yes".includes(IsJurisdictionforTaxPurposes),
      then: () => Yup.number().notOneOf([0, undefined, null], "Please Select one of the options"),
    }),
    ContentforTaxJurisdictionMismatchExplanation: Yup.string().when(["IsJurisdictionforTaxPurposes"], {
      is: (IsJurisdictionforTaxPurposes: any) => "Yes".includes(IsJurisdictionforTaxPurposes),
      then: () => Yup.string().notOneOf(["", undefined, null], "Please Enter Explanation"),
    }),
    IsTrueandAccurateStatement: Yup.boolean().when(["IsJurisdictionforTaxPurposes"], {
      is: (IsJurisdictionforTaxPurposes: any) => "Yes".includes(IsJurisdictionforTaxPurposes),
      then: () => Yup.boolean().notOneOf([false, undefined, null], "Please Select Checkbox"),
    }),

  });
};

export const TaxPayerSchema = () => {
  return Yup.object().shape({
    usTinTypeId: Yup.number().notOneOf([0], "Please select"),
    usTin: Yup.string().when(["notAvailable", "usTinTypeId"], {
      is: (notAvailable: any, usTinTypeId: any) => notAvailable === false && usTinTypeId !== "8" && usTinTypeId !== "7" && usTinTypeId !== "1",
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
    foreignTINCountry: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value: any) => value === "No" || value === "" || value == undefined,
      then: () =>
        Yup.number()
          .notOneOf([0], "Please select Foreign Tin Country"),
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

          //if (foreignTINCountry >= 0 && isFTINLegally === false && (isNotAvailable === "No" || isNotAvailable === undefined)) {
          if (isFTINLegally === false && (isNotAvailable === "No" || isNotAvailable === undefined)) {
            if (value) {
              return value?.length > 0;
            } else
              return createError({
                message: "The Foreign tin field is required"
              });

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

export const IncomeSchema = () => {
  return Yup.object().shape({
    isAppplicationCheck: Yup.boolean(),
  });
};

export const IncomeReportTypeSchema = () => {
  return Yup.object().shape({
    itemIncomeType: Yup.number().required("Field Cannot be Empty").notOneOf([0], "Please select a valid option"),
    incomeDescription: Yup.string().required("Field Cannot be Empty"),
    
  });
};

export const certificateSchema = () => {
  return Yup.object().shape({
    isBeneficialOwnerIncome: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isAmountCertificationUS: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isBeneficialOwnerGrossIncome: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isBeneficialOwnerNotUSPerson: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isAuthorizeWithHoldingAgent: Yup.boolean().oneOf(
      [true],
      ""
    ),
    isCapacityForm: Yup.boolean().oneOf([true], ""),
    isElectronicForm: Yup.boolean().oneOf([true], ""),
  });
};
// export const partCertiSchema = () => {
//   return Yup.object().shape({
//     signedBy: Yup.string().required("Please enter "),
//     confirmationCode: Yup.string().required("Please enter code"),
//     date: Yup.date(),
//     isAgreeWithDeclaration: Yup.boolean().oneOf(
//       [true],
//       "Please mark the checkbox"
//     ),
//   });
// };
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
      )
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

export const SubmitSchemaECI = () => {
  return Yup.object().shape({
    isAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),

    isConsentRecipent: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { isNotConsentRecipent } = this.parent;
        return (value && !isNotConsentRecipent) || (!value && isNotConsentRecipent);
      }
    ),

    isNotConsentRecipent: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { isConsentRecipent } = this.parent;
        return (value && !isConsentRecipent) || (!value && isConsentRecipent);
      }
    ),
  });
};