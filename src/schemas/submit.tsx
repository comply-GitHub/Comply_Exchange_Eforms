import * as Yup from "yup";

export const SubmitSchema = () => {
  return Yup.object().shape({
    IsConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { IsNotConsentReceipentstatement } = this.parent;
        return (value && !IsNotConsentReceipentstatement) || (!value && IsNotConsentReceipentstatement);
      }
    ),

    IsNotConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { IsConsentReceipentstatement } = this.parent;
        return (value && !IsConsentReceipentstatement) || (!value && IsConsentReceipentstatement);
      }
    ),
    IsAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      "Please mark the checkbox"
    )
  });
};



export const SelfCertSchema_DC = () => {
  return Yup.object().shape({
    USSpecifiedPerson:Yup.string().required("Field cannot be empty") ,
    FatcaExemption:Yup.number().when(["USSpecifiedPerson"],{
      is: (USSpecifiedPerson: any) =>"No".includes(USSpecifiedPerson),
      then: () => Yup.number().notOneOf([0 ,undefined,null],"Please Select one of the options"),
     }),
  });
};

export const SubmitSchema_BEN = () => {
return Yup.object().shape({
  isSubmit: Yup.boolean().test(
    'is-exclusive',
    '',
    function (value) {
      const { IsSubmit_not } = this.parent;
      return (value && !IsSubmit_not) || (!value && IsSubmit_not);
    }
  ),

  IsSubmit_not: Yup.boolean().test(
    'is-exclusive',
    '',
    function (value) {
      const { isSubmit } = this.parent;
      return (value && !isSubmit) || (!value && isSubmit);
    }
  ),
  declaration: Yup.boolean().oneOf(
    [true],
    "Please mark the checkbox"
  )
});
}