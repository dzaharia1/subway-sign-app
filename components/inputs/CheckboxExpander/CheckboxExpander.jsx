import { useState } from 'react'
import styles from './CheckboxExpander.module.scss'

const CheckboxExpander = ({id, label, description, checked, inputHandler, children}) => {
    let [active, setActive] = useState(checked);

    function checkboxChangeHandler(e) {
        setActive(e.target.checked);
        inputHandler(e)
    }

    return <div className={`${styles['checkbox-expander']} ${(active) ? styles['checkbox-expander--active'] : ''}`}>
            <label htmlFor={id} className={styles["checkbox-expander__label"]}>{ label }
                <input type="checkbox" onChange={ checkboxChangeHandler } id={id} defaultChecked={checked} />
            </label>
            <div className={styles["checkbox-expander__expanded-content"]}>
                <p className={styles['checkbox-expander__description']}>{description}</p>
                {children}
            </div>
    </div>
}

export default CheckboxExpander