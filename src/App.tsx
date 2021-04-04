import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { PageLayout } from "./components/layout";

//import ProfileContent from "./home";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import { Typography } from "@material-ui/core";

export default function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <PageLayout>
          <AuthenticatedTemplate>
            <Switch>
              <Route exact path='/'>
                <Page1 />
              </Route>
              <Route path='/page2'>
                <Page2 />
              </Route>
            </Switch>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Typography variant='h5'>Please sign-in to the application.</Typography>
          </UnauthenticatedTemplate>
        </PageLayout>
      </Router>
    </MsalProvider>
  );
}
