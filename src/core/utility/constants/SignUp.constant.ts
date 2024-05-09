const signUpFormValidationMessages = {
  required: "This field is Required",
  firstNameInvalid: "Please enter a valid First Name",
  firstNameMinMax: "First name must be between 2-30 characters",
  lastNameInvalid: "Please enter a valid Last Name",
  lastNameMinMax: "Last name must be between 2-30 characters",
  emailMinMax: "Email ID must be between 1-50 characters",
  emailInvalid: "Please enter valid Email Id",
  passwordMinMax: "Password must be between 8-25 characters",
  passwordInvalid: "At least 1 uppercase alphabet, 1 lowercase alphabet, 1 Special Character (@$!_&*#) and 1 numeric value required",
  confirmPasswordInvalid: "Password does not match",
  phoneNumberMinMax: "10-digit number is required",
  phoneNumberInvalid: "Please enter a numeric value only"
};

const signUpFormValidationRegex = {
  onlyCharacters: /^[a-zA-Z]+$/,
  onlyNumbers: /^\d{10}$/,
  onlyStringWithSpace: /^[A-Za-z(,.')?\s-]*$/,
  passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!_&*#])(?=.*\d)[a-zA-Z\d@$!_&*#]{8,}$/,
  emailPattern:
    /^(?=.{1,50}$)^[a-zA-Z0-9]+(\.?[a-zA-Z0-9])*@[a-zA-Z0-9]+\.([a-zA-Z]{2,3}|[a-zA-Z]{2}\.[a-zA-Z]{2,3})$/,
  phoneNumberPattern:
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
};

const signUpInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  passwordHash: "",
  confirmPassword: ""
};

const signUpFormConstants = {
  successToaster: "Your Request has been submitted. Please wait until the admin approves your request"
}
export {
  signUpFormValidationMessages,
  signUpFormValidationRegex,
  signUpInitialValues,
  signUpFormConstants
};
