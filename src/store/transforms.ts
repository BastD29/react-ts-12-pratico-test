import { encryptTransform } from "redux-persist-transform-encrypt";

const transforms = [
  encryptTransform({
    secretKey: import.meta.env.VITE_CYPHER_SALT,
  }),
];

export { transforms };
