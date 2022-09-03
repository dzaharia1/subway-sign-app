import { useEffect, useState } from 'react';
import styles from './SignMockup.module.scss';

const SignMockup = ({ arrivals, localOptions, editMode, signId }) => {
    const [mockupLoading, setMockupLoading] = useState(false);

    // useEffect(() => {
    //     setMockupLoading(true);

    //     fetch(`https://subway-arrivals.herokuapp.com/sign/${signId}`)
    //     .then(res => res.json())
    //     .then((data) => {
    //         setArrivals([data[1], data[2]]);
    //         setMockupLoading(false);
    //     });
    // }, [localOptions]);
    // useEffect(() => {

    // }, [arrivals])

    return <ul className={ `${styles['sign-mockup']} ${mockupLoading ? styles['sign-mockup--loading'] : ''} ${editMode ? styles['sign-mockup--edit-mode'] : ''}` }>
        {arrivals.map((arrival, i) => 
        (<li className={styles.arrival} key={i}>
                <p className={styles.index} style={{display: localOptions.rotating ? "block" : "none"}}>{ i + 1 }</p>
                <div className={`${styles.route} line--${arrival.routeId[0]} ${(arrival.routeId[1] === 'X') ? styles.express : null}`}>
                    <p>{arrival.routeId[0]}</p>
                </div>
                <h3 className={styles.headsign}>{arrival.headsign}</h3>
                <p className={ (arrival.minutesUntil <= localOptions.warn_time ) ? styles.warning : "" }>{arrival.minutesUntil} min</p>
            </li>
        ))}
    </ul>
}

export default SignMockup;