import { UploadFile } from "antd";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../firebase-config";
import { IApiResponse, fetcher } from ".";

export const GetSelect = async (url: string): Promise<IApiResponse<any>> =>
  fetcher({ method: "get", url });

export const Upload = async ({
  entity,
  file,
}: {
  entity: string;
  file: UploadFile;
}): Promise<IApiResponse<string>> => {
  const fileRef = ref(
    storage,
    `${entity}/${new Date().getTime()}/${file.name}`
  );
  /* @ts-ignore */
  const uploadResult = await uploadBytes(fileRef, file.originFileObj);

  const url = await getDownloadURL(uploadResult.ref);
  return { data: url };
};

export const RemoveUpload = async ({
  file,
}: {
  file: UploadFile;
}): Promise<void> => {
  const fileRef = ref(storage, file.url);
  await deleteObject(fileRef);
};

export const SubmitForm = async ({
  method,
  url,
  data,
}: {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data: any;
}): Promise<IApiResponse<any>> => fetcher({ method, url, body: data });
