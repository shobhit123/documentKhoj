import React from "react";
import { Button as MUIButton } from "@mui/material";
import styles from  './button.module.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
  disable?: boolean;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "contained",
  disable = false,
  onClick,
  size,
  startIcon,
  endIcon,
  children,
  style
}) => {
  return (
    <MUIButton
      variant={variant}
      disabled={disable}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      className={`${styles.button} ${disable ? styles.active : ''}`}
      style={style}
    >
      {label || children}
    </MUIButton>
  );
};

export default Button;
