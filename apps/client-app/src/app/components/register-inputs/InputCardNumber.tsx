import React from 'react';
import classNames from 'classnames';
import { valid } from '../../utility/utility';

export const InputCardNumber = (props) => {
    const { register, errors, isSubmitted } = props;

    return (
        <div className={`form-group ${classNames({
            'was-validated': isSubmitted
        })}`}>
            <label>
                Numer karty<span className="required">*</span>
            </label>

            <div className="input-group">
                <input
                    ref={register({
                        required: {
                            value: true,
                            message: 'Number karty jest wymagany.'
                        },
                    })}
                    type="text"
                    className={`form-control ${valid(errors)}`}
                    name="numberCard"
                    placeholder="1234-1234-1234-1234"
                />

                <div className="input-group-append">
                    <span className="input-group-text">
                        <i className="fab fa-cc-visa"/> &nbsp; <i
                        className="fab fa-cc-amex"/> &nbsp;
                        <i className="fab fa-cc-mastercard"/>
                    </span>
                </div>

                {errors && (
                    <div className="invalid-feedback">
                        <div>{errors.message}</div>
                    </div>
                )}
            </div>
        </div>
    )
};
