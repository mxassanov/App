import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

type ActionsType = SetAuthUserDataType | GetCaptchaUrlSuccessTYpe

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

type SetAuthUserDataActionPayloadType = {
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
}

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA,
  payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData =
  (userId: number | null, email: string | null, login: string | null, isAuth: boolean)
    : SetAuthUserDataType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
  })
type GetCaptchaUrlSuccessTYpe = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessTYpe => ({
  type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType =>
  async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
      let {id, login, email} = meData.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  };

export const login = (email: string, login: string, rememberMe: boolean, captcha: string): ThunkType =>
  async (dispatch: any) => {
    let data = await authAPI.login(email, login, rememberMe, captcha)

    if (data.resultCode === ResultCodesEnum.Success) {
      //success, get auth data
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }

      let message = data.messages.length > 0 ? data.messages[0] : "some error";
      dispatch(stopSubmit("login", {_error: message}));
    }
  }

export const getCaptchaUrl = (): ThunkType =>
  async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
  }

export const logout = (): ThunkType =>
  async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }


export default authReducer;