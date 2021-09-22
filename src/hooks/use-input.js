import { useState } from "react";

const useInput = (defaultValue, validateValue) => {
    const [value, setValue] = useState(defaultValue);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const valueBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setValue(defaultValue);
        setIsTouched(false);
    }

    return {
        value,
        isTouched,
        valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        reset
    };
};

export default useInput;