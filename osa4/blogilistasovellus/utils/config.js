require("dotenv").config();

let PORT = process.env.PORT;
let MONGO_DB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_DB_URI;

module.exports = {
  MONGO_DB_URI,
  PORT,
};
