const mongoose = require("mongoose");

const unitSchema = mongoose.Schema(
  {
    unitClass: {
      type: String,
    },
    maxHp: {
      type: Number,
    },
    currentHp: {
      type: Number,
    },
    maxMana: {
      type: Number,
    },
    currentMana: {
      type: Number,
    },
    armour: {
      type: Number,
    },
    magResist: {
      type: Number,
    },
    x: Number,
    y: Number,
  },
  { timestamps: true }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
