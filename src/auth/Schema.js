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
    email: Yup.string()
        .email("Please enter valid email")
        .required("Please enter email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter valid email"
        ),
    full_name: Yup.string().trim().required("Please enter profile name"),
    bio: Yup.string()
        .trim()
        .required("Please enter bio")
        .min(50, "Bio must be at least 50 characters")
        .max(2000, "Bio cannot exceed 2000 characters"),
    about_us: Yup.string()
        .trim()
        .required("Please enter About")
        .max(100, "About cannot exceed 100 characters"),
});

export const CreatePollSchema = Yup.object().shape({
    question: Yup.string().trim().required("Please enter question"),
    option1: Yup.string().trim().required("Please enter option1"),
    option2: Yup.string().trim().required("Please enter option2"),
    topic: Yup.string().trim().required("Please select topic"),
    durationHours: Yup.string()
        .required("Please select hours")
        .test("hours-check", "Hours cannot be 00 if minutes is 00", function (value) {
            const { durationMinuts } = this.parent;
            return !(value === "00" && durationMinuts === "00");
        }),
    durationMinuts: Yup.string()
        .required("Please select minutes")
        .test("minutes-check", "Minutes cannot be 00 if hours is 00", function (value) {
            const { durationHours } = this.parent;
            return !(value === "00" && durationHours === "00");
        }),
});

export const onBoardingUserSchema = Yup.object().shape({
    profile_image: Yup.mixed().required("Please upload a profile image"),
    profile_name: Yup.string().trim().required("Please enter profile name"),
    year_of_birth: Yup.string().trim().required("Please select year of birth"),
    gender: Yup.string().required("Please select gender").oneOf(["men"], 'Only "men" is allowed'),
});