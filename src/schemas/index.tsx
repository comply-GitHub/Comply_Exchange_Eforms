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

    // businessName: Yup.string()
    //   .required("Please Enter business Name"),
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
    isExemptionFATCAReportings: Yup.boolean().required(
      "Please select one of the options"
    ),
    ReportingId: Yup.string().when('isExemptionFATCAReportings', {
      is: (value: any) => value === 'Yes',
      then: () =>
        Yup.string()
          .required("Please select options"),
    }),
  });
};
export const tinSchema = () => {
  return Yup.object().shape({
    taxpayerIdTypeID: Yup.number().notOneOf([0], "This Field is Required.")
      .required("This Field is Required.")
      .notOneOf([0], "Required Field"),
    Tin: Yup.string().when("taxpayerIdTypeID", {
      is: (taxpayerIdTypeID: any) =>
        (taxpayerIdTypeID != 1 && taxpayerIdTypeID != 7 && taxpayerIdTypeID != 8),
      then: () => Yup.string().required("Please enter TIN ")
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
