import classNames from 'classnames';
import React from 'react';
import { valid } from '../../utility/utility';

export const InputStreet = props => {
    const { register, errors, isSubmitted } = props;

    return (
        <div
            className={`col-md-6 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Ulica<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Ulica jest wymagane.'
                    },
                    minLength: {
                        value: 2,
                        message: 'Nazwa ulicy musi być dłuższa niż 2 litery.'
                    },
                    maxLength: {
                        value: 20,
                        message: 'Nazwa ulicy musi być krótsza niż 20 litery.'
                    }
                })}
                type="text"
                name="street"
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
