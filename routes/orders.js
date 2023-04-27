var express = require('express');
var router = express.Router();
const { authenticate } = require('../middlewares/auth');
/* GET users listing. */
const { Order } = require('../models');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Get all orders, including associated items
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.findAll(); // how can we include the ITEMS associated with the orders in this response?
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
});

// Get a specific order by ID, including associated items
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id); // how can we include the ITEMS associated with the orders in this response?

    if (!order) {
      res.status(404).json({ message: 'order not found' });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
});

// Update a order by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedorder = await Order.findByPk(req.params.id);
      res.json(updatedorder);
    } else {
      res.status(404).json({ message: 'order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

// Delete a order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: 'order deleted' });
    } else {
      res.status(404).json({ message: 'order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

module.exports = router;