import East from "@mui/icons-material/East";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { format } from "date-fns";
import Link from "next/link";

// =================================================
const OrderRow = ({ item , }) => {
  console.log(item)
  var count=0
  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "secondary";

      case "Processing":
        return "secondary";

      case "Delivered":
        return "success";

      case "Cancelled":
        return "error";

      default:
        return "";
    }
  };

  return (
    // <Link href={item.href}>
    <Link href={""}>
      <a>
        <TableRow
          sx={{
            my: "1rem",
            padding: "6px 18px",
          }}
        >
          <H5 m={0.75} textAlign="left">
            {1}
          </H5>
          <Box m={0.75}>
            <Chip
              size="small"
              label={"Pending"}
              sx={{
                p: "0.25rem 0.5rem",
                fontSize: 12,
                color: !!getColor(item.status)
                  ? `${getColor(item.status)}.900`
                  : "inherit",
                backgroundColor: !!getColor(item.status)
                  ? `${getColor(item.status)}.100`
                  : "none",
              }}
            />
          </Box>
          <Typography className="pre" m={0.75} textAlign="left">
            {format(new Date(item.details.date), "MMM dd, yyyy")}
          </Typography>

          <Typography m={0.75} textAlign="left">
            
            ${item.products[0].price * item.products[0].qty}
          </Typography>

          <Typography
            color="grey.600"
            textAlign="center"
            sx={{
              flex: "0 0 0 !important",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <IconButton>
              <East
                fontSize="small"
                color="inherit"
                sx={{
                  transform: ({ direction }) =>
                    `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                }}
              />
            </IconButton>
          </Typography>
        </TableRow>
      </a>
    </Link>
    
  );
  
};

export default OrderRow;
