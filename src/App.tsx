import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "./config/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";
import { PageLayout } from "./components/layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import ProfileContent from "./pages/home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { Button, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4E1645",
    },
    secondary: {
      main: "#63be45",
    },
  },
});

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    marginTop: "10rem",
  },
});

export default function App() {
  const msalInstance = new PublicClientApplication(msalConfig);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <MsalProvider instance={msalInstance}>
        <Router>
          <PageLayout>
            <AuthenticatedTemplate>
              <Switch>
                <Route exact path='/'>
                  <ProfileContent />
                </Route>
                <Route exact path='/page1'>
                  <Page1 />
                </Route>
                <Route path='/page2'>
                  <Page2 />
                </Route>
              </Switch>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <div className={classes.root}>
                <Typography variant='h5'>Please sign-in to the application.</Typography>
                <Box mt={2}>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AccountCircle />}
                    onClick={() => msalInstance.loginRedirect(loginRequest)}
                  >
                    Login
                  </Button>
                </Box>
              </div>
            </UnauthenticatedTemplate>
          </PageLayout>
        </Router>
      </MsalProvider>
    </ThemeProvider>
  );
}
