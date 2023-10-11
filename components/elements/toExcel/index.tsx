import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
export const ExportToExcel: React.FC<any> = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV: any = (apiData: any, fileName: any) => {
    // const newData

    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant="contained"
      color="info"
      startIcon={<DownloadIcon />}
      onClick={(e) => exportToCSV(apiData, fileName)}
    >
      Export to excel
    </Button>
  );
};
