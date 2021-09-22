import { Fragment, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHTTPRequest from "../../hooks/use-http";
import Modal from "../UI/Modal";

const AvailableMeals = (props) => {
    const [foodItems, setFoodItems] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openError, setOpenError] = useState(false);

    const {
        isLoading,
        error: hasError,
        sendRequest: fetchMeals,
    } = useHTTPRequest();

    useEffect(() => {
        const dataTransform = (data) => {
            let food_items = [];
            for (const key in data) {
                food_items.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: parseFloat(data[key].price),
                });
            }
            setFoodItems(food_items);
        };
        fetchMeals(
            {
                url: "add-firebase-url-here",
            },
            dataTransform
        );
    }, [fetchMeals]);

    const openConfirmation = () => {
        setOpenConfirm(true);
    };

    const openErrorHandler = () => {
        setOpenError(true);
    }

    const confirmationOverlay = (
        <Modal>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
                Item Added To Cart!
            </p>
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={() => {
                        setOpenConfirm(false);
                    }}
                >
                    Close
                </button>
            </div>
        </Modal>
    );

    const errorOverlay = (
        <Modal>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
                Invalid Quantity Value. Valid: 1-5.
            </p>
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={() => {
                        setOpenError(false);
                    }}
                >
                    Close
                </button>
            </div>
        </Modal>
    );

    let meal_items = <p>No Meals Found.</p>;
    if (isLoading) {
        meal_items = <p>Loading...</p>;
    } else if (hasError) {
        meal_items = <p>Error: {hasError}</p>;
    } else {
        meal_items = (
            <ul>
                {foodItems.map((meals) => (
                    <MealItem
                        key={meals.id}
                        id={meals.id}
                        name={meals.name}
                        description={meals.description}
                        price={meals.price}
                        onAddToCart={openConfirmation}
                        onError={openErrorHandler}
                    />
                ))}
            </ul>
        );
    }

    return (
        <Fragment>
            {openConfirm && confirmationOverlay}
            {openError && errorOverlay}
            <section className={classes.meals}>
                <Card>{meal_items}</Card>
            </section>
        </Fragment>
    );
};

export default AvailableMeals;
