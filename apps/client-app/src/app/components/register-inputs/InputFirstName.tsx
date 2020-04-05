import React from 'react';
import classNames from 'classnames';
import { valid } from '../../utility/utility';

export const InputFirstName = props => {
    const { register, errors, isSubmitted } = props;

    return (
        <div
            className={`col form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Imię<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Imię jest wymagane.'
                    },
                    minLength: {
                        value: 2,
                        message: 'Imię musi być dłuższe niż 2 litery.'
                    },
                    maxLength: {
                        value: 20,
                        message: 'Imię musi być krótszy niż 20 litery.'
                    }
                })}
                type="text"
                name="firstName"
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
