import styles from './SignStations.module.scss';
import StationList from '../StationList'
import { useEffect, useState } from 'react';
import IconButton from '../IconButton'
import { render } from 'react-dom';

const SignStations = ({ stations, setStations, editMode, setEditMode }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchSubmitIcon, setSearchSubmitIcon] = useState('/search.svg');

    useEffect(() => {
    }, [])

    function searchFocus(e) {
        let searchBox = e.target;
        let button = searchBox.parentNode.querySelector('button');
        searchBox.placeholder = 'Search for a station';
        setEditMode(true);
        if (searchBox.value === '') {
            setSearchSubmitIcon('/close.svg');
        } else {
            setSearchSubmitIcon('/check.svg');
            button.classList.add(styles["button--active"]);
        }
    }
    
    function searchInput(e) {
        let searchBox = e.target;
        let searchString = searchBox.value.toLowerCase();
        setSearchResults(stations.filter((obj) => {
            if (obj.name) {
                const stationName = obj.name.toLowerCase();
                if (stationName.includes(searchString)) {
                    return obj;
                }
            }
        }));
    }

    function submit(e) {
        let searchBox = e.target.parentNode.querySelector('input');
        if (editMode) {
            let url = 'https://subway-arrivals-staging.herokuapp.com/setstops/kshf?stops='
            let stationsToSet = stations.filter(station => station.tracked);
            for (let station of stationsToSet) {
                url += `${station.stopId},`
            }
            url = url.substr(0, url.length - 1);
            console.log(url)
            fetch(url, { method: 'POST' })
            .then(() => { setEditMode(false) });
        } else {
            setEditMode(!editMode);
        }
    }

    function stationToggle(stopId) {
        console.log('teehee');
        const newStations = stations.map(station => {
            if (station.stopId === stopId) {
                station.tracked = !station.tracked;
            }
            return station;
        })

        setStations(newStations);
    }

    return(
    <div className={ `${styles['sign-stations']} ${editMode ? styles['sign-stations--active']: ''}` }>
        <h2>Tracked stations</h2>
        <StationList stations={stations.filter(obj => obj.tracked)} className={styles['tracked-stations']} clickHandler={stationToggle} />
        <div className={styles['search-results']}>
            <div className={styles["separator"]}></div>
            <h2>Search results</h2>
            <StationList stations={ searchResults } clickHandler={ stationToggle } />
        </div>
        <div className={styles["search-bar"]}>
            <input
                onFocus={searchFocus}
                onInput={searchInput}
                type="text"
                placeholder="Edit stations"/>
            <IconButton
                className={editMode ? styles['button--active'] : null}
                clickHandler={submit}
                icon={editMode ? '/check.svg' : '/search.svg'} />
        </div>
    </div>)
}

export default SignStations;