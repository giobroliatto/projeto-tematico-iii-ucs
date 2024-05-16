// IconsHeader.js
import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const icons = [faFileCirclePlus, faUser];

function IconsHeader({ onOptionClick }) {
    const handleClick = (option) => {
        onOptionClick(option);
    };

    return(
        <ul className={s.icons}>
            {icons.map((icon, index) => (
                <li key={index} className={s.icon} onClick={() => handleClick(index === 0 ? 'EcopointRegistration' : 'UserProfile')}>
                    <FontAwesomeIcon icon={icon} />
                </li>
            ))}
        </ul>
    )
}

export default IconsHeader;
