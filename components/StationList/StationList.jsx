import styles from './StationList.module.scss'

const StationList = ({ stations, className }) => {
    return <ul className={ `${styles['station-list']} ${className}` }>
        { stations.map((station, i) => (
            <li key={i} className={ styles['item'] } key={ i }>
                <button className={ styles['station-button'] } stop-id={ station.stopId }>
                    <h3>{ station.name }</h3>
                    <ul>
                        { station.lines.map((line, i) => (
                            <li key={i} className={`${styles.line} line--${line[0]} ${(line[1] === 'X') ? styles.express : null}`}>
                                <p>
                                    { (line[1] === 'X') ? line[0] : line }
                                </p>
                            </li>
                        )) }
                    </ul>
                </button>
            </li>
        ))}
    </ul>
}

export default StationList;