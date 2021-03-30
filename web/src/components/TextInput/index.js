import React from 'react'
import styles from "./TextInput.module.scss";
import PropTypes from "prop-types"

const TextInput = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inputmain}>
                <input className={styles.input} {...props} />
            </div>

            <span className={styles.error}>{props.error}</span>
        </div>
    )
}

TextInput.propTypes = {
    error: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
}

export default TextInput