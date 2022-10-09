import { FlexRowCenter } from "components/flex-box";
import SEO from "components/SEO";
import VendorLogin from "pages-sections/sessions/VendorLogin";

const LoginPage = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Login" />
      <VendorLogin />
    </FlexRowCenter>
  );
};

export default LoginPage;
