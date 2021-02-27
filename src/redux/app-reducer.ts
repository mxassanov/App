import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS'

let initialState = {
  initialized: false,
}

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: InitializedSuccessActionType)
  : initialStateType => {

  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state;
  }
}

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = ()
  : ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType> =>
  (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
      .then(() => {
        dispatch(initializedSuccess());
      })
  }


export default appReducer;