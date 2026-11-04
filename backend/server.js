
const express = require("express");
const cors = require("cors");
const pool = require("../db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to UrbanPulse Backend!");
});

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database"
        );

        res.json({
            status: "success",
            database: result.rows[0].database
        });
    } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
}
});

app.get("/api/traffic", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM traffic_data ORDER BY recorded_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/environment", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM environment_data ORDER BY recorded_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/issues", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM city_issues ORDER BY created_at DESC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`UrbanPulse server running on port ${PORT}`);
});
