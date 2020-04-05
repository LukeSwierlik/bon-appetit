import classNames from 'classnames';
import React from 'react';
import { valid } from '../../utility/utility';

export const InputPostalCode = props => {
    const {register, errors, isSubmitted} = props;

    return (
        <div
            className={`col-md-6 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Kod pocztowy<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Kod pocztowy jest wymagany.'
                    }
                })}
                type="text"
                name="postalCode"
                placeholder="12-345"
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
