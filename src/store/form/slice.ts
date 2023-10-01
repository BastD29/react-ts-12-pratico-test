import { UploadFile } from "antd";
import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { SAGA_FLOW_NAME } from "./sagas";
import { IFormInitialState } from "../../models/store/Form";

const initialState: IFormInitialState = {
  loader: undefined,

  submit: {},
  select: {},
  upload: {},

  error: undefined,
};

const slice = createSlice({
  name: "form",
  initialState,
  reducers: {
    reset: (state) => {
      state.loader = undefined;
      state.submit = {};
      state.select = {};
      state.upload = {};
      state.error = undefined;
    },
    // redux actions for current module
    setLoader: (state, action) => {
      state.loader = {
        ...state.loader,
        [action.payload.key]: action.payload.value,
      };
    },
    setFormStatus: (state, action) => {
      if (state?.submit?.[action.payload.key])
        state.submit = {
          ...state.submit,
          [action.payload.key]: {
            ...state.submit[action.payload.key],
            status: action.payload.value,
          },
        };
      else
        state.submit = {
          ...state.submit,
          [action.payload.key]: { status: action.payload.value },
        };
    },
    setSelect: (state, action) => {
      state.select = {
        ...state.select,
        [action.payload.key]: action.payload.value,
      };
    },
    setUpload: (state, action) => {
      if (state?.upload?.[action.payload.key]) {
        if (
          !state.upload[action.payload.key].find(
            ({ url }) => url === action.payload.value.url
          )
        ) {
          state.upload = {
            ...state.upload,
            [action.payload.key]: [
              ...state.upload[action.payload.key],
              action.payload.value,
            ],
          };
        }
      } else
        state.upload = {
          ...state.upload,
          [action.payload.key]: [action.payload.value],
        };
    },
    removeUpload: (state, action) => {
      const newUpload = state?.upload?.[action.payload.key]?.filter(
        ({ url }) => url !== action.payload.value
      );
      state.upload = { ...state.upload, [action.payload.key]: newUpload };
    },
    setError: (state, action) => {
      state.error = {
        ...state.error,
        [action.payload.key]: action.payload.value,
      };
    },
  },
});

const isLoader =
  (key: string | undefined) =>
  ({ form }: { form: IFormInitialState }) =>
    key ? form?.loader?.[key] : false;

const getFormStatus =
  (key: string | undefined) =>
  ({ form }: { form: IFormInitialState }) =>
    key ? form?.submit?.[key]?.status : undefined;
const getFormData =
  (key: string | undefined) =>
  ({ form }: { form: IFormInitialState }) =>
    key ? form?.submit?.[key]?.data : undefined;
const getSelect =
  (key: string | undefined) =>
  ({ form }: { form: IFormInitialState }) =>
    key ? form?.select?.[key] : undefined;
const getUpload =
  (key: string | undefined) =>
  ({ form }: { form: IFormInitialState }) =>
    key ? form?.upload?.[key] : undefined;

const getError =
  (key: string) =>
  ({ form }: { form: IFormInitialState }) =>
    form?.error?.[key];

export const selectors = {
  isLoader,

  getFormStatus,
  getFormData,
  getSelect,
  getUpload,

  getError,
};

// Extract the action creators object and the reducer
export const { actions, reducer } = slice;

export interface ISagaGetSelectsPayload {
  entity: string;
  url: string;
}
export interface ISagaGetUploadPayload {
  uuid: string;
  entity: string;
  file: UploadFile;
}
export interface ISagaSubmitFormPayload {
  uuid: string;
  method: string;
  url: string;
  data: any;
  onFinish?: (() => void) | undefined;
}

export const sagaActions = {
  sagaGetSelect: (payload?: ISagaGetSelectsPayload | undefined) => ({
    type: SAGA_FLOW_NAME.GET_SELECTS,
    payload,
  }),
  sagaUpload: (payload?: ISagaGetUploadPayload | undefined) => ({
    type: SAGA_FLOW_NAME.UPLOAD,
    payload,
  }),
  sagaRemoveUpload: (payload?: ISagaGetUploadPayload | undefined) => ({
    type: SAGA_FLOW_NAME.REMOVE_UPLOAD,
    payload,
  }),
  sagaSubmitForm: (payload?: ISagaSubmitFormPayload | undefined) => ({
    type: SAGA_FLOW_NAME.SUBMIT_FORM,
    payload,
  }),
};
