import { Tooltip } from 'react-tooltip';
import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const icons = [faFileCirclePlus, faUser];

function IconsHeader({ onOptionClick }) {
    const handleClick = (option) => {
        onOptionClick(option);
    };

    return (
        <>
            <Tooltip id="ecopoint-tooltip" />
            <Tooltip id="profile-tooltip" />
            <ul className={s.icons}>
                {icons.map((icon, index) => (
                    <li key={index} className={s.icon} onClick={() => handleClick(index === 0 ? 'EcopointRegistration' : 'UserProfile')}>
                        <FontAwesomeIcon 
                            icon={icon} 
                            data-tooltip-id={index === 0 ? "ecopoint-tooltip" : "profile-tooltip"} 
                            data-tooltip-content={index === 0 ? "Cadastre seu Ecoponto" : "Perfil"} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default IconsHeader;