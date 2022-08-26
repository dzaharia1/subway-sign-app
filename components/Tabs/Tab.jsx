import styles from './Tabs.module.scss';
import {useState} from 'react';
import Image from 'next/image'

const Tab = ({ editMode, children }) => {
    let [activeTab, setActiveTab] = useState(0);

    function tabButtonHandler(e) {
        setActiveTab(e.target.getAttribute('target'));
    }

    return <div className={styles.tab}>
        <div className={styles["tab-panel__frame"]} style={ { transform: `translateX(calc(${activeTab} * -100vw))` } }>
            <div className={styles['tab-panel']}>
                { children[0] }
            </div>
            <div className={styles['tab-panel']}>
                { children[1] }
            </div>
        </div>
        <nav className={`${styles["tab-button__frame"]} ${editMode ? styles['tab-button__frame--edit-mode'] : ''}`}>
            <button className={`${styles["tab-button"]} ${(activeTab == 0) ? styles['tab-button--active'] : ''}`} onClick={ tabButtonHandler } target={0}>
                <Image width="44px" height="32px" src="/stations.svg" alt="" style={{marginRight: '16px'}} />
                Stations
            </button>
            <button className={`${styles["tab-button"]} ${(activeTab == 1) ? styles['tab-button--active'] : ''}`} onClick={ tabButtonHandler } target={1}>
                <Image width="44px" height="32px" src="/check.svg" alt="" style={{marginRight: '16px'}} />
                Options
            </button>
        </nav>
    </div>
}

export default Tab;