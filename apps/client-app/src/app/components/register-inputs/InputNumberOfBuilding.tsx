import classNames from 'classnames';
import React from 'react';
import { valid } from '../../utility/utility';

export const InputNumberOfBuilding = props => {
    const {register, errors, isSubmitted} = props;

    return (
        <div
            className={`col-md-4 form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                Numer domu<span className="required">*</span>
            </label>

            <input
                ref={register({
                    required: {
                        value: true,
                        message: 'Numer domu jest wymagany.'
                    }
                })}
                type="text"
                name="numberOfBuilding"
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
