import React, { FunctionComponent } from 'react';

export enum AlertType {
    SUCCESS = 'success',
    DANGER = 'danger',
    PRIMARY = 'primary'
}

export const Alert: FunctionComponent<{ message: string, type: AlertType}> = ({message, type}) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            { message }
        </div>
    )
};
