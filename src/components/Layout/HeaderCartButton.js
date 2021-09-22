import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../contexts/cart-context";
import { useContext } from "react";

const HeaderCartButton = props => {
    const ctx = useContext(CartContext);

    return (
        <button className={classes.button} onClick={props.onOpenCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {ctx.quantity}
            </span>
        </button>
    );
}

export default HeaderCartButton;