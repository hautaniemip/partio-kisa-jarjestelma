import React from 'react';

import './Alert.css';

const Alert = ({children, type, message, index, closeCallback}) => {
    return (
        <div className={`alert ${type}`}>
			<span className="close-button" onClick={() => closeCallback(index)}>
				&times;
			</span>
            {children ? children : message}
        </div>
    );
}

const AlertContainer = ({children}) => {
    return (
        <div className="alert-container">
            {children}
        </div>
    );
}


export default Alert;
export {AlertContainer};