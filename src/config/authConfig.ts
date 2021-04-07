// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENTID,
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "User.ReadBasic.All", "profile", "Sites.Manage.All", "Sites.ReadWrite.All"],
};
