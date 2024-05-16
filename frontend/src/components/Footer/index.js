import SocialMediaIcons from '../SocialMediaIcons';
import s from './style.module.css';

function Footer() {
    return (
        <footer className={s.App_footer}>
            <div className={s.footer_description}>
                caxiaslixozero@gmail.com
            </div>

            <SocialMediaIcons />
        </footer>
    )
}

export default Footer;