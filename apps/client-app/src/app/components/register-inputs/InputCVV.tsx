import React from 'react';
import classNames from 'classnames';
import { valid } from '../../utility/utility';

export const InputCVV = (props) => {
    const { register, errors, isSubmitted } = props;

    return (
        <div className={`form-group ${classNames({
            'was-validated': isSubmitted
        })}`}>
            <label>
                Kod CVV
                <span className="required">*</span>
                <i className="fa fa-question-circle"/>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Kod CVV jest wymagany.'
                    },
                })}
                name="cvv"
                className={`form-control ${valid(errors)}`}
                type="text"
            />

            {errors && (
                <div className="invalid-feedback">
                    <div>{errors.message}</div>
                </div>
            )}
        </div>
    )
};
