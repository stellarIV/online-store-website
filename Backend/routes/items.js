const express = require('express');
const router = express.Router();
const Item = require('../models/items');

router.post('/items', async (req, res) => {
  const items = req.body;

  if (Array.isArray(items)) {
    try {
      const savedItems = await Item.insertMany(items); 
      res.status(201).json(savedItems);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    const { name, quantity,price, description } = items;

    try {
      const newItem = new Item({
        name,
        quantity,
        price,
        description,
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/items/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const items = await Item.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/items/:id', async (req, res) => {
  const { name, quantity,price, description } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price, description },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
