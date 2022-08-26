import styles from './Header.module.scss';
import IconLink from '../IconLink';
import PowerButton from '../PowerButton'

const Header = ({ signId }) => {
    return <header className={ styles.header }>
        {/* <IconButton icon='img/backbutton.svg' href="/"></IconButton> */}
        <IconLink href={ '/' } icon={ `backbutton.svg` }/>
        <h1>Sign { signId }</h1>
        <PowerButton />
    </header>
}

export default Header;