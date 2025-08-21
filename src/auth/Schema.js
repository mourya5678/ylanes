import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter a valid email address"
        ),
    password: Yup.string()
        .required("Please enter password")
        .min(8, "Password cannot be less then 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
            "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
        ),
});

export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter a valid email address"
        ),
});

export const AddProductSchema = Yup.object().shape({
    product_name: Yup.string().trim().required("Product name is required"),
    product_category: Yup.string().trim().required("Category is required"),
    product_description: Yup.string().trim().required("Description is required"),
    base_price: Yup.number()
        .typeError("Base price must be a number")
        .required("Base price is required")
        .min(0, "Base price cannot be negative"),
    discount: Yup.string()
        .trim()
        .required("Discount is required")
        .test(
            "is-valid-percentage",
            "Discount must be a number between 0 and 100",
            (value) => {
                const number = parseFloat(value);
                return !isNaN(number) && number >= 0 && number <= 100;
            }
        ),
    stock: Yup.number()
        .typeError("Stock must be a number")
        .required("Stock is required")
        .min(1, "Stock cannot be negative or zero"),
    low_stock_alert: Yup.number()
        .typeError("Low stock alert must be a number")
        .required("Low stock alert is required")
        .min(0, "Low stock alert cannot be negative")
        .test(
            "less-than-stock",
            "Low stock alert must be less than stock quantity",
            function (value) {
                const { stock } = this.parent;
                return value < stock;
            }
        ),
    free_shipping: Yup.string().required("Free shipping field is required"),
    shipping_charges: Yup.number()
        .typeError("Shipping charge must be a number")
        .min(0, "Shipping charge must be 0 or more")
        .when("free_shipping", {
            is: (val) => val === "false",
            then: (schema) => schema.required("Shipping charge are required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    product_image: Yup.array()
        .min(1, "At least one product image is required")
        .max(5, "You can only upload up to 5 images")
        .of(
            Yup.mixed()
                .test(
                    "fileType",
                    "Unsupported file format",
                    (file) =>
                        !file ||
                        ["image/jpeg", "image/png", "image/webp"].includes(file.type)
                )
                .test(
                    "fileSize",
                    "File size too large (max 5MB)",
                    (file) => !file || file.size <= 5 * 1024 * 1024
                )
        ),
});

export const UpdateProductSchema = Yup.object().shape({
    product_id: Yup.string().trim().required("Product Id is required"),
    product_category: Yup.string().trim().required("Category is required"),
    product_description: Yup.string().trim().required("Description is required"),
    base_price: Yup.number()
        .typeError("Base price must be a number")
        .required("Base price is required")
        .min(0, "Base price cannot be negative"),
    discount: Yup.string()
        .trim()
        .required("Discount is required")
        .test(
            "is-valid-percentage",
            "Discount must be a number between 0 and 100",
            (value) => {
                const number = parseFloat(value);
                return !isNaN(number) && number >= 0 && number <= 100;
            }
        ),
    stock: Yup.number()
        .typeError("Stock must be a number")
        .required("Stock is required")
        .min(0, "Stock cannot be negative"),
    low_stock_alert: Yup.number()
        .typeError("Low stock alert must be a number")
        .required("Low stock alert is required")
        .min(0, "Low stock alert cannot be negative")
        .test(
            "less-than-stock",
            "Low stock alert must be less than stock quantity",
            function (value) {
                const { stock } = this.parent;
                return value < stock;
            }
        ),
    free_shipping: Yup.string().required("Free shipping field is required"),
    shipping_charges: Yup.number()
        .typeError("Shipping charges must be a number")
        .min(0, "Shipping charges must be 0 or more")
        .when("free_shipping", {
            is: (val) => val === "false",
            then: (schema) => schema.required("Shipping charges are required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    product_image: Yup.array()
        .min(1, "At least one product image is required")
        .of(
            Yup.mixed()
                .test("fileType", "Unsupported file format", (file) =>
                    file
                        ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
                        : true
                )
                .test("fileSize", "File size too large (max 5MB)", (file) =>
                    file ? file.size <= 5 * 1024 * 1024 : true
                )
        ),
});

export const ChangePasswordSchema = Yup.object().shape({
    current_password: Yup.string()
        .required("Please enter current password")
        .min(8, "Password cannot be less then 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
            "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
        ),
    new_password: Yup.string()
        .required("Please enter new password")
        .min(8, "Password cannot be less then 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/,
            "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."
        ),
    confirm_password: Yup.string()
        .required("Please enter confirm new password")
        .oneOf([Yup.ref("new_password"), null], "password must match"),
});

export const UpdateProfileData = Yup.object().shape({
    full_name: Yup.string().trim().required("Please enter full name"),
    store_name: Yup.string().trim().required("Please enter store name"),
    bussiness_number: Yup.string()
        .required("Please enter business number")
        .test("is-valid-phone", "Please enter valid business number", (value) =>
            isValidPhoneNumber(value || "")
        ),
    // .matches(/^[0-9]+$/, "Bussiness phone number must be number")
    // .min(10, "Bussiness phone number cannot be less then 10 digits").max(10, "Bussiness phone number can not be more then 10 digits")
    // .required("Please enter bussiness phone number"),
});

export const ShopCustomizationSchema = Yup.object().shape({
    businessName: Yup.string().trim().required("Please enter business name"),
    businessEIN: Yup.string().trim().required("Please enter business EIN"),
    email: Yup.string()
        .email("Please enter valid email")
        .required("Please enter email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter valid email"
        ),
    businessAddress: Yup.string()
        .trim()
        .required("Please enter business address"),
    bussinessDescription: Yup.string()
        .trim()
        .required("Please enter business description"),
    yearExperince: Yup.number()
        .typeError("Year experience must be a number")
        .required("Please enter year experience")
        .moreThan(0, "Year experience must be greater than 0") // excludes 0 and 0.0
        .test(
            "max-1-decimal",
            "Only one decimal place is allowed",
            (value) =>
                value === undefined || /^\d+(\.\d{0,1})?$/.test(value.toString())
        ),
    businessWebsite: Yup.string()
        .trim()
        .required("Please enter business website url")
        .url("Please enter a valid business website URL"),
    noOfEmploys: Yup.number()
        .typeError("Number of employees must be a number")
        .required("Please enter number of employees")
        .min(1, "Number of employees cannot be negative"),
    phone: Yup.string()
        .required("Please enter phone number")
        .test("is-valid-phone", "Please enter valid phone number", (value) =>
            isValidPhoneNumber(value || "")
        ),
});

export const SupportDataSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter valid email")
        .required("Please enter email")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter valid email"
        ),
    phoneNumber: Yup.string()
        .optional()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .min(8, "Phone number must be at least 8 digits")
        .max(15, "Phone number must be at most 15 digits"),
    message: Yup.string().trim().required("Please enter message"),
});

export const ContactUsSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("Please enter first name"),
    lastName: Yup.string().trim().required("Please enter last name"),
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter a valid email address"
        ),
    phone_number: Yup.string()
        .required("Please enter phone number")
        .matches(/^\d+$/, "Phone number must contain only digits")
        .min(8, "Phone number must be at least 8 digits")
        .max(15, "Phone number must be at most 15 digits"),
    message: Yup.string().trim().required("Please enter message"),
});