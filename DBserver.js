"use strict";
const { Client } = require('pg');
const express = require('express');
const app = express();
app.use(express.static("public"));
const PORT = 8000;
app.listen(PORT);
const clientConfig = {
    user: "postgres",
    password: "mypacepostgresql",
    host: "my-pace-postgresql.cp64agc4oxtl.us-east-2.rds.amazonaws.com",
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
};
app.get('/data', async function (req, res) {
    const code = req.query['code'];
    const client = new Client(clientConfig);
    await client.connect();
    const result = await client.query("SELECT * FROM SpotifyMostStreamedSongs.csv", [code]);
    if (result.rowCount < 1) {
        res.status(500).send("Internal Error - No data Found");
    } else {
        res.set("Content-Type", "application/json");
        res.send(result.rows[0]);
    }
    await client.end();
});
app.set('/data', async function (req, res) {
    const code = req.query['code'];
    const client = new Client(clientConfig);
    const result = await client.query("UPDATE SpotifyMostStreamedSongs.csv SET CODE = $1 RETURNING *", [code]);
    if (result.rowCount < 1) {
        res.status(500).send("Internal Error - No data Found");
    } else {
        res.set("Content-Type", "application/json");
        res.send(result.rows[0]);
    }
    await client.end();
});
app.delete('/data', async function (req, res) {
    const code = req.query['code'];
    const client = new Client(clientConfig);
    const result = await client.query("DELETE FROM SpotifyMostStreamedSongs.csv WHERE CODE = $1 RETURNING *", [code]);
    if (result.rowCount < 1) {
        res.status(500).send("Internal Error - No data Found");
    } else {
        res.set("Content-Type", "application/json");
        res.send(result.rows[0]);
    }
    await client.end();
});
clientConfig.connect(err => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
      }
      console.log("Connected to the database");
});