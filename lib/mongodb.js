import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);  // Retire les options dépréciées
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};

export default connectMongo;
