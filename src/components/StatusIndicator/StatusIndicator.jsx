import { useState } from 'react'
import styles from './StatusIndicator.module.scss'

const StatusIndicator = ({state}) => {
    return <div className={`${styles['status-indicator']} ${styles[`status-indicator--${state}`]}`}></div>
}

export default StatusIndicator