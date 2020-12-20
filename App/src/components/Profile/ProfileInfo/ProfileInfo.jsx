import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>
            <div className={s.profileInfo}>
                <img
                    src='https://www.wallpaperbetter.com/wallpaper/442/299/724/hexagon-minimalism-white-background-2K-wallpaper.jpg'/>
            </div>
            <div className={s.description}>
                description
            </div>
        </div>
    )
}
export default ProfileInfo;