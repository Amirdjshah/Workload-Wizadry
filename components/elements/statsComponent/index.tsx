import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Typography,
  useStepContext,
} from "@mui/material";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
// import { fetchAllOrder } from "../../../lib";
import { useQuery } from "@tanstack/react-query";
import { IOrderResponse } from "../../../interfaces/dataInterface";
import { AuthContext } from "../../context/authContext";
import {
  calculateAverageOrderAmount,
  calculateTotalProductOrdered,
  calculateTotalSpend,
} from "../../utils";
import {
  OrderCountAndAmountOverTimeChart,
  OrderTrendOverTimeChart,
  TotalProductQuantityPerMonthChart,
  TotalSpendPerMonthChart,
  RecentPurchasedProductTable,
} from "../charts";
import moment from "moment";
import { useSpring, animated } from "react-spring";
import { ExportToExcel } from "../toExcel";

interface IValue {
  value: number;
}

const AnimatedValue: React.FC<IValue> = ({ value }) => {
  const animatedProps = useSpring({
    value,
    from: { value: 0 },
    config: { duration: 2000 },
  });

  return (
    <animated.span>
      {animatedProps.value.interpolate((val) => `${val.toFixed(2)}`)}
    </animated.span>
  );
};

const getStats = (data: IOrderResponse): IStats => {
  return {
    totalSpend: Number(calculateTotalSpend(data.data).toFixed(2)),
    orderPlaced: Number(data.data.count.toFixed(0)),
    productOrdered: Number(calculateTotalProductOrdered(data.data).toFixed(0)),
    averageOrderAmount: Number(
      calculateAverageOrderAmount(data.data).toFixed(2)
    ),
  };
};
interface IStats {
  totalSpend: number;
  orderPlaced: number;
  productOrdered: number;
  averageOrderAmount: number;
}

const initialData = {
  totalSpend: 0,
  orderPlaced: 0,
  productOrdered: 0,
  averageOrderAmount: 0,
};

const TotalYearOrder: React.FC = () => {
  const [stats, setStats] = useState<IStats>(initialData);
  const { currency } = useContext(AuthContext);
  const { isLoading } = useQuery({
    queryKey: ["Fetch Query data"],
    // queryFn: fetchAllOrder,
    // onSuccess: (data) => {
    //   if (Array.isArray(data?.data?.results)) {
    //     setStats(getStats(data));
    //   }
    // },
  });

  return (
    <div style={{ marginLeft: "15px", marginBottom: "15px" }}>
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        gap={2}
        flexWrap={"nowrap"}
      >
        <Grid item flexGrow={1} className={styles.cardWithBorder} flex={1}>
          <Grid item xs={12}>
            <Typography
              fontSize={18}
              fontWeight={500}
              paddingBottom={1}
              paddingLeft={8}
              textAlign={"center"}
            >
              Total Spend
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container flexWrap={"nowrap"}>
              <Grid item paddingRight={2}>
                <PaidTwoToneIcon
                  style={{ width: "4rem", height: "4rem", color: "#059bdb" }}
                />
              </Grid>
              <Grid item flexGrow={1}>
                <Typography
                  fontSize={24}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {currency} <AnimatedValue value={stats.totalSpend} />
                </Typography>
                <Typography textAlign={"center"} color={"gray"}>
                  Spend this month
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item flexGrow={1} className={styles.cardWithBorder} flex={1}>
          <Grid item xs={12}>
            <Typography
              fontSize={18}
              fontWeight={500}
              paddingLeft={8}
              paddingBottom={1}
              textAlign={"center"}
            >
              Total Order Placed
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container flexWrap={"nowrap"}>
              <Grid item paddingRight={2}>
                <ShoppingCartTwoToneIcon
                  style={{ width: "4rem", height: "4rem", color: "#059bdb" }}
                />
              </Grid>
              <Grid item flexGrow={1}>
                <Typography
                  fontSize={17}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  <AnimatedValue value={stats.orderPlaced} /> units
                </Typography>
                <Typography textAlign={"center"} color={"gray"}>
                  order placed
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item flexGrow={1} className={styles.cardWithBorder} flex={1}>
          <Grid item xs={12}>
            <Typography
              fontSize={18}
              fontWeight={500}
              paddingLeft={8}
              paddingBottom={1}
              textAlign={"center"}
            >
              Average Spending
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container flexWrap={"nowrap"}>
              <Grid item paddingRight={2}>
                <BarChartTwoToneIcon
                  style={{ width: "4rem", height: "4rem", color: "#059bdb" }}
                />
              </Grid>
              <Grid item flexGrow={1}>
                <Typography
                  fontSize={24}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {currency} <AnimatedValue value={stats.averageOrderAmount} />
                </Typography>
                <Typography textAlign={"center"} color={"gray"}>
                  on average spending
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item flexGrow={1} className={styles.cardWithBorder} flex={1}>
          <Grid item xs={12}>
            <Typography
              fontSize={18}
              fontWeight={500}
              paddingBottom={1}
              paddingLeft={8}
              textAlign={"center"}
            >
              Total Product Ordered
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container flexWrap={"nowrap"}>
              <Grid item paddingRight={2}>
                <SummarizeTwoToneIcon
                  style={{ width: "4rem", height: "4rem", color: "#059bdb" }}
                />
              </Grid>
              <Grid item flexGrow={1}>
                <Typography
                  fontSize={24}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  <AnimatedValue value={stats.productOrdered} /> Units
                </Typography>
                <Typography textAlign={"center"} color={"gray"}>
                  Product Ordered
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const Overview: React.FC = () => {
  const [timeFrame, setSelectTimeFrame] = useState(0.5);
  const [date, setDate] = useState(
    moment().subtract("week", 1).format("YYYY-MM-DD")
  );
  const [orderResults, setOrderResults] = useState<any>([]);
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["Fetch Query data", date],
    // queryFn: fetchAllOrder,
    // select: (res) => res.data,
    // onSuccess: (data) => {
    //   if (Array.isArray(data?.results)) {
    //     setOrderResults(data?.results);
    //   }
    // },
  });

  useEffect(() => {
    if (timeFrame === 0.5) {
      setDate(moment().subtract("week", 1).format("YYYY-MM-DD"));
    }
    if (timeFrame === 1) {
      setDate(moment().subtract("month", 1).format("YYYY-MM-DD"));
    }
    if (timeFrame === 3) {
      setDate(moment().subtract("month", 3).format("YYYY-MM-DD"));
    }
    if (timeFrame === 6) {
      setDate(moment().subtract("month", 6).format("YYYY-MM-DD"));
    }
    if (timeFrame === 12) {
      setDate(moment().subtract("month", 12).format("YYYY-MM-DD"));
    }
    if (timeFrame === -1) {
      setDate("");
    }
  }, [timeFrame]);

  const totalSpendPerMonthData = orderResults?.reduce(
    (acc: any, order: any) => {
      const date = new Date(order.create_date);
      const month = moment(date).format("YYYY MMM-DD");
      const totalSpend = order.amount_total || 0;

      const existingMonth = acc.find((item: any) => item.month === month);
      if (existingMonth) {
        existingMonth.totalSpend += totalSpend;
      } else {
        acc.push({ month, totalSpend });
      }

      return acc;
    },
    []
  );

  // Prepare data for Order Trend Over Time chart
  const orderTrendOverTimeData = orderResults?.reduce(
    (acc: any, order: any) => {
      const date = new Date(order.create_date);
      const formattedDate = moment(date).format("YYYY MMM-DD");

      const existingDate: any = acc.find(
        (item: any) => item?.date === formattedDate
      );
      if (existingDate) {
        existingDate.orderCount++;
      } else {
        acc.push({ date: formattedDate, orderCount: 1 });
      }

      return acc;
    },
    []
  );

  // Prepare data for Total Product Quantity Ordered per Month chart
  const totalProductQuantityPerMonthData = orderResults?.reduce(
    (acc: any, order: any) => {
      const date = new Date(order.create_date);
      const month = moment(date).format("YYYY MMM-DD");
      const totalQuantity = order.order_line.reduce(
        (total: any, line: any) => total + (line.product_uom_qty || 0),
        0
      );

      const existingMonth = acc.find((item: any) => item.month === month);
      if (existingMonth) {
        existingMonth.totalQuantity += totalQuantity;
      } else {
        acc.push({ month, totalQuantity });
      }
      return acc;
    },
    []
  );

  // Prepare data for Order Count and Amount Over Time chart
  const orderCountAndAmountOverTimeData = orderResults?.reduce(
    (acc: any, order: any) => {
      const date = new Date(order.create_date);
      const formattedDate = moment(date).format("YYYY MMM-DD");

      const existingDateIndex = acc.findIndex(
        (item: any) => item.date === formattedDate
      );
      if (existingDateIndex !== -1) {
        acc[existingDateIndex].orderCount++;
        acc[existingDateIndex].totalAmount += order.amount_total || 0;
      } else {
        acc.push({
          date: formattedDate,
          orderCount: 1,
          totalAmount: order.amount_total || 0,
        });
      }

      return acc;
    },
    []
  );

  const exportData = [{}].map((item: any) => {
    const productData = item?.order_line?.map((product: any, index: number) => {
      return {
        "Product Name": product?.product_id?.name,
        "Product Quantity": product?.product_uom_qty,
        "Product Amount": `${item?.currency_id?.display_name} ${product?.price_total}`,
        "Order ID": item?.display_name,
        "Order Date": item?.date_order,
        "Order By": item?.partner_id?.name,
        Vessel: item?.vessel,
        "Customer Reference": item?.client_order_ref?.name,
        "Order Tax Amount": `${item?.currency_id?.display_name} ${item?.amount_tax}`,
        "Order Total Amount": `${item?.currency_id?.display_name} ${item?.amount_total}`,
        Quantity: item?.cart_quantity,
      };
    });
    return productData;
  });

  const flattern = (arr: any) => {
    return arr?.reduce((flat: any, toFlatten: any) => {
      return flat?.concat(
        Array.isArray(toFlatten) ? flattern(toFlatten) : toFlatten
      );
    }, []);
  };

  let allData = flattern(exportData);
  allData = allData?.map((item: any, index: number) => {
    return { "S.N": index + 1, ...item };
  });

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        container
        justifyContent={"space-between"}
        marginTop={2}
        marginBottom={1}
      >
        <Typography fontSize={20} fontWeight={500} paddingBottom={1}>
          Overview
        </Typography>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            onClick={() => setSelectTimeFrame(0.5)}
            variant={timeFrame === 0.5 ? "contained" : "outlined"}
          >
            1 Week
          </Button>
          <Button
            onClick={() => setSelectTimeFrame(1)}
            variant={timeFrame === 1 ? "contained" : "outlined"}
          >
            1 Month
          </Button>
          <Button
            onClick={() => setSelectTimeFrame(3)}
            variant={timeFrame === 3 ? "contained" : "outlined"}
          >
            3 Month
          </Button>
          <Button
            onClick={() => setSelectTimeFrame(6)}
            variant={timeFrame === 6 ? "contained" : "outlined"}
          >
            6 Month
          </Button>
          <Button
            onClick={() => setSelectTimeFrame(12)}
            variant={timeFrame === 12 ? "contained" : "outlined"}
          >
            1 Year
          </Button>
          <Button
            onClick={() => setSelectTimeFrame(-1)}
            variant={timeFrame === -1 ? "contained" : "outlined"}
          >
            All Time
          </Button>
        </ButtonGroup>
        <ExportToExcel apiData={allData} fileName={"Data"} />
      </Grid>

      <Grid xs={12}>
        <Divider />
      </Grid>
      {/* Order Count and amount  */}
      <Grid item xs={12} padding={2} paddingLeft={0}>
        <div className={styles.cardWithBorder}>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={500} paddingBottom={2}>
              Order Amount over time
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <OrderCountAndAmountOverTimeChart
              data={orderCountAndAmountOverTimeData}
            />
          </Grid>
        </div>
      </Grid>
      {/* Order Count end */}

      {/* Total spend */}
      <Grid item xs={12} padding={2} paddingLeft={0}>
        <div className={styles.cardWithBorder}>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={500} paddingBottom={2}>
              Total Spend Over Time
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <TotalSpendPerMonthChart data={totalSpendPerMonthData} />
          </Grid>
        </div>
      </Grid>
      {/* Total spend */}

      {/* Order Trend over time */}
      <Grid item xs={12} padding={2} paddingLeft={0}>
        <div className={styles.cardWithBorder}>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={500} paddingBottom={2}>
              Order Trend Over Time
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <OrderTrendOverTimeChart data={orderTrendOverTimeData} />
          </Grid>
        </div>
      </Grid>
      {/* Order trend end */}

      {/* Total Product Quantity Per Month */}
      <Grid item xs={12} padding={2} paddingLeft={0}>
        <div className={styles.cardWithBorder}>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={500} paddingBottom={2}>
              Total Product Quantity Over Time
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <TotalProductQuantityPerMonthChart
              data={totalProductQuantityPerMonthData}
            />
          </Grid>
        </div>
      </Grid>
      {/* Total Product Quantity Per Month  END*/}

      {/* Most Purchased Product(s) */}
      <Grid item xs={12} padding={2} paddingLeft={0}>
        <div className={styles.cardWithBorder}>
          <Grid item xs={12}>
            <Typography fontSize={18} fontWeight={500} paddingBottom={2}>
              Most Purchased Product(s)
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <RecentPurchasedProductTable recentPurchasesData={orderResults} />
          </Grid>
        </div>
      </Grid>
      {/* Most Purchased Product(s)  END*/}
    </Grid>
  );
};

export { Overview, TotalYearOrder };
