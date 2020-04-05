import classNames from 'classnames';
import React from 'react';
import { valid } from '../../utility/utility';

export const InputNumberOfFlat = props => {
    const {register, errors, isSubmitted} = props;

    return (
        <div
            className={`col-md-4 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Numer mieszkania
            </label>

            <input
                ref={register}
                type="text"
                name="numberOfFlat"
                className={`form-control ${valid(errors)}`}
            />
        </div>
    );
};
