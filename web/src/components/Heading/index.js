import React from 'react'
import styles from "./Heading.module.scss"
import PropTypes from "prop-types"

const Heading = (props) => {
    const size = props.size || "subtitle";

    return (
        <h1 className={styles[`heading--${size}`]}>
            {props.children}
        </h1>
    )
}

Heading.propTypes = {
    size: PropTypes.string,
}

export default Heading;