import styles from '../Inputs.module.scss';

const TextInput = ({ id, label, type, value, unit, placeholder, error, inputHandler, keyPressHandler }) => {

    return <div className={`${styles.input} ${(error && error.error) ? styles['input--error'] : null}`}>
        <label htmlFor={id}>{ label }</label>
        <input
            type={ type }
            id={id}
            defaultValue={value}
            placeholder={placeholder}
            onChange={inputHandler}
            onKeyUp={keyPressHandler} />
        <p className={styles["input__unit"]}>{ unit }</p>
        {(error && error.error) ? (<p className={`${styles['input__error']} ${styles.error}`}>{error.errorText}</p>) : null}
    </div>
}

export default TextInput;