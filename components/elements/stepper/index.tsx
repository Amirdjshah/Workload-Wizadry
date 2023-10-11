import * as React from "react";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import styles from "./style.module.scss";

const steps = [
  {
    label: "Basic Details",
  },
  {
    label: "EF CF",
  },
  {
    label: "Staffing Allowance",
  },
  {
    label: "Unit Management",
  },
  {
    label: "Overall Details",
  },
  {
    label: "Summary",
  },
];

type status =
  | "Dispatched"
  | "Progress"
  | "Preparing"
  | "Shipped"
  | "Delivered"
  | "Invoiced";
interface IProps {
  step: status;
}

const Status = {
  Dispatched: 0,
  Progress: 1,
  Preparing: 2,
  Shipped: 3,
  Delivered: 4,
  Invoiced: 5,
};

const Stepper: React.FC<IProps> = ({ step }) => {
  return (
    <Box>
      <MuiStepper activeStep={Status[step]} orientation="horizontal">
        {steps.map((step, index) => (
          <Step key={step.label} className={styles.stepper}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};

export { Stepper };

