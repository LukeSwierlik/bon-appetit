import React from 'react';
import classNames from 'classnames';
import { Month } from '@bon-appetit/interfaces';
import { valid } from '../../utility/utility';
import { months } from '../../../../../admin-panel/src/constans';

export const InputsExpirationCard = props => {
    const { register, errors, isSubmitted, watch } = props;

    const generationMonths = (): Month[] => {
        return months.map((month, i) => ({
            id: i+1,
            name: month
        }))
    };

    const generationYears = (): number[] => {
        const date = new Date();
        const years = [];

        for (let i = date.getFullYear(); i <= date.getFullYear() + 15; i++) {
            years.push(i);
        }

        return years;
    };

    return (
        <div
            className={`form-group ${classNames({
                'was-validated': isSubmitted
            })}`}
        >
            <label>
                <span className="hidden-xs">Ważność karty</span>
                <span className="required">*</span>
            </label>

            <div className="form-inline align-items-start" style={{ minWidth: '420px' }}>
                <div className="form-group" style={{ width: '200px' }}>
                    <select
                        ref={register({
                            validate: (value) => {
                                return value !== 'MM' || 'Wybierz miesiąc';
                            }
                        })}
                        name='expirationMonth'
                        className={`form-control ${valid(errors.expirationMonth)}`}
                        style={{ width: `200px`}}
                        defaultValue={'MM'}
                    >
                        <option value={'MM'} disabled>MM</option>
                        {generationMonths().map(month => (
                            <option key={month.id} value={month.id}>{month.name}</option>
                        ))}
                    </select>

                    {errors.expirationMonth && (
                        <div className="invalid-feedback">
                            <div>{errors.expirationMonth.message}</div>
                        </div>
                    )}
                </div>

                <span style={{ width: '20px', textAlign: 'center', paddingTop: '7px' }}> / </span>

                <div className="form-group" style={{ width: `200px`}}>
                    <select
                        ref={register({
                            validate: (value) => {
                                return value !== 'YYYY' || 'Wybierz rok';
                            }
                        })}
                        name='expirationYear'
                        className={`form-control ${valid(errors.expirationYear)}`}
                        style={{ width: `200px`}}
                        defaultValue={'YYYY'}
                    >
                        <option value={'YYYY'} disabled>YYYY</option>
                        {generationYears().map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    {errors.expirationYear && (
                        <div className="invalid-feedback">
                            <div>{errors.expirationYear.message}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
