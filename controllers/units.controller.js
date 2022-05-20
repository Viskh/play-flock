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

  attack: async (req, res) => {
    try {
      const {
        attackingUnitId,
        attackedUnitId,
        damage,
        damageType,
      } = req.body;

      const attackingUnit = await Unit.findById(attackingUnitId);
      const attackedUnit = await Unit.findById(attackedUnitId);

      const dis =
        (attackingUnit.x - attackedUnit.x) ** 2 +
        (attackingUnit.y - attackedUnit.y) ** 2;
      const distance = Math.floor(
        dis < 0 ? Math.sqrt(dis * -1) : Math.sqrt(dis)
      );

      const funcDamage = () => {
        if (attackingUnit.unitClass === "воин") {
          if (distance < 10) {
            return (
              damage +
              ((attackingUnit.maxHp - attackingUnit.currentHp) /
                attackingUnit.maxHp) *
                damage
            );
          }
          return 0;
        }

        if (attackingUnit.unitClass === "лучник") {
          if (distance < 350) {
            return damage + (distance / 350) * damage;
          }
          return 0;
        }

        if (attackingUnit.unitClass === "волшебник") {
          if (distance < 150) {
            if (attackingUnit.currentMana > 1) {
              return Math.floor(damage * 2);
            }
            return Math.floor(damage / 2);
          }
        }
      };

      if (damageType === "магический") {
        const unit = await Unit.findByIdAndUpdate(
          attackedUnitId,
          {
            magResist: 0,
            currentHp: Math.floor(
              attackedUnit.currentHp - (funcDamage() - attackedUnit.magResist)
            ),
          },
          { new: true }
        );

        if (attackingUnit.currentMana > 1) {
          await Unit.findByIdAndUpdate(attackingUnitId, {
            currentMana: attackingUnit.currentMana - (attackingUnit.currentMana / 2)
          }, {new: true})
        }
        
        return res.json(unit);
      }

      if (damageType === "физический") {
        const unit = await Unit.findByIdAndUpdate(
          attackedUnitId,
          {
            armour: 0,
            currentHp: Math.floor(
              attackedUnit.currentHp - (funcDamage() - attackedUnit.armour)
            ),
          },
          { new: true }
        );
        return res.json(unit);
      }

      return res.json("unit attacked");
    } catch (error) {
      res.json(error);
    }
  },
};
