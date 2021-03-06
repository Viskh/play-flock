import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditUnit = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state);

  const [unitId, setUnitId] = useState("");
  const [currentHp, setCurrentHp] = useState("");
  const [maxHp, setMaxHp] = useState("");
  const [currentMana, setCurrentMana] = useState("");
  const [maxMana, setMaxMana] = useState("");
  const [armour, setArmour] = useState("");
  const [magResist, setMagResist] = useState("");
  const [coordinateX, setCoordinateX] = useState("");
  const [coordinateY, setCoordinateY] = useState("");
  const [unitClass, setUnitClass] = useState("воин");

  const editUnit = async () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unitClass,
        currentHp,
        maxHp,
        currentMana,
        maxMana,
        armour,
        magResist,
        coordinateX,
        coordinateY,
      }),
    };
    try {
      dispatch({ type: "edit/unit/pending" });

      const res = await fetch(`/unit/edit/${unitId}`, options);
      const unit = await res.json();

      dispatch({ type: "edit/unit/fulfilled", payload: unit });
    } catch (error) {
      dispatch({ type: "edit/unit/rejected", payload: error });
    }

    setCurrentHp("");
    setMaxHp("");
    setCurrentMana("");
    setMaxMana("");
    setArmour("");
    setMagResist("");
    setCoordinateX("");
    setCoordinateY("");
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="display">
      <div className="container">
        <h1>Edit Unit</h1>
        <input
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          type="text"
          placeholder="unitId"
        />
        <div className="two__forms">
          <input
            value={currentHp}
            onChange={(e) => setCurrentHp(e.target.value)}
            placeholder="currentHp"
            type="text"
          />
          <input
            value={maxHp}
            onChange={(e) => setMaxHp(e.target.value)}
            placeholder="maxHp"
            type="text"
          />
        </div>

        <div className="two__forms">
          <input
            value={currentMana}
            onChange={(e) => setCurrentMana(e.target.value)}
            placeholder="currentMana"
            type="text"
          />
          <input
            value={maxMana}
            onChange={(e) => setMaxMana(e.target.value)}
            placeholder="maxMana"
            type="text"
          />
        </div>

        <input
          value={armour}
          onChange={(e) => setArmour(e.target.value)}
          placeholder="armour"
          type="text"
        />
        <input
          value={magResist}
          onChange={(e) => setMagResist(e.target.value)}
          placeholder="magResist"
          type="text"
        />
        <select
          value={unitClass}
          onChange={(e) => setUnitClass(e.target.value)}
        >
          <option value="воин">воин</option>
          <option value="лучник">лучник</option>
          <option value="волшебник">волшебник</option>
        </select>

        <div className="two__forms">
          <input
            value={coordinateX}
            onChange={(e) => setCoordinateX(e.target.value)}
            placeholder="x"
            type="text"
          />
          <input
            value={coordinateY}
            onChange={(e) => setCoordinateY(e.target.value)}
            placeholder="y"
            type="text"
          />
        </div>

        <button onClick={editUnit} className="forms__submit">
          Reset
        </button>
      </div>
    </div>
  );
};

export default EditUnit;
