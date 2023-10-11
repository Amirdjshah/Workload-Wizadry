import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "../../../atom";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getUnitApi } from "../../../../lib/unit";
import InfoIcon from "@mui/icons-material/Info";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IModerations {
  teachingPeriod: number;
  unitCodes: string;
  noOfStudents: number;
}

interface IProps {
  formik: {
    values: {
      cp3: number;
      cp6: number;
      cp12: number;
      fullTimeStudentsSupervised: number;
      newUnitsBeingDeveloped: number;
      moderations: IModerations[];
    };
    handleChange: (e: any) => void;
    setFieldTouched: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: (e: any, v: any) => void;
    touched: {
      cp3: boolean;
      cp6: boolean;
      cp12: boolean;
      fullTimeStudentsSupervised: boolean;
      newUnitsBeingDeveloped: boolean;
      moderations: IModerations[];
    };
    errors: {
      cp3: string;
      cp6: string;
      cp12: string;
      fullTimeStudentsSupervised: string;
      newUnitsBeingDeveloped: string;
      moderations: IModerations[];
    };
  };
  handleAddModerations: () => void;
  onClickNext: (done?: boolean) => void;
  onClickPrevious: () => void;
  table: React.ReactNode;
  loading: boolean;
  view: boolean;
}

const Form2: React.FC<IProps> = ({
  formik,
  handleAddModerations,
  onClickNext,
  onClickPrevious,
  table,
  loading,
  view,
}) => {
  const handleRemoveModeration = (id: number) => {
    if (formik.values.moderations.length <= 1) return;
    let data = formik.values.moderations.filter(
      (item: any, index: any) => index !== id
    );
    formik.setFieldValue("moderations", data);
  };

  const [units, setUnits] = useState<any[]>([]);
  const [unitLoading, setUnitLoading] = useState<boolean>(false);

  const getUnits = async () => {
    setUnitLoading(true);
    try {
      const response = await getUnitApi();
      const data: any[] = response?.data?.config;
      if (data && data?.length > 0) {
        const unitData = data.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
        setUnits(unitData);
      }
      console.log("response", response);
    } catch (err) {
    } finally {
      setUnitLoading(false);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container>
              <Grid item md={8} xs={12}>
                <Grid container flexDirection="column">
                  <Grid item>
                    <Typography style={{ fontSize: "18px" }}>
                      Teaching - not unit specific
                    </Typography>
                  </Grid>
                  <Divider style={{ marginRight: "10px", marginTop: "10px" }} />
                  <Grid item>
                    <Grid container justifyContent={"left"} flexDirection="row">
                      <Grid item md={6} xs={12}>
                        <Grid item xs={12}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#676767",
                              paddingTop: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Number of projects supervised
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            style={{
                              fontSize: "12px",
                              color: "#676767",
                              paddingBottom: "10px",
                            }}
                          ></Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <Grid container flexDirection={"row"} gap={2}>
                            <Grid item xs={3}>
                              <Grid item textAlign={"center"}>
                                <InputLabel>3cp</InputLabel>
                              </Grid>
                              <Select
                                disabled={view}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={formik?.values?.cp3}
                                fullWidth
                                name="cp3"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik?.touched?.cp3 &&
                                  Boolean(formik?.errors?.cp3)
                                }
                                label="HDR Students"
                              >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={3}>
                              <Grid item textAlign={"center"}>
                                <InputLabel>6cp</InputLabel>
                              </Grid>
                              <Select
                                disabled={view}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={formik?.values?.cp6}
                                fullWidth
                                name="cp6"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik?.touched?.cp6 &&
                                  Boolean(formik?.errors?.cp6)
                                }
                                label="HDR Students"
                              >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                              </Select>
                            </Grid>
                            <Grid item xs={3}>
                              <Grid item textAlign={"center"}>
                                <InputLabel>12cp</InputLabel>
                              </Grid>
                              <Select
                                disabled={view}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={formik?.values?.cp12}
                                fullWidth
                                name="cp12"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik?.touched?.cp12 &&
                                  Boolean(formik?.errors?.cp12)
                                }
                                label="HDR Students"
                              >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                              </Select>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Grid item xs={12} marginBottom={1}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#676767",
                              paddingTop: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            No. of full time students supervised
                            <Tooltip
                              title="No. of full time 24cp honours students supervised
                            (fractional permitted):"
                            >
                              <InfoIcon
                                fontSize="small"
                                color="info"
                                style={{ marginTop: "4px" }}
                              />
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <TextField
                            disabled={view}
                            type="number"
                            id="outlined-start-adornment"
                            name="fullTimeStudentsSupervised"
                            fullWidth
                            value={formik?.values?.fullTimeStudentsSupervised}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.fullTimeStudentsSupervised &&
                              Boolean(
                                formik?.errors?.fullTimeStudentsSupervised
                              )
                            }
                            helperText={
                              formik?.touched?.fullTimeStudentsSupervised &&
                              formik?.errors?.fullTimeStudentsSupervised
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Grid item xs={12} marginBottom={1}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#676767",
                              paddingTop: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Number of new units being developed
                            <Tooltip
                              title="Number of new units being developed (fractional
                            permitted):"
                            >
                              <InfoIcon
                                fontSize="small"
                                color="info"
                                style={{ marginTop: "4px" }}
                              />
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <TextField
                            disabled={view}
                            type="number"
                            id="outlined-start-adornment"
                            name="newUnitsBeingDeveloped"
                            fullWidth
                            value={formik?.values?.newUnitsBeingDeveloped}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.newUnitsBeingDeveloped &&
                              Boolean(formik?.errors?.newUnitsBeingDeveloped)
                            }
                            helperText={
                              formik?.touched?.newUnitsBeingDeveloped &&
                              formik?.errors?.newUnitsBeingDeveloped
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        {/* hi there */}
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Grid item xs={6}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#676767",
                              paddingTop: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Moderation
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          style={{ background: "red" }}
                          xs={12}
                        >
                          <TableContainer
                            component={Paper}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "flex-end",
                            }}
                          >
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow style={{ background: "#e0edee" }}>
                                  <TableCell align="left">
                                    Teaching Period
                                  </TableCell>
                                  <TableCell align="left">Unit Codes</TableCell>
                                  <TableCell align="left">
                                    No. of Students
                                  </TableCell>
                                  <TableCell align="left">Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {formik.values.moderations?.map((item, i) => {
                                  return (
                                    <StyledTableRow key={i}>
                                      <TableCell>
                                        <Select
                                          disabled={view}
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          value={
                                            formik?.values?.moderations[i]
                                              ?.teachingPeriod
                                          }
                                          fullWidth
                                          name={`moderations.${i}.teachingPeriod`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          error={
                                            formik?.touched?.moderations?.[i]
                                              ?.teachingPeriod &&
                                            (Boolean(
                                              formik?.errors?.moderations?.[i]
                                                ?.teachingPeriod
                                            ) as any)
                                          }
                                          label="Semester"
                                        >
                                          <MenuItem value={"s1"}>
                                            Semester 1
                                          </MenuItem>
                                          <MenuItem value={"s2"}>
                                            Semester 2
                                          </MenuItem>
                                          <MenuItem value={"ws"}>
                                            Winter Semester
                                          </MenuItem>
                                          <MenuItem value={"ss"}>
                                            Summer Semester
                                          </MenuItem>
                                        </Select>
                                      </TableCell>
                                      <TableCell>
                                        <Autocomplete
                                          disabled={view}
                                          disablePortal
                                          id="combo-box-demo"
                                          fullWidth
                                          options={units}
                                          onChange={(event, newValue) => {
                                            const e: any = {
                                              target: {
                                                name: `moderations.${i}.unitCodes`,
                                                value: newValue?.value,
                                              },
                                            };
                                            formik.setFieldTouched(
                                                `moderations.${i}.unitCodes`,
                                            );
                                            formik.handleChange(e);
                                            formik.setFieldValue(
                                                `moderations.${i}.unitCodes`,
                                              newValue?.value
                                            );
                                          }}
                                          getOptionLabel={(option) =>
                                            option.label
                                          }
                                          value={
                                            units?.find(
                                              (item: any) =>
                                                item.value ==
                                                parseInt(
                                                  formik.values.moderations[i]
                                                    ?.unitCodes
                                                )
                                            ) || {
                                              label: "",
                                              value: 0,
                                            }
                                          }
                                          sx={{ width: 300 }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              name={`moderations.${i}.unitCodes`}
                                              key={`moderations.${i}.unitCodes`}
                                              error={
                                                formik?.touched.moderations?.[i]
                                                  ?.unitCodes &&
                                                (Boolean(
                                                  formik?.errors?.moderations?.[
                                                    i
                                                  ]?.unitCodes
                                                ) as any)
                                              }
                                              label="Select Unit Codes"
                                            />
                                          )}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          disabled={view}
                                          type="number"
                                          id="outlined-start-adornment"
                                          name={`moderations.${i}.noOfStudents`}
                                          fullWidth
                                          value={
                                            formik?.values?.moderations?.[i]
                                              ?.noOfStudents
                                          }
                                          onChange={formik?.handleChange}
                                          onBlur={formik?.handleBlur}
                                          error={
                                            formik?.touched?.moderations?.[i]
                                              ?.noOfStudents &&
                                            (Boolean(
                                              formik?.errors?.moderations?.[i]
                                                ?.noOfStudents
                                            ) as any)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Grid
                                          container
                                          justifyContent="center"
                                          alignContent={"center"}
                                        >
                                          <Grid item>
                                            {formik.values.moderations?.length -
                                              1 ===
                                            i ? (
                                              <Button
                                                disabled={view}
                                                variant="text"
                                                color="primary"
                                                onClick={() =>
                                                  handleAddModerations()
                                                }
                                              >
                                                <AddIcon />
                                              </Button>
                                            ) : (
                                              <Button
                                                disabled={view}
                                                variant={"text"}
                                                color={"error"}
                                                onClick={() =>
                                                  handleRemoveModeration(i)
                                                }
                                              >
                                                <RemoveIcon />
                                              </Button>
                                            )}
                                          </Grid>
                                        </Grid>
                                      </TableCell>
                                    </StyledTableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid marginLeft={1} md={3.9} item xs={12}>
                {table}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ alignContent: "center" }}>
            <Grid item>
              <Button variant="contained" onClick={onClickPrevious}>
                Previous
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => onClickNext(false)}>
                {loading ? (
                  <CircularProgress size={24} style={{ color: "#fff" }} />
                ) : (
                  <span> Next</span>
                )}
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { Form2 };
