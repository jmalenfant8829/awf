import React from "react";
import { btn } from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button className={btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
