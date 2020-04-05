import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../+state';

export const RestaurantDetails = (props) => {
    const { restaurant, showDishes } = props;
    const dishesLength = useSelector((state: State) => state.dishesData.dishes.length);

    const generateBadge = (opened: boolean): JSX.Element => {
        let badgeType = 'badge-danger';
        let text = 'Zamknięte';

        if (opened) {
            badgeType = 'badge-success';
            text = 'Otwarte';
        }

        return (
            <span className={`badge ${badgeType}`}>{text}</span>
        )
    };

    const generateButton = (opened: boolean) => {
        let buttonType = 'btn-secondary';
        let text = 'Pokaż dania';

        if (showDishes) {
            buttonType = 'btn-primary';
            text = 'Zrób rezerwacje';
        }

        return (
            <button
                onClick={() => props.toggleReservationForm()}
                className={`btn btn-block ${buttonType}`}
                disabled={!opened}
            >{text}</button>
        )
    };

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="card">
                    <div className="row no-gutters">
                        <aside className="col-md-6">
                            <article className="gallery-wrap">
                                <div className="img-big-wrap">
                                    <div>
                                        <a href="#">
                                            <img src={restaurant.heroUrl} />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </aside>

                        <main className="col-md-6 border-left">
                            <article className="content-body">
                                <h2 className="title">{ restaurant.name }</h2>

                                <p>
                                    Virgil Abloh’s Off-White is a streetwear-inspired collection that continues to break away from the conventions
                                    of mainstream fashion. Made in Italy, these black and brown Odsy-1000 low-top sneakers.
                                </p>

                                <dl className="row">
                                    <dt className="col-sm-3">Status</dt>
                                    <dd className="col-sm-9">
                                        {generateBadge(restaurant.opened)}
                                    </dd>

                                    <dt className="col-sm-3">Ilość dań</dt>
                                    <dd className="col-sm-9">{dishesLength}</dd>
                                </dl>

                                <div className="row mt-4">
                                    <div className="col-mb-6">
                                        {generateButton(restaurant.opened)}
                                    </div>
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
};
