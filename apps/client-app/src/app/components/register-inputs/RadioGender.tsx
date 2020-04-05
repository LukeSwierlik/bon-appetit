import React from 'react';

export const RadioGender = props => {
    const { register, errors, isSubmitted } = props;

    return (
        <>
            <div>
                <label>
                    Płeć<span className="required">*</span>
                </label>
            </div>

            <label className="custom-control custom-radio custom-control-inline">
                <input
                    ref={register}
                    defaultChecked={true}
                    className="custom-control-input"
                    type="radio"
                    name="gender"
                />
                <span className="custom-control-label">Mężczyzna</span>
            </label>

            <label className="custom-control custom-radio custom-control-inline">
                <input
                    ref={register}
                    className="custom-control-input"
                    type="radio"
                    name="gender"
                />
                <span className="custom-control-label">Kobieta</span>
            </label>
        </>
    );
};
