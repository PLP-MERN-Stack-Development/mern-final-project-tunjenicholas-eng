const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice
    });

    const createdOrder = await order.save();

    // NEW: Real-time Notification
    // emit event 'new-order' to all connected clients
    req.io.emit('new-order', {
      message: `New Order Received! Value: KSh ${totalPrice}`,
      orderId: createdOrder._id
    });

    res.status(201).json(createdOrder);
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

module.exports = { addOrderItems, getMyOrders };