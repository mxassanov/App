import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            { props.message };
            <img src="https://www.pngkey.com/png/detail/64-649393_black-popsocket-phone-grip-alis-io-invisible-skin.png"/>
            <div>
                <span>Like {props.like_counts}</span>
            </div>
        </div>
    )
}

export default Post;