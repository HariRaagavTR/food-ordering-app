import { useRef } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
    const inputRef = useRef();

    const changeValueHandler = () => {
        props.onChangeValue(inputRef.current.value);
    }

    return (
        <div className={classes.input}>
            <label htmlFor={props.id}>{props.label}</label>
            <input ref={inputRef} {...props.input} onChange={changeValueHandler} />
        </div>
    );
};

export default Input;
