import Mongoose from 'mongoose';

interface MachineryInterface {
}

const machinerySchema = new Mongoose.Schema({
}, {
  timestamps: false,
});

export { MachineryInterface, machinerySchema };
