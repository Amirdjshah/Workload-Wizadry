import { Chip, createTheme } from "@mui/material";
import React from "react";

interface Options {
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}
interface IProps {
  options: Options;
  className?: string;
  onClick?: () => void;
}

const overrides = createTheme({
  components: {
    MuiChip: {
      variants: [
        {
          props: { color: "primary" },
          style: {
            backgroundColor: "#008eaa",
          },
        },
        {
          props: { color: "success" },
          style: {
            backgroundColor: "#1BCD58",
          },
        },
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: "#E5EA02",
            color: "black",
          },
        },
      ],
    },
  },
});

const StatusPill: React.FC<IProps> = ({ options, className, onClick }) => {
  return (
    <Chip
      label={options.label}
      onClick={onClick}
      className={className}
      color={options.color}
      variant="filled"
      size="small"
    />
  );
};
export { StatusPill };
