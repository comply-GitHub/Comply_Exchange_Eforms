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

export const SubmitSchemaForm8233 = () => {
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
  