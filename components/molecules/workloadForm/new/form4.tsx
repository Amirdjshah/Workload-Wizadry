import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
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
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "../../../atom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { getUnitApi } from "../../../../lib/unit";
import { red } from "@mui/material/colors";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ISubjects {
  unit_name: string;
  unit_code: string;
  delivery_mode: string;
  credit_points: number;
  students: number;
}
interface ILectures {
  f2f: string;
  instance: number;
  hour_per_instance: number;
  credit_points: number;
  students: number;
}
interface IUnits {
  unit_code: string;
  unit_convening: boolean;
  co_convening_fraction: number;
  cotaught: boolean;
  multi_modal: boolean;
  team_teaching: boolean;
  significant_revision: boolean;
  no_of_week_revised: number;
  new_videos: boolean;
  new_videos_hours: number;
  new_teacher: boolean;
  subjects: ISubjects[];
  lectures: ILectures[];
}

interface IProps {
  view: boolean;
  formik: {
    values: {
      units: IUnits[];
    };
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: (e: any, v: any) => void;
    setFieldTouched: (e: any) => void;
    touched: {
      units: IUnits[];
    };
    errors: {
      units: IUnits[];
    };
  };
  onClickNext: (done?: boolean) => void;
  onClickPrevious: () => void;
  table: React.ReactNode;
  loading: boolean;
}

const generateSubjects = () => ({
  unit_name: "",
  unit_code: "",
  delivery_mode: "on_campus",
  credit_points: 3,
  students: 0,
});

const generateLectures = () => ({
  f2f: "",
  instance: 0,
  hour_per_instance: 0,
  credit_points: 3,
  students: 0,
});

const generateUnits = (semester: string) => ({
  unit_code: semester,
  unit_convening: false,
  co_convening_fraction: 0,
  cotaught: false,
  multi_modal: false,
  team_teaching: false,
  significant_revision: false,
  no_of_week_revised: 0,
  new_videos: false,
  new_videos_hours: 0,
  new_teacher: false,
  subjects: [
    {
      ...generateSubjects(),
    },
  ],
  lectures: [
    {
      ...generateLectures(),
    },
  ],
});

const Form4: React.FC<IProps> = ({
  formik,
  onClickNext,
  onClickPrevious,
  table,
  loading,
  view,
}) => {
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
            unit_code: item?.unit_code,
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

  const handleAddSubjects = (unit_i: number) => {
    let data = formik.values.units[unit_i].subjects;
    data.push(generateSubjects());
    formik.setFieldValue(`units.${unit_i}.subjects`, data);
  };
  const handleRemoveSubjects = (unit_i: number, subject_j: number) => {
    if (formik.values.units?.[unit_i]?.subjects?.length <= 1) return;
    let data = formik.values.units?.[unit_i]?.subjects?.filter(
      (item: any, index: any) => index !== subject_j
    );
    formik.setFieldValue(`units.${unit_i}.subjects`, data);
  };
  const handleAddLectures = (unit_i: number) => {
    let data = formik.values.units[unit_i].lectures;
    data.push(generateLectures());
    formik.setFieldValue(`units.${unit_i}.lectures`, data);
  };
  const handleRemoveLectures = (unit_i: number, subject_j: number) => {
    if (formik.values.units?.[unit_i]?.lectures?.length <= 1) return;
    let data = formik.values.units?.[unit_i]?.lectures?.filter(
      (item: any, index: any) => index !== subject_j
    );
    formik.setFieldValue(`units.${unit_i}.lectures`, data);
  };

  const addMoreSemester = () => {
    let data = formik.values.units;
    data.push(generateUnits("ws"));
    formik.setFieldValue(`units`, data);
  };

  const removeUnit = (i: number) => {
    if (formik.values.units?.length <= 1) return;
    let data = formik.values.units?.filter(
      (item: any, index: any) => index !== i
    );
    formik.setFieldValue(`units`, data);
  };

  console.log("Initial value:::", formik.values);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container justifyContent="space-between">
              <Grid item md={9} xs={12}>
                <Grid container flexDirection="column">
                  <Grid item>
                    <Typography style={{ fontSize: "18px" }}>Units</Typography>
                  </Grid>
                  <Divider style={{ marginRight: "10px", marginTop: "10px" }} />
                  <Grid item>
                    <Grid container justifyContent={"left"} flexDirection="row">
                      <Grid item md={12} xs={12}>
                        {formik.values?.units?.map((item: any, i: any) => {
                          return (
                            <Grid
                              key={`units-${i}`}
                              item
                              md={12}
                              xs={12}
                              marginRight={2}
                              marginBottom={2}
                            >
                              <Card>
                                <CardContent>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      <Grid
                                        container
                                        justifyContent={"space-between"}
                                      >
                                        <Grid item xs={3}>
                                          <Grid item textAlign={"left"}>
                                            <InputLabel>Select Unit</InputLabel>
                                          </Grid>
                                          <Select
                                            disabled={view}
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={
                                              formik.values?.units?.[i]
                                                ?.unit_code
                                            }
                                            fullWidth
                                            // disabled
                                            name={`units.${i}.unit_code`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                              formik?.touched?.units?.[i]
                                                ?.unit_code &&
                                              (Boolean(
                                                formik?.errors?.units?.[i]
                                                  ?.unit_code
                                              ) as any)
                                            }
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
                                        </Grid>
                                        <Grid item xs={3} marginTop={2}>
                                          {formik?.values?.units?.length >
                                            1 && (
                                            <Button
                                              disabled={view}
                                              style={{ float: "right" }}
                                              variant="outlined"
                                              color="error"
                                              startIcon={<RemoveIcon />}
                                              onClick={() => removeUnit(i)}
                                            >
                                              Remove Unit
                                            </Button>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={3}>
                                      <Grid item xs={12}>
                                        <Typography
                                          style={{
                                            fontSize: "16px",
                                            color: "#676767",
                                            paddingTop: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          Cotaught
                                        </Typography>
                                      </Grid>
                                      <Grid item md={8} xs={12}>
                                        <ToggleButtonGroup
                                          color="primary"
                                          value={
                                            formik?.values?.units?.[i]?.cotaught
                                              ? "yes"
                                              : "no"
                                          }
                                          exclusive
                                          onChange={(_, value) => {
                                            if (value === "yes") {
                                              formik.setFieldValue(
                                                `units.${i}.cotaught`,
                                                true
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `units.${i}.cotaught`,
                                                false
                                              );
                                            }
                                          }}
                                          aria-label="text alignment"
                                        >
                                          <ToggleButton
                                            value="yes"
                                            aria-label="left aligned"
                                          >
                                            <DoneIcon />
                                          </ToggleButton>
                                          <ToggleButton
                                            value="no"
                                            aria-label="centered"
                                          >
                                            <CloseIcon />
                                          </ToggleButton>
                                        </ToggleButtonGroup>
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={3}>
                                      <Grid item xs={12}>
                                        <Typography
                                          style={{
                                            fontSize: "16px",
                                            color: "#676767",
                                            paddingTop: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          Multi Modal
                                        </Typography>
                                      </Grid>
                                      <Grid item md={8} xs={12}>
                                        <ToggleButtonGroup
                                          disabled={view}
                                          color="primary"
                                          value={
                                            formik?.values?.units?.[i]
                                              ?.multi_modal
                                              ? "yes"
                                              : "no"
                                          }
                                          exclusive
                                          onChange={(_, value) => {
                                            if (value === "yes") {
                                              formik.setFieldValue(
                                                `units.${i}.multi_modal`,
                                                true
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `units.${i}.multi_modal`,
                                                false
                                              );
                                            }
                                          }}
                                          aria-label="text alignment"
                                        >
                                          <ToggleButton
                                            value="yes"
                                            aria-label="left aligned"
                                          >
                                            <DoneIcon />
                                          </ToggleButton>
                                          <ToggleButton
                                            value="no"
                                            aria-label="centered"
                                          >
                                            <CloseIcon />
                                          </ToggleButton>
                                        </ToggleButtonGroup>
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={3}>
                                      <Grid item xs={12}>
                                        <Typography
                                          style={{
                                            fontSize: "16px",
                                            color: "#676767",
                                            paddingTop: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          Team Teaching
                                        </Typography>
                                      </Grid>
                                      <Grid item md={8} xs={12}>
                                        <ToggleButtonGroup
                                          disabled={view}
                                          color="primary"
                                          value={
                                            formik?.values?.units?.[i]
                                              ?.team_teaching
                                              ? "yes"
                                              : "no"
                                          }
                                          exclusive
                                          onChange={(_, value) => {
                                            if (value === "yes") {
                                              formik.setFieldValue(
                                                `units.${i}.team_teaching`,
                                                true
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `units.${i}.team_teaching`,
                                                false
                                              );
                                            }
                                          }}
                                          aria-label="text alignment"
                                        >
                                          <ToggleButton
                                            value="yes"
                                            aria-label="left aligned"
                                          >
                                            <DoneIcon />
                                          </ToggleButton>
                                          <ToggleButton
                                            value="no"
                                            aria-label="centered"
                                          >
                                            <CloseIcon />
                                          </ToggleButton>
                                        </ToggleButtonGroup>
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={3}>
                                      <Grid item xs={12}>
                                        <Typography
                                          style={{
                                            fontSize: "16px",
                                            color: "#676767",
                                            paddingTop: "10px",
                                            paddingRight: "10px",
                                          }}
                                        >
                                          New Teacher
                                        </Typography>
                                      </Grid>
                                      <Grid item md={8} xs={12}>
                                        <ToggleButtonGroup
                                          disabled={view}
                                          color="primary"
                                          value={
                                            formik?.values?.units?.[i]
                                              ?.new_teacher
                                              ? "yes"
                                              : "no"
                                          }
                                          exclusive
                                          onChange={(_, value) => {
                                            if (value === "yes") {
                                              formik.setFieldValue(
                                                `units.${i}.new_teacher`,
                                                true
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `units.${i}.new_teacher`,
                                                false
                                              );
                                            }
                                          }}
                                          aria-label="text alignment"
                                        >
                                          <ToggleButton
                                            value="yes"
                                            aria-label="left aligned"
                                          >
                                            <DoneIcon />
                                          </ToggleButton>
                                          <ToggleButton
                                            value="no"
                                            aria-label="centered"
                                          >
                                            <CloseIcon />
                                          </ToggleButton>
                                        </ToggleButtonGroup>
                                      </Grid>
                                    </Grid>

                                    <Grid container marginTop={2}>
                                      <Grid item xs={3}>
                                        <Grid item xs={12}>
                                          <Typography
                                            style={{
                                              fontSize: "16px",
                                              color: "#676767",
                                              paddingTop: "10px",
                                              paddingRight: "10px",
                                            }}
                                          >
                                            Unit Convening
                                          </Typography>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                          <ToggleButtonGroup
                                            disabled={view}
                                            color="primary"
                                            value={
                                              formik?.values?.units?.[i]
                                                ?.unit_convening
                                                ? "yes"
                                                : "no"
                                            }
                                            exclusive
                                            onChange={(_, value) => {
                                              if (value === "yes") {
                                                formik.setFieldValue(
                                                  `units.${i}.unit_convening`,
                                                  true
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  `units.${i}.unit_convening`,
                                                  false
                                                );
                                              }
                                            }}
                                            aria-label="text alignment"
                                          >
                                            <ToggleButton
                                              value="yes"
                                              aria-label="left aligned"
                                            >
                                              <DoneIcon />
                                            </ToggleButton>
                                            <ToggleButton
                                              value="no"
                                              aria-label="centered"
                                            >
                                              <CloseIcon />
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        </Grid>
                                      </Grid>

                                      <Grid item xs={3}>
                                        <Grid item xs={12}>
                                          <Typography
                                            style={{
                                              fontSize: "16px",
                                              color: "#676767",
                                              paddingTop: "10px",
                                              paddingRight: "10px",
                                            }}
                                          >
                                            Significant Revisions
                                          </Typography>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                          <ToggleButtonGroup
                                            disabled={view}
                                            color="primary"
                                            value={
                                              formik?.values?.units?.[i]
                                                ?.significant_revision
                                                ? "yes"
                                                : "no"
                                            }
                                            exclusive
                                            onChange={(_, value) => {
                                              if (value === "yes") {
                                                formik.setFieldValue(
                                                  `units.${i}.significant_revision`,
                                                  true
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  `units.${i}.significant_revision`,
                                                  false
                                                );
                                              }
                                            }}
                                            aria-label="text alignment"
                                          >
                                            <ToggleButton
                                              value="yes"
                                              aria-label="left aligned"
                                            >
                                              <DoneIcon />
                                            </ToggleButton>
                                            <ToggleButton
                                              value="no"
                                              aria-label="centered"
                                            >
                                              <CloseIcon />
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        </Grid>
                                      </Grid>

                                      <Grid item xs={3}>
                                        <Grid item xs={12}>
                                          <Typography
                                            style={{
                                              fontSize: "16px",
                                              color: "#676767",
                                              paddingTop: "10px",
                                              paddingRight: "10px",
                                            }}
                                          >
                                            New Videos
                                          </Typography>
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                          <ToggleButtonGroup
                                            disabled={view}
                                            color="primary"
                                            value={
                                              formik?.values?.units?.[i]
                                                ?.new_videos
                                                ? "yes"
                                                : "no"
                                            }
                                            exclusive
                                            onChange={(_, value) => {
                                              if (value === "yes") {
                                                formik.setFieldValue(
                                                  `units.${i}.new_videos`,
                                                  true
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  `units.${i}.new_videos`,
                                                  false
                                                );
                                              }
                                            }}
                                            aria-label="text alignment"
                                          >
                                            <ToggleButton
                                              value="yes"
                                              aria-label="left aligned"
                                            >
                                              <DoneIcon />
                                            </ToggleButton>
                                            <ToggleButton
                                              value="no"
                                              aria-label="centered"
                                            >
                                              <CloseIcon />
                                            </ToggleButton>
                                          </ToggleButtonGroup>
                                        </Grid>
                                      </Grid>

                                      <Grid container marginTop={2}>
                                        <Grid item xs={3}>
                                          <Grid
                                            container
                                            style={{ width: "70%" }}
                                          >
                                            <Grid item xs={12}>
                                              <Grid item textAlign={"left"}>
                                                <InputLabel
                                                  style={
                                                    formik?.values?.units?.[i]
                                                      ?.unit_convening
                                                      ? {
                                                          color: "black",
                                                        }
                                                      : {}
                                                  }
                                                >
                                                  Unit Convening
                                                </InputLabel>
                                              </Grid>
                                              <TextField
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position="start">
                                                    %
                                                  </InputAdornment>
                                                ),
                                              }}
                                                type="text"
                                                placeholder="F2F or equivalent teaching activity"
                                                id="outlined-start-adornment"
                                                name={`units.${i}.co_convening_fraction`}
                                                fullWidth
                                                disabled={
                                                  !formik?.values?.units?.[i]
                                                    ?.unit_convening
                                                }
                                                value={
                                                  formik.values?.units?.[i]
                                                    ?.co_convening_fraction
                                                }
                                                onChange={formik?.handleChange}
                                                onBlur={formik?.handleBlur}
                                                error={
                                                  formik?.touched?.units?.[i]
                                                    ?.co_convening_fraction &&
                                                  (Boolean(
                                                    formik?.errors?.units?.[i]
                                                      ?.co_convening_fraction
                                                  ) as any)
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                          <Grid
                                            container
                                            style={{ width: "70%" }}
                                          >
                                            <Grid item xs={12}>
                                              <Grid item textAlign={"left"}>
                                                <InputLabel
                                                  style={
                                                    formik?.values?.units?.[i]
                                                      ?.significant_revision
                                                      ? {
                                                          color: "black",
                                                        }
                                                      : {}
                                                  }
                                                >
                                                  Week Revised
                                                </InputLabel>
                                              </Grid>
                                              <TextField
                                                type="text"
                                                placeholder="F2F or equivalent teaching activity"
                                                id="outlined-start-adornment"
                                                name={`units.${i}.no_of_week_revised`}
                                                fullWidth
                                                disabled={
                                                  view ||
                                                  !formik?.values?.units?.[i]
                                                    ?.significant_revision
                                                }
                                                value={
                                                  formik.values?.units?.[i]
                                                    ?.no_of_week_revised
                                                }
                                                onChange={formik?.handleChange}
                                                onBlur={formik?.handleBlur}
                                                error={
                                                  formik?.touched?.units?.[i]
                                                    ?.no_of_week_revised &&
                                                  (Boolean(
                                                    formik?.errors?.units?.[i]
                                                      ?.no_of_week_revised
                                                  ) as any)
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={3}>
                                          <Grid
                                            container
                                            style={{ width: "70%" }}
                                          >
                                            <Grid item xs={12}>
                                              <Grid item textAlign={"left"}>
                                                <InputLabel
                                                  style={
                                                    formik?.values?.units?.[i]
                                                      ?.new_videos
                                                      ? {
                                                          color: "black",
                                                        }
                                                      : {}
                                                  }
                                                >
                                                  Videos Hours
                                                </InputLabel>
                                              </Grid>
                                              <TextField
                                                type="text"
                                                placeholder="F2F or equivalent teaching activity"
                                                id="outlined-start-adornment"
                                                name={`units.${i}.new_videos_hours`}
                                                disabled={
                                                  view ||
                                                  !formik?.values?.units?.[i]
                                                    ?.new_videos
                                                }
                                                fullWidth
                                                value={
                                                  formik.values?.units?.[i]
                                                    ?.new_videos_hours
                                                }
                                                onChange={formik?.handleChange}
                                                onBlur={formik?.handleBlur}
                                                error={
                                                  formik?.touched?.units?.[i]
                                                    ?.new_videos_hours &&
                                                  (Boolean(
                                                    formik?.errors?.units?.[i]
                                                      ?.new_videos_hours
                                                  ) as any)
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid item xs={12} marginTop={2}>
                                      <Typography>Select Unit Name</Typography>
                                      <Divider />
                                      <br />
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
                                            <TableRow
                                              style={{ background: "#e0edee" }}
                                            >
                                              <TableCell align="left">
                                                Unit Name
                                              </TableCell>
                                              <TableCell align="left">
                                                Unit Code
                                              </TableCell>
                                              <TableCell align="left">
                                                Delivery Mode
                                              </TableCell>
                                              <TableCell align="left">
                                                Credit Points
                                              </TableCell>
                                              <TableCell align="left">
                                                Students
                                              </TableCell>
                                              <TableCell align="left">
                                                Action
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {formik.values.units?.[
                                              i
                                            ]?.subjects?.map((item, j) => {
                                              return (
                                                <StyledTableRow
                                                  key={`units-${i}-${j}`}
                                                >
                                                  <TableCell align="left" >
                                                    <Autocomplete
                                                      disabled={view} style={{width: "250px"}}
                                                      disablePortal
                                                      id="combo-box-demo"
                                                      fullWidth
                                                      options={units}
                                                      onChange={(
                                                        event,
                                                        newValue
                                                      ) => {
                                                        const e: any = {
                                                          target: {
                                                            name: `units.${i}.subjects.${j}.unit_name`,
                                                            value:
                                                              newValue?.value,
                                                          },
                                                        };
                                                        formik.setFieldTouched(
                                                          `units.${i}.subjects.${j}.unit_name`
                                                        );
                                                        formik.handleChange(e);
                                                        formik.setFieldValue(
                                                          `units.${i}.subjects.${j}.unit_name`,
                                                          newValue?.value
                                                        );

                                                        formik.setFieldValue(
                                                          `units.${i}.subjects.${j}.unit_code`,
                                                          newValue?.unit_code
                                                        );
                                                      }}
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.label}
                                                      value={
                                                        units?.find(
                                                          (item: any) =>
                                                            item.value ==
                                                            parseInt(
                                                              formik.values
                                                                .units[i]
                                                                ?.subjects?.[j]
                                                                ?.unit_name
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
                                                          name={`unit.${i}.subjects.${j}.unit_name`}
                                                          key={`unit.${i}.subjects.${j}.unit_name`}
                                                          error={
                                                            formik?.touched
                                                              .units?.[i]
                                                              ?.subjects?.[j]
                                                              ?.unit_name &&
                                                            (Boolean(
                                                              formik?.errors
                                                                ?.units?.[i]
                                                                ?.subjects?.[j]
                                                                ?.unit_name
                                                            ) as any)
                                                          }
                                                          label="Units"
                                                        />
                                                      )}
                                                    />
                                                  </TableCell>
                                                  <TableCell
                                                    align="left"
                                                    style={{ width: "150px" }}
                                                  >
                                                    {formik?.values?.units?.[i]
                                                      ?.subjects?.[j]
                                                      ?.unit_code || "-"}
                                                  </TableCell>
                                                  <TableCell align="left">
                                                    <Select
                                                      disabled={view}
                                                      labelId="demo-simple-select-standard-label"
                                                      id="demo-simple-select-standard"
                                                      value={
                                                        formik?.values?.units?.[
                                                          i
                                                        ]?.subjects?.[j]
                                                          ?.delivery_mode
                                                      }
                                                      fullWidth
                                                      name={`units.${i}.subjects.${j}.delivery_mode`}
                                                      onChange={
                                                        formik.handleChange
                                                      }
                                                      onBlur={formik.handleBlur}
                                                      error={
                                                        (formik?.touched
                                                          ?.units?.[i]
                                                          ?.subjects?.[j]
                                                          ?.delivery_mode as any) &&
                                                        Boolean(
                                                          formik?.errors
                                                            ?.units?.[i]
                                                            ?.subjects?.[j]
                                                            ?.delivery_mode
                                                        )
                                                      }
                                                      label="HDR Students"
                                                    >
                                                      <MenuItem
                                                        value={"on_campus"}
                                                      >
                                                        On Campus
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"flexible"}
                                                      >
                                                        Flexible
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"online"}
                                                      >
                                                        Online
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"internsive"}
                                                      >
                                                        Internsive
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"self-paced"}
                                                      >
                                                        Self-paced
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"research"}
                                                      >
                                                        Research
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"online-exam"}
                                                      >
                                                        Online-exam
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"weekend"}
                                                      >
                                                        Weekend
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"evening"}
                                                      >
                                                        Evening
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"sponsor"}
                                                      >
                                                        Sponsor
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"internplace"}
                                                      >
                                                        Internpace
                                                      </MenuItem>
                                                      <MenuItem
                                                        value={"project"}
                                                      >
                                                        Project
                                                      </MenuItem>
                                                    </Select>
                                                  </TableCell>
                                                  <TableCell
                                                    align="left"
                                                    style={{ width: "150px" }}
                                                  >
                                                    <TextField
                                                      disabled={view} style={{width: "60px"}}
                                                      type="number"
                                                      placeholder="F2F or equivalent teaching activity"
                                                      id="outlined-start-adornment"
                                                      name={`units.${i}.subjects.${j}.credit_points`}
                                                      fullWidth
                                                      value={
                                                        formik?.values?.units?.[
                                                          i
                                                        ]?.subjects?.[j]
                                                          ?.credit_points
                                                      }
                                                      onChange={
                                                        formik?.handleChange
                                                      }
                                                      onBlur={
                                                        formik?.handleBlur
                                                      }
                                                      error={
                                                        formik?.touched.units?.[
                                                          i
                                                        ]?.subjects?.[j]
                                                          ?.credit_points &&
                                                        (Boolean(
                                                          formik?.errors
                                                            ?.units?.[i]
                                                            ?.subjects?.[j]
                                                            ?.credit_points
                                                        ) as any)
                                                      }
                                                    />
                                                  </TableCell>
                                                  <TableCell
                                                    align="left"
                                                    style={{ width: "200px" }}
                                                  >
                                                    <TextField
                                                      disabled={view} style={{width: "60px"}}
                                                      type="number"
                                                      placeholder="F2F or equivalent teaching activity"
                                                      id="outlined-start-adornment"
                                                      name={`units.${i}.subjects.${j}.students`}
                                                      fullWidth
                                                      value={
                                                        formik?.values?.units?.[
                                                          i
                                                        ]?.subjects?.[j]
                                                          ?.students
                                                      }
                                                      onChange={
                                                        formik?.handleChange
                                                      }
                                                      onBlur={
                                                        formik?.handleBlur
                                                      }
                                                      error={
                                                        formik?.touched.units?.[
                                                          i
                                                        ]?.subjects?.[j]
                                                          ?.students &&
                                                        (Boolean(
                                                          formik?.errors
                                                            ?.units?.[i]
                                                            ?.subjects?.[j]
                                                            ?.students
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
                                                        {formik.values.units?.[
                                                          i
                                                        ]?.subjects?.length -
                                                          1 ===
                                                        j ? (
                                                          <Button
                                                            disabled={view}
                                                            variant="text"
                                                            color="primary"
                                                            onClick={() =>
                                                              handleAddSubjects(
                                                                i
                                                              )
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
                                                              handleRemoveSubjects(
                                                                i,
                                                                j
                                                              )
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

                                    <Grid item xs={12} marginTop={2}>
                                      <Typography>
                                        Select F2F equivalent teaching
                                        activities (optional)
                                      </Typography>
                                      <Divider />
                                      <br />
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
                                            <TableRow
                                              style={{ background: "#e0edee" }}
                                            >
                                              <TableCell align="left">
                                                Lecture Name
                                              </TableCell>
                                              <TableCell align="left">
                                                Instances
                                              </TableCell>
                                              <TableCell align="left">
                                                Hrs per instance
                                              </TableCell>
                                              <TableCell align="left">
                                                Action
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {formik.values.units?.[
                                              i
                                            ]?.lectures?.map((item, j) => {
                                              return (
                                                <StyledTableRow
                                                  key={`lectures-${i}-${j}`}
                                                >
                                                  <TableCell align="left">
                                                    <TextField
                                                      disabled={view}
                                                      type="text"
                                                      id="outlined-start-adornment"
                                                      name={`units.${i}.lectures.${j}.f2f`}
                                                      fullWidth
                                                      value={
                                                        formik?.values?.units?.[
                                                          i
                                                        ]?.lectures?.[j]?.f2f
                                                      }
                                                      onChange={
                                                        formik?.handleChange
                                                      }
                                                      onBlur={
                                                        formik?.handleBlur
                                                      }
                                                      error={
                                                        formik?.touched.units?.[
                                                          i
                                                        ]?.lectures?.[j]?.f2f &&
                                                        (Boolean(
                                                          formik?.errors
                                                            ?.units?.[i]
                                                            ?.lectures?.[j]?.f2f
                                                        ) as any)
                                                      }
                                                    />
                                                  </TableCell>

                                                  <TableCell align="left">
                                                    <TextField
                                                      disabled={view}
                                                      type="number"
                                                      placeholder="F2F or equivalent teaching activity"
                                                      id="outlined-start-adornment"
                                                      name={`units.${i}.lectures.${j}.instance`}
                                                      fullWidth
                                                      value={
                                                        formik?.values?.units?.[
                                                          i
                                                        ]?.lectures?.[j]
                                                          ?.instance
                                                      }
                                                      onChange={
                                                        formik?.handleChange
                                                      }
                                                      onBlur={
                                                        formik?.handleBlur
                                                      }
                                                      error={
                                                        formik?.touched.units?.[
                                                          i
                                                        ]?.lectures?.[j]
                                                          ?.instance &&
                                                        (Boolean(
                                                          formik?.errors
                                                            ?.units?.[i]
                                                            ?.lectures?.[j]
                                                            ?.instance
                                                        ) as any)
                                                      }
                                                    />
                                                  </TableCell>
                                                  <TableCell
                                                    align="left"
                                                    style={{ width: "150px" }}
                                                  >
                                                    <TextField
                                                      disabled={view}
                                                      type="number"
                                                      placeholder="F2F or equivalent teaching activity"
                                                      id="outlined-start-adornment"
                                                      name={`units.${i}.lectures.${j}.hour_per_instance`}
                                                      fullWidth
                                                      value={
                                                        formik?.values?.units?.[
                                                          i
                                                        ]?.lectures?.[j]
                                                          ?.hour_per_instance
                                                      }
                                                      onChange={
                                                        formik?.handleChange
                                                      }
                                                      onBlur={
                                                        formik?.handleBlur
                                                      }
                                                      error={
                                                        formik?.touched.units?.[
                                                          i
                                                        ]?.lectures?.[j]
                                                          ?.hour_per_instance &&
                                                        (Boolean(
                                                          formik?.errors
                                                            ?.units?.[i]
                                                            ?.lectures?.[j]
                                                            ?.hour_per_instance
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
                                                        {formik.values.units?.[
                                                          i
                                                        ]?.lectures?.length -
                                                          1 ===
                                                        j ? (
                                                          <Button
                                                            disabled={view}
                                                            variant="text"
                                                            color="primary"
                                                            onClick={() =>
                                                              handleAddLectures(
                                                                i
                                                              )
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
                                                              handleRemoveLectures(
                                                                i,
                                                                j
                                                              )
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
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })}
                        {formik?.values?.units?.length <= 4 && (
                          <Grid container>
                            <Grid item>
                              <Button
                                disabled={view}
                                variant="outlined"
                                onClick={addMoreSemester}
                              >
                                Add More Units (optional)
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
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

export { Form4 };
