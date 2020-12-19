import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            {/*<div className={s.profileInfo}>
                <img
                    src='https://www.wallpaperbetter.com/wallpaper/442/299/724/hexagon-minimalism-white-background-2K-wallpaper.jpg'/>
            </div>*/}
            <div className={s.description}>
                <img src={props.profile.photos.large} />
                description
            </div>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
    )
}
export default ProfileInfo;