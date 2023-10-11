import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { CartProductItem } from "../cartProductItem";
import { NoData } from "../../atom";

const style: any = {
  width: 1000,
  maxHeight: "80vh",
  minHeight: 300,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  bgcolor: "background.paper",
  left: "23%",
  boxShadow: 24,
  padding: "1rem 2rem",
};

export const RequestPartProductModal: React.FC = () => {
  const { isOpen, setModel, productList, submitForQuote } =
    useContext(CartContext);
  const handleClose = () => setModel(false);
  return (
    <>
      <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
        <div style={style}>
          <Grid
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "white",
              width: "100%",
            }}
            paddingY={2}
          >
            <Typography
              variant="h1"
              style={{ fontSize: "1.5rem", fontWeight: "500" }}
            >
              Cart Details
            </Typography>
            <Typography variant="body1">
              {productList.length === 0 ? (
                <NoData message="Your cart is Empty!" />
              ) : (
                `Total Product Count: ${productList.length}`
              )}
            </Typography>
          </Grid>
          {productList.map((data) => {
            return <CartProductItem data={data} />;
          })}
          {!productList.length && (
            <Grid
              container
              alignContent={"center"}
              justifyContent={"center"}
              flexGrow={1}
            >
              <Grid item>
                <Typography color="GrayText">Your cart is Empty!</Typography>
              </Grid>
            </Grid>
          )}
        </div>
        {productList.length > 0 && (
          <Grid
            container
            style={{ justifyContent: "end" }}
            paddingRight={5}
            paddingTop={2}
          >
            <Grid item xs={12} marginBottom={3}>
              <Divider />
            </Grid>
            <Grid item xs={12} marginBottom={3} style={{ textAlign: "end" }}>
              <Button
                variant="text"
                onClick={() => setModel(false)}
                style={{ marginRight: "1.5rem" }}
              >
                Close
              </Button>
              <Button variant="contained" onClick={submitForQuote}>
                Create a Quote
              </Button>
            </Grid>
          </Grid>
        )}
      </Drawer>
    </>
  );
};
