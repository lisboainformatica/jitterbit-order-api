const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Order = require('../models/order.model');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/auth');

/**
 * Validation schemas
 */
const inputSchema = Joi.object({
  numeroPedido: Joi.string().required(),
  valorTotal: Joi.number().required(),
  dataCriacao: Joi.date().iso().required(),
  items: Joi.array().items(
    Joi.object({
      idItem: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
      quantidadeItem: Joi.number().required(),
      valorItem: Joi.number().required()
    })
  ).required()
});

const updateSchema = Joi.object({
  value: Joi.number(),
  creationDate: Joi.date().iso(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required()
    })
  )
});

/**
 * Helper: mapping function (input -> DB)
 * - numeroPedido -> orderId (strip suffix after '-' if exists)
 * - valorTotal -> value
 * - dataCriacao -> creationDate (ISO trimmed to Z)
 * - items: idItem -> productId (number), quantidadeItem -> quantity, valorItem -> price
 */
function mapInputToOrder(body) {
  const numero = body.numeroPedido;
  // example mapping: "v10089015vdb-01" -> "v10089015vdb"
  const orderId = String(numero).split('-')[0];

  const items = (body.items || []).map(it => ({
    productId: Number(it.idItem),
    quantity: Number(it.quantidadeItem),
    price: Number(it.valorItem)
  }));

  // Normalize date and ensure Z
  const creationDate = new Date(body.dataCriacao);

  return {
    orderId,
    value: Number(body.valorTotal),
    creationDate,
    items
  };
}

/**
 * Auth route to generate JWT (demo). Username/password come from .env
 */
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const AUTH_USER = process.env.AUTH_USER || 'admin';
  const AUTH_PASS = process.env.AUTH_PASS || 'senha123';

  if (username !== AUTH_USER || password !== AUTH_PASS) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  res.json({ token });
});

/**
 * POST /order  -> create order (protected)
 */
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { error } = inputSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });

    const orderData = mapInputToOrder(req.body);

    // Check unique orderId
    const existing = await Order.findOne({ orderId: orderData.orderId });
    if (existing) return res.status(409).json({ error: 'Order with this orderId already exists' });

    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /order/:orderId -> get order
 */
router.get('/:orderId', async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /order/list -> list all orders
 */
router.get('/list', async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /order/:orderId -> update (protected)
 * Accepts body in the DB shape (value, creationDate, items) or partial
 */
router.put('/:orderId', authenticate, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });

    const updated = await Order.findOneAndUpdate({ orderId }, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /order/:orderId -> delete (protected)
 */
router.delete('/:orderId', authenticate, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const deleted = await Order.findOneAndDelete({ orderId });
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted', orderId: deleted.orderId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
