import React from 'react';
import classNames from 'classnames';
import { valid } from '../../utility/utility';

export const InputUsernameCard = props => {
    const { register, errors, isSubmitted } = props;

    return (
        <div className={`form-group ${classNames({
            'was-validated': isSubmitted
        })}`}>
            <label>
                Właściciel karty<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Nazwa karty jest wymagana.'
                    },
                })}
                name="usernameCard"
                type="text"
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
