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
import { CustomerRow } from "pages-sections/admin";
import React from "react";
import api from "utils/api/dashboard"; // table column list

import { ADMIN, BASE_URL } from "../../../src/apiRoutes";
import { useState, useEffect } from "react";
import axios from "axios";

const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "phone",
    label: "Phone",
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    align: "left",
  },
  {
    id: "balance",
    label: "Wallet Balance",
    align: "left",
  },
  {
    id: "orders",
    label: "No Of Orders",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

CustomerList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function CustomerList({ customers }) {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getBuyers() : null;
  }, []);

  var getBuyers = async () => {
    const response = await axios.get(
      `${BASE_URL + ADMIN}/buyers`,

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

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: customers,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Buyers</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Customer"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Customer..."
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
                  rowCount={customers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {data.map((customer, index) => (
                    <CustomerRow customer={customer} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack alignItems="center" my={4}>
            <TablePagination
              onChange={handleChangePage}
              count={Math.ceil(customers.length / rowsPerPage)}
            />
          </Stack>
        </Card>
      )}
    </Box>
  );
}
export const getStaticProps = async () => {
  const customers = await api.customers();
  return {
    props: {
      customers,
    },
  };
};
