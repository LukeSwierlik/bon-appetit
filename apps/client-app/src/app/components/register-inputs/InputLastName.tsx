import classNames from 'classnames';
import React from 'react';
import { valid } from '../../utility/utility';

export const InputLastName = props => {
    const {register, errors, isSubmitted} = props;

    return (
        <div
            className={`col form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Nazwisko<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Nazwisko jest wymagane.'
                    },
                    minLength: {
                        value: 2,
                        message: 'Nazwisko musi być dłuższe niż 2 litery.'
                    },
                    maxLength: {
                        value: 20,
                        message: 'Nazwisko musi być krótszy niż 20 litery.'
                    }
                })}
                type="text"
                name="lastName"
                className={`form-control ${valid(errors)}`}
            />

            {errors && (
                <div className="invalid-feedback">
                    <div>{errors.message}</div>
                </div>
            )}
        </div>
    );
};
