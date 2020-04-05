import axios from 'axios';
import { RestaurantsResource } from '@bon-appetit/resources';

export const getRestaurants = () => axios.get(RestaurantsResource.loadRestaurants);
export const searchRestaurant = (searchQuery: string) =>
    axios.post(RestaurantsResource.searchRestaurants, {
        searchQuery
    });
