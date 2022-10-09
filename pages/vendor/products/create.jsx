import { Box } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import React,{useState} from "react";
import * as yup from "yup";
import axios from "axios";

const CreateProduct = () => {
  const [email, setemail] = useState('');
  

  async function getVendorData() {
    try {
      const session_id=localStorage.getItem("sessionId")

      console.log(`sessionID${session_id}`)
      const response = await axios.get(`http://127.0.0.1:5000/verify_vendor`,{
        headers: {
          'session_id': session_id
        }
      });
      return(response.data.email);
    }
    catch (error) {
      console.log(error);
    }
  }
  const vendor_email = async () => {
    const email = await getVendorData ();
    
    return email
  };
  const p = Promise.resolve(vendor_email());
  p.then((value) => {
    setemail(value)
  })
  const initialValues = {
    name: "",
    stock: "",
    price: "",
    sale_price: "",
    description: "",
    vendor_email:"",
    category: "",
    
  };

  const handleFormSubmit = async (values) => {
    
    values["vendor_email"] = email
    delete values["email"]
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
        vendor_email={vendor_email()}
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
});
export default CreateProduct;
