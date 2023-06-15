import Mongoose from 'mongoose';

interface OrderItemInterface {
    machineryId: String;
    quantity: number;
    InitialRentDate: Date;
    FinalRentDate: Date;
    priceTimeUnit: string;
    pricePerHour: number;
    totalPrice: number;
}

interface OrdersInterface {
  orderId: string;
  orderDate: Date;
  seller: string;
  clientId: String;
  NIT: String;
  buyer: string;
  buyerPhone: string;
  paymentCoordinator: string;
  paymentCoordinatorPhone: number;
  orderItems: Array<OrderItemInterface>;
}

const ordersSchema = new Mongoose.Schema({
  orderId: String,
  orderDate: Date,
  seller: String,
  clientId: String,
  NIT: String,
  buyer: String,
  buyerPhone: String,
  paymentCoordinator: String,
  paymentCoordinatorPhone: Number,
  orderItems: Array<OrderItemInterface>
}, {
  timestamps: false,
});



export { OrderItemInterface, OrdersInterface, ordersSchema };
