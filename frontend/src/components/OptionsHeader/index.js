import s from './style.module.css';

const options = ['ECOPONTOS', 'RECICLOPÉDIA'];

function OptionsHeader({ onOptionClick }) {
    const handleClick = (option) => {
        onOptionClick(option);
    };

    return(
        <ul className={s.options}>
            {options.map((text, index) => (
                <li key={index} className={s.option} onClick={() => handleClick(text)}>
                    {text}
                </li>
            ))}
        </ul>
    )
}

export default OptionsHeader;