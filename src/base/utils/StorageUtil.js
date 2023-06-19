import * as CryptoJS from "crypto-js";
import { isSSR } from "../constants/common.const";
class StorageUtil {
  static set(key, data) {
    if (data && data !== undefined && data !== null && !isSSR) {
      localStorage.setItem(key, this.encryptData(data) || "");
    }
  }
  static clear(key) {
    if (!isSSR) {
      localStorage.removeItem(key);
    }
  }
  static get(key) {
    if (isSSR) return undefined;
    const data = localStorage.getItem(key);
    if (data && data !== "" && data !== " ") return this.decryptData(data);
    return undefined;
  }
  static encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.Secret).toString();
    } catch (e) {
      console.error(e);
      return "";
    }
  }
  static decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.Secret);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.error(e);
      return {};
    }
  }
  static clearAll() {
    try {
      const storageKeysToNoClear = [];
      const dataToNotClear = {};
      for (let i = 0; i < storageKeysToNoClear.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        dataToNotClear[storageKeysToNoClear[i]] = StorageUtil.get(
          storageKeysToNoClear[i]
        );
      }
      localStorage.clear();
      for (let i = 0; i < storageKeysToNoClear.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        StorageUtil.set(
          storageKeysToNoClear[i],
          dataToNotClear[storageKeysToNoClear[i]]
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}
StorageUtil.Secret = "i_have_some_small_master_secret_spt_pin";

export default StorageUtil;
