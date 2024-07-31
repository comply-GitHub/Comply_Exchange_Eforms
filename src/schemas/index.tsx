import * as Yup from "yup";

export const firstSchema = () => {
  return Yup.object().shape({
    federalTaxClassificationId: Yup.number()
      .required("This Field is Required.")
      .notOneOf([0], "Required Field"),
  });
};
export const firstStepSchema = () => {
  return Yup.object().shape({
    federalTaxClassificationId: Yup.number()
      .required("This Field is Required.")
      .notOneOf([0], "Please select "),
    firstName: Yup.string()
      .required("Please Enter First Name"),
    lastName: Yup.string()
      .required("Please Enter Last Name"),
  });
};

export const firstStepBusinessSchema = () => {
  return Yup.object().shape({
    federalTaxClassificationId: Yup.number()
      .required("This Field is Required.")
      .notOneOf([0], "Please select"),
    firstName: Yup.string()
      .required("Please Enter First Name"),
    // .min(3, "First Name should be minimum of 3 characters")
    // .max(50, "First Nameould be maximum of 250 characters"),
    lastName: Yup.string()
      .required("Please Enter Last Name"),
    // .min(3, "Last Name should be minimum of 3 characters")
    // .max(50, "Last Nameould be maximum of 250 characters"),

    businessName: Yup.string().when("federalTaxClassificationId", {
      is: (value: any) => value > 1,
      then: () =>
        Yup.string(),
    }),


    // .min(3, "business Name should be minimum of 3 characters")
    // .max(50, "business Name should be maximum of 250 characters"),
  });
};

export const secondStepSchema = () => {
  return Yup.object().shape({
    // isExemptionfromBackup: Yup.string()
    // .required("Please select one of the options"),
    isExemptionfromBackup: Yup.string().required(
      "Please select one of the options"
    ),
  });
};

export const fctaSchema = () => {
  return Yup.object().shape({
    isExemptionFATCAReportings: Yup.string().required(
      "Please select one of the options"
    ),
    fatcaReportingId: Yup.number().when('isExemptionFATCAReportings', {
      is: "Yes",
      then: () =>
        Yup.number().notOneOf([0], "Please select options")

    }),
  });
};
export const tinSchema = () => {
  return Yup.object().shape({
    taxpayerIdTypeID: Yup.number().notOneOf([0], "This Field is Required.")
      .required("This Field is Required.")
      .notOneOf([0], "Required Field"),
    tIN_USTIN: Yup.string().when("taxpayerIdTypeID", {
      is: (taxpayerIdTypeID: any) =>
        (taxpayerIdTypeID != 1 || taxpayerIdTypeID != 7 ||taxpayerIdTypeID != 8),
      then: () => Yup.string().required("Please enter TIN ")
    }),
  });

};

export const TinSchema_W9_DC = () => {
  return Yup.object().shape({

    entityWithMultipleTaxJurisdictions: Yup.string().required("Please select one of the options"),

  });

};

export const TinSchema_DualCert = () => {
  return Yup.object().shape({

    additionalTaxJurisdictions: Yup.string().required("Please select one of the options"),
    // additionalTaxJurisdictions: Yup.string().notOneOf([""]).when(
    //   'entityWithMultipleTaxJurisdictions', {
    //     is: (entityWithMultipleTaxJurisdictions: any,) => 
    //        entityWithMultipleTaxJurisdictions === "Yes",then:()=> Yup.string().notOneOf([""]).required("Please select one of the options"),
    //   }),

    isTinAvailable: Yup.boolean().when("entityWithMultipleTaxJurisdictions", {
      is: (entityWithMultipleTaxJurisdictions: any) => entityWithMultipleTaxJurisdictions === "Yes", then: () => Yup.boolean()
    }),
    countryId: Yup.number().notOneOf([0]).when("entityWithMultipleTaxJurisdictions", {
      is: (entityWithMultipleTaxJurisdictions: any) => entityWithMultipleTaxJurisdictions == "Yes", then: () => Yup.number().notOneOf([0]).required("Please Select one option")
    }),
    tinNumber: Yup.string().notOneOf([""]).when("entityWithMultipleTaxJurisdictions", {
      is: (entityWithMultipleTaxJurisdictions: any) => entityWithMultipleTaxJurisdictions == "Yes", then: () => Yup.string().notOneOf([""]).required("Please Enter TIN Number")
    }),
    notAvailableReason: Yup.string().when("isTinAvailable", {
      is: true,
      then: () =>
        Yup.string()
          .required("Please enter why tin is not available"),
    }),
  });

};

export const securitySchema = () => {
  return Yup.object().shape({
    securityQuestionId: Yup.number()
      .required("Please select one of the options")
      .notOneOf([0], "Please select one of the options"),
    securityAnswer: Yup.string().trim().notOneOf(["", undefined], "Please enter security word."),
  });
};
