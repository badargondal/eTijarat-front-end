import { Add, Router } from "@mui/icons-material";
import { Button, useMediaQuery } from "@mui/material";
import { FlexBox } from "components/flex-box";
import SearchInput from "components/SearchInput";
import React from "react"; // ===============================================================
import  {useRouter}  from 'next/router';
// ===============================================================
const SearchArea = (props) => {
  const router = useRouter()
  const { searchPlaceholder, buttonText,handleBtnClick } = props;
  console.log(props)
  const downSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
      <SearchInput placeholder={searchPlaceholder} />

      <Button
        color="info"
        fullWidth={downSM}
        variant="contained"
        onClick={handleBtnClick}
        startIcon={<Add />}
        sx={{
          minHeight: 44,
        }}
      >
        {buttonText}
      </Button>
    </FlexBox>
  );
};

SearchArea.defaultProps = {
  buttonText: "Add Product",
  searchPlaceholder: "Search Product...",
};
export default SearchArea;
