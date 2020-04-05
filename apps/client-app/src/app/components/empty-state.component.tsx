import React from 'react';
import { Alert, AlertType } from './alert.component';

export const EmptyState = (props) => {
    return (
        <div className='empty-state col'>
            <div className="mx-auto my-2 col" style={{ maxWidth: '920px'}}>
                <div className='d-flex'>
                    <div className="col align-self-center">
                        <i className="far fa-grin-beam-sweat"/>
                        <Alert type={AlertType.PRIMARY} message={props.message}/>
                    </div>
                </div>
            </div>
        </div>
    )
};
