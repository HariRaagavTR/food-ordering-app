import { CartContextProvider } from "./components/contexts/cart-context";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

function App() {
    const [cartOpen, setCartOpen] = useState(false);

    const openCartHandler = () => {
        setCartOpen(true);
    }

    const closeCartHandler = () => {
        setCartOpen(false);
    }

    return (
        <CartContextProvider>
            {cartOpen && <Cart onCloseCart={closeCartHandler} />}
            <Header onOpenCart={openCartHandler} />
            <main>
                <Meals />
            </main>
        </CartContextProvider>
    );
}

export default App;
