import styles from './SignStations.module.scss';
import StationList from '../StationList'
import { useState } from 'react';
import IconButton from '../IconButton'

const SignStations = ({ trackedStations, allStations, setTrackedStations }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchSubmitIcon, setSearchSubmitIcon] = useState('/search.svg');

    function searchFocus(e) {
        let searchBox = e.target;
        let button = searchBox.parentNode.querySelector('button');
        searchBox.placeholder = 'Search for a station';
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
        let button = searchBox.parentNode.querySelector('button');
        
        if (searchBox.value !== '') {
            setSearchSubmitIcon('/check.svg');
            button.classList.add(styles["button--active"]);
        } else {
            button.classList.remove(styles['button--active']);
            setSearchSubmitIcon('/close.svg');
        }

        setSearchResults(allStations.filter((obj) => {
            if (obj.name) {
                const stationName = obj.name.toLowerCase();
                if (stationName.includes(searchString)) {
                    return obj;
                }
            }
        }));
    }

    function submitButtonHandler(e) {
        
    }

    return(
    <div className={ styles['sign-stations'] }>
        <h2>Tracked stations</h2>
        <StationList stations={trackedStations} />
        <div className={styles['search-results']}>
            <div className={styles["separator"]}></div>
            <h2>Search results</h2>
            <StationList stations={ searchResults } />
        </div>
        <div className={styles["search-bar"]}>
            <input onFocus={searchFocus} onInput={searchInput} type="text" placeholder="Edit stations"/>
            <IconButton onClick ={submitButtonHandler} icon={searchSubmitIcon}></IconButton>
        </div>
    </div>)
}

export default SignStations;