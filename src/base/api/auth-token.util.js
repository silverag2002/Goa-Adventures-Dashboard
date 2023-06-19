import { isSSR } from "../constants/common.const";
import StorageUtil from "../utils/StorageUtil";
export class AuthTokenHandler {
  static setAccessToken(accessToken) {
    this.accessToken = accessToken;
    StorageUtil.set("Bearer", accessToken);
  }
  static getAccessToken() {
    if (isSSR) {
      return "";
    }
    this.accessToken = StorageUtil.get("Bearer");
    return this.accessToken;
  }
  static setAuthToken(authToken) {
    this.authToken = authToken;
    StorageUtil.set("AuthToken", authToken);
  }
  static getAuthToken() {
    if (isSSR) {
      return "";
    }
    this.authToken = StorageUtil.get("AuthToken");
    return this.authToken;
  }
  static clearToken() {
    this.accessToken = "";
    this.authToken = "";
    // StorageUtil.clear('AuthToken');
    // StorageUtil.clear('Bearer');
  }
}
AuthTokenHandler.accessToken = "";
AuthTokenHandler.authToken = "";
