import {ResultCodesEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {profileAPI} from "../api/profile-api"

let initialState = {
  posts: [
    {id: 1, message: "Hi", like_counts: 20},
    {id: 2, message: "Hello", like_counts: 15},
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ""
}

export const actions = {
  addPostActionCreator: (newPostText: string) => ({type: 'PROFILE/ADD-POST', newPostText} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
  deletePost: (id: number) => ({type: "PROFILE/DELETE_POST", id} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: "PROFILE/SAVE_PHOTOS_SUCCESS", photos} as const)
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/ADD-POST':
      let newPost = {
        id: 5,
        message: action.newPostText,
        like_counts: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    case 'PROFILE/SET_USER_PROFILE':
      return {
        ...state, profile: action.profile,
      }
    case 'PROFILE/SET_STATUS':
      return {
        ...state, status: action.status,
      }
    case "PROFILE/DELETE_POST":
      return {...state, posts: state.posts.filter(p => p.id != action.id)}
    case "PROFILE/SAVE_PHOTOS_SUCCESS":
      return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
    default:
      return state
  }
}

export const getUserProfile = (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))
  }

export const getStatus = (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
  }

export const updateStatus = (status: string): ThunkType =>
  async (dispatch) => {
    try {
      let response = await profileAPI.updateStatus(status)

      if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status))
      }
    } catch (error) {
      // handle error
    }
  }

export const savePhoto = (file: File): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(response.data.data.photos))
    }
  }

export const saveProfile = (profile: ProfileType): ThunkType =>
  async (dispatch,
         getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === ResultCodesEnum.Success) {
      console.log(response.data)
      if (userId !== null) {
        dispatch(getUserProfile(userId))
      } else {
        throw new Error("userId can't be null")
      }
    } else {
      dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
      return Promise.reject(response.data.messages[0])
    }
  }


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>