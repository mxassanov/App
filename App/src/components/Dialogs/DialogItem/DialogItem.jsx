import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialogItem + ' ' + s.active}>
            <img src="https://www.pngkey.com/png/detail/64-649393_black-popsocket-phone-grip-alis-io-invisible-skin.png"/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;