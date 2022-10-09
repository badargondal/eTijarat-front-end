import { FlexRowCenter } from "components/flex-box";
import SEO from "components/SEO";
import VendorSignup from "pages-sections/sessions/VendorSignup";

const SignUpPage = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Sign up" />
      <VendorSignup />
    </FlexRowCenter>
  );
};

export default SignUpPage;
