import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { State } from '../+state';
import { Spinner } from './spinner';
import { Alert, AlertType } from './alert.component';
import { valid } from '../utility/utility';
import classNames from 'classnames';

type ReservationForm = {
    tableId: number;
    peopleCount: number;
    date: string;
    hour: string;
};

export const FormReservation = ({ tables, createReservation }) => {
    const [maxPeopleCount, setMaxPeopleCount] = useState(0);
    const commons = useSelector((state: State) => state.commonsData);
    const user = useSelector((state: State) => state.authData.user);
    const { register, handleSubmit, watch, errors, formState } = useForm<ReservationForm>();

    const handleChange = (e) => {
        const chooseTableId = parseInt(e.target.value, 10);
        const table = tables.find(t => t.id === chooseTableId);

        setMaxPeopleCount(table.maxPeopleCount || 0);
    };

    const currentDate = (): string => {
        const date = new Date();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();

        return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
        ].join('-');
    };

    return (
        <div className="container">
            {commons.loaded ? (
                <div className="row">
                    <div className="col-md-8 card mx-auto">
                        <article className="card-body">
                            <header className="mb-4">
                                <h4 className="card-title">Formularz rezerwacji</h4>
                            </header>

                            <div className="mx-auto" style={{ maxWidth: '920px' }}>
                                {commons.success && <Alert type={AlertType.SUCCESS} message={'Rezerwacja się udała!'} />}

                                {commons.error && (
                                    <Alert
                                        type={AlertType.DANGER}
                                        message={
                                            'Wystąpiły problemy podczas rezerwacji! Spróbuj ponownie.'
                                        }
                                    />
                                )}
                            </div>

                            <form
                                onSubmit={handleSubmit(createReservation)}
                                className={`${classNames({
                                    invalid: Object.values(errors).length
                                })}`}
                            >
                                <div className="form-row">
                                    <div className={`col form-group ${classNames({
                                        'was-validated': formState.isSubmitted
                                    })}`}>
                                        <label>
                                            Wybierz stolik<span className="required">*</span>
                                        </label>

                                        <select
                                            defaultValue={0}
                                            onChange={handleChange}
                                            ref={register}
                                            name="tableId"
                                            className="form-control"
                                        >
                                            <option disabled value={0}>Wybierz...</option>
                                            {tables.map(table => {
                                                return (
                                                    <option key={table.id} value={table.id}>{table.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="col form-group">
                                        <label>
                                            Ilu osoby<span className="required">*</span>
                                        </label>

                                        <div className="input-group">
                                            <input
                                                ref={register({
                                                    required: {
                                                        value: true,
                                                        message: 'To pole jest wymagane.'
                                                    },
                                                    min: {
                                                        value: 1,
                                                        message: 'Minimalna wartość to 1.'
                                                    },
                                                    max: {
                                                        value: maxPeopleCount,
                                                        message: `Maksymalnie może być ${maxPeopleCount} przy tym stoliku.`
                                                    }
                                                })}
                                                disabled={!watch('tableId')}
                                                name="peopleCount"
                                                type="number"
                                                className={`form-control ${valid(errors.peopleCount)}`}
                                                min={1}
                                                max={maxPeopleCount}
                                            />

                                            <div className="input-group-append">
                                                <span className="input-group-text" id="inputGroupPrepend3">
                                                    max. {maxPeopleCount}
                                                </span>
                                            </div>
                                        </div>

                                        {errors.peopleCount && (
                                            <div className="invalid-feedback">
                                                <div>{errors.peopleCount.message}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>
                                            Wybierz date<span className="required">*</span>
                                        </label>

                                        <div className="input-group">
                                            <input
                                                ref={register({
                                                    required: {
                                                        value: true,
                                                        message: 'Data jest wymagana.'
                                                    },
                                                })}
                                                name="date"
                                                type="date"
                                                className={`form-control ${valid(errors.date)}`}
                                                min={currentDate()}
                                            />
                                        </div>

                                        {errors.date && (
                                            <div className="invalid-feedback">
                                                <div>{errors.date.message}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="col form-group">
                                        <label>
                                            Wybierz godzine<span className="required">*</span>
                                        </label>

                                        <input
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: 'Godzina jest wymagana.'
                                                },
                                            })}
                                            defaultValue={'12:00'}
                                            name="hour"
                                            type="time"
                                            className={`form-control ${valid(errors.hour)}`}
                                            min={'12:00'}
                                            max={'22:00'}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        disabled={!user}
                                    >
                                        Zrób rezerwacje
                                    </button>
                                </div>
                            </form>
                        </article>
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
};
