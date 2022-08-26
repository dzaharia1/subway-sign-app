import styles from './SignMockup.module.scss';
import React, { useState, useEffect } from 'react';

const SignMockup = ({ sampleData, signOptions, editMode }) => {
    const [arrivalsData, setArrivalsData] = useState(sampleData);

    useEffect(() => {
        setArrivalsData([sampleData[1], sampleData[2]]);
    }, []);
    
    function updateSignData() {
        const arrivalsUrl = `https://subway-arrivals-staging.herokuapp.com/sign/kshf`;

        fetch(arrivalsUrl, {
            method: 'GET'
        })
        .then((res) => res.json() )
        .then((data) => {
            let newArrivalsData = [data[1], data[2]];
            setArrivalsData(newArrivalsData);
            // signOptions = data[0];
        });
    }

    function clickHandler() {
        updateSignData();
    }

    return <ul onClick={ clickHandler } className={ `${styles['sign-mockup']} ${editMode ? styles['sign-mockup--edit-mode'] : ''}` }>
        {arrivalsData.map((arrival, i) => (
            <li className={styles.arrival} key={i}>
                <p className={styles.index} style={{display: signOptions.rotating ? "block" : "none"}}>{ i + 1 }</p>
                <div className={`${styles.route} line--${arrival.routeId}`}>
                    <p>{arrival.routeId}</p>
                </div>
                <h3 className={styles.headsign}>{arrival.headsign}</h3>
                <p className={ (arrival.minutesUntil < signOptions.warn_time ) ? styles.warning : "" }>{arrival.minutesUntil} min</p>
            </li>
        ))}
    </ul>
}

export default SignMockup;