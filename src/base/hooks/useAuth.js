import { useContext } from "react";
import { ClientContext } from "../contexts/UserContext";
import { axiosInstance } from "../api/axios.util";
import { URLConstants } from "../api/url.constants";
import { AuthTokenHandler } from "../api/auth-token.util";

export const useAuth = () => {
  const { client, setClient } = useContext(ClientContext);

  const logout = () => {
    setClient(undefined);

    // StorageUtil.clearAll();
    // localStorage.clear();
    localStorage.removeItem("jwtToken");
    console.log("Logged out");
  };

  const login = (loginData) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(URLConstants.passwordLogin(), loginData)
        .then((response) => {
          try {
            console.log(" Client Login Successful", response);
            const data = response;

            const client = data;

            AuthTokenHandler.setAccessToken(data?.tokens?.accessToken);
            AuthTokenHandler.setAuthToken(data?.tokens?.authToken);
            localStorage.setItem("jwtToken", response.tokens);
            console.log("Setting client ", client);
            setClient(client);
          } catch (error) {
            console.error(error);
          }
          resolve({ client });
        })
        .catch((err) => {
          const errorMsg = err?.response?.data?.message;
          reject(errorMsg);
        });
    });
  };

  return {
    logout,
    login,
  };
};
