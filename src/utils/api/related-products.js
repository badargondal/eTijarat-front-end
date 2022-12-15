import axios from "axios";
import { RECOMMENDED_PRODUCTS } from "../../../src/apiRoutes";
export const getFrequentlyBought = async () => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
  
};
export const getRelatedProducts = async () => {
  var url = location.pathname;
  var id = url.substring(url.lastIndexOf("/") + 1);
  console.log("id", id);
  const response = await axios.post(
    `${RECOMMENDED_PRODUCTS}/recommend`,
    { product: id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
