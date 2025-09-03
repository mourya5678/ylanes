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

export const CreatePostSchema = Yup.object().shape({
    title: Yup.string().trim().required("Please enter title"),
    topic: Yup.string().trim().required("Please select topic")
});

export const UpdateProfileSchema = Yup.object().shape({

});