import React from "react";
import { TextFieldProps } from "@mui/material";
import MTextField from "@mui/material/TextField";

type IProps = TextFieldProps;

const TextField: React.FC<IProps> = (props) => {
  return <MTextField variant="outlined" {...props} />;
};

export { TextField };
