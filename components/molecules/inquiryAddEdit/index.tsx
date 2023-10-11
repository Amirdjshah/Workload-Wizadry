import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AttachmentIcons from "@mui/icons-material/AttachmentOutlined";
import RemoveIcon from "@mui/icons-material/Delete";
import { Button, Checkbox, TextField } from "../../atom";
import { useFormik } from "formik";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Moment } from "moment";
import moment from "moment";
import { createNewPart } from "../../../lib/new_part";
import { AuthContext } from "../../context/authContext";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import * as yup from "yup";
import { imageToBase64 } from "../../utils";
import { InfoOutlined } from "@mui/icons-material";

interface IProps {
  id?: string;
}
const borderCard = {
  border: "1px solid lightgray",
  padding: "1rem",
  borderRadius: "5px",
};

const generatePartsObj = () => ({
  manufacturer: "",
  itemPn: "",
  description: "",
  quantity: "",
  uom: "",
});

const partSchema = yup.object({
  manufacturer: yup.string(),
  itemPn: yup.string(),
  description: yup.string(),
  quantity: yup.number().typeError("Invalid Quantity"),
  uom: yup.string(),
});

const validatedSchema = yup.object({
  manufacturer: yup.string(),
  itemPn: yup.string().required("Product Name is required"),
  description: yup.string(),
  quantity: yup.number().typeError("Invalid Quantity").required("Required"),
  uom: yup.string().required("UOM is required"),
});

const validationSchema = yup.object({
  date: yup.string().required("Date is required"),
  frequency: yup.string().required("Please select a checkbox"),
  parts: yup
    .array()
    .min(1)
    .of(
      partSchema.when([], (parts, schema) => {
        const anyFieldWithValue = parts.some(
          (part) =>
            part.manufacturer ||
            part.itemPn ||
            part.description ||
            part.quantity ||
            part.uom
        );

        return anyFieldWithValue ? validatedSchema : partSchema;
      })
    ),
});
const InquiryAddEdit: React.FC<IProps> = ({ id }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [fileName, setName] = useState("");
  const [isUploading, setUploading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const handleFileChange = async (event: any) => {
    let file;
    let mime;
    try {
      let a = await imageToBase64(event?.target?.files[0]);
      file = a.split(",")[1];
      mime = a.split(",")[0];
      setName(event?.target?.files[0]?.name);
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
    formik.setFieldValue("file", file);
  };

  const formik: any = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      date: "",
      frequency: "",
      comment: "",
      file: null,
      parts: [
        {
          ...generatePartsObj(),
        },
      ],
    },
    onSubmit: async (v) => {
      setUploading(true);
      const items: any = [];
      v?.parts?.forEach((i) => {
        if (
          !i.manufacturer &&
          !i.itemPn &&
          !i.description &&
          !i.quantity &&
          !i.uom
        )
          return;
        items.push({
          customer_id: user?.partner_id?.id,
          manufacturer: i.manufacturer,
          product_name: i.manufacturer,
          item_pn: i.itemPn,
          description: i.description,
          quantity: i.quantity,
          uom: i.uom,
        });
      });
      let required_date = null;
      if (moment(v.date).isValid()) {
        required_date = moment(v.date).format("YYYY-MM-DD");
      } else {
        required_date = moment().format("YYYY-MM-DD");
      }
      const obj = {
        customer_id: user?.partner_id?.id,
        required_date: required_date,
        often_purchase: v.frequency,
        file: v.file,
        items: items,
        comment: v.comment,
      };
      const response = await createNewPart(obj);
      if (response) {
        enqueueSnackbar({
          message: "Part Requested Successfully",
          variant: "success",
          className: "success-snackbar",
        });
        router.push("/request-new-part");
      }
      setUploading(false);
    },
  });

  const handleAddPart = () => {
    let data = formik.values.parts;
    data.push(generatePartsObj());
    formik.setFieldValue("parts", data);
  };

  const handleformikComment = (e: any) => {
    formik.setFieldValue("comment", e.target.value);
  };

  const handleRemovePart = (id: number) => {
    if (formik.values.parts.length <= 1) return;
    let data = formik.values.parts.filter(
      (item: any, index: any) => index !== id
    );
    formik.setFieldValue("parts", data);
  };
  return (
    <div>
      <Typography style={{ fontWeight: 500, fontSize: "18px" }}>
        {id ? "Edit Inquiry" : "Request New Part"}
      </Typography>
      <Grid container marginTop={2} marginBottom={4} style={borderCard}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            marginBottom={1}
            style={{ fontWeight: 500 }}
          >
            When do you need this quotation?
          </Typography>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormControl>
            <FormLabel style={{ fontSize: "0.8rem" }}>
              Please Select a date
            </FormLabel>
            <DatePicker
              value={
                moment(formik.values.date).isValid()
                  ? moment(formik.values.date)
                  : null
              }
              disablePast={true}
              onChange={(v: Moment | null) => {
                const e = {
                  target: {
                    name: "date",
                    value: v ? v.format("DD/MM/YYYY") : null,
                  },
                };
                formik.handleChange(e);
              }}
              slotProps={{
                textField: {
                  helperText:
                    formik.touched.date && formik.errors.date ? (
                      <Typography color={"red"} fontSize={12}>
                        {formik.errors.date}
                      </Typography>
                    ) : undefined,
                },
              }}
            />
          </FormControl>
        </LocalizationProvider>
      </Grid>
      <Grid container marginBottom={4} style={borderCard}>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            marginBottom={1}
            style={{ fontWeight: 500 }}
          >
            How often do you expect to purchase these items?
          </Typography>
        </Grid>
        <FormControl>
          <FormLabel style={{ fontSize: "0.8rem" }}>
            Expected Order Frequency*
          </FormLabel>
          <RadioGroup
            row
            onChange={formik.handleChange}
            name={"frequency"}
            value={formik.values.frequency}
          >
            <FormControlLabel
              value="weekly"
              control={<Radio />}
              label="Weekly"
            />
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label="Monthly"
            />
            <FormControlLabel
              value="quarterly"
              control={<Radio />}
              label="Quarterly"
            />
            <FormControlLabel
              value="yearly"
              control={<Radio />}
              label="Yearly"
            />
            <FormControlLabel
              value="one-time"
              control={<Radio />}
              label="One-Time"
            />
          </RadioGroup>
          <FormHelperText style={{ color: "red" }}>
            {formik.touched.frequency && formik.errors.frequency}
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid container style={borderCard}>
        <Grid container>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 500 }}>
              What do you need?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              You can request more than one part.{" "}
            </Typography>
          </Grid>
        </Grid>

        {formik.values.parts.map((_: any, i: any) => (
          <Grid
            container
            justifyContent={"flex-start"}
            columnGap={2}
            marginTop={3}
            style={{ maxWidth: "1400px" }}
          >
            <Grid item xs={2}>
              <TextField
                label={"Manufacturer"}
                fullWidth
                value={formik.values.parts[i].manufacturer}
                onChange={formik.handleChange}
                name={`parts.${i}.manufacturer`}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label={"IMPA Code OR P/N"}
                fullWidth
                value={formik.values.parts[i].itemPn}
                onChange={formik.handleChange}
                name={`parts.${i}.itemPn`}
                error={Boolean(
                  formik.touched.parts?.[i]?.itemPn &&
                    formik.errors.parts?.[i]?.itemPn
                )}
                helperText={
                  formik.touched.parts?.[i]?.itemPn &&
                  formik.errors.parts?.[i]?.itemPn
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label={"Description"}
                fullWidth
                value={formik.values.parts[i]?.description}
                onChange={formik.handleChange}
                name={`parts.${i}.description`}
                placeholder="Provide all the details you want to give for the product"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                label={"Quantity"}
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.parts[i]?.quantity}
                name={`parts.${i}.quantity`}
                error={Boolean(
                  formik.touched.parts?.[i]?.quantity &&
                    formik.errors.parts?.[i]?.quantity
                )}
                helperText={
                  formik.touched.parts?.[i]?.quantity &&
                  formik.errors.parts?.[i]?.quantity
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl
                fullWidth
                error={Boolean(
                  formik.touched.parts?.[i]?.uom &&
                    formik.errors.parts?.[i]?.uom
                )}
              >
                <InputLabel id="demo-simple-select-label">UOM</InputLabel>
                <Select
                  value={formik.values.parts[i]?.uom}
                  label={"UOM"}
                  name={`parts.${i}.uom`}
                  placeholder="Select"
                  variant="outlined"
                  onChange={(v) => {
                    formik.handleChange(v);
                  }}
                >
                  {units_of_measurement.map((item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {formik.touched.parts?.[i]?.uom &&
                    formik.errors.parts?.[i]?.uom}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={1} alignSelf={"center"}>
              <Button
                variant={"text"}
                color={"error"}
                startIcon={<RemoveIcon />}
                onClick={() => handleRemovePart(i)}
              />
            </Grid>
          </Grid>
        ))}
        <Grid container marginTop={1} gap={2}>
          <Button
            variant={"text"}
            startIcon={<AddIcon />}
            onClick={handleAddPart}
          >
            Add Another Part
          </Button>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </Grid>
      </Grid>
      <Grid container marginTop={4} style={borderCard}>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 500 }}>Any Comments?</Typography>
        </Grid>
        <Grid item xs={4} marginTop={"1rem"}>
          <TextareaAutosize
            style={{
              padding: "10px",
              width: "100%",
              background: "transparent",
              fontSize: "16px",
              fontFamily: "inherit",
            }}
            value={formik.values.comment}
            onChange={handleformikComment}
            maxRows={10}
            minRows={5}
            placeholder="Enter your comment here"
          />
        </Grid>
      </Grid>
      <Grid container marginTop={4} flexDirection={"column"}>
        <Grid marginTop={"1rem"}>
          <Button
            variant={"outlined"}
            startIcon={<AttachmentIcons />}
            onClick={() => fileInputRef.current.click()}
          >
            {formik.values.file ? "Replace Attachment" : "Upload Attachment"}
          </Button>
          <Grid container alignItems={"self-end"} marginTop={"0.25rem"}>
            <InfoOutlined style={{ color: "gray" }} />
            <Typography
              marginTop={0}
              marginLeft={"0.5rem"}
              style={{ fontWeight: 400, fontStyle: "italic", color: "gray" }}
            >
              Attachment you upload should be less than 10MB.
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={12} marginTop={1} fontSize={14}>
          {formik.values.file && `${fileName}`}
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: "2rem" }}
        justifyContent={"space-between"}
        marginBottom={4}
      >
        {isUploading ? (
          <Button type="submit" style={{ height: "36px", width: "78px" }}>
            <CircularProgress size="24px" style={{ color: "white" }} />
          </Button>
        ) : (
          <Button type="submit" onClick={() => formik.handleSubmit()}>
            Submit
          </Button>
        )}
      </Grid>
    </div>
  );
};
export { InquiryAddEdit };

const units_of_measurement = [
  { value: "each", label: "Each" },
  { value: "piece", label: "Piece" },
  { value: "pair", label: "Pair" },
  { value: "dozen", label: "Dozen" },
  { value: "pack", label: "Pack" },
  { value: "box", label: "Box" },
  { value: "case", label: "Case" },
  { value: "carton", label: "Carton" },
  { value: "set", label: "Set" },
  { value: "bundle", label: "Bundle" },
  { value: "roll", label: "Roll" },
  { value: "meter", label: "Meter" },
  { value: "yard", label: "Yard" },
  { value: "square_meter", label: "Square Meter" },
  { value: "square_yard", label: "Square Yard" },
  { value: "cubic_meter", label: "Cubic Meter" },
  { value: "liter", label: "Liter" },
  { value: "gallon", label: "Gallon" },
  { value: "kilogram", label: "Kilogram" },
  { value: "pound", label: "Pound" },
  { value: "ounce", label: "Ounce" },
];
