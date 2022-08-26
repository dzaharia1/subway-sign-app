import styles from './Power-Button.module.scss'
import IconButton from '../IconButton'
import React, {useState, useEffect} from 'react'

const PowerButton = () => {
    const [onState, setOnState] = useState(true);

    useEffect(() => {
        updateSignPower()
    }, [])

    function updateSignPower() {
        const powerUrl = 'https://subway-arrivals-staging.herokuapp.com/signpower/kshf';

        fetch(powerUrl, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((data) => {
            setOnState(data);
        })
    }

    function handleClick (e) {
        const url = `https://subway-arrivals-staging.herokuapp.com/signpower/kshf?power=${ !onState }`;
        fetch(url, {
            method: 'POST',
            mode: 'no-cors'
        }).then((data) => {
            setOnState(!onState);
        });
    }

    return <div className={`${styles['power-button']} ${styles[onState]}`} >
        <IconButton icon="power.svg" clickHandler={ handleClick }/>
    </div>
}

export default PowerButton;