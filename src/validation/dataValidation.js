export const validateData = ( data ) => {
    const requiredFields = [
        'name',
        'description',
        'format',
        'content',
        'category_id'
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Missing required field: ${ field }`);
        }
    }
};