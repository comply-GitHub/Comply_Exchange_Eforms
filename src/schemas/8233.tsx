import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
export const SubstantialSchema = () => {
  return Yup.object().shape({
    daysAvailableInThisYear: Yup.number().min(1).required("Field Cannot be Empty"),
    daysAvailableIn_OneYearbefore: Yup.number().min(1).required("Field Cannot be Empty"),
    daysAvailableIn_TwoYearbefore: Yup.number().min(1).required("Field Cannot be Empty"),
    totalQualifyingDays: Yup.number(),
  });
};

export const US_TINSchema = () => {
  return Yup.object().shape({
    // usTinTypeId: Yup.string().notOneOf(['0'], 'Please select a valid option').when('$isRequired', {
    //   is: true,
    //   then: Yup.string().required('Selection is required when value is 0'),
    // }),

    usTinTypeId: Yup.string().notOneOf(['0'], 'please select a valid value').when('$isRequired',{
      is:true,
      then: () => Yup.string().required('Selection is required when value is 0')
    }),
    //usTinTypeId: Yup.string().required("Field Cannot be Empty"),
    //usTin: Yup.string().required("Field Cannot be Empty"),
    notAvailable: Yup.boolean(),
    usTin:Yup.string().when("notAvailable" ,{
      is:true,
      then:() => Yup.string().notRequired(),
      otherwise:() => Yup.string().required(),
    }),
    ReasionForForegionTIN_NotAvailable:Yup.string().when("notAvailable",{
      is:true,
      then:() => Yup.string().required('required'),
      otherwise : () => Yup.string().notRequired()
    }),

    //ForeginTIN_CountryId: Yup.string(),
    ForeginTIN_CountryId:Yup.string().when("isFTINNotLegallyRequired",{
      is:true,
      then:()=> Yup.string().notRequired(),
      otherwise:() =>Yup.string().required("Foreign Country is required")
    }),
    ForegionTIN: Yup.string().when("ForeginTIN_CountryId",{
      is:(value: any) => (value !==0),
      then: () => Yup.string().required("Foreign TIN is required"),
      otherwise: () => Yup.string().notRequired(),
    }),
    //foreignTIN: Yup.string(),

    isFTINNotLegallyRequired: Yup.boolean(),
    
    isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
      is: true,
      then: () => Yup.string().required("required"),
      otherwise : () => Yup.string().notRequired(),
    }),


  });
};

export const ownerSchema = () => {
  return Yup.object().shape({
    exemptionApplicableForCompensationForCalnderYear: Yup.number()
      ,
    
    otherTaxBeginingYear: Yup.number(),
    otherTaxEndYear: Yup.number(),
    usVisaTypeID: Yup.string().required("Field Cannot be Empty"),
    countryIssuingPassportId: Yup.string().required("Field Cannot be Empty"),
    countryIssuingPassportNumber: Yup.string().required("Field Cannot be Empty"),
    dateOfEntryIntoUS: Yup.date().required("Please enter date"),
    nonImmigrationStatus: Yup.boolean(),
    currentNonImmigrationStatus: Yup.string().when("nonImmigrationStatus",{
      is:false,
      then : () => Yup.string().required(),
      otherwise : () => Yup.string().notRequired()
    }),
    dateNonImmigrationStatusExpire: Yup.date(),
    declarationOfDurationStayStatus: Yup.boolean(),
    foreignStudent_Teacher_Professor_ResearcherStatus: Yup.boolean(),
    statementToForm8233_FileUpoad: Yup.mixed().when("foreignStudent_Teacher_Professor_ResearcherStatus", {
      is: true,
      then: () => Yup.string().required("File is required")
    })
    


  });
};
export const amountSchema = () => {
  return Yup.object().shape({
    taxTreaty_DescriptionOfPersonalServiceYouProvide: Yup.string(),
    taxTreaty_TotalCompensationYouExpectForThisCalenderYear: Yup.number()
      .min(1)
      .required("Number greater than 0 required"),
    taxTreaty_TreatyId: Yup.number(),
    taxTreaty_TreatyArticleId: Yup.number(),
    taxTreaty_TotalCompensationListedon11bExemptFromTax: Yup.number()
      .min(1)
      .required("Number greater than 0 required"),
    taxTreaty_CheckAll: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    taxTreaty_CountryOfResidenceId: Yup.number(),
    taxTreaty_NoncompensatoryScholarshiporFellowshipIncome: Yup.number()
      ,
    taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingTreatyID:
      Yup.number(),
    taxTreatyAndTreatyArticleOnWhich_BasingExemptionFromWithholdingArticleID:
      Yup.number(),
    totalIncomeListedIncomeonLine13ATaxExemptAmount: Yup.number()
      ,
    sufficientFactToJustfyExemptionForClaim12A_13: Yup.string(),
  });
};

export const documentSchema = () => {
  return Yup.object().shape({
    additinalDocument1ID: Yup.number().min(1).required(),
    additinalDocument1Name: Yup.string().required(),
    additinalDocument2ID: Yup.number().min(1).required(),
    additinalDocument2Name: Yup.string().required(),
    additinalDocument3ID: Yup.number().min(1).required(),
    additinalDocument3Name: Yup.string().required(),
    additinalDocument4ID: Yup.number().min(1).required(),
    additinalDocument4Name: Yup.string().required(),
    additinalDocument5ID: Yup.number().min(1).required(),
    additinalDocument5Name: Yup.string().required(),
    additinalDocument6ID: Yup.number().min(1).required(),
    additinalDocument6Name: Yup.string().required(),
    additinalDocument7ID: Yup.number().min(1).required(),
    additinalDocument7Name: Yup.string().required(),
    additinalDocument8ID: Yup.number().min(1).required(),
    additinalDocument8Name: Yup.string().required(),
    additinalDocument9ID: Yup.number().min(1).required(),
    additinalDocument9Name: Yup.string().required(),
    additinalDocument10ID: Yup.number().min(1).required(),
    additinalDocument10Name: Yup.string().required(),
  });
};

export const certificateSchema = () => {
  return Yup.object().shape({
    i_Certify_BeneficialOwnerOrAuthorisedToSignForAllMentionIncome:
      Yup.boolean().oneOf([true], "Please mark the checkbox"),
    i_Certify_BeneficialOwnerIsNotUSPerson: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    i_Certify_BeneficialOwnerResidentOfTreatyCountryOf12A_13B:
      Yup.boolean().oneOf([true], "Please mark the checkbox"),
    i_Certify_FurthermoreIAuthorise: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
    i_Certify_ConfirmYouHaveReviewedTheElectronicForm: Yup.boolean().oneOf(
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
    isDeclaration: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    isConsentRecipent: Yup.boolean().oneOf([true], "Please mark the checkbox"),
    isNotConsentRecipent: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};
