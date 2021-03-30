import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = (props) => {
  const size = props.size || "normal";
  const color = props.color || "primary";

  return (
    <button
      className={`${styles.btn} ${styles[`btn--${size}`]} ${
        styles[`btn--${color}`]
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Button;
