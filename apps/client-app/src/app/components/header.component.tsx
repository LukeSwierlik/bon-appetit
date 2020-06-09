import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../+state';
import classNames from 'classnames';
import { logoutAction } from '../+state/auth/auth.actions';
import { fetchOrdersAction } from '../+state/orders/orders.actions';
import { useDebouncedCallback } from 'use-debounce';
import { searchRestaurant } from '../+state/restaurants/restaurants.service';
import { historyRouter } from '../router/history';

export const Header = () => {
    const [collapseDropdown, setCollapseDropdown] = useState(false);
    const [results, setResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const user = useSelector((state: State) => state.authData.user);

    const sumOrder = useSelector((state: State) => {
        const orders = state.ordersData.orders;

        let sumOrders = 0;

        orders
            .filter(order => order.paid === 0)
            .forEach(order => {
                sumOrders += order.count;
            });

        return sumOrders;
    });
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction());
    };

    useEffect(() => {
        if (user) {
            dispatch(fetchOrdersAction(user.id));
        }
    });

    const [debouncedCallback] = useDebouncedCallback(
        (value) => {
            searchRestaurant(value).then(res => {
                setShowSearch(true);
                setResults(res.data);
            });
        },
        300
    );

    const moveToRestaurant = (id: number): void => {
        historyRouter.push(`/restaurant/${id}`);
        setShowSearch(false);
    };

    return (
        <header className="section-header">
            <nav className="navbar navbar-dark navbar-expand p-0 bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                {' '}
                                Telefon: +99812345678{' '}
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                {' '}
                                Polski{' '}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <section className="header-main border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-4">
                            <Link to={'/'} className="brand-wrap">
                                <img className="logo" src="../../../assets/logo.png" />
                            </Link>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <div className="search">
                                <div className="input-group w-100">
                                    <input
                                        onChange={e => debouncedCallback(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                    />

                                    {!!showSearch && (
                                        <ul className="list-group search">
                                            {results.map(restaurant => (
                                                <li
                                                    onClick={() => moveToRestaurant(restaurant.id)}
                                                    key={restaurant.id}
                                                    className="list-group-item btn-link"
                                                >{restaurant.name}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit">
                                            <i className="fa fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="widgets-wrap float-md-right">
                                <div className="widget-header mr-3">
                                    <Link to={'/orders'} className="icon icon-sm rounded-circle border">
                                        <i className="fa fa-shopping-cart" />
                                    </Link>

                                    <span className="badge badge-pill badge-danger notify">{sumOrder}</span>
                                </div>

                                <div className="widget-header icontext">
                                    {user && (
                                        <div
                                            onClick={() => setCollapseDropdown(!collapseDropdown)}
                                            className={`dropdown d-inline-block ${classNames({
                                                show: collapseDropdown
                                            })}`}
                                        >
                                            <div className="icontext mr-4 dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                <div className="icon icon-sm rounded-circle border">
                                                    <i className="fa fa-user" />
                                                </div>

                                                <div className="text">
                                                    {user.email} <br />
                                                    Konto: <b>{user.type}</b>
                                                </div>
                                            </div>

                                            <div
                                                className={`dropdown-menu dropdown-menu-right ${classNames({
                                                    show: collapseDropdown
                                                })}`}
                                                x-placement="bottom-end"
                                                style={{
                                                    position: 'absolute',
                                                    willChange: 'transform',
                                                    top: '0px',
                                                    left: '0px',
                                                    transform: 'translate3d(0px, 40px, 0px)'
                                                }}
                                            >
                                                <Link to={'/user'} className="dropdown-item">
                                                    Profil
                                                </Link>

                                                <button onClick={() => logout()} className="dropdown-item" type="button">
                                                    <span className="text">Wyloguj</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {!user && (
                                        <div className="text">
                                            <span className="text-muted">Witaj!</span>

                                            <div>
                                                <Link to={'/login'}>Zaloguj się</Link> |<Link to={'/register'}>Rejestracja</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};
