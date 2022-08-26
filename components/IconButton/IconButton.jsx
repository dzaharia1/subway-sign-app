import styles from './IconButton.module.scss'

const IconButton = ({ icon, clickHandler }) => {
    return <button className={styles['icon-button']}
                style={{ backgroundImage: `url("${ icon }")`}}
                onClick={ clickHandler }></button>
}

export default IconButton;