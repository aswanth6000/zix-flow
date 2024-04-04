import mongoose from "mongoose";


type ConnectionURI = string;

export const dbConnection = async (DB_URL: string) => {
  let uri: ConnectionURI = DB_URL
  if (!uri) {
    console.error('DB_URL not found in environment variables');
    return;
  }
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('Database connected');
  } catch (err) {
    console.error('Connection failed:', err);
  }
};
