export const dataSQL = {
    findData: 'SELECT * FROM data',
    findDataById: 'SELECT * FROM data WHERE data_id = ?',
    findDataByName: 'SELECT * FROM data WHERE name = ?',
    createData: 'INSERT INTO data (name, description, format, content, createdAt) VALUES (?, ?, ?, ?, GETDATE())',
    updateData: 'UPDATE data SET name = ?, description = ?, format = ?, content = ?, updatedAt = GETDATE() WHERE data_id = ?',
    deleteData: 'DELETE FROM data WHERE data_id = ?',
};

export const categorySQL = {
    findCategory: 'SELECT * FROM category',
    findCategoryById: 'SELECT * FROM category WHERE category_id = ?',
    findCategoryByName: 'SELECT * FROM category WHERE name = ?',
    createCategory: 'INSERT INTO category (name) VALUES (?)',
    updateCategory: 'UPDATE category SET name = ? WHERE category_id = ?',
    deleteCategory: 'DELETE FROM category WHERE category_id = ?',
};
