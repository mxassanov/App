import {profileAPI, ResultCodesEnum, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTOS_SUCCESS = "SAVE_PHOTOS_SUCCESS";

let initialState = {
  posts: [
    {id: 1, message: "Hi", like_counts: 20},
    {id: 2, message: "Hello", like_counts: 15},
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ""
}

export type InitialStateType = typeof initialState

type ActionsType = AddPostActionCreatorType | SetUserProfileType | SetStatusType | DeletePostType
  | SavePhotoSuccessType

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {
    case ADD_POST:
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
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile,
      }
    case SET_STATUS:
      return {
        ...state, status: action.status,
      }
    case DELETE_POST:
      return {...state, posts: state.posts.filter(p => p.id != action.id)}
    case SAVE_PHOTOS_SUCCESS:
      return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
    default:
      return state;
  }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}
const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => {
    return {type: ADD_POST, newPostText} }
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => {
  return {type: SET_USER_PROFILE, profile}
}
type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusType => {
  return {type: SET_STATUS, status}
}
type DeletePostType = {
    type: typeof DELETE_POST,
    id: number
}
export const deletePost = (id: number): DeletePostType => {
  return {type: DELETE_POST, id}
}
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTOS_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => {
  return {type: SAVE_PHOTOS_SUCCESS, photos}
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType =>
  async (dispatch) => {
  let response = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number): ThunkType =>
  async (dispatch) => {
  let response = await profileAPI.getStatus(userId)
  dispatch(setStatus(response.data));
}
export const updateStatus = (status: string): ThunkType =>
  async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    // handle error
  }
}
export const savePhoto = (file:any): ThunkType =>
  async (dispatch) => {
  let response = await profileAPI.savePhoto(file)

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
}
export const saveProfile = (profile: ProfileType): ThunkType =>

  async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === ResultCodesEnum.Success) {
    console.log(response.data)
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
    return Promise.reject(response.data.messages[0]);
  }
}

export default addPostActionCreator;
