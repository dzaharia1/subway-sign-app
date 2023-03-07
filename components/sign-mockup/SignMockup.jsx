import { useEffect, useState } from 'react';
import styles from './SignMockup.module.scss';

const SignMockup = ({ arrivals, localOptions, editMode, signId }) => {
    return <ul className={ `${styles['sign-mockup']} ${editMode ? styles['sign-mockup--edit-mode'] : ''}` }>
        {arrivals[0] ? arrivals.map((arrival, i) => 
        (<li className={styles.arrival} key={i}>
                <p className={styles.index} style={{display: localOptions.rotating ? "block" : "none"}}>{ i + 1 }</p>
                <div className={`${styles.route} line--${(arrival.routeId.length == 2 && arrival.routeId[1] == 'S') ? 'S' : arrival.routeId[0]}
                        ${(arrival.routeId[1] === 'X') ? styles.express : null}`}>
                    <p>
                        {(arrival.routeId.length == 2) ? ((arrival.routeId[1] == 'X') ? arrival.routeId[0] : arrival.routeId[1]) : (arrival.routeId[0])}
                    </p>
                </div>
                <h3 className={styles.headsign}>{arrival.headsign}</h3>
                <p className={ (arrival.minutesUntil <= localOptions.warn_time ) ? styles.warning : "" }>{arrival.minutesUntil} min</p>
            </li>
        )) : <p className={ styles['no-data'] }>No upcoming arrivals. There may be service disruptions for the chosen combinations of lines and stations, or the chosen station may be a terminal stop with only uptown or only downtown trains.</p>}
    </ul>
}

export default SignMockup;