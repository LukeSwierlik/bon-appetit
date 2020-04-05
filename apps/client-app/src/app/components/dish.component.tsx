import React, { useState } from 'react';

export const Dish = (props) => {
    const [count, setCount] = useState(1);
    const MIN_COUNT = 1;
    const MAX_COUNT = 99;

    const increment = (): void => {
        if (count <= MAX_COUNT) {
            setCount((prevSetCount) => prevSetCount + 1);
        }
    };

    const decrement = (): void => {
        if (count >= MIN_COUNT) {
            setCount((prevSetCount) => prevSetCount - 1);
        }
    };

    const onChangeValueCount = (e: any): void => {
        const value = e.target.value;
        const valueInt = parseInt(value, 10);

        if (valueInt >= MIN_COUNT && valueInt <=MAX_COUNT) {
            setCount(valueInt);
        } else {
            setCount(undefined);
        }
    };

    return (
        <article className="card card-product-list">
            <div className="card-body">
                <div className="row">
                    <aside className="col-sm-5">
                        <a href="#" className="img-wrap">
                            <img src={props.dish.imageUrl} />
                        </a>
                    </aside>

                    <div className="col-sm-7">
                        <a href="#" className="title mt-2 h5">{props.dish.name}</a>

                        <div className="d-flex mb-3">
                            <div className="price-wrap mr-4">
                                <span className="price h5">{props.dish.price}</span>
                            </div>
                        </div>

                        <ul className="list-bullet">
                            {props.dish.ingredients.map(ingredient => (
                                <li key={ingredient.id}>{ingredient.name}</li>
                            ))}
                        </ul>

                        <div className="form-row">
                            <div className="form-group col-md flex-grow-0">
                                <div className="input-group input-spinner">
                                    <div className="input-group-prepend">
                                        <button
                                            onClick={() => increment()}
                                            className="btn btn-light"
                                            type="button"
                                            id="button-plus">
                                            +
                                        </button>
                                    </div>

                                    <input
                                        value={count}
                                        onChange={onChangeValueCount}
                                        type="text"
                                        className="form-control"
                                    />

                                    <div className="input-group-append">
                                        <button
                                            onClick={() => decrement()}
                                            className="btn btn-light"
                                            type="button"
                                            id="button-minus">
                                            −
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md">
                                <button
                                    onClick={() => props.order(count, props.dish.id)}
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={!count || !props.user}
                                >
                                    <span className="text">Dodaj</span>
                                    <i className="fas fa-shopping-cart" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};
