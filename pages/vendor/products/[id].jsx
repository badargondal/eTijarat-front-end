import { Box, CircularProgress } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import React from "react";
import * as yup from "yup"; // form field validation schema

import { useState, useEffect } from "react";
// import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { VENDOR, BASE_URL } from "../../../src/apiRoutes";
import axios from "axios";

const validationSchema = yup.object().shape({
  // title: yup.string().required("required"),
  // category: yup.string().required("required"),
  // description: yup.string().required("required"),
  // stock: yup.number().required("required"),
  // price: yup.number().required("required"),
  // sale_price: yup.number().required("required"),
  // tags: yup.object().required("required"),
}); // =============================================================================

EditProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function EditProduct() {
  const router = useRouter();

  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getProduct() : null;
  }, []);

  var getProduct = async () => {
    var url = location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    console.log("id", id);
    const response = await axios.get(
      `${BASE_URL+VENDOR}/product/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };

  const initialValues = {
    title: data?.title,
    stock: data?.stock,
    price: data?.price,
    sale_price: data?.sale_price,
    description: data?.description,
    stock: data?.stock,
    category: data?.category,
    imgUrl: "ads",
  };

  const handleFormSubmit = async (values) => {
    console.log("values", values);
    const url = location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    const res = await axios
      .put(`${BASE_URL+VENDOR}/product/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      })
      .then(
        (response) => {
          response;
          console.log("response", response);
          router.push("/vendor/products")
        },
        (error) => {
          console.log(error);
        }
      );
    return res;
  };
  return (
    <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      {loading ? (
        <CircularProgress />
      ) : (
        <ProductForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </Box>
  );
}
