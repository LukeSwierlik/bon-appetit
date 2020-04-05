import { TABLES_API } from './api';

export const TablesResources = {
    loadTables: (restaurantId: number) => `${TABLES_API}/load/${restaurantId}`,
    createTables: `${TABLES_API}/create`
};
