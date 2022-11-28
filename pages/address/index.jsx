import { Delete, Edit, Place } from "@mui/icons-material";
import { Button, IconButton, Pagination, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import TableRow from "components/TableRow";
import Link from "next/link";

import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { BASE_URL, BUYER } from "../../src/apiRoutes";
import { useRouter } from "next/router";

const AddressList = () => {

  const router = useRouter();
  const [data, setdata] = useState(null);
  
  const [loading, setloading] = useState(true);

  
  useEffect(() => {
    data == null ? getAddresses() : null;
    
  }, []);

  var getAddresses = async () => {
    const response = await axios.get(
      `${BASE_URL + BUYER}/addresses`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response of addresses", response.data);
    setdata(response.data);
    setloading(false);
  };




  const deleteAddress = async (id) => {
    const response = await axios.delete(
      `${BASE_URL + BUYER}/address/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response of deleted address", response.data);
    location.reload();
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Place}
        title="My Addresses"
        navigation={<CustomerDashboardNavigation />}
        // button={
        //   <Button
        //     color="primary"
        //     sx={{
        //       bgcolor: "primary.light",
        //       px: 4,
        //     }}
        //   >
        //     Add New Addresses
        //   </Button>
        // }
      />
      {loading ? (
        <CircularProgress />
      ) : (
        data.address.map((item, ind) => (
          <TableRow
            sx={{
              my: 2,
              padding: "6px 18px",
            }}
            key={ind}
          >
            <Typography whiteSpace="pre" m={0.75} textAlign="left">
              {item.name}
            </Typography>

            <Typography flex="1 1 260px !important" m={0.75} textAlign="left">
              {item.address}
            </Typography>

            <Typography whiteSpace="pre" m={0.75} textAlign="left">
              {item.phone}
            </Typography>

            <Typography whiteSpace="pre" textAlign="center" color="grey.600">
              <Link href={`/address/${item._id}`} passHref>
                <IconButton>
                  <Edit fontSize="small" color="inherit" />
                </IconButton>
              </Link>

              <IconButton onClick={() => deleteAddress(item._id)}>
                <Delete fontSize="small" color="inherit" />
              </IconButton>
            </Typography>
          </TableRow>
        ))
      )}

      <FlexBox justifyContent="center" mt={5}>
        <Pagination count={5} onChange={(data) => console.log(data)} />
      </FlexBox>
    </CustomerDashboardLayout>
  );
};

const orderList = [
  {
    orderNo: "1050017AS",
    status: "Pending",
    purchaseDate: new Date(),
    price: 350,
  },
  {
    orderNo: "1050017AS",
    status: "Processing",
    purchaseDate: new Date(),
    price: 500,
  },
  {
    orderNo: "1050017AS",
    status: "Delivered",
    purchaseDate: "2020/12/23",
    price: 700,
  },
  {
    orderNo: "1050017AS",
    status: "Delivered",
    purchaseDate: "2020/12/23",
    price: 700,
  },
  {
    orderNo: "1050017AS",
    status: "Cancelled",
    purchaseDate: "2020/12/15",
    price: 300,
  },
];
export default AddressList;
