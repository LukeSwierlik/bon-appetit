export interface Restaurant {
    id: number;
    name: string;
    phoneNumber: string;
    websiteUrl: string;
    opened: boolean;
    email: string;
    street: string;
    city: string;
    numberOfBuilding: string;
    postalCode: string;
    country: string;
    logoUrl: string;
    heroUrl: string;
    thumbnailUrl: string;
    area: string;
    template: string;
    companyId: number;
    category?: Category;
}

export interface Category {
    id: number;
    name: string;
}

interface Hours {
    open: string;
    close: string;
}

export interface Dish {
    id?: number;
    name: string;
    price: number;
    ingredients: Ingredient[];
    companyId: number;
    imageUrl: string;
    template: string;
}

export interface Ingredient {
    id?: number;
    name: string;
    dishId?: number;
}

export interface Template {
    template: string;
}
