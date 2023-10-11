import PropTypes from "prop-types";
// import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
// import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
// import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import Groups3Icon from "@mui/icons-material/Groups3";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SubjectIcon from '@mui/icons-material/Subject';

import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

export const StudentCard: React.FC<any> = ({ value }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Students
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Groups3Icon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
export const UnitCard: React.FC<any> = ({ value }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Units
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <AutoStoriesIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const SubjectCard: React.FC<any> = ({ value }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Subjects
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <SubjectIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
