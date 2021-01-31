const ADD_MESSAGE = 'ADD-MESSAGE'

type DialogType = {
  id: number,
  name: string
}

type MessageType = {
  id: number,
  message: string
}

let initialState = {
  dialogs: [
    {id: 1, name: "Dmitriy"},
    {id: 2, name: "Andrey"},
    {id: 3, name: "Sveta"},
    {id: 4, name: "Sasha"},
    {id: 5, name: "Viktor"},
    {id: 6, name: "Valeriy"},
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: "Hi"},
    {id: 2, message: "Hello"},
    {id: 3, message: "How are you"},
    {id: 4, message: "Who"}
  ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

export const dialogsReducer =
  (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
      case ADD_MESSAGE:
        return {
          ...state,
          messages: [...state.messages, {id: 5, message: action.newMessageBody}],
        }
      default:
        return state
    }
  }

type AddMessageActionCreatorType = {
  type: typeof ADD_MESSAGE,
  newMessageBody: string
}

const addMessageActionCreator = (newMessageBody: string): AddMessageActionCreatorType =>
  ({type: ADD_MESSAGE, newMessageBody})

export default addMessageActionCreator