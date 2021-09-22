import { createContext, useReducer } from "react";

const CartContext = createContext({
    quantity: 0,
    total_price: 0.0,
    cartItems: [],
    addToCart: (newItem, amount) => {},
    removeFromCart: (id, amount) => {},
    clearCart: () => {},
});

const cartReducer = (prevState, action) => {
    if (action.type === "ADD_ITEM") {
        const inCart = prevState.cartItems.findIndex(
            (item) => item.id === action.newItem.id
        );

        if (inCart === -1) {
            const newCartItem = {
                id: action.newItem.id,
                name: action.newItem.name,
                amount: parseInt(action.amount),
                price: action.newItem.price,
            };

            const newCartItems = [...prevState.cartItems, newCartItem];

            return {
                cartItems: newCartItems,
                quantity:
                    parseInt(prevState.quantity) + parseInt(action.amount),
                total_price:
                    parseFloat(prevState.total_price) +
                    newCartItem.price * newCartItem.amount,
            };
        } else {
            prevState.cartItems[inCart].amount += parseInt(action.amount);
            return {
                cartItems: prevState.cartItems,
                quantity:
                    parseInt(prevState.quantity) + parseInt(action.amount),
                total_price:
                    parseFloat(prevState.total_price) +
                    parseInt(action.amount) *
                        parseFloat(prevState.cartItems[inCart].price),
            };
        }
    } else if (action.type === "REMOVE_ITEM") {
        const inCart = prevState.cartItems.findIndex(
            (item) => item.id === action.id
        );
        if (
            prevState.cartItems[inCart].amount - parseInt(action.amount) ===
            0
        ) {
            return {
                cartItems: prevState.cartItems.filter(
                    (item) => item.id !== action.id
                ),
                quantity:
                    prevState.quantity - prevState.cartItems[inCart].amount,
                total_price:
                    parseFloat(prevState.total_price) -
                    parseInt(action.amount) *
                        parseFloat(prevState.cartItems[inCart].price),
            };
        } else {
            prevState.cartItems[inCart].amount -= parseInt(action.amount);
            return {
                cartItems: prevState.cartItems,
                quantity: prevState.quantity - parseInt(action.amount),
                total_price:
                    parseFloat(prevState.total_price) -
                    parseInt(action.amount) *
                        parseFloat(prevState.cartItems[inCart].price),
            };
        }
    } else {
        return {
            cartItems: [],
            quantity: 0,
            total_price: 0,
        };
    }
};

export const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, {
        cartItems: [],
        quantity: 0,
        total_price: 0,
    });

    const addToCart = (newItem, amount) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            newItem: newItem,
            amount: amount,
        });
        // console.log(cartState);
    };

    const removeFromCart = (id, amount) => {
        dispatchCartAction({ type: "REMOVE_ITEM", id: id, amount: amount });
        // console.log(cartState);
    };

    const clearCart = () => {
        dispatchCartAction({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems: cartState.cartItems,
                quantity: cartState.quantity,
                total_price: cartState.total_price,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContext;
