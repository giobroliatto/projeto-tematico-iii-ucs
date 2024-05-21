import { Tooltip } from 'react-tooltip';
import s from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileCirclePlus, faFileCircleQuestion, faRecycle } from '@fortawesome/free-solid-svg-icons';

const icons = [
    { icon: faFileCirclePlus, tooltipId: "ecopoint-tooltip", tooltipContent: "Cadastre seu Ecoponto", action: 'EcopointRegistration' },
    { icon: faRecycle, tooltipId: "recycle-tooltip", tooltipContent: "Resíduos", action: 'ResiduesForm' },
    { icon: faUser, tooltipId: "profile-tooltip", tooltipContent: "Perfil", action: 'UserProfile' }
];

function IconsHeader({ onOptionClick }) {
    const handleClick = (option) => {
        onOptionClick(option);
    };

    const decodeJWT = (token) => {
        if(token !== "undefined" && token !== null){
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(base64));
            return decodedPayload;
        }

    }

    const checkAdminRole = () => {
        const token = localStorage.getItem('token');
        if(token !== "undefined" && token !== null){
            if(decodeJWT(token).role === 'admin'){
                if(icons.length <= 3){
                    const newIcon = { 
                        icon: faFileCircleQuestion, 
                        tooltipId: "ecopoint-validation-tooltip", 
                        tooltipContent: "Validar ecopontos", 
                        action: 'EcopointsPreRegistered' 
                    }
    
                    icons.splice(1, 0, newIcon);
                }
            }
        }
    }   

    return (
        <>
            {checkAdminRole()}
            {icons.map((item, index) => (
                <Tooltip key={index} id={item.tooltipId} />
            ))}
            <ul className={s.icons}>
                {icons.map((item, index) => (
                    <li key={index} className={s.icon} onClick={() => handleClick(item.action)}>
                        <FontAwesomeIcon 
                            icon={item.icon} 
                            data-tooltip-id={item.tooltipId} 
                            data-tooltip-content={item.tooltipContent} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default IconsHeader;