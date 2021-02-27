import {InjectedFormProps, reduxForm} from "redux-form";
import React from 'react';
import {maxLengthCreator, requiredField} from "../../utils/validators";
import Textarea, {createField} from "../common/FormControls/FormControls";
import { NewMessageFormValuesType } from "./Dialogs";

const maxLength50 = maxLengthCreator(50)

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>
  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
              {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody",
                [requiredField, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export default reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)