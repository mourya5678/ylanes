import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
            "Please enter a valid email address"
        )
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