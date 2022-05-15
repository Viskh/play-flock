const Unit = require("../models/Unit.model");

module.exports.unitsController = {
  createUnit: async (req, res) => {
    try {
      const {
        unitClass,
        maxHp,
        currentHp,
        maxMana,
        currentMana,
        armour,
        magResist,
        x,
        y,
      } = req.body;

      const unit = await Unit.create({
        unitClass,
        maxHp,
        currentHp,
        maxMana,
        currentMana,
        armour,
        magResist,
        x,
        y,
      });

      res.json(unit);
    } catch (error) {
      res.json(error.message);
    }
  },

  getAllUnit: async (req, res) => {
    try {
      const units = await Unit.find();

      res.json(units);
    } catch (error) {
      res.json(error.message);
    }
  },

  editUnit: async (req, res) => {
    try {
      const {
        unitClass,
        maxHp,
        currentHp,
        maxMana,
        currentMana,
        armour,
        magResist,
        x,
        y,
      } = req.body;

      const unit = await Unit.findByIdAndUpdate(
        req.params.id,
        {
          unitClass,
          maxHp,
          currentHp,
          maxMana,
          currentMana,
          armour,
          magResist,
          x,
          y,
        },
        { new: true }
      );

      res.json(unit);
    } catch (error) {
      res.json(error.message);
    }
  },

  removeUnit: async (req, res) => {
    try {
      await Unit.findByIdAndDelete(req.params.id);
      res.json("Юнит успешно удален!");
    } catch (error) {
      res.json(error.message);
    }
  },
};
