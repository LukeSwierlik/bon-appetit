export const updateObject = (oldObject, newObject) => ({
    ...oldObject,
    ...newObject,
});

export const updateArray = (array, newElement) => {
    return [...array, newElement];
};

export const valid = (field: object) => {
    return field ? 'invalid' : 'valid';
};
