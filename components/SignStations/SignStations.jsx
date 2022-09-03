import styles from './SignStations.module.scss';
import StationList from '../StationList'
import { useEffect, useState } from 'react';
import IconButton from '../IconButton'
import { render } from 'react-dom';

const SignStations = ({ stations, localOptions, setLocalOptions, editMode, setEditMode, signId }) => {
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

    function toggleEditMode(e) {
        let searchBox = e.target.parentNode.querySelector('input');
        
        if (editMode) {
            setSubmitButtonIcon('');
            setEditMode(false);
            searchBox.value = '';
            searchBox.placeholder = 'Edit stations';
            setTimeout(() => {
                setSearchResults(stations);
            }, 750);
        } else {
            searchBox.focus();
        }
    }

    function stationToggle(stopId) {
        if (editMode) {
            const stationList = localOptions.stations;
            const targetStationIndex = stationList.indexOf(stopId);
            
            if (targetStationIndex >= 0) {
                stationList.splice(targetStationIndex, 1);
            } else {
                stationList.push(stopId);
            }

            let setStationsUrl = `https://subway-arrivals.herokuapp.com/setstops/${signId}?stops=`;
            for (let stop of localOptions.stations) {
                setStationsUrl += `${stop},`;
            }
            setStationsUrl = setStationsUrl.substr(0, setStationsUrl.length - 1);

            fetch(setStationsUrl, {method: 'POST'})
            .then(() => {
                setLocalOptions(prevOptions => {
                    return {...prevOptions, stations: stationList}
                });
            });
            
            console.log(localOptions);
        }
    }

    return(
    <div className={ `${styles['sign-stations']} ${editMode ? styles['sign-stations--active']: ''}` }>
        <h2>Tracked stations</h2>
        <StationList
            localOptions={ localOptions }
            stations={stations.filter(obj => localOptions.stations.includes(obj.stopId))}
            className={styles['tracked-stations']}
            clickHandler={stationToggle}
            editMode={editMode} />
        <div className={styles['search-results']}>
            <div className={styles["separator"]}></div>
            <h2>Search results</h2>
            <StationList
                localOptions={ localOptions }
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
                clickHandler={toggleEditMode}
                icon={submitButtonIcon || (editMode ? '/check.svg' : '/search.svg')} />
        </div>
    </div>)
}

export default SignStations;