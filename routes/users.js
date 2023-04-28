var express = require('express');
var router = express.Router();
const { authenticate } = require('../middlewares/auth');
/* GET users listing. */
const { User } = require('../models');

// Create a new user
router.post('/', async (req, res) => {
    const {username, password} = req.body
    try {
      const user = await User.create({username, password});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get all users, including associated items
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await User.findAll(); // how can we include the ITEMS associated with the users in this response?
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

// Get a specific user by ID, including associated items
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id); // how can we include the ITEMS associated with the users in this response?

    if (!user) {
      res.status(404).json({ message: 'user not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updateduser = await User.findByPk(req.params.id);
      res.json(updateduser);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      res.status(204).json({ message: 'user deleted' });
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
