import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { BASE_URL,VENDOR } from "apiRoutes";
import BazaarSwitch from "components/BazaarSwitch";
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
import currency from "currency.js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import {
  CategoryWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents"; // ========================================================================

// ========================================================================
const ProductRow = ({ product }) => {
  const { category, title, price, imgUrl, stock, brand, _id, published } =
    product; // state

  const router = useRouter();
  const [productPulish, setProductPublish] = useState(published);


  const deleteAddress = async (id) => {
    const response = await axios.delete(
      `${BASE_URL + VENDOR}/product/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response of deleted product", response.data);
    location.reload();
  };


  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar
            src={imgUrl}
            sx={{
              borderRadius: "8px",
            }}
          />
          <Box>
            <Paragraph>{title}</Paragraph>
            <Small color="grey.600">#{_id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>
{/* 
      <StyledTableCell align="left">
        <Avatar
          src={brand}
          sx={{
            width: 55,
            height: "auto",
            borderRadius: 0,
          }}
        />
      </StyledTableCell> */}

      <StyledTableCell align="left">
        {currency(price, {
          separator: ",",
        }).format()}
      </StyledTableCell>
      <StyledTableCell align="left">{stock}</StyledTableCell>

      {/* <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={() => setProductPublish((state) => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/vendor/products/${_id}`)}>
          <Edit />
        </StyledIconButton>

        {/* <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton> */}

        <StyledIconButton onClick={() => deleteAddress(product._id)}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ProductRow;
