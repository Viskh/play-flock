import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateUnit = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state);

  const [currentHp, setCurrentHp] = useState("");
  const [maxHp, setMaxHp] = useState("");
  const [currentMana, setCurrentMana] = useState("");
  const [maxMana, setMaxMana] = useState("");
  const [armour, setArmour] = useState("");
  const [magResist, setMagResist] = useState("");
  const [coordinateX, setCoordinateX] = useState("");
  const [coordinateY, setCoordinateY] = useState("");
  const [unitClass, setUnitClass] = useState("воин");

  const createUnit = async () => {
    const options = {
      method: "POST",
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
        x: coordinateX,
        y: coordinateY,
      }),
    };
    try {
      dispatch({ type: "create/unit/pending" });

      const res = await fetch("http://localhost:5000/unit/create", options);
      const unit = await res.json();

      dispatch({ type: "create/unit/fulfilled", payload: unit });
    } catch (error) {
      dispatch({ type: "create/unit/rejected", payload: error });
    }

    setCurrentHp("");
    setMaxHp("");
    setCurrentMana("");
    setMaxMana("");
    setArmour("");
    setMagResist("");
    setCoordinateX("");
    setCoordinateY("");
    setUnitClass('')
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="display">
      <div className="container">
        <h1>Create Unit</h1>
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
        <button onClick={createUnit} className="forms__submit">
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateUnit;
