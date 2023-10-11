import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  MenuItem,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Button, TextField } from "../../../atom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

interface IProps {
  formik: {
    values: {
      partTimeFraction: number;
      percentageLoading: number;
      newStaffAllowance: boolean;
      assistantProfessorAdjustment: boolean;
      numberOfHDRStudents: number;
      secondarySupervision: number;
      grantFTEPercentage: number;
      otherResearchActivity: number;
    };
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: (e: any, v: any) => void;
    touched: {
      partTimeFraction: boolean;
      percentageLoading: boolean;
      newStaffAllowance: boolean;
      assistantProfessorAdjustment: boolean;
      numberOfHDRStudents: boolean;
      grantFTEPercentage: boolean;
      secondarySupervision: boolean;
      otherResearchActivity: boolean;
    };
    errors: {
      partTimeFraction: string;
      percentageLoading: string;
      newStaffAllowance: string;
      assistantProfessorAdjustment: string;
      numberOfHDRStudents: string;
      secondarySupervision: string;
      grantFTEPercentage: string;
      otherResearchActivity: string;
    };
  };
  onClickNext: (done?: boolean) => void;
  table: React.ReactNode;
  loading: boolean;
  onClickPrevious: () => void;
  view: boolean;
}

const Form1: React.FC<IProps> = ({
  formik,
  onClickNext,
  onClickPrevious,
  table,
  loading,
  view,
}) => {
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
                      Specific staffing allowances
                    </Typography>
                  </Grid>
                  <Divider style={{ marginRight: "10px", marginTop: "10px" }} />
                  <Grid item>
                    <Grid container justifyContent={"left"} flexDirection="row">
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
                            Choose part time fraction
                            <Tooltip title="Part time fraction (100% if full time)">
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
                            type="number"
                            disabled={view}
                            id="outlined-start-adornment"
                            name="partTimeFraction"
                            fullWidth
                            value={formik?.values?.partTimeFraction}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.partTimeFraction &&
                              Boolean(formik?.errors?.partTimeFraction)
                            }
                            helperText={
                              formik?.touched?.partTimeFraction &&
                              formik?.errors?.partTimeFraction
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
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
                            Choose Percentage Loading
                            <Tooltip title="Percentage loading (of FTE) for other roles">
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
                            type="number"
                            id="outlined-start-adornment"
                            name="percentageLoading"
                            disabled={view}
                            fullWidth
                            value={formik?.values?.percentageLoading}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.percentageLoading &&
                              Boolean(formik?.errors?.percentageLoading)
                            }
                            helperText={
                              formik?.touched?.percentageLoading &&
                              formik?.errors?.percentageLoading
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
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
                            New Staff allowance?
                            <Tooltip title="Choose if this is a new staff allowance">
                              <InfoIcon
                                fontSize="small"
                                color="info"
                                style={{ marginTop: "4px" }}
                              />
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <ToggleButtonGroup
                            color="primary"
                            value={
                              formik?.values?.newStaffAllowance ? "yes" : "no"
                            }
                            disabled={view}
                            exclusive
                            onChange={(_, value) => {
                              if (value === "yes") {
                                formik.setFieldValue("newStaffAllowance", true);
                              } else {
                                formik.setFieldValue(
                                  "newStaffAllowance",
                                  false
                                );
                              }
                            }}
                            aria-label="text alignment"
                          >
                            <ToggleButton value="yes" aria-label="left aligned">
                              <DoneIcon />
                            </ToggleButton>
                            <ToggleButton value="no" aria-label="centered">
                              <CloseIcon />
                            </ToggleButton>
                          </ToggleButtonGroup>
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
                            Assistant Professor adjustment?
                            <Tooltip title="Assistant Professor adjustment at critical stage of
                            appointment?">
                              <InfoIcon
                                fontSize="small"
                                color="info"
                                style={{ marginTop: "4px" }}
                              />
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <ToggleButtonGroup
                            color="primary"
                            disabled={view}
                            value={
                              formik?.values?.assistantProfessorAdjustment
                                ? "yes"
                                : "no"
                            }
                            exclusive
                            onChange={(_, value) => {
                              if (value === "yes") {
                                formik.setFieldValue(
                                  "assistantProfessorAdjustment",
                                  true
                                );
                              } else {
                                formik.setFieldValue(
                                  "assistantProfessorAdjustment",
                                  false
                                );
                              }
                            }}
                            aria-label="text alignment"
                          >
                            <ToggleButton value="yes" aria-label="left aligned">
                              <DoneIcon />
                            </ToggleButton>
                            <ToggleButton value="no" aria-label="centered">
                              <CloseIcon />
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* research */}
                <Grid
                  container
                  flexDirection="column"
                  style={{ marginTop: "30px" }}
                >
                  <Grid item>
                    <Typography style={{ fontSize: "18px" }}>
                      Research
                    </Typography>
                  </Grid>
                  <Divider style={{ marginRight: "10px", marginTop: "10px" }} />
                  <Grid item>
                    <Grid container justifyContent={"left"} flexDirection="row">
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
                            Number of HDR students
                            <Tooltip title="Number of HDR students as primary supervisor">
                              <InfoIcon
                                fontSize="small"
                                color="info"
                                style={{ marginTop: "4px" }}
                              />
                            </Tooltip>
                          </Typography>
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <Select
                            disabled={view}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={formik?.values?.numberOfHDRStudents}
                            fullWidth
                            name="numberOfHDRStudents"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik?.touched?.numberOfHDRStudents &&
                              Boolean(formik?.errors?.numberOfHDRStudents)
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
                          </Select>
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
                            Total % of Secondary Supervision
                            <Tooltip title="minimum 10% per student">
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
                            name="secondarySupervision"
                            fullWidth
                            value={formik?.values?.secondarySupervision}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.secondarySupervision &&
                              Boolean(formik?.errors?.secondarySupervision)
                            }
                            helperText={
                              formik?.touched?.secondarySupervision &&
                              formik?.errors?.secondarySupervision
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
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
                            Grant FTE percentage:
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
                          <TextField
                            type="number"
                            disabled={view}
                            id="outlined-start-adornment"
                            name="grantFTEPercentage"
                            fullWidth
                            value={formik?.values?.grantFTEPercentage}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.grantFTEPercentage &&
                              Boolean(formik?.errors?.grantFTEPercentage)
                            }
                            helperText={
                              formik?.touched?.grantFTEPercentage &&
                              formik?.errors?.grantFTEPercentage
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
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
                            All Other Research Activities
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
                          <TextField
                            type="number"
                            disabled={view}
                            id="outlined-start-adornment"
                            name="otherResearchActivity"
                            fullWidth
                            value={formik?.values?.otherResearchActivity}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.otherResearchActivity &&
                              Boolean(formik?.errors?.otherResearchActivity)
                            }
                            helperText={
                              formik?.touched?.otherResearchActivity &&
                              formik?.errors?.otherResearchActivity
                            }
                          />
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

export { Form1 };
