import React from 'react'
import styles from './TextInput.module.scss'
import PropTypes from 'prop-types'

const TextInput = ({ error, className, ...rest }) => {
  return (
        <div className={`${styles.wrapper} ${className}`}>
            <div className={styles.inputmain}>
                <input className={styles.input} {...rest} />
            </div>

            <span className={styles.error}>{error}</span>
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
  onKeyPress: PropTypes.func
}

export default TextInput
