import CryptoJS from "crypto-js";

export const setItem = (
  key: string,
  value: string,
  encrypt: boolean | undefined = import.meta.env.VITE_ENVIRONMENT ===
    "production"
) => {
  if (encrypt) {
    const encryptValue = CryptoJS.AES.encrypt(
      value,
      import.meta.env.VITE_CYPHER_SALT
    ).toString();
    if (typeof window !== "undefined") localStorage.setItem(key, encryptValue);

    return encryptValue;
  }

  if (typeof window !== "undefined") localStorage.setItem(key, value);
  return value;
};

export const getItem = (
  key: string,
  decrypt: boolean | undefined = import.meta.env.VITE_ENVIRONMENT ===
    "production"
) => {
  if (decrypt) {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      return value
        ? CryptoJS.AES.decrypt(
            value,
            import.meta.env.VITE_CYPHER_SALT
          ).toString(CryptoJS.enc.Utf8)
        : undefined;
    }
  }

  return localStorage.getItem(key);
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") return localStorage.removeItem(key);
};
