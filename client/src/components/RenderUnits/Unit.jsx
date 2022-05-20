import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Unit = ({ unit }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  const handleRemoveUnit = async (id) => {
    const options = {
      method: "DELETE",
    };
    try {
      dispatch({ type: "remove/unit/pending" });

      await fetch(`http://localhost:5000/unit/remove/${id}`, options);

      dispatch({ type: "remove/unit/fulfilled", payload: id });
    } catch (error) {
      dispatch({ type: "remove/unit/rejected", payload: error });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="unit" key={unit._id}>
      <div className="unit__info">
        <p>UnitId: {unit._id}</p>
        <div>
          {unit.currentHp}/{unit.maxHp}
        </div>
        <div>
          {unit.currentMana}/{unit.maxMana}
        </div>
        <div>{unit.unitClass}</div>
      </div>
      <div className="unit__btn">
        <button>
          <Link className="navlink" to={"/edit"}>
            Edit
          </Link>
        </button>

        {loading ? (
          <div className="preloader">Loading...</div>
        ) : (
          <button onClick={() => handleRemoveUnit(unit._id)}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default Unit;
