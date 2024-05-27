import IconsHeader from '../IconsHeader';
import Logo from '../Logo';
import OptionsHeader from '../OptionsHeader';
import s from './style.module.css';

function Header() {
    return (
        <header className={s.App_header}> 
            <Logo />
            <OptionsHeader />
            <IconsHeader />
        </header>
    );
}

export default Header;