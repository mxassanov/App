import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  portionSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  users: Array<UserType>,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  followingInProgress: Array<number>
}

let Users: React.FC<PropsType> = ({
                                    totalItemsCount, pageSize, portionSize,
                                    currentPage, onPageChanged, users, ...props
                                  }) => {

  return <div>
    <div>
      <Paginator currentPage={currentPage} totalItemsCount={totalItemsCount}
                 pageSize={pageSize} onPageChanged={onPageChanged}
                 portionSize={portionSize}/>
    </div>
    <div>
      {users.map(u => <User key={u.id}
                            user={u}
                            followingInProgress={props.followingInProgress}
                            unfollow={props.unfollow}
                            follow={props.follow}/>
      )}
    </div>
  </div>

}

export default Users;