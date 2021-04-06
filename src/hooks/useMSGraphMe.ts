import { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/photos";
import { LambdaFetchClient } from "@pnp/common";

const useMSGraphMe = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const [me, setMe] = useState({});

  useEffect(() => {
    const handleAsyncFunc = async () => {
      if (account) {
        const resp = await instance.acquireTokenSilent({
          ...loginRequest,
          account: account,
        });

        const client = new LambdaFetchClient(async () => {
          // lamba returns the access token
          return resp.accessToken;
        });

        graph.setup({
          graph: {
            fetchClientFactory: () => client,
          },
        });

        const result = await graph.me()
        setMe(result);

        /* const photoValue = await graph.me.
        console.log(photoValue) */
        //const url = window.URL || window.webkitURL;
        //const blobUrl = url.createObjectURL(photoValue);
      }
    };
    handleAsyncFunc()
    
  }, [account, instance]);

  return { me };
};

export { useMSGraphMe };
