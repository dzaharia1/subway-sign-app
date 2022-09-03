import { useState } from 'react'
import styles from './StatusIndicator.module.scss'
import Image from 'next/image'

const StatusIndicator = ({state}) => {
    return <div className={`${styles['status-indicator']} ${styles[`status-indicator--${state}`]}`}></div>
}

export default StatusIndicator