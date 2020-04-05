import React from 'react';
import { Title } from '../components/title';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../+state';
import classNames from 'classnames';
import { payOrdersAction } from '../+state/orders/orders.actions';
import { Spinner } from '../components/spinner';
import { Alert, AlertType } from '../components/alert.component';

export const Orders = () => {
    const { orders, sumOrder, isPay } = useSelector((state: State) => state.ordersData);
    const commons = useSelector((state: State) => state.commonsData);
    const dispatch = useDispatch();

    const pay = () => {
      dispatch(payOrdersAction(orders.filter(order => order.paid === 0)));
    };

    return (
        <>
            <Title title={'Zamówienia'} />

            <section className="section-content padding-y">
                <div className="container">
                    {commons.loaded ? (
                        <div className="row">
                            <div className="mx-auto" style={{ maxWidth: '920px' }}>
                                {commons.success && <Alert type={AlertType.SUCCESS} message={'Przyjęto zamówienie'} />}

                                {commons.error && (
                                    <Alert
                                        type={AlertType.DANGER}
                                        message={
                                            'Wystąpiły problemy podczas zapłaty! Spróbuj ponownie.'
                                        }
                                    />
                                )}
                            </div>

                            <main
                                className={`${classNames({
                                    'col-md-9': !isPay,
                                    'col-md-12': isPay
                                })}`}
                            >
                                <div className="card">
                                    <table className="table table-borderless table-shopping-cart">
                                        <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Danie</th>
                                            <th scope="col" style={{ width: '120px' }}>
                                                Ilość
                                            </th>
                                            <th scope="col" style={{ width: '120px' }}>
                                                Cena
                                            </th>
                                            <th scope="col" className="text-right" style={{ width: '200px' }} />
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {!!orders.length &&
                                        orders.map(order => {
                                            return (
                                                <tr key={order.id}>
                                                    <td>
                                                        <figure className="itemside">
                                                            <div className="aside">
                                                                <img src={order.dish.imageUrl} className="img-sm" alt="" />
                                                            </div>

                                                            <figcaption className="info">
                                                                <a href="#" className="title text-dark">
                                                                    {order.dish.name}
                                                                </a>
                                                                <p className="text-muted small">
                                                                    Status:
                                                                    <b
                                                                        className={classNames({
                                                                            'text-success': order.paid,
                                                                            'text-danger': !order.paid
                                                                        })}
                                                                    >
                                                                        {order.status}
                                                                    </b>
                                                                </p>
                                                            </figcaption>
                                                        </figure>
                                                    </td>

                                                    <td>
                                                        <div className="form-row">
                                                            <div className="form-group col-md flex-grow-0">
                                                                <div className="input-group input-spinner">
                                                                    <div className="input-group-prepend">
                                                                        <span className="text-center">{order.count}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="price-wrap">
                                                            <var className="price">{order.sumPriceDish} zł</var>
                                                            <small className="text-muted">{order.dish.price} zł za sztukę </small>
                                                        </div>
                                                    </td>

                                                    <td
                                                        className={`text-right ${classNames({
                                                            'd-none': order.paid
                                                        })}`}
                                                    >
                                                        <button className="btn btn-danger">Usuń</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}

                                        {!orders.length && (
                                            <tr>
                                                <td>hhhh</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>

                                    <div
                                        className={`card-body border-top ${classNames({
                                            'd-none': isPay
                                        })}`}
                                    >
                                        <button
                                            onClick={() => pay()}
                                            type="button"
                                            className="btn btn-primary float-md-right"
                                        >
                                            Zapłać <i className="fa fa-chevron-right" />
                                        </button>
                                    </div>
                                </div>
                            </main>

                            <aside
                                className={`col-md-3 ${classNames({
                                    'd-none': isPay
                                })}`}
                            >
                                <div className="card">
                                    <div className="card-body">
                                        <dl className="dlist-align">
                                            <dt>Suma do zapłaty:</dt>
                                            <dd className="text-right h5">
                                                <strong>{sumOrder} zł</strong>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </section>
        </>
    );
};
