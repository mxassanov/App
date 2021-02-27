import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Textarea from "../../../common/FormControls/FormControls";
import {maxLengthCreator, requiredField} from "../../../../utils/validators";
import React from "react";

let maxLength10 = maxLengthCreator(10)

type PropsType = {}
type AddNewPostFormValuesType = {

}

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType>
  = (props) => {
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

export default AddNewPostFormRedux