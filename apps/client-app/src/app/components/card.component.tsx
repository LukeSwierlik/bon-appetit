import React from 'react';
import { Link } from 'react-router-dom';

export const CardComponent = props => {
    const { restaurants } = props;

    return (
        <section className="section-name padding-y-sm">
            <div className="container">
                <header className="section-heading">
                    <h3 className="section-title">Najnowsze restauracje</h3>
                </header>

                <div className="row">
                    {/*<aside className="col-md-3  col-sm-6">*/}
                    {/*    <output>*/}
                    {/*        <div className="card">*/}
                    {/*            <div className="card-body">*/}
                    {/*                <h5 className="card-title">Filter</h5>*/}

                    {/*                <select className="form-control">*/}
                    {/*                    <option disabled>Wybierz...</option>*/}
                    {/*                </select>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </output>*/}
                    {/*</aside>*/}

                    <div className="col-md-9">
                        <div className="row">
                            {restaurants.map(restaurant => {
                                return (
                                    <div key={restaurant.id}  className="col-md-4 =">
                                        <div
                                            onClick={() => props.onSelectRestaurant(restaurant.id)}
                                            className="card card-product-grid restaurant-card">
                                            <a className="img-wrap">
                                                <img src={restaurant.logoUrl} alt={restaurant.name}/>
                                            </a>

                                            <figcaption className="info-wrap">
                                                <h5>
                                                    <span className="title">{restaurant.name}</span>
                                                </h5>
                                            </figcaption>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
