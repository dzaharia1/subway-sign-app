import styles from './IconButton.module.scss'

const IconButton = ({ icon, className, clickHandler }) => {
    return <button className={`${styles['icon-button']} ${className}`}
                style={{ backgroundImage: `url("${ icon }")`}}
                onClick={ clickHandler }></button>
}

export default IconButton;