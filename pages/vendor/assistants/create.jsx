import { CameraAlt } from "@mui/icons-material";
import { Avatar, Badge, Box, Button, Card, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import permissions from "../../../src/data/permissions";
import { Formik } from "formik";
import React, { Fragment } from "react";
import * as yup from "yup"; // upload button

const accountSchema = yup.object().shape({
  country: yup.mixed().required("Country is required"),
  name: yup.string().required("First name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
}); // =============================================================================

AccountSetting.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function AccountSetting() {
  const initialValues = {
    email: "",
    country: null,
    name: "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Account Setting</H3>

      <Card
        sx={{
          p: 4,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={accountSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      size="medium"
                      name="name"
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      color="info"
                      name="email"
                      type="email"
                      label="Email"
                      size="medium"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={permissions}
                      value={values.permissions}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) =>
                        setFieldValue("permissions", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          color="info"
                          label="permissions"
                          variant="outlined"
                          placeholder="Select permissions"
                          error={!!touched.permissions && !!errors.permissions}
                          helperText={touched.permissions && errors.permissions}
                          {...params}
                          size="medium"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="info">
                Create
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
