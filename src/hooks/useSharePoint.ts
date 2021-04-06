import { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { LambdaFetchClient } from "@pnp/common";
import { sp } from "@pnp/sp/presets/all";

const useSharePoint = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const [spData, setSpData] = useState([]);

  useEffect(() => {
    const handleAsyncFunc = async () => {
      if (account) {
        // create a new instance of the lambda fetch client
        const client = new LambdaFetchClient(async () => {
          const request = {
            scopes: ["https://tfgonline.sharepoint.com/.default"],
          };

          const response = await instance.acquireTokenSilent({
            ...request,
            account: account,
          });

          // lamba returns the access token
          return response.accessToken;
        });
        sp.setup({
          sp: {
            fetchClientFactory: () => client,
            baseUrl: "https://tfgonline.sharepoint.com/sites/DMSampleLocationTrackingDEV",
          },
        });
        const w = await sp.web.lists.getByTitle("Samples").items.select("Title", "ID").get();
        setSpData(w);
      }
    };
    handleAsyncFunc();
  }, [account, instance]);

  return { spData };
};

export { useSharePoint };
