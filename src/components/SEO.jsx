import Head from "next/head";
import React from "react";

const SEO = ({ title, description, sitename = "Bazaar Next.js Ecommerce" }) => {
  return (
    <Head>
      <title>
        {title} | {sitename}
      </title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SEO;
