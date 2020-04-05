import { UserType } from '@bon-appetit/interfaces';

export const termsAndConditionals = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie leo mollis, placerat sem ac, bibendum urna. In a varius arcu. Phasellus pretium nisl vitae mauris ullamcorper consectetur. Cras tellus ligula, dignissim nec tincidunt eget, suscipit vel augue. Nunc placerat velit sit amet turpis facilisis, ac accumsan dui fringilla. Curabitur vel lacus diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc faucibus at sem ut varius.\n' +
    '\n' +
    'Cras volutpat vehicula facilisis. Donec at magna dictum, iaculis massa ut, euismod augue. Sed vel nisl fermentum, congue purus id, feugiat leo. Nunc pulvinar odio a lectus cursus, ac tristique velit pretium. Suspendisse non lorem dapibus, ultrices ipsum quis, accumsan arcu. Integer et diam orci. In posuere tincidunt purus in aliquet. Sed malesuada, quam id auctor suscipit, dui ipsum hendrerit dui, sit amet ultricies diam nulla ac urna. Morbi vitae justo eleifend, vestibulum elit id, placerat dui. Curabitur bibendum eros et placerat dapibus. Vestibulum ornare dignissim felis, non dignissim libero. Suspendisse semper eget orci sed consectetur. Suspendisse potenti. Sed et rhoncus neque. Phasellus sodales nisl lorem, id rutrum mi auctor sit amet.\n' +
    '\n' +
    'Curabitur eros purus, commodo consequat hendrerit a, mollis eget metus. In non massa et justo luctus tincidunt. Nullam efficitur augue orci, sed lobortis arcu porta a. Integer id quam quis sem convallis imperdiet eu id odio. Etiam aliquam neque at ultricies rhoncus. Donec molestie ligula ut pharetra pretium. Phasellus maximus metus non dui malesuada, in efficitur diam convallis. Curabitur nisl nulla, rhoncus nec nisi dictum, egestas consequat nunc. Nullam nec semper ligula. Vivamus mollis malesuada urna. Sed suscipit, sem at volutpat bibendum, justo enim maximus est, nec condimentum ligula velit eget nunc.\n' +
    '\n' +
    'Curabitur non fringilla magna. Morbi ligula tortor, convallis at sem vel, blandit hendrerit orci. Pellentesque egestas neque et augue lobortis, nec venenatis massa imperdiet. Morbi faucibus laoreet varius. Fusce non mauris elementum, ultrices diam eget, rhoncus lacus. Ut sollicitudin tortor vitae erat lacinia, at vehicula ex auctor. Praesent ante justo, tincidunt sed maximus ac, sagittis sed orci. Mauris pretium magna in sapien convallis, quis auctor sem dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam congue erat sit amet auctor interdum. Donec vitae aliquam arcu. Vivamus vulputate dui leo, faucibus placerat ante lobortis vitae. In pretium maximus enim ac eleifend.\n' +
    '\n' +
    'Nulla molestie pharetra dui, id egestas nisi finibus imperdiet. Nulla facilisi. Aliquam mi ligula, ullamcorper sed malesuada in, dignissim eu tellus. Fusce vulputate turpis nec ultrices tempor. Fusce pretium ligula mattis ipsum volutpat elementum. Fusce ut eros nulla. Aliquam erat volutpat. Praesent venenatis porttitor nibh, at vestibulum diam suscipit eget. Vestibulum nec pulvinar quam. Maecenas ac ante molestie, malesuada metus id, egestas metus. Donec dignissim nibh vel dui accumsan ultricies. Phasellus aliquam velit sit amet ligula fringilla malesuada.';

export const areasPoland = [
    'dolnośwąskie',
    'kujawsko-pomorskie',
    'lubelskie',
    'łódzkie',
    'małopolskie',
    'mazowieckie',
    'opolskie',
    'podkarpackie',
    'podlaskie',
    'pomorskie',
    'śląskie',
    'świętokrzyskie',
    'warmińsko-mazurskie',
    'wielkopolskie',
    'zachodnio-pomorskie'
];

export const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudziń',
];

export const routeSidebarCompany: RouteSidebar[] = [
    {
        path: '/company',
        label: 'Informacje o firmie',
        exact: true,
    },
    {
        path: 'restaurants',
        label: 'Moje restauracje'
    }
];

export const routeSidebarRestaurants: RouteSidebar[] = [
    {
        path: '/company',
        label: 'Informacje o restauracji',
        exact: true,
    },
    {
        path: 'employees',
        label: 'Pracownicy',
    },
    {
        path: 'orders',
        label: 'Zamówienia',
    },
    {
        path: 'reservations',
        label: 'Rezerwacje',
    },
    {
        path: 'tables',
        label: 'Lista stołów',
    },
    {
        path: 'dishes',
        label: 'Dania'
    }
];

export const routeSidebarUser: RouteSidebar[] = [
    {
        path: '/users',
        label: 'Informacje o profilu',
        exact: true
    },
    {
        path: 'reservations',
        label: 'Rezerwacje',
        exact: true
    },
    {
        path: 'orders',
        label: 'Zamówienia',
    }
];


export interface RouteSidebar {
    path: string;
    label: string;
    exact?: boolean;
}

export const employeeTypes: EmployeeType[] = [
    {
        userType: UserType.EMPLOYEE,
        name: 'Pracownik'
    },
    {
        userType: UserType.DELIVERER,
        name: 'Dostawca'
    },
    {
        userType: UserType.WAITER,
        name: 'Kelner'
    },
    {
        userType: UserType.COOK,
        name: 'Kucharz'
    }
];

export interface EmployeeType {
    userType: UserType;
    name: string;
}
