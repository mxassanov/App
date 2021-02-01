import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "fc072ac7-3793-4bd5-9f81-95d68d230752"
  }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`
    ).then(response => response.data);
  },
  getUsers2(pageNumber: number, pageSize: number) {
    return instance
      .get(`users?page=${pageNumber}&count=${pageSize}`
      ).then(response => response.data)
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  },
  getProfile(userId: number) {
    console.warn("Obsolete method, please use API profile object")
    return profileAPI.getProfile(userId);
  }

}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get('profile/' + userId)
  },
  getStatus(userId: number) {
    return instance.get('profile/status/' + userId)
  },
  updateStatus(status: string) {
    return instance.put('profile/status', {status: status})
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance.put('profile/photo', formData)
  },
  saveProfile(profile: ProfileType) {
    return instance.put<ProfileType>('profile', profile)
  }

}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
type LoginResponseType = {
  resultCode: ResultCodesEnum | ResultCodeForCaptcha
  messages: Array<string>
  data: {
    userId: number
  }
}
type LogoutResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>('auth/me').then(res => res.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
      .then(res => res.data)
  },
  logout() {
    return instance.delete<LogoutResponseType>(`auth/login`)
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  }
}