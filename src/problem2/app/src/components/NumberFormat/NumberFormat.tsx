import { type NumberFormatValues, NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

type NumberFormatProps = {
  id?: string;
  label: string;
  value?: string | number;
  outputFormatType?: keyof NumberFormatValues;
  errorMsg?: string;
  onChange: (formattedValue: string | number) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const NumberFormat = ({
  id = "number-format",
  label,
  value,
  outputFormatType = "value",
  onChange,
  onBlur,
  errorMsg = "",
}: NumberFormatProps) => {
  const handleChange = (formattedValue: string | number) => {
    onChange(formattedValue);
  };

  return (
    <NumericFormat
      customInput={TextField}
      thousandSeparator
      valueIsNumericString
      fullWidth
      id={id}
      name={id}
      label={label}
      value={value}
      onValueChange={(values) => {
        handleChange(values[outputFormatType as keyof NumberFormatValues] || 0);
      }}
      onBlur={onBlur}
      error={!!errorMsg}
      helperText={errorMsg}
    />
  );
};
