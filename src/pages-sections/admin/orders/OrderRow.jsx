import { Delete, RemoveRedEye } from "@mui/icons-material";
import currency from "currency.js";
import { useRouter } from "next/router";
import React from "react";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents"; // ========================================================================

// ========================================================================
const OrderRow = ({ order }) => {
  console.log("order", order);
  const {_id, qty, status, products, details } = order;
  const router = useRouter();
  let counter=0
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">{_id}</StyledTableCell>
      
      <StyledTableCell align="left">5{qty}</StyledTableCell>

      {/* <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {purchaseDate}
      </StyledTableCell> */}

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {details.address}
      </StyledTableCell>

      <StyledTableCell align="left">
        {products
          .map((item) => item.price)
          .reduce((acc, amount) => acc + amount)}
        {/*           
        {products.map((item) =>
          currency(item.price, {
            separator: ",",
            precision: 0,
          }).format()
        )} */}
      </StyledTableCell>

      <StyledTableCell align="left">
        <StatusWrapper status={status}>{status}</StatusWrapper>
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/vendor/orders/${_id}`)}>
          <RemoveRedEye />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrderRow;
