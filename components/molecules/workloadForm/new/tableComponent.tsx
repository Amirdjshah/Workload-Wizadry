import styled from "@emotion/styled";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  IFormikValues,
  WorkloadTableData,
  getConfigValue,
  getMaxF2F1,
  getOther1,
  getResearch1,
  getService1,
  getTeachingRelated1,
  getTotal0,
} from "../utils";
import { useConfig } from "../../../../lib/hooks/config";
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

interface IProps {
  tableData: WorkloadTableData;
  formData: IFormikValues;
  modal?: boolean;
}

const TableComponent: React.FC<IProps> = ({ tableData, formData, modal }) => {
  const { config, loading } = useConfig();
  const total0 = getTotal0(tableData);

  const maxF2F1 = getMaxF2F1(tableData, formData, total0);
  const teachingRelated1 = getTeachingRelated1(tableData, formData, total0);
  const research1 = getResearch1(tableData, formData, total0);
  const service1 = getService1(tableData, formData, total0);
  const other1 = getOther1(tableData, formData, total0);
  const loading1 = (total0 * formData.percentageLoading) / 100;
  const profDev1 = (tableData?.profDev0 * formData.partTimeFraction) / 100;
  const reflective1 =
    (tableData?.reflective0 * formData.partTimeFraction) / 100;

  let maxF2f4 = 0;
  let teachingRelated4 = 0;
  let research4 = 0;

  research4 += Number(formData?.otherResearchActivity || 0);

  const teachingRelated = getConfigValue("teachingRelated", config, 1.5);
  const maxF2f4Value = getConfigValue("f2fHourCreditNewStaff", config, 35);
  const assistantProfessorCriticalValue = getConfigValue(
    "f2fHourCreditAssistantProfessorCritical",
    config,
    72
  );
  const primarySupervisionValue = getConfigValue(
    "researchPrimarySupervision",
    config,
    50
  );
  const capstoneValue = getConfigValue(
    "f2fHourCreditCapstoneResearchProj",
    config,
    6
  );
  const honoredSupervisedValue = getConfigValue(
    "f2fHourCreditHonoursSupervision",
    config,
    24
  );
  const newUnitValue = getConfigValue("f2fHourCreditNewUnit", config, 56);
  const moderationsValue = getConfigValue("f2fHourCreditModeration", config, 4);
  const moderationLargeUnitValue = getConfigValue(
    "f2fHourCreditModerationLargeUnit",
    config,
    4,
    true
  );
  const f2fHourCredit = getConfigValue("f2fHourCredit", config, 4, true);
  const f2fHourCreditMultiModal = getConfigValue(
    "f2fHourCreditMultiModal",
    config,
    0.1
  );
  const f2fHourCreditTeamTeaching = getConfigValue(
    "f2fHourCreditTeamTeaching",
    config,
    3
  );
  const f2fHourCreditSignificantRevision = getConfigValue(
    "f2fHourCreditSignificantRevision",
    config,
    4
  );

  if (formData?.newStaffAllowance) {
    const maxF2F4Val = Number(maxF2f4Value);
    maxF2f4 += Number(maxF2F4Val);
    teachingRelated4 = maxF2F4Val * teachingRelated;
  }
  if (formData?.assistantProfessorAdjustment) {
    const assistantProfVal = Number(assistantProfessorCriticalValue);
    maxF2f4 += Number(assistantProfVal);
    teachingRelated4 += assistantProfVal * teachingRelated;
  }

  //   number of hdr students as supervised
  research4 += primarySupervisionValue * formData?.numberOfHDRStudents;
  research4 += (primarySupervisionValue * formData?.secondarySupervision) / 100;
  research4 += (total0 * formData?.grantFTEPercentage) / 100;

  //   3cp 6cp 12cp
  const cpTotalValue =
    (formData?.cp3 + formData?.cp6 * 2 + formData?.cp12 * 4) * capstoneValue;
  maxF2f4 += Number(cpTotalValue);
  teachingRelated4 += cpTotalValue * teachingRelated;

  //   no of full time 24 cp honoured students supervised
  const newUnitValueCalculated =
    newUnitValue * formData?.newUnitsBeingDeveloped;
  maxF2f4 += Number(newUnitValueCalculated);
  teachingRelated4 += newUnitValueCalculated * teachingRelated;

  //   supervised value
  const superVisedValue =
    honoredSupervisedValue * formData?.fullTimeStudentsSupervised;
  maxF2f4 += Number(superVisedValue);
  teachingRelated4 += superVisedValue * teachingRelated;

  //   if ef add 65
  const { value, meta } = getConfigValue("f2fHourCreditTSI", config, 65, true);
  if (formData?.appointmentType === meta?.for) {
    maxF2f4 += Number(value);
    teachingRelated4 += parseInt(value) * teachingRelated;
  }

  //   moderations
  const moderations = formData?.moderations;
  if (moderations && moderations?.length > 0) {
    let totalModerationValueForF2F = 0;
    let totalModerationValueForTeaching = 0;
    const data = moderations?.map((moderation, i) => {
      const noOfStudents = moderation?.noOfStudents;
      try {
        const noOfStudentsInNumber = Number(noOfStudents);
        if (noOfStudentsInNumber > 0) {
          const moderationValueForF2F =
            Number(moderationsValue) +
            Math.ceil(
              Math.max(
                noOfStudentsInNumber -
                  Number(moderationLargeUnitValue?.meta?.above || 150),
                0
              ) / Number(moderationLargeUnitValue?.meta?.per || 50)
            ) *
              Number(moderationLargeUnitValue?.value || 0.5);

          const moderationValueForTeaching =
            moderationValueForF2F * teachingRelated;
          totalModerationValueForF2F += Number(moderationValueForF2F);
          totalModerationValueForTeaching += moderationValueForTeaching;
        }
      } catch (e) {}
    });

    maxF2f4 += Number(totalModerationValueForF2F);
    teachingRelated4 += totalModerationValueForTeaching;
  }

  //   teaching activities
  const activities = formData?.activities;
  if (activities && activities?.length > 0) {
    let totalActivitiesValueForF2F = 0;
    let totalActivitiesValueForTeaching = 0;
    const data = activities?.map((activity, i) => {
      const instances = activity?.instances;
      const hourPerInstance = activity?.hourPerInstance;
      try {
        const instancesNumber = Number(instances);
        const hourPerInstanceNumber = Number(hourPerInstance);
        if (instancesNumber > 0 && hourPerInstanceNumber > 0) {
          const activityValueForF2F = instancesNumber * hourPerInstanceNumber;
          const activityValueForTeaching =
            activityValueForF2F * teachingRelated;
          totalActivitiesValueForF2F += Number(activityValueForF2F);
          totalActivitiesValueForTeaching += Number(activityValueForTeaching);
        }
      } catch (e) {}
    });

    maxF2f4 += Number(totalActivitiesValueForF2F);
    teachingRelated4 += totalActivitiesValueForTeaching;
  }
  // units
  const units = formData?.units;
  if (units && units?.length > 0) {
    let totalUnitConveningMaxF2F = 0;
    let totalUnitConveningTeaching = 0;
    let totalMultiModalMaxF2F = 0;
    let totalMultiModalTeaching = 0;
    let totalTeamTeachingMaxF2F = 0;
    let totalTeamTeachingTeaching = 0;
    let totalSignificantRevisionMaxF2F = 0;
    let totalSignificantRevisionTeaching = 0;
    let totalNewVideosMaxF2F = 0;
    let totalNewVideosTeaching = 0;
    const data = units?.map((unit, i) => {
      try {
        const unitConvening = unit?.unit_convening;
        let totalUnitConveningValue = 0;
        if (unitConvening) {
          const subjects = unit?.subjects;
          const allSubjectsStudentsSum = subjects?.reduce(
            (acc, subject) => acc + Number(subject?.students),
            0
          );
          const allSubjectsStudentsSumNumber = Number(allSubjectsStudentsSum);
          const unitConveningValue = unit?.co_convening_fraction;
          const unitConveningValueNumber = Number(unitConveningValue) / 100;

          totalUnitConveningValue =
            unitConveningValueNumber *
            Math.ceil(
              allSubjectsStudentsSumNumber /
                Number(f2fHourCredit?.meta?.perStudent)
            ) *
            Number(f2fHourCredit?.value);

          totalUnitConveningMaxF2F += Number(totalUnitConveningValue);
          totalUnitConveningTeaching +=
            Number(totalUnitConveningValue) * teachingRelated;
        }

        const multiModal = unit?.multi_modal;
        if (multiModal) {
          const multiModalValue =
            totalUnitConveningValue * f2fHourCreditMultiModal;
          totalMultiModalMaxF2F += Number(multiModalValue.toFixed(1));
          totalMultiModalTeaching +=
            Number(multiModalValue.toFixed(1)) * teachingRelated;
        }
        const teamTeaching = unit?.team_teaching;
        if (teamTeaching) {
          const teamTeachingValue = f2fHourCreditTeamTeaching;
          totalTeamTeachingMaxF2F += Number(teamTeachingValue.toFixed(1));
          totalTeamTeachingTeaching +=
            Number(teamTeachingValue.toFixed(1)) * teachingRelated;
        }

        const significantRevision = unit?.significant_revision;
        if (significantRevision) {
          const significantRevisionValue =
            Number(unit.no_of_week_revised) * f2fHourCreditSignificantRevision;
          totalSignificantRevisionMaxF2F += Number(
            significantRevisionValue.toFixed(1)
          );
          totalSignificantRevisionTeaching +=
            Number(significantRevisionValue.toFixed(1)) * teachingRelated;
        }

        const newVideos = unit?.new_videos;
        if (newVideos) {
          const newVideosValue = Number(unit.new_videos_hours);
          totalNewVideosMaxF2F += Number(newVideosValue.toFixed(1));
          totalNewVideosTeaching +=
            Number(newVideosValue.toFixed(1)) * teachingRelated;
        }
      } catch (e) {}
    });

    const totalCotaughtValueForMaxF2F = totalUnitConveningMaxF2F * 0.1;
    const totalCotaughtValueForTeaching =
      totalCotaughtValueForMaxF2F * teachingRelated;
    maxF2f4 += Number(totalUnitConveningMaxF2F);
    teachingRelated4 += Number(totalUnitConveningTeaching);
    maxF2f4 += Number(totalCotaughtValueForMaxF2F);
    teachingRelated4 += Number(totalCotaughtValueForTeaching);
    maxF2f4 += Number(totalMultiModalMaxF2F);
    teachingRelated4 += Number(totalMultiModalTeaching);
    maxF2f4 += Number(totalTeamTeachingMaxF2F);
    teachingRelated4 += Number(totalTeamTeachingTeaching);
    maxF2f4 += Number(totalSignificantRevisionMaxF2F);
    teachingRelated4 += Number(totalSignificantRevisionTeaching);
    maxF2f4 += Number(totalNewVideosMaxF2F);
    teachingRelated4 += Number(totalNewVideosTeaching);
  }

  //   workload adjustments total
  const workloadAdjTotal = (
    (formData?.profDevAdjustment || 0) +
    (formData?.reflectiveAdjustment || 0) +
    (formData?.maxF2FAdjustment || 0) +
    (formData?.teachingRelatedAdjustment || 0) +
    (formData?.researchAdjustment || 0) +
    (formData?.serviceAdjustment || 0) +
    (formData?.otherAdjustment || 0)
  ).toFixed(1);

  // nominal total
  const nominalTotal = (
    loading1 +
    profDev1 +
    reflective1 +
    maxF2F1 +
    teachingRelated1 +
    research1 +
    service1 +
    other1
  ).toFixed(1);

  const profDev3 = (profDev1 + (formData?.profDevAdjustment || 0)).toFixed(1);
  const reflective3 = (
    reflective1 + (formData?.reflectiveAdjustment || 0)
  ).toFixed(1);
  const maxF2F3 = (maxF2F1 + (formData?.maxF2FAdjustment || 0)).toFixed(1);
  const teachingRelated3 = (
    teachingRelated1 + (formData?.teachingRelatedAdjustment || 0)
  ).toFixed(1);
  const research3 = (research1 + (formData?.researchAdjustment || 0)).toFixed(
    1
  );
  const service3 = (service1 + (formData?.serviceAdjustment || 0)).toFixed(1);
  const other3 = (other1 + (formData?.otherAdjustment || 0)).toFixed(1);

  // workload target total
  const workloadTargetTotal =
    Number(loading1) +
    Number(profDev3) +
    Number(reflective3) +
    Number(maxF2F3) +
    Number(teachingRelated3) +
    Number(research3) +
    Number(service3) +
    Number(other3);

  // calculate total
  const calculatedTotal = (
    Number(loading1) +
    Number(profDev1) +
    Number(reflective1) +
    Number(maxF2f4) +
    Number(teachingRelated4) +
    Number(research4) +
    Number(service1)
  ).toFixed(1);

  return (
    <TableContainer
      component={Paper}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <Table
        aria-label="simple table"
        stickyHeader
        style={{
          //   display: "flex",
          justifyContent: "center",
          overflow: "auto",
          width: "100%",
        }}
      >
        <TableHead>
          <TableRow style={{ background: "#e0edee", overflowX: "scroll" }}>
            <TableCell align="left"></TableCell>
            <TableCell align="left">
              Loading
              {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}
            </TableCell>
            <TableCell align="left">Prof Dev
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Reflective
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Max F2F
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Teaching Related
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Research
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Service/LDSHP
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Other (ER Only)
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
            <TableCell align="left">Annual Total
            {modal && (
                <Tooltip title="">
                  <InfoIcon
                    fontSize="small"
                    color="info"
                    style={{ marginTop: "4px" }}
                  />
                </Tooltip>
              )}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <TableCell>Workload Hours</TableCell>
            <TableCell>{tableData?.loading0 || "-"}</TableCell>
            <TableCell>{tableData?.profDev0}</TableCell>
            <TableCell>{tableData?.reflective0}</TableCell>
            <TableCell>{tableData?.maxF2F0}</TableCell>
            <TableCell>{tableData?.teachingRelated0}</TableCell>
            <TableCell>{tableData?.research0}</TableCell>
            <TableCell>{tableData?.service0}</TableCell>
            <TableCell>{tableData?.other0}</TableCell>
            <TableCell>{total0}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Nominal Workload</TableCell>
            <TableCell>{loading1.toFixed(1)}</TableCell>
            <TableCell>{profDev1.toFixed(1)}</TableCell>
            <TableCell>{reflective1.toFixed(1)}</TableCell>
            <TableCell>{maxF2F1.toFixed(1)}</TableCell>
            <TableCell>{teachingRelated1.toFixed(1)}</TableCell>
            <TableCell>{research1.toFixed(1)}</TableCell>
            <TableCell>{service1.toFixed(1)}</TableCell>
            <TableCell>{other1.toFixed(1)}</TableCell>
            <TableCell>{nominalTotal}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Workload Adjustments</TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              {formData?.profDevAdjustment ? formData?.profDevAdjustment : "-"}
            </TableCell>
            <TableCell>
              {formData?.reflectiveAdjustment
                ? formData?.reflectiveAdjustment
                : "-"}
            </TableCell>
            <TableCell>
              {formData?.maxF2FAdjustment ? formData?.maxF2FAdjustment : "-"}
            </TableCell>
            <TableCell>
              {formData?.teachingRelatedAdjustment
                ? formData?.teachingRelatedAdjustment
                : "-"}
            </TableCell>
            <TableCell>
              {formData?.researchAdjustment
                ? formData?.researchAdjustment
                : "-"}
            </TableCell>
            <TableCell>
              {formData?.serviceAdjustment ? formData?.serviceAdjustment : "-"}
            </TableCell>
            <TableCell>
              {formData?.otherAdjustment ? formData?.otherAdjustment : "-"}
            </TableCell>
            <TableCell>{workloadAdjTotal}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Workload Target</TableCell>
            <TableCell>{loading1.toFixed(1) || "-"}</TableCell>
            <TableCell>{profDev3 || "-"}</TableCell>
            <TableCell>{reflective3 || "-"}</TableCell>
            <TableCell>{maxF2F3 || "-"}</TableCell>
            <TableCell>{teachingRelated3 || "-"}</TableCell>
            <TableCell>{research3 || "-"}</TableCell>
            <TableCell>{service3 || "-"}</TableCell>
            <TableCell>{other3 || "-"}</TableCell>
            <TableCell>{workloadTargetTotal.toFixed(1) || "-"}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell>Calculated Amount</TableCell>
            <TableCell>{loading1.toFixed(1) || "-"}</TableCell>
            <TableCell>{profDev1.toFixed(1) || "-"}</TableCell>
            <TableCell>{reflective1.toFixed(1) || "-"}</TableCell>
            <TableCell>{maxF2f4.toFixed(1) || "-"}</TableCell>
            <TableCell>{teachingRelated4.toFixed(1) || "-"}</TableCell>
            <TableCell>{research4 || "-"}</TableCell>
            <TableCell>
              {(service1 + (formData?.serviceAdjustment || 0)).toFixed(1)}
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>{calculatedTotal}</TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableComponent };
