import { put, fork, select, call, takeEvery } from "redux-saga/effects";

import {
  ISagaGetSelectsPayload,
  ISagaGetUploadPayload,
  ISagaSubmitFormPayload,
} from "./slice";
import { formActions, formSelectors } from ".";
// import { entityActions } from "store/entity";
import { Log } from "../../services/analytics.service";
import { GetSelect, SubmitForm, Upload } from "../../services/form.service";
import { IApiResponse } from "../../services";

export const SAGA_FLOW_NAME = {
  GET_SELECTS: "GET_SELECTS",
  UPLOAD: "UPLOAD",
  REMOVE_UPLOAD: "REMOVE_UPLOAD",
  SUBMIT_FORM: "SUBMIT_FORM",
};

function* getSelects(action: any) {
  const method = "[👨‍👩‍👦] getSelects";

  Log(`${method} - start`);

  const { entity, url }: ISagaGetSelectsPayload = action.payload;
  Log(`${method} - entity: ${entity}, url: ${url}`);

  try {
    yield put(formActions.setLoader({ key: entity, value: true }));

    const _selects: { [key: string]: any[] } | undefined = yield select(
      formSelectors.getSelect(entity)
    );

    if (!_selects) {
      const selectData: IApiResponse<any> = yield call(GetSelect, url);
      Log(`${method} - selectData: ${JSON.stringify(selectData)}`);

      if (selectData?.data) {
        yield put(
          formActions.setSelect({ key: entity, value: selectData.data })
        );
      }
    }
  } catch (error) {
    /* @ts-ignore */
    yield put(formActions.setError({ key: entity, value: error }));
    Log(`${method} - error: ${error}`);
    Log(`${method} - error: ${JSON.stringify(error)}`);
  } finally {
    yield put(formActions.setLoader({ key: entity, value: false }));
    Log(`${method} - end`);
  }
}

function* upload(action: any) {
  const method = "[🎥] upload";

  Log(`${method} - start`);

  const { uuid, entity, file }: ISagaGetUploadPayload = action.payload;
  Log(
    `${method} - uuid: ${uuid}, entity: ${entity}, file: ${JSON.stringify(
      file
    )}`
  );

  try {
    yield put(formActions.setLoader({ key: uuid, value: true }));

    const uploadData: IApiResponse<any> = yield call(Upload, { entity, file });
    Log(`${method} - uploadData: ${JSON.stringify(uploadData)}`);

    if (uploadData?.data) {
      const url = uploadData.data;
      yield put(
        formActions.setUpload({
          key: uuid,
          value: { uid: url, name: url, url },
        })
      );
    }
  } catch (error) {
    /* @ts-ignore */
    yield put(formActions.setError({ key: uuid, value: error }));
    Log(`${method} - error: ${error}`);
    Log(`${method} - error: ${JSON.stringify(error)}`);
  } finally {
    yield put(formActions.setLoader({ key: uuid, value: false }));
    Log(`${method} - end`);
  }
}

function* removeUpload(action: any) {
  const method = "[🎥] removeUpload";

  Log(`${method} - start`);

  const { uuid, entity, file }: ISagaGetUploadPayload = action.payload;
  Log(
    `${method} - uuid: ${uuid}, entity: ${entity}, file: ${JSON.stringify(
      file
    )}`
  );

  try {
    yield put(formActions.setLoader({ key: uuid, value: true }));

    // yield call(RemoveUpload, { file });
    yield put(formActions.removeUpload({ key: uuid, value: file.url }));
  } catch (error) {
    /* @ts-ignore */
    yield put(formActions.setError({ key: uuid, value: error }));
    Log(`${method} - error: ${error}`);
    Log(`${method} - error: ${JSON.stringify(error)}`);
  } finally {
    yield put(formActions.setLoader({ key: uuid, value: false }));
    Log(`${method} - end`);
  }
}

function* submitForm(action: any) {
  const method = "[🏁] submitForm";

  Log(`${method} - start`);

  const {
    uuid,
    method: apiMethod,
    url,
    data,
    onFinish,
  }: ISagaSubmitFormPayload = action.payload;
  Log(
    `${method} - uuid: ${uuid}, method: ${method}, url: ${url}, data: ${JSON.stringify(
      data
    )}`
  );

  try {
    yield put(formActions.setLoader({ key: uuid, value: true }));

    /* @ts-ignore */
    const submitFormData: IApiResponse<any> = yield call(SubmitForm, {
      method: apiMethod,
      url,
      data,
    });
    Log(`${method} - submitFormData: ${JSON.stringify(submitFormData)}`);

    if (submitFormData?.data) {
      // yield put(formActions.setFormStatus(formActions.setFormStatus({ key: url, value: 'end' })))
      // yield put(entityActions.reset());
      yield put(formActions.reset());
    }

    onFinish?.();
  } catch (error) {
    /* @ts-ignore */
    yield put(formActions.setError({ key: uuid, value: error }));
    Log(`${method} - error: ${error}`);
    Log(`${method} - error: ${JSON.stringify(error)}`);
  } finally {
    yield put(formActions.setLoader({ key: uuid, value: false }));
    Log(`${method} - end`);
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* watchGetSelects() {
  yield takeEvery(SAGA_FLOW_NAME.GET_SELECTS, getSelects);
}
function* watchUpload() {
  yield takeEvery(SAGA_FLOW_NAME.UPLOAD, upload);
}
function* watchRemoveUpload() {
  yield takeEvery(SAGA_FLOW_NAME.REMOVE_UPLOAD, removeUpload);
}
function* watchSubmitForm() {
  yield takeEvery(SAGA_FLOW_NAME.SUBMIT_FORM, submitForm);
}

//=====================================
//  SAGAS
//-------------------------------------

export const formSagas = [
  fork(watchGetSelects),
  fork(watchUpload),
  fork(watchRemoveUpload),
  fork(watchSubmitForm),
];

//=====================================
//  FLOWS
//-------------------------------------

export const formFlows = {
  formSagas,
};
