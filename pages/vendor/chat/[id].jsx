import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import SearchInput from "components/SearchInput";
import useMuiTable from "hooks/useMuiTable";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "pages-sections/admin";
import React from "react";
import ChatDetails from "../../../src/pages-sections/chatDetails";


SupportTickets.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; 

export default function SupportTickets() {
  return (
    <>
      <Box py={4}>
        <ChatDetails />
      </Box>
    </>
  );
} 
