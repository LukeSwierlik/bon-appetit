import classNames from 'classnames';
import React from 'react';
import { valid } from '../../utility/utility';

export const InputPhoneNumber = props => {
    const {register, errors, isSubmitted} = props;

    return (
        <div
            className={`col-md-6 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Numer telefonu<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Number telefonu jest wymagany.'
                    },
                })}
                type="text"
                name="phoneNumber"
                placeholder="123-456-789"
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
