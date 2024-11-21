import { pool } from '../config/database.js'

const createDocument = async (req, res) => {
    try {
        const { document } = req.body;
        const { trip_id } = req.params;

        const results = await pool.query(
            'INSERT INTO documents (trip_id, document) VALUES ($1, $2) RETURNING *',
            [trip_id, document]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getDocuments = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM documents ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getTripDocuments = async (req, res) => {
    try {
        const { trip_id } = req.params;

        const results = await pool.query(
            'SELECT * FROM documents WHERE trip_id = $1 ORDER BY id ASC',
            [trip_id]
        );

        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);

        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({ message: 'Document deleted successfully', document: results.rows[0] });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    createDocument,
    getDocuments,
    getTripDocuments,
    deleteDocument,
};