import { Grid, Modal, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import productDatabase from "data/product-database";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react"; // ========================================================
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { BASE_URL } from "apiRoutes";
import axios from "axios";

// import Box from "@mui/material";
// ========================================================
const ProductCard1List = () => {
  const router = useRouter();

  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getSearchProduct() : null;
  }, []);

  var getSearchProduct = async () => {
    var url = location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    console.log("id", typeof id);
    console.log("url", typeof url, url);
    let response;
    if (url.includes("search")) {
      response = await axios.get(
        `${BASE_URL}/products/search/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("sessionId"),
          },
        }
      );
    } else if (url.includes("shops")) {
      response = await axios.get(
        `${BASE_URL}/products/vendor/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("sessionId"),
          },
        }
      );
    }
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };

  return (
    <Fragment>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3}>
            {data.length >= 1 ? (
              data.map((item, ind) => (
                <Grid item lg={4} sm={6} xs={12} key={ind}>
                  <ProductCard1 {...item} />
                </Grid>
              ))
            ) : (
              <>
                <FlexBetween flexWrap="wrap" mt={4}>
                  <Span color="grey.600">
                    No product found of category {id}
                  </Span>
                </FlexBetween>
              </>
            )}
          </Grid>
          <FlexBetween flexWrap="wrap" mt={4}>
            <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
            <Pagination count={10} variant="outlined" color="primary" />
          </FlexBetween>
        </>
      )}
    </Fragment>
  );
};

export default ProductCard1List;
