import styles from './Power-Button.module.scss'
import IconButton from '../IconButton'
import React, {useState, useEffect} from 'react'

const PowerButton = ({ signId }) => {
    const [onState, setOnState] = useState(true);

    useEffect(() => {
        const url = `https://subway-arrivals.herokuapp.com/signpower/${signId}`;
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setOnState(data);
        });
    }, []);

    function handleClick (e) {
        const url = `https://subway-arrivals.herokuapp.com/signpower/${signId}?power=${ !onState }`;
        fetch(url, {
            method: 'POST',
            mode: 'no-cors'
        }).then((data) => {
            setOnState(!onState);
        });
    }

    return <div className={`${styles['power-button']} ${styles[onState]}`} >
        <IconButton icon="/power.svg" clickHandler={ handleClick }/>
    </div>
}

export default PowerButton;