const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all employees
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employee');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

module.exports = router;