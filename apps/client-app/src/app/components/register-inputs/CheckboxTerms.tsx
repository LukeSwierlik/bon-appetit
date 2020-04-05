import React from 'react';
import classNames from 'classnames';

export const CheckboxTerms = props => {
    const { register, errors } = props;

    return (
        <div className="form-group">
            <label className="custom-control custom-checkbox">
                <input
                    ref={register({
                        required: {
                            value: true,
                            message: 'Zgoda regulaminu jest wymagana.'
                        }
                    })}
                    name="terms"
                    type="checkbox"
                    className="custom-control-input"
                />

                <div className="custom-control-label">
                    Zgadzam się z <button className="btn btn-link">warunkami i regulaminem</button>
                </div>
            </label>

            {errors && (
                <div className="invalid-feedback">
                    <div>{errors.message}</div>
                </div>
            )}
        </div>
    );
};
