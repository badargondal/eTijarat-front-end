import CreditCard from "@mui/icons-material/CreditCard";
import { Box, Button, Grid, TextField, MenuItem } from "@mui/material";
import Card1 from "components/Card1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";

import { BASE_URL, BUYER } from "../../src/apiRoutes";
import { months, years } from "data/months-years";

const PaymentMethodEditor = () => {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  const handleFormSubmit = async (values) => {
    console.log(values);
    if (id == "add") {
      return fetch(`${BASE_URL + BUYER}/card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data.message);
          router.push("/payment-methods");
        });
    } else {
      return fetch(`${BASE_URL + BUYER}/card/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data.message);
          router.push("/payment-methods");
        });
    }
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={CreditCard}
        title={`${id === "add" ? "Add New" : "Edit"} Payment Method`}
        button={
          <Link href="/payment-methods" passHref>
            <Button
              color="primary"
              sx={{
                bgcolor: "primary.light",
                px: "2rem",
              }}
            >
              Back to Payment Methods
            </Button>
          </Link>
        }
      />

      <Card1>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
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
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="card_no"
                      label="Card Number"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.card_no || ""}
                      error={!!touched.card_no && !!errors.card_no}
                      helperText={touched.card_no && errors.card_no}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="name"
                      label="Name on Card"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name || ""}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      select
                      fullWidth
                      type="number"
                      name="exp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Expire Card Month"
                      value={values.exp}
                      error={!!touched.exp && !!errors.exp}
                      helperText={touched.exp && errors.exp}
                    >
                      {months.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      select
                      fullWidth
                      type="number"
                      name="cardYear"
                      onChange={handleChange}
                      label="Expire Card Year"
                      value={values.cardYear}
                      error={!!touched.cardYear && !!errors.cardYear}
                      helperText={touched.cardYear && errors.cardYear}
                    >
                      {years.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      name="cvc"
                      label="CVC"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cvc || ""}
                      error={!!touched.cvc && !!errors.cvc}
                      helperText={touched.cvc && errors.cvc}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  exp: "",
  cvc: "",
  cardYear: "",
};
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  card_no: yup.string().required("required"),
  exp: yup.string().required("required"),
  cvc: yup.string().required("required"),
});
export default PaymentMethodEditor;
