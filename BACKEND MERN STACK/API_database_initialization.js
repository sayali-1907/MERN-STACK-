const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();

// Define transaction schema
const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    sold: Boolean,
    category: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Route to initialize database with seed data
app.get('/api/init-db', async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

        // Clear existing data (optional)
        await Transaction.deleteMany();

        // Insert fetched data into the database
        await Transaction.insertMany(data);
        res.status(200).json({ message: 'Database initialized successfully with seed data!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
