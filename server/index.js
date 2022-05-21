const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/units.route"));

const connected = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log("Подключение к MongoDB прошло успешно!");
    app.listen(port, () => {
      console.log("Server has been started");
    });
  } catch (e) {
    console.log("Не удалось подключиться к MongoDB!");
  }
};

connected();
