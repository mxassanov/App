import React, {useEffect, useState} from 'react';

const ProfileStatusHooks = (props) =>{
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
        props.updateStatus(status);
    }
    return <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{this.props.status || 'no status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange}
                           value={status} />
                </div>
            }
        </div>
}

export default ProfileStatusHooks;