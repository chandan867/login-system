const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const ConnectDb = async () => {
 //  console.log(process.env.MONGO_URI)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      useCreateIndex: true,
    });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = ConnectDb;
