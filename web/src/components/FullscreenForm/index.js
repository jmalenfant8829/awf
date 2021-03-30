import React from 'react'
import styles from "./FullscreenForm.module.scss"
import PropTypes from "prop-types"
import Heading from '../Button/Heading'

const FullscreenForm = (props) => {
    return (
        <div className={styles.form}>
            <div className={styles['form-header']}>
                <Heading size="title">{props.heading}</Heading>
            </div>

            {props.children}
        </div>
    )
}

FullscreenForm.propTypes = {
    heading: PropTypes.string,
}

export default FullscreenForm