import { Box } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import React from "react";
import Chat from "../../../src/pages-sections/chat"

SupportTickets.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function SupportTickets() {
  return (
    <>
      <Box py={4}>
        <Chat />
      </Box>
    </>
  );
} 