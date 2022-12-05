import { Box } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { PRODUCTS, BASE_URL, VENDOR } from "../../../src/apiRoutes";
import { useRouter } from "next/router";
const CreateProduct = () => {
  const router = useRouter();
  const initialValues = {
    title: "",
    stock: "",
    price: "",
    sale_price: "",
    description: "",
    category: "",
    imgUrl: "",
  };

  const handleFormSubmit = async (values) => {
    console.log("Images", values);
    const res = await axios
      .post(`${BASE_URL + VENDOR}/product`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      })
      .then(
        (response) => {
          response;
          console.log("response", response);
        },
        (error) => {
          console.log(error);
        }
      );
    router.push("/vendor/products");
    return res;
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Add New Product</H3>

      <ProductForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}; // =============================================================================

CreateProduct.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

const validationSchema = yup.object().shape({
  title: yup.string().required("required"),
  imgUrl: yup.string().required("required"),
  category: yup.string().required("required"),
  description: yup.string().required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  sale_price: yup.number().required("required"),
});
export default CreateProduct;
