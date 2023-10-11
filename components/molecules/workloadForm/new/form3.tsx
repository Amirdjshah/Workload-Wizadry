import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "../../../atom";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getUnitApi } from "../../../../lib/unit";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IActivities {
  f2f: string;
  instances: number;
  hourPerInstance: number;
}

interface IProps {
  formik: {
    values: {
      cp3: number;
      cp6: number;
      cp12: number;
      fullTimeStudentsSupervised: number;
      newUnitsBeingDeveloped: number;
      activities: IActivities[];
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
      activities: IActivities[];
    };
    errors: {
      cp3: string;
      cp6: string;
      cp12: string;
      fullTimeStudentsSupervised: string;
      newUnitsBeingDeveloped: string;
      activities: IActivities[];
    };
  };
  handleAddActivities: () => void;
  onClickNext: (done?: boolean) => void;
  onClickPrevious: () => void;
  table: React.ReactNode;
  loading: boolean;
  view: boolean;
}

const Form3: React.FC<IProps> = ({
  formik,
  handleAddActivities,
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
  const handleRemoveModeration = (id: number) => {
    if (formik.values.activities.length <= 1) return;
    let data = formik.values.activities.filter(
      (item: any, index: any) => index !== id
    );
    formik.setFieldValue("activities", data);
  };

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
                      General teaching activities (Optional)
                    </Typography>
                  </Grid>
                  <Divider style={{ marginRight: "10px", marginTop: "10px" }} />
                  <Grid item>
                    <Grid container justifyContent={"left"} flexDirection="row">
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
                            Teaching activities
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={12}
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
                                    <Tooltip
                                      title="F2F or equivalent teaching activity
                                        delivered"
                                    >
                                      <Grid
                                        container
                                        alignContent={"center"}
                                        gap={0.5}
                                      >
                                        <span>F2F</span>
                                        <InfoIcon
                                          fontSize="small"
                                          color="info"
                                          style={{ marginTop: "2px" }}
                                        />
                                      </Grid>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell align="left">
                                    Instances taken / period
                                  </TableCell>
                                  <TableCell align="left">
                                    Hrs per instance
                                  </TableCell>
                                  <TableCell align="left">Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {formik.values.activities?.map((item, i) => {
                                  return (
                                    <StyledTableRow key={i}>
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
                                                name: `activities.${i}.f2f`,
                                                value: newValue?.value,
                                              },
                                            };
                                            formik.setFieldTouched(
                                              `activities.${i}.f2f`
                                            );
                                            formik.handleChange(e);
                                            formik.setFieldValue(
                                              `activities.${i}.f2f`,
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
                                                  formik.values.activities[i]
                                                    ?.f2f
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
                                              name={`activities.${i}.f2f`}
                                              key={`activities.${i}.f2f`}
                                              error={
                                                formik?.touched.activities?.[i]
                                                  ?.f2f &&
                                                (Boolean(
                                                  formik?.errors?.activities?.[i]
                                                    ?.f2f
                                                ) as any)
                                              }
                                              label="f2f"
                                            />
                                          )}
                                        />
                                        {/* <TextField
                                         disabled={view}
                                          type="text"
                                          placeholder="F2F or equivalent teaching activity"
                                          id="outlined-start-adornment"
                                          name={`activities.${i}.f2f`}
                                          fullWidth
                                          value={
                                            formik?.values?.activities?.[i]?.f2f
                                          }
                                          onChange={formik?.handleChange}
                                          onBlur={formik?.handleBlur}
                                          error={
                                            formik?.touched?.activities?.[i]
                                              ?.f2f &&
                                            (Boolean(
                                              formik?.errors?.activities?.[i]
                                                ?.f2f
                                            ) as any)
                                          }
                                        /> */}
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          disabled={view}
                                          type="number"
                                          id="outlined-start-adornment"
                                          name={`activities.${i}.instances`}
                                          fullWidth
                                          value={
                                            formik?.values?.activities?.[i]
                                              ?.instances
                                          }
                                          onChange={formik?.handleChange}
                                          onBlur={formik?.handleBlur}
                                          error={
                                            formik?.touched?.activities?.[i]
                                              ?.instances &&
                                            (Boolean(
                                              formik?.errors?.activities?.[i]
                                                ?.instances
                                            ) as any)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <TextField
                                          disabled={view}
                                          type="number"
                                          id="outlined-start-adornment"
                                          name={`activities.${i}.hourPerInstance`}
                                          fullWidth
                                          value={
                                            formik?.values?.activities?.[i]
                                              ?.hourPerInstance
                                          }
                                          onChange={formik?.handleChange}
                                          onBlur={formik?.handleBlur}
                                          error={
                                            formik?.touched?.activities?.[i]
                                              ?.hourPerInstance &&
                                            (Boolean(
                                              formik?.errors?.activities?.[i]
                                                ?.hourPerInstance
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
                                            {formik.values.activities?.length -
                                              1 ===
                                            i ? (
                                              <Button
                                                disabled={view}
                                                variant="text"
                                                color="primary"
                                                onClick={() =>
                                                  handleAddActivities()
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
              <Grid marginLeft={1} item md={3.9} xs={12}>
                {table}
              </Grid>{" "}
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

export { Form3 };
