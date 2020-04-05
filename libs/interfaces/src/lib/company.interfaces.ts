export interface Company {
    street: string;
    city: string;
    numberOfBuilding: string;
    postalCode: string;
    country: string;
    created?: string,
    updated?: string | null,
    id?: number;
    name: string;
    email: string;
    logoUrl: string;
    timeReservation: number;
    ownerId: number;
    phoneNumber: string;
}
