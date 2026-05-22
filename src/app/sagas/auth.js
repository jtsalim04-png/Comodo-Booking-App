import { takeLatest, call, put } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_COMPLETE,
  USER_LOGIN_ERROR,
} from '../actions';
import { userLogin as userLoginApi } from '../api/auth';

export function* userLoginAsync(action) {
  console.log('User login saga started: ', action);

  try {
    yield put({ type: USER_LOGIN_REQUEST });

    const data = yield call(userLoginApi, action.payload);

    if (!data?.token) {
      throw new Error('Login succeeded but no token was returned from the server.');
    }

    yield put({
      type: USER_LOGIN_COMPLETE,
      payload: {
        token: data.token,
        user: data.user || { email: action.payload?.email },
      },
    });
  } catch (error) {
    console.log('User login saga error: ', error);
    yield put({
      type: USER_LOGIN_ERROR,
      error: error?.message || 'Login failed',
    });
  }
}

export function* userLogin() {
  yield takeLatest(USER_LOGIN, userLoginAsync);
}
