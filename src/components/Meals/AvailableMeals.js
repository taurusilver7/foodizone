import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  // https fetch req
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodizone-d0523-default-rtdb.firebaseio.com/meals.json"
      );

      const resData = await response.json(); // The resData obtained is an object with m1-m4 keys and the data in nested objects. To turn it into an array for mapping...

      console.log(resData);
      const loadedMeals = [];

      for (let key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
          img: resData[key].img,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      img={meal.img}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
