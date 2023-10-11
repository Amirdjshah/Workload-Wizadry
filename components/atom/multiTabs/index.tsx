import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, paddingLeft: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Tabs {
  title: string;
  children: React.ReactElement;
  notification?: number;
}
interface IProps {
  data: Tabs[];
}

const CustomTab: React.FC<IProps> = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          style={{
            background: "#f7f9fc",
          }}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.map((item, index) => {
            return (
              <Tab
                label={item.title}
                // style={{marginLeft: "-15px"}}
                sx={{
                  minHeight: "inherit",
                  fontSize: "0.95rem",
                  textTransform: "none",
                }}
                icon={
                  item.notification ? (
                    <Badge
                      badgeContent={1}
                      color="secondary"
                        style={{ marginLeft: "1rem" }}
                    />
                  ) : undefined
                }
                iconPosition={"end"}
                {...a11yProps(0)}
                key={index}
              />
            );
          })}
        </Tabs>
        {data.map((item, index) => (
          <TabPanel value={value} index={index} key={index}>
            {item.children}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export { CustomTab };
