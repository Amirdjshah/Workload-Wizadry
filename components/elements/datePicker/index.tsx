import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface IProps {
  onChangeDate: (date: any, val: any) => void;
  value: string | null;
  error: boolean | undefined;
  helperText: any;
}

const BasicDatePicker: React.FC<IProps> = ({
  onChangeDate,
  value,
  error,
  helperText,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={["year"]}
        label="Select Year *"
        value={value}
        onChange={onChangeDate}
        disablePast
        onError={(error) => {
          console.log("ERR", error);
        }}
        slotProps={{
          textField: {
            helperText: helperText,
          },
        }}
      />
    </LocalizationProvider>
  );
};
export { BasicDatePicker };
