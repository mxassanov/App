import {InferActionsTypes} from "./redux-store";

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

export const actions = {
  addMessage: (newMessageBody: string) =>
    ({type: 'DIALOGS/ADD-MESSAGE', newMessageBody} as const)
}

export const dialogsReducer =
  (state = initialState, action: ActionsType):
    InitialStateType => {
    switch (action.type) {
      case 'DIALOGS/ADD-MESSAGE':
        return {
          ...state,
          messages: [...state.messages, {id: 5, message: action.newMessageBody}],
        }
      default:
        return state
    }
  }


export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>