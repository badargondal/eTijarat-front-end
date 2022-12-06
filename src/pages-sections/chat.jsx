import { Telegram } from "@mui/icons-material";
import East from "@mui/icons-material/East";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Pagination,
  styled,
  Typography,
} from "@mui/material";
import { BASE_URL } from "apiRoutes";
import axios from "axios";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerService from "components/icons/CustomerService";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import TableRow from "components/TableRow";
import { Span } from "components/Typography";
import { format } from "date-fns";
import Link from "next/link"; // styled components
import { useEffect } from "react";
import { useState } from "react";

const StyledChip = styled(Chip)(({ theme, green }) => ({
  height: 26,
  margin: "6px",
  padding: " 0 0.25rem",
  color: green ? theme.palette.success.main : theme.palette.primary.main,
  backgroundColor: green
    ? theme.palette.success[100]
    : theme.palette.primary.light,
}));

const TicketList = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getChats()
  }, []);

  const getChats = () => {
    axios.post(`${BASE_URL}/chat/vendor/chats`,
      { vendorId: localStorage.getItem('vendorId') },
      {
        headers: {
          'Accept': 'application/json',
        }
      }).then(res => {
        console.log('response.data', res.data);
        setdata(res.data);
        setloading(false);
      });
  };
  return (
    <>
      {loading ? <CircularProgress /> : data.map((chat) => (
        <Link href={`/vendor/chat/${chat.buyerId}`} key={chat.buyerId} passHref>
          <TableRow
            sx={{
              my: "1rem",
              p: "15px 24px",
            }}
          >
            <Box>
              <span style={{ fontWeight: 700 }}>{chat.buyerName}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt={1} m={-0.75}>
                <Span m={0.75} color="grey.600">
                  {chat.buyerEmail}
                </Span>
              </FlexBox>
            </Box>

            <Typography
              flex="0 0 0 !important"
              textAlign="center"
              color="grey.600"
            >
              <IconButton>
                <Telegram style={{ fontSize: "16px" }} />
              </IconButton>
            </Typography>
          </TableRow>
        </Link>
      ))}

      <FlexBox justifyContent="center" mt={5}>
        <Pagination
          count={1}
          color="primary"
          variant="outlined"
          onChange={(data) => console.log(data)}
        />
      </FlexBox>
    </>
  );
};

export default TicketList;
