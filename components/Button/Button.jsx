import styles from './Button.module.scss';
import Image from 'next/image'

const Button = ({icon, label, className, disabled, clickHandler}) => {
    return <button className={`${styles.button} ${className}`} onClick={clickHandler} disabled={disabled}>
        {icon ? <img src={icon} alt=""/> : null}
        {label}
    </button>
}

export default Button;