const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo DB connected successfully...');
  } catch (err) {
    console.log('Error occurred...', err);
    process.exit(1);
  }
};

module.exports = connectDb;
