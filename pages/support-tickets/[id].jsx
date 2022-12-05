import { Avatar, Box, Button, CircularProgress, Divider, List, TextField } from "@mui/material";
import axios from "axios";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerService from "components/icons/CustomerService";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { H5, Span } from "components/Typography";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../src/apiRoutes";

const PaymentMethodEditor = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getMessages()
  }, []);

  const getMessages = () => {

    const container = document.getElementById('messagesPage');
    container.scrollTop = container.scrollHeight**2;
    console.dir(container);
    const vendorId = localStorage.getItem('chatVendorId');
    const buyerId = localStorage.getItem('buyerId');
    axios.post(`${BASE_URL}/chat/messages`,
      { vendorId, buyerId },
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

  const handleFormSubmit = async () => {
    const messageString = document.getElementById('chatbox');

    const body = {
      vendorId: localStorage.getItem('chatVendorId'),
      buyerId: localStorage.getItem('buyerId'),
      sender: localStorage.getItem('buyerId'),
      message: messageString.value.trim()
    }

    const response = await axios.post(
      `${BASE_URL}/chat/message/send`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const container = document.getElementById('messagesPage');
    container.scrollTop = container.scrollHeight * (-5);

    getMessages();
    // const updatedData = data;
    // updatedData.push(newMessage)
    // const newMessage = response.data.chat;
    // setdata(updatedData);
    // console.log('response ', newMessage);
    // console.log('updated state', data);
    messageString.value = '';
  };



  return (
    <CustomerDashboardLayout>
      {/* <UserDashboardHeader
        icon={CustomerService}
        title="Messages"
        navigation={<CustomerDashboardNavigation />}
      /> */}

      <div id="messagesPage" style={{maxHeight: "13%", overflow: "auto" }}>
        {loading ? <CircularProgress /> :
          data.map((item, ind) => {
            if (item.sender == item.buyerId._id) {
              return (<FlexBox sx={{ justifyContent: 'flex-end' }} gap={2} mb={4} key={ind} >
                <Avatar src="/assets/images/faces/10.jpg" />
                <Box>
                  <H5 fontWeight="600" mt={0} mb={0}>
                    {item?.buyerId?.name}
                  </H5>
                  <Span color="grey.600">
                    {format(new Date(item.createdAt), "hh:mm:a | dd MMM yyyy")}
                  </Span>
                  <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                    {item.message}
                  </Box>
                </Box>
              </FlexBox>)
            }
            else if (item.sender == item.vendorId._id) {
              return (<FlexBox gap={2} mb={4} key={ind} >
                <Avatar src="/assets/images/faces/face-7.jpg" />
                <Box>
                  <H5 fontWeight="600" mt={0} mb={0}>
                    {item?.vendorId?.name}
                  </H5>
                  <Span color="grey.600">
                    {format(new Date(item.createdAt), "hh:mm:a | dd MMM yyyy")}
                  </Span>
                  <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                    {item.message}
                  </Box>
                </Box>
              </FlexBox>)
            }
          })
        }
      </div>

      <TextField
        id="chatbox"
        rows={3}
        fullWidth
        multiline
        name="chatbox"
        sx={{
          mb: 3,
        }}
        placeholder="Write your message here..."
      />
      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleFormSubmit}
        sx={{
          ml: "auto",
          display: "block",
        }}
      >
        Send
      </Button>

    </CustomerDashboardLayout >
  );
};

const messageList = [
  {
    imgUrl: "/assets/images/faces/face-7.jpg",
    name: "Esther Howard",
    date: "2020-12-14T08:39:58.219Z",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum velit amet, aliquam massa tellus. Condimentum sit at pharetra, congue. Sit mattis amet nec pharetra odio. Interdum lorem vestibulum et amet et duis placerat. Ac mattis massa duis mi tellus sed. Mus eget in fames urna, ornare nunc, tincidunt tincidunt interdum. Amet aliquet pharetra rhoncus scelerisque pulvinar dictumst at sit. Neque tempor tellus ac nullam. Etiam massa tempor eu risus fusce aliquam.",
  },
  {
    imgUrl: "/assets/images/faces/10.jpg",
    name: "Ralph Edwards",
    date: "2021-01-05T05:39:58.219Z",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum velit amet, aliquam massa tellus. Condimentum sit at pharetra, congue. Sit mattis amet nec pharetra odio. Interdum lorem vestibulum et amet et duis placerat.",
  },
  {
    imgUrl: "/assets/images/faces/face-7.jpg",
    name: "Esther Howard",
    date: "2021-01-14T08:39:58.219Z",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nunc, lectus mi ornare. Bibendum proin euismod nibh tellus, phasellus.",
  },
];
export default PaymentMethodEditor;
