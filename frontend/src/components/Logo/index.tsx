import logo from '../../imgs/logo.png'
import './style.css';

function Logo() {
    return (
        <div className='logo'>
            <img 
                src={logo} 
                alt='logo' 
                className='logo-img'
            />
            <p style={{color: '#BAD65C'}}>ECO</p><p>CENTER</p>
        </div>
    )
}

export default Logo;