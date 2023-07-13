const mongoose = require("mongoose");

const uri = (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/") + "foodie-friends-server";
// console.log("connection_url", { uri });
mongoose.connect(uri);

module.exports = mongoose.connection;
