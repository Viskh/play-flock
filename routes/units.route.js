const { Router } = require("express");
const { unitsController } = require("../controllers/units.controller");

const router = Router();

router.get("/unit/list", unitsController.getAllUnit);
router.post("/unit/create", unitsController.createUnit);
router.patch("/unit/edit/:id", unitsController.editUnit);
router.patch("/unit/attack", unitsController.attack);
router.delete("/unit/remove/:id", unitsController.removeUnit);

module.exports = router;
