import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Button } from "../../../atom";

interface IProps {
  formik: {
    values: {
      appointmentType: string;
    };
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: (e: any, v: any) => void;
    touched: {
      appointmentType: boolean;
    };
    errors: {
      appointmentType: string;
    };
  };
  onClickNext: (done?: boolean) => void;
  table: React.ReactNode;
  loading: boolean;
  view: boolean
}

const Form0: React.FC<IProps> = ({ formik, onClickNext, table, loading, view }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Grid
              container
              flexDirection="row"
              justifyContent={"flex-start"}
              width="100%"
            >
              <Grid item md={8} xs={8}>
                <Grid container flexDirection="column">
                  <Grid item>
                    <Typography style={{ fontSize: "18px" }}>
                      Appointment Type
                    </Typography>
                  </Grid>
                  <Divider style={{ marginRight: "10px", marginTop: "10px" }} />
                  <Grid item>
                    <Grid
                      container
                      justifyContent={"flex-left"}
                      alignContent={"center"}
                      alignItems={"center"}
                      style={{ marginTop: "40px" }}
                      flexDirection="row"
                    >
                      <Grid item md={6} xs={12}>
                        <Grid item xs={12} style={{ marginBottom: "5px" }}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#676767",
                              paddingTop: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Choose Appointment Type
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <ToggleButtonGroup
                            value={formik.values.appointmentType}
                            disabled={view}
                            exclusive
                            color="primary"
                            onChange={(_, value) => {
                              if (value === "EF") {
                                formik.setFieldValue("appointmentType", "EF");
                              } else if (value === "ER") {
                                formik.setFieldValue("appointmentType", "ER");
                              } else if (value === "RF") {
                                formik.setFieldValue("appointmentType", "RF");
                              }
                            }}
                            aria-label="text alignment"
                          >
                            <ToggleButton
                              value="EF"
                              aria-label="left aligned"
                              style={{
                                border: "1px solid #ccc",
                              }}
                            >
                              <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                style={{ height: "100px", width: "100px" }}
                              >
                                <Grid item style={{ padding: "5px" }}>
                                  <Typography style={{ fontWeight: "bolder" }}>
                                    EF
                                  </Typography>
                                </Grid>
                                <Divider />
                                <Grid item style={{ padding: "5px" }}>
                                  <Typography style={{ textTransform: "none" }}>
                                    Education Focused
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ToggleButton>
                            <ToggleButton
                              value="ER"
                              aria-label="centered"
                              style={{
                                border: "1px solid #ccc",
                              }}
                            >
                              <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                style={{ height: "100px", width: "100px" }}
                              >
                                <Grid item style={{ padding: "5px" }}>
                                  <Typography style={{ fontWeight: "bolder" }}>
                                    ER
                                  </Typography>
                                </Grid>
                                <Divider />
                                <Grid item style={{ padding: "5px" }}>
                                  <Typography style={{ textTransform: "none" }}>
                                    Education Research
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ToggleButton>
                            <ToggleButton
                              value="RF"
                              aria-label="right aligned"
                              style={{ border: "1px solid #ccc" }}
                            >
                              <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                style={{ height: "100px", width: "100px" }}
                              >
                                <Grid item style={{ padding: "5px" }}>
                                  <Typography style={{ fontWeight: "bolder" }}>
                                    RF
                                  </Typography>
                                </Grid>
                                <Divider />
                                <Grid item style={{ padding: "5px" }}>
                                  <Typography style={{ textTransform: "none" }}>
                                    Research Focused
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid marginLeft={1} item xs={12} md={3.9}>
                {table}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ alignContent: "center" }}>
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

export { Form0 };
