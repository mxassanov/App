import React from 'react';
import styles from './FormControls.module.css';
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";

const FormControl: React.FC<WrappedFieldProps> =
  ({meta, children}) => {

    const hasError = meta.touched && meta.error;
    return (
      <div className={styles.formControl + ' ' + (hasError ? styles.error : "")}>
        <div>
          {children}
        </div>
        {hasError && <span>{meta.error}</span>}
      </div>
    )
  }

const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props;

  return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props;

  return <FormControl {...props}> <input {...input} {...restProps}/> </FormControl>
}

export function createField<FormKeysType extends string>
(placeholder: string | undefined, name: FormKeysType, validators: Array<FieldValidatorType>,
 component: React.FC<WrappedFieldProps>, props = {}, text = "") {
  return <div>
    <Field placeholder={placeholder} name={name}
           validate={validators}
           component={component}
           {...props}
    /> {text}
  </div>
}

export default Textarea;