import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const LoginSchema = Yup.object().shape({
    phone_number: Yup.string()
        .required("Please enter phone number")
        .test("is-valid-phone", "Please enter valid phone number", (value) =>
            isValidPhoneNumber(value || "")
        ),
    isAgree: Yup.boolean()
        .oneOf([true], "You must accept the Terms and Conditions")
});