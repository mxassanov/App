const updateNewPostText = 'UPDATE-NEW-POST-TEXT';
const addPost = 'ADD-POST';


export const profileReducer = (state, action) => {

    switch (action.type) {
        case addPost:
            let newPost = {
                id: 5,
                message: state.newPostText,
                like_counts: 0,
            }
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case updateNewPostText:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}
const addPostActionCreator = () => {
    return {type: addPost}
};

export const updateNewPostTextActionCreator = (textPost) => {
    return {type: updateNewPostText, newText: textPost,}
}


export default addPostActionCreator;