import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const icons = [faFileCirclePlus, faUser];

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