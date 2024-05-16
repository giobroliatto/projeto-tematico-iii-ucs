import IconsHeader from '../IconsHeader';
import Logo from '../Logo';
import OptionsHeader from '../OptionsHeader';
import s from './style.module.css';

function Header({ onOptionClick }) {
    return (
        <header className={s.App_header}> 
            <Logo />
            <OptionsHeader onOptionClick={onOptionClick} />
            <IconsHeader onOptionClick={onOptionClick} />
        </header>
    )
}

export default Header;