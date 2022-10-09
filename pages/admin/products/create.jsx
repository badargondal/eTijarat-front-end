import { Box } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import React from "react"; 
import * as yup from "yup";
import axios from "axios";

const CreateProduct = () => {
  const initialValues = {
    name: "",
    stock: "",
    price: "",
    sale_price: "",
    description: "",
    tags: "",
    category: "",
  };

  const handleFormSubmit = async (values) => {
    const res = await axios
      .post(
        "http://127.0.0.1:5000/add_product",
        
        values,
        {
          headers: {
            "Content-Type": "application/json",
            session_id: localStorage.getItem("sessionId"),
          },
        }
      )
      .then(
        (response) => {
          response;
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("data posted to db")
      return res
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
  name: yup.string().required("required"),
  category: yup.string().required("required"),
  description: yup.string().required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  sale_price: yup.number().required("required"),
  // tags: yup.object().required("required"),
});
export default CreateProduct;
