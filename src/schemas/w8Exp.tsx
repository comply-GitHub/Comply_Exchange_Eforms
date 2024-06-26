import * as Yup from "yup";
import { isAlphaNumeric } from "../Helpers/convertToFormData";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
export const TaxPurposeSchema = () => {
  return Yup.object().shape({
    chapter3StatusId: Yup.number()
      .min(1, "Field Cannot be Empty")
      .required("Field Cannot be Empty"),
    // lastName: Yup.string(),
    businessName: Yup.string().required("Field Cannot be Empty"),
    countryOfIncorporationId: Yup.number().notOneOf([0], "Field Cannot be Empty"),
    isSection892: Yup.boolean().when("chapter3StatusId", {
      is: 14,
      then: () => Yup.boolean().oneOf([true], "")
    }),
    isSection7701and892: Yup.boolean().when("chapter3StatusId", {
      is: 10,
      then: () => Yup.boolean().oneOf([true], "")
    }),
    isSection895: Yup.boolean().when("chapter3StatusId", {
      is: 15,
      then: () => Yup.boolean().oneOf([true], "")
    }),
    isSection115: Yup.boolean().when("chapter3StatusId", {
      is: 16,
      then: () => Yup.boolean().oneOf([true], "")
    }),
    isSection512IRSDated: Yup.boolean().when("chapter3StatusId", {
      is: (chapter3StatusId: number) => chapter3StatusId === 19 || chapter3StatusId === 17,
      then: () => Yup.boolean().when("isSetion501",
        {
          is: false,
          then: () => Yup.boolean().oneOf([true], "")
        }
      )
    }),
    isSetion501: Yup.boolean().when("chapter3StatusId", {
      is: (chapter3StatusId: number) => chapter3StatusId === 19 || chapter3StatusId === 17,
      then: () => Yup.boolean().when("isSection512IRSDated",
        {
          is: false,
          then: () => Yup.boolean().oneOf([true], "")
        }
      )
    }),
    isSection501and509A: Yup.boolean().when("chapter3StatusId", {
      is: (chapter3StatusId: number) => chapter3StatusId === 19 || chapter3StatusId === 17,
      then: () => Yup.boolean().when("isSection501and509B",
        {
          is: false,
          then: () => Yup.boolean().oneOf([true], "")
        }
      )
    }),
    isSection501and509B: Yup.boolean().when("chapter3StatusId", {
      is: (chapter3StatusId: number) => chapter3StatusId === 19 || chapter3StatusId === 17,
      then: () => Yup.boolean().when("isSection501and509A",
        {
          is: false,
          then: () => Yup.boolean().oneOf([true], "")
        }
      )
    }),

    isSection897and1145: Yup.boolean().when("chapter3StatusId", {
      is: 18,
      then: () => Yup.boolean().when("isSection897and1145Partnership",
        {
          is: false,
          then: () => Yup.boolean().oneOf([true], "")
        }
      )
    }),
    isSection897and1145Partnership: Yup.boolean().when("chapter3StatusId", {
      is: 18,
      then: () => Yup.boolean().when("isSection897and1145",
        {
          is: false,
          then: () => Yup.boolean().oneOf([true], "")
        }
      )
    }),

  });
};

export const chapter4Schema = () => {
  return Yup.object().shape({
    chapter4StatusId: Yup.number()
      .min(2, "Field Cannot be Empty")
      .required("Field Cannot be Empty"),
    isNotFinancialInsititute: Yup.boolean().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 2) {
        return schema.oneOf([true], "Please check this checkbox");
      } else {
        return schema;
      }
    }),
    isNoSubstantialUSOwner: Yup.boolean(),
    isNFFE: Yup.boolean().when(["chapter4StatusId", "isNoSubstantialUSOwner"], ([chapter4StatusId, isNoSubstantialUSOwner], schema) => {
      console.log(isNoSubstantialUSOwner)
      if (chapter4StatusId == 2) {
        if (isNoSubstantialUSOwner !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else {
        return schema;
      }
    }),
    isSection114716: Yup.boolean(),
    isRegulationSection114716: Yup.boolean().when(["chapter4StatusId", "isSection114716"], ([chapter4StatusId, isSection114716], schema) => {
      if (chapter4StatusId == 37) {
        if (isSection114716 !== true) {
          return schema.isTrue("please check b or c checkbox");
        } else {
          return schema.isFalse("please check b or c checkbox")
        }
      } else if (chapter4StatusId == 38) {
        return schema.isTrue("please check checkbox");
      } else {
        return schema;
      }
    }),
    isNonReportingIGAFFI: Yup.boolean().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 24) {
        return schema.isTrue("please check the checkbox");
      } else {
        return schema;
      }
    }),
    iGAUSCountryId: Yup.number().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 24) {
        return schema.notOneOf([0, -1], "Please select a valid country");
      } else {
        return schema;
      }
    }),
    treatedAsId: Yup.number().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 24) {
        return schema.notOneOf([0, -1], "Please select a valid country");
      } else {
        return schema;
      }
    }),
    specifyEntity: Yup.string().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 24) {
        return schema.notOneOf([undefined, ""], "Please enter a valid value");
      } else {
        return schema;
      }
    }),
    gIINNumber: Yup.string().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 24) {
        return schema.notOneOf([undefined, ""], "Please enter a valid value");
      } else {
        return schema;
      }
    }),
    nameSponsoringEntity: Yup.string().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 33) {
        return schema.notOneOf([undefined, ""], "Please enter a valid value");
      } else {
        return schema;
      }
    }),
    isNFFESponsored: Yup.boolean().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 33) {
        return schema.notOneOf([undefined, false], "Please check the checkbox");
      } else {
        return schema;
      }
    }),
    isFinancialLawUS: Yup.boolean().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 35) {
        return schema.notOneOf([undefined, false], "Please check the checkbox");
      } else {
        return schema;
      }
    }),
    isSection501NotInsuranceCompany: Yup.boolean().when(["chapter4StatusId"], ([chapter4StatusId], schema) => {
      if (chapter4StatusId == 36) {
        return schema.notOneOf([undefined, false], "Please check the checkbox");
      } else {
        return schema;
      }
    }),
  });
};

export const TaxPayerSchema = (isGiinEnabled: boolean) => {
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
    giinId: Yup.string().nullable()
      .test(
        {
          name: "Uppercase",
          message: "GIIN is required and must be all uppercase",
          test: (value, context) => {
            let { giinNotAvailable, giinTypeId } = context.parent;
            if (isGiinEnabled && giinNotAvailable !== true && (giinTypeId === 1 || giinTypeId === "1")) {
              if (value) {
                const hasLowerCase = /[a-z]/.test(value);
                return !hasLowerCase;
              } else {
                return false;
              }

            } else {
              return true;
            }
          }
        })
      .test({
        name: "length",
        message: "GIIN length should be 16 character",
        test: (value, context) => {
          let { giinNotAvailable, giinTypeId } = context.parent;
          if (isGiinEnabled && giinNotAvailable !== true && (giinTypeId === 1 || giinTypeId === "1")) {
            return value?.length == 16
          }
          else
            return true
        }
      })

      .test({
        name: "format",
        message: "GIIN format should be valid",
        test: (value, context) => {
          let { giinNotAvailable, giinTypeId } = context.parent;
          if (isGiinEnabled && giinNotAvailable !== true && (giinTypeId === 1 || giinTypeId === "1")) {
            if (!value) {
              return false;
            }
            let case1 = isAlphaNumeric(value?.slice(0, 6));
            if (!case1) {
              //console.log("case1")
              return false;
            }
            let case2 = isAlphaNumeric(value?.slice(6, 11));
            if (!case2) {
              //console.log("case2")
              return false;
            }
            let case3Data = ["LE", "SL", "ME", "BR", "SP"];
            let case3 = case3Data.includes(value?.slice(11, 13));
            if (!case3) {
              //console.log("case3")
              return false;
            }

            let case4 = Number.parseInt(value?.slice(13, 16));
            if (Number.isNaN(case4)) {
              //console.log("case4")
              return false;
            }

            return true

          }
          else
            return true
        }
      }),
  });
};

export const certificateSchema = () => {
  return Yup.object().shape({
    isBeneficialOwnerIncome: Yup.boolean().oneOf(
      [true],
      ""
    ),

    isAuthorizeWithHoldingAgent: Yup.boolean().oneOf(
      [true],
      ""
    ),
    // isCapacityForm: Yup.boolean().oneOf([true], ""),
    // isElectronicForm: Yup.boolean().oneOf([true], ""),
  });
};


export const certificateSchema_EXP = () => {
  return Yup.object().shape({
    isBeneficialOwnerIncome: Yup.boolean().oneOf(
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

export const certificateSchema_w9_DC = () => {
  return Yup.object().shape({
    confirmThisisaTrueAndAccurate: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    confirmYouhaveRewiedElectronicForm: Yup.boolean().oneOf([true], "Please mark the checkbox"),
  });
};


export const SelfCertSchema_w9_DC = (showAlternateAddress: boolean, showTin: boolean, showTin2: boolean) => {
  return Yup.object().shape({
    firstName: Yup.string().required("Please Enter"),
    familyName: Yup.string().required("Please Enter"),
    dateofBirth: Yup.string(),
    countryofBirth: Yup.string(),
    cityOfBirth: Yup.string(),
    permanentHouseNumberorName: Yup.string(),
    permanentRoadName: Yup.string(),
    permanentLocation: Yup.string(),
    permanentCityorTown: Yup.string(),
    permanentStateorProvince: Yup.string(),
    permanentZiporPostalCode: Yup.string(),
    permanentResidentialCountry: Yup.string().required("Please Enter"),
    primaryTaxJurisdictionCountry1: Yup.string(),
    alterHouseNumberorName: showAlternateAddress === true ? Yup.string() : Yup.string(),
    alterRoadName: showAlternateAddress === true ? Yup.string() : Yup.string(),
    alterLocation: showAlternateAddress === true ? Yup.string() : Yup.string(),
    alterCityorTown: showAlternateAddress === true ? Yup.string() : Yup.string(),
    alterStateorProvince: showAlternateAddress === true ? Yup.string() : Yup.string(),
    alterZiporPostalCode: showAlternateAddress === true ? Yup.string() : Yup.string(),
    alterResidentialCountry: showAlternateAddress === true ? Yup.number().required("Please Enter") : Yup.number(),
    tinType1: Yup.string(),
    tiN1: Yup.string(),
    tinUnavailable1: Yup.boolean(),
    primaryTaxJurisdictionCountry2: Yup.string(),
    tinType2: Yup.string(),
    tiN2: Yup.string(),
    tinUnavailable2: Yup.boolean(),
    primaryTaxJurisdictionCountry3: Yup.string(),
    tinType3: Yup.string(),
    tiN3: Yup.string(),
    tinUnavailable3: Yup.boolean(),
    reasonforNonAvailabilityofTIN: Yup.string(),
    legalNameofEntity1: Yup.string().required("Please Enter"),
    legalNameofEntity2: Yup.string(),
    legalNameofEntity3: Yup.string(),
    statusEntity1: Yup.string().required("Please Enter"),
    statusEntity2: Yup.string(),
    statusEntity3: Yup.string(),
    ownershipPercentage: Yup.string(),
    emailAddress: Yup.string(),
    usTaxCertificateSubmissionRequest: Yup.boolean()
  });
};

export const certificateSchema_BEN_DC = () => {
  return Yup.object().shape({
    confirmThisisaTrueAndAccurate: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    confirmYouhaveRewiedElectronicForm: Yup.boolean().oneOf([true], "Please mark the checkbox"),
  });
};
export const certificateSchema_w9 = () => {
  return Yup.object().shape({
    certification_CorrectTaxpayerIdentification: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    certification_IRSBackupWithHolding: Yup.boolean(),


    certification_FATCACode: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    certification_IRS: Yup.boolean()
      .when('certification_IRSBackupWithHolding', (certification_IRSBackupWithHolding, schema) => {
        return certification_IRSBackupWithHolding[0] ? schema.isFalse("") : schema.isTrue("");
      })
    ,
    certification_ElectronicForm: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isBackup: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    certification_USCitizenPerson: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    isElectronicForm: Yup.boolean().oneOf([true], "Please mark the checkbox"),
  });
};

// certification_CorrectTaxpayerIdentification: getReducerData?.certification_CorrectTaxpayerIdentification ?? false,
//     certification_IRSBackupWithHolding: getReducerData?.certification_IRSBackupWithHolding ?? false,
//     certification_FATCACode: getReducerData?.certification_FATCACode ?? false,
//     certification_IRS: getReducerData?.certification_IRS ?? false,
//     certification_ElectronicForm: getReducerData?.certification_ElectronicForm ?? false,
//     certification_USCitizenPerson: getReducerData?.certification_USCitizenPerson ?? false,
export const certificateSchema_w8Ben = () => {
  return Yup.object().shape({
    isBeneficialOwnerIncome: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isAmountCertificationUS: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isBeneficialOwnerGrossIncome: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isBeneficialOwnerNotUSPerson: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    isAuthorizeWithHoldingAgent: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),

    isCapacityForm: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    isElectronicForm: Yup.boolean().oneOf([true], "Please mark the checkbox"),
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