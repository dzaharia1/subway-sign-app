import styles from './StationList.module.scss'

const StationList = ({ stations, className, clickHandler }) => {

    return <ul className={ `${styles['station-list']} ${className}` }>
        { stations.map((station, i) => (
            <li key={i} className={ styles['item'] } >
                <StationButton
                    stopId={station.stopId}
                    name={station.name}
                    lines={station.lines}
                    clickHandler={clickHandler} />
            </li>
        ))}
    </ul>
}

const StationButton = ({stopId, name, lines, clickHandler}) => {
    function clicked() {
        clickHandler(stopId);
    }

    return <button className={styles['station-button']} onClick={clicked}>
        <h3>{name}</h3>
        <ul>
            {lines.map((line, i) => (
                <li key={i} className={`${styles.line} line--${line[0]} ${(line[1] === 'X') ? styles.express : null}`}>
                    <p>
                        {(line[1] === 'X') ? line[0] : line}
                    </p>
                </li>
            ))}
        </ul>
    </button>
}

export default StationList;