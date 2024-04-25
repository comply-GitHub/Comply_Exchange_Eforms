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






