import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FormReservation } from '../components/form-reservation.component';
import { RestaurantDetails } from '../components/restaurant-details.component';
import { connect, useDispatch, useSelector } from 'react-redux';
import { restaurantsQuery } from '../+state/restaurants/restaurants.selectors';
import { fetchAndSelectRestaurantAction } from '../+state/restaurants/restaurants.actions';
import { dishesQuery } from '../+state/dishes/dishes.selectors';
import { Title } from '../components/title';
import { Dish } from '../components/dish.component';
import { State } from '../+state';
import { addToOrderAction } from '../+state/orders/orders.actions';
import { ReservationStatus } from '@bon-appetit/interfaces';
import { createReservationAction } from '../+state/reservations/reservations.actions';
import { EmptyState } from '../components/empty-state.component';

const Restaurant = props => {
    const [showDishes, setShowDishes] = useState(true);
    const user = useSelector((state: State) => state.authData.user);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        const restaurantId = parseInt(id, 10);
        props.fetchAndSelectRestaurant(restaurantId);
    }, [id]);

    const toggleReservationForm = (): void => {
        setShowDishes(prevShowDishes => !prevShowDishes);
    };

    const dispatchOrder = (count: number, dishId: number): void => {
        dispatch(addToOrderAction(count, dishId, props.restaurant.id, user.id));
    };

    const onSubmit = data => {
        const { tableId, peopleCount, date, hour } = data;

        dispatch(
            createReservationAction({
                tableId: parseInt(tableId, 10),
                peopleCount: parseInt(peopleCount, 10),
                date,
                hour,
                restaurantId: props.restaurant.id,
                userId: user.id,
                status: ReservationStatus.PRZYJETO
            })
        );
    };

    return (
        <>
            {props.restaurant && (
                <>
                    <RestaurantDetails
                        showDishes={showDishes}
                        restaurant={props.restaurant}
                        toggleReservationForm={toggleReservationForm}
                    />

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6"/>
                        </div>
                    </div>

                    {showDishes ? (
                        <>
                            <Title title={'Dania'} />

                            <div className="container">
                                <div className="row">
                                    {!!props.dishes.length ? props.dishes.map(dish => (
                                        <div key={dish.id} className="col-md-6">
                                            <Dish dish={dish} order={dispatchOrder} user={user}/>
                                        </div>
                                    )): (
                                        <EmptyState message={'Aktualnie restauracja nie posiada dań w menu.'}/>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <FormReservation tables={props.restaurant.tables} createReservation={onSubmit} />
                    )}
                </>
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        restaurant: restaurantsQuery.getSelectedRestaurant(state),
        dishes: dishesQuery.getDishes(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAndSelectRestaurant: (restaurantId: number) => dispatch(fetchAndSelectRestaurantAction(restaurantId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
