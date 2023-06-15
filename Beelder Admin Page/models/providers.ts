import Mongoose from 'mongoose';

interface ProvidersInterface {
  providerId: string;
  name: string;
}
const providersSchema = new Mongoose.Schema({
  providerId: String,
  name: String,
}, {
  timestamps: false,
});

export { ProvidersInterface, providersSchema };
