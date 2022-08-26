import styles from './Icon-link.module.scss';

const IconLink = ({ icon, href}) => {
    return <a href={ href } className={ styles['icon-button'] } style={ {backgroundImage: `url("${ icon }")`} }></a>
}

export default IconLink;