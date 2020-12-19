import React from 'react';
import {connect} from 'react-redux';
import follow, {setCurrentPage,
    toggleFollowingProgress, unfollow, requestUsers} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/preloader/preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null }
            <Users totalItemsCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   portionSize={10}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}
/* let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAc(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAc(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAc(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAc(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAc(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAc(isFetching))
        },
    }
}
*/

export default compose(withAuthRedirect, connect(mapStateToProps,
    {follow,unfollow,setCurrentPage, toggleFollowingProgress,requestUsers}) )
(UsersContainer);
