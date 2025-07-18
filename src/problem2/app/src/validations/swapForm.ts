import * as yup from "yup";

export const swapFormValidationSchema = yup.object({
  rate: yup.string().required("Currency is required"),
  amount: yup
    .number()
    .min(1, "Amount should be of minimum 1 characters length")
    .required("Amount is required"),
});
