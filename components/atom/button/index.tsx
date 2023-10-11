import React from "react";
import MButton, { ButtonProps as MButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { PRIMARY_COLOR } from "@config/cssVariables";

interface ButtonProps extends MButtonProps {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  isLoading = false,
  ...props
}) => {
  return (
    <MButton variant={variant} {...props}>
      {children}
    </MButton>
  );
};

export { Button };
