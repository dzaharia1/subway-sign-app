import styles from './SignStations.module.scss';
import StationList from '../StationList'
import { useEffect, useState } from 'react';
import IconButton from '../IconButton'

const SignStations = ({ trackedStations, allStations, editMode, setEditMode, setTrackedStations }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchSubmitIcon, setSearchSubmitIcon] = useState('/search.svg');

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

    function submitIconButtonHandler(e) {
        let searchBox = e.target.parentNode.querySelector('input');
        console.log('close?');
        if (searchBox.value === '') {
            setEditMode(false);
            setSearchSubmitIcon('/search.svg');
        }
    }

    return(
    <div className={ `${styles['sign-stations']} ${editMode ? styles['sign-stations--active']: ''}` }>
        <h2>Tracked stations</h2>
        <StationList stations={trackedStations} className={styles['tracked-stations']} />
        <div className={styles['search-results']}>
            <div className={styles["separator"]}></div>
            <h2>Search results</h2>
            <StationList stations={ searchResults } />
        </div>
        <div className={styles["search-bar"]}>
            <input onFocus={searchFocus} onInput={searchInput} type="text" placeholder="Edit stations"/>
            <IconButton clickHandler={submitIconButtonHandler} icon={searchSubmitIcon}></IconButton>
        </div>
    </div>)
}

export default SignStations;