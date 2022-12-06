import { FlexRowCenter } from "components/flex-box";
import SEO from "components/SEO";

import AssistantLogin from "../../src/pages-sections/sessions/AssistantLogin";
const LoginPage = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Login" />
      <AssistantLogin />
    </FlexRowCenter>
  );
};

export default LoginPage;
