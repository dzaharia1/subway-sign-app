import styles from './Button.module.scss';

const Button = ({icon, label, clickHandler}) => {
    return <button className={styles.button} onClick={clickHandler}>
        <img src={icon} alt=""/>
        {label}
    </button>
}

export default Button;