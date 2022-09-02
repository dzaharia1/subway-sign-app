import styles from './SignStations.module.scss';
import StationList from '../StationList'
import { useEffect, useState } from 'react';
import IconButton from '../IconButton'
import { render } from 'react-dom';

const SignStations = ({ stations, setStations, editMode, setEditMode, signId }) => {
    const [searchResults, setSearchResults] = useState(stations);
    const [submitButtonIcon, setSubmitButtonIcon] = useState('');

    function searchFocus(e) {
        let searchBox = e.target;
        searchBox.placeholder = 'Search for a station';
        setEditMode(true);
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
            let url = `https://subway-arrivals.herokuapp.com/setstops/${signId}?stops=`;
            let stationsToSet = stations.filter(station => station.tracked);

            setSubmitButtonIcon('/loading.svg');
            
            for (let station of stationsToSet) {
                url += `${station.stopId},`
            }
            url = url.substr(0, url.length - 1);
            
            fetch(url, { method: 'POST' })
            .then(() => {
                setTimeout(() => {
                    setSubmitButtonIcon('');
                    setEditMode(false);
                    searchBox.value = '';
                    searchBox.placeholder = 'Edit stations';
                    setTimeout(() => {
                        setSearchResults(stations);
                    }, 750);
                }, 500);
            });
        } else {
            searchBox.focus();
        }
    }

    function stationToggle(stopId) {
        if (editMode) {
            console.log('teehee');
            const newStations = stations.map(station => {
                if (station.stopId === stopId) {
                    station.tracked = !station.tracked;
                }
                return station;
            })
    
            setStations(newStations);
        }
    }

    return(
    <div className={ `${styles['sign-stations']} ${editMode ? styles['sign-stations--active']: ''}` }>
        <h2>Tracked stations</h2>
        <StationList
            stations={stations.filter(obj => obj.tracked)}
            className={styles['tracked-stations']}
            clickHandler={stationToggle}
            editMode={editMode} />
        <div className={styles['search-results']}>
            <div className={styles["separator"]}></div>
            <h2>Search results</h2>
            <StationList
                stations={ searchResults }
                clickHandler={ stationToggle }
                editMode={editMode} />
        </div>
        <div className={styles["search-bar"]}>
            <input
                onFocus={searchFocus}
                onInput={searchInput}
                type="text"
                placeholder="Edit stations"/>
            <IconButton
                className={(submitButtonIcon ? styles['button--loading'] : null) || (editMode ? styles['button--active'] : null)}
                clickHandler={submit}
                icon={submitButtonIcon || (editMode ? '/check.svg' : '/search.svg')} />
        </div>
    </div>)
}

export default SignStations;