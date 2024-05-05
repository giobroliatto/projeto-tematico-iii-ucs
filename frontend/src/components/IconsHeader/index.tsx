import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const icons = [faFileCirclePlus, faUser];

function IconsHeader() {
    return(
        <ul className='icons'>
            {icons.map((icon, index) => (
                <li key={index} className='icon'>
                    <FontAwesomeIcon icon={icon} />
                </li>
            ))}
        </ul>
    )
}

export default IconsHeader;