import React from 'react';
import classNames from 'classnames';
import { valid } from '../../utility/utility';

export const InputPasswords = (props) => {
    const { register, errors, isSubmitted, watch } = props;

    return (
        <div className="form-row">
            <div className={`col-md-6 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}>
                <label>
                    Hasło<span className="required">*</span>
                </label>

                <input
                    ref={register({
                        required: {
                            value: true,
                            message: 'Hasło jest wymagane.'
                        },
                    })}
                    name="password"
                    type="password"
                    className={`form-control ${valid(errors.password)}`}
                />

                {errors.password && (
                    <div className="invalid-feedback">
                        <div>{errors.password.message}</div>
                    </div>
                )}
            </div>

            <div className={`col-md-6 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}>
                <label>
                    Powtórz hasło<span className="required">*</span>
                </label>

                <input
                    ref={register({
                        required: {
                            value: true,
                            message: 'Potwierdź hasło.'
                        },
                        validate: (value) => {
                            return value === watch('password') || 'Hasła nie są takie same';
                        }
                    })}
                    name="repeatPassword"
                    className={`form-control ${valid(errors.repeatPassword)}`}
                    type="password"
                />

                {errors.repeatPassword && (
                    <div className="invalid-feedback">
                        <div>{errors.repeatPassword.message}</div>
                    </div>
                )}
            </div>
        </div>
    )
};
