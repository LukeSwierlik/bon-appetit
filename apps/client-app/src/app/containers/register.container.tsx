import React from 'react';
import { useForm } from 'react-hook-form';
import { Gender } from '@bon-appetit/interfaces';
import classNames from 'classnames';
import { InputFirstName } from '../components/register-inputs/InputFirstName';
import { InputLastName } from '../components/register-inputs/InputLastName';
import { RadioGender } from '../components/register-inputs/RadioGender';
import { InputEmail } from '../components/register-inputs/InputEmail';
import { InputCity } from '../components/register-inputs/InputCity';
import { InputStreet } from '../components/register-inputs/InputStreet';
import { InputNumberOfBuilding } from '../components/register-inputs/InputNumberOfBuilding';
import { InputNumberOfFlat } from '../components/register-inputs/InputNumberOfFlat';
import { InputPostalCode } from '../components/register-inputs/InputPostalCode';
import { InputPhoneNumber } from '../components/register-inputs/InputPhoneNumber';
import { InputPasswords } from '../components/register-inputs/InputPasswords';
import { InputUsernameCard } from '../components/register-inputs/InputUsernameCard';
import { InputCardNumber } from '../components/register-inputs/InputCardNumber';
import { InputsExpirationCard } from '../components/register-inputs/InputsExpirationCard';
import { InputCVV } from '../components/register-inputs/InputCVV';
import { CheckboxTerms } from '../components/register-inputs/CheckboxTerms';
import { useDispatch, useSelector } from 'react-redux';
import { valid } from '../utility/utility';
import { State } from '../+state';
import { Alert, AlertType } from '../components/alert.component';
import { Spinner } from '../components/spinner';
import { areasPoland } from '../../../../admin-panel/src/constans';

type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    terms: string;
    city: string;
    phoneNumber: string;
    street: string;
    numberOfBuilding: string;
    numberOfFlat: string;
    postalCode: string;
    gender: Gender;
    area: string;
    usernameCard: string;
    numberCard: string;
    expirationMonth: number;
    expirationYear: number;
    cvv: number;
};


export const Register = () => {
    const { register, handleSubmit, watch, errors, formState, clearError, reset } = useForm<RegisterForm>();
    const commons = useSelector((state: State) => state.commonsData);
    const dispatch = useDispatch();

    const onSubmit = (formData: RegisterForm): void => {
        console.log('WYSLANE', formData);
        // dispatch(registerAction(formData));

        clearError();
        reset();
    };

    const errorCount = Object.values(errors).length;

    return (
        <section className="section-content padding-y">
            {commons.loaded ? (
                <div className="container">
                    <div className="mx-auto" style={{ maxWidth: '920px' }}>
                        {commons.success && <Alert type={AlertType.SUCCESS} message={'Rejestracja powiodła się! Możesz się zalogować!'} />}

                        {commons.error && (
                            <Alert
                                type={AlertType.DANGER}
                                message={
                                    'Operacja nie powiodła sie, sprobuj wysłac ponownie formularz. Jezeli problem dalej wystepuje, zglos to do administracji!!'
                                }
                            />
                        )}
                    </div>

                    <div className="card mx-auto" style={{ maxWidth: '920px' }}>
                        <article className="card-body">
                            <header className="mb-4">
                                <h4 className="card-title">Rejestracja</h4>
                            </header>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className={`${classNames({
                                    invalid: Object.values(errors).length
                                })}`}
                            >
                                <div className="form-row">
                                    <InputFirstName register={register} errors={errors.firstName} isSubmitted={errorCount} />

                                    <InputLastName register={register} errors={errors.lastName} isSubmitted={formState.isSubmitted} />
                                </div>

                                <div className="form-group">
                                    <RadioGender register={register} errors={errors.gender} isSubmitted={formState.isSubmitted} />
                                </div>

                                <div className="form-row">
                                    <InputEmail register={register} errors={errors.email} isSubmitted={formState.isSubmitted} />

                                    <InputCity register={register} errors={errors.city} isSubmitted={formState.isSubmitted} />
                                </div>

                                <div className="form-row">
                                    <InputStreet register={register} errors={errors.street} isSubmitted={formState.isSubmitted} />

                                    <div className="form-group col-md-6">
                                        <label>
                                            Województwo<span className="required">*</span>
                                        </label>

                                        <select
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: 'Województwo jest wymagane.'
                                                }
                                            })}
                                            name="area"
                                            className={`form-control ${valid(errors)}`}
                                        >
                                            <option defaultValue={'Wybierz'}>Wybierz...</option>
                                            {areasPoland.map(area => {
                                                return (
                                                    <option key={area} value={area}>
                                                        {area}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <InputNumberOfBuilding register={register} errors={errors.numberOfBuilding} isSubmitted={formState.isSubmitted} />

                                    <InputNumberOfFlat register={register} errors={errors.numberOfFlat} isSubmitted={formState.isSubmitted} />

                                    <div className="form-group col-md-4">
                                        <label>Piętro</label>
                                        <input type="text" className="form-control" />

                                        <div className="invalid-feedback">
                                            <div>Tylko liczby.</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <InputPostalCode register={register} errors={errors.postalCode} isSubmitted={formState.isSubmitted} />

                                    <InputPhoneNumber register={register} errors={errors.phoneNumber} isSubmitted={formState.isSubmitted} />
                                </div>

                                <InputPasswords register={register} errors={errors} isSubmitted={formState.isSubmitted} watch={watch} />

                                <InputUsernameCard register={register} errors={errors.usernameCard} isSubmitted={formState.isSubmitted} />

                                <InputCardNumber register={register} errors={errors.numberCard} isSubmitted={formState.isSubmitted} />

                                <div className="row">
                                    <div className="col-md flex-grow-0">
                                        <InputsExpirationCard register={register} errors={errors} isSubmitted={formState.isSubmitted} watch={watch} />
                                    </div>

                                    <div className="col-md-3">
                                        <InputCVV register={register} errors={errors.cvv} isSubmitted={formState.isSubmitted} />
                                    </div>
                                </div>

                                <CheckboxTerms register={register} errors={errors.terms} isSubmitted={formState.isSubmitted} />

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Zarejestruj
                                    </button>
                                </div>
                            </form>
                        </article>
                    </div>

                    <p className="text-center mt-4">
                        Masz konto? <a>Zaloguj się</a>
                    </p>
                </div>
            ) : (
                <Spinner />
            )}
        </section>
    );
};
