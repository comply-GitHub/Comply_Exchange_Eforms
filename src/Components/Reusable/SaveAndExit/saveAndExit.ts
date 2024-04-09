import { isParenthesizedExpression } from "@babel/types";
import * as Yup from "yup";



export const SaveAndExitSchema = () => {
  return Yup.object().shape({
    email: Yup.string().trim().notOneOf([""],"Field Cannot be Empty"),
    password: Yup.string().trim().notOneOf([""],"Please enter password"),
    confirmPassword:  Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
  });
};  