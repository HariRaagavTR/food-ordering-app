import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h2>ReactMeals</h2>
                <HeaderCartButton onOpenCart={props.onOpenCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="Tasty Food Items!" />
            </div>
        </Fragment>
    );
};

export default Header;
