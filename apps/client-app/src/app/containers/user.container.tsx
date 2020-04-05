import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../+state';

export const User = () => {
    const user = useSelector((state: State) => state.authData.user);

    return (
        <article className="card mb-3">
            <div className="card-body">
                <figure className="icontext">
                    <div className="icon">
                        <img className="rounded-circle img-sm border" src="https://image.flaticon.com/icons/svg/149/149995.svg" alt="avatar" />
                    </div>

                    <div className="text">
                        <strong>
                            {' '}
                            {user.firstName} {user.lastName}
                        </strong>{' '}
                        <br />
                        <ul className="list-group">
                            <li className="list-unstyled">
                                Email: <strong>{user.email}</strong>
                            </li>
                            <li className="list-unstyled">
                                Telefon: <strong>{user.phoneNumber}</strong>
                            </li>
                        </ul>
                    </div>
                </figure>

                <hr />

                <div className="row mt-4 border-top-2">
                    <div className="col-md-6">
                        <div className="block">
                            <h5>
                                <i className="fa fa-map-marker text-muted" /> &nbsp; Adres:
                            </h5>

                            <ul>
                                <li>
                                    Państwo: <strong>{user.country}</strong>
                                </li>
                                <li>
                                    Miasto: <strong>{user.city}</strong>
                                </li>
                                <li>
                                    Ulica: <strong>{user.street}</strong>
                                </li>
                                <li>
                                    Number mieszkania: <strong>{user.numberOfBuilding}</strong>
                                </li>
                                <li>
                                    Kod pocztowy: <strong>{user.postalCode}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="block">
                            <h5>
                                <i className="fa fa-credit-card text-muted" /> &nbsp; Informacje o karcie:
                            </h5>

                            <ul>
                                <li>
                                    Właściciel karty: <strong>{user.payment.usernameCard}</strong>
                                </li>
                                <li>
                                    Numer karty: <strong>{user.payment.numberCard}</strong>
                                </li>
                                <li>
                                    Ważność karty:{' '}
                                    <strong>
                                        {user.payment.expirationMonth} / {user.payment.expirationYear}
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
