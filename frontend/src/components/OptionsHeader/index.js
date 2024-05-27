import { Link } from 'react-router-dom';
import s from './style.module.css';

const options = [
    { text: 'ECOPONTOS', path: '/ecopoints' },
    { text: 'RECICLOPÉDIA', path: '/recyclopedia' } // TODO
];

function OptionsHeader() {
    return (
        <ul className={s.options}>
            {options.map((option, index) => (
                <li key={index} className={s.option}>
                    <Link to={option.path}>{option.text}</Link>
                </li>
            ))}
        </ul>
    );
}

export default OptionsHeader;