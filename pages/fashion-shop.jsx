import ShopLayout1 from "components/layouts/ShopLayout1";
import Setting from "components/Setting";
import { Box } from "@mui/material";
import Section1 from "pages-sections/fashion-shop/Section1";
import Section2 from "pages-sections/fashion-shop/Section2";
import Section3 from "pages-sections/fashion-shop/Section3";
import Section4 from "pages-sections/fashion-shop/Section4";
import Section5 from "pages-sections/fashion-shop/Section5";
import Section6 from "pages-sections/fashion-shop/Section6";
import Section7 from "pages-sections/fashion-shop/Section7";
import Section8 from "pages-sections/fashion-shop/Section8";
import api from "utils/api/fashion-shop";
import SEO from "components/SEO"; // =======================================================

// =======================================================
const FashionShop = (props) => {
  return (
    <ShopLayout1 showTopbar={false}>
      <SEO title="Fashion shop template v1" />
      <Box
        sx={{
          backgroundColor: "#ffffff",
          overFlow: "hidden",
        }}
      >
        <Section1 />
        <Section2 flashDeals={props.flashDealsData} />
        <Section3 newArrivals={props.newArrivalsData} />
        <Section4 dealOfTheWeek={props.dealOfTheWeek} />
        <Section5 hotDealList={props.hotDealList} />
        <Section6 trendingItems={props.trendingItems} />
        <Section7 serviceList={props.serviceList} />
        <Section8 />

        <Setting />
      </Box>
    </ShopLayout1>
  );
};

export async function getStaticProps() {
  const hotDealList = await api.getHotDealList();
  const serviceList = await api.getServiceList();
  const flashDealsData = await api.getFlashDeals();
  const trendingItems = await api.getTrendingItems();
  const newArrivalsData = await api.getNewArrivals();
  const dealOfTheWeek = await api.getDealOfTheWeekList();
  return {
    props: {
      hotDealList,
      serviceList,
      dealOfTheWeek,
      trendingItems,
      flashDealsData,
      newArrivalsData,
    },
  };
}
export default FashionShop;
