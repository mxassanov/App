import React from 'react'
import s from './MyPosts.module.css'
import Post from "./Post/Post"
import AddNewPostFormRedux from './Post/AddNewPostForm'

const MyPosts = React.memo(props => {

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} like_counts={p.like_counts}/>)

    return (
        <div className={s.Myposts}>
            <h3>my posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            {postsElements}
        </div>
    )
})

export default MyPosts;