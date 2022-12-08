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
    console.log("Products variation", values);
    let variations = [];
    const vendorId = localStorage.getItem("vendorId")
    if (values.variation1_price || values.variation1_title) {
      const v1 = {
        title: values.variation1_title,
        stock: values.variation1_stock,
        price: values.variation1_price,
        sale_price: values.variation1_sale_price,
        description: values.variation1_description,
        category: values.variation1_category,
        imgUrl: values.imgUrlv1,
        vendorId:vendorId
      };
      variations.push(v1);
    }
    if (values.variation2_price || values.variation2_title) {
      const v2 = {
        title: values.variation2_title,
        stock: values.variation2_stock,
        price: values.variation2_price,
        sale_price: values.variation2_sale_price,
        description: values.variation2_description,
        category: values.variation2_category,
        imgUrl: values.imgUrlv2,
        vendorId:vendorId
      };
      variations.push(v2);
    }
    if (values.variation3_price || values.variation3_title) {
      const v3 = {
        title: values.variation3_title,
        stock: values.variation3_stock,
        price: values.variation3_price,
        sale_price: values.variation3_sale_price,
        description: values.variation3_description,
        category: values.variation3_category,
        imgUrl: values.imgUrlv3,
        vendorId:vendorId
      };
      variations.push(v3);
    }

    values.variations = variations;
    console.log("values with variations", values);

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
