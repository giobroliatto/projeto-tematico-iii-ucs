import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import s from './style.module.css';

const initialIcons = [
    { icon: faFileCirclePlus, tooltipId: "ecopoint-tooltip", tooltipContent: "Cadastre seu Ecoponto", path: '/register-ecopoint' },
    { icon: faUser, tooltipId: "profile-tooltip", tooltipContent: "Perfil", path: '/user-profile' }
];

function IconsHeader() {
    const [icons ] = useState(initialIcons);

    return (
        <>
            {icons.map((item, index) => (
                <Tooltip key={index} id={item.tooltipId} />
            ))}
            <ul className={s.icons}>
                {icons.map((item, index) => (
                    <li key={index} className={s.icon}>
                        <Link to={item.path}>
                            <FontAwesomeIcon 
                                icon={item.icon} 
                                data-tooltip-id={item.tooltipId} 
                                data-tooltip-content={item.tooltipContent} 
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default IconsHeader;