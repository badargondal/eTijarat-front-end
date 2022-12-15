import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Box } from "@mui/material";
import { ADMIN, BASE_URL, VENDOR } from "apiRoutes";
import axios from "axios";
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
const CouponRow = ({ seller }) => {
  const approveVendor = async (id) => {
    const response = await axios.put(
      `${BASE_URL + ADMIN + VENDOR}/approve/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response of approved vendor", response.data);
    location.reload();
  };
  const deleteVendor = async (id) => {
    const response = await axios.delete(
      `${BASE_URL + ADMIN + VENDOR}/delete/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response of delete vendor", response.data);
    location.reload();
  };

  console.log("seller", seller);
  const { _id, name, phone, email, published, address, addressVerification } =
    seller;
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
        $1000
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {address}
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {addressVerification}
      </StyledTableCell>
      {/* <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={shopPulish}
          onChange={() => setShopPublish((state) => !state)}
        />
      </StyledTableCell> */}

      <StyledTableCell align="center">
        <StyledIconButton onClick={() => approveVendor(_id)}>
          <VerifiedIcon />
        </StyledIconButton>

        <StyledIconButton>
          <Delete onClick={() => deleteVendor(_id)} />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CouponRow;
