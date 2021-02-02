import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router";
import styles from "../common/FormControls/FormControls.module.css";
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC< InjectedFormProps<LoginFormValuesData, LoginFormOwnProps> & LoginFormOwnProps > =
  ({handleSubmit, error, captchaUrl}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field placeholder={'Email'} name={'email'} component={Input} validate={requiredField}/>
        </div>
        <div>
          <Field placeholder={'Password'} name={'password'} component={Input}
                 validate={requiredField} type={'password'}/>
        </div>
        <div>
          <Field component={Input} name={'rememberMe'} type={'checkbox'}
                 validate={requiredField}/> remember me
        </div>
        {captchaUrl && <img alt='' src={captchaUrl}/>}

        {captchaUrl &&
        <div>
          <Field component={Input} name={'captcha'} validate={requiredField}
                 placeholder={'Symbols from image'}/>
        </div>}

        {error && <div className={styles.errorSummaryError}>
          {error}
        </div>
        }
        <div>
          <button>Submit</button>
        </div>
      </form>
    )
  }

const LoginReduxForm = reduxForm<LoginFormValuesData, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesData = {
  captcha: string
  rememberMe: boolean
  password: string
  email: string

}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> =
  (props) => {

    const onSubmit = (formData: LoginFormValuesData) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
      return <Redirect to={'/profile'}/>
    }

    return (
      <div>
        <h1>login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
      </div>
    )
  }
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {login})(Login)