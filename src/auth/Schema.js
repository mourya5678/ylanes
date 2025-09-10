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
    full_name: Yup.string().trim().required("Please enter profile name")
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

export const CreateRoomSchema = Yup.object().shape({
    topic: Yup.string().trim().required("Please select a topic"),
    room_type: Yup.string().trim().required("Please select a room type"),
    date_time: Yup.string().trim().required("Please select date and time"),
    your_take: Yup.string().trim().min(50, "Your take must be at least 50 characters").max(300, "Your take must not exceed 300 characters").required("Please enter your take"),
    // add_resources:
});