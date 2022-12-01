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
import { OrderRow } from "pages-sections/admin";
import React from "react";
import api from "utils/api/dashboard"; // table column list

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ADMIN, BASE_URL } from "../../../src/apiRoutes";

const tableHeading = [
  {
    id: "id",
    label: "Order ID",
    align: "left",
  },
  {
    id: "qty",
    label: "Qty",
    align: "left",
  },
  // {
  //   id: "purchaseDate",
  //   label: "Purchase Date",
  //   align: "left",
  // },
  {
    id: "billingAddress",
    label: "Billing Address",
    align: "left",
  },
  {
    id: "amount",
    label: "Amount",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

OrderList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function OrderList({ orders }) {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getOrders() : null;
  }, []);

  var getOrders = async () => {
    const response = await axios.get(
      `${BASE_URL + ADMIN}/orders`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };
  const router = useRouter();

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: orders,
    // defaultSort: "purchaseDate",
    defaultOrder: "desc",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Orders</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Create Order"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Order..."
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <Scrollbar>
            <TableContainer
              sx={{
                minWidth: 900,
              }}
            >
              <Table>
                <TableHeader
                  order={order}
                  hideSelectBtn
                  orderBy={orderBy}
                  heading={tableHeading}
                  rowCount={orders.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {console.log("data",data)}
                  {data.orders.map((order, index) => (
                    <OrderRow order={order} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack alignItems="center" my={4}>
            <TablePagination
              onChange={handleChangePage}
              count={Math.ceil(orders.length / rowsPerPage)}
            />
          </Stack>
        </Card>
      )}
    </Box>
  );
}
export const getStaticProps = async () => {
  const orders = await api.orders();
  return {
    props: {
      orders,
    },
  };
};
