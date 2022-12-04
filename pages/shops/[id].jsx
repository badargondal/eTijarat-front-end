import FilterList from "@mui/icons-material/FilterList";
import { CircularProgress, Container, Grid, IconButton } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductCardList from "components/products/ProductCard1List";
import ProductFilterCard from "components/products/ProductFilterCard";
import ShopIntroCard from "components/shop/ShopIntroCard";
import Sidenav from "components/sidenav/Sidenav";
import useWindowSize from "hooks/useWindowSize";

import { BASE_URL, VENDOR } from "../../src/apiRoutes";
import { useState, useEffect } from "react";
import axios from "axios";

const Shop = () => {
  const width = useWindowSize();
  const isTablet = width < 1025;

  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getProducts() : null;
  }, []);

  var getProducts = async () => {
    var url = location.pathname;
    var id = url.substring(url.lastIndexOf("/") + 1);
    console.log("id", id);
    const response = await axios.get(
      `${BASE_URL}/vendor/${id}`,

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

  return (
    <ShopLayout1>
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        {loading ? <CircularProgress /> : <ShopIntroCard vendor={data} />}

        <Grid container spacing={3}>
          <Grid
            item
            md={3}
            xs={12}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard />
          </Grid>

          <Grid item md={9} xs={12}>
            {isTablet && (
              <Sidenav
                position="left"
                handle={
                  <IconButton
                    sx={{
                      float: "right",
                    }}
                  >
                    <FilterList fontSize="small" />
                  </IconButton>
                }
              >
                <ProductFilterCard />
              </Sidenav>
            )}

            <ProductCardList />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};

export default Shop;
