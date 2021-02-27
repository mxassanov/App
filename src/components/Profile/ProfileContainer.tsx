import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reduce";
import {withRouter} from "react-router";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateType = {
    profile: string
    status: string
    authorizedUserId: number
    isAuth: boolean
}
type DispatchType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: () => void
    savePhoto: () => void
    saveProfile: () => void
}

class ProfileContainer extends React.Component<MapStateType & DispatchType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            //if (!userId) {
            //this.props.history.push("/login") //system redirect
            //}
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: MapStateType, prevState:AppStateType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return <Profile profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter) (ProfileContainer)