const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/inotebook?directConnection=true&tls=false&readPreference=primary";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connect to Mongo successfuly");
  });
};

module.exports = connectToMongo;
