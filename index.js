const express = require('express');
const { Pool } = require('pg');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'firsttry',
    password: '99884',
    host: 'localhost',
    port: 5432,
    database: 'firsttry'
});

app.post('/create', async (req, res) => {
    const { big_category, middle_category, small_category, nick_name, product_name } = req.body;
    await pool.query('INSERT INTO firsttry (big_category, middle_category, small_category,nick_name,product_name) VALUES ($1, $2, $3, $4, $5)', [big_category, middle_category, small_category, nick_name, product_name]);
    res.send('Data inserted');
});

app.get('/read', async (req, res) => {
    const result = await pool.query('SELECT * FROM firsttry');
    res.json(result.rows);
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { big_category, middle_category, small_category, nick_name, product_name } = req.body;
    await pool.query('UPDATE firsttry SET big_category = $1, middle_category = $2,small_category = $3, nick_name = $4, product_name = $5 WHERE id = $6', [big_category, middle_category, small_category, nick_name, product_name, id]);
    res.send('Data updated');
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM firsttry WHERE id = $1', [id]);
    res.send('Data deleted');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});