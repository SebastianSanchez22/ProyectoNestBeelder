import Mongoose from 'mongoose';

interface ClientsInterface {
  clientId: string;
  name: string;
  address: string;
  phone: number;
}

const clientsSchema = new Mongoose.Schema({
  clientId: String,
  name: String,
  address: String,
  phone: Number,
}, {
  timestamps: false,
});

export { ClientsInterface, clientsSchema };
