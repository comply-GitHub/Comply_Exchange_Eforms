import * as Yup from "yup";

export const SubmitSchema = () => {
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
};