import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import classes from "./Modal.module.css";

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onCloseCart} />
}

const Overlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const portalLocation = document.getElementById("overlays");

const Modal = props => {
    return (
        <Fragment>
            {createPortal(<Backdrop onCloseCart={props.onCloseCart} />, portalLocation)}
            {createPortal(<Overlay>{props.children}</Overlay>, portalLocation)}
        </Fragment>
    );
}

export default Modal;