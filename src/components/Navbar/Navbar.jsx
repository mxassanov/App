import React from 'react';
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
const Navbar = (props) => {
    return (
        <nav className={s.nav} state={props.state.sideBar}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/messages" activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/news">News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/settings">Settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/friends">
                    <h2>Friends</h2>
                    <div className={s.item}>
                    <img src="https://www.pngkey.com/png/detail/64-649393_black-popsocket-phone-grip-alis-io-invisible-skin.png" />
                    <img src="https://www.pngkey.com/png/detail/64-649393_black-popsocket-phone-grip-alis-io-invisible-skin.png" />
                    <img src="https://www.pngkey.com/png/detail/64-649393_black-popsocket-phone-grip-alis-io-invisible-skin.png" />
                    </div>
                </NavLink>
            </div>
        </nav>
    )
}
export default Navbar;