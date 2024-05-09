import * as yup from "yup";
import { signUpFormValidationMessages, signUpFormValidationRegex } from "../constants/SignUp.constant";

const signUpFormValidationSchema = yup.object({
    firstName: yup
        .string()
        .min(2, signUpFormValidationMessages.firstNameMinMax)
        .max(30, signUpFormValidationMessages.firstNameMinMax)
        .matches(
            signUpFormValidationRegex.onlyCharacters,
            signUpFormValidationMessages.firstNameInvalid
        )
        .required(signUpFormValidationMessages.required),
    lastName: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .min(2, signUpFormValidationMessages.lastNameMinMax)
        .max(30, signUpFormValidationMessages.lastNameMinMax)
        .matches(
            signUpFormValidationRegex.onlyCharacters,
            signUpFormValidationMessages.lastNameInvalid),

    phoneNumber: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(
            signUpFormValidationRegex.phoneNumberPattern,
            signUpFormValidationMessages.phoneNumberInvalid)
        .matches(
            signUpFormValidationRegex.onlyNumbers,
            signUpFormValidationMessages.phoneNumberMinMax),
    email: yup
        .string()
        .matches(
            signUpFormValidationRegex.emailPattern,
            signUpFormValidationMessages.emailInvalid)
        .required(signUpFormValidationMessages.required),
    passwordHash: yup
        .string()
        .min(8, signUpFormValidationMessages.passwordMinMax)
        .max(25, signUpFormValidationMessages.passwordMinMax)
        .matches(
            signUpFormValidationRegex.passwordPattern,
            signUpFormValidationMessages.passwordInvalid)
        .required(signUpFormValidationMessages.required),
    confirmPassword: yup
        .string()
        .test('passwords-match', signUpFormValidationMessages.confirmPasswordInvalid, function (value) {
            return this.parent.passwordHash === value;
        })
        .required(signUpFormValidationMessages.required)

});


export { signUpFormValidationSchema };
