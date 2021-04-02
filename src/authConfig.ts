//import { Configuration, RedirectRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: "08d51aea-75e7-4f5b-92da-a709adc4b87a",
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "profile", "Sites.Read.All"],
};
