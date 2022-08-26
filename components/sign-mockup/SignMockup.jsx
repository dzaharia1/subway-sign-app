import styles from './SignMockup.module.scss';
import React, { useState, useEffect } from 'react';

const SignMockup = ({ arrivals, signOptions, editMode, signId }) => {
    // const [arrivalsData, setArrivalsData] = useState(sampleData);

    return <ul className={ `${styles['sign-mockup']} ${editMode ? styles['sign-mockup--edit-mode'] : ''}` }>
        {arrivals.map((arrival, i) => (
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