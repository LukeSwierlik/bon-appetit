import React from 'react';
import { User } from './user.container';
import { Link, Route } from 'react-router-dom';
import { UserReservations } from './user-reservations.container';

export const UserDetails = (props) => {
    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <aside className="col-md-3">
                        <ul className="list-group">
                            <Link to={'/user'} className="list-group-item">Informacje o użytkowniku</Link>
                            <Link to={'/user/reservations'} className="list-group-item">Rezerwacje</Link>
                        </ul>
                    </aside>

                    <main className="col-md-9">
                        <>
                            <Route path={`${props.match.url}`} component={User} exact/>
                            <Route path={`${props.match.url}/reservations`} component={UserReservations} exact/>
                        </>
                    </main>
                </div>
            </div>
        </section>
    );
};
