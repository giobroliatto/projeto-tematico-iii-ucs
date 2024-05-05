import './style.css';

const options = ['ECOPONTOS', 'RECICLOPÉDIA'];

function OptionsHeader() {
    return(
        <ul className='options'>
            {options.map((text, index) => (
                <li key={index} className='option'>
                    {text}
                </li>
            ))}
        </ul>
    )
}

export default OptionsHeader;