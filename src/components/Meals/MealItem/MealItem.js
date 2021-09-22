import { useContext } from "react";
import MealForm from "./MealForm";
import classes from "./MealItem.module.css";
import CartContext from "../../contexts/cart-context";

const MealItem = (props) => {
    const customPrice = props.price.toFixed(2);

    const ctx = useContext(CartContext);
    const addItem = (amount) => {
        ctx.addToCart({
            id: props.id,
            name: props.name,
            price: props.price
        }, amount);
        props.onAddToCart();
    };

    return (
        <li className={classes.meal}>
            <div>
                <div>
                    <h3>{props.name}</h3>
                </div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{`$${customPrice}`}</div>
            </div>
            <div>
                <MealForm onAdd={addItem} onError={props.onError} id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;
