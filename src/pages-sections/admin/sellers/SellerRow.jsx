import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import BazaarSwitch from "components/BazaarSwitch";
import { FlexBox } from "components/flex-box";
import { Paragraph, Small } from "components/Typography";
import currency from "currency.js";
import React, { useState } from "react";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../StyledComponents"; // ========================================================================

// ========================================================================
const SellerRow = ({ seller }) => {
  console.log("seller",seller)
  const {
    name,
    phone,
    email,
    balance,
    published,
    shopName,
    package: sellerPackage,
  } = seller;
  const [shopPulish, setShopPublish] = useState(published);
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src="/assets/images/avatars/001-man.svg" alt={name} />
          <Box>
            <Paragraph>{name}</Paragraph>
            <Small color="grey.600">{phone}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      {/* <StyledTableCell align="left">TheBeauty</StyledTableCell> */}

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {email}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {currency(balance, {
          separator: ",",
        }).format()}
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={shopPulish}
          onChange={() => setShopPublish((state) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default SellerRow;
