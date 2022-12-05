import duotone from "components/icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Admin",
  },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/vendor/dashboard",
  },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      {
        name: "Product List",
        path: "/admin/products",
      },
      {
        name: "Create Product",
        path: "/admin/products/create",
      },
      {
        name: "Category",
        path: "/admin/categories",
      },
      {
        name: "Brand",
        path: "/admin/brands",
      },
      {
        name: "Review",
        path: "/admin/product-reviews",
      },
    ],
  },
  {
    name: "Orders",
    icon: duotone.Order,
    children: [
      {
        name: "Order List",
        path: "/admin/orders",
      },
      {
        name: "Order Details",
        path: "/admin/orders/1",
      },
    ],
  },
  {
    name: "Buyers",
    icon: duotone.Customers,
    path: "/admin/customers",
  },
  {
    name: "Refunds",
    icon: duotone.Refund,
    children: [
      {
        name: "Refund Request",
        path: "/admin/refund-request",
      },
      {
        name: "Refund Settings",
        path: "/admin/refund-setting",
      },
    ],
  },
  {
    name: "Vendors",
    icon: duotone.Seller,
    children: [
      {
        name: "Vendor List",
        path: "/admin/sellers",
      },
      {
        name: "Approval Request",
        path: "/admin/sellers/approval-request",
      },
      {
        name: "Seller Package",
        path: "/admin/seller-package",
      },
      {
        name: "Package Payments",
        path: "/admin/package-payment",
      },
      {
        name: "Earning History",
        path: "/admin/earning-history",
      },
      {
        name: "Payouts",
        path: "/admin/payouts",
      },
      {
        name: "Payout Request",
        path: "/admin/payout-request",
      },
    ],
  },
  {
    type: "label",
    label: "Vendor",
  },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      {
        name: "Product List",
        path: "/vendor/products",
      },
      {
        name: "Create Product",
        path: "/vendor/products/create",
      },
      {
        name: "Category",
        path: "/vendor/categories",
      },
      {
        name: "Brand",
        path: "/vendor/brands",
      },
      {
        name: "Review",
        path: "/vendor/product-reviews",
      },
    ],
  },
  {
    name: "Orders",
    icon: duotone.Order,
    children: [
      {
        name: "Order List",
        path: "/vendor/orders",
      },
      {
        name: "Order Details",
        path: "/vendor/orders/1",
      },
    ],
  },
  {
    name: "Earnings",
    icon: duotone.ProjectChart,
    children: [
      {
        name: "Earning History",
        path: "/vendor/earning-history",
      },
      {
        name: "Payouts",
        path: "/vendor/payouts",
      },
      {
        name: "Payout Request",
        path: "/vendor/payout-requests",
      },
      {
        name: "Payout Settings",
        path: "/vendor/payout-settings",
      },
    ],
  },
  {
    name: "Chat",
    icon: duotone.Review,
    path: "/vendor/chat",
  },
  {
    name: "Refund Request",
    icon: duotone.Refund,
    path: "/vendor/refund-request",
  },
  {
    name: "Reviews",
    icon: duotone.Review,
    path: "/vendor/reviews",
  },
  {
    name: "Shop Setting",
    icon: duotone.SiteSetting,
    path: "/vendor/shop-settings",
  },

  {
    name: "Account Setting",
    icon: duotone.AccountSetting,
    path: "/vendor/account-setting",
  },
  {
    name: "Site Setting",
    icon: duotone.SiteSetting,
    path: "/vendor/site-settings",
  },
  {
    name: "Logout",
    icon: duotone.Session,
    path: "/vendor/dashboard-version-2",
  },
];
