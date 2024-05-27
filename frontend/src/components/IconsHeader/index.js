import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus, faFileCircleQuestion, faRecycle } from '@fortawesome/free-solid-svg-icons';
import s from './style.module.css';

const initialIcons = [
    { icon: faFileCirclePlus, tooltipId: "ecopoint-tooltip", tooltipContent: "Cadastre seu Ecoponto", path: '/register-ecopoint' },
    { icon: faRecycle, tooltipId: "recycle-tooltip", tooltipContent: "Resíduos", path: '/residues-form' },
    { icon: faUser, tooltipId: "profile-tooltip", tooltipContent: "Perfil", path: '/user-profile' }
];

function IconsHeader() {
    const [icons, setIcons] = useState(initialIcons);

    useEffect(() => {
        const checkAdminRole = () => {
            const token = localStorage.getItem('token');
            if (token !== "undefined" && token !== null) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const decodedPayload = JSON.parse(atob(base64));
                if (decodedPayload.role === 'admin') {
                    setIcons(prevIcons => {
                        if (prevIcons.length <= 3) {
                            const newIcon = { 
                                icon: faFileCircleQuestion, 
                                tooltipId: "ecopoint-validation-tooltip", 
                                tooltipContent: "Validar ecopontos", 
                                path: '/ecopoints-pre-registered' 
                            };
                            return [...prevIcons.slice(0, 1), newIcon, ...prevIcons.slice(1)];
                        }
                        return prevIcons;
                    });
                }
            }
        };
        checkAdminRole();
    }, []);

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