var express = require('express');
var router = express.Router();
const { authenticate } = require('../middlewares/auth');
const basketController = require("../controllers").basket;
const itemController = require("../controllers").item;
const orderController = require("../controllers").order;
const userController = require("../controllers").user;

router.get('/baskets', basketController.list);
router.post('/baskets', authenticate, basketController.add);
router.get('/baskets/:id', basketController.getById);
router.delete('/baskets/:id', authenticate, basketController.delete);

router.get('/items', itemController.list);
router.post('/items', authenticate, itemController.add);
router.get('/items/:id', itemController.getById);
router.delete('/items/:id', authenticate, itemController.delete);

router.get('/orders', orderController.list);
router.post('/orders', authenticate, orderController.add);
router.get('/orders/:id', orderController.getById);
router.delete('/orders/:id', authenticate, orderController.delete);

router.get('/users', userController.list);
router.post('/uses', authenticate, userController.add);
router.get('/users/:id', userController.getById);
router.delete('/users/:id', authenticate, userController.delete);



module.exports = router;
