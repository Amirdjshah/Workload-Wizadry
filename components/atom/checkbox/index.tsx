import { FormControlLabel, FormControlProps, Typography } from "@mui/material";
import MCheckbox, { CheckboxProps } from "@mui/material/Checkbox";

type ICheckbox = {
  checkboxProps?: CheckboxProps;
  label: string;
};

export const Checkbox: React.FC<ICheckbox> = ({
  label,
  checkboxProps,
  ...props
}) => (
  <FormControlLabel
    label={<Typography fontWeight={400}>{label}</Typography>}
    control={<MCheckbox {...checkboxProps} />}
    {...props}
  />
);
