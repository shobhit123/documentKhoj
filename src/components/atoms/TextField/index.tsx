import React from "react";
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from "@mui/material";
import styles from './textfield.module.scss';

type CustomTextFieldProps = MUITextFieldProps & {
    label?: string;
    placeholder?: string;
};

const TextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  variant = "outlined",
  size = "medium",
  ...props
}) => {
  return (
    <MUITextField
      className={styles['custom-textfield']}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      variant={variant}
      size={size}
      {...props}
    />
  );
};

export default TextField;