import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import AddMessageForm from "./AddMessageForm"
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
  dialogsPage: InitialStateType
  addMessage: (newMessageBody: string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

  let state = props.dialogsPage

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} id={m.id}/>)

  let addNewMessage = (values: NewMessageFormValuesType) => {
    props.addMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialog}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}

        <AddMessageForm onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs