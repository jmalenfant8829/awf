import React from 'react'
import styles from './Alert.module.scss'

const Alert = (props) => {
  let { type, message } = props

  if (!message) {
    return null
  }

  if (typeof message === 'object') {
    return null
  }

  if (Array.isArray(message)) {
    message = message[0]
  }

  switch (type) {
    case 'error':
      return <div className={styles.error}>{message}</div>
    case 'success':
      return <div className={styles.success}>{message}</div>
    default:
      return null
  }
}

export default Alert
