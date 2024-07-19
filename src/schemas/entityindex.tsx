import * as Yup from "yup";
import { isAlphaNumeric } from "../Helpers/convertToFormData";

export const EntitySchema = (Cert: string, payment: boolean, income: boolean, isGiinEnabled: boolean) => {
  return Yup.object().shape({
    //   firstName: Yup.string()
    //     .required('Please Enter First Name')
    //     .min(3, 'First Name should be minimum of 3 characters')
    //     .max(50, 'First Name should be maximum of 50 characters'),
    isUSEntity: Yup.string(),
    entityName: Yup.string().trim().required("Please Enter Entity name"),
    usTin: Cert === "SC" ? Yup.string() : Yup.string().when("taxpayerIdTypeID", {
      is: (taxpayerIdTypeID: any) =>
        (taxpayerIdTypeID !== 1 && taxpayerIdTypeID !== 7 && taxpayerIdTypeID !== 8),
      then: () => Yup.string()
        .required("Please Enter TIN name")
    }),
    taxpayerIdTypeID: Cert === "SC" ? Yup.number() : Yup.number().notOneOf([0], "Please select a valid option"),
    uniqueIdentifier: Yup.string()
      .required("Please Enter unique Identifier")
      // .min(3, "Too short")
      .max(50, "Too long"),
    vatId: Cert === "SC" ? Yup.number() : Cert === "GEN" ? Yup.number().when("isUSIndividual", {
      is: 'no',
      then: () =>
        Yup.number()
          .required("Please select an option")
          .notOneOf([0], "Please select a valid option"),
    }) : Yup.number(),

    vat: Cert === "GEN" ? Yup.string().when("vatId", {
      is: (vatId: any) =>
        (vatId != 0 && vatId != 2),
      then: () => Yup.string().required("Please Enter Vat Id")
    }) : Yup.string(),
    giinId: Yup.string().nullable()
      .test(
        {
          name: "Uppercase",
          message: "GIIN is required and must be all uppercase",
          test: (value, context) => {

            const { isUSEntity } = context.parent;

            if (isGiinEnabled && isUSEntity === "no") {
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
          const { isUSEntity } = context.parent;
          if (isGiinEnabled && isUSEntity === "no") {
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
          const { isUSEntity } = context.parent;

          if (isGiinEnabled && isUSEntity === "no") {
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

    // countryOfCitizenshipId: Yup.number()
    // .required('Please select a country'),
    // dob: Yup.date()
    // .required('Please Enter DOB'),
    // nameOfDisregarded: Yup.string()
    // .required('Please Enter Entity name')
    // .min(3, 'Entity name should be minimum of 3 characters')
    // .max(50, 'Entity name should be maximum of 50 characters'),
    permanentResidentialStreetNumberandName: Yup.string().required(
      "Please enter Street number and name"
    ),
    permanentResidentialCityorTown: Yup.string().required(
      "Please enter City or Town"
    ),
    permanentResidentialZipPostalCode: Yup.string().required(
      "Zip/Postal code is required"
    ),
    permanentResidentialCountryId: Yup.number()
      .required("Please select a country")
      .notOneOf([0], "Please select a valid country"),
    otherCountry: Yup.string().when("permanentResidentialCountryId", {
      is: (permanentResidentialCountryId: any) => permanentResidentialCountryId == 186,
      then: () =>
        Yup.string().required("Please Enter"),
    }),



    isAddressPostOfficeBox: Yup.string().when("isUSEntity", {
      is: "no",
      then: () => Yup.string().required("Please select an option"),
    }),

    isCareOfAddress: Yup.string().when("isUSEntity", {
      is: "no",
      then: () => Yup.string().required("Please select an option"),
    }),

    isAddressRuralRoute: Yup.string().when("permanentResidentialCountryId", {
      is: (permanentResidentialCountryId: any) =>
        permanentResidentialCountryId == 45,
      then: () => Yup.string().required("Please select an option"),
    }),

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
    paymentTypeId: payment === true ? Yup.number()
      .required("Please select an option")
      .notOneOf([0], "Please select a valid option") : Yup.number(),
    accountHolderName: Yup.string().when("paymentTypeId", {
      is: (paymentTypeId: any) => paymentTypeId === 1 || paymentTypeId === 2,
      then: () =>
        Yup.string().trim()
          .notOneOf(["", ""], "Please enter Account holder Name")
          .required("Please enter Account Holder Name")

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
          .matches(/^\d{10}$/, "Account number must be exactly 10 digits")
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

    sortCode: Yup.string().when(
      ["paymentTypeId", "accountBankBranchLocationId"],
      {
        is: (paymentTypeId: any, accountBankBranchLocationId: any) =>
          paymentTypeId == 1 && accountBankBranchLocationId == 257,
        then: () =>
          Yup.string()
            .required("Please enter sort code")
        // .min(10, "sort code should be minimum of 10 characters"),
      }
    ),

    abaRouting: Yup.string().when(
      ["paymentTypeId", "accountBankBranchLocationId"],
      {
        is: (paymentTypeId: any, accountBankBranchLocationId: any) =>
          (paymentTypeId == 1 || paymentTypeId == 2) &&
          accountBankBranchLocationId == 258,
        then: () => Yup.string().required("Please enter ABA/Routing"),
      }
    ),
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
          // .min(3, "Name should be minimum of 3 characters")
          .max(50, "Name should be maximum of 50 characters"),
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

    payZipPostalCode: Yup.string().when("paymentTypeId", {
      is: 3,
      then: () => Yup.string().required("Please enter zip or postal code"),
    }),
    isCorrectPaymentPurposes: Yup.string()
      .when("paymentTypeId", {
        is: 3,
        then: () => Yup.string().required("Verify please"),
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
