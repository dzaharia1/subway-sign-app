import styles from '../Inputs.module.scss';

const TextInput = ({ id, label, type, value, unit, placeholder, inputHandler }) => {

    return <div className={styles.input}>
        <label htmlFor={id}>{ label }</label>
        <input type={ type } id={id} defaultValue={value} onChange={inputHandler} />
        <p className={styles["input__unit"]}>{ unit }</p>
    </div>
}

export default TextInput;