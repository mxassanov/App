import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {

    return <div>
        <div>
        <Paginator currentPage={props.currentPage} totalItemsCount={props.totalItemsCount}
                   pageSize={props.pageSize} onPageChanged={props.onPageChanged}
                   portionSize={props.portionSize} />
    </div>
    <div>
        {props.users.map(u => <User key={u.id}
                                    user={u}
                                    followingInProgress={props.followingInProgress}
                                    unfollow={props.unfollow} follow={props.follow}/>
        )}
    </div>
</div>

}

export default Users;