//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { PageLayout } from "./components/layout";
//import "./styles/App.css";

import ProfileContent from "./home";

const MainContent = () => {
  return (
    <div className='App'>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className='card-title'>Please sign-in to see your profile information.</h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <MainContent />
      </PageLayout>
    </MsalProvider>
  );
}
