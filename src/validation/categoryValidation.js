export const validateCategory = ( category ) => {
    const { name } = category;

    if (!name) {
        throw new Error('Missing required field: name');
    }
};