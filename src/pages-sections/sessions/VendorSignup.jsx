import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import BazaarButton from "components/BazaarButton";
import BazaarTextField from "components/BazaarTextField";
import { FlexBox } from "components/flex-box";
import { H3, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import { Wrapper } from "./Login";
import SocialButtons from "./SocialButtons";
import { useRouter } from "next/router";
import { BASE_URL, RECOMMENDED_PRODUCTS, VENDOR } from "../../../src/apiRoutes";
import DropZoneVendor from "components/DropZoneVendor";
import axios from "axios";
const VendorSignup = () => {
  const router = useRouter();

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [documents, setdocuments] = useState();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const verfiedAddress = async (address) => {
    console.log("Incoming Address", address);
    const response = await axios.post(
      `${RECOMMENDED_PRODUCTS}/address`,
      { address: address },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    // console.log("respone", response);
    // console.log("data", data);
    return data;
  };
  const handleFormSubmit = async (values) => {
    const response = await axios.post(
      `${RECOMMENDED_PRODUCTS}/address`,
      { address: values.address },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log("data", data);

    let vendorValues = data[0].name + " , " + data[1].address;
    values.addressVerification = vendorValues;
    console.log("values", values);
    return fetch(`${BASE_URL + VENDOR}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.message);
        router.push("/vendor/login");
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Create Your Account
        </H3>
        <Small
          mb={4.5}
          fontSize={12}
          display="block"
          fontWeight={600}
          color="grey.800"
          textAlign="center"
        >
          Please fill all fields to continue
        </Small>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label="Shop Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder="Ralph Adwards"
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="address"
          size="small"
          type="text"
          variant="outlined"
          onBlur={handleBlur}
          value={values.address}
          onChange={handleChange}
          label="Address"
          placeholder="Address"
          error={!!touched.address && !!errors.address}
          helperText={touched.address && errors.address}
        />
        <Grid item xs={12}>
          <DropZoneVendor
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
                  setdocuments(data.url);
                });
            }}
          />
          {documents && (
            <img src={documents} alt="uploadedImage" height="200" />
          )}
          <input
            type="text"
            hidden
            name="documents"
            value={(values.documents = documents)}
          />
        </Grid>

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <BazaarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={
            <Checkbox
              size="small"
              color="secondary"
              checked={values.agreement || false}
            />
          }
          label={
            <FlexBox
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
            >
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <BazaarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            height: 44,
          }}
        >
          Create Account
        </BazaarButton>
      </form>

      <SocialButtons redirect="/login" redirectText="Login" />
    </Wrapper>
  );
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});
export default VendorSignup;
