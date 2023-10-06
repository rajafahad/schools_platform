import * as Yup from "yup";

const adminInfoValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  institutionName: Yup.string().required("Institution name is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .min(10,"Contact number must be 10 digits"),
  whatsapp: Yup.string().required("Whatsapp number is required").min(10, "WhatsApp number must be 10 digits"),
  role: Yup.string().required("Role is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  address: Yup.string().required("Address is required"),
});

export default adminInfoValidationSchema;
