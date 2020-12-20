const addMessage = 'ADD-MESSAGE';
const updateNewMessageText = 'UPDATE-NEW-MESSAGE-TEXT';

export const dialogsReducer = (state, action) => {

    switch (action.type) {
        case addMessage:
            let newMessage = {
                id: 5,
                message: state.newMessageText,
            }
            state.messages.push(newMessage);
            state.messages = '';
            break;
        case updateNewMessageText:
            state.newMessageText = action.newMessage;
            break;
        default:
            return state;
    }
}
const addMessageActionCreator = () => ( {type: addMessage} )

export const updateNewMessageTextActionCreator = (textMessage) => {
    return {type: updateNewMessageText, newMessage: textMessage,}
}


export default addMessageActionCreator;