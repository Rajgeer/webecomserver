const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middlewares/auth');

router.route('/')
  .post(protect, authorize('user'), orderController.createOrder)
  .get(protect, authorize('admin'), orderController.getOrders);

router.route('/myorders').get(protect, authorize('user', 'admin'), orderController.getMyOrders);

router.route('/:id').get(protect, authorize('user', 'admin'),  orderController.getOrderById);

router.route('/:id/pay').put(protect, authorize('user', 'admin'), orderController.updateOrderToPaid);

router.route('/:id/deliver').put(protect, authorize('admin'), orderController.updateOrderToDelivered);

module.exports = router;