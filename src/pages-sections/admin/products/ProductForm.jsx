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
const ProductForm = (props) => {
  const { initialValues, validationSchema, handleFormSubmit } = props;
  const [variation1, setVariation1] = useState(false);
  const [variation2, setVariation2] = useState(false);
  const [variation3, setVariation3] = useState(false);
  const [imgUrl, setimgUrl] = useState();
  const [imgUrlv1, setimgUrlv1] = useState();
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  const getImageKeywords = async (Url) => {
    console.log("IMAGE STATE", imgUrl);
    console.log("IMAGE STATE1", imgUrlv1);

    const response = await axios.post(
      `${RECOMMENDED_PRODUCTS}/seodata`,
      {
        url: Url,
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
                        setimgUrl(data.url);
                        console.log("IMAGE STATE", imgUrl);
                        getImageKeywords(data.url);
                      });
                  }}
                />
                {imgUrl && (
                  <img src={imgUrl} alt="uploadedImage" height="200" />
                )}
                <input
                  type="text"
                  hidden
                  name="imgUrl"
                  value={(values.imgUrl = imgUrl)}
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
              <Grid item sm={6} xs={12} style={{ marginBottom: 10 }}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setVariation1(!variation1)}
                >
                  Add Product Variation1
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {variation1 && (
                <>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      style={{ display: "block" }}
                      fullWidth
                      name="variation1_title"
                      label="Title"
                      color="info"
                      size="medium"
                      placeholder="Title"
                      value={values.variation1_title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        !!touched.variation1_title && !!errors.variation1_title
                      }
                      helperText={
                        touched.variation1_title && errors.variation1_title
                      }
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="variation1_price"
                      color="info"
                      size="medium"
                      type="number"
                      onBlur={handleBlur}
                      value={values.variation1_price}
                      label="Price"
                      onChange={handleChange}
                      placeholder="Price"
                      error={
                        !!touched.variation1_price && !!errors.variation1_price
                      }
                      helperText={
                        touched.variation1_price && errors.variation1_price
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <DropZone
                      onChange={() => {
                        const url =
                          "https://api.cloudinary.com/v1_1/dphfy8pau/image/upload";

                        const files =
                          document.querySelector("[type=file]").files;
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
                            console.log("img1", data.url);
                            setimgUrlv1(data.url);
                            console.log("IMAGE STATE1", imgUrlv1);
                            getImageKeywords(data.url);
                          });
                      }}
                    />
                    {imgUrlv1 && (
                      <img src={imgUrlv1} alt="uploadedImage" height="200" />
                    )}
                    <input
                      type="text"
                      hidden
                      name="imgUrlv1"
                      value={(values.imgUrlv1 = imgUrlv1)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      select
                      fullWidth
                      color="info"
                      size="medium"
                      name="variation1_category"
                      onBlur={handleBlur}
                      placeholder="Category"
                      onChange={handleChange}
                      value={values.variation1_category}
                      label="Select Category"
                      error={
                        !!touched.variation1_category &&
                        !!errors.variation1_category
                      }
                      helperText={
                        touched.variation1_category &&
                        errors.variation1_category
                      }
                    >
                      <MenuItem value="electronics">Electronics</MenuItem>
                      <MenuItem value="fashion">Fashion</MenuItem>
                      <MenuItem value="bikes">bikes</MenuItem>
                      <MenuItem value="gifts">gifts</MenuItem>
                      <MenuItem value="music">music</MenuItem>
                      <MenuItem value="groceries">groceries</MenuItem>
                      <MenuItem value="automotive">automotive</MenuItem>
                      <MenuItem value="Home & Garden">Home & Garden</MenuItem>
                      <MenuItem value="Health & Beauty">
                        Health $ Beauty
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <h3>
                      <span
                        style={{
                          marginRight: 20,
                          fontWeight: 400,
                          fontSize: 14,
                        }}
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
                      name="variation1_description"
                      label="Description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Description"
                      value={values.variation1_description}
                      error={
                        !!touched.variation1_description &&
                        !!errors.variation1_description
                      }
                      helperText={
                        touched.variation1_description &&
                        errors.variation1_description
                      }
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      name="variation1_stock"
                      color="info"
                      size="medium"
                      label="Stock"
                      placeholder="Stock"
                      onBlur={handleBlur}
                      value={values.variation1_stock}
                      onChange={handleChange}
                      error={
                        !!touched.variation1_stock && !!errors.variation1_stock
                      }
                      helperText={
                        touched.variation1_stock && errors.variation1_stock
                      }
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      type="number"
                      name="variation_sale_price"
                      label="Sale Price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Sale Price"
                      value={values.sale_price}
                      error={!!touched.sale_price && !!errors.sale_price}
                      helperText={touched.sale_price && errors.sale_price}
                    />
                  </Grid>
                </>
              )}

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
