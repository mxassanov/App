import {GetUsersType, instance, APIResponseType} from "./api"

export const usersApi = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<GetUsersType>
    (`users?page=${currentPage}&count=${pageSize}`)
      .then(res => res.data);
  },
  follow(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`)
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  }
}