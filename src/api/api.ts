import axios from "axios"
import {UserType} from "../types/types"

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "fc072ac7-3793-4bd5-9f81-95d68d230752"
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetUsersType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D,
  resultCode: RC,
  messages: Array<string>
}