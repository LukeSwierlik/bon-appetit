import React from 'react';
import classNames from 'classnames';
import { valid } from '../../utility/utility';


export const InputEmail = (props) => {
    const {register, errors, isSubmitted} = props;

    return (
        <div className={`col-md-6 form-group ${classNames({
            'was-validated': isSubmitted
        })}`}>
            <label>
                Email<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Email jest wymagany.'
                    },
                    minLength: {
                        value: 5,
                        message: 'Email musi być dłuższy niż 5 znaków.'
                    },
                    maxLength: {
                        value: 25,
                        message: 'Email musi być krótszy niż 25 znaków.'
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Nie poprawna konstrukcja emaila."
                    }
                })}
                name="email"
                type="email"
                className={`form-control ${valid(errors)}`}
            />

            {errors && (
                <div className="invalid-feedback">
                    <div>{errors.message}</div>
                </div>
            )}
        </div>
    )
};
