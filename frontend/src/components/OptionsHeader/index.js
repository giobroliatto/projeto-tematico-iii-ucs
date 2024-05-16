import s from './style.module.css';

const options = ['ECOPONTOS', 'RECICLOPÉDIA'];

function OptionsHeader() {
    return(
        <ul className={s.options}>
            {options.map((text, index) => (
                <li key={index} className={s.option}>
                    {text}
                </li>
            ))}
        </ul>
    )
}

export default OptionsHeader;