import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={s.message}>
            <img src="https://www.pngkey.com/png/detail/64-649393_black-popsocket-phone-grip-alis-io-invisible-skin.png"/>
            {props.message}
        </div>
    )
}


export default Message;