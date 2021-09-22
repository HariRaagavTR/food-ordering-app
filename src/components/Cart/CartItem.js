import { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../contexts/cart-context";

const CartItem = (props) => {
    const ctx = useContext(CartContext);

    const onAddHandler = () => {
        ctx.addToCart({
            id: props.id,
            name: props.name,
            price: props.price
        }, 1);
    }

    const onRemoveHandler = () => {
        ctx.removeFromCart(props.id, 1);
    }

    const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={onRemoveHandler}>−</button>
                <button onClick={onAddHandler}>+</button>
            </div>
        </li>
    );
};

export default CartItem;
