import { useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
//import { ProfileData, graphService, graphSPService } from "./graph";
//import "./styles/App.css";
import { Button } from "@material-ui/core";

import Tabledata from "../components/muiTable";

//import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import { LambdaFetchClient } from "@pnp/common";
import { sp } from "@pnp/sp/presets/all";

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [spData, setSpData] = useState([]);

  const RequestProfileData = async () => {
    if (account) {
      const resp = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      console.log(resp);
      /* const data = await graphService(resp.accessToken);
      setGraphData(data);

      const spdata = await graphSPService(resp.accessToken);
      console.log(spdata); */

      // setup graph with the client
      /* graph.setup({
                graph: {
                    fetchClientFactory: () => client,
                },
            });

            const result = await graph.me();
            console.log(result) */

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

  return (
    <>
      <div className='container'>
        {/* <Tabledata /> */}
        <h5 className='card-title'>Welcome {account ? account.name : "unknown"}</h5>
        <Button color='secondary' onClick={RequestProfileData}>
          Request Profile Information
        </Button>
        <div>
          {spData.map((item) => (
            <div>
              <p>{item.Title}</p>
              <p>{item.ID}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
