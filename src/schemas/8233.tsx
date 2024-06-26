import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')
export const SubstantialSchema = () => {
  return Yup.object().shape({
    daysAvailableInThisYear: Yup.number().max(366).required("Field Cannot be Empty"),
    daysAvailableIn_OneYearbefore: Yup.number().max(366).required("Field Cannot be Empty"),
    daysAvailableIn_TwoYearbefore: Yup.number().max(366).required("Field Cannot be Empty"),
    totalQualifyingDays: Yup.number(),
  });
};

export const US_TINSchema = () => {
  return Yup.object().shape({
    usTinTypeId: Yup.string().notOneOf(['0'], 'Please select a valid option'),

    // usTinTypeId: Yup.string().notOneOf(['0'], 'please select a valid value').when('$isRequired',{
    //   is:true,
    //   then: () => Yup.string().required('Selection is required when value is 0')
    // }),
    // usTinTypeId: Yup.string().required("Field Cannot be Empty"),
    //usTin: Yup.string().required("Field Cannot be Empty"),
    notAvailable: Yup.boolean(),
    usTin: Yup.string().when("notAvailable", {
      is: true,
      then: () => Yup.string().notRequired(),
      otherwise: () => Yup.string().required(),
    }),
    ReasionForForegionTIN_NotAvailable: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (tinisFTINNotLegallyRequired: any) => tinisFTINNotLegallyRequired == "NO",
      then: () => Yup.string().required('required'),
      otherwise: () => Yup.string().notRequired()
    }),
    tinisFTINNotLegallyRequired: Yup.string(),
    isFTINNotLegallyRequired: Yup.boolean(),
    ForeginTIN_CountryId: Yup.string().when(['isFTINNotLegallyRequired', 'tinisFTINNotLegallyRequired'], {
      is: (isFTINNotLegallyRequired: boolean, tinisFTINNotLegallyRequired: any) => !isFTINNotLegallyRequired && tinisFTINNotLegallyRequired !== "No",
      then: () => Yup.string().required("Foreign TIN Country is required"),
      otherwise: () => Yup.string().notRequired()
    }),
    // ForeginTIN_CountryId:Yup.string().when("isFTINNotLegallyRequired",{
    //   is:true,
    //   then:()=> Yup.string().notRequired(),
    //   otherwise:() =>Yup.string().required("Foreign Country is required")
    // }),
    ForegionTIN: Yup.string().when(['isFTINNotLegallyRequired', 'ForeginTIN_CountryId', 'tinisFTINNotLegallyRequired'], {
      is: (isFTINNotLegallyRequired: boolean, ForeginTIN_CountryId: any, tinisFTINNotLegallyRequired: any) => !isFTINNotLegallyRequired && ForeginTIN_CountryId !== "0" && tinisFTINNotLegallyRequired !== "NO",
      then: () => Yup.string().required("Foreign TIN is required"),
      otherwise: () => Yup.string().notRequired()
    }),
    // ForegionTIN: Yup.string().when(["isFTINNotLegallyRequired", "ForeginTIN_CountryId"], {
    //   is: (isFTINNotLegallyRequired, ForeginTIN_CountryId) => !isFTINNotLegallyRequired && ForeginTIN_CountryId !== "0",
    //   then: Yup.string().required("Foreign TIN is required"),
    //   otherwise: Yup.string().notRequired()
    // }),
    // ForegionTIN: Yup.string().when("ForeginTIN_CountryId",{
    //   is:(value: any) => (value !==0),
    //   then: () => Yup.string().required("Foreign TIN is required"),
    //   otherwise: () => Yup.string().notRequired(),
    // }),
    //foreignTIN: Yup.string(),



    isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
      is: true,
      then: () => Yup.string().required("required"),
      otherwise: () => Yup.string().notRequired(),
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
    dateOfEntryIntoUS: Yup.date().typeError('Please enter a valid date').required('Please enter date of entry into US'),
    nonImmigrationStatus: Yup.boolean(),
    currentNonImmigrationStatus: Yup.string().when("nonImmigrationStatus", {
      is: false,
      then: () => Yup.string().required("Please enter Current Immigration status"),
      otherwise: () => Yup.string().notRequired()
    }),
    dateNonImmigrationStatusExpire: Yup.date().typeError('Please enter a valid date') // Change error message for invalid date format
      .required('Please enter a valid date').when(["declarationOfDurationStayStatus", "nonImmigrationStatus"], {
        is: (declarationOfDurationStayStatus: boolean, nonImmigrationStatus: any) => !declarationOfDurationStayStatus && !nonImmigrationStatus,
        then: () => Yup.date().required('Please enter date of Immigration status expires'),
        otherwise: () => Yup.date().notRequired()
      }),
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

    taxTreaty_CheckAll: Yup.boolean(),

    taxTreaty_TotalCompensationListedon11bExemptFromTax: Yup.number().when("taxTreaty_CheckAll", {
      is: false,
      then: () => Yup.number().min(1).required("Number greater than 0 required"),
      otherwise: () => Yup.number().notRequired()
    }),


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

export const documentSchema = Yup.object().shape({
  additionalDocs: Yup.array().of(
    Yup.object().shape({
      documentType: Yup.string().required('Document type is required'),
      file: Yup.mixed().required('File is required'),
    })
  ),
});

// export const documentSchema = () => {
//   return Yup.object().shape({
//     additinalDocument1ID: Yup.number().min(1).required(),
//     additinalDocument1Name: Yup.string().required(),
//     additinalDocument2ID: Yup.number().min(1).required(),
//     additinalDocument2Name: Yup.string().required(),
//     additinalDocument3ID: Yup.number().min(1).required(),
//     additinalDocument3Name: Yup.string().required(),
//     additinalDocument4ID: Yup.number().min(1).required(),
//     additinalDocument4Name: Yup.string().required(),
//     additinalDocument5ID: Yup.number().min(1).required(),
//     additinalDocument5Name: Yup.string().required(),
//     additinalDocument6ID: Yup.number().min(1).required(),
//     additinalDocument6Name: Yup.string().required(),
//     additinalDocument7ID: Yup.number().min(1).required(),
//     additinalDocument7Name: Yup.string().required(),
//     additinalDocument8ID: Yup.number().min(1).required(),
//     additinalDocument8Name: Yup.string().required(),
//     additinalDocument9ID: Yup.number().min(1).required(),
//     additinalDocument9Name: Yup.string().required(),
//     additinalDocument10ID: Yup.number().min(1).required(),
//     additinalDocument10Name: Yup.string().required(),
//   });
// };

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

    signBy: Yup.string().required("Please enter name of the person signing the form"),
    enterConfirmationCode: Yup.string()
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
    signDate: Yup.date(),
    confirmationOfAcceptanceWithTheAboveDeclarations: Yup.boolean().oneOf(
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
