import {actions, profileReducer} from "./profile-reduce";

let initialState = {
  posts: [
    {id: 1, message: "Hi", like_counts: 20},
    {id: 2, message: "Hello", like_counts: 15},
  ],
  profile: null,
  status: "",
  newPostText: ""
}


it("after deleting length of messages should be decrement", () => {
  let action = actions.deletePost(1);
  let newState = profileReducer(initialState, action)

  expect(newState.posts.length).toBe(1);

})