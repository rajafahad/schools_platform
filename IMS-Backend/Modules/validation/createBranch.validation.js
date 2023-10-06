const Yup = require("yup");

const createBranchValidation = Yup.object().shape({
  schoolName: Yup.string().required("School name is required"),
  branchName: Yup.string().required("Branch name is required"),
  schoolLevel: Yup.string().required("Select Level is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  contactNumber: Yup.number()
    .required("Contact number is required")
    .min(10, "Contact number must be 10 digits")
    .typeError("Contact number must be a valid number."),
  whatsapp: Yup.number()
    .required("WhatsApp number is required")
    .min(10, "Whatsapp number must be 10 digits")
    .typeError("Whatsapp number must be a valid number."),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

module.exports = createBranchValidation;
