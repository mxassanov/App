import React, {ChangeEvent, useEffect, useState} from 'react';

const ProfileStatusHooks = (props: any) =>{
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
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
        props.updateStatus(status);
    }
    return <div>
            {!editMode &&
                <div>
                   <b>Status</b> <span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
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