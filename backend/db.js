import mongoose from "mongoose";

const url = 'mongodb+srv://abhash:jlBJW9qKQp82cICa@cluster0.xmccr.mongodb.net/?retryWrites=true&w=majority';


export async function connectToDB() {
  try {
    await mongoose.connect(url);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit the application if there's an error connecting to the database
  }
}


