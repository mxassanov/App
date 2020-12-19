import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators";
import Textarea from "../../common/FormControls/FormControls";

let maxLength10 = maxLengthCreator(10);

const MyPosts = React.memo(props => {

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }
    let postsElements = props.posts.map(p => <Post message={p.message} like_counts={p.like_counts}/>)

    return (
        <div className={s.Myposts}>
            <h3>my posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            {postsElements}
        </div>
    )
})

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} placeholder={'Enter your message'}
                       validate={ [requiredField, maxLength10] } />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;