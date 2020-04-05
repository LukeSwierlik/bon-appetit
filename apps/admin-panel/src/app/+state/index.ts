import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { restaurantsReducer, RestaurantsState } from './restaurants/restaurants.reducer';
import { authReducer, AuthState } from './auth/auth.reducer';
import { orderReducer, OrdersState } from './orders/orders.reducer';
import { companyReducer, CompanyState } from './company/company.reducer';
import { commonsReducer, CommonsState } from './commons/commons.reducer';
import { reservationsReducer, ReservationsState } from './reservations/reservations.reducer';
import { tablesReducer, TablesState } from './tables/tables.reducer';
import { employeesReducer, EmployeesState } from './employees/employees.reducer';
import { dishesReducer, DishesState } from './dishes/dishes.reducer';
import { usersReducer, UsersState } from './users/users.reducer';
import { viewOrderReducer, ViewOrdersState } from './viewOrders/viewOrders.reducer';
import { companiesReducer, CompaniesState } from './companies/companies.reducer';

export interface State {
    auth: AuthState,
    restaurants: RestaurantsState,
    dishes: DishesState,
    orders: OrdersState,
    reservations: ReservationsState,
    tables: TablesState,
    employees: EmployeesState,
    commons: CommonsState,
    company: CompanyState,
    users: UsersState,
    viewOrder: ViewOrdersState,
    companies: CompaniesState
}

export const reducers: ActionReducerMap<State> = {
    auth: authReducer,
    restaurants: restaurantsReducer,
    dishes: dishesReducer,
    orders: orderReducer,
    reservations: reservationsReducer,
    tables: tablesReducer,
    employees: employeesReducer,
    commons: commonsReducer,
    company: companyReducer,
    users: usersReducer,
    viewOrder: viewOrderReducer,
    companies: companiesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
