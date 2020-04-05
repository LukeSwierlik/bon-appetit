import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../+state';
import { fetchReservationsAction } from '../+state/reservations/reservations.actions';
import { fetchAndSelectRestaurantAction } from '../+state/restaurants/restaurants.actions';
import { Alert, AlertType } from '../components/alert.component';
import { ReservationStatus } from '@bon-appetit/interfaces';

export const UserReservations = (props) => {
    const user = useSelector((state: State) => state.authData.user);
    const { reservations, loaded } = useSelector((state: State) => state.reservationsData);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            dispatch(fetchReservationsAction(user.id));
        } else {
            props.history.push('/');
        }

    }, []);

    const getDate = (date: Date): string => {
        return new Date(date).toLocaleDateString();
    };

    const showRestaurant = (restaurantId: number) => {
        dispatch(fetchAndSelectRestaurantAction(restaurantId));

        props.history.push(`/restaurant/${restaurantId}`);
    };

    const getClassReservationStatus = (status: ReservationStatus): string => {
        switch (status) {
            case ReservationStatus.PRZYJETO: {
                return 'badge-success';
            }
            case ReservationStatus.ANULOWANO: {
                return 'badge-danger';
            }
            case ReservationStatus.ZAKONCZONO: {
                return 'badge-secondary'
            }
        }
    };

    return (
        <>
            <div>
                {!!reservations.length ? reservations.map(reservation => {
                    return (
                        <main
                            key={reservation.id}
                            className="col-md-12 mb-4">
                            <article className="card">
                                <header className="card-header">
                                    <strong className="d-inline-block mr-3">ID rezerwacji: {reservation.id}</strong>
                                    <span>Data rezerwacji: {getDate(reservation.date)}, {reservation.hour}</span>
                                </header>

                                <div className="card-body">
                                    <div className="row">
                                        <div className="status-badge">
                                            <span className={`badge px-4 py-2 ${getClassReservationStatus(reservation.status)}`}>{reservation.status}</span>
                                        </div>

                                        <div className="col-md-8">
                                            <h4 onClick={() => showRestaurant(reservation.restaurantId)}
                                                className="text-primary">
                                                <strong>{reservation.restaurant.name}</strong>
                                            </h4>

                                            <ul>
                                                <li>
                                                    Telefon: <strong>{reservation.restaurant.phoneNumber}</strong>
                                                </li>
                                                <li>
                                                    Email: <strong>{reservation.restaurant.email}</strong>
                                                </li>
                                            </ul>

                                            <div className="block">
                                                <h6 className="text-muted">Adres:</h6>

                                                <ul>
                                                    <li>
                                                        Miasto: <strong>{reservation.restaurant.city}</strong>
                                                    </li>
                                                    <li>
                                                        Ulica: <strong>{reservation.restaurant.street}</strong>
                                                    </li>
                                                    <li>
                                                        Number budynku: <strong>{reservation.restaurant.numberOfBuilding}</strong>
                                                    </li>
                                                    <li>
                                                        Kod pocztowy: <strong>{reservation.restaurant.postalCode}</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <h6 className="text-muted">Stolik</h6>

                                            <span className="text-primary">{reservation.table.name}</span>
                                            <p>
                                                <span className="b">{reservation.peopleCount} / {reservation.table.maxPeopleCount}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </main>
                    );
                }) : (
                    <div>
                        <Alert type={AlertType.PRIMARY} message={"Nie masz aktualnie rezerwacji"}/>
                    </div>
                )}
            </div>
        </>
    );
};
