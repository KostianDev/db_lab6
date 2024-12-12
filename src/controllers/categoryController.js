import pool from "../connection.js";
import { validateCategory } from "../validation/categoryValidation.js";
import { categorySQL } from "../SQL/sql.js";

class categoryController {

    async getCategories(req, res) {
            
            try {
                const [response] = await pool.query(categorySQL.findCategory);
                res.json(response);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

    async getCategoryById(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(categorySQL.findCategoryById, [id]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCategoryByName(req, res) {
        const { name } = req.params;

        try {
            const [response] = await pool.execute(categorySQL.findCategoryByName, [name]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCategory(req, res) {
        const { name } = req.body;

        try {
            validateCategory(req.body);
            const [response] = await pool.execute(categorySQL.createCategory, [
                name
            ]);
            res.status(201).json({
                message: 'Category created successfully',
                category: {
                    id: response.insertId,
                    name
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategory(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            validateCategory(req.body);
            const [response] = await pool.execute(categorySQL.updateCategoryById, [
                name,
                id
            ]);
            
            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json({ message: 'Category updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(categorySQL.deleteCategoryById, [id]);
            
            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Category not found' });
            }

            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default new categoryController();