import { pool } from "../config/database.js";

// Get all destinations
export const getAllDestinations = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM destinations");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("⚠️ error fetching destinations", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a single destination by ID
export const getDestinationById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM destinations WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Destination not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("⚠️ error fetching destination", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Create a new destination
export const createDestination = async (req, res) => {
    const { destination, description, city, country, img_url, flag_img_url } =
        req.body;
    try {
        const result = await pool.query(
            "INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [destination, description, city, country, img_url, flag_img_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("⚠️ error creating destination", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update an existing destination
export const updateDestination = async (req, res) => {
    const { id } = req.params;
    const { destination, description, city, country, img_url, flag_img_url } =
        req.body;
    try {
        const result = await pool.query(
            "UPDATE destinations SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6 WHERE id = $7 RETURNING *",
            [destination, description, city, country, img_url, flag_img_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Destination not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("⚠️ error updating destination", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a destination
export const deleteDestination = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM destinations WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Destination not found" });
        }
        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (err) {
        console.error("⚠️ error deleting destination", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
};
