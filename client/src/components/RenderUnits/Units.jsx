import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Unit from "./Unit";

const Units = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        dispatch({ type: "load/units/pending" });

        const res = await fetch("http://localhost:5000/unit/list");
        const units = await res.json();

        dispatch({ type: "load/units/fulfilled", payload: units });
      } catch (error) {
        dispatch({ type: "load/units/rejected", payload: error });
      }
    };
    fetchUnits();
  }, [dispatch]);

  const units = useSelector((state) => state.units);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="display">
      <div className="container">
        {loading ? (
          <div className="preloader">Loading...</div>
        ) : (
          <>
            <button className="forms__submit">
              <Link className="navlink" to={"/create"}>
                Add new unit
              </Link>
            </button>
            <div className="home__units__list">
              {units.map((unit) => {
                return <Unit unit={unit} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Units;
