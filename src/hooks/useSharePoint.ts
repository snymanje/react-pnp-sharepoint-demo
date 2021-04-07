import { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { LambdaFetchClient } from "@pnp/common";
import { sp, SPRest } from "@pnp/sp/presets/all";

const useSharePoint = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const [spData, setSpData] = useState([]);
  const [pnpInstance, setPnpInstance] = useState<SPRest>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAsyncFunc = async () => {
      setIsLoading(true);
      if (account) {
        // create a new instance of the lambda fetch client
        const client = new LambdaFetchClient(async () => {
          const request = {
            scopes: [`${process.env.REACT_APP_TENANT}/.default`],
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
            baseUrl: `${process.env.REACT_APP_TENANT}/sites/M365React`,
          },
        });
        setPnpInstance(sp);
        const data = await sp.web.lists.getByTitle("Employee").items.select("ID","Title","Name","Surname","Department","Modified").get();
        setSpData(data);
        setIsLoading(false);
      }
    };
    handleAsyncFunc();
  }, [account, instance]);

  return { spData, isLoading, pnpInstance };
};

export { useSharePoint };
