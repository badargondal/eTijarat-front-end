import {
  Box,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import React from "react";
import api from "utils/api/dashboard"; // table column list

import { ADMIN, BASE_URL, VENDOR } from "../../../src/apiRoutes";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "../../../src/pages-sections/admin";
import { FlexBox } from "../../../src/components/flex-box";
import { Avatar } from "@mui/material";
import { Paragraph, Small } from "../../../src/components/Typography";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import VerifiedIcon from "@mui/icons-material/Verified";
const tableHeading = [
  {
    id: "Coupon Code",
    label: "Coupon Code",
    align: "left",
  },
  {
    id: "Product Id",
    label: "Product Id",
    align: "left",
  },
  {
    id: "discount",
    label: "discount",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

SellerList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================

const CouponRow = ({ seller }) => {
  console.log("coupon row ", seller);
  const { code, discount, productId } = seller;
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {code}
      </StyledTableCell>
      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {productId}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {discount} %
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default function SellerList({ sellers }) {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getCoupons() : null;
  }, []);

  var getCoupons = async () => {
    const response = await axios.get(
      `${BASE_URL + VENDOR}/coupon`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: sellers,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Coupons</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add New Seller"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Seller..."
      />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 1100,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={sellers.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              {loading ? (
                <CircularProgress />
              ) : (
                <TableBody>
                  {data.map((seller, index) => (
                    <CouponRow seller={seller} key={index} />
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(sellers.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const sellers = await api.sellers();
  return {
    props: {
      sellers,
    },
  };
};
