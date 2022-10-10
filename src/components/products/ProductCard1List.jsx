import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";
import productDatabase from "data/product-database";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react"; // ========================================================
import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material";
// ========================================================
const ProductCard1List = () => {
  const [category, setCategory] = useState(null);
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const fetchData = (id) => {
    return fetch(`http://127.0.0.1:5000/product/search/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategory(data);
        setloading(false);
      });
  };

  if (category == null) {
    if (id != undefined) {
      fetchData(id);
    }
  }
  

  return (
    <Fragment>
      {loading ? (
      
          <CircularProgress />
        
      ) : (
        <>
          <Grid container spacing={3}>
            {category.map((item, ind) => (
              <Grid item lg={4} sm={6} xs={12} key={ind}>
                <ProductCard1 {...item} />
              </Grid>
            ))}
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
