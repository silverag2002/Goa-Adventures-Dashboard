import StorageUtil from "./StorageUtil";
export default class AppStorage extends StorageUtil {
  static setClientData(client) {
    return StorageUtil.set("client", client);
  }
  static getClientData() {
    return StorageUtil.get("client");
  }
}
