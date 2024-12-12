export const validateData = ( data ) => {
    const requiredFields = [
        'name',
        'description',
        'format',
        'content',
        'createdAt'
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Missing required field: ${ field }`);
        }
    }
};