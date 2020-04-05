import React, { useEffect } from 'react';
import { Hero } from '../components/hero.component';
import { connect } from 'react-redux';
import { fetchRestaurantsAction, selectedRestaurantAction } from '../+state/restaurants/restaurants.actions';
import { CardComponent } from '../components/card.component';
import { compose } from 'redux';
import { withRouter } from 'react-router';

const HomeContainer = (props) => {
    useEffect(() => {
        if (!props.restaurants.length) {
            props.fetchRestaurants();
        }
    }, []);

    const onSelectRestaurant = (restaurantId: number) => {
        props.selectedRestaurant(restaurantId);
        props.history.push(`/restaurant/${restaurantId}`);
    };

    return (
        <>
            {/*<Hero />*/}
            <CardComponent
                restaurants={props.restaurants}
                onSelectRestaurant={onSelectRestaurant}
            />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurantsData.restaurants,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRestaurants: () => dispatch(fetchRestaurantsAction()),
        selectedRestaurant: (restaurantId: number) => dispatch(selectedRestaurantAction(restaurantId)),
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HomeContainer);
