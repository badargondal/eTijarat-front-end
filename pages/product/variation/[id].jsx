import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import AvailableShops from "components/products/AvailableShops";
import FrequentlyBought from "components/products/FrequentlyBought";
import ProductDescription from "components/products/ProductDescription";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import RelatedProducts from "components/products/RelatedProducts";
import { H2 } from "components/Typography";
import bazaarReactDatabase from "data/bazaar-react-database";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getFrequentlyBought,
  getRelatedProducts,
} from "utils/api/related-products";
import { BASE_URL } from "../../../src/apiRoutes";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
})); // ===============================================================

// ===============================================================
const ProductDetails = (props) => {
  // const { frequentlyBought, relatedProducts } = props;
  const [product, setProduct] = useState(null);
  const [data, setdata] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);

  var order_id = null;
  const router = useRouter();
  var { id } = router.query;
  const [loading, setloading] = useState(true);
  const [loadingRelatedproducts, setloadingRelatedproducts] = useState(true);
  const [loadingVariationproducts, setloadingVariationproducts] =
    useState(true);

  const fetchData = async (id) => {
    const data = await fetch(`${BASE_URL}/products/variation/${id}`, {
      headers: {
        session_id: localStorage.getItem("sessionId"),
      },
    });
    const json = await data.json();
    const variation = json.variations.filter(
      (variation) => variation._id == id
    );
    variation[0].imgGroup = [variation[0].imgUrl, variation[0].imgUrl];
    console.log("variation", variation);
    setProduct(variation[0]);

    const remainingVariations = json.variations.filter(
      (variation) => variation._id != id
    );
    setdata(remainingVariations);
    setloading(false);
  };

  useEffect(() => {
    getRelatedProducts()
      .then((data) => setRelatedProducts(data))
      .then(() => setloadingRelatedproducts(false));
  }, []);

  if (product == null) {
    if (id != undefined) {
      fetchData(id);
    }
  }

  const handleOptionClick = (_, value) => setSelectedOption(value);
  console.log("product intro", product);

  return (
    <ShopLayout1>
      <Container
        sx={{
          my: 4,
        }}
      >
        {product ? (
          <ProductIntro product={product} />
        ) : (
          <>
            <H2>Loading...</H2>
            <CircularProgress />
          </>
        )}

        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Review (3)" />
          <Tab className="inner-tab" label="Technical Details" />
          <Tab className="inner-tab" label="Non Technical Details " />
        </StyledTabs>

        {product ? (
          <Box mb={6}>
            {selectedOption === 0 && (
              <ProductDescription description={product?.description} />
            )}

            {selectedOption === 1 && <ProductReview />}
            {selectedOption === 2 && (
              <ProductDescription
                description={product?.description.slice(0, 500)}
              />
            )}
            {selectedOption === 3 && (
              <ProductDescription
                description={product?.description.slice(100, 500)}
              />
            )}
          </Box>
        ) : (
          <>
            <CircularProgress />
          </>
        )}

        {data?.length > 0 ? (
          loadingRelatedproducts ? (
            <CircularProgress />
          ) : (
            frequentlyBought && <FrequentlyBought productsData={data} />
          )
        ) : (
          false
        )}

        {/* <AvailableShops /> */}

        {loadingRelatedproducts ? (
          <CircularProgress />
        ) : (
          relatedProducts && <RelatedProducts productsData={relatedProducts} />
        )}
      </Container>
    </ShopLayout1>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = bazaarReactDatabase.slice(0, 2).map((pro) => ({ params: { id: pro.id } }));
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };
// export async function getStaticProps() {
//   const frequentlyBought = await getFrequentlyBought();
//   const relatedProducts = await getRelatedProducts();
//   return {
//     props: { frequentlyBought, relatedProducts },
//   };
// }

export default ProductDetails;
