<<<<<<< HEAD
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: { type: [ItemSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
=======
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: { type: [ItemSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
>>>>>>> ab91d23330aff18fcf3b2b4296e683c7866dcc96
