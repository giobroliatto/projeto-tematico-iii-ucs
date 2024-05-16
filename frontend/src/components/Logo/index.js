import s from './style.module.css';
import logo from '../../imgs/logo.png'

function Logo() {
    return (
        <div className={s.logo}>
            <img 
                src={logo} 
                alt='logo' 
                className={s.logo_img}
            />
            <p style={{color: '#BAD65C'}}>ECO</p><p>CENTER</p>
        </div>
    )
}

export default Logo;