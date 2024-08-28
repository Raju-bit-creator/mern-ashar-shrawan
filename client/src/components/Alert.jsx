import React from 'react'

const Alert = (props) => {
    // console.log(props.alert.type);

    return (
    
            props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{props.alert.type}</strong> : {props.alert.message}
            </div>
     
    )
}

export default Alert