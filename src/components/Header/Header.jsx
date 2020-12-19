import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://img1.fonwall.ru/o/hh/blue-jay-birds-animals-minimalism.jpeg?route=mid&amp;h=750" alt='' />
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>LogOut</button> </div>
                    : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
}
export default Header;