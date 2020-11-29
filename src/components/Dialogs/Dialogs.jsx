import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import addMessageActionCreator, {updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer.jsx";




const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    let addMessage = () => {
        props.dispatch(addMessageActionCreator() )
    }
    let onDialogChange = (e) => {
        let textMessage = e.target.value;
        props.dispatch(updateNewMessageTextActionCreator(textMessage) );

    }

    let dialogsElements = state.dialogs.map ( d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements = state.messages.map ( m => <Message message={m.message} id={m.id} />);

    let valueText = state.newMessageText

    return (
        <div className={s.dialogs}>
            <div className={s.dialog}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                <textarea onChange={onDialogChange}
                          value={valueText} />
                </div>
                <div>
                <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}
export default Dialogs;