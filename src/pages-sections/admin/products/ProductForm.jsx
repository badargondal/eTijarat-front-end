import {
  Button,
  Card,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { RECOMMENDED_PRODUCTS } from "apiRoutes";
import DropZone from "components/DropZone";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import axios from "axios";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
const ProductForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit } = props;
  // const [imgUrl, setimgUrl] = useState();
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const getImageKeywords = async (imgUrl) => {
    console.log("imgUrl", imgUrl);
    const response = await axios.post(
      `${RECOMMENDED_PRODUCTS}/seodata`,
      {
        url: imgUrl,
      },
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

  return (
    <Card
      sx={{
        p: 6,
      }}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  color="info"
                  size="medium"
                  placeholder="Title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Price"
                  onChange={handleChange}
                  placeholder="Price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </Grid>

              <Grid item xs={12}>
                <DropZone
                  onChange={() => {
                    const url =
                      "https://api.cloudinary.com/v1_1/dphfy8pau/image/upload";

                    const files = document.querySelector("[type=file]").files;
                    const formData = new FormData();

                    let file = files[0];
                    formData.append("file", file);
                    formData.append("upload_preset", "eTijarat");

                    fetch(url, {
                      method: "POST",
                      body: formData,
                    })
                      .then((response) => {
                        return response.json();
                      })
                      .then((data) => {
                        console.log("img", data.url);
                        // setimgUrl(data.url);

                        getImageKeywords(data.url);
                      });
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="category"
                  onBlur={handleBlur}
                  placeholder="Category"
                  onChange={handleChange}
                  value={values.category}
                  label="Select Category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                  <MenuItem value="bikes">bikes</MenuItem>
                  <MenuItem value="gifts">gifts</MenuItem>
                  <MenuItem value="music">music</MenuItem>
                  <MenuItem value="groceries">groceries</MenuItem>
                  <MenuItem value="automotive">automotive</MenuItem>
                  <MenuItem value="Home & Garden">Home & Garden</MenuItem>
                  <MenuItem value="Health & Beauty">Health $ Beauty</MenuItem>
                </TextField>
              </Grid>

              <Grid item sm={6} xs={12}>
                <h3>
                  <span
                    style={{ marginRight: 20, fontWeight: 400, fontSize: 14 }}
                  >
                    {" "}
                    Category Suggestion{" "}
                  </span>
                  {data?.recommend?.map((item) => (
                    <Chip style={{ marginRight: 10 }} label={item} />
                  ))}
                </h3>
              </Grid>

              <Grid item xs={12}>
                <h3>
                  
                  {/* <span
                    style={{ marginRight: 20, fontWeight: 600, fontSize: 14 ,}}
                  >
                    SEO Recommendation
                  </span> */}

                  {data?.seo?.data?.slice(0, 9).map((item) => (
                    <Chip
                      style={{ marginRight: 10, marginBottom: 10 }}
                      label={item}
                    />
                  ))}
                </h3>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  name="description"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="stock"
                  color="info"
                  size="medium"
                  label="Stock"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={touched.stock && errors.stock}
                />
              </Grid>
              {/* <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="tags"
                  label="Tags"
                  color="info"
                  size="medium"
                  placeholder="Tags"
                  onBlur={handleBlur}
                  value={values.tags}
                  onChange={handleChange}
                  error={!!touched.tags && !!errors.tags}
                  helperText={touched.tags && errors.tags}
                />
              </Grid> */}

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  color="info"
                  size="medium"
                  type="number"
                  name="sale_price"
                  label="Sale Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Sale Price"
                  value={values.sale_price}
                  error={!!touched.sale_price && !!errors.sale_price}
                  helperText={touched.sale_price && errors.sale_price}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Save product
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default ProductForm;
