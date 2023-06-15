import Mongoose from 'mongoose';

interface ProvidersInterface {
}

const providersSchema = new Mongoose.Schema({
}, {
  timestamps: false,
});

export { ProvidersInterface, providersSchema };
