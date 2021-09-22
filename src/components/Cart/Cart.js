import React, { Fragment, useContext, useState } from "react";

import CartItem from "./CartItem";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartContext from "../contexts/cart-context";
import OrderForm from "./OrderForm";
import useHTTPRequest from "../../hooks/use-http";

const Cart = (props) => {
    const {
        isLoading: isOrdering,
        error: hasError,
        sendRequest: purchaseItems,
    } = useHTTPRequest();

    const [confirmOrder, setConfirmOrder] = useState(false);
    const [ordered, setOrdered] = useState(false);

    const ctx = useContext(CartContext);
    const customPrice = ctx.total_price.toFixed(2);

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {ctx.cartItems.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                    />
                );
            })}
        </ul>
    );

    const orderHandler = () => {
        setConfirmOrder(true);
    };

    const cancelHandler = () => {
        setConfirmOrder(false);
    };

    const orderConfirmHandler = (userDetails) => {
        purchaseItems({
            url: "add-firebase-url-here",
            method: "POST",
            body: {
                userDetails: userDetails,
                cartItems: ctx.cartItems,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!hasError) {
            setOrdered(true);
            ctx.clearCart();
        }
    };

    const orderDetails = (
        <Fragment>
            {ctx.cartItems.length === 0 ? "No Items Added!" : cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`$${customPrice}`}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={props.onCloseCart}
                >
                    Close
                </button>
                <button
                    className={classes.button}
                    onClick={orderHandler}
                    disabled={ctx.cartItems.length === 0}
                >
                    Order
                </button>
            </div>
        </Fragment>
    );

    const orderSuccessful = (
        <Fragment>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
                Purchase Successful!
            </p>
            <div className={classes.actions}>
                <button
                    className={classes["button--alt"]}
                    onClick={() => {
                        setOrdered(false);
                        props.onCloseCart();
                    }}
                >
                    Close
                </button>
            </div>
        </Fragment>
    );

    let modalContent = null;
    if (isOrdering) {
        modalContent = <p style={{ textAlign: "center", fontSize: "20px" }}>Order Processing.</p>;
    } else if (hasError) {
        modalContent = <p style={{ textAlign: "center", fontSize: "20px" }}>Error: {hasError} Purchase Unsuccessful.</p>;
    } else if (ordered) {
        modalContent = orderSuccessful;
    } else if (confirmOrder) {
        modalContent = (
            <OrderForm
                onConfirm={orderConfirmHandler}
                onCancel={cancelHandler}
            />
        );
    } else {
        modalContent = orderDetails;
    }

    return <Modal onCloseCart={props.onCloseCart}>{modalContent}</Modal>;
};

export default Cart;
