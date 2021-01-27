import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTOS_SUCCESS = "SAVE_PHOTOS_SUCCESS";

let initialState = {
    posts: [
        {id: 1, message: "Hi", like_counts: "20"},
        {id: 2, message: "Hello", like_counts: "15"},
    ],
    profile: null,
    status: "",
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, message: action.newPostText, like_counts: 0,
            }
            return {
                ...state, posts: [...state.posts, newPost],
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
            return {...state, posts: state.posts.filter(p => p.id != action.id) }
        case SAVE_PHOTOS_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} }
        default:
            return state;
    }
}

const addPostActionCreator = (newPostText) => {return {type: ADD_POST, newPostText}};
export const setUserProfile = (profile) => { return {type: SET_USER_PROFILE, profile}}
export const setStatus = (status) => { return {type: SET_STATUS, status}}
export const deletePost = (id) =>{return {type: DELETE_POST, id}}
export const savePhotoSuccess = (photos) =>{return {type: SAVE_PHOTOS_SUCCESS, photos}}

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        // handle error
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0 ) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0 ) {
        dispatch(getUserProfile(userId));
    }
    else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]} ));
        return Promise.reject(response.data.messages[0]);
    }
}

export default addPostActionCreator;
