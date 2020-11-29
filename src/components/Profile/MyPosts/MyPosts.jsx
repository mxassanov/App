import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import addPostActionCreator from "../../../redux/profile-reducer";
import updateNewPostTextActionCreator from "../../../redux/profile-reducer2";

const MyPosts = (props) => {
    let newPostElement = React.createRef();

    let addPost = () => {
        debugger;
        props.dispatch( addPostActionCreator() );
    }

    let onPostChange = () => {
        let textPost = newPostElement.current.value;
        props.dispatch(updateNewPostTextActionCreator(textPost) );

    }

    let postsElements = props.posts.map(p => <Post message={p.message} like_counts={p.like_counts} />)

    return (
        <div className={s.Myposts}>
            <h3>my posts</h3>
            <div>
                <div>
                <textarea ref={newPostElement}
                          onChange={onPostChange}
                          value={props.newPostText} />
                </div>
                <div>
                <button onClick={addPost}>Send</button>
                </div>
            </div>
            {postsElements}
        </div>
    )
}

export default MyPosts;