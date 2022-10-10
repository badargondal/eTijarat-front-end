import { Box } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import CategorySectionCreator from "components/CategorySectionCreator";
import Light from "components/icons/Light";
import ProductCard1 from "components/product-cards/ProductCard1";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react"; // =============================================================

// =============================================================
const Section2 = ({ flashDeals }) => {
  // {(flashDeals.slice(1,3)).map(item => console.log(item))}
  {flashDeals.slice(1,3).map(item => console.log("item",item))}
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);
  return (
    <CategorySectionCreator
      icon={<Light color="primary" />}
      title="Flash Deals"
      seeMoreLink="#"
    >
      <Carousel
        totalSlides={(flashDeals.slice(1,8)).length}
        visibleSlides={visibleSlides}
        infinite={true}
      >
        {flashDeals.slice(1,8).map((item, ind) => (
          <Box py={0.5} key={ind}>
            <ProductCard1
              id={item.id}
              title={item.title}
              price={item.price}
              imgUrl={item.imgUrl}
              rating={item.rating}
              discount={item.discount}
            />
          </Box>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default Section2;
