import * as Yup from "yup";

export const SubmitSchema = () => {
  return Yup.object().shape({
    isAgreeWithDeclaration: Yup.boolean().oneOf(
      [true],
      ""
    ),

    isConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { isNotConsentReceipentstatement } = this.parent;
        return (value && !isNotConsentReceipentstatement) || (!value && isNotConsentReceipentstatement);
      }
    ),

    isNotConsentReceipentstatement: Yup.boolean().test(
      'is-exclusive',
      '',
      function (value) {
        const { isConsentReceipentstatement } = this.parent;
        return (value && !isConsentReceipentstatement) || (!value && isConsentReceipentstatement);
      }
    ),
  });
};