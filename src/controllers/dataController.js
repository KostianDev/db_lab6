import pool from '../connection.js';
import { validateData } from '../validation/dataValidation.js';
import { dataSQL } from '../SQL/sql.js';

class dataController {

    async getData(req, res) {

        try {
            const [response] = await pool.query(dataSQL.findData);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDataById(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(dataSQL.findDataById, [id]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getDataByName(req, res) {
        const { name } = req.params;

        try {
            const [response] = await pool.execute(dataSQL.findDataByName, [name]);
            
            if(response.length === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json(response[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createData(req, res) {
        const { name, description, format, content, createdAt } = req.body;

        try {
            validateData(req.body);
            const [response] = await pool.execute(dataSQL.createData, [
                name,
                description,
                format,
                content,
                createdAt
            ]);

            res.status(201).json({
                message: 'Data created',
                data: {
                    data_id: response.insertId,
                    name,
                    description,
                    format,
                    content,
                    createdAt
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateData(req, res) {
        const { id } = req.params;
        const { name, description, format, content, createdAt, updatedAt } = req.body;

        try {
            validateData(name, description, format, content);
            const [response] = await pool.execute(dataSQL.updateDataById, [
                name,
                description,
                format,
                content,
                createdAt,
                updatedAt,
                id
            ]);

            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json({ message: 'Data updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteData(req, res) {
        const { id } = req.params;

        try {
            const [response] = await pool.execute(dataSQL.deleteDataById, [id]);

            if(response.affectedRows === 0) {
                res.status(404).json({ error: 'Data not found' });
            }

            res.json({ message: 'Data deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default new dataController();