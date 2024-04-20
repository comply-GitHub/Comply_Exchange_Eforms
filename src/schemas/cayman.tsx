import * as Yup from "yup";
const obValues = JSON.parse(localStorage.getItem("formSelection") || '{}')


const itemSchema = Yup.object().shape({
    permanentResidentialCountryId: Yup.number().required('Please select country'),
    taxReferenceNumber: Yup.string().required('Please enter Tax Reference Number'),
    
  });


export const StartSchema = () => {
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
    isRenouncedCitizenship: Yup.boolean().required(
      "Please select one of the options"
    ),
    dateRenouncedUSCitizenship: Yup.date().when("isRenouncedCitizenship",{
        is:true,
        then: () => Yup.date().required("Please Enter DOB"),
        otherwise:()=> Yup.date().notRequired()
    }),
    //  Yup.date().required("Please Enter DOB"),
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
    items:Yup.array().of(itemSchema)
  });
};





