import React from "react";
import Textarea, {createField, Input} from "../../common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import styles from "../../common/FormControls/FormControls.module.css";

const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>save</button>
        </div>
        { props.error && <div className={styles.errorSummaryError}>
            {props.error}
        </div>
        }
        <div>
            <b>full name:</b> {createField("full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job:</b>
            {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skill:</b> {createField("My professional skills",
            "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me:</b>
            {createField("about me", "aboutMe", [], Textarea)}
        </div>
        {<div>
            <b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
            return <div key={key} className={s.contact}>m
                <b> {key} : </b> {createField(key, "contacts." + key, [], Input)}
            </div>
        })}
        </div>}
    </form>
}

const ProfileDataFormRedux = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormRedux;