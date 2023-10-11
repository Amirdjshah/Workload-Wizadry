import React, { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ReferenceLine,
  ResponsiveContainer,
  ScatterChart,
} from "recharts";
import { modeLabelMap } from "../utils";

interface IProps {
  data: any;
}
interface IPropsColor {
  data: any;
  index: number;
  customWidth?: number;
  customHeight?: number;
}
const HEIGHT = 300;
const WIDTH = 350;

const AppointmentTypeChart: React.FC<IPropsColor> = ({
  data,
  index,
  customWidth,
  customHeight,
}) => {
  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];
  const barColors2 = ["#aec7e8", "#ffbb78", "#98df8a"];
  const barColors3 = ["#d62728", "#9467bd", "#8c564b"];

  const getRandomColor = (i: any) => {
    switch (index) {
      case 0:
        return barColors[i % 20];
      case 1:
        return barColors2[i % 20];
      case 2:
        return barColors3[i % 20];
      default:
        return barColors[i % 20];
    }
  };
  return (
    <div className="appointment-type-chart">
      <BarChart
        width={customWidth || WIDTH}
        height={customHeight || HEIGHT}
        data={data}
      >
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={"#8884d8"}>
          {data.map((entry: any, i: any) => (
            <Cell key={`cell-${index}`} fill={getRandomColor(i)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

const AppointmentTypePieChart: React.FC<IPropsColor> = ({ data, index }) => {
  const COLORSET1 = ["#0088FE", "#FFBB28", "#FAC"];
  const COLORSET2 = ["#00C49F", "#FF8042", "#E2C"];

  const getRandomColor = (i: any) => {
    if (index === 1) {
      return COLORSET1[i % 20];
    } else {
      return COLORSET2[i % 20];
    }
  };

  return (
    <div className="appointment-type-pie-chart">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry: any, i: any) => (
            <Cell key={`cell-${index}`} fill={getRandomColor(i)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

const AdjustmentStackedBarChart: React.FC<IProps> = ({ data }) => {
  return (
    <div className="adjustment-stacked-bar-chart">
      <BarChart width={WIDTH} height={HEIGHT} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="12" stackId="adjustments" fill="#FFBB28" />
        <Bar dataKey="13" stackId="adjustments" fill="#0088FE" />
        <Bar dataKey="14" stackId="adjustments" fill="#D1D" />
        <Bar dataKey="15" stackId="adjustments" fill="#D31" />
        {/* Add more Bar components for other adjustment types */}
      </BarChart>
    </div>
  );
};

const LineChartAppointmentType: React.FC<IProps> = ({ data }) => {
  return (
    <div className="line-chart-appointment-type">
      <LineChart width={WIDTH} height={HEIGHT} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="instances"
          name="Instances"
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="hoursPerInstance"
          name="Hours per Instance"
          stroke="#82ca9d"
        />
      </LineChart>
    </div>
  );
};

const GroupedBarChart: React.FC<IProps> = ({ data }) => {
  return (
    <div className="grouped-bar-chart">
      <BarChart width={WIDTH} height={HEIGHT} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="reflectiveAdjustment"
          name="Reflective Adjustment"
          fill="#8884d8"
        />
        <Bar
          dataKey="secondarySupervision"
          name="Secondary Supervision"
          fill="#82ca9d"
        />
      </BarChart>
    </div>
  );
};

const StackedBarChart: React.FC<IProps> = ({ data }) => {
  const [deliverModes, setDeliveryModes] = useState<any>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setDeliveryModes(
        Object.keys(data[0]).filter((key) => key !== "unit_code")
      );
    }
  }, [data]);

  const getColorByDeliveryMode = (mode: string) => {
    let color = "#aaaaaa"; // Default color

    switch (mode.toLowerCase()) {
      case "on_campus":
        color = "#007acc";
        break;
      case "flexible":
        color = "#00a65a";
        break;
      case "online":
        color = "#f39c12";
        break;
      case "intensive":
        color = "#d9534f";
        break;
      case "self-paced":
        color = "#5bc0de";
        break;
      case "research":
        color = "#9b59b6";
        break;
      case "online-exam":
        color = "#34495e";
        break;
      case "weekend":
        color = "#d35400";
        break;
      case "evening":
        color = "#8e44ad";
        break;
      case "sponsor":
        color = "#3498db";
        break;
      case "internplace":
        color = "#1abc9c";
        break;
      case "project":
        color = "#27ae60";
        break;
      default:
        color = "#aaaaaa";
        break;
    }

    return color;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="unit_code" />
        <YAxis />
        <Tooltip />
        <Legend />
        {deliverModes.map((mode: string) => (
          <Bar
            key={mode}
            dataKey={mode}
            stackId="a"
            fill={getColorByDeliveryMode(mode)}
            name={modeLabelMap[mode]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const DeliveryModePieChart: React.FC<IProps> = ({ data }) => {
  const COLORSET1 = [
    "#0088FE",
    "#FFBB28",
    "#FAC",
    "#00C49F",
    "#FF8042",
    "#E2C",
  ];

  const getRandomColor = (i: any) => {
    return COLORSET1[i % 20];
  };
  return (
    <div className="PieChartContainer">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry: any, i: any) => (
            <Cell key={`cell-${i}`} fill={getRandomColor(i)} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      {/* <h1>Delivery Modes</h1>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry: any, index: any) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart> */}
    </div>
  );
};

const ScatterPlotForModerations: React.FC<IProps> = ({ data }) => {
  return (
    <ScatterChart width={800} height={400}>
      <CartesianGrid />
      <XAxis type="number" dataKey="unitCodes" name="Unit Codes" />
      <YAxis type="number" dataKey="noOfStudents" name="Number of Students" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Legend />
      <Scatter name="Moderations" data={data} fill="#8884d8" />
    </ScatterChart>
  );
};

export {
  AppointmentTypeChart,
  AppointmentTypePieChart,
  AdjustmentStackedBarChart,
  LineChartAppointmentType,
  GroupedBarChart,
  StackedBarChart,
  DeliveryModePieChart,
  ScatterPlotForModerations,
};
