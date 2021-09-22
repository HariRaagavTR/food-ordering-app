import { useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealForm.module.css";

const MealForm = (props) => {
    const [mealAmount, setMealAmount] = useState(1);

    const addItemHandler = (event) => {
        event.preventDefault();
        if (mealAmount > 0 && mealAmount < 6) {
            props.onAdd(mealAmount);
            setMealAmount(1);
        } else props.onError();
    };

    const onChangeAmountHandler = (amount) => {
        setMealAmount(amount);
    };

    return (
        <form className={classes.form}>
            <Input
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                    value: mealAmount,
                }}
                onChangeValue={onChangeAmountHandler}
            />
            <button onClick={addItemHandler}>+ Add</button>
        </form>
    );
};

export default MealForm;
