import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button, TextField } from "../../../atom";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";


interface IProps {
  formik: {
    values: {
      profDevAdjustment: number;
      reflectiveAdjustment: number;
      maxF2FAdjustment: number;
      teachingRelatedAdjustment: number;
      researchAdjustment: number;
      serviceAdjustment: number;
      otherAdjustment: number;
      appointmentType: string;
      comment: string;
    };
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: (e: any, v: any) => void;
    touched: {
      profDevAdjustment: boolean;
      reflectiveAdjustment: boolean;
      maxF2FAdjustment: boolean;
      teachingRelatedAdjustment: boolean;
      researchAdjustment: boolean;
      serviceAdjustment: boolean;
      otherAdjustment: boolean;
      appointmentType: boolean;
      comment: boolean;
    };
    errors: {
      profDevAdjustment: string;
      reflectiveAdjustment: string;
      maxF2FAdjustment: string;
      teachingRelatedAdjustment: string;
      researchAdjustment: string;
      serviceAdjustment: string;
      otherAdjustment: string;
      appointmentType: string;
      comment: string;
    };
  };
  onClickNext: (done?: boolean) => void;
  onClickPrevious: () => void;
  table: React.ReactNode;
  loading: boolean;
  view: boolean;
}

const Form5: React.FC<IProps> = ({
  formik,
  onClickNext,
  onClickPrevious,
  table,
  loading,
  view,
}) => {
  const adjustmentsTotal =
    Number(formik.values.profDevAdjustment || 0) +
    Number(formik.values.reflectiveAdjustment || 0) +
    Number(formik.values.maxF2FAdjustment || 0) +
    Number(formik.values.teachingRelatedAdjustment || 0) +
    Number(formik.values.researchAdjustment || 0) +
    Number(formik.values.serviceAdjustment || 0) +
    Number(formik.values.otherAdjustment || 0);
  const adjustmentTotalShouldBeZero = adjustmentsTotal === 0;
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid container marginBottom={2}>
              <Grid
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {!adjustmentTotalShouldBeZero && (
                  <Alert severity="error">
                    Total of workload adjustments hours should be 0.
                  </Alert>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={8} xs={12}>
                <Grid container flexDirection="column">
                  <Grid item>
                    <Typography style={{ fontSize: "18px" }}>
                      Workload Adjustments
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
                            Professional Development Hours
                            <Tooltip title="">
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
                            name="profDevAdjustment"
                            fullWidth
                            value={formik?.values?.profDevAdjustment}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.profDevAdjustment &&
                              Boolean(formik?.errors?.profDevAdjustment)
                            }
                            helperText={
                              formik?.touched?.profDevAdjustment &&
                              formik?.errors?.profDevAdjustment
                            }
                          />
                        </Grid>
                      </Grid>
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
                            Reflective Hours
                            <Tooltip title="">
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
                            name="reflectiveAdjustment"
                            fullWidth
                            value={formik?.values?.reflectiveAdjustment}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.reflectiveAdjustment &&
                              Boolean(formik?.errors?.reflectiveAdjustment)
                            }
                            helperText={
                              formik?.touched?.reflectiveAdjustment &&
                              formik?.errors?.reflectiveAdjustment
                            }
                          />
                        </Grid>
                      </Grid>
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
                            Max F2F Hours
                            <Tooltip title="">
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
                            name="maxF2FAdjustment"
                            fullWidth
                            value={formik?.values?.maxF2FAdjustment}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.maxF2FAdjustment &&
                              Boolean(formik?.errors?.maxF2FAdjustment)
                            }
                            helperText={
                              formik?.touched?.maxF2FAdjustment &&
                              formik?.errors?.maxF2FAdjustment
                            }
                          />
                        </Grid>
                      </Grid>
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
                            Teaching Related Hours
                            <Tooltip title="">
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
                            name="teachingRelatedAdjustment"
                            fullWidth
                            value={formik?.values?.teachingRelatedAdjustment}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.teachingRelatedAdjustment &&
                              Boolean(formik?.errors?.teachingRelatedAdjustment)
                            }
                            helperText={
                              formik?.touched?.teachingRelatedAdjustment &&
                              formik?.errors?.teachingRelatedAdjustment
                            }
                          />
                        </Grid>
                      </Grid>
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
                            Research Hours
                            <Tooltip title="">
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
                            name="researchAdjustment"
                            fullWidth
                            value={formik?.values?.researchAdjustment}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.researchAdjustment &&
                              Boolean(formik?.errors?.researchAdjustment)
                            }
                            helperText={
                              formik?.touched?.researchAdjustment &&
                              formik?.errors?.researchAdjustment
                            }
                          />
                        </Grid>
                      </Grid>
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
                            Service Hours
                            <Tooltip title="">
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
                            name="serviceAdjustment"
                            fullWidth
                            value={formik?.values?.serviceAdjustment}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.serviceAdjustment &&
                              Boolean(formik?.errors?.serviceAdjustment)
                            }
                            helperText={
                              formik?.touched?.serviceAdjustment &&
                              formik?.errors?.serviceAdjustment
                            }
                          />
                        </Grid>
                      </Grid>

                      {formik?.values?.appointmentType === "ER" && (
                        <>
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
                                Other Hours
                                <Tooltip title="">
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
                                name="otherAdjustment"
                                fullWidth
                                value={formik?.values?.otherAdjustment}
                                onChange={formik?.handleChange}
                                onBlur={formik?.handleBlur}
                                error={
                                  formik?.touched?.otherAdjustment &&
                                  Boolean(formik?.errors?.otherAdjustment)
                                }
                                helperText={
                                  formik?.touched?.otherAdjustment &&
                                  formik?.errors?.otherAdjustment
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid item md={6} xs={0} />
                        </>
                      )}
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
                            Write your notes here
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <TextareaAutosize
                            style={{
                              padding: "10px",
                              width: "100%",
                              background: "transparent",
                              fontSize: "16px",
                              fontFamily: "inherit",
                            }}
                            value={formik.values.comment}
                            disabled={view}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxRows={10}
                            minRows={5}
                            placeholder="Enter your comment here"
                            name="comment"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid marginLeft={1} item md={3.9} xs={12}>
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
              {!view && (
                <Button
                  disabled={!adjustmentTotalShouldBeZero}
                  variant="contained"
                  onClick={() => onClickNext(true)}
                >
                  {loading ? (
                    <CircularProgress size={24} style={{ color: "#fff" }} />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              )}
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export { Form5 };
