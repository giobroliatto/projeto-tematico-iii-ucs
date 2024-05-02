import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard } from '@fortawesome/free-solid-svg-icons';

const icons = [faUser, faClipboard];

function IconsHeader() {
    return(
        <ul className='icons'>
            { icons.map(icon => (
                <li className='icon'><FontAwesomeIcon icon={icon} /></li>
            )) }
        </ul>
    )
}

export default IconsHeader;