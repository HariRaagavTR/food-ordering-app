import classes from "./OrderForm.module.css";
import useInput from "../../hooks/use-input";

const OrderForm = (props) => {
    const {
        value: enteredName,
        valueIsValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        valueBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInput("", (name) => name.trim() !== "");
    const nameClass = nameHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    const {
        value: enteredStreet,
        valueIsValid: streetIsValid,
        hasError: streetHasError,
        valueChangeHandler: streetChangeHandler,
        valueBlurHandler: streetBlurHandler,
        reset: streetReset,
    } = useInput("", (street) => street.trim() !== "");
    const streetClass = streetHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    const {
        value: enteredPostalCode,
        valueIsValid: postalCodeIsValid,
        hasError: postalCodeHasError,
        valueChangeHandler: postalCodeChangeHandler,
        valueBlurHandler: postalCodeBlurHandler,
        reset: postalCodeReset,
    } = useInput("", (postalCode) => !isNaN(postalCode));
    const postalCodeClass = postalCodeHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    const {
        value: enteredCity,
        valueIsValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        valueBlurHandler: cityBlurHandler,
        reset: cityReset,
    } = useInput("", (city) => city.trim() !== "");
    const cityClass = cityHasError
        ? `${classes.control} ${classes.invalid}`
        : classes.control;

    let formIsValid = false;
    if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid)
        formIsValid = true;

    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log("Form Submission Successful!");
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity,
        });
        nameReset();
        streetReset();
        postalCodeReset();
        cityReset();
    };

    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <div className={nameClass}>
                <label htmlFor="name">Name</label>
                <input
                    value={enteredName}
                    id="name"
                    type="text"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {nameHasError && <p>Error: Name Field Empty.</p>}
            </div>
            <div className={streetClass}>
                <label htmlFor="street">Street</label>
                <input
                    value={enteredStreet}
                    id="street"
                    type="text"
                    onChange={streetChangeHandler}
                    onBlur={streetBlurHandler}
                />
                {streetHasError && <p>Error: Street Field Empty.</p>}
            </div>
            <div className={postalCodeClass}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    value={enteredPostalCode}
                    id="postal"
                    type="text"
                    onChange={postalCodeChangeHandler}
                    onBlur={postalCodeBlurHandler}
                />
                {postalCodeHasError && <p>Error: Invalid Postal Code.</p>}
            </div>
            <div className={cityClass}>
                <label htmlFor="city">City</label>
                <input
                    value={enteredCity}
                    id="city"
                    type="text"
                    onChange={cityChangeHandler}
                    onBlur={cityBlurHandler}
                />
                {cityHasError && <p>Error: City Field Empty.</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit} disabled={!formIsValid}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default OrderForm;
