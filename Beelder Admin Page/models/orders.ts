import Mongoose from 'mongoose';

interface OrdersInterface {
}

const ordersSchema = new Mongoose.Schema({
}, {
  timestamps: false,
});

export { OrdersInterface, ordersSchema };
