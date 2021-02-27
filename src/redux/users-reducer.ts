import {UserType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {usersApi} from "../api/users-api"

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> // array of users id
}

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        })
      }
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        })
      }
    case "USERS/SET_USERS":
      return {...state, users: action.users}
    case "USERS/SET_CURRENT_PAGE":
      return {...state, currentPage: action.currentPage,}
    case "USERS/SET_TOTAL_USERS_COUNT":
      return {...state, totalUsersCount: action.count,}
    case "USERS/TOGGLE_IS_FETCHING":
      return {...state, isFetching: action.isFetching,}
    case "USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state, followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      }
    default:
      return state;
  }
}

export const actions = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', users} as const),
  unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
  setUsersTotalCount: (totalUsersCount: number) =>
    ({type: 'USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching} as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return async (
    dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersApi.getUsers(page, pageSize)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUsersTotalCount(data.totalCount))
  }
}

export const follow = (userId: number): ThunkType => {
  return async (
    dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await usersApi.follow(userId)

    if (response.data.resultCode === 0) {
      dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await usersApi.unfollow(userId)

    if (response.data.resultCode === 0) {
      dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
  }
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>