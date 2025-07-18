import { useContext } from "react";
import { useFormikContext } from "formik";

import styles from "./SwapForm.module.css";
import { BaseSelect } from "../BaseSelect/BaseSelect";
import { SelectChangeEvent } from "@mui/material";
import { NumberFormat } from "../NumberFormat/NumberFormat";
import { useTokens } from "@app/hooks/useTokens";
import { SwapFormType } from "@app/types/swapForm.type";
import { SwapTokenContext } from "@app/contexts/swapToken.context";

export const SwapForm = () => {
  const tokens = useTokens();
  const { isSending, setExchangeRate } = useContext(SwapTokenContext);
  const { errors, values, handleBlur, setFieldValue } =
    useFormikContext<SwapFormType>();

  // onFieldChange for multiple usages
  const onFieldChange =
    (field: string, value?: string | number) => (val?: string | number) => {
      setFieldValue(field, val || value);
    };

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    setFieldValue("rate", e.target.value);
    onFieldChange("rate", e.target.value);
    setExchangeRate(null);
  };

  return (
    <div className={styles.formWrapper}>
      <BaseSelect
        data={tokens.map((tokens) => ({
          label: tokens.currency,
          value: tokens.price,
          icon: tokens.currency,
        }))}
        label="Currency"
        id="rate"
        labelId="curreny-label"
        value={values.rate}
        onChange={handleSelectChange}
        onBlur={handleBlur}
        error={!!errors.rate}
        errorMsg={errors.rate || ""}
      />

      <NumberFormat
        label={`Amount to ${isSending ? "send" : "receive"}`}
        value={values.amount}
        outputFormatType="floatValue"
        onChange={onFieldChange("amount")}
        onBlur={handleBlur}
        errorMsg={errors.amount}
      />
    </div>
  );
};
