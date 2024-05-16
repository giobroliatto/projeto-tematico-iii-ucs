import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const icons = [faFileCirclePlus, faUser];

function IconsHeader() {
    return(
        <ul className={s.icons}>
            {icons.map((icon, index) => (
                <li key={index} className={s.icon}>
                    <FontAwesomeIcon icon={icon} />
                </li>
            ))}
        </ul>
    )
}

export default IconsHeader;