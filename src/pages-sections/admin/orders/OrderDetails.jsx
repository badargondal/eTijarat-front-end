import { Delete, Details, KeyboardArrowDown } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import React from "react"; // list data

import { useState, useEffect } from "react";
// import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
// import { VENDOR, BASE_URL } from "../../../src/apiRoutes";
import axios from "axios";
import { BASE_URL, VENDOR } from "apiRoutes";

const products = [
  {
    price: "$250",
    published: true,
    id: "#6ed34Edf65d",
    category: "Gadgets",
    name: "Samsung Galaxy-M1",
    brand: "/assets/images/brands/samsung.png",
    image: "/assets/images/products/samsung.png",
  },
  {
    price: "$10",
    published: true,
    id: "#6ed34Edf65d",
    category: "Grocery",
    name: "Tomatto",
    brand: "/assets/images/brands/brokshire.png",
    image: "/assets/images/products/tomato.png",
  },
  {
    price: "$24",
    published: false,
    id: "#6ed34Edf65d",
    category: "Beauty",
    name: "Boston Round Cream Pack",
    brand: "/assets/images/brands/levis.png",
    image: "/assets/images/products/beauty-cream.png",
  },
];

const updateOrder = async (orderId) => {
  const status = document.getElementById("orderStatus").textContent;
  const res = await axios
    .put(
      `${BASE_URL + VENDOR}/order/update/${orderId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    )
    .then(
      (response) => {
        response;
        console.log("response", response);
        window.location.href = "http://localhost:3000/vendor/orders";
      },
      (error) => {
        console.log(error);
      }
    );
  return res;
};

// const deleteProductfromOrder = async (productId,orderId) => {
//   console.log("pID",productId)

//   const response = await axios.delete(
//     `${BASE_URL + VENDOR}/order/product/${orderId}`,{productId},
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": localStorage.getItem("sessionId"),
//       },
//     }
//   );
//   console.log("response of deleted product from order", response.data);
//   location.reload();
// };
const OrderDetails = () => {
  const router = useRouter();

  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getOrder() : null;
  }, []);

  var getOrder = async () => {
    var url = location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    console.log("id", id);
    const response = await axios.get(`${BASE_URL + VENDOR}/order/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("sessionId"),
      },
    });
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                p: 3,
              }}
            >
              <FlexBox alignItems="center" gap={4}>
                <Paragraph>
                  <Span color="grey.600">Order ID:</Span>
                  {data._id}
                </Paragraph>

                <Paragraph>
                  <Span color="grey.600">Placed on:</Span> 01 Jan, 2021
                </Paragraph>
              </FlexBox>

              <FlexBox
                gap={3}
                my={3}
                flexDirection={{
                  sm: "row",
                  xs: "column",
                }}
              >
                {/* <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  variant="outlined"
                  label="Add Product"
                  placeholder="Type product name"
                /> */}

                <TextField
                  select
                  fullWidth
                  id="orderStatus"
                  color="info"
                  size="medium"
                  label="Order Status"
                  inputProps={{
                    IconComponent: () => (
                      <KeyboardArrowDown
                        sx={{
                          color: "grey.600",
                          mr: 1,
                        }}
                      />
                    ),
                  }}
                >
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </FlexBox>

              {data.products.map((item, index) => (
                <Box
                  my={2}
                  gap={2}
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      md: "1fr 1fr",
                      xs: "1fr",
                    },
                  }}
                >
                  <FlexBox flexShrink={0} gap={1.5} alignItems="center">
                    <Avatar
                      src={"/assets/images/products/beauty-cream.png"}
                      sx={{
                        height: 64,
                        width: 64,
                        borderRadius: "8px",
                      }}
                    />

                    <Box>
                      <H6 mb={1}>{item.title}</H6>

                      <FlexBox alignItems="center" gap={1}>
                        <Paragraph fontSize={14} color="grey.600">
                          {item.price} x
                        </Paragraph>

                        <Box maxWidth={60}>
                          <TextField defaultValue={1} type="number" fullWidth />
                        </Box>
                      </FlexBox>
                    </Box>
                  </FlexBox>

                  <FlexBetween flexShrink={0}>
                    <Paragraph color="grey.600">{item.category}</Paragraph>

                    {/* <IconButton>
                      <Delete
                        sx={{
                          color: "grey.600",
                          fontSize: 22,
                        }}
                        onClick={() => deleteProductfromOrder(item._id,data._id)}
                      />
                    </IconButton> */}
                  </FlexBetween>
                </Box>
              ))}
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Card
              sx={{
                px: 3,
                py: 3,
              }}
            >
              <TextField
                rows={5}
                multiline
                fullWidth
                color="info"
                variant="outlined"
                label="Shipping Address"
                defaultValue={data.details.address}
                sx={{
                  mb: 4,
                }}
              />
              {/* 
              <TextField
                rows={5}
                multiline
                fullWidth
                color="info"
                variant="outlined"
                label="Customer’s Note"
                defaultValue="Please deliver ASAP."
              /> */}
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Card
              sx={{
                px: 3,
                py: 4,
              }}
            >
              <H5 mt={0} mb={2}>
                Total Summary
              </H5>

              {/* <FlexBetween mb={1.5}>
                <Paragraph color="grey.600">Subtotal:</Paragraph>
                <H6>
        123
                </H6>
              </FlexBetween> */}
              {/* 
              <FlexBetween mb={1.5}>
                <Paragraph color="grey.600">Shipping fee:</Paragraph>

                <FlexBox alignItems="center" gap={1} maxWidth={100}>
                  <Paragraph>$</Paragraph>
                  <TextField
                    color="info"
                    defaultValue={10}
                    type="number"
                    fullWidth
                  />
                </FlexBox>
              </FlexBetween> */}

              {/* <FlexBetween mb={1.5}>
                <Paragraph color="grey.600">Discount:</Paragraph>

                <FlexBox alignItems="center" gap={1} maxWidth={100}>
                  <Paragraph>$</Paragraph>
                  <TextField
                    color="info"
                    defaultValue={20}
                    type="number"
                    fullWidth
                  />
                </FlexBox>
              </FlexBetween> */}

              <Divider
                sx={{
                  my: 2,
                }}
              />

              <FlexBetween mb={2}>
                <H6>Total</H6>
                <H6>
                  {/* {data.products
                    .map((item) => item.price * item.qty)
                    .reduce((acc, amount) => acc + amount)} */}
                  5000
                </H6>
              </FlexBetween>

              <Paragraph>Paid by Credit/Debit Card</Paragraph>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="info"
              onClick={() => updateOrder(data._id)}
            >
              Save Changes
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="info"
              onClick={() => router.push("/vendor/products/create")}
            >
              Add Product Variation
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default OrderDetails;
