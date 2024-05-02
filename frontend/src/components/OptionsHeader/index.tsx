import './style.css';

const options = ['ECOPONTOS', 'RECICLOPÉDIA'];

function OptionsHeader() {
    return(
        <ul className='options'>
            { options.map(text => (
                <li className='option'>{text}</li>
            )) }
        </ul>
    )
}

export default OptionsHeader;