const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("DB Connection error: ", error);
  }
};
module.exports = DbConnection;
