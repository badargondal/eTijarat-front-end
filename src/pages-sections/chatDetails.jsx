import { Avatar, Box, Button, CircularProgress, Divider, TextField } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H5, Span } from "components/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";

import { BASE_URL } from "../../src/apiRoutes";


const PaymentMethodEditor = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log('here');
    getMessages()
  }, []);

  const getMessages = () => {
    var url = location.pathname;
    const buyerId = url.substring(url.lastIndexOf("/") + 1);
    const vendorId = localStorage.getItem('vendorId');
    console.log('IDs',{ vendorId, buyerId })
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
    const messageString = document.getElementById('msgbox');
    var url = location.pathname;
    const buyerId = url.substring(url.lastIndexOf("/") + 1);
    const body = {
      vendorId: localStorage.getItem('vendorId'),
      buyerId: buyerId,
      sender: localStorage.getItem('vendorId'),
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
    getMessages();
    messageString.value = '';
  };


  return (
    <>
      <div id="messagesPage" style={{ maxHeight: 500, overflow: "auto" }}>
        {loading ? <CircularProgress /> :
          data.map((item, ind) => {
            if (item.sender == item.buyerId._id) {
              return (<FlexBox gap={2} mb={4} key={ind} >
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
              return (<FlexBox sx={{ justifyContent: 'flex-end' }} gap={2} mb={4} key={ind} >
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
        id="msgbox"
        rows={3}
        fullWidth
        multiline
        name="msgbox"
        sx={{
          mb: 2,
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
    </>
  );
};

export default PaymentMethodEditor;
