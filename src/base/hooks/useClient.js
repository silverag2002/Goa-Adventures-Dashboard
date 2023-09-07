import { useContext } from "react";
import { ClientContext } from "../contexts/UserContext";
export const useClient = () => {
  const { client } = useContext(ClientContext);
  return {
    client,
  };
};
