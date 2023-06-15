import Mongoose from 'mongoose';

interface MachineryInterface {
  machineryId: string;
  name: string;
  category: string;
  totalQuantity: number;
  providerId: string;
}

const machinerySchema = new Mongoose.Schema({
  machineryId: String,
  name: String,
  category: String,
  totalQuantity: Number,
  providerId: String,
}, {
  timestamps: false,
});

export { MachineryInterface, machinerySchema };
