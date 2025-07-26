import styles from './Header.module.scss';
import IconLink from '../IconLink';
import PowerButton from '../PowerButton'

const Header = ({ signId, editMode, apiUrl }) => {
    return <header className={ `${styles.header} ${editMode ? styles['header--edit-mode'] : ''}` }>
        {/* <IconButton icon='img/backbutton.svg' href="/"></IconButton> */}
        <IconLink href={ '/' } icon={ `/backbutton.svg` }/>
        <h1>Sign { signId }</h1>
        <PowerButton signId={signId} apiUrl={apiUrl} />
    </header>
}

export default Header;