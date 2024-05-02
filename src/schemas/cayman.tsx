import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')


const itemSchema = Yup.object().shape({
    isTaxLiabilityJurisdictions: Yup.string(),
    permanentResidentialCountryId: Yup.number().when("isTaxLiabilityJurisdictions",{
      is :"Yes",
      then : () => Yup.number().notOneOf([0], 'Please select a country'),
      otherwise:()=> Yup.number().notRequired()
    }),
    isTINFormatNotAvailable: Yup.string().when("isTaxLiabilityJurisdictions", {
      is: "Yes",
      then: () => Yup.string().required("Please select checkbox"),
    }),
    taxReferenceNumber: Yup.string().when(["isTaxLiabilityJurisdictions","isTINFormatNotAvailable"],{
      is:(isTaxLiabilityJurisdictions: string, isTINFormatNotAvailable: string) => isTaxLiabilityJurisdictions && isTINFormatNotAvailable,
      then:()=>Yup.string().required('Please enter Tax Refrense Number'),
      otherwise:()=>Yup.string().notRequired()
    }),
    
  });


export const StartSchema = () => {
  return Yup.object().shape({
    isHeldUSCitizenship: Yup.string().required(
      "Please select one of the options"
    ),
    countryOfCitizenship: Yup.string(),
   

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
        is: "Yes",
        then: () => Yup.string(),
      }
    ),
    //Keyy Missing from UI
    isRenouncedCitizenship: Yup.string().required(
      "Please select one of the options"
    ),
    dateRenouncedUSCitizenship: Yup.date().when("isRenouncedCitizenship",{
        is:"Yes",
        then: () => Yup.date().required("Please Enter DOB"),
        otherwise:()=> Yup.date().notRequired()
    }),
    //  Yup.date().required("Please Enter DOB"),
    // // renouncementProof: "",
    //: Yup.string(),
    // countryTaxLiability: Yup.number().when("isTaxLiabilityJurisdictions", {
    //   is: "Yes",
    //   then: () =>
    //     Yup.number()
    //       //   .required("Please select a country")
    //       .notOneOf([0], "Please select a valid country"),
    // }),
    
    taxLbltyOtherJurisdictions: Yup.array().of(Yup.object().shape({
      countryIdforTaxLiability: Yup.string().required('Please select a country'),
      isTINFormatNotAvailable: Yup.string().required("Please select checkbox"),
      taxReferenceNumber: Yup.string().when('isTINFormatNotAvailable', {
        is: true,
        then: () => Yup.string().required('Please enter the tax reference number'),
        otherwise: () => Yup.string().notRequired(),
      }),
    })),


    // taxLbltyOtherJurisdictions:Yup.array().of(itemSchema)
  });
};


export const EntityStartSchema = () => {
  return Yup.object().shape({
    chapter3Status: Yup.number()
      .min(1, "")
      .required(""),
    businessName: Yup.string().required("Field Cannot be Empty"),
    countryOfIncorporation: Yup.number().notOneOf([0], "Field Cannot be Empty"),
    dateOfIncorporation: Yup.string().required("Date of Incorporation Cannot be Empty"),
    jurisdictionForTaxPurposes:Yup.string().required("Please select Tax Jurisdiction"),
    countryOfTaxesPaid : Yup.number().when("jurisdictionForTaxPurposes",{
      is:"Yes",
      then:() => Yup.number().notOneOf([0], "Country of Taxes Paid Cannot be Empty"),
      otherwise:()=> Yup.number().notRequired()
    }),
    

    isApplyingTieBreakerClauseUnderApplicableTaxTreaty : Yup.string().when("jurisdictionForTaxPurposes",{
      is:"Yes",
      then:() => Yup.string().required("Please select Tax treaty"),
      otherwise:()=> Yup.string().notRequired()
    }),

    taxJurisdictionMismatchExplanationId : Yup.number().when("jurisdictionForTaxPurposes",{
      is:"Yes",
      then:() => Yup.number().notOneOf([0], "Please select Explaination ID"),
      otherwise:()=> Yup.number().notRequired()
    }),

    // taxJuridictionListItemSelectedId : Yup.number().when("jurisdictionForTaxPurposes",{
    //   is:"Yes",
    //   then:() => Yup.number().notOneOf([0], "Please select at least one option"),
    //   otherwise:()=> Yup.number().notRequired()
    // }),
    explainationForNone: Yup.string().when("taxJurisdictionMismatchExplanationId",{
      is:15,
      then:() =>  Yup.string().required("Please provide and Explaination"),
      otherwise:()=> Yup.string().notRequired()
    }),
    confirmThisisaTrueAndAccurate: Yup.boolean().when("taxJurisdictionMismatchExplanationId",{
      is:15,
      then: ()=> Yup.boolean().test('is-true', 'Please check the confirmation box', value => value === true),
      otherwise:()=> Yup.boolean().notRequired()
    })
    

  });
};


export const EntityUS_TINSchema = () => {
  return Yup.object().shape({
    notAvailable: Yup.boolean(),
    usTinTypeId: Yup.number().when("notAvailable", {
      is: false,
      then: () => Yup.number().required("Please select a valid option"),
      otherwise: () => Yup.number().notRequired(),
    }),
    
    usTin: Yup.string().when("notAvailable", {
      is: false,
      then: () =>Yup.string().required("Please enter US Tin"),
      otherwise: () => Yup.string().notRequired()
    }),
    
    reasionForUSTIN_NotAvailable:Yup.string().when("notAvailable", {
      is: true,
      then: () =>Yup.string().required("Please Specify Reason"),
      otherwise:() => Yup.string().notRequired()
    }), 


    
    isFTINNotLegallyRequired: Yup.boolean(),
    

    tinisFTINNotLegallyRequired: Yup.string(),

    foreginTIN_CountryId:  Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value:any) => value !== "NO",
      then: () =>Yup.string().required("Please select Foreign Tin Country"),
      otherwise:() => Yup.string().notRequired()
      
    }),
    foregionTIN: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: (value:any) => value !== "NO",
      then: () =>Yup.string().required("Please enter Foreign Tin"),
      otherwise: () => Yup.string().notRequired()
      
    }),

    reasionForForegionTIN_NotAvailable: Yup.string().when("tinisFTINNotLegallyRequired", {
      is: "NO",
      then: () =>
        Yup.string()
        .required("Please Specify Reason"),
    }),
  
   
    // isNotLegallyFTIN: Yup.string().when("isFTINNotLegallyRequired", {
    //   is: true,
    //   then: () =>
    //     Yup.string()
    //     .required("Please Select"),
    // }),
    // taxLbltyOtherJurisdictions: Yup.array().of(Yup.object().shape({
    //   countryIdforTaxLiability: Yup.string().required('Please select a country'),
    //   isTINFormatNotAvailable: Yup.string().required("Please select checkbox"),
    //   taxReferenceNumber: Yup.string().when('isTINFormatNotAvailable', {
    //     is: true,
    //     then: () => Yup.string().required('Please enter the tax reference number'),
    //     otherwise: () => Yup.string().notRequired(),
    //   }),
    // })),
  });
};

export const EntityUSCertificationSchema = () => {
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
    isAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    ),
  });
};


export const EntityUSSubmitSchema = () => {
  return Yup.object().shape({
    isConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { IsNotConsentReceipentstatement } = this.parent;
        return (value && !IsNotConsentReceipentstatement) || (!value && IsNotConsentReceipentstatement);
      }
    ),

    isNotConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { IsConsentReceipentstatement } = this.parent;
        return (value && !IsConsentReceipentstatement) || (!value && IsConsentReceipentstatement);
      }
    ),
    isAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    )
  });
};
