// Combination of AvailableMeals and MealSummary

import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealSummary from "./MealSummary";

const Meals = () => {
  return (
    <>
      <MealSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
