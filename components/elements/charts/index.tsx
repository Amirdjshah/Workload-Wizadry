import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IProps {
  data: any;
}
const HEIGHT = 500;
const WIDTH = 1000;
const TotalSpendPerMonthChart: React.FC<IProps> = ({ data }) => {
  return (
    <BarChart
      width={WIDTH}
      height={HEIGHT}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalSpend" fill="#8884d8" />
    </BarChart>
  );
};

const OrderTrendOverTimeChart: React.FC<IProps> = ({ data }) => {
  return (
    <LineChart
      width={WIDTH}
      height={HEIGHT}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="orderCount" stroke="#8884d8" />
    </LineChart>
  );
};

const TotalProductQuantityPerMonthChart: React.FC<IProps> = ({ data }: any) => {
  return (
    <BarChart
      width={WIDTH}
      height={HEIGHT}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalQuantity" fill="#8884d8" />
    </BarChart>
  );
};

const OrderCountAndAmountOverTimeChart: React.FC<IProps> = ({ data }: any) => {
  return (
    <LineChart
      width={WIDTH}
      height={HEIGHT}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend
        payload={[
          {
            value: "Order Count",
            type: "line",
            id: "orderCount",
            color: "#8884d8",
          },
          {
            value: "Total Amount",
            type: "line",
            id: "totalAmount",
            color: "#82ca9d",
          },
        ]}
      />
      <Line
        type="monotone"
        dataKey="orderCount"
        yAxisId="left"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        dataKey="totalAmount"
        yAxisId="right"
        stroke="#1add82"
      />
    </LineChart>
  );
};

const RecentPurchasedProductTable: React.FC<any> = ({
  recentPurchasesData,
}) => {
  // Sort products by spending in descending order
  const sortedProducts = recentPurchasesData
    ?.slice()
    ?.sort((a: any, b: any) => b.amount_total - a.amount_total);

  // Show only the top 10 products
  const top10Products = sortedProducts?.slice(0, 10);

  return (
    <div>
      <TableContainer component={Paper} style={{ background: "transparent" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Total Spend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10Products?.map((purchase: any) => (
              <TableRow key={purchase?.id} hover>
                <TableCell style={{ maxWidth: "500px" }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`/product/${purchase?.order_line?.[0]?.product_template_id}`}
                  >
                    {purchase.order_line?.[0]?.product_id?.name}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  SAR {purchase?.amount_total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export {
  OrderCountAndAmountOverTimeChart,
  OrderTrendOverTimeChart,
  TotalSpendPerMonthChart,
  TotalProductQuantityPerMonthChart,
  RecentPurchasedProductTable,
};
