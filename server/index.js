const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());
app.use(require("./routes/units.route"));

const connected = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log("Подключение к MongoDB прошло успешно!");
    app.listen(port, () => {
      console.log(`Сервер успешно запущен на порте: ${port}`);
    });
  } catch (e) {
    console.log("Не удалось подключиться к MongoDB!");
  }
};

connected();
