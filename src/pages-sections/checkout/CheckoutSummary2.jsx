import { Box, Divider, Button, TextField, Typography } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
import React from "react";
import { useAppContext } from "contexts/AppContext";
import axios from "axios";
import { BASE_URL } from "apiRoutes";
import { useState } from "react";
const CheckoutSummary2 = () => {
  const { state } = useAppContext();
  const [Voucher, setVoucher] = useState(false);
  const [Discount, setDiscount] = useState(0);
  const cartList = state.cart;
  console.log(state.cart);

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const validateVoucher = async () => {
    const voucher = document.getElementById("voucher").value.trim();
    console.log("voucher", voucher);

    const res = await axios
      .post(`${BASE_URL}/products/coupon/${voucher}`, cartList, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      })
      .then(
        (response) => {
          console.log("response voucher match", response.data.coupon);
          if (response.data.coupon) {
            const coupon = response.data.coupon;

            cartList.forEach((item) => {
              console.log(item);
              if (item.id == coupon.productId._id) {
                setVoucher(coupon);
                const discountprice =
                  (coupon.discount * coupon.productId.price) / 100;
                setDiscount(Math.floor(discountprice));
              }
              if (item._id == coupon.productId._id) {
                setVoucher(coupon);
                const discountprice =
                  (coupon.discount * coupon.productId.price) / 100;
                setDiscount(Math.floor(discountprice));
              }
            });
          } else {
            setVoucher(false);
            alert("Coupon is not valid");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Box>
      <Paragraph color="secondary.900" fontWeight={700} mb={2}>
        Your order
      </Paragraph>

      {cartList.map((item) => (
        <FlexBetween mb={1.5} key={item.name}>
          <Paragraph>
            <Span fontWeight="700" fontSize="14px">
              {item.qty}
            </Span>
            x {item.name}
          </Paragraph>
          <Paragraph>${item.price.toFixed(2)}</Paragraph>
        </FlexBetween>
      ))}

      <Divider
        sx={{
          borderColor: "grey.300",
          my: 3,
        }}
      />

      <FlexBetween mb={0.5}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontWeight="700">${getTotalPrice().toFixed(2)}</Paragraph>
      </FlexBetween>

      <FlexBetween mb={3}>
        <Paragraph color="grey.600">Discount:</Paragraph>
        <Paragraph fontWeight="700">-${Discount}</Paragraph>
      </FlexBetween>

      <Divider
        sx={{
          borderColor: "grey.300",
          mb: 1,
        }}
      />

      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph>Total:</Paragraph>
        <Paragraph fontWeight="700">${getTotalPrice() - Discount}</Paragraph>
      </FlexBetween>

      <FlexBox mt={8} gap={2} maxWidth="400px">
        <TextField
          fullWidth
          id="voucher"
          placeholder="Enter voucher code here"
        />
        {Voucher ? (
          <>
            <Button
              variant="contained"
              style={{ color: "white", backgroundColor: "#03c04a" }}
              type="button"
              onClick={validateVoucher}
            >
              Applied
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={validateVoucher}
          >
            Apply
          </Button>
        )}
      </FlexBox>
      {Voucher && (
        <Box style={{ marginTop: "20" }}>
          <Paragraph>
            {`${Voucher.discount}% discount applied on product ${Voucher.productId.title}  `}
          </Paragraph>
        </Box>
      )}
    </Box>
  );
};

export default CheckoutSummary2;
