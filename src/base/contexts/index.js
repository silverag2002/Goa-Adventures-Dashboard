import React, { useState, useMemo, useCallback } from "react";
import AppStorage from "../utils/AppStorage";
import { ClientContext } from "./UserContext";

export const ContextWrapper = ({ children }) => {
  const [client, setClientState] = useState(AppStorage.getClientData());

  const setClient = useCallback(
    (client) => {
      console.log("Client in index.js", client);
      const tempClient = { ...client };
      AppStorage.setClientData(tempClient);
      setClientState(tempClient);
      // if (tempUser?._id) {
      //   Analytics.setIdentity(tempUser);
      // }
    },
    [setClientState]
  );

  const clientProviderState = useMemo(
    () => ({ client, setClient }),
    [client, setClient]
  );

  return (
    <ClientContext.Provider value={clientProviderState}>
      {children}
    </ClientContext.Provider>
  );
};
