import styles from './StationList.module.scss'

const StationList = ({ stations, className, clickHandler, editMode }) => {

    return <ul className={ `${styles['station-list']} ${className}` }>
        { stations.map((station, i) => (
            <li key={i} className={ styles['item'] } >
                <StationButton
                    stopId={station.stopId}
                    name={station.name}
                    lines={station.lines}
                    clickHandler={clickHandler}
                    editMode={editMode}
                    tracked={station.tracked} />
            </li>
        ))}
    </ul>
}

const StationButton = ({stopId, name, lines, clickHandler, editMode, tracked}) => {
    function clicked() {
        clickHandler(stopId);
    }

    return (
    <button
        className={`${styles['station-button']} ${editMode ? styles['edit-mode'] : null}`}
        onClick={clicked}
        style={editMode ? ((!tracked) ? {backgroundImage: `url('/add.svg')`} : {backgroundImage: `url('/close.svg')`}) : null }>
        <h3>{name}</h3>
        <ul>
            {lines.map((line, i) => (
                <li
                    key={i} 
                    className={`${styles.line} line--${line[0]} ${(line[1] === 'X') ? styles.express : null}`}>
                    <p>
                        {(line[1] === 'X') ? line[0] : line}
                    </p>
                </li>
            ))}
        </ul>
    </button>)
}

export default StationList;