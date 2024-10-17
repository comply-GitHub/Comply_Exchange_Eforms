import * as Yup from "yup";

export const individualSchema = (Cert: string, payment: boolean, income: boolean,visiblePaymentTypes:string) => {
  return Yup.object().shape({
    isUSEntity: Yup.string(),
    isUSIndividual: Yup.string(),
    firstName: Yup.string().trim()
      .required("Please Enter First Name"),
    usTin: Yup.string().when("taxpayerIdTypeID", {
      is: (taxpayerIdTypeID: any) =>
        (taxpayerIdTypeID != 1 && taxpayerIdTypeID != 7 && taxpayerIdTypeID != 8 && taxpayerIdTypeID != 0),
      then: () => Yup.string().required("Please Enter TIN name")
    }),
    // .min(3, "First Name should be minimum of 3 characters")
    // .max(50, "First Name should be maximum of 50 characters"),
    lastName: Yup.string().trim()
      .required("Please Enter Last Name"),
    // .min(3, "Last Name should be minimum of 3 characters")
    // .max(50, "Last Name should be maximum of 50 characters"),
    uniqueIdentifier: Yup.string()
    .required("Please Enter unique Identifier")
    .matches(/^[0-9]+$/, "Unique Identifier must be a number") // Ensures only numbers are allowed
    .test(
      'len',
      'Unique Identifier must be exactly 10 digits',
      (val) => !!val && val.length === 10 // Check if val exists and has exactly 10 digits
    ),
  
    countryOfCitizenshipId: Cert==="SC" ? Yup.number() : Yup.number().when("isUSIndividual", {
      is: "no",
      then: () =>
        Yup.number()
          .required("Please select a country")
          .notOneOf([0], "Please select a valid country"),
    }),
    countryOfBirthId: Cert === "GEN" ? Yup.number() : Yup.number()
      .required("Please select a country")
      .notOneOf([0], "Please select a valid country"),

    cityOfBirth: Cert === "GEN"  ? Yup.string() : Yup.string().trim().required("Please Enter city of Birth"),

    taxpayerIdTypeID: Cert==="SC" ? Yup.number() : Yup.number().notOneOf([0], "Please select a valid option"),
    dob: Cert === "GEN" ? Yup.date().when("isUSIndividual", {
      is: "no",
      then: () => Yup.date().required("Please Enter DOB"),
    }) : Yup.date().required("Please Enter DOB"),


    vatId: Cert === "GEN" ? Yup.number().when("isUSIndividual", {
      is: 'no',
      then: () =>
        Yup.number()
          .required("Please select an option")
          .notOneOf([0], "Please select a valid option"),
    }) : Yup.number(),

vat:Cert === "GEN" ? Yup.string().when("vatId", {
  is: (vatId: any) =>
    (vatId != 0 && vatId != 2 ),
  then: () => Yup.string().required("Please Enter Vat Id")
}): Yup.string(),
    // incomeTypeId: income === true ? Yup.array().of(Yup.string())
    // .required("Please select an option")
    // .notOneOf(['0'], "Please select a valid option"):Yup.object(),

    // incomeTypeId: payment === true ? 
    // // Yup.object().shape({
  
    //    Yup.array().required("Please select an option")
    // // }) :
    // : 
   
    // //  Yup.array(),
    // incomeTypeId: payment === true ? Yup.array().length(1)
    //   //.required("Please select an option")
    //   //.notOneOf([0], "Please select a valid option") : Yup.number()
    //   :Yup.array(),

    permanentResidentialCountryId: Yup.number()
      .required("Please select country")
      .notOneOf([0], "Please select a valid country"),

    otherCountry: Yup.string().when("permanentResidentialCountryId", {
      is: (permanentResidentialCountryId: any) => permanentResidentialCountryId == 186,
      then: () =>
        Yup.string().required("Please Enter"),
    }),
    permanentResidentialStreetNumberandName: Yup.string().trim().required(
      "Please enter Street number and name"
    ),
    permanentResidentialCityorTown: Yup.string().trim().required(
      "Please enter City or Town"
    ),
    permanentResidentialZipPostalCode: Yup.string().trim().required(
      "Zip/Postal code is required"
    ),
    isAddressPostOfficeBox: Yup.string().when("isUSIndividual", {
      is: "no",
      then: () => Yup.string().required("Please select an option"),
    }),

    isCareOfAddress: Yup.string().when("isUSIndividual", {
      is: "no",
      then: () => Yup.string().required("Please select an option"),
    }),

    isAddressRuralRoute: Yup.string().when("permanentResidentialCountryId", {
      is: (permanentResidentialCountryId: any) => permanentResidentialCountryId == 45,
      then: () =>
        Yup.string().required("Please select an option"),
    }),

    isalternativebusinessaddress: Yup.string(),

    permanentResidentialCountryId1: Yup.number().when(
      "isalternativebusinessaddress",
      {
        is: "yes",
        then: () =>
          Yup.number()
            .required("Please select a country")
            .notOneOf([0], "Please select a valid country"),
      }
    ),
    permanentResidentialStreetNumberandName1: Yup.string().when(
      "isalternativebusinessaddress",
      {
        is: "yes",
        then: () =>
          Yup.string().required("Please enter street Number and Name"),
      }
    ),

    permanentResidentialCityorTown1: Yup.string().when(
      "isalternativebusinessaddress",
      {
        is: "yes",
        then: () => Yup.string().required("Please enter city or town"),
      }
    ),

    permanentResidentialZipPostalCode1: Yup.string().when(
      "isalternativebusinessaddress",
      {
        is: "yes",
        then: () => Yup.string().required("Zip/Postal code is required"),
      }
    ),

    contactFirstName: Yup.string()
      .required("Please enter First name")
      // .min(3, "First Name should be minimum of 3 characters")
      .max(50, "First Name should be maximum of 50 characters"),
    contactLastName: Yup.string()
      .required("Please enter Last name")
      // .min(3, "Last Name should be minimum of 3 characters")
      .max(50, "Last Name should be maximum of 50 characters"),
    contactEmail: Yup.string()
    .email('Invalid email address')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.uk|in)$/,
      'Invalid email address'
    )
    .required('Email is required'),

    paymentTypeId: payment === true && visiblePaymentTypes?.length>1 ? Yup.number()
      .required("Please select an option")
      .notOneOf([0], "Please select a valid option") : Yup.number(),

    accountHolderName: Yup.string().when("paymentTypeId", {
      is: (paymentTypeId: any) => paymentTypeId === 1 || paymentTypeId === 2,
      then: () =>
        Yup.string().trim().nullable()
          // .notOneOf(["", ""], "Please enter Account holder Name")
          .required("Please enter Account holder Name")
    }),

    accountBankName: Yup.string().when("paymentTypeId", {
      is: (paymentTypeId: any) => paymentTypeId === 1 || paymentTypeId === 2,
      then: () =>
        Yup.string()
          .required("Please enter Bank Name")
          .max(50, "Bank Name should be maximum of 50 characters"),
    }),

    accountBankBranchLocationId: Yup.number().when("paymentTypeId", {
      is: (paymentTypeId: any) => paymentTypeId === 1 || paymentTypeId === 2,
      then: () =>
        Yup.number()
          .required("Please select branch location")
          .notOneOf([0], "Please select a Branch Location"),
    }),

    accountNumber: Yup.string().when("paymentTypeId", {
      is: (paymentTypeId: any) => paymentTypeId === 1 || paymentTypeId === 2,
      then: () =>
        Yup.string()
          // .matches(/^\d{10}$/, "Account number must be exactly 10 digits")
          .required("Account Number is required"),
    }),

    bankCode: Yup.string().when(["paymentTypeId", "accountBankBranchLocationId"], {
      is: (paymentTypeId: any, accountBankBranchLocationId: any) =>
        (paymentTypeId == 1) && accountBankBranchLocationId == 0,
      then: () =>
        Yup.string()
          .required("Please enter Bank code")
      // .min(5, "Bank code should be minimum of 5 characters"),
    }),

    sortCode: Yup.string().when(["paymentTypeId", "accountBankBranchLocationId"], {
      is: (paymentTypeId: any, accountBankBranchLocationId: any) =>
        (paymentTypeId == 1) && accountBankBranchLocationId == 257,
      then: () => Yup.string().required("Please enter sort code")
      // .min(10, "sort code should be minimum of 10 characters"),
    }),

    abaRouting: Yup.string().when(["paymentTypeId", "accountBankBranchLocationId"], {
      is: (paymentTypeId: any, accountBankBranchLocationId: any) =>
        (paymentTypeId == 1 || paymentTypeId == 2) && accountBankBranchLocationId == 258,
      then: () => Yup.string().required("Please enter ABA/Routing"),
    }),

    payResidentalCountryId: Yup.number().when("paymentTypeId", {
      is: 3,
      then: () =>
        Yup.number()
          .required("Please select country")
          .notOneOf([0], "Please select a Branch Location"),
    }),
    makePayable: Yup.string().when("paymentTypeId", {
      is: 3,
      then: () =>
        Yup.string()
          .required("Please enter payable name")
    }),

    payStreetNumberAndName: Yup.string().when("paymentTypeId", {
      is: 3,
      then: () => Yup.string().required("Please enter street no. and name"),
    }),

    payCityorTown: Yup.string().when("paymentTypeId", {
      is: 3,
      then: () => Yup.string().required("Please enter city or town"),
    }),

    payStateOrProvince: Yup.string().when("paymentTypeId", {
      is: 3,
      then: () => Yup.string().required("Please enter state or province"),
    }),
    isCorrectPaymentPurposes2:Yup.boolean().when("paymentTypeId", {
      is: 3,
      then: () => Yup.boolean().required("Please Confirm payment purposes.").oneOf([true], "Please Confirm payment purposes."),
    }),
    payZipPostalCode: Yup.string().when("paymentTypeId", {
      is: 3,
      then: () => Yup.string().required("Please enter zip or postal code"),
    }),

    bsb: Yup.string().when("accountBankBranchLocationId", {
      is: (accountBankBranchLocationId: any) =>
        accountBankBranchLocationId == 16,
      then: () => Yup.string().required("BSB is required"),
    }),
    isConfirmed: Yup.boolean()
      .required("The terms and conditions must be accepted.")
      .oneOf([true], "The terms and conditions must be accepted.")
  });
};
